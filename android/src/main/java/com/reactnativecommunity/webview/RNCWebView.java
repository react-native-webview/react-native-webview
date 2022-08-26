package com.reactnativecommunity.webview;


import android.annotation.SuppressLint;
import android.os.Build;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.ContentSizeChangeEvent;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.views.scroll.OnScrollDispatchHelper;
import com.facebook.react.views.scroll.ScrollEvent;
import com.facebook.react.views.scroll.ScrollEventType;
import com.reactnativecommunity.webview.events.TopMessageEvent;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
// TODO: change this comment
/**
 * Subclass of {@link WebView} that implements {@link LifecycleEventListener} interface in order
 * to call {@link WebView#destroy} on activity destroy event and also to clear the client
 */
class RNCWebView extends FrameLayout implements LifecycleEventListener {
  protected static final String JAVASCRIPT_INTERFACE = "ReactNativeWebView";

  protected @Nullable
  String injectedJS;
  protected @Nullable
  String injectedJSBeforeContentLoaded;

  /**
   * android.webkit.WebChromeClient fundamentally does not support JS injection into frames other
   * than the main frame, so these two properties are mostly here just for parity with iOS & macOS.
   */
  protected boolean injectedJavaScriptForMainFrameOnly = true;
  protected boolean injectedJavaScriptBeforeContentLoadedForMainFrameOnly = true;

  protected boolean messagingEnabled = false;
  protected @Nullable
  String messagingModuleName;
  protected @Nullable
  RNCWebViewManager.RNCWebViewClient mRNCWebViewClient;
  protected @Nullable
  CatalystInstance mCatalystInstance;
  protected boolean sendContentSizeChangeEvents = false;
  private OnScrollDispatchHelper mOnScrollDispatchHelper;
  protected boolean hasScrollEvent = false;
  protected boolean nestedScrollEnabled = false;
  protected ProgressChangedFilter progressChangedFilter;
  WebView webView;

  /**
   * WebView must be created with an context of the current activity
   * <p>
   * Activity Context is required for creation of dialogs internally by WebView
   * Reactive Native needed for access to ReactNative internal system functionality
   */
  public RNCWebView(ThemedReactContext reactContext) {
    super(reactContext);
    this.webView = new WebView(reactContext);
    webView.setLayoutParams(new ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.MATCH_PARENT));
    addView(this.webView);
    this.createCatalystInstance();
    progressChangedFilter = new ProgressChangedFilter();
  }

  public WebView getWebView() {
    return this.webView;
  }

  public WebSettings getSettings() {
    return this.webView.getSettings();
  }

  public void setIgnoreErrFailedForThisURL(String url) {
    mRNCWebViewClient.setIgnoreErrFailedForThisURL(url);
  }

  public void setBasicAuthCredential(BasicAuthCredential credential) {
    mRNCWebViewClient.setBasicAuthCredential(credential);
  }

  public void setSendContentSizeChangeEvents(boolean sendContentSizeChangeEvents) {
    this.sendContentSizeChangeEvents = sendContentSizeChangeEvents;
  }

  public void setHasScrollEvent(boolean hasScrollEvent) {
    this.hasScrollEvent = hasScrollEvent;
  }

  public void setNestedScrollEnabled(boolean nestedScrollEnabled) {
    this.nestedScrollEnabled = nestedScrollEnabled;
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
  public boolean onTouchEvent(MotionEvent event) {
    if (this.nestedScrollEnabled) {
      requestDisallowInterceptTouchEvent(true);
    }
    return super.onTouchEvent(event);
  }

  @Override
  protected void onSizeChanged(int w, int h, int ow, int oh) {
    super.onSizeChanged(w, h, ow, oh);

    if (sendContentSizeChangeEvents) {
      dispatchEvent(
        this.webView,
        new ContentSizeChangeEvent(
          this.getId(),
          w,
          h
        )
      );
    }
  }

  public void setWebViewClient(WebViewClient client) {
    this.webView.setWebViewClient(client);
    if (client instanceof RNCWebViewManager.RNCWebViewClient) {
      mRNCWebViewClient = (RNCWebViewManager.RNCWebViewClient) client;
      mRNCWebViewClient.setProgressChangedFilter(progressChangedFilter);
    }
  }

  WebChromeClient mWebChromeClient;
  public void setWebChromeClient(WebChromeClient client) {
    this.mWebChromeClient = client;
    this.webView.setWebChromeClient(client);
    if (client instanceof RNCWebViewManager.RNCWebChromeClient) {
      ((RNCWebViewManager.RNCWebChromeClient) client).setProgressChangedFilter(progressChangedFilter);
    }
  }

  public @Nullable
  RNCWebViewManager.RNCWebViewClient getRNCWebViewClient() {
    return mRNCWebViewClient;
  }

  public void setInjectedJavaScript(@Nullable String js) {
    injectedJS = js;
  }

  public void setInjectedJavaScriptBeforeContentLoaded(@Nullable String js) {
    injectedJSBeforeContentLoaded = js;
  }

  public void setInjectedJavaScriptForMainFrameOnly(boolean enabled) {
    injectedJavaScriptForMainFrameOnly = enabled;
  }

  public void setInjectedJavaScriptBeforeContentLoadedForMainFrameOnly(boolean enabled) {
    injectedJavaScriptBeforeContentLoadedForMainFrameOnly = enabled;
  }

  protected RNCWebViewBridge createRNCWebViewBridge(RNCWebView webView) {
    return new RNCWebViewBridge(webView);
  }

  protected void createCatalystInstance() {
    ReactContext reactContext = (ReactContext) this.getContext();

    if (reactContext != null) {
      mCatalystInstance = reactContext.getCatalystInstance();
    }
  }

  @SuppressLint("AddJavascriptInterface")
  public void setMessagingEnabled(boolean enabled) {
    if (messagingEnabled == enabled) {
      return;
    }

    messagingEnabled = enabled;

    if (enabled) {
      this.webView.addJavascriptInterface(createRNCWebViewBridge(this), JAVASCRIPT_INTERFACE);
    } else {
      this.webView.removeJavascriptInterface(JAVASCRIPT_INTERFACE);
    }
  }

  public void setMessagingModuleName(String moduleName) {
    messagingModuleName = moduleName;
  }

  protected void evaluateJavascriptWithFallback(String script) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      this.webView.evaluateJavascript(script, null);
      return;
    }

    try {
      this.webView.loadUrl("javascript:" + URLEncoder.encode(script, "UTF-8"));
    } catch (UnsupportedEncodingException e) {
      // UTF-8 should always be supported
      throw new RuntimeException(e);
    }
  }

  public void callInjectedJavaScript() {
    if (this.webView.getSettings().getJavaScriptEnabled() &&
      injectedJS != null &&
      !TextUtils.isEmpty(injectedJS)) {
      evaluateJavascriptWithFallback("(function() {\n" + injectedJS + ";\n})();");
    }
  }

  public void callInjectedJavaScriptBeforeContentLoaded() {
    if (this.webView.getSettings().getJavaScriptEnabled() &&
      injectedJSBeforeContentLoaded != null &&
      !TextUtils.isEmpty(injectedJSBeforeContentLoaded)) {
      evaluateJavascriptWithFallback("(function() {\n" + injectedJSBeforeContentLoaded + ";\n})();");
    }
  }

  public void onMessage(String message) {
    ReactContext reactContext = (ReactContext) this.getContext();
    RNCWebView mContext = this;

    if (mRNCWebViewClient != null) {
      WebView webView = this.webView;
      webView.post(new Runnable() {
        @Override
        public void run() {
          if (mRNCWebViewClient == null) {
            return;
          }
          WritableMap data = mRNCWebViewClient.createWebViewEvent(webView, webView.getUrl());
          data.putString("data", message);

          if (mCatalystInstance != null) {
            mContext.sendDirectMessage("onMessage", data);
          } else {
            dispatchEvent(webView, new TopMessageEvent(webView.getId(), data));
          }
        }
      });
    } else {
      WritableMap eventData = Arguments.createMap();
      eventData.putString("data", message);

      if (mCatalystInstance != null) {
        this.sendDirectMessage("onMessage", eventData);
      } else {
        dispatchEvent(this.webView, new TopMessageEvent(this.getId(), eventData));
      }
    }
  }

  protected void sendDirectMessage(final String method, WritableMap data) {
    WritableNativeMap event = new WritableNativeMap();
    event.putMap("nativeEvent", data);

    WritableNativeArray params = new WritableNativeArray();
    params.pushMap(event);

    mCatalystInstance.callFunction(messagingModuleName, method, params);
  }

  protected void onScrollChanged(int x, int y, int oldX, int oldY) {
    super.onScrollChanged(x, y, oldX, oldY);

    if (!hasScrollEvent) {
      return;
    }

    if (mOnScrollDispatchHelper == null) {
      mOnScrollDispatchHelper = new OnScrollDispatchHelper();
    }

    if (mOnScrollDispatchHelper.onScrollChanged(x, y)) {
      ScrollEvent event = ScrollEvent.obtain(
        this.getId(),
        ScrollEventType.SCROLL,
        x,
        y,
        mOnScrollDispatchHelper.getXFlingVelocity(),
        mOnScrollDispatchHelper.getYFlingVelocity(),
        this.computeHorizontalScrollRange(),
        this.computeVerticalScrollRange(),
        this.getWidth(),
        this.getHeight());

      dispatchEvent(this.webView, event);
    }
  }

  protected void dispatchEvent(WebView webView, Event event) {
    ReactContext reactContext = (ReactContext) webView.getContext();
    EventDispatcher eventDispatcher =
      reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
    eventDispatcher.dispatchEvent(event);
  }

  protected void cleanupCallbacksAndDestroy() {
    setWebViewClient(null);
    destroy();
  }

  public void destroy() {
    if (mWebChromeClient != null) {
      mWebChromeClient.onHideCustomView();
    }
    this.webView.destroy();
  }

  protected class RNCWebViewBridge {
    RNCWebView mContext;

    RNCWebViewBridge(RNCWebView c) {
      mContext = c;
    }

    /**
     * This method is called whenever JavaScript running within the web view calls:
     * - window[JAVASCRIPT_INTERFACE].postMessage
     */
    @JavascriptInterface
    public void postMessage(String message) {
      mContext.onMessage(message);
    }
  }

  protected static class ProgressChangedFilter {
    private boolean waitingForCommandLoadUrl = false;

    public void setWaitingForCommandLoadUrl(boolean isWaiting) {
      waitingForCommandLoadUrl = isWaiting;
    }

    public boolean isWaitingForCommandLoadUrl() {
      return waitingForCommandLoadUrl;
    }
  }
}
