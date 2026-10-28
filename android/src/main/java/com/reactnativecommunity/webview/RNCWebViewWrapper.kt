package com.reactnativecommunity.webview

import android.content.Context
import android.graphics.Color
import android.view.MotionEvent
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
class RNCWebViewWrapper(context: Context, val webView: RNCWebView) : FrameLayout(context) {
  private val swipeRefreshLayout: SwipeRefreshLayout

  init {
    // We make the WebView as transparent on top of the container,
    // and let React Native sets background color for the container.
    webView.setBackgroundColor(Color.TRANSPARENT)

    swipeRefreshLayout = object : SwipeRefreshLayout(context) {
      private var canInnerChildScrollUp = false
      private var scrollCheckComplete = false

      override fun canChildScrollUp(): Boolean {
        if (!scrollCheckComplete) return webView.canScrollVertically(-1)
        return webView.canScrollVertically(-1) || canInnerChildScrollUp
      }

      override fun onInterceptTouchEvent(ev: MotionEvent): Boolean {
        if (ev.action == MotionEvent.ACTION_DOWN) {
          scrollCheckComplete = false
          val density = resources.displayMetrics.density
          val x = (ev.x / density).toInt()
          val y = (ev.y / density).toInt()
          webView.evaluateJavascript("""
            (function() {
              var el = document.elementFromPoint($x, $y);
              while (el && el !== document.body && el !== document.documentElement) {
                var style = window.getComputedStyle(el);
                var overflowY = style.getPropertyValue('overflow-y');
                if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
                  return el.scrollTop > 0;
                }
                el = el.parentElement;
              }
              return false;
            })()
          """.trimIndent()) { result ->
            canInnerChildScrollUp = result == "true"
            scrollCheckComplete = true
          }
        }
        return super.onInterceptTouchEvent(ev)
      }
    }
    swipeRefreshLayout.addView(webView)
    swipeRefreshLayout.setOnRefreshListener {
      webView.reload()
      swipeRefreshLayout.isRefreshing = false
    }
    swipeRefreshLayout.isEnabled = false
    addView(swipeRefreshLayout)
  }

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
      var parent = webView.parent as? ViewGroup ?: return -1
      // If the parent is a SwipeRefreshLayout, go one more level up to get the RNCWebViewWrapper
      if (parent is SwipeRefreshLayout) {
        parent = parent.parent as? ViewGroup ?: return -1
      }
      return (parent as? View)?.id ?: -1
    }
  }
}
