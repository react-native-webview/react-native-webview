package com.reactnativecommunity.webview;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.reactnativecommunity.webview.RNCWebViewManager;
import com.reactnativecommunity.webview.RNCWebViewModule;

import org.jetbrains.annotations.NotNull;

import java.util.List;

import kotlin.collections.CollectionsKt;
import kotlin.jvm.internal.Intrinsics;

public final class RNCWebViewPackage implements ReactPackage {
  @NotNull
  public List createNativeModules(@NotNull ReactApplicationContext reactContext) {
    Intrinsics.checkParameterIsNotNull(reactContext, "reactContext");
    return CollectionsKt.listOf(new RNCWebViewModule(reactContext));
  }

  @NotNull
  public List createViewManagers(@NotNull ReactApplicationContext reactContext) {
    Intrinsics.checkParameterIsNotNull(reactContext, "reactContext");
    return CollectionsKt.listOf(new RNCWebViewManager());
  }
}