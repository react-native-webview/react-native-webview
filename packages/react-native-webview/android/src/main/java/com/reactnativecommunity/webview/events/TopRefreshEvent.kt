package com.reactnativecommunity.webview.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

/**
 * Event emitted when the user has pulled the WebView down far enough to refresh
 * and the app handles the refresh itself (`onRefresh` is set).
 */
class TopRefreshEvent(surfaceId: Int, viewId: Int) :
  Event<TopRefreshEvent>(surfaceId, viewId) {
  companion object {
    const val EVENT_NAME = "topRefresh"
  }

  override fun getEventName(): String = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap = Arguments.createMap()

}
