package com.reactnativecommunity.webview

import android.webkit.WebView

object RNCWebViewMapManager {
  // This map is maintained to keep track of the existing RNCWebViews for a given webViewKey
  // It is required so we can perform view cleanup, and re-parenting existing WebViews
  val rncWebViewMap = mutableMapOf<String, RNCWebView>()

  // This map is maintained to keep track of the WebView object (specifically the InternalWebView)
  // In order for react and the Android System to cleanup the wrapper RNCWebView, we keep a reference only
  // to the internal webview after the view has been unmounted, and not the wrapper.
  val internalWebViewMap = mutableMapOf<String, WebView>()

  // This contains a mapping from InternalWebView-viewId to RNCWebView-viewId
  // In order for communication to work from native to react-native, the views are linked by
  // the viewId. See https://reactnative.dev/docs/native-components-android#events
  // This map facilitates finding the viewId of the wrapper RNCWebView from the WebView
  // view Id.
  val viewIdMap = mutableMapOf<Integer, Integer>();
}
