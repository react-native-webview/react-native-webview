package com.reactnativecommunity.webview.events

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

/**
 * Event emitted when there is a loading progress event.
 */
class TopCustomMenuSelectionEvent(
  surfaceId: Int, viewId: Int, private val mEventData: WritableMap
) : Event<TopCustomMenuSelectionEvent>(surfaceId, viewId) {
  companion object {
    const val EVENT_NAME = "topCustomMenuSelection"
  }

  override fun getEventName(): String = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData() = mEventData
}
