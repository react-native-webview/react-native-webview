package com.reactnativecommunity.webview.events

sealed class WebViewUrlSchemeResponse;

data class WebViewUrlSchemeResponseError(val message: String) : WebViewUrlSchemeResponse();

data class WebViewUrlSchemeResponseRedirect(val url: String,
    val method: String,
    val headers: Map<String, String>,
    val body: String) : WebViewUrlSchemeResponse();

data class WebViewUrlSchemeResponseValue(val url: String,
                                         val status: Int,
                                         val headers: Map<String, String>,
                                         val body: String) : WebViewUrlSchemeResponse();

class WebViewUrlSchemeResponsePass : WebViewUrlSchemeResponse();