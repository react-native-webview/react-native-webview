package com.reactnativecommunity.webview;

import android.annotation.SuppressLint;
import android.graphics.Rect;
import android.net.Uri;
import android.text.TextUtils;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.webkit.JavaScriptReplyProxy;
import androidx.webkit.ScriptHandler;
import androidx.webkit.WebMessageCompat;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.events.ContentSizeChangeEvent;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.views.scroll.OnScrollDispatchHelper;
import com.facebook.react.views.scroll.ScrollEvent;
import com.facebook.react.views.scroll.ScrollEventType;
import com.reactnativecommunity.webview.events.TopCustomMenuSelectionEvent;
import com.reactnativecommunity.webview.events.TopMessageEvent;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class RNCWebView extends WebView implements LifecycleEventListener {
    protected @Nullable
    String injectedJS;
    protected @Nullable
    String injectedJSBeforeContentLoaded;
    protected static final String JAVASCRIPT_INTERFACE = "ReactNativeWebView";
    protected @Nullable
    RNCWebViewBridge fallbackBridge;
    protected @Nullable
    WebViewCompat.WebMessageListener bridgeListener = null;

    /**
     * When either flag is {@code false}, the corresponding injected script is delivered to every
     * frame (including cross-origin subframes) by registering it with
     * {@link WebViewCompat#addDocumentStartJavaScript(WebView, String, java.util.Set)}, the Android
     * equivalent of a {@code WKUserScript} with {@code forMainFrameOnly: NO}. The registration is
     * held in the matching {@link ScriptHandler} until it needs to be updated or removed.
     */
    protected boolean injectedJavaScriptForMainFrameOnly = true;
    protected boolean injectedJavaScriptBeforeContentLoadedForMainFrameOnly = true;
    protected @Nullable
    ScriptHandler allFramesBeforeContentLoadedScriptHandler;
    protected @Nullable
    ScriptHandler allFramesInjectedJavaScriptScriptHandler;

    protected boolean messagingEnabled = false;
    protected @Nullable
    String messagingModuleName;
    protected @Nullable
    RNCWebViewMessagingModule mMessagingJSModule;
    protected @Nullable
    RNCWebViewClient mRNCWebViewClient;
    protected boolean sendContentSizeChangeEvents = false;
    private OnScrollDispatchHelper mOnScrollDispatchHelper;
    protected boolean hasScrollEvent = false;
    protected boolean nestedScrollEnabled = false;
    protected ProgressChangedFilter progressChangedFilter;

    /**
     * WebView must be created with an context of the current activity
     * <p>
     * Activity Context is required for creation of dialogs internally by WebView
     * Reactive Native needed for access to ReactNative internal system functionality
     */
    public RNCWebView(ThemedReactContext reactContext) {
        super(reactContext);
        mMessagingJSModule = ((ThemedReactContext) this.getContext()).getReactApplicationContext().getJSModule(RNCWebViewMessagingModule.class);
        progressChangedFilter = new ProgressChangedFilter();
    }

    public void setBasicAuthCredential(RNCBasicAuthCredential credential) {
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
                    this,
                    new ContentSizeChangeEvent(
                            UIManagerHelper.getSurfaceId(this),
                            RNCWebViewWrapper.getReactTagFromWebView(this),
                            w,
                            h
                    )
            );
        }
    }

    protected @Nullable
    List<Map<String, String>> menuCustomItems;

    public void setMenuCustomItems(List<Map<String, String>> menuCustomItems) {
      this.menuCustomItems = menuCustomItems;
    }

    @Override
    public ActionMode startActionMode(ActionMode.Callback callback, int type) {
      if(menuCustomItems == null ){
        return super.startActionMode(callback, type);
      }

      return super.startActionMode(new ActionMode.Callback2() {
        @Override
        public boolean onCreateActionMode(ActionMode mode, Menu menu) {
          for (int i = 0; i < menuCustomItems.size(); i++) {
            menu.add(Menu.NONE, i, i, (menuCustomItems.get(i)).get("label"));
          }
          return true;
        }

        @Override
        public boolean onPrepareActionMode(ActionMode actionMode, Menu menu) {
          return false;
        }

        @Override
        public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
          WritableMap wMap = Arguments.createMap();
          RNCWebView.this.evaluateJavascript(
            "(function(){return {selection: window.getSelection().toString()} })()",
            new ValueCallback<String>() {
              @Override
              public void onReceiveValue(String selectionJson) {
                Map<String, String> menuItemMap = menuCustomItems.get(item.getItemId());
                wMap.putString("label", menuItemMap.get("label"));
                wMap.putString("key", menuItemMap.get("key"));
                String selectionText = "";
                try {
                  selectionText = new JSONObject(selectionJson).getString("selection");
                } catch (JSONException ignored) {}
                wMap.putString("selectedText", selectionText);
                dispatchEvent(RNCWebView.this, new TopCustomMenuSelectionEvent(UIManagerHelper.getSurfaceId(RNCWebView.this), RNCWebViewWrapper.getReactTagFromWebView(RNCWebView.this), wMap));
                mode.finish();
              }
            }
          );
          return true;
        }

        @Override
        public void onDestroyActionMode(ActionMode mode) {
          mode = null;
        }

        @Override
        public void onGetContentRect (ActionMode mode,
                View view,
                Rect outRect){
            if (callback instanceof ActionMode.Callback2) {
                ((ActionMode.Callback2) callback).onGetContentRect(mode, view, outRect);
            } else {
                super.onGetContentRect(mode, view, outRect);
            }
          }
      }, type);
    }

    @Override
    public void setWebViewClient(WebViewClient client) {
        super.setWebViewClient(client);
        if (client instanceof RNCWebViewClient) {
            mRNCWebViewClient = (RNCWebViewClient) client;
            mRNCWebViewClient.setProgressChangedFilter(progressChangedFilter);
        }
    }

    WebChromeClient mWebChromeClient;
    @Override
    public void setWebChromeClient(WebChromeClient client) {
        this.mWebChromeClient = client;
        super.setWebChromeClient(client);
        if (client instanceof RNCWebChromeClient) {
            ((RNCWebChromeClient) client).setProgressChangedFilter(progressChangedFilter);
        }
    }

    public WebChromeClient getWebChromeClient() {
        return this.mWebChromeClient;
    }

    public @Nullable
    RNCWebViewClient getRNCWebViewClient() {
        return mRNCWebViewClient;
    }

    public boolean getMessagingEnabled() {
        return this.messagingEnabled;
    }

    protected void createRNCWebViewBridge(RNCWebView webView) {
        if (WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)){
          if (this.bridgeListener == null) {
            this.bridgeListener = new WebViewCompat.WebMessageListener() {
              @Override
              public void onPostMessage(@NonNull WebView view, @NonNull WebMessageCompat message, @NonNull Uri sourceOrigin, boolean isMainFrame, @NonNull JavaScriptReplyProxy replyProxy) {
                RNCWebView.this.onMessage(message.getData(), sourceOrigin.toString());
              }
            };
            WebViewCompat.addWebMessageListener(
              webView,
              JAVASCRIPT_INTERFACE,
              Set.of("*"),
              this.bridgeListener
            );
          }
        } else {
          if (fallbackBridge == null) {
            fallbackBridge = new RNCWebViewBridge(webView);
            addJavascriptInterface(fallbackBridge, JAVASCRIPT_INTERFACE);
          }
        }
        injectJavascriptObject();
        configureAllFramesInjectedScripts();
    }

    private void injectJavascriptObject() {
      if (getSettings().getJavaScriptEnabled()) {
        String js = "(function(){\n" +
          "    window." + JAVASCRIPT_INTERFACE + " = window." + JAVASCRIPT_INTERFACE + " || {};\n" +
          "    window." + JAVASCRIPT_INTERFACE + ".injectedObjectJson = function () { return " + (injectedJavaScriptObject == null ? null : ("`" + injectedJavaScriptObject + "`")) + "; };\n" +
          "})();";
        evaluateJavascriptWithFallback(js);
      }
    }

    @SuppressLint("AddJavascriptInterface")
    public void setMessagingEnabled(boolean enabled) {
        if (messagingEnabled == enabled) {
            return;
        }

        messagingEnabled = enabled;

        if (enabled) {
            createRNCWebViewBridge(this);
        }
    }

    protected void evaluateJavascriptWithFallback(String script) {
        evaluateJavascript(script, null);
    }

    public void callInjectedJavaScript() {
        configureAllFramesInjectedScripts();
        if (getSettings().getJavaScriptEnabled() &&
                injectedJS != null &&
                !TextUtils.isEmpty(injectedJS)) {
            injectJavascriptObject(); // re-inject the Javascript object in case it has been overwritten.
            // When all-frames injection is active, the HTML delivered through the all-frames
            // document-start registration marks the current document and delivers the script to
            // every frame (including the main frame). Guard with the same marker so the fallback
            // below does not run the script a second time on the main frame.
            evaluateJavascriptWithFallback("(function() {\n" +
                    "  if (window.__reactNativeWebViewInjectedAfterContentLoaded) { return; }\n" +
                    "  window.__reactNativeWebViewInjectedAfterContentLoaded = true;\n" +
                    "  (function() {\n" +
                    injectedJS + ";\n" +
                    "  })();\n" +
                    "})();");
        }
    }

    public void callInjectedJavaScriptBeforeContentLoaded() {
        configureAllFramesInjectedScripts();
        if (getSettings().getJavaScriptEnabled() &&
                injectedJSBeforeContentLoaded != null &&
                !TextUtils.isEmpty(injectedJSBeforeContentLoaded)) {
            injectJavascriptObject();  // re-inject the Javascript object in case it has been overwritten.
            // Guard with the same marker that the all-frames document-start registration sets, so
            // whichever path delivers the script first wins and the other one is skipped.
            evaluateJavascriptWithFallback("(function() {\n" +
                    "  if (window.__reactNativeWebViewInjectedBeforeContentLoaded) { return; }\n" +
                    "  window.__reactNativeWebViewInjectedBeforeContentLoaded = true;\n" +
                    "  (function() {\n" +
                    injectedJSBeforeContentLoaded + ";\n" +
                    "  })();\n" +
                    "})();");
        }
    }

    public void setInjectedJS(@Nullable String js) {
        this.injectedJS = js;
        configureAllFramesInjectedScripts();
    }

    public void setInjectedJSBeforeContentLoaded(@Nullable String js) {
        this.injectedJSBeforeContentLoaded = js;
        configureAllFramesInjectedScripts();
    }

    public void setInjectedJavaScriptForMainFrameOnly(boolean onlyMainFrame) {
        this.injectedJavaScriptForMainFrameOnly = onlyMainFrame;
        configureAllFramesInjectedScripts();
    }

    public void setInjectedJavaScriptBeforeContentLoadedForMainFrameOnly(boolean onlyMainFrame) {
        this.injectedJavaScriptBeforeContentLoadedForMainFrameOnly = onlyMainFrame;
        configureAllFramesInjectedScripts();
    }

    /**
     * Registers or removes the all-frames document-start scripts that deliver
     * {@link #injectedJS} / {@link #injectedJSBeforeContentLoaded} to every frame whenever the
     * corresponding {@code *ForMainFrameOnly} flag is {@code false}.
     *
     * <p>The AndroidX WebKit API only exposes all-frames injection at document start
     * ({@link WebViewFeature#DOCUMENT_START_SCRIPT}). "Before content loaded" scripts therefore run
     * directly when each frame's document starts, mirroring {@code WKUserScript}
     * {@code AtDocumentStart}. "After content loaded" scripts are wrapped so that each frame runs
     * them once its DOM is ready, mirroring {@code WKUserScript} {@code AtDocumentEnd}.
     *
     * <p>Scripts registered this way will only run in frames which begin loading after the call
     * returns, which matches the iOS behaviour of applying the {@code WKUserScript}s on the
     * following navigation.
     */
    protected void configureAllFramesInjectedScripts() {
        boolean supportsAllFrames = WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT);

        boolean deliverBeforeToAllFrames =
                supportsAllFrames
                        && !injectedJavaScriptBeforeContentLoadedForMainFrameOnly
                        && !TextUtils.isEmpty(injectedJSBeforeContentLoaded);
        if (deliverBeforeToAllFrames) {
            if (allFramesBeforeContentLoadedScriptHandler == null) {
                String script = "(function() {\n" +
                        "  if (window.__reactNativeWebViewInjectedBeforeContentLoaded) { return; }\n" +
                        "  window.__reactNativeWebViewInjectedBeforeContentLoaded = true;\n" +
                        injectedJavaScriptObjectSetup() +
                        "  (function() {\n" +
                        injectedJSBeforeContentLoaded + ";\n" +
                        "  })();\n" +
                        "})();";
                allFramesBeforeContentLoadedScriptHandler =
                        WebViewCompat.addDocumentStartJavaScript(this, script, Set.of("*"));
            }
        } else if (allFramesBeforeContentLoadedScriptHandler != null) {
            allFramesBeforeContentLoadedScriptHandler.remove();
            allFramesBeforeContentLoadedScriptHandler = null;
        }

        boolean deliverAfterToAllFrames =
                supportsAllFrames
                        && !injectedJavaScriptForMainFrameOnly
                        && !TextUtils.isEmpty(injectedJS);
        if (deliverAfterToAllFrames) {
            if (allFramesInjectedJavaScriptScriptHandler == null) {
                String script = "(function() {\n" +
                        "  if (window.__reactNativeWebViewInjectedAfterContentLoaded) { return; }\n" +
                        "  window.__reactNativeWebViewInjectedAfterContentLoaded = true;\n" +
                        injectedJavaScriptObjectSetup() +
                        "  var runInjectedJavaScript = function() {\n" +
                        "    (function() {\n" +
                        injectedJS + ";\n" +
                        "    })();\n" +
                        "  };\n" +
                        "  if (document.readyState === 'interactive' || document.readyState === 'complete') {\n" +
                        "    runInjectedJavaScript();\n" +
                        "  } else {\n" +
                        "    document.addEventListener('DOMContentLoaded', runInjectedJavaScript, { once: true });\n" +
                        "  }\n" +
                        "})();";
                allFramesInjectedJavaScriptScriptHandler =
                        WebViewCompat.addDocumentStartJavaScript(this, script, Set.of("*"));
            }
        } else if (allFramesInjectedJavaScriptScriptHandler != null) {
            allFramesInjectedJavaScriptScriptHandler.remove();
            allFramesInjectedJavaScriptScriptHandler = null;
        }
    }

    /**
     * JavaScript that makes {@code window.ReactNativeWebView.injectedObjectJson} available in the
     * current document/frame. This is required to expose {@link #injectedJavaScriptObject} to the
     * injected scripts of every frame, not only the main frame, which in turn keeps the inline
     * {@link #injectJavascriptObject()} behaviour consistent when all-frames injection is in use.
     */
    private String injectedJavaScriptObjectSetup() {
        String json = "null";
        if (injectedJavaScriptObject != null) {
            json = "`" + injectedJavaScriptObject + "`";
        }
        return "  window." + JAVASCRIPT_INTERFACE + " = window." + JAVASCRIPT_INTERFACE + " || {};\n" +
                "  window." + JAVASCRIPT_INTERFACE + ".injectedObjectJson = function () { return " + json + "; };\n";
    }

    protected String injectedJavaScriptObject = null;

    public void setInjectedJavaScriptObject(String obj) {
      this.injectedJavaScriptObject = obj;
      injectJavascriptObject();
      // The all-frames document-start registrations embed the current value of
      // injectedJavaScriptObject, so re-register them to pick up the updated object in frames
      // which load from now on. This keeps the injected scripts consistent with the (main-frame)
      // object delivered by injectJavascriptObject().
      removeAllFramesInjectedScriptHandlers();
      configureAllFramesInjectedScripts();
    }

    private void removeAllFramesInjectedScriptHandlers() {
      if (allFramesBeforeContentLoadedScriptHandler != null) {
        allFramesBeforeContentLoadedScriptHandler.remove();
        allFramesBeforeContentLoadedScriptHandler = null;
      }
      if (allFramesInjectedJavaScriptScriptHandler != null) {
        allFramesInjectedJavaScriptScriptHandler.remove();
        allFramesInjectedJavaScriptScriptHandler = null;
      }
    }

    public void onMessage(String message, String sourceUrl) {
        ThemedReactContext reactContext = getThemedReactContext();
        RNCWebView mWebView = this;

        if (mRNCWebViewClient != null) {
            WebView webView = this;
            webView.post(new Runnable() {
                @Override
                public void run() {
                    if (mRNCWebViewClient == null) {
                        return;
                    }
                    WritableMap data = mRNCWebViewClient.createWebViewEvent(webView, sourceUrl);
                    data.putString("data", message);

                    if (mMessagingJSModule != null) {
                        dispatchDirectMessage(data);
                    } else {
                        dispatchEvent(webView, new TopMessageEvent(UIManagerHelper.getSurfaceId(webView), RNCWebViewWrapper.getReactTagFromWebView(webView), data));
                    }
                }
            });
        } else {
            WritableMap eventData = Arguments.createMap();
            eventData.putString("data", message);

            if (mMessagingJSModule != null) {
                dispatchDirectMessage(eventData);
            } else {
                dispatchEvent(this, new TopMessageEvent(UIManagerHelper.getSurfaceId(this), RNCWebViewWrapper.getReactTagFromWebView(this), eventData));
            }
        }
    }

    protected void dispatchDirectMessage(WritableMap data) {
        WritableNativeMap event = new WritableNativeMap();
        event.putMap("nativeEvent", data);
        event.putString("messagingModuleName", messagingModuleName);

        mMessagingJSModule.onMessage(event);
    }

    protected boolean dispatchDirectShouldStartLoadWithRequest(WritableMap data) {
        WritableNativeMap event = new WritableNativeMap();
        event.putMap("nativeEvent", data);
        event.putString("messagingModuleName", messagingModuleName);

        mMessagingJSModule.onShouldStartLoadWithRequest(event);
        return true;
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
                    UIManagerHelper.getSurfaceId(this),
                    RNCWebViewWrapper.getReactTagFromWebView(this),
                    ScrollEventType.SCROLL,
                    x,
                    y,
                    mOnScrollDispatchHelper.getXFlingVelocity(),
                    mOnScrollDispatchHelper.getYFlingVelocity(),
                    this.computeHorizontalScrollRange(),
                    this.computeVerticalScrollRange(),
                    this.getWidth(),
                    this.getHeight());

            dispatchEvent(this, event);
        }
    }

    protected void dispatchEvent(WebView webView, Event event) {
        ThemedReactContext reactContext = getThemedReactContext();
        int reactTag = RNCWebViewWrapper.getReactTagFromWebView(webView);
        UIManagerHelper.getEventDispatcherForReactTag(reactContext, reactTag).dispatchEvent(event);
    }

    protected void cleanupCallbacksAndDestroy() {
        setWebViewClient(null);
        destroy();
    }

    @Override
    public void destroy() {
        removeAllFramesInjectedScriptHandlers();
        if (mWebChromeClient != null) {
            mWebChromeClient.onHideCustomView();
        }
        super.destroy();
    }

  public ThemedReactContext getThemedReactContext() {
    return (ThemedReactContext) this.getContext();
  }

  public ReactApplicationContext getReactApplicationContext() {
      return this.getThemedReactContext().getReactApplicationContext();
  }

  protected class RNCWebViewBridge {
        private String TAG = "RNCWebViewBridge";
        RNCWebView mWebView;

        RNCWebViewBridge(RNCWebView c) {
          mWebView = c;
        }

        /**
         * This method is called whenever JavaScript running within the web view calls:
         * - window[JAVASCRIPT_INTERFACE].postMessage
         */
        @JavascriptInterface
        public void postMessage(String message) {
            if (mWebView.getMessagingEnabled()) {
                // Post to main thread because `mWebView.getUrl()` requires to be executed on main.
                mWebView.post(() -> mWebView.onMessage(message, mWebView.getUrl()));
            } else {
                FLog.w(TAG, "ReactNativeWebView.postMessage method was called but messaging is disabled. Pass an onMessage handler to the WebView.");
            }
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