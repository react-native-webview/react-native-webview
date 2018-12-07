package com.reactnativecommunity.webview.events

sealed class WebViewUrlSchemeResult;

data class WebViewUrlSchemeResultError(val message: String) : WebViewUrlSchemeResult()

data class WebViewUrlSchemeResultRedirect(val url: String,
    val method: String,
    val headers: Map<String, String>,
    val body: String) : WebViewUrlSchemeResult()

data class WebViewUrlSchemeResultResponse(val url: String,
                                         val status: Int,
                                         val headers: Map<String, String>,
                                         val body: String) : WebViewUrlSchemeResult()
