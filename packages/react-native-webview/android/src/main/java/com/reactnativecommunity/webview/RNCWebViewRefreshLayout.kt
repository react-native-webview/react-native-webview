package com.reactnativecommunity.webview

import android.content.Context
import android.view.MotionEvent
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.facebook.react.uimanager.PixelUtil

/**
 * The [SwipeRefreshLayout] that shows the refresh indicator above the [RNCWebView].
 *
 * A stock [SwipeRefreshLayout] decides when to take over a gesture by asking its child whether
 * it can scroll up. A WebView cannot answer that: the page may scroll inside an inner element,
 * be a map, or be zoomed in. So this layout never looks at touch events. The [RNCWebView]
 * instead hands it, through the nested scrolling callbacks, the part of the gesture that the
 * page did not consume at its top edge.
 */
class RNCWebViewRefreshLayout(context: Context) : SwipeRefreshLayout(context) {
  private var didLayout = false
  private var refreshing = false
  private var progressViewOffset = 0f
  private var hasCustomProgressViewOffset = false

  init {
    // A ScrollView's refresh control takes the touches itself and counts half of the finger
    // movement, so that it refreshes after twice the default distance. This layout is given
    // the whole movement: ask for twice the distance to refresh after the same pull.
    setDistanceToTriggerSync(Math.round(PixelUtil.toPixelFromDIP(2 * DEFAULT_CIRCLE_TARGET)))
  }

  override fun onInterceptTouchEvent(ev: MotionEvent): Boolean = false

  override fun onTouchEvent(ev: MotionEvent): Boolean = false

  override fun requestDisallowInterceptTouchEvent(disallowIntercept: Boolean) {
    // SwipeRefreshLayout drops the request when its child has not opted in to nested scrolling.
    // This layout never intercepts, so the request is only useful to the views above it.
    parent?.requestDisallowInterceptTouchEvent(disallowIntercept)
  }

  override fun setRefreshing(refreshing: Boolean) {
    this.refreshing = refreshing
    // SwipeRefreshLayout ignores `setRefreshing(true)` until it has been laid out.
    if (didLayout) {
      super.setRefreshing(refreshing)
    }
  }

  fun setProgressViewOffset(offset: Float) {
    if (offset == progressViewOffset) {
      return
    }
    progressViewOffset = offset
    if (didLayout) {
      applyProgressViewOffset()
    }
  }

  private fun applyProgressViewOffset() {
    // Leave the default position alone unless an offset was asked for: a custom position
    // changes how SwipeRefreshLayout hides the indicator.
    if (progressViewOffset == 0f && !hasCustomProgressViewOffset) {
      return
    }
    hasCustomProgressViewOffset = true
    // The indicator's size is only known once the layout has been measured.
    val diameter = progressCircleDiameter
    val start = Math.round(PixelUtil.toPixelFromDIP(progressViewOffset)) - diameter
    val end = Math.round(PixelUtil.toPixelFromDIP(progressViewOffset + DEFAULT_CIRCLE_TARGET)) - diameter
    setProgressViewOffset(false, start, end)
  }

  override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
    super.onLayout(changed, left, top, right, bottom)
    if (!didLayout) {
      didLayout = true
      applyProgressViewOffset()
      super.setRefreshing(refreshing)
    }
  }

  companion object {
    // Distance in dp between the resting position of the indicator and where it spins.
    private const val DEFAULT_CIRCLE_TARGET = 64f
  }
}
