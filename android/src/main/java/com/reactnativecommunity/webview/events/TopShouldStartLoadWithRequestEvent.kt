package com.reactnativecommunity.webview.events

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

/**
 * Event emitted when shouldOverrideUrlLoading is called
 */
class TopShouldStartLoadWithRequestEvent(
  surfaceId: Int, viewId: Int, private val mData: WritableMap
) : Event<TopShouldStartLoadWithRequestEvent>(surfaceId, viewId) {
  companion object {
    const val EVENT_NAME = "topShouldStartLoadWithRequest"
  }

  init {
    mData.putString("navigationType", "other")
    // Android does not raise shouldOverrideUrlLoading for inner frames
    mData.putBoolean("isTopFrame", true)
  }

  override fun getEventName(): String = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData() = mData
}
