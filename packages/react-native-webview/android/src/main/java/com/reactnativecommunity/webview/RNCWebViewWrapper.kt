package com.reactnativecommunity.webview

import android.content.Context
import android.graphics.Color
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.widget.FrameLayout
import androidx.core.graphics.ColorUtils
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
  // Hides the indicator of such a reload when nothing reports its end. Not posted on the view:
  // a detached view only runs what it was posted once it is attached again.
  private val autoRefreshTimeoutHandler = Handler(Looper.getMainLooper())
  private val autoRefreshTimeout = Runnable { setAutoRefreshing(false) }
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
      if (autoRefreshing) {
        setAutoRefreshing(false)
      }
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
    refreshLayout?.let { applyRefreshControlColors(it) }
  }

  fun setRefreshControlSize(size: String?) {
    refreshControlSize = if (size == "large") SwipeRefreshLayout.LARGE else SwipeRefreshLayout.DEFAULT
    refreshLayout?.setSize(refreshControlSize)
  }

  fun setRefreshControlProgressViewOffset(offset: Float) {
    refreshControlProgressViewOffset = offset
    refreshLayout?.setProgressViewOffset(offset)
  }

  /**
   * The page finished loading, failed to load, its renderer is gone, or the reload was
   * cancelled.
   */
  fun onLoadEnded() {
    if (autoRefreshing) {
      setAutoRefreshing(false)
    }
  }

  /** The view is dropped by React Native: nothing may run on it later. */
  fun onDropViewInstance() {
    autoRefreshTimeoutHandler.removeCallbacks(autoRefreshTimeout)
  }

  private fun setAutoRefreshing(refreshing: Boolean) {
    autoRefreshing = refreshing
    autoRefreshTimeoutHandler.removeCallbacks(autoRefreshTimeout)
    if (refreshing) {
      // A reload does not always report its end: it may start nothing (no page to reload, dead
      // renderer) or turn into something that is not a page (a download).
      autoRefreshTimeoutHandler.postDelayed(autoRefreshTimeout, AUTO_REFRESH_TIMEOUT_MS)
    }
    refreshLayout?.isRefreshing = refreshing
  }

  private fun onRefresh() {
    if (hasOnRefresh) {
      webView.dispatchEvent(webView, TopRefreshEvent(UIManagerHelper.getSurfaceId(webView), id))
    } else {
      setAutoRefreshing(true)
      webView.reload()
    }
  }

  // SwipeRefreshLayout uses the tint color when no `colors` are given, so that a single
  // `tintColor` styles the indicator on both platforms.
  private fun applyRefreshControlColors(layout: RNCWebViewRefreshLayout) {
    val colors = refreshControlColors?.takeIf { it.isNotEmpty() }
    val tintColor = refreshControlTintColor
    layout.setColorSchemeColors(*(colors ?: intArrayOf(tintColor ?: Color.BLACK)))

    // A light tint, like the white one meant for dark pages, would not show on the default
    // light disc: give it a dark one, unless the app chose the disc color.
    val tintNeedsDarkBackground = colors == null && tintColor != null &&
      ColorUtils.calculateContrast(tintColor, DEFAULT_PROGRESS_BACKGROUND_COLOR) < MIN_TINT_CONTRAST
    val backgroundColor = refreshControlProgressBackgroundColor
      ?: if (tintNeedsDarkBackground) DARK_PROGRESS_BACKGROUND_COLOR else DEFAULT_PROGRESS_BACKGROUND_COLOR
    layout.setProgressBackgroundColorSchemeColor(backgroundColor)
  }

  private fun ensureRefreshLayout(): RNCWebViewRefreshLayout {
    refreshLayout?.let { return it }

    val newLayout = RNCWebViewRefreshLayout(context)
    newLayout.setOnRefreshListener { onRefresh() }
    applyRefreshControlColors(newLayout)
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
    // The background used instead when the tint color would not show on the default one.
    private const val DARK_PROGRESS_BACKGROUND_COLOR = 0xFF424242.toInt()
    // Contrast ratio under which a tint color is considered unreadable on a background.
    private const val MIN_TINT_CONTRAST = 3.0
    // How long the indicator of an automatic refresh may stay when nothing reports the end of
    // the reload. The page keeps loading, only the indicator goes.
    private const val AUTO_REFRESH_TIMEOUT_MS = 10_000L

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
