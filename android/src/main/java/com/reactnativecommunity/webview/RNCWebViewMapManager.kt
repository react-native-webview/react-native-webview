package com.reactnativecommunity.webview

import android.webkit.WebView

object RNCWebViewMapManager {

  // This map is maintained to keep track of the WebView object (specifically the RNCWebView)
  // In order for react and the Android System to clean up the wrapper RNCWebViewContainer, we
  // keep a reference only to the WebView after the view has been unmounted, and not the wrapper.
  val rncWebViewMap = mutableMapOf<String, WebView>()

  // This contains a mapping from RNCWebView-viewId to RNCWebViewContainer-viewId
  // In order for communication to work from native to react-native, the views are linked by
  // the viewId. See https://reactnative.dev/docs/native-components-android#events
  // This map facilitates finding the viewId of the wrapper RNCWebView from the WebView
  // view Id.
  val viewIdMap = mutableMapOf<Integer, Integer>();
}
