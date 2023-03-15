package com.reactnativecommunity.webview.events
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

/**
 * Event emitted when page is printed to pdf
 */
class TopPrintEvent(surfaceId: Int, viewId: Int, private val mEventData: WritableMap) :
  Event<TopPrintEvent>(surfaceId, viewId) {

  companion object {
    const val EVENT_NAME = "topPrintEvent"
  }

  override fun getEventName(): String = EVENT_NAME

  override fun getEventData() = mEventData
}