package com.reactnativecommunity.webview.events;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class TopShouldStartLoadWithRequestEvent extends Event<TopMessageEvent> {
    public static final String EVENT_NAME = "topShouldStartLoadWithRequest";
    private final String mUrl;

    public TopShouldStartLoadWithRequestEvent(int viewId, String url) {
        super(viewId);
        mUrl = url;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public boolean canCoalesce() {
        return false;
    }

    @Override
    public short getCoalescingKey() {
        // All events for a given view can be coalesced.
        return 0;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        WritableMap data = Arguments.createMap();
        data.putString("url", mUrl);
        data.putString("navigationType", "other");
        rctEventEmitter.receiveEvent(getViewTag(), EVENT_NAME, data);
    }
}
