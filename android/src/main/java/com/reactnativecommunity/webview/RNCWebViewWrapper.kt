package com.reactnativecommunity.webview

import android.content.Context
import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.widget.FrameLayout
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

/**
 * A [FrameLayout] container to hold the [RNCWebView].
 * We need this to prevent WebView crash when the WebView is out of viewport and
 * [com.facebook.react.views.view.ReactViewGroup] clips the canvas.
 * The WebView will then create an empty offscreen surface and NPE.
 */
class RNCWebViewWrapper(context: Context, webView: RNCWebView) : FrameLayout(context) {
  private val swipeRefreshLayout: SwipeRefreshLayout = SwipeRefreshLayout(context)

  init {
    // We make the WebView as transparent on top of the container,
    // and let React Native sets background color for the container.
    webView.setBackgroundColor(Color.TRANSPARENT)

    swipeRefreshLayout.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    swipeRefreshLayout.addView(webView)
    swipeRefreshLayout.setOnRefreshListener {
      webView.reload()
      swipeRefreshLayout.isRefreshing = false
    }
    swipeRefreshLayout.isEnabled = false

    addView(swipeRefreshLayout)
  }

  val webView: RNCWebView = webView

  fun setPullToRefreshEnabled(enabled: Boolean) {
    swipeRefreshLayout.isEnabled = enabled
  }

  companion object {
    /**
     * A helper to get react tag id by given WebView
     */
    @JvmStatic
    fun getReactTagFromWebView(webView: WebView): Int {
      // It is expected that the webView is enclosed by [RNCWebViewWrapper] as the first child.
      // Therefore, it must have a parent, and the parent ID is the reactTag.
      // In exceptional cases, such as receiving WebView messaging after the view has been unmounted,
      // the WebView will not have a parent.
      // In this case, we simply return -1 to indicate that it was not found.
      var parent = webView.parent
      if (parent is SwipeRefreshLayout) {
        parent = parent.parent
      }
      return (parent as? View)?.id ?: -1
    }
  }
}
