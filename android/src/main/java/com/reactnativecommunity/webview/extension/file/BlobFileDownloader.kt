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

		fun getBase64StringFromBlobUrl(blobUrl: String): String {
			return """
                javascript: var xhr = new XMLHttpRequest();
                xhr.open('GET', '$blobUrl', true);
                xhr.responseType = 'blob';
                xhr.onload = function(e) {
                    if (this.status == 200) {
                        var blobFile = this.response;
                        var reader = new FileReader();
                        reader.readAsDataURL(blobFile);
                        reader.onloadend = function() {
                            var base64 = reader.result;
                            ${JS_INTERFACE_TAG}.getBase64FromBlobData(base64);
                        }
                    }
                };
                xhr.send();
            """.trimIndent()
		}
	}
}
