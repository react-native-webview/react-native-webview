package com.reactnativecommunity.webview

import android.app.Application
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import com.gigya.android.sdk.Gigya
import com.gigya.android.sdk.GigyaPluginCallback
import com.gigya.android.sdk.account.models.GigyaAccount
import com.gigya.android.sdk.session.SessionInfo
import com.gigya.android.sdk.ui.plugin.IGigyaWebBridge

class RNCGigya(context: Application, apiKey: String, apiDomain: String) {
  private var gigya: Gigya<GigyaAccount>

  init {
    Gigya.setApplication(context)
    gigya = Gigya.getInstance(GigyaAccount::class.java)
    gigya.init(apiKey, apiDomain)
  }

  fun initialize(sessionToken: String, sessionSecret: String, webview: WebView) {
    attachBridge(webview)
    logUser(sessionToken = sessionToken, sessionSecret = sessionSecret)
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
