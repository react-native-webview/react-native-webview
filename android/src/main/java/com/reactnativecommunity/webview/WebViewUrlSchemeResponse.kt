package com.reactnativecommunity.webview.events

import com.facebook.common.logging.FLog
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.facebook.react.common.ReactConstants
import java.util.HashMap

sealed class WebViewUrlSchemeResult {
    companion object {
        fun from(readableMap: ReadableMap): WebViewUrlSchemeResult {
            try {
                val responseMap = safeGetMap(readableMap, "response") ?: return WebViewUrlSchemeResultError("Missing required field response")

                val responseType = safeGetString(responseMap, "type") ?: return WebViewUrlSchemeResultError("Missing required field type")

                when (responseType) {
                    "redirect" -> {
                        val url = safeGetString(responseMap, "url") ?: return WebViewUrlSchemeResultError("Missing required field url")
                        val method = safeGetString(responseMap, "method") ?: return WebViewUrlSchemeResultError("Missing required field string")
                        val (headers, headerError) = parseHeaders(responseMap, "headers")
                        if (headers == null) {
                            return headerError ?: WebViewUrlSchemeResultError("Missing required field header")
                        }

                        val body: String? = safeGetString(responseMap, "body")

                        return WebViewUrlSchemeResultRedirect(url, method, headers, body)
                    }

                    "response" -> {
                        val url = safeGetString(responseMap, "url") ?: return WebViewUrlSchemeResultError("Missing required field url")
                        val status = safeGetInt(responseMap, "status") ?: return WebViewUrlSchemeResultError("Missing required field status")

                        val (headers, headerError) = parseHeaders(responseMap, "headers")
                        if (headers == null) {
                            return headerError ?: WebViewUrlSchemeResultError("Missing required field header")
                        }

                        val body: String? = safeGetString(responseMap, "body")

                        return WebViewUrlSchemeResultResponse(url, status, headers, body)
                    }

                    "file" -> {
                        val url = safeGetString(responseMap, "url") ?: return WebViewUrlSchemeResultError("Missing required field url")
                        val file = safeGetString(responseMap, "file") ?: return WebViewUrlSchemeResultError("Missing required field file")

                        val (headers, headerError) = parseHeaders(responseMap, "headers")
                        if (headers == null) {
                            return headerError ?: WebViewUrlSchemeResultError("Missing required field header")
                        }

                        return WebViewUrlSchemeResultFile(url, file, headers)
                    }

                    "error" -> {
                        val message = safeGetString(responseMap, "message") ?: "Error processing request"

                        return WebViewUrlSchemeResultError(message)
                    }

                    else -> {
                        return WebViewUrlSchemeResultError("Unknown type of message: '$responseType'")
                    }
                }
            } catch (exn: Exception) {
                FLog.w(ReactConstants.TAG, "Error converting response from onUrlSchemeRequest.", exn)

                return WebViewUrlSchemeResultError("Error converting response")
            }
        }

        fun safeGetString(readableMap: ReadableMap, key: String): String? {
            if (!readableMap.hasKey(key)) {
                return null
            }

            if (readableMap.getType(key) != ReadableType.String) {
                return null
            }

            return readableMap.getString(key)
        }

        fun safeGetInt(readableMap: ReadableMap, key: String): Int? {
            if (!readableMap.hasKey(key)) {
                return null
            }

            if (readableMap.getType(key) != ReadableType.Number) {
                return null
            }

            return readableMap.getInt(key)
        }

        fun safeGetMap(readableMap: ReadableMap, key: String): ReadableMap? {
            if (!readableMap.hasKey(key)) {
                return null
            }

            if (readableMap.getType(key) != ReadableType.Map) {
                return null
            }

            return readableMap.getMap(key)
        }

        fun parseHeaders(responseMap: ReadableMap, key: String): Pair<Map<String, String>?, WebViewUrlSchemeResultError?> {
            val headers = HashMap<String, String>()
            val headerMap = safeGetMap(responseMap, key) ?: return Pair(null, WebViewUrlSchemeResultError("Missing required field headers"))

            val iterator = headerMap.keySetIterator()
            while (iterator.hasNextKey()) {
                val key = iterator.nextKey()
                val keyValue = safeGetString(headerMap, key)
                        ?: return Pair(null, WebViewUrlSchemeResultError("Non-string header value for key: '$key'"))

                // Lower Case headers for case insensitive search.
                headers[key.toLowerCase()] = keyValue
            }

            // This is to work around the lack of an Either type, By
            return Pair(headers, null)
        }
    }
}

data class WebViewUrlSchemeResultError(val message: String) : WebViewUrlSchemeResult()

data class WebViewUrlSchemeResultRedirect(val url: String,
    val method: String,
    val headers: Map<String, String>,
    val body: String?) : WebViewUrlSchemeResult()

data class WebViewUrlSchemeResultResponse(val url: String,
                                          val status: Int,
                                          val headers: Map<String, String>,
                                          val body: String?) : WebViewUrlSchemeResult()

data class WebViewUrlSchemeResultFile(val url: String,
                                      val file: String,
                                      val headers: Map<String, String>) : WebViewUrlSchemeResult()

