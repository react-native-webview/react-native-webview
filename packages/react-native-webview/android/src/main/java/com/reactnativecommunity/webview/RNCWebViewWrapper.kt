package com.reactnativecommunity.webview

import android.content.Context
import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.widget.FrameLayout
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.facebook.react.uimanager.UIManagerHelper
import com.reactnativecommunity.webview.events.TopRefreshEvent

/**
 * A [FrameLayout] container to hold the [RNCWebView].
 * We need this to prevent WebView crash when the WebView is out of viewport and
 * [com.facebook.react.views.view.ReactViewGroup] clips the canvas.
 * The WebView will then create an empty offscreen surface and NPE.
 *
 * When a refresh control is set, a [RNCWebViewRefreshLayout] sits between this container and
 * the WebView. It is only created the first time a refresh control is enabled.
 */
class RNCWebViewWrapper(context: Context, val webView: RNCWebView) : FrameLayout(context) {
  private var refreshLayout: RNCWebViewRefreshLayout? = null
  private var refreshControlEnabled = false
  private var hasOnRefresh = false
  private var refreshing = false
  // True while the WebView reloads because of a pull that the app does not handle.
  private var autoRefreshing = false
  private var refreshControlTintColor: Int? = null
  private var refreshControlColors: IntArray? = null
  private var refreshControlProgressBackgroundColor: Int? = null
  private var refreshControlSize = SwipeRefreshLayout.DEFAULT
  private var refreshControlProgressViewOffset = 0f

  init {
    // We make the WebView as transparent on top of the container,
    // and let React Native sets background color for the container.
    webView.setBackgroundColor(Color.TRANSPARENT)
    addView(webView)
  }

  fun setRefreshControlEnabled(enabled: Boolean) {
    refreshControlEnabled = enabled
    if (!enabled && autoRefreshing) {
      setAutoRefreshing(false)
    }
    val layout = if (enabled) ensureRefreshLayout() else refreshLayout
    layout?.isEnabled = enabled
    webView.setRefreshParent(if (enabled) layout else null)
  }

  /**
   * Whether the app handles the refresh. Without a handler the WebView reloads the page and
   * hides the indicator by itself.
   */
  fun setHasOnRefresh(hasOnRefresh: Boolean) {
    this.hasOnRefresh = hasOnRefresh
    if (hasOnRefresh) {
      autoRefreshing = false
      refreshLayout?.isRefreshing = refreshing
    } else if (!autoRefreshing) {
      refreshLayout?.isRefreshing = false
    }
  }

  /** The `refreshing` prop of the refresh control. It only has a meaning with a handler. */
  fun setRefreshing(refreshing: Boolean) {
    this.refreshing = refreshing
    if (hasOnRefresh) {
      refreshLayout?.isRefreshing = refreshing
    }
  }

  /**
   * Called from JS when the indicator and the `refreshing` prop disagree, which happens when
   * the app does not set `refreshing` to `true` in response to `onRefresh`.
   */
  fun setNativeRefreshing(refreshing: Boolean) {
    if (hasOnRefresh) {
      refreshLayout?.isRefreshing = refreshing
    }
  }

  fun setRefreshControlTintColor(color: Int?) {
    refreshControlTintColor = color
    refreshLayout?.let { applyRefreshControlColors(it) }
  }

  fun setRefreshControlColors(colors: IntArray?) {
    refreshControlColors = colors
    refreshLayout?.let { applyRefreshControlColors(it) }
  }

  fun setRefreshControlProgressBackgroundColor(color: Int?) {
    refreshControlProgressBackgroundColor = color
    refreshLayout?.setProgressBackgroundColorSchemeColor(color ?: DEFAULT_PROGRESS_BACKGROUND_COLOR)
  }

  fun setRefreshControlSize(size: String?) {
    refreshControlSize = if (size == "large") SwipeRefreshLayout.LARGE else SwipeRefreshLayout.DEFAULT
    refreshLayout?.setSize(refreshControlSize)
  }

  fun setRefreshControlProgressViewOffset(offset: Float) {
    refreshControlProgressViewOffset = offset
    refreshLayout?.setProgressViewOffset(offset)
  }

  /** The page finished loading, failed to load, or its renderer is gone. */
  fun onLoadEnded() {
    if (autoRefreshing) {
      setAutoRefreshing(false)
    }
  }

  private fun setAutoRefreshing(refreshing: Boolean) {
    autoRefreshing = refreshing
    refreshLayout?.isRefreshing = refreshing
  }

  private fun onRefresh() {
    if (hasOnRefresh) {
      webView.dispatchEvent(webView, TopRefreshEvent(UIManagerHelper.getSurfaceId(webView), id))
    } else {
      autoRefreshing = true
      webView.reload()
    }
  }

  // SwipeRefreshLayout uses the tint color when no `colors` are given, so that a single
  // `tintColor` styles the indicator on both platforms.
  private fun applyRefreshControlColors(layout: RNCWebViewRefreshLayout) {
    val colors = refreshControlColors?.takeIf { it.isNotEmpty() }
      ?: intArrayOf(refreshControlTintColor ?: Color.BLACK)
    layout.setColorSchemeColors(*colors)
  }

  private fun ensureRefreshLayout(): RNCWebViewRefreshLayout {
    refreshLayout?.let { return it }

    val newLayout = RNCWebViewRefreshLayout(context)
    newLayout.setOnRefreshListener { onRefresh() }
    applyRefreshControlColors(newLayout)
    refreshControlProgressBackgroundColor?.let { newLayout.setProgressBackgroundColorSchemeColor(it) }
    newLayout.setSize(refreshControlSize)
    newLayout.setProgressViewOffset(refreshControlProgressViewOffset)
    newLayout.isRefreshing = hasOnRefresh && refreshing

    removeView(webView)
    newLayout.addView(webView, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
    addView(newLayout, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
    refreshLayout = newLayout

    // React Native lays this container out itself and ignores layout requests coming from
    // native children. If the container already has a size, the new child would never be
    // measured, so do it here.
    if (width > 0 && height > 0) {
      measure(
        MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
      )
      layout(left, top, right, bottom)
    }
    return newLayout
  }

  companion object {
    // The background SwipeRefreshLayout gives its indicator by default.
    private const val DEFAULT_PROGRESS_BACKGROUND_COLOR = 0xFFFAFAFA.toInt()

    /**
     * A helper to get the [RNCWebViewWrapper] of the given WebView, if it is still mounted.
     */
    @JvmStatic
    fun fromWebView(webView: WebView): RNCWebViewWrapper? {
      return getContainer(webView) as? RNCWebViewWrapper
    }

    /**
     * A helper to get react tag id by given WebView
     */
    @JvmStatic
    fun getReactTagFromWebView(webView: WebView): Int {
      // It is expected that the webView is enclosed by [RNCWebViewWrapper], either directly or
      // through its refresh layout. Therefore, it must have a container, and the container ID
      // is the reactTag.
      // In exceptional cases, such as receiving WebView messaging after the view has been unmounted,
      // the WebView will not have a parent.
      // In this case, we simply return -1 to indicate that it was not found.
      return (getContainer(webView) as? View)?.id ?: -1
    }

    private fun getContainer(webView: WebView): Any? {
      val parent = webView.parent
      return if (parent is RNCWebViewRefreshLayout) parent.parent else parent
    }
  }
}
