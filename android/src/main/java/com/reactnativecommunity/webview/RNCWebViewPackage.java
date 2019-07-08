package com.reactnativecommunity.webview;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class RNCWebViewPackage implements ReactPackage {

  private WebViewConfig globalNativeConfiguration;

  public RNCWebViewPackage(){
    super();
  }

  public RNCWebViewPackage(WebViewConfig globalConfigurator){
    super();
    this.globalNativeConfiguration = globalConfigurator;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Collections.singletonList(new RNCWebViewModule(reactContext));
  }

  // Deprecated from RN 0.47
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    RNCWebViewManager manager = globalNativeConfiguration != null ? new RNCWebViewManager(globalNativeConfiguration) : new RNCWebViewManager();
    return Collections.singletonList(manager);
  }
}
