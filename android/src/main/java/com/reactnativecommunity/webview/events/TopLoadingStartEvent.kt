package com.reactnativecommunity.webview.events

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

/**
 * Event emitted when loading has started
 */
class TopLoadingStartEvent(viewId: Int, private val mEventData: WritableMap) :
  Event<TopLoadingStartEvent>(viewId) {
  companion object {
    const val EVENT_NAME = "topLoadingStart"
  }

  override fun getEventName(): String = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? = mEventData


}
