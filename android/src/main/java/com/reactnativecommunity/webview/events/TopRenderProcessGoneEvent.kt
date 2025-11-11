package com.reactnativecommunity.webview.events

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

/**
 * Event emitted when the WebView's process has crashed or
 * was killed by the OS.
 */
class TopRenderProcessGoneEvent(
  surfaceId: Int, viewId: Int, private val mEventData: WritableMap
) : Event<TopRenderProcessGoneEvent>(surfaceId, viewId) {
  companion object {
    const val EVENT_NAME = "topRenderProcessGone"
  }

  override fun getEventName(): String = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData() = mEventData
}
