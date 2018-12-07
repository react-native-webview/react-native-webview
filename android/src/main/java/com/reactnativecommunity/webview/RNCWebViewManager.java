
package com.reactnativecommunity.webview;

import android.annotation.TargetApi;
import android.content.Context;

import com.facebook.react.uimanager.UIManagerModule;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.regex.Pattern;
import javax.annotation.Nullable;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Picture;
import android.net.Uri;
import android.os.Build;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.webkit.ConsoleMessage;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.common.build.ReactBuildConfig;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.ContentSizeChangeEvent;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.reactnativecommunity.webview.events.TopLoadingErrorEvent;
import com.reactnativecommunity.webview.events.TopLoadingFinishEvent;
import com.reactnativecommunity.webview.events.TopLoadingStartEvent;
import com.reactnativecommunity.webview.events.TopMessageEvent;
import com.reactnativecommunity.webview.events.TopLoadingProgressEvent;
import com.reactnativecommunity.webview.events.TopUrlSchemeRequestEvent;
import com.reactnativecommunity.webview.events.WebViewUrlSchemeResponse;
import com.reactnativecommunity.webview.events.WebViewUrlSchemeResponseError;
import com.reactnativecommunity.webview.events.WebViewUrlSchemeResponsePass;
import com.reactnativecommunity.webview.events.WebViewUrlSchemeResponseRedirect;
import com.reactnativecommunity.webview.events.WebViewUrlSchemeResponseValue;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Manages instances of {@link WebView}
 *
 * Can accept following commands:
 *  - GO_BACK
 *  - GO_FORWARD
 *  - RELOAD
 *
 * {@link WebView} instances could emit following direct events:
 *  - topLoadingFinish
 *  - topLoadingStart
 *  - topLoadingStart
 *  - topLoadingProgress
 *  - topUrlSchemeRequest
 *
 * Each event will carry the following properties:
 *  - target - view's react tag
 *  - url - url set for the webview
 *  - loading - whether webview is in a loading state
 *  - title - title of the current page
 *  - canGoBack - boolean, whether there is anything on a history stack to go back
 *  - canGoForward - boolean, whether it is possible to request GO_FORWARD command
 */
@ReactModule(name = RNCWebViewManager.REACT_CLASS)
public class RNCWebViewManager extends SimpleViewManager<WebView> {

  protected static final String REACT_CLASS = "RNCWebView";
  private RNCWebViewPackage aPackage;

  protected static final String HTML_ENCODING = "UTF-8";
  protected static final String HTML_MIME_TYPE = "text/html";
  protected static final String BRIDGE_NAME = "__REACT_WEB_VIEW_BRIDGE";

  protected static final String HTTP_METHOD_POST = "POST";

  public static final int COMMAND_GO_BACK = 1;
  public static final int COMMAND_GO_FORWARD = 2;
  public static final int COMMAND_RELOAD = 3;
  public static final int COMMAND_STOP_LOADING = 4;
  public static final int COMMAND_POST_MESSAGE = 5;
  public static final int COMMAND_INJECT_JAVASCRIPT = 6;
  public static final int COMMAND_HANDLE_URL_SCHEME_RESPONSE = 7;

  // Use `webView.loadUrl("about:blank")` to reliably reset the view
  // state and release page resources (including any running JavaScript).
  protected static final String BLANK_URL = "about:blank";

  protected WebViewConfig mWebViewConfig;
  protected @Nullable WebView.PictureListener mPictureListener;

  protected static class RNCWebViewClient extends WebViewClient {

    protected boolean mLastLoadFailed = false;
    protected @Nullable ReadableArray mUrlPrefixesForDefaultIntent;
    protected @Nullable List<Pattern> mOriginWhitelist;

    // This is a boolean that indicates whether or not the schemeUrlRequest feature is enabled.
    private boolean isOnUrlSchemeRequestEnabled = false;

    // This is mapping from the Request IDs back to the response from Javascript.
    private final Map<String, CompletableFuture<WebViewUrlSchemeResponse>> futureMap = new HashMap<>();

    // Eventually this should be configurable
    private final long SHOULD_INTERCEPT_REQUEST_TIMEOUT_MS = 5000;

    @Override
    public void onPageFinished(WebView webView, String url) {
      super.onPageFinished(webView, url);

      if (!mLastLoadFailed) {
        RNCWebView reactWebView = (RNCWebView) webView;
        reactWebView.callInjectedJavaScript();
        reactWebView.linkBridge();
        emitFinishEvent(webView, url);
      }
    }

    @Override
    public void onPageStarted(WebView webView, String url, Bitmap favicon) {
      super.onPageStarted(webView, url, favicon);
      mLastLoadFailed = false;

      dispatchEvent(
          webView,
          new TopLoadingStartEvent(
              webView.getId(),
              createWebViewEvent(webView, url)));
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView webView, WebResourceRequest request) {
      Uri uri = request.getUrl();
      String method = request.getMethod();

      System.out.println("net-test: request: " + uri  + " method: " + method);

      if (this.isOnUrlSchemeRequestEnabled) {

        System.out.println("Scheme Request magic is enabled");
        String requestId = UUID.randomUUID().toString();

        CompletableFuture<WebViewUrlSchemeResponse> completableFuture = new CompletableFuture<WebViewUrlSchemeResponse>();

        futureMap.put(requestId, completableFuture);
        dispatchEvent(
            webView,
            new TopUrlSchemeRequestEvent(
                webView.getId(),
                requestId
            )
        );

        try {
          WebViewUrlSchemeResponse response = completableFuture.get(
                  SHOULD_INTERCEPT_REQUEST_TIMEOUT_MS, TimeUnit.MILLISECONDS);

          System.out.println("Received the response: " + response);
        } catch(InterruptedException| TimeoutException | ExecutionException exn) {
          // TODO: This should log an error and then do the default thing. The default thing
          // is probably to return a server not available error.
          System.out.println("Timeout waiting for response from the server");

        } finally {
          futureMap.remove(requestId);
        }
      }

      return null;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
      if (url.equals(BLANK_URL)) return false;

      // url blacklisting
      if (mUrlPrefixesForDefaultIntent != null && mUrlPrefixesForDefaultIntent.size() > 0) {
        ArrayList<Object> urlPrefixesForDefaultIntent =
            mUrlPrefixesForDefaultIntent.toArrayList();
        for (Object urlPrefix : urlPrefixesForDefaultIntent) {
          if (url.startsWith((String) urlPrefix)) {
            launchIntent(view.getContext(), url);
            return true;
          }
        }
      }

      if (mOriginWhitelist != null && shouldHandleURL(mOriginWhitelist, url)) {
        return false;
      }

      launchIntent(view.getContext(), url);
      return true;
    }

    private void launchIntent(Context context, String url) {
      try {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        context.startActivity(intent);
      } catch (ActivityNotFoundException e) {
        FLog.w(ReactConstants.TAG, "activity not found to handle uri scheme for: " + url, e);
      }
    }

    private boolean shouldHandleURL(List<Pattern> originWhitelist, String url) {
      Uri uri = Uri.parse(url);
      String scheme = uri.getScheme() != null ? uri.getScheme() : "";
      String authority = uri.getAuthority() != null ? uri.getAuthority() : "";
      String urlToCheck = scheme + "://" + authority;
      for (Pattern pattern : originWhitelist) {
        if (pattern.matcher(urlToCheck).matches()) {
          return true;
        }
      }
      return false;
    }

    @Override
    public void onReceivedError(
        WebView webView,
        int errorCode,
        String description,
        String failingUrl) {
      super.onReceivedError(webView, errorCode, description, failingUrl);
      mLastLoadFailed = true;

      // In case of an error JS side expect to get a finish event first, and then get an error event
      // Android WebView does it in the opposite way, so we need to simulate that behavior
      emitFinishEvent(webView, failingUrl);

      WritableMap eventData = createWebViewEvent(webView, failingUrl);
      eventData.putDouble("code", errorCode);
      eventData.putString("description", description);

      dispatchEvent(
          webView,
          new TopLoadingErrorEvent(webView.getId(), eventData));
    }

    protected void emitFinishEvent(WebView webView, String url) {
      dispatchEvent(
          webView,
          new TopLoadingFinishEvent(
              webView.getId(),
              createWebViewEvent(webView, url)));
    }

    protected WritableMap createWebViewEvent(WebView webView, String url) {
      WritableMap event = Arguments.createMap();
      event.putDouble("target", webView.getId());
      // Don't use webView.getUrl() here, the URL isn't updated to the new value yet in callbacks
      // like onPageFinished
      event.putString("url", url);
      event.putBoolean("loading", !mLastLoadFailed && webView.getProgress() != 100);
      event.putString("title", webView.getTitle());
      event.putBoolean("canGoBack", webView.canGoBack());
      event.putBoolean("canGoForward", webView.canGoForward());
      return event;
    }

    public void setUrlPrefixesForDefaultIntent(ReadableArray specialUrls) {
      mUrlPrefixesForDefaultIntent = specialUrls;
    }

    public void setOriginWhitelist(List<Pattern> originWhitelist) {
      mOriginWhitelist = originWhitelist;
    }

    public void setIsOnUrlSchemeRequestEnabled(boolean isOnUrlSchemeRequestEnabled) {
      this.isOnUrlSchemeRequestEnabled = isOnUrlSchemeRequestEnabled;
    }

    public void handleUrlSchemeResponse(@Nullable ReadableArray args) {
      if (args == null) {
        // TODO: Log properly.
        System.out.println("handleUrlSchemeResponse: Received null arguments");
        return;
      }

      if (args.size() != 1) {
        // TODO: Log properly.
        System.out.println("handleUrlSchemeResponse: Received an invalid number of arguments" + args);
        return;
      }

      ReadableMap argMap = args.getMap(0);

      if (argMap == null) {
        // TODO: Log properly.
        System.out.println("handleUrlSchemeResponse: First argument is not a map.");
        return;
      }

      String requestId = argMap.getString("requestId");
      if (requestId == null) {
        // TODO: Log properly.
        System.out.println("handleUrlSchemeResponse: Missing requestId.");
        return;
      }

      CompletableFuture future = this.futureMap.get(requestId);

      if (future == null) {
        // This might not be an error if there is a timeout
        System.out.println("handleUrlSchemeResponse: Missing future for '" + requestId + "'");
        return;
      }

      ReadableMap responseMap = argMap.getMap("response");

      String responseType = responseMap.getString("type");
      if (responseType.equals("error")) {
        String message = responseMap.getString("message");

        future.complete(new WebViewUrlSchemeResponseError(message));
        return;
      } else if (responseType.equals("pass")) {
        future.complete(new WebViewUrlSchemeResponsePass());
      } else if (responseType.equals("redirect")) {
        String url = responseMap.getString("url");
        String method = responseMap.getString("method");
        Map<String, String> headers = new HashMap<>();
        ReadableMap headerMap = responseMap.getMap("headers");
        if (headerMap == null) {
          future.complete(new WebViewUrlSchemeResponseError("Missing headers for a redirect"));
          return;
        }

        for (ReadableMapKeySetIterator iterator = headerMap.keySetIterator() ; iterator.hasNextKey() ; ) {
          String key = iterator.nextKey();
          String keyValue = headerMap.getString(key);
          if (keyValue == null) {
            future.complete(new WebViewUrlSchemeResponseError("Non-string header value for key: '" + key + "'"));
            return;
          }
          headers.put(key, keyValue);
        }

        String body = responseMap.getString("body");

        future.complete(new WebViewUrlSchemeResponseRedirect(url, method, headers, body));

      } else if (responseType.equals("value")) {
        String url = responseMap.getString("url");
        Integer status = responseMap.getInt("status");
        Map<String, String> headers = new HashMap<>();
        ReadableMap headerMap = responseMap.getMap("headers");
        if (headerMap == null) {
          future.complete(new WebViewUrlSchemeResponseError("Missing headers for a redirect"));
          return;
        }

        for (ReadableMapKeySetIterator iterator = headerMap.keySetIterator() ; iterator.hasNextKey() ; ) {
          String key = iterator.nextKey();
          String keyValue = headerMap.getString(key);
          if (keyValue == null) {
            future.complete(new WebViewUrlSchemeResponseError("Non-string header value for key: '" + key + "'"));
            return;
          }
          headers.put(key, keyValue);
        }

        String body = responseMap.getString("body");

        future.complete(new WebViewUrlSchemeResponseValue(url, status, headers, body));
      } else {
        future.complete(new WebViewUrlSchemeResponseError("Unknown type of message: '" + responseType + "'"));
      }

    }
  }

  /**
   * Subclass of {@link WebView} that implements {@link LifecycleEventListener} interface in order
   * to call {@link WebView#destroy} on activity destroy event and also to clear the client
   */
  protected static class RNCWebView extends WebView implements LifecycleEventListener {
    protected @Nullable String injectedJS;
    protected boolean messagingEnabled = false;
    protected @Nullable RNCWebViewClient mRNCWebViewClient;


    protected class RNCWebViewBridge {
      RNCWebView mContext;

      RNCWebViewBridge(RNCWebView c) {
        mContext = c;
      }

      @JavascriptInterface
      public void postMessage(String message) {
        mContext.onMessage(message);
      }
    }

    /**
     * WebView must be created with an context of the current activity
     *
     * Activity Context is required for creation of dialogs internally by WebView
     * Reactive Native needed for access to ReactNative internal system functionality
     *
     */
    public RNCWebView(ThemedReactContext reactContext) {
      super(reactContext);
    }

    @Override
    public void onHostResume() {
      // do nothing
    }

    @Override
    public void onHostPause() {
      // do nothing
    }

    @Override
    public void onHostDestroy() {
      cleanupCallbacksAndDestroy();
    }

    @Override
    public void setWebViewClient(WebViewClient client) {
      super.setWebViewClient(client);
      mRNCWebViewClient = (RNCWebViewClient)client;
    }

    public @Nullable RNCWebViewClient getRNCWebViewClient() {
      return mRNCWebViewClient;
    }

    public void setInjectedJavaScript(@Nullable String js) {
      injectedJS = js;
    }

    protected RNCWebViewBridge createRNCWebViewBridge(RNCWebView webView) {
      return new RNCWebViewBridge(webView);
    }

    public void setMessagingEnabled(boolean enabled) {
      if (messagingEnabled == enabled) {
        return;
      }

      messagingEnabled = enabled;
      if (enabled) {
        addJavascriptInterface(createRNCWebViewBridge(this), BRIDGE_NAME);
        linkBridge();
      } else {
        removeJavascriptInterface(BRIDGE_NAME);
      }
    }

    protected void evaluateJavascriptWithFallback(String script) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        evaluateJavascript(script, null);
        return;
      }

      try {
        loadUrl("javascript:" + URLEncoder.encode(script, "UTF-8"));
      } catch (UnsupportedEncodingException e) {
        // UTF-8 should always be supported
        throw new RuntimeException(e);
      }
    }

    public void callInjectedJavaScript() {
      if (getSettings().getJavaScriptEnabled() &&
          injectedJS != null &&
          !TextUtils.isEmpty(injectedJS)) {
        evaluateJavascriptWithFallback("(function() {\n" + injectedJS + ";\n})();");
      }
    }

    public void linkBridge() {
      if (messagingEnabled) {
        if (ReactBuildConfig.DEBUG && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
          // See isNative in lodash
          String testPostMessageNative = "String(window.postMessage) === String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')";
          evaluateJavascript(testPostMessageNative, new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {
              if (value.equals("true")) {
                FLog.w(ReactConstants.TAG, "Setting onMessage on a WebView overrides existing values of window.postMessage, but a previous value was defined");
              }
            }
          });
        }

        evaluateJavascriptWithFallback("(" +
          "window.originalPostMessage = window.postMessage," +
          "window.postMessage = function(data) {" +
            BRIDGE_NAME + ".postMessage(String(data));" +
          "}" +
        ")");
      }
    }

    public void onMessage(String message) {
      dispatchEvent(this, new TopMessageEvent(this.getId(), message));
    }

    protected void cleanupCallbacksAndDestroy() {
      setWebViewClient(null);
      destroy();
    }
  }

  public RNCWebViewManager() {
    mWebViewConfig = new WebViewConfig() {
      public void configWebView(WebView webView) {
      }
    };
  }

  public RNCWebViewManager(WebViewConfig webViewConfig) {
    mWebViewConfig = webViewConfig;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  private Boolean isOnUrlSchemeRequestEnabled = false;

  protected RNCWebView createRNCWebViewInstance(ThemedReactContext reactContext) {
    return new RNCWebView(reactContext);
  }

  @Override
  @TargetApi(Build.VERSION_CODES.LOLLIPOP)
  protected WebView createViewInstance(ThemedReactContext reactContext) {
    RNCWebView webView = createRNCWebViewInstance(reactContext);
    webView.setWebChromeClient(new WebChromeClient() {
      @Override
      public boolean onConsoleMessage(ConsoleMessage message) {
        if (ReactBuildConfig.DEBUG) {
          return super.onConsoleMessage(message);
        }
        // Ignore console logs in non debug builds.
        return true;
      }


    @Override
    public void onProgressChanged(WebView webView, int newProgress) {
        super.onProgressChanged(webView, newProgress);
        WritableMap event = Arguments.createMap();
        event.putDouble("target", webView.getId());
        event.putString("title", webView.getTitle());
        event.putBoolean("canGoBack", webView.canGoBack());
        event.putBoolean("canGoForward", webView.canGoForward());
        event.putDouble("progress", (float)newProgress/100);
        dispatchEvent(
                  webView,
                  new TopLoadingProgressEvent(
                      webView.getId(),
                      event));
    }

      @Override
      public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        callback.invoke(origin, true, false);
      }

      protected void openFileChooser(ValueCallback<Uri> filePathCallback, String acceptType) {
        getModule().startPhotoPickerIntent(filePathCallback, acceptType);
      }
      protected void openFileChooser(ValueCallback<Uri> filePathCallback) {
        getModule().startPhotoPickerIntent(filePathCallback, "");
      }
      protected void openFileChooser(ValueCallback<Uri> filePathCallback, String acceptType, String capture) {
        getModule().startPhotoPickerIntent(filePathCallback, acceptType);
      }

      @TargetApi(Build.VERSION_CODES.LOLLIPOP)
      @Override
      public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
        String[] acceptTypes = fileChooserParams.getAcceptTypes();
        boolean allowMultiple = fileChooserParams.getMode() == WebChromeClient.FileChooserParams.MODE_OPEN_MULTIPLE;
        Intent intent = fileChooserParams.createIntent();
        return getModule().startPhotoPickerIntent(filePathCallback, intent, acceptTypes, allowMultiple);
      }
    });
    reactContext.addLifecycleEventListener(webView);
    mWebViewConfig.configWebView(webView);
    WebSettings settings = webView.getSettings();
    settings.setBuiltInZoomControls(true);
    settings.setDisplayZoomControls(false);
    settings.setDomStorageEnabled(true);

    settings.setAllowFileAccess(false);
    settings.setAllowContentAccess(false);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
      settings.setAllowFileAccessFromFileURLs(false);
      setAllowUniversalAccessFromFileURLs(webView, false);
    }
    setMixedContentMode(webView, "never");

    // Fixes broken full-screen modals/galleries due to body height being 0.
    webView.setLayoutParams(
            new LayoutParams(LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT));

    setGeolocationEnabled(webView, false);
    if (ReactBuildConfig.DEBUG && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      WebView.setWebContentsDebuggingEnabled(true);
    }

    return webView;
  }

  @ReactProp(name = "javaScriptEnabled")
  public void setJavaScriptEnabled(WebView view, boolean enabled) {
    view.getSettings().setJavaScriptEnabled(enabled);
  }

  @ReactProp(name = "overScrollMode")
  public void setOverScrollMode(WebView view, String overScrollModeString) {
    Integer overScrollMode;
    switch (overScrollModeString) {
      case "never":
        overScrollMode = View.OVER_SCROLL_NEVER;
        break;
      case "content":
        overScrollMode = View.OVER_SCROLL_IF_CONTENT_SCROLLS;
        break;
      case "always":
      default:
        overScrollMode = View.OVER_SCROLL_ALWAYS;
        break;
    }
    view.setOverScrollMode(overScrollMode);
  }

  @ReactProp(name = "thirdPartyCookiesEnabled")
  public void setThirdPartyCookiesEnabled(WebView view, boolean enabled) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      CookieManager.getInstance().setAcceptThirdPartyCookies(view, enabled);
    }
  }

  @ReactProp(name = "scalesPageToFit")
  public void setScalesPageToFit(WebView view, boolean enabled) {
    view.getSettings().setUseWideViewPort(!enabled);
  }

  @ReactProp(name = "domStorageEnabled")
  public void setDomStorageEnabled(WebView view, boolean enabled) {
    view.getSettings().setDomStorageEnabled(enabled);
  }

  @ReactProp(name = "userAgent")
  public void setUserAgent(WebView view, @Nullable String userAgent) {
    if (userAgent != null) {
      // TODO(8496850): Fix incorrect behavior when property is unset (uA == null)
      view.getSettings().setUserAgentString(userAgent);
    }
  }

  @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
  @ReactProp(name = "mediaPlaybackRequiresUserAction")
  public void setMediaPlaybackRequiresUserAction(WebView view, boolean requires) {
    view.getSettings().setMediaPlaybackRequiresUserGesture(requires);
  }

  @ReactProp(name = "allowUniversalAccessFromFileURLs")
  public void setAllowUniversalAccessFromFileURLs(WebView view, boolean allow) {
    view.getSettings().setAllowUniversalAccessFromFileURLs(allow);
  }

  @ReactProp(name = "saveFormDataDisabled")
  public void setSaveFormDataDisabled(WebView view, boolean disable) {
    view.getSettings().setSaveFormData(!disable);
  }

  @ReactProp(name = "injectedJavaScript")
  public void setInjectedJavaScript(WebView view, @Nullable String injectedJavaScript) {
    ((RNCWebView) view).setInjectedJavaScript(injectedJavaScript);
  }

  @ReactProp(name = "messagingEnabled")
  public void setMessagingEnabled(WebView view, boolean enabled) {
    ((RNCWebView) view).setMessagingEnabled(enabled);
  }

  @ReactProp(name = "source")
  public void setSource(WebView view, @Nullable ReadableMap source) {
    if (source != null) {
      if (source.hasKey("html")) {
        String html = source.getString("html");
        if (source.hasKey("baseUrl")) {
          view.loadDataWithBaseURL(
              source.getString("baseUrl"), html, HTML_MIME_TYPE, HTML_ENCODING, null);
        } else {
          view.loadData(html, HTML_MIME_TYPE + "; charset=" + HTML_ENCODING, null);
        }
        return;
      }
      if (source.hasKey("uri")) {
        String url = source.getString("uri");
        String previousUrl = view.getUrl();
        if (previousUrl != null && previousUrl.equals(url)) {
          return;
        }
        if (source.hasKey("method")) {
          String method = source.getString("method");
          if (method.equalsIgnoreCase(HTTP_METHOD_POST)) {
            byte[] postData = null;
            if (source.hasKey("body")) {
              String body = source.getString("body");
              try {
                postData = body.getBytes("UTF-8");
              } catch (UnsupportedEncodingException e) {
                postData = body.getBytes();
              }
            }
            if (postData == null) {
              postData = new byte[0];
            }
            view.postUrl(url, postData);
            return;
          }
        }
        HashMap<String, String> headerMap = new HashMap<>();
        if (source.hasKey("headers")) {
          ReadableMap headers = source.getMap("headers");
          ReadableMapKeySetIterator iter = headers.keySetIterator();
          while (iter.hasNextKey()) {
            String key = iter.nextKey();
            if ("user-agent".equals(key.toLowerCase(Locale.ENGLISH))) {
              if (view.getSettings() != null) {
                view.getSettings().setUserAgentString(headers.getString(key));
              }
            } else {
              headerMap.put(key, headers.getString(key));
            }
          }
        }
        view.loadUrl(url, headerMap);
        return;
      }
    }
    view.loadUrl(BLANK_URL);
  }

  @ReactProp(name = "onContentSizeChange")
  public void setOnContentSizeChange(WebView view, boolean sendContentSizeChangeEvents) {
    if (sendContentSizeChangeEvents) {
      view.setPictureListener(getPictureListener());
    } else {
      view.setPictureListener(null);
    }
  }

  @ReactProp(name = "mixedContentMode")
  public void setMixedContentMode(WebView view, @Nullable String mixedContentMode) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      if (mixedContentMode == null || "never".equals(mixedContentMode)) {
        view.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
      } else if ("always".equals(mixedContentMode)) {
        view.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
      } else if ("compatibility".equals(mixedContentMode)) {
        view.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
      }
    }
  }

  @ReactProp(name = "urlPrefixesForDefaultIntent")
  public void setUrlPrefixesForDefaultIntent(
      WebView view,
      @Nullable ReadableArray urlPrefixesForDefaultIntent) {
    RNCWebViewClient client = ((RNCWebView) view).getRNCWebViewClient();
    if (client != null && urlPrefixesForDefaultIntent != null) {
      client.setUrlPrefixesForDefaultIntent(urlPrefixesForDefaultIntent);
    }
  }

  @ReactProp(name = "allowFileAccess")
  public void setAllowFileAccess(
    WebView view,
    @Nullable Boolean allowFileAccess) {
    view.getSettings().setAllowFileAccess(allowFileAccess != null && allowFileAccess);
  }

  @ReactProp(name = "geolocationEnabled")
  public void setGeolocationEnabled(
    WebView view,
    @Nullable Boolean isGeolocationEnabled) {
    view.getSettings().setGeolocationEnabled(isGeolocationEnabled != null && isGeolocationEnabled);
  }

  @ReactProp(name = "originWhitelist")
  public void setOriginWhitelist(
    WebView view,
    @Nullable ReadableArray originWhitelist) {
    RNCWebViewClient client = ((RNCWebView) view).getRNCWebViewClient();
    if (client != null && originWhitelist != null) {
      List<Pattern> whiteList = new LinkedList<>();
      for (int i = 0 ; i < originWhitelist.size() ; i++) {
        whiteList.add(Pattern.compile(originWhitelist.getString(i)));
      }
      client.setOriginWhitelist(whiteList);
    }
  }

  @ReactProp(name = "onUrlSchemeRequest")
  public void setOnUrlSchemeRequest(
    WebView view,
    boolean isOnUrlSchemeRequestEnabled) {
    this.isOnUrlSchemeRequestEnabled = isOnUrlSchemeRequestEnabled;

    RNCWebViewClient client = ((RNCWebView) view).getRNCWebViewClient();
    if (client != null) {
      client.setIsOnUrlSchemeRequestEnabled(this.isOnUrlSchemeRequestEnabled);
    }
  }

  @Override
  protected void addEventEmitters(ThemedReactContext reactContext, WebView view) {
    // Do not register default touch emitter and let WebView implementation handle touches
    view.setWebViewClient(new RNCWebViewClient());
  }

  @Override
  public Map getExportedCustomDirectEventTypeConstants() {
    MapBuilder.Builder builder = MapBuilder.builder();
    builder.put("topLoadingProgress", MapBuilder.of("registrationName", "onLoadingProgress"));
    builder.put("topUrlSchemeRequest", MapBuilder.of("registrationName", "onUrlSchemeRequest"));
    return builder.build();
  }

  @Override
  public @Nullable Map<String, Integer> getCommandsMap() {
    return MapBuilder.of(
        "goBack", COMMAND_GO_BACK,
        "goForward", COMMAND_GO_FORWARD,
        "reload", COMMAND_RELOAD,
        "stopLoading", COMMAND_STOP_LOADING,
        "postMessage", COMMAND_POST_MESSAGE,
        "injectJavaScript", COMMAND_INJECT_JAVASCRIPT,
        "handleUrlSchemeResponse", COMMAND_HANDLE_URL_SCHEME_RESPONSE
      );
  }

  @Override
  public void receiveCommand(WebView root, int commandId, @Nullable ReadableArray args) {
    switch (commandId) {
      case COMMAND_GO_BACK:
        root.goBack();
        break;
      case COMMAND_GO_FORWARD:
        root.goForward();
        break;
      case COMMAND_RELOAD:
        root.reload();
        break;
      case COMMAND_STOP_LOADING:
        root.stopLoading();
        break;
      case COMMAND_POST_MESSAGE:
        try {
          RNCWebView reactWebView = (RNCWebView) root;
          JSONObject eventInitDict = new JSONObject();
          eventInitDict.put("data", args.getString(0));
          reactWebView.evaluateJavascriptWithFallback("(function () {" +
            "var event;" +
            "var data = " + eventInitDict.toString() + ";" +
            "try {" +
              "event = new MessageEvent('message', data);" +
            "} catch (e) {" +
              "event = document.createEvent('MessageEvent');" +
              "event.initMessageEvent('message', true, true, data.data, data.origin, data.lastEventId, data.source);" +
            "}" +
            "document.dispatchEvent(event);" +
          "})();");
        } catch (JSONException e) {
          throw new RuntimeException(e);
        }
        break;
      case COMMAND_INJECT_JAVASCRIPT: {
        RNCWebView reactWebView = (RNCWebView) root;
        reactWebView.evaluateJavascriptWithFallback(args.getString(0));
        break;
      }
      case COMMAND_HANDLE_URL_SCHEME_RESPONSE: {
        RNCWebView reactWebView = (RNCWebView) root;
        RNCWebViewClient client = reactWebView.getRNCWebViewClient();
        if (client != null) {
          client.handleUrlSchemeResponse(args);
        }
        break;
      }
    }
  }

  @Override
  public void onDropViewInstance(WebView webView) {
    super.onDropViewInstance(webView);
    ((ThemedReactContext) webView.getContext()).removeLifecycleEventListener((RNCWebView) webView);
    ((RNCWebView) webView).cleanupCallbacksAndDestroy();
  }

  protected WebView.PictureListener getPictureListener() {
    if (mPictureListener == null) {
      mPictureListener = new WebView.PictureListener() {
        @Override
        public void onNewPicture(WebView webView, Picture picture) {
          dispatchEvent(
            webView,
            new ContentSizeChangeEvent(
              webView.getId(),
              webView.getWidth(),
              webView.getContentHeight()));
        }
      };
    }
    return mPictureListener;
  }

  protected static void dispatchEvent(WebView webView, Event event) {
    ReactContext reactContext = (ReactContext) webView.getContext();
    EventDispatcher eventDispatcher =
      reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
    eventDispatcher.dispatchEvent(event);
  }

  public RNCWebViewPackage getPackage() {
    return this.aPackage;
  }

  public void setPackage(RNCWebViewPackage aPackage) {
    this.aPackage = aPackage;
  }

  public RNCWebViewModule getModule() {
    return this.aPackage.getModule();
  }
}
