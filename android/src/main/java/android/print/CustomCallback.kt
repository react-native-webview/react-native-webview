package android.print

import android.os.Build
import android.webkit.WebView
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.reactnativecommunity.webview.events.TopPrintEvent
import java.io.File


@RequiresApi(Build.VERSION_CODES.KITKAT)
open class CustomLayoutCallback: PrintDocumentAdapter.LayoutResultCallback()

@RequiresApi(Build.VERSION_CODES.KITKAT)
open class CustomWriteResultCallback(private var webView: WebView, private var file: File
                               ): PrintDocumentAdapter.WriteResultCallback(){

  override fun onWriteFinished(pages: Array<out PageRange>?) {
    val eventData = Arguments.createMap()
    eventData.putString("file", file.absolutePath)
    val reactContext = webView.context as ReactContext
    val eventDispatcher = reactContext.getNativeModule(UIManagerModule::class.java)!!.eventDispatcher
    eventDispatcher.dispatchEvent( TopPrintEvent(-1,   webView.id, eventData))
  }

  override fun onWriteFailed(error: CharSequence?) {
    val eventData = Arguments.createMap()
    eventData.putString("error", error.toString())
    val reactContext = webView.context as ReactContext
    val eventDispatcher = reactContext.getNativeModule(UIManagerModule::class.java)!!.eventDispatcher
    eventDispatcher.dispatchEvent( TopPrintEvent(-1,   webView.id, eventData))
  }
}
