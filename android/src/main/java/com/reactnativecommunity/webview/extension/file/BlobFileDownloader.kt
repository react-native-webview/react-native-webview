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

    /**
     * Invokes JS method downloadBlob from [getBlobFileInterceptor]
     */
    fun getDownloadBlobInterceptor(url: String): String = "downloadBlob('$url');"

    /**
     * This script handles Blob downloading in two ways:
     * 1) It intercepts clicks on elements with a Blob: href.
     * 2) It defines a method, downloadBlob, which is manually invoked from Android [com.reactnativecommunity.webview.RNCWebViewManagerImpl] in cases where the href is undefined.
     */
    fun getBlobFileInterceptor(): String = """
       (function() {
            if (window.blobDownloadInjected) return;
            window.blobDownloadInjected = true;
            
            function blobToBase64(blob, callback) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    const base64 = reader.result;
                    callback(base64);
                };
                reader.readAsDataURL(blob);
            }
            
            function downloadBlobUrl(url) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                xhr.onload = function() {
                    if (this.status === 200) {
                        const blob = this.response;
                        blobToBase64(blob, function(base64) {
                            ${JS_INTERFACE_TAG}.getBase64FromBlobData(base64);
                        });
                    }
                };
                xhr.send();
            }
            
            document.addEventListener('click', function(e) {
                const target = e.target;
                if (target.tagName === 'A' && target.href && target.href.startsWith('blob:')) {
                    e.preventDefault();
                    downloadBlobUrl(target.href);
                }
            }, true);
            
            window.downloadBlob = downloadBlobUrl;
        })();
      """.trimIndent()
	}
}
