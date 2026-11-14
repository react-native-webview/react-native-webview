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
import android.view.ViewConfiguration;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.view.NestedScrollingParent3;
import androidx.core.view.ViewCompat;
import androidx.webkit.JavaScriptReplyProxy;
import androidx.webkit.WebMessageCompat;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
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
     * android.webkit.WebChromeClient fundamentally does not support JS injection into frames other
     * than the main frame, so these two properties are mostly here just for parity with iOS & macOS.
     */
    protected boolean injectedJavaScriptForMainFrameOnly = true;
    protected boolean injectedJavaScriptBeforeContentLoadedForMainFrameOnly = true;

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

    /*
     * Pull to refresh.
     *
     * The WebView cannot tell whether the page is at its top: the page may scroll inside an inner
     * element, be a map, or be zoomed in. Chromium can: when a touch scroll goes past what the
     * page consumes, it reports the rest through overScrollBy(). From then on the movement of
     * the finger is handed to refreshParent with the nested scrolling callbacks, the same way
     * a RecyclerView drives a SwipeRefreshLayout.
     *
     * The fields that setOverScrollMode() reads have no initializers on purpose: the View
     * constructor calls it before the initializers of this class run.
     */
    // The layout that shows the refresh indicator, or null when there is no refresh control.
    private @Nullable NestedScrollingParent3 refreshParent;
    // A single finger is down and no other finger has joined it.
    private boolean singleTouchInProgress;
    // refreshParent accepted the current gesture: the finger now moves the indicator.
    private boolean refreshGestureActive;
    // During that gesture, whether pulling down still overscrolls the page. It stops being
    // the case when the finger moves back up far enough to scroll the page.
    private boolean pageAtTop;
    // Distance the indicator has been pulled during the current gesture, in pixels.
    private int refreshPulledDistance;
    // Finger movement that went to the indicator instead of the page. Touch events are shifted
    // by this much so that the page does not scroll while the indicator moves back up.
    private int touchOffsetY;
    private int activePointerId;
    private float touchStartX;
    private float touchStartY;
    private float lastTouchX;
    private float lastTouchY;
    private int touchSlop;
    // The edge effect is turned off while the indicator is pulled, both would show otherwise.
    private boolean edgeEffectSuppressed;
    private int savedOverScrollMode;
    private final int[] nestedScrollConsumed = new int[2];
    // Value of the profile prop at mount, whether or not binding it succeeded.
    private @Nullable String profile = null;
    // Cookie jar of the androidx.webkit Profile this WebView is bound to, or null for the default profile.
    private @Nullable CookieManager profileCookieManager = null;
    // Set at the end of the first props update (mount). Props that can only be applied on mount,
    // such as the profile, are ignored after that.
    private boolean initialPropsApplied = false;
    // Value of the incognito prop, applied by RNCWebViewManager on mount once the profile is bound.
    private boolean incognito = false;

    public boolean isIncognito() {
        return incognito;
    }

    public void setIncognito(boolean value) {
        incognito = value;
    }

    public @Nullable String getProfile() {
        return profile;
    }

    public void setProfile(@Nullable String value) {
        profile = value;
    }

    public void setProfileCookieManager(@Nullable CookieManager cookieManager) {
        profileCookieManager = cookieManager;
    }

    public boolean isInitialPropsApplied() {
        return initialPropsApplied;
    }

    public void setInitialPropsApplied(boolean applied) {
        initialPropsApplied = applied;
    }

    /**
     * The cookie jar this WebView actually uses: its bound Profile's when one is set,
     * otherwise the app-wide default.
     */
    public CookieManager getCookieManager() {
        return profileCookieManager != null ? profileCookieManager : CookieManager.getInstance();
    }

    /**
     * Prop values read back by {@link RNCWebViewManager} after the prop setter has run (when the
     * WebChromeClient is recreated, when the user agent is recomputed, when a download starts, and
     * at the end of a props update for {@link #pendingSource}). They live on the view, not on the
     * manager, because a single manager instance serves every WebView in the app.
     */
    protected boolean allowsFullscreenVideo = false;
    protected boolean allowsProtectedMedia = false;
    protected boolean hasOnOpenWindowEvent = false;
    protected @Nullable
    String userAgent;
    protected @Nullable
    String userAgentWithApplicationName;
    protected @Nullable
    String downloadingMessage;
    protected @Nullable
    String lackPermissionToDownloadMessage;
    /**
     * Source set by the `newSource` prop. Loaded and cleared in
     * RNCWebViewManager#onAfterUpdateTransaction, once every prop of the update has been applied.
     */
    protected @Nullable
    ReadableMap pendingSource;

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

        final int action = event.getActionMasked();
        switch (action) {
            case MotionEvent.ACTION_DOWN:
                // A gesture that never got its ACTION_UP, for instance after a detach.
                stopRefreshGesture(true);
                // Before the WebView sees the event, so that the new edge effect is armed by it.
                restoreEdgeEffect();
                singleTouchInProgress = true;
                touchOffsetY = 0;
                activePointerId = event.getPointerId(0);
                touchStartX = lastTouchX = event.getX();
                touchStartY = lastTouchY = event.getY();
                break;
            case MotionEvent.ACTION_POINTER_DOWN:
                // Pinching also overscrolls, it must not start a refresh.
                singleTouchInProgress = false;
                break;
            case MotionEvent.ACTION_MOVE:
                onTouchMove(event);
                break;
            default:
                break;
        }

        final boolean handled;
        if (touchOffsetY != 0) {
            MotionEvent offsetEvent = MotionEvent.obtain(event);
            offsetEvent.offsetLocation(0, touchOffsetY);
            handled = super.onTouchEvent(offsetEvent);
            offsetEvent.recycle();
        } else {
            handled = super.onTouchEvent(event);
        }

        if (action == MotionEvent.ACTION_UP || action == MotionEvent.ACTION_CANCEL) {
            singleTouchInProgress = false;
            // A cancelled gesture, for instance one taken over by a parent, must not refresh.
            stopRefreshGesture(action == MotionEvent.ACTION_CANCEL);
        }
        return handled;
    }

    private void onTouchMove(MotionEvent event) {
        final float x = event.getX();
        final float y = event.getY();
        if (event.getPointerCount() != 1 || event.getPointerId(0) != activePointerId) {
            // Another finger is involved: follow it without reading a movement into the jump.
            activePointerId = event.getPointerId(0);
            lastTouchX = x;
            lastTouchY = y;
            return;
        }

        // Positive when the finger moves up.
        final float distance = lastTouchY - y;
        final int dy = (int) distance;
        lastTouchX = x;
        // Keep the fraction of a pixel that was not used for the next event.
        lastTouchY = y + (distance - dy);

        if (!refreshGestureActive || refreshParent == null || dy == 0) {
            return;
        }
        nestedScrollConsumed[0] = 0;
        nestedScrollConsumed[1] = 0;
        if (dy > 0) {
            // Moving back up first moves the indicator back, and only then scrolls the page.
            refreshParent.onNestedPreScroll(this, 0, dy, nestedScrollConsumed, ViewCompat.TYPE_TOUCH);
            touchOffsetY += nestedScrollConsumed[1];
            refreshPulledDistance = Math.max(0, refreshPulledDistance - nestedScrollConsumed[1]);
            if (nestedScrollConsumed[1] < dy) {
                // The rest of the movement scrolls the page, which then leaves its top.
                pageAtTop = false;
            }
        } else if (pageAtTop) {
            // The indicator follows the finger, not the overscroll that Chromium reports: that
            // one is not the size of the finger movement (about three times larger on a 3x
            // screen), so the indicator would run ahead of the finger, refresh after a short
            // pull, and not come back when the finger moves back up.
            refreshParent.onNestedScroll(this, 0, 0, 0, dy, ViewCompat.TYPE_TOUCH, nestedScrollConsumed);
            refreshPulledDistance -= dy;
        }
    }

    /**
     * Chromium calls this for regular scrolls as well as for overscrolls. A scroll that would end
     * above the top edge means that nothing in the page consumed the gesture: the page, or the
     * element being scrolled in it, is at its top.
     */
    @Override
    protected boolean overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY,
                                   int scrollRangeX, int scrollRangeY, int maxOverScrollX,
                                   int maxOverScrollY, boolean isTouchEvent) {
        // isTouchEvent is not reliable here: the overscroll is reported after the touch event
        // has been handled, so the finger is tracked in onTouchEvent() instead.
        if (deltaY < 0 && scrollY + deltaY < 0) {
            if (refreshGestureActive) {
                pageAtTop = true;
            } else if (singleTouchInProgress) {
                startRefreshGesture();
            }
        }

        final boolean clamped = super.overScrollBy(deltaX, deltaY, scrollX, scrollY, scrollRangeX,
                scrollRangeY, maxOverScrollX, maxOverScrollY, isTouchEvent);

        if (deltaY > 0 && refreshGestureActive && refreshParent != null) {
            pageAtTop = false;
            if (refreshPulledDistance > 0) {
                // The page scrolls down while the indicator is pulled, which onTouchMove()
                // should prevent: move the indicator back, so that it never stays pulled while
                // the page is away from its top.
                nestedScrollConsumed[0] = 0;
                nestedScrollConsumed[1] = 0;
                refreshParent.onNestedPreScroll(this, 0, deltaY, nestedScrollConsumed, ViewCompat.TYPE_TOUCH);
                refreshPulledDistance = Math.max(0, refreshPulledDistance - nestedScrollConsumed[1]);
            }
        }
        return clamped;
    }

    private void startRefreshGesture() {
        if (refreshParent == null) {
            return;
        }
        // Only a finger that is moving down, and more down than sideways, pulls the indicator.
        // This leaves out sideways swipes, and the end of a fling that reaches the top of the
        // page just as a finger lands.
        if (touchSlop == 0) {
            touchSlop = ViewConfiguration.get(getContext()).getScaledTouchSlop();
        }
        final float movedX = Math.abs(lastTouchX - touchStartX);
        final float movedY = lastTouchY - touchStartY;
        if (movedY < touchSlop / 2f || movedY <= movedX) {
            return;
        }
        // Refused while a refresh is running or when the refresh control is disabled.
        if (!refreshParent.onStartNestedScroll(this, this, ViewCompat.SCROLL_AXIS_VERTICAL, ViewCompat.TYPE_TOUCH)) {
            return;
        }
        refreshParent.onNestedScrollAccepted(this, this, ViewCompat.SCROLL_AXIS_VERTICAL, ViewCompat.TYPE_TOUCH);
        refreshGestureActive = true;
        pageAtTop = true;
        refreshPulledDistance = 0;
        suppressEdgeEffect();
    }

    private void stopRefreshGesture(boolean cancel) {
        if (!refreshGestureActive) {
            return;
        }
        refreshGestureActive = false;
        if (refreshParent != null) {
            if (cancel && refreshPulledDistance > 0) {
                // There is no way to cancel: move the indicator all the way back, so that
                // ending the gesture does not refresh.
                nestedScrollConsumed[0] = 0;
                nestedScrollConsumed[1] = 0;
                refreshParent.onNestedPreScroll(this, 0, refreshPulledDistance, nestedScrollConsumed, ViewCompat.TYPE_TOUCH);
            }
            refreshParent.onStopNestedScroll(this, ViewCompat.TYPE_TOUCH);
        }
        refreshPulledDistance = 0;
    }

    /**
     * Sets the layout that shows the refresh indicator and receives the overscroll of the page,
     * or null to turn pull to refresh off.
     */
    public void setRefreshParent(@Nullable NestedScrollingParent3 refreshParent) {
        if (this.refreshParent == refreshParent) {
            return;
        }
        stopRefreshGesture(true);
        this.refreshParent = refreshParent;
        if (refreshParent == null) {
            restoreEdgeEffect();
        }
    }

    private void suppressEdgeEffect() {
        if (edgeEffectSuppressed) {
            return;
        }
        savedOverScrollMode = getOverScrollMode();
        super.setOverScrollMode(View.OVER_SCROLL_NEVER);
        edgeEffectSuppressed = true;
    }

    // Done when the next gesture starts and not when this one ends: the last overscroll of a
    // gesture is reported after the finger is up and would flash the edge effect.
    private void restoreEdgeEffect() {
        if (!edgeEffectSuppressed) {
            return;
        }
        edgeEffectSuppressed = false;
        super.setOverScrollMode(savedOverScrollMode);
    }

    @Override
    public void setOverScrollMode(int mode) {
        if (edgeEffectSuppressed) {
            // Applied once the edge effect is restored.
            savedOverScrollMode = mode;
            return;
        }
        super.setOverScrollMode(mode);
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

    @SuppressLint("AddJavascriptInterface")
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

    public void setMessagingEnabled(boolean enabled) {
        messagingEnabled = enabled;
    }

    /**
     * Applies messagingEnabled and injectedJavaScriptObject. Their setters only store the value:
     * applying them registers the bridge and runs JavaScript, and Fabric sets props in no
     * particular order. RNCWebViewManager calls this once every prop of an update has been set.
     */
    public void applyMessagingProps() {
        if (messagingEnabled) {
            createRNCWebViewBridge(this);
        }
        if (injectedJavaScriptObjectChanged) {
            injectedJavaScriptObjectChanged = false;
            injectJavascriptObject();
        }
    }

    protected void evaluateJavascriptWithFallback(String script) {
        evaluateJavascript(script, null);
    }

    public void callInjectedJavaScript() {
        boolean hasInjectedJS = !TextUtils.isEmpty(injectedJS);
        if (getSettings().getJavaScriptEnabled() && hasInjectedJS) {
            evaluateJavascriptWithFallback("(function() {\n" + injectedJS + ";\n})();");
        }
        reinjectJavascriptObject(hasInjectedJS);
    }

    public void callInjectedJavaScriptBeforeContentLoaded() {
        boolean hasInjectedJS = !TextUtils.isEmpty(injectedJSBeforeContentLoaded);
        if (getSettings().getJavaScriptEnabled() && hasInjectedJS) {
            evaluateJavascriptWithFallback("(function() {\n" + injectedJSBeforeContentLoaded + ";\n})();");
        }
        reinjectJavascriptObject(hasInjectedJS);
    }

    /**
     * Each page load starts with a new window, so the object is injected again on every load
     * while injectedJavaScriptObject is set, not only when an injected script ran. After an
     * injected script, it is also re-injected in case the script has overwritten it.
     */
    private void reinjectJavascriptObject(boolean afterInjectedJS) {
        if (afterInjectedJS || injectedJavaScriptObject != null) {
            injectJavascriptObject();
        }
    }

    protected String injectedJavaScriptObject = null;
    private boolean injectedJavaScriptObjectChanged = false;

    public void setInjectedJavaScriptObject(String obj) {
      if (!TextUtils.equals(this.injectedJavaScriptObject, obj)) {
        this.injectedJavaScriptObject = obj;
        this.injectedJavaScriptObjectChanged = true;
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