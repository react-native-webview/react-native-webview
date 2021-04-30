package com.reactnativecommunity.webview.events;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.jetbrains.annotations.NotNull;

import kotlin.Metadata;
import kotlin.jvm.internal.Intrinsics;

@Metadata(
  mv = {1, 1, 18},
  bv = {1, 0, 3},
  k = 1,
  d1 = {"\u00008\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\b\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u000b\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\n\n\u0000\n\u0002\u0010\u000e\n\u0002\b\u0002\u0018\u0000 \u00112\b\u0012\u0004\u0012\u00020\u00000\u0001:\u0001\u0011B\u0015\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u0012\u0006\u0010\u0004\u001a\u00020\u0005¢\u0006\u0002\u0010\u0006J\b\u0010\u0007\u001a\u00020\bH\u0016J\u0010\u0010\t\u001a\u00020\n2\u0006\u0010\u000b\u001a\u00020\fH\u0016J\b\u0010\r\u001a\u00020\u000eH\u0016J\b\u0010\u000f\u001a\u00020\u0010H\u0016R\u000e\u0010\u0004\u001a\u00020\u0005X\u0082\u0004¢\u0006\u0002\n\u0000¨\u0006\u0012"},
  d2 = {"Lcom/reactnativecommunity/webview/events/TopShouldStartLoadWithRequestEvent;", "Lcom/facebook/react/uimanager/events/Event;", "viewId", "", "mData", "Lcom/facebook/react/bridge/WritableMap;", "(ILcom/facebook/react/bridge/WritableMap;)V", "canCoalesce", "", "dispatch", "", "rctEventEmitter", "Lcom/facebook/react/uimanager/events/RCTEventEmitter;", "getCoalescingKey", "", "getEventName", "", "Companion", "android_debug"}
)
public final class TopShouldStartLoadWithRequestEvent extends Event {
  private final WritableMap mData;
  @NotNull
  public static final String EVENT_NAME = "topShouldStartLoadWithRequest";

  public TopShouldStartLoadWithRequestEvent(int viewId, @NotNull WritableMap mData) {
    super(viewId);
    Intrinsics.checkParameterIsNotNull(mData, "mData");
    this.mData = mData;
    this.mData.putString("navigationType", "other");
  }

  @NotNull
  public String getEventName() {
    return EVENT_NAME;
  }

  @Override
  public boolean canCoalesce() {
    return false;
  }

  @Override
  public short getCoalescingKey() {
    return 0;
  }

  @Override
  public void dispatch(@NotNull RCTEventEmitter rctEventEmitter) {
    Intrinsics.checkParameterIsNotNull(rctEventEmitter, "rctEventEmitter");
    rctEventEmitter.receiveEvent(this.getViewTag(), getEventName(), this.mData);
  }
}
