package com.reactnativecommunity.webview.events

 import com.facebook.react.bridge.WritableMap
 import com.facebook.react.uimanager.events.Event
 import com.facebook.react.uimanager.events.RCTEventEmitter

 /**
  * Event emitted when there is an error in loading.
  */
 class TopPermissionRequestEvent(viewId: Int, private val mEventData: WritableMap) : Event<TopPermissionRequestEvent>(viewId) {
   companion object {
     const val EVENT_NAME = "topPermissionRequest"
   }

   override fun getEventName(): String = EVENT_NAME

   override fun canCoalesce(): Boolean = false

   override fun getCoalescingKey(): Short = 0

   override fun dispatch(rctEventEmitter: RCTEventEmitter) {
     rctEventEmitter.receiveEvent(viewTag, EVENT_NAME, mEventData)
   }
 }
