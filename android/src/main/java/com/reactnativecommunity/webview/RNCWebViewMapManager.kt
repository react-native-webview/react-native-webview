package com.reactnativecommunity.webview

import android.webkit.WebView

object RNCWebViewMapManager {
  val rncWebViewMap = mutableMapOf<String, RNCWebView>()
  val internalWebViewMap = mutableMapOf<String, WebView>()
}
