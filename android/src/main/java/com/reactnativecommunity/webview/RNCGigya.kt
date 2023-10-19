package com.reactnativecommunity.webview

import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import com.gigya.android.sdk.Gigya
import com.gigya.android.sdk.GigyaPluginCallback
import com.gigya.android.sdk.account.models.GigyaAccount
import com.gigya.android.sdk.session.SessionInfo
import com.gigya.android.sdk.ui.plugin.IGigyaWebBridge

class RNCGigya {
  var gigya = Gigya.getInstance(GigyaAccount::class.java)

  fun init(sessionToken: String, sessionSecret: String, apiKey: String, apiDomain: String, webview: WebView) {
    gigya.init(apiKey, apiDomain)
    attachBridge(webview)
    logUser(sessionToken, sessionSecret)
  }

  private fun logUser(sessionToken: String, sessionSecret: String) {
    val session = SessionInfo(sessionSecret, sessionToken)
    gigya.setSession(session)
  }


  private fun attachBridge(webview: WebView) {
    var webBridge: IGigyaWebBridge<GigyaAccount>? = null

    /*
    Make sure you enable javascript for your WebView instance.
    */
    val webSettings = webview.settings
    webSettings.javaScriptEnabled = true

    webBridge = gigya.createWebBridge()
    webBridge?.attachTo(webview, object: GigyaPluginCallback<GigyaAccount>() {}, null)

    /*
    Make sure to attach the GigyaWebBridge to your WebViewClient instance.
    */
    webview.webViewClient = (object: WebViewClient() {
      override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        val uri = request?.url
        val uriString = uri.toString()
        return webBridge?.invoke(uriString) ?: false
      }
    })
  }
}
