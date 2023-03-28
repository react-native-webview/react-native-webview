package com.reactnativecommunity.webview;

import android.webkit.WebView;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;

import com.facebook.common.logging.FLog;
import com.facebook.react.uimanager.ThemedReactContext;

public class RNCWebViewContainer extends FrameLayout {
  private static final String TAG = "RNCWebViewContainer";
  public static final int INVALID_VIEW_ID = -1;

  private RNCWebViewManager.RNCWebView RNCWebView;

  public RNCWebViewContainer(ThemedReactContext reactContext) {
    super(reactContext);
  }

  public interface Action {
    void apply(RNCWebViewManager.RNCWebView webView);
  }

  /**
   * Attaches a {@link RNCWebViewManager.RNCWebView} to the RNCWebView parent
   * Throws an exception if the provided internal webView is already attached to a parent
   * @param webView
   */
  public void attachWebView(RNCWebViewManager.RNCWebView webView) {
    this.RNCWebView = webView;

    // Only re-attach the WebView if parent is null
    if (webView.getParent() != null) {
      throw new IllegalArgumentException("WebView with key: " + webView.webViewKey + " parent is non null. Cannot re-attach webview.");
    }

    // Fixes broken full-screen modals/galleries due to body height being 0.
    addView(webView, new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
  }

  /**
   * Detaches the RNCWebView from the RNCWebViewContainer parent and returns a reference to it
   * @return RNCWebView
   */
  public RNCWebViewManager.RNCWebView detachWebView() {
    if (RNCWebView == null) {
      throw new IllegalStateException("Webview is null");
    }

    removeWebViewFromParent();
    RNCWebViewManager.RNCWebView webView = RNCWebView;
    this.RNCWebView = null;
    return webView;
  }

  public void removeWebViewFromParent() {
    if (RNCWebView != null) {
      removeView(RNCWebView);
    }
  }

  @Nullable
  public RNCWebViewManager.RNCWebView getWebView() {
    return RNCWebView;
  }

  /**
   * Applies an action if the internal webview is non null
   * @param action
   */
  public void ifHasRNCWebView(Action action) {
    if (RNCWebView != null) {
      action.apply(RNCWebView);
    } else {
      FLog.e(TAG, new Throwable(), "Internal WebView is null");
    }
  }

  /**
   * Provides the associated parent RNCWebView viewId for the provided
   * webView view id.
   * @param webView
   * @return viewId
   */
  public static int getRNCWebViewId(WebView webView) {
    Integer rncViewId = RNCWebViewMapManager.INSTANCE.getViewIdMap().get(webView.getId());
    if (rncViewId == null) {
      return INVALID_VIEW_ID;
    }
    return rncViewId;
  }
}
