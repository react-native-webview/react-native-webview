package com.reactnativecommunity.webview

import android.content.ContentValues.TAG
import android.content.Context
import android.graphics.Color
import android.os.Handler
import android.util.Log
import android.view.View
import android.webkit.WebView
import android.widget.FrameLayout
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

/**
 * A [FrameLayout] container to hold the [RNCWebView].
 * We need this to prevent WebView crash when the WebView is out of viewport and
 * [com.facebook.react.views.view.ReactViewGroup] clips the canvas.
 * The WebView will then create an empty offscreen surface and NPE.
 */
class RNCWebViewWrapper(context: Context, webView: WebView) : FrameLayout(context) {
  protected var swipeRefreshLayout: SwipeRefreshLayout? = null
  var webView: RNCWebView

  init {
    // Assign to the class-level variable instead of declaring a local variable
    this.webView = webView as RNCWebView
    swipeRefreshLayout = SwipeRefreshLayout(context)
    this.webView.setBackgroundColor(Color.TRANSPARENT)
    val parent = this.webView.parent
    swipeRefreshLayout?.addView(webView) // Use safe call operator
    addView(swipeRefreshLayout)
    swipeRefreshLayout!!.setOnRefreshListener {
      Handler().postDelayed({
        swipeRefreshLayout!!.isRefreshing = false
        webView.reload()
      }, 3000) // Delay in millis
    }
  }
  @JvmName("getSwipeRefreshLayout1")
  fun getSwipeRefreshLayout(): SwipeRefreshLayout? {
    return swipeRefreshLayout
  }

  companion object {
    /**
     * A helper to get react tag id by given WebView
     */
    @JvmStatic
    fun getReactTagFromWebView(webView: WebView): Int {
      val swipeRefreshView = webView.parent as? View
      // It is expected that the webView is enclosed by [RNCWebViewWrapper] as the first child.
      // Therefore, it must have a parent, and the parent ID is the reactTag.
      // In exceptional cases, such as receiving WebView messaging after the view has been unmounted,
      // the WebView will not have a parent.
      // In this case, we simply return -1 to indicate that it was not found.

      return (swipeRefreshView?.parent as? View)?.id ?: -1
    }
  }
}
