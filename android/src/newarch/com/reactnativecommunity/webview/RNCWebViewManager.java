package com.reactnativecommunity.webview;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.RNCWebViewManagerDelegate;
import com.facebook.react.viewmanagers.RNCWebViewManagerInterface;
import com.facebook.react.views.scroll.ScrollEventType;
import com.reactnativecommunity.webview.events.TopHttpErrorEvent;
import com.reactnativecommunity.webview.events.TopLoadingErrorEvent;
import com.reactnativecommunity.webview.events.TopLoadingFinishEvent;
import com.reactnativecommunity.webview.events.TopLoadingProgressEvent;
import com.reactnativecommunity.webview.events.TopLoadingStartEvent;
import com.reactnativecommunity.webview.events.TopMessageEvent;
import com.reactnativecommunity.webview.events.TopRenderProcessGoneEvent;
import com.reactnativecommunity.webview.events.TopShouldStartLoadWithRequestEvent;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

@ReactModule(name = RNCWebViewManagerImpl.NAME)
public class RNCWebViewManager extends SimpleViewManager<RNCWebView>
        implements RNCWebViewManagerInterface<RNCWebView> {

    private final ViewManagerDelegate<RNCWebView> mDelegate;
    private final RNCWebViewManagerImpl mRNCWebViewManagerImpl;

    public RNCWebViewManager(ReactApplicationContext context) {
        mDelegate = new RNCWebViewManagerDelegate<>(this);
        mRNCWebViewManagerImpl = new RNCWebViewManagerImpl(context);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<RNCWebView> getDelegate() {
        return mDelegate;
    }

    @NonNull
    @Override
    public String getName() {
        return RNCWebViewManagerImpl.NAME;
    }

    @NonNull
    @Override
    protected RNCWebView createViewInstance(@NonNull ThemedReactContext context) {
        return mRNCWebViewManagerImpl.createViewInstance();
    }

    @Override
    @ReactProp(name = "allowFileAccess")
    public void setAllowFileAccess(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setAllowFileAccess(view, value);
    }

    @Override
    @ReactProp(name = "allowFileAccessFromFileURLs")
    public void setAllowFileAccessFromFileURLs(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setAllowFileAccessFromFileURLs(view, value);

    }

    @Override
    @ReactProp(name = "allowUniversalAccessFromFileURLs")
    public void setAllowUniversalAccessFromFileURLs(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setAllowUniversalAccessFromFileURLs(view, value);
    }

    @Override
    @ReactProp(name = "allowsFullscreenVideo")
    public void setAllowsFullscreenVideo(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setAllowsFullscreenVideo(view, value);
    }

    @Override
    @ReactProp(name = "allowsProtectedMedia")
    public void setAllowsProtectedMedia(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setAllowsProtectedMedia(view, value);
    }

    @Override
    @ReactProp(name = "androidHardwareAccelerationDisabled")
    public void setAndroidHardwareAccelerationDisabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setAndroidHardwareAccelerationDisabled(view, value);
    }

    @Override
    @ReactProp(name = "androidLayerType")
    public void setAndroidLayerType(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setAndroidLayerType(view, value);
    }

    @Override
    @ReactProp(name = "applicationNameForUserAgent")
    public void setApplicationNameForUserAgent(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setApplicationNameForUserAgent(view, value);
    }

    @Override
    @ReactProp(name = "basicAuthCredential")
    public void setBasicAuthCredential(RNCWebView view, @Nullable ReadableMap value) {
        mRNCWebViewManagerImpl.setBasicAuthCredential(view, value);
    }

    @Override
    @ReactProp(name = "cacheEnabled")
    public void setCacheEnabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setCacheEnabled(view, value);
    }

    @Override
    @ReactProp(name = "cacheMode")
    public void setCacheMode(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setCacheMode(view, value);
    }

    @Override
    @ReactProp(name = "domStorageEnabled")
    public void setDomStorageEnabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setDomStorageEnabled(view, value);
    }

    @Override
    @ReactProp(name = "downloadingMessage")
    public void setDownloadingMessage(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setDownloadingMessage(value);
    }

    @Override
    @ReactProp(name = "forceDarkOn")
    public void setForceDarkOn(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setForceDarkOn(view, value);
    }

    @Override
    @ReactProp(name = "geolocationEnabled")
    public void setGeolocationEnabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setGeolocationEnabled(view, value);
    }

    @Override
    @ReactProp(name = "hasOnScroll")
    public void setHasOnScroll(RNCWebView view, boolean hasScrollEvent) {
        mRNCWebViewManagerImpl.setHasOnScroll(view, hasScrollEvent);
    }

    @Override
    @ReactProp(name = "incognito")
    public void setIncognito(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setIncognito(view, value);
    }

    @Override
    @ReactProp(name = "injectedJavaScript")
    public void setInjectedJavaScript(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setInjectedJavaScript(view, value);
    }

    @Override
    @ReactProp(name = "injectedJavaScriptBeforeContentLoaded")
    public void setInjectedJavaScriptBeforeContentLoaded(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setInjectedJavaScriptBeforeContentLoaded(view, value);
    }

    @Override
    @ReactProp(name = "injectedJavaScriptForMainFrameOnly")
    public void setInjectedJavaScriptForMainFrameOnly(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setInjectedJavaScriptForMainFrameOnly(view, value);

    }

    @Override
    @ReactProp(name = "injectedJavaScriptBeforeContentLoadedForMainFrameOnly")
    public void setInjectedJavaScriptBeforeContentLoadedForMainFrameOnly(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setInjectedJavaScriptBeforeContentLoadedForMainFrameOnly(view, value);

    }

    @Override
    @ReactProp(name = "javaScriptCanOpenWindowsAutomatically")
    public void setJavaScriptCanOpenWindowsAutomatically(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setJavaScriptCanOpenWindowsAutomatically(view, value);
    }

    @ReactProp(name = "javaScriptEnabled")
    public void setJavaScriptEnabled(RNCWebView view, boolean enabled) {
        mRNCWebViewManagerImpl.setJavaScriptEnabled(view, enabled);
    }

    @Override
    @ReactProp(name = "lackPermissionToDownloadMessage")
    public void setLackPermissionToDownloadMessage(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setLackPermissionToDownloadMessage(value);
    }

    @Override
    @ReactProp(name = "mediaPlaybackRequiresUserAction")
    public void setMediaPlaybackRequiresUserAction(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setMediaPlaybackRequiresUserAction(view, value);
    }

    @Override
    @ReactProp(name = "messagingEnabled")
    public void setMessagingEnabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setMessagingEnabled(view, value);
    }

    @Override
    @ReactProp(name = "messagingModuleName")
    public void setMessagingModuleName(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setMessagingModuleName(view, value);
    }

    @Override
    @ReactProp(name = "minimumFontSize")
    public void setMinimumFontSize(RNCWebView view, int value) {
        mRNCWebViewManagerImpl.setMinimumFontSize(view, value);
    }

    @Override
    @ReactProp(name = "mixedContentMode")
    public void setMixedContentMode(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setMixedContentMode(view, value);
    }

    @Override
    @ReactProp(name = "nestedScrollEnabled")
    public void setNestedScrollEnabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setNestedScrollEnabled(view, value);
    }

    @Override
    @ReactProp(name = "overScrollMode")
    public void setOverScrollMode(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setOverScrollMode(view, value);
    }

    @Override
    @ReactProp(name = "saveFormDataDisabled")
    public void setSaveFormDataDisabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setSaveFormDataDisabled(view, value);
    }

    @Override
    @ReactProp(name = "scalesPageToFit")
    public void setScalesPageToFit(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setScalesPageToFit(view, value);
    }

    @Override
    @ReactProp(name = "setBuiltInZoomControls")
    public void setSetBuiltInZoomControls(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setSetBuiltInZoomControls(view, value);
    }

    @Override
    @ReactProp(name = "setDisplayZoomControls")
    public void setSetDisplayZoomControls(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setSetDisplayZoomControls(view, value);
    }

    @Override
    @ReactProp(name = "setSupportMultipleWindows")
    public void setSetSupportMultipleWindows(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setSetSupportMultipleWindows(view, value);
    }

    @Override
    @ReactProp(name = "showsHorizontalScrollIndicator")
    public void setShowsHorizontalScrollIndicator(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setShowsHorizontalScrollIndicator(view, value);
    }

    @Override
    @ReactProp(name = "showsVerticalScrollIndicator")
    public void setShowsVerticalScrollIndicator(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setShowsVerticalScrollIndicator(view, value);
    }

    @Override
    @ReactProp(name = "newSource")
    public void setNewSource(RNCWebView view, @Nullable ReadableMap value) {
        mRNCWebViewManagerImpl.setSource(view, value, true);
    }

    @Override
    @ReactProp(name = "textZoom")
    public void setTextZoom(RNCWebView view, int value) {
        mRNCWebViewManagerImpl.setTextZoom(view, value);
    }

    @Override
    @ReactProp(name = "thirdPartyCookiesEnabled")
    public void setThirdPartyCookiesEnabled(RNCWebView view, boolean value) {
        mRNCWebViewManagerImpl.setThirdPartyCookiesEnabled(view, value);
    }

    @Override
    @ReactProp(name = "urlPrefixesForDefaultIntent")
    public void setUrlPrefixesForDefaultIntent(RNCWebView view, @Nullable ReadableArray value) {
        mRNCWebViewManagerImpl.setUrlPrefixesForDefaultIntent(view, value);
    }

    /* iOS PROPS - no implemented here */
    @Override
    public void setAllowingReadAccessToURL(RNCWebView view, @Nullable String value) {}

    @Override
    public void setAllowsBackForwardNavigationGestures(RNCWebView view, boolean value) {}

    @Override
    public void setAllowsInlineMediaPlayback(RNCWebView view, boolean value) {}

    @Override
    public void setAllowsAirPlayForMediaPlayback(RNCWebView view, boolean value) {}

    @Override
    public void setAllowsLinkPreview(RNCWebView view, boolean value) {}

    @Override
    public void setAutomaticallyAdjustContentInsets(RNCWebView view, boolean value) {}

    @Override
    public void setAutoManageStatusBarEnabled(RNCWebView view, boolean value) {}

    @Override
    public void setBounces(RNCWebView view, boolean value) {}

    @Override
    public void setContentInset(RNCWebView view, @Nullable ReadableMap value) {}

    @Override
    public void setContentInsetAdjustmentBehavior(RNCWebView view, @Nullable String value) {}

    @Override
    public void setContentMode(RNCWebView view, @Nullable String value) {}

    @Override
    public void setDataDetectorTypes(RNCWebView view, @Nullable ReadableArray value) {}

    @Override
    public void setDecelerationRate(RNCWebView view, double value) {}

    @Override
    public void setDirectionalLockEnabled(RNCWebView view, boolean value) {}

    @Override
    public void setEnableApplePay(RNCWebView view, boolean value) {}

    @Override
    public void setHideKeyboardAccessoryView(RNCWebView view, boolean value) {}

    @Override
    public void setKeyboardDisplayRequiresUserAction(RNCWebView view, boolean value) {}

    @Override
    public void setPagingEnabled(RNCWebView view, boolean value) {}

    @Override
    public void setPullToRefreshEnabled(RNCWebView view, boolean value) {}

    @Override
    public void setScrollEnabled(RNCWebView view, boolean value) {}

    @Override
    public void setSharedCookiesEnabled(RNCWebView view, boolean value) {}

    @Override
    public void setUseSharedProcessPool(RNCWebView view, boolean value) {}

    @Override
    public void setLimitsNavigationsToAppBoundDomains(RNCWebView view, boolean value) {}

    @Override
    public void setTextInteractionEnabled(RNCWebView view, boolean value) {}
    
    @Override
    public void setHasOnFileDownload(RNCWebView view, boolean value) {}

    @Override
    public void setMenuItems(RNCWebView view, ReadableArray value) {}

    @Override
    public void setMediaCapturePermissionGrantType(RNCWebView view, @Nullable String value) {}
    /* !iOS PROPS - no implemented here */

    @Override
    @ReactProp(name = "userAgent")
    public void setUserAgent(RNCWebView view, @Nullable String value) {
        mRNCWebViewManagerImpl.setUserAgent(view, value);
    }

    @Override
    protected void addEventEmitters(@NonNull ThemedReactContext reactContext, RNCWebView view) {
        // Do not register default touch emitter and let WebView implementation handle touches
        view.setWebViewClient(new RNCWebViewClient());
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        Map<String, Object> export = super.getExportedCustomDirectEventTypeConstants();
        if (export == null) {
            export = MapBuilder.newHashMap();
        }
        // Default events but adding them here explicitly for clarity
        export.put(TopLoadingStartEvent.EVENT_NAME, MapBuilder.of("registrationName", "onLoadingStart"));
        export.put(TopLoadingFinishEvent.EVENT_NAME, MapBuilder.of("registrationName", "onLoadingFinish"));
        export.put(TopLoadingErrorEvent.EVENT_NAME, MapBuilder.of("registrationName", "onLoadingError"));
        export.put(TopMessageEvent.EVENT_NAME, MapBuilder.of("registrationName", "onMessage"));
        // !Default events but adding them here explicitly for clarity

        export.put(TopLoadingProgressEvent.EVENT_NAME, MapBuilder.of("registrationName", "onLoadingProgress"));
        export.put(TopShouldStartLoadWithRequestEvent.EVENT_NAME, MapBuilder.of("registrationName", "onShouldStartLoadWithRequest"));
        export.put(ScrollEventType.getJSEventName(ScrollEventType.SCROLL), MapBuilder.of("registrationName", "onScroll"));
        export.put(TopHttpErrorEvent.EVENT_NAME, MapBuilder.of("registrationName", "onHttpError"));
        export.put(TopRenderProcessGoneEvent.EVENT_NAME, MapBuilder.of("registrationName", "onRenderProcessGone"));
        return export;
    }


  public static final int COMMAND_GO_BACK = 1;
  public static final int COMMAND_GO_FORWARD = 2;
  public static final int COMMAND_RELOAD = 3;
  public static final int COMMAND_STOP_LOADING = 4;
  public static final int COMMAND_POST_MESSAGE = 5;
  public static final int COMMAND_INJECT_JAVASCRIPT = 6;
  public static final int COMMAND_LOAD_URL = 7;
  public static final int COMMAND_FOCUS = 8;

  // android commands
  public static final int COMMAND_CLEAR_FORM_DATA = 1000;
  public static final int COMMAND_CLEAR_CACHE = 1001;
  public static final int COMMAND_CLEAR_HISTORY = 1002;


  @Override
  public @Nullable
  Map<String, Integer> getCommandsMap() {
    return MapBuilder.<String, Integer>builder()
      .put("goBack", COMMAND_GO_BACK)
      .put("goForward", COMMAND_GO_FORWARD)
      .put("reload", COMMAND_RELOAD)
      .put("stopLoading", COMMAND_STOP_LOADING)
      .put("postMessage", COMMAND_POST_MESSAGE)
      .put("injectJavaScript", COMMAND_INJECT_JAVASCRIPT)
      .put("loadUrl", COMMAND_LOAD_URL)
      .put("requestFocus", COMMAND_FOCUS)
      .put("clearFormData", COMMAND_CLEAR_FORM_DATA)
      .put("clearCache", COMMAND_CLEAR_CACHE)
      .put("clearHistory", COMMAND_CLEAR_HISTORY)
      .build();
  }

  @Override
  public void receiveCommand(@NonNull RNCWebView reactWebView, String commandId, @Nullable ReadableArray args) {
    switch (commandId) {
      case "goBack":
        reactWebView.goBack();
        break;
      case "goForward":
        reactWebView.goForward();
        break;
      case "reload":
        reactWebView.reload();
        break;
      case "stopLoading":
        reactWebView.stopLoading();
        break;
      case "postMessage":
        try {
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
      case "injectJavaScript":
        reactWebView.evaluateJavascriptWithFallback(args.getString(0));
        break;
      case "loadUrl":
        if (args == null) {
          throw new RuntimeException("Arguments for loading an url are null!");
        }
        reactWebView.progressChangedFilter.setWaitingForCommandLoadUrl(false);
        reactWebView.loadUrl(args.getString(0));
        break;
      case "requestFocus":
        reactWebView.requestFocus();
        break;
      case "clearFormData":
        reactWebView.clearFormData();
        break;
      case "clearCache":
        boolean includeDiskFiles = args != null && args.getBoolean(0);
        reactWebView.clearCache(includeDiskFiles);
        break;
      case "clearHistory":
        reactWebView.clearHistory();
        break;
    }
    super.receiveCommand(reactWebView, commandId, args);
  }
}