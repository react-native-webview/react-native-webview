package com.reactnativecommunity.webview.extension.file

import android.content.Context
import android.webkit.JavascriptInterface
import com.reactnativecommunity.webview.RNCWebView
import com.reactnativecommunity.webview.extension.file.Base64FileDownloader.downloadBase64File
import java.io.IOException

internal fun RNCWebView.addBlobFileDownloaderJavascriptInterface(downloadingMessage: String, requestFilePermission: (String) -> Unit) {
	this.addJavascriptInterface(
		BlobFileDownloader(this.context, downloadingMessage, requestFilePermission),
		BlobFileDownloader.JS_INTERFACE_TAG,
	)
}

internal class BlobFileDownloader(
	private val context: Context,
	private val downloadingMessage: String,
	private val requestFilePermission: (String) -> Unit,
) {

	@JavascriptInterface
	@Throws(IOException::class)
	fun getBase64FromBlobData(base64: String) {
		downloadBase64File(context, base64, downloadingMessage, requestFilePermission)
	}

	companion object {
		const val JS_INTERFACE_TAG: String = "BlobFileDownloader"

    fun getBlobFileInterceptor(): String =
      """
        (function() {
          const originalCreateObjectURL = URL.createObjectURL;
          URL.createObjectURL = function(blob) {
            const url = originalCreateObjectURL.call(URL, blob);
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              const base64 = reader.result;
              ${JS_INTERFACE_TAG}.getBase64FromBlobData(base64);
            };
            return url;
          };
        })();
    """.trimIndent()
	}
}
