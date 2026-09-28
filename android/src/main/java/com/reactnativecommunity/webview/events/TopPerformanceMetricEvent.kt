package com.reactnativecommunity.webview.events

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

/**
 * Event emitted when the main frame reports a web performance metric.
 */
class TopPerformanceMetricEvent(surfaceId: Int, viewId: Int, private val mEventData: WritableMap) :
  Event<TopPerformanceMetricEvent>(surfaceId, viewId) {
  companion object {
    const val EVENT_NAME = "topPerformanceMetric"
  }

  override fun getEventName(): String = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap = mEventData
}
