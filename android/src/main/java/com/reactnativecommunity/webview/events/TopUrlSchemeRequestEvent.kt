package com.reactnativecommunity.webview.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter

class TopUrlSchemeRequestEvent(viewId: Int, private val mRequestId: String) : Event<TopUrlSchemeRequestEvent>(viewId) {
    companion object {
        const val EVENT_NAME = "topUrlSchemeRequest"
    }

    override fun getEventName(): String = EVENT_NAME

    override fun canCoalesce(): Boolean = false

    override fun getCoalescingKey(): Short = 0

    override fun dispatch(rctEventEmitter: RCTEventEmitter) {
        val data = Arguments.createMap()
        data.putString("requestId", mRequestId)
        rctEventEmitter.receiveEvent(viewTag, eventName, data)
    }
}
