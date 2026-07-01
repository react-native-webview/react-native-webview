package com.reactnativecommunity.webview

import android.app.DownloadManager
import android.content.pm.ActivityInfo
import android.graphics.Bitmap
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.webkit.CookieManager
import android.webkit.DownloadListener
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.webkit.WebSettingsCompat
import androidx.webkit.WebViewFeature
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.common.build.ReactBuildConfig
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RNCWebViewManagerDelegate
import com.facebook.react.viewmanagers.RNCWebViewManagerInterface
import com.facebook.react.views.scroll.ScrollEventType
import com.reactnativecommunity.webview.events.SubResourceErrorEvent
import com.reactnativecommunity.webview.events.TopCustomMenuSelectionEvent
import com.reactnativecommunity.webview.events.TopHttpErrorEvent
import com.reactnativecommunity.webview.events.TopLoadingErrorEvent
import com.reactnativecommunity.webview.events.TopLoadingFinishEvent
import com.reactnativecommunity.webview.events.TopLoadingProgressEvent
import com.reactnativecommunity.webview.events.TopLoadingStartEvent
import com.reactnativecommunity.webview.events.TopMessageEvent
import com.reactnativecommunity.webview.events.TopOpenWindowEvent
import com.reactnativecommunity.webview.events.TopRenderProcessGoneEvent
import com.reactnativecommunity.webview.events.TopShouldStartLoadWithRequestEvent
import org.json.JSONException
import org.json.JSONObject
import java.io.UnsupportedEncodingException
import java.net.MalformedURLException
import java.net.URL
import java.util.Locale

val invalidCharRegex = "[\\\\/%\"]".toRegex()

@ReactModule(name = RNCWebViewManager.NAME)
open class RNCWebViewManager : ViewGroupManager<RNCWebViewWrapper>(),
    RNCWebViewManagerInterface<RNCWebViewWrapper> {

    companion object {
        const val NAME = "RNCWebView"

        private const val HTML_ENCODING = "UTF-8"
        private const val HTML_MIME_TYPE = "text/html"
        private const val HTTP_METHOD_POST = "POST"

        // Use `webView.loadUrl("about:blank")` to reliably reset the view
        // state and release page resources (including any running JavaScript).
        private const val BLANK_URL = "about:blank"

        private const val DEFAULT_DOWNLOADING_MESSAGE = "Downloading"
        private const val DEFAULT_LACK_PERMISSION_TO_DOWNLOAD_MESSAGE =
            "Cannot download files as permission was denied. Please provide permission to write to storage, in order to download files."
    }

    private val TAG = "RNCWebViewManager"

    private val mDelegate: ViewManagerDelegate<RNCWebViewWrapper> =
        RNCWebViewManagerDelegate<RNCWebViewWrapper, RNCWebViewManager>(this)

    private var mWebViewConfig: RNCWebViewConfig = RNCWebViewConfig { webView: WebView? -> }
    private var mAllowsFullscreenVideo = false
    private var mAllowsProtectedMedia = false
    private var mDownloadingMessage: String? = null
    private var mLackPermissionToDownloadMessage: String? = null
    private var mHasOnOpenWindowEvent = false
    private var mPendingSource: ReadableMap? = null

    private var mUserAgent: String? = null
    private var mUserAgentWithApplicationName: String? = null

    override fun getDelegate(): ViewManagerDelegate<RNCWebViewWrapper> = mDelegate

    override fun getName(): String = NAME

    protected open fun createRNCWebViewInstance(context: ThemedReactContext): RNCWebView {
        return RNCWebView(context)
    }

    override fun createViewInstance(context: ThemedReactContext): RNCWebViewWrapper {
        val webView = createRNCWebViewInstance(context)
        return createViewInstance(context, webView)
    }

    fun createViewInstance(context: ThemedReactContext, webView: RNCWebView): RNCWebViewWrapper {
        setupWebChromeClient(webView)
        context.addLifecycleEventListener(webView)
        mWebViewConfig.configWebView(webView)
        val settings = webView.settings
        settings.builtInZoomControls = true
        settings.displayZoomControls = false
        settings.domStorageEnabled = true
        settings.setSupportMultipleWindows(true)
        settings.allowFileAccess = false
        settings.allowContentAccess = false
        settings.allowFileAccessFromFileURLs = false
        settings.allowUniversalAccessFromFileURLs = false
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW

        // Fixes broken full-screen modals/galleries due to body height being 0.
        webView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        if (ReactBuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
        webView.setDownloadListener(DownloadListener { url, userAgent, contentDisposition, mimetype, contentLength ->
            val module = webView.reactApplicationContext.getNativeModule(RNCWebViewModule::class.java) ?: return@DownloadListener
            val request: DownloadManager.Request = try {
                DownloadManager.Request(Uri.parse(url))
            } catch (e: IllegalArgumentException) {
                Log.w(TAG, "Unsupported URI, aborting download", e)
                return@DownloadListener
            }
            var fileName = URLUtil.guessFileName(url, contentDisposition, mimetype)

            // Sanitize filename by replacing invalid characters with "_"
            fileName = fileName.replace(invalidCharRegex, "_")

            val downloadMessage = "Downloading $fileName"

            //Attempt to add cookie, if it exists
            var urlObj: URL? = null
            try {
                urlObj = URL(url)
                val baseUrl = urlObj.protocol + "://" + urlObj.host
                val cookie = CookieManager.getInstance().getCookie(baseUrl)
                request.addRequestHeader("Cookie", cookie)
            } catch (e: MalformedURLException) {
                Log.w(TAG, "Error getting cookie for DownloadManager", e)
            }

            //Finish setting up request
            request.addRequestHeader("User-Agent", userAgent)
            request.setTitle(fileName)
            request.setDescription(downloadMessage)
            request.allowScanningByMediaScanner()
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName)
            module.setDownloadRequest(request)
            if (module.grantFileDownloaderPermissions(
                    getDownloadingMessageOrDefault(),
                    getLackPermissionToDownloadMessageOrDefault()
                )
            ) {
                module.downloadFile(
                    getDownloadingMessageOrDefault()
                )
            }
        })
        return RNCWebViewWrapper(context, webView)
    }

    private fun setupWebChromeClient(
        webView: RNCWebView,
    ) {
        val activity = webView.themedReactContext.currentActivity
        if (mAllowsFullscreenVideo && activity != null) {
            val initialRequestedOrientation = activity.requestedOrientation
            val webChromeClient: RNCWebChromeClient =
                object : RNCWebChromeClient(webView) {
                    override fun getDefaultVideoPoster(): Bitmap? {
                        return Bitmap.createBitmap(50, 50, Bitmap.Config.ARGB_8888)
                    }

                    override fun onShowCustomView(view: View, callback: CustomViewCallback) {
                        if (mVideoView != null) {
                            callback.onCustomViewHidden()
                            return
                        }
                        mVideoView = view
                        mCustomViewCallback = callback
                        activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
                        mVideoView.systemUiVisibility = FULLSCREEN_SYSTEM_UI_VISIBILITY
                        activity.window.setFlags(
                            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
                        )
                        mVideoView.setBackgroundColor(Color.BLACK)

                        // Since RN's Modals interfere with the View hierarchy
                        // we will decide which View to hide if the hierarchy
                        // does not match (i.e., the WebView is within a Modal)
                        // NOTE: We could use `mWebView.getRootView()` instead of `getRootView()`
                        // but that breaks the Modal's styles and layout, so we need this to render
                        // in the main View hierarchy regardless
                        val rootView = rootView
                        rootView.addView(mVideoView, FULLSCREEN_LAYOUT_PARAMS)

                        // Different root views, we are in a Modal
                        if (rootView.rootView !== mWebView.rootView) {
                            mWebView.rootView.visibility = View.GONE
                        } else {
                            // Same view hierarchy (no Modal), just hide the WebView then
                            mWebView.visibility = View.GONE
                        }
                        mWebView.themedReactContext.addLifecycleEventListener(this)
                    }

                    override fun onHideCustomView() {
                        if (mVideoView == null) {
                            return
                        }

                        // Same logic as above
                        val rootView = rootView
                        if (rootView.rootView !== mWebView.rootView) {
                            mWebView.rootView.visibility = View.VISIBLE
                        } else {
                            // Same view hierarchy (no Modal)
                            mWebView.visibility = View.VISIBLE
                        }
                        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS)
                        rootView.removeView(mVideoView)
                        mCustomViewCallback.onCustomViewHidden()
                        mVideoView = null
                        mCustomViewCallback = null
                        activity.requestedOrientation = initialRequestedOrientation
                        mWebView.themedReactContext.removeLifecycleEventListener(this)
                    }
                }
            webChromeClient.setAllowsProtectedMedia(mAllowsProtectedMedia)
            webChromeClient.setHasOnOpenWindowEvent(mHasOnOpenWindowEvent)
            webView.webChromeClient = webChromeClient
        } else {
            var webChromeClient = webView.webChromeClient as RNCWebChromeClient?
            webChromeClient?.onHideCustomView()
            webChromeClient = object : RNCWebChromeClient(webView) {
                override fun getDefaultVideoPoster(): Bitmap? {
                    return Bitmap.createBitmap(50, 50, Bitmap.Config.ARGB_8888)
                }
            }
            webChromeClient.setAllowsProtectedMedia(mAllowsProtectedMedia)
            webChromeClient.setHasOnOpenWindowEvent(mHasOnOpenWindowEvent)
            webView.webChromeClient = webChromeClient
        }
    }

    private fun setUserAgentString(viewWrapper: RNCWebViewWrapper) {
        val view = viewWrapper.webView
        when {
            mUserAgent != null -> {
                view.settings.userAgentString = mUserAgent
            }
            mUserAgentWithApplicationName != null -> {
                view.settings.userAgentString = mUserAgentWithApplicationName
            }
            else -> {
                view.settings.userAgentString = WebSettings.getDefaultUserAgent(view.context)
            }
        }
    }

    private fun getDownloadingMessageOrDefault(): String? {
        return mDownloadingMessage ?: DEFAULT_DOWNLOADING_MESSAGE
    }

    private fun getLackPermissionToDownloadMessageOrDefault(): String? {
        return mLackPermissionToDownloadMessage
            ?: DEFAULT_LACK_PERMISSION_TO_DOWNLOAD_MESSAGE
    }

    private fun loadSource(viewWrapper: RNCWebViewWrapper, source: ReadableMap?) {
        val view = viewWrapper.webView
        if (source != null) {
            if (source.hasKey("html")) {
                val html = source.getString("html")
                val baseUrl = if (source.hasKey("baseUrl")) source.getString("baseUrl") else ""
                view.loadDataWithBaseURL(
                    baseUrl,
                    html!!,
                    HTML_MIME_TYPE,
                    HTML_ENCODING,
                    null
                )
                return
            }
            if (source.hasKey("uri")) {
                val url = source.getString("uri")
                val previousUrl = view.url
                if (previousUrl != null && previousUrl == url) {
                    return
                }
                if (source.hasKey("method")) {
                    val method = source.getString("method")
                    if (method.equals(HTTP_METHOD_POST, ignoreCase = true)) {
                        var postData: ByteArray? = null
                        if (source.hasKey("body")) {
                            val body = source.getString("body")
                            postData = try {
                                body!!.toByteArray(charset("UTF-8"))
                            } catch (e: UnsupportedEncodingException) {
                                body!!.toByteArray()
                            }
                        }
                        if (postData == null) {
                            postData = ByteArray(0)
                        }
                        view.postUrl(url!!, postData)
                        return
                    }
                }
                val headerMap = HashMap<String, String?>()
                if (source.hasKey("headers")) {
                    val headerArray = source.getArray("headers")
                    for (header in headerArray!!.toArrayList()) {
                        val headerCasted = header as HashMap<String, String>
                        val name = headerCasted.get("name") ?: ""
                        val value = headerCasted.get("value") ?: ""
                        if ("user-agent" == name.lowercase(Locale.ENGLISH)) {
                            view.settings.userAgentString = value
                        } else {
                            headerMap[name] = value
                        }
                    }
                }
                view.loadUrl(url!!, headerMap)
                return
            }
        }
        view.loadUrl(BLANK_URL)
    }

    @ReactProp(name = "allowFileAccess")
    override fun setAllowFileAccess(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.allowFileAccess = value
    }

    @ReactProp(name = "allowFileAccessFromFileURLs")
    override fun setAllowFileAccessFromFileURLs(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.allowFileAccessFromFileURLs = value
    }

    @ReactProp(name = "allowUniversalAccessFromFileURLs")
    override fun setAllowUniversalAccessFromFileURLs(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.allowUniversalAccessFromFileURLs = value
    }

    @ReactProp(name = "allowsFullscreenVideo")
    override fun setAllowsFullscreenVideo(view: RNCWebViewWrapper, value: Boolean) {
        mAllowsFullscreenVideo = value
        setupWebChromeClient(view.webView)
    }

    @ReactProp(name = "allowsProtectedMedia")
    override fun setAllowsProtectedMedia(view: RNCWebViewWrapper, value: Boolean) {
        // This variable is used to keep consistency
        // in case a new WebChromeClient is created
        // (eg. when mAllowsFullScreenVideo changes)
        mAllowsProtectedMedia = value
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val client = view.webView.webChromeClient
            if (client != null && client is RNCWebChromeClient) {
                client.setAllowsProtectedMedia(value)
            }
        }
    }

    @ReactProp(name = "androidLayerType")
    override fun setAndroidLayerType(view: RNCWebViewWrapper, value: String?) {
        val layerType = when (value) {
            "hardware" -> View.LAYER_TYPE_HARDWARE
            "software" -> View.LAYER_TYPE_SOFTWARE
            else -> View.LAYER_TYPE_NONE
        }
        view.webView.setLayerType(layerType, null)
    }

    @ReactProp(name = "applicationNameForUserAgent")
    override fun setApplicationNameForUserAgent(view: RNCWebViewWrapper, value: String?) {
        when {
            value != null -> {
                val defaultUserAgent = WebSettings.getDefaultUserAgent(view.webView.context)
                mUserAgentWithApplicationName = "$defaultUserAgent $value"
            }
            else -> {
                mUserAgentWithApplicationName = null
            }
        }
        setUserAgentString(view)
    }

    @ReactProp(name = "basicAuthCredential")
    override fun setBasicAuthCredential(view: RNCWebViewWrapper, value: ReadableMap?) {
        var basicAuthCredential: RNCBasicAuthCredential? = null
        if (value != null) {
            if (value.hasKey("username") && value.hasKey("password")) {
                val username = value.getString("username")
                val password = value.getString("password")
                basicAuthCredential = RNCBasicAuthCredential(username, password)
            }
        }
        view.webView.setBasicAuthCredential(basicAuthCredential)
    }

    @ReactProp(name = "cacheEnabled")
    override fun setCacheEnabled(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.cacheMode = if (value) WebSettings.LOAD_DEFAULT else WebSettings.LOAD_NO_CACHE
    }

    @ReactProp(name = "cacheMode")
    override fun setCacheMode(view: RNCWebViewWrapper, value: String?) {
        view.webView.settings.cacheMode = when (value) {
            "LOAD_CACHE_ONLY" -> WebSettings.LOAD_CACHE_ONLY
            "LOAD_CACHE_ELSE_NETWORK" -> WebSettings.LOAD_CACHE_ELSE_NETWORK
            "LOAD_NO_CACHE" -> WebSettings.LOAD_NO_CACHE
            "LOAD_DEFAULT" -> WebSettings.LOAD_DEFAULT
            else -> WebSettings.LOAD_DEFAULT
        }
    }

    @ReactProp(name = "domStorageEnabled")
    override fun setDomStorageEnabled(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.domStorageEnabled = value
    }

    @ReactProp(name = "downloadingMessage")
    override fun setDownloadingMessage(view: RNCWebViewWrapper, value: String?) {
        mDownloadingMessage = value
    }

    @ReactProp(name = "forceDarkOn")
    override fun setForceDarkOn(view: RNCWebViewWrapper, value: Boolean) {
        val webView = view.webView
        // Only Android 10+ support dark mode
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.P) {
            if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)) {
                val forceDarkMode =
                    if (value) WebSettingsCompat.FORCE_DARK_ON else WebSettingsCompat.FORCE_DARK_OFF
                WebSettingsCompat.setForceDark(webView.settings, forceDarkMode)
            }

            // Set how WebView content should be darkened.
            // PREFER_WEB_THEME_OVER_USER_AGENT_DARKENING:  checks for the "color-scheme" <meta> tag.
            // If present, it uses media queries. If absent, it applies user-agent (automatic)
            // More information about Force Dark Strategy can be found here:
            // https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#setForceDarkStrategy(android.webkit.WebSettings)
            if (value && WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK_STRATEGY)) {
                WebSettingsCompat.setForceDarkStrategy(
                    webView.settings,
                    WebSettingsCompat.DARK_STRATEGY_PREFER_WEB_THEME_OVER_USER_AGENT_DARKENING
                )
            }
        }
    }

    @ReactProp(name = "geolocationEnabled")
    override fun setGeolocationEnabled(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.setGeolocationEnabled(value)
    }

    @ReactProp(name = "hasOnScroll")
    override fun setHasOnScroll(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.setHasScrollEvent(value)
    }

    @ReactProp(name = "incognito")
    override fun setIncognito(view: RNCWebViewWrapper, value: Boolean) {
        // Don't do anything when incognito is disabled
        if (!value) {
            return
        }

        val webView = view.webView

        // Remove all previous cookies
        CookieManager.getInstance().removeAllCookies(null)

        // Disable caching
        webView.settings.cacheMode = WebSettings.LOAD_NO_CACHE
        webView.clearHistory()
        webView.clearCache(true)

        // No form data or autofill enabled
        webView.clearFormData()
        webView.settings.savePassword = false
        webView.settings.saveFormData = false
    }

    @ReactProp(name = "injectedJavaScript")
    override fun setInjectedJavaScript(view: RNCWebViewWrapper, value: String?) {
        view.webView.injectedJS = value
    }

    @ReactProp(name = "injectedJavaScriptBeforeContentLoaded")
    override fun setInjectedJavaScriptBeforeContentLoaded(view: RNCWebViewWrapper, value: String?) {
        view.webView.injectedJSBeforeContentLoaded = value
    }

    @ReactProp(name = "injectedJavaScriptForMainFrameOnly")
    override fun setInjectedJavaScriptForMainFrameOnly(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.injectedJavaScriptForMainFrameOnly = value
    }

    @ReactProp(name = "injectedJavaScriptBeforeContentLoadedForMainFrameOnly")
    override fun setInjectedJavaScriptBeforeContentLoadedForMainFrameOnly(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.injectedJavaScriptBeforeContentLoadedForMainFrameOnly = value
    }

    @ReactProp(name = "injectedJavaScriptObject")
    override fun setInjectedJavaScriptObject(view: RNCWebViewWrapper, value: String?) {
        view.webView.setInjectedJavaScriptObject(value)
    }

    @ReactProp(name = "javaScriptCanOpenWindowsAutomatically")
    override fun setJavaScriptCanOpenWindowsAutomatically(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.javaScriptCanOpenWindowsAutomatically = value
    }

    @ReactProp(name = "javaScriptEnabled")
    override fun setJavaScriptEnabled(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.javaScriptEnabled = value
    }

    @ReactProp(name = "lackPermissionToDownloadMessage")
    override fun setLackPermissionToDownloadMessage(view: RNCWebViewWrapper, value: String?) {
        mLackPermissionToDownloadMessage = value
    }

    @ReactProp(name = "hasOnOpenWindowEvent")
    override fun setHasOnOpenWindowEvent(view: RNCWebViewWrapper, value: Boolean) {
        mHasOnOpenWindowEvent = value
        setupWebChromeClient(view.webView)
    }

    @ReactProp(name = "mediaPlaybackRequiresUserAction")
    override fun setMediaPlaybackRequiresUserAction(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.mediaPlaybackRequiresUserGesture = value
    }

    @ReactProp(name = "menuItems")
    override fun setMenuItems(view: RNCWebViewWrapper, value: ReadableArray?) {
        when (value) {
            null -> view.webView.setMenuCustomItems(null)
            else -> view.webView.setMenuCustomItems(value.toArrayList() as List<Map<String, String>>)
        }
    }

    @ReactProp(name = "suppressMenuItems")
    override fun setSuppressMenuItems(view: RNCWebViewWrapper, value: ReadableArray?) {}

    @ReactProp(name = "messagingEnabled")
    override fun setMessagingEnabled(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.setMessagingEnabled(value)
    }

    @ReactProp(name = "messagingModuleName")
    override fun setMessagingModuleName(view: RNCWebViewWrapper, value: String?) {
        view.webView.messagingModuleName = value
    }

    @ReactProp(name = "minimumFontSize")
    override fun setMinimumFontSize(view: RNCWebViewWrapper, value: Int) {
        view.webView.settings.minimumFontSize = value
    }

    @ReactProp(name = "mixedContentMode")
    override fun setMixedContentMode(view: RNCWebViewWrapper, value: String?) {
        if (value == null || "never" == value) {
            view.webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
        } else if ("always" == value) {
            view.webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        } else if ("compatibility" == value) {
            view.webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
        }
    }

    @ReactProp(name = "nestedScrollEnabled")
    override fun setNestedScrollEnabled(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.nestedScrollEnabled = value
    }

    @ReactProp(name = "overScrollMode")
    override fun setOverScrollMode(view: RNCWebViewWrapper, value: String?) {
        view.webView.overScrollMode = when (value) {
            "never" -> View.OVER_SCROLL_NEVER
            "content" -> View.OVER_SCROLL_IF_CONTENT_SCROLLS
            "always" -> View.OVER_SCROLL_ALWAYS
            else -> View.OVER_SCROLL_ALWAYS
        }
    }

    @ReactProp(name = "saveFormDataDisabled")
    override fun setSaveFormDataDisabled(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.saveFormData = !value
    }

    @ReactProp(name = "scalesPageToFit")
    override fun setScalesPageToFit(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.loadWithOverviewMode = value
        view.webView.settings.useWideViewPort = value
    }

    @ReactProp(name = "setBuiltInZoomControls")
    override fun setSetBuiltInZoomControls(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.builtInZoomControls = value
    }

    @ReactProp(name = "setDisplayZoomControls")
    override fun setSetDisplayZoomControls(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.displayZoomControls = value
    }

    @ReactProp(name = "setSupportMultipleWindows")
    override fun setSetSupportMultipleWindows(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.settings.setSupportMultipleWindows(value)
    }

    @ReactProp(name = "showsHorizontalScrollIndicator")
    override fun setShowsHorizontalScrollIndicator(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.isHorizontalScrollBarEnabled = value
    }

    @ReactProp(name = "showsVerticalScrollIndicator")
    override fun setShowsVerticalScrollIndicator(view: RNCWebViewWrapper, value: Boolean) {
        view.webView.isVerticalScrollBarEnabled = value
    }

    @ReactProp(name = "newSource")
    override fun setNewSource(view: RNCWebViewWrapper, value: ReadableMap?) {
        mPendingSource = value
    }

    @ReactProp(name = "textZoom")
    override fun setTextZoom(view: RNCWebViewWrapper, value: Int) {
        view.webView.settings.textZoom = value
    }

    @ReactProp(name = "thirdPartyCookiesEnabled")
    override fun setThirdPartyCookiesEnabled(view: RNCWebViewWrapper, value: Boolean) {
        CookieManager.getInstance().setAcceptThirdPartyCookies(view.webView, value)
    }

    @ReactProp(name = "webviewDebuggingEnabled")
    override fun setWebviewDebuggingEnabled(view: RNCWebViewWrapper, value: Boolean) {
        RNCWebView.setWebContentsDebuggingEnabled(value)
    }

    @ReactProp(name = "paymentRequestEnabled")
    override fun setPaymentRequestEnabled(view: RNCWebViewWrapper, value: Boolean) {
        if (WebViewFeature.isFeatureSupported(WebViewFeature.PAYMENT_REQUEST)) {
            WebSettingsCompat.setPaymentRequestEnabled(view.webView.settings, value)
        }
    }

    @ReactProp(name = "userAgent")
    override fun setUserAgent(view: RNCWebViewWrapper, value: String?) {
        mUserAgent = value
        setUserAgentString(view)
    }

    /* iOS PROPS - not implemented here */
    override fun setAllowingReadAccessToURL(view: RNCWebViewWrapper, value: String?) {}

    override fun setAllowsBackForwardNavigationGestures(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setAllowsInlineMediaPlayback(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setAllowsPictureInPictureMediaPlayback(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setAllowsAirPlayForMediaPlayback(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setAllowsLinkPreview(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setAutomaticallyAdjustContentInsets(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setAutoManageStatusBarEnabled(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setBounces(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setContentInset(view: RNCWebViewWrapper, value: ReadableMap?) {}

    override fun setContentInsetAdjustmentBehavior(view: RNCWebViewWrapper, value: String?) {}

    override fun setContentMode(view: RNCWebViewWrapper, value: String?) {}

    override fun setDataDetectorTypes(view: RNCWebViewWrapper, value: ReadableArray?) {}

    override fun setDecelerationRate(view: RNCWebViewWrapper, value: Double) {}

    override fun setDirectionalLockEnabled(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setEnableApplePay(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setHideKeyboardAccessoryView(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setKeyboardDisplayRequiresUserAction(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setPagingEnabled(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setPullToRefreshEnabled(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setRefreshControlLightMode(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setRemoveIosKeyboardObserver(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setIndicatorStyle(view: RNCWebViewWrapper, value: String?) {}

    override fun setScrollEnabled(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setSharedCookiesEnabled(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setUseSharedProcessPool(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setLimitsNavigationsToAppBoundDomains(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setTextInteractionEnabled(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setHasOnFileDownload(view: RNCWebViewWrapper, value: Boolean) {}

    override fun setMediaCapturePermissionGrantType(view: RNCWebViewWrapper, value: String?) {}

    override fun setFraudulentWebsiteWarningEnabled(view: RNCWebViewWrapper, value: Boolean) {}
    /* !iOS PROPS - not implemented here */

    override fun goBack(view: RNCWebViewWrapper) {
        view.webView.goBack()
    }

    override fun goForward(view: RNCWebViewWrapper) {
        view.webView.goForward()
    }

    override fun reload(view: RNCWebViewWrapper) {
        view.webView.reload()
    }

    override fun stopLoading(view: RNCWebViewWrapper) {
        view.webView.stopLoading()
    }

    override fun injectJavaScript(view: RNCWebViewWrapper, javascript: String) {
        view.webView.evaluateJavascriptWithFallback(javascript)
    }

    override fun requestFocus(view: RNCWebViewWrapper) {
        view.requestFocus()
    }

    override fun postMessage(view: RNCWebViewWrapper, data: String) {
        try {
            val eventInitDict = JSONObject()
            eventInitDict.put("data", data)
            view.webView.evaluateJavascriptWithFallback(
                "(function () {" +
                    "var event;" +
                    "var data = " + eventInitDict.toString() + ";" +
                    "try {" +
                    "event = new MessageEvent('message', data);" +
                    "} catch (e) {" +
                    "event = document.createEvent('MessageEvent');" +
                    "event.initMessageEvent('message', true, true, data.data, data.origin, data.lastEventId, data.source);" +
                    "}" +
                    "document.dispatchEvent(event);" +
                    "})();"
            )
        } catch (e: JSONException) {
            throw RuntimeException(e)
        }
    }

    override fun loadUrl(view: RNCWebViewWrapper, url: String) {
        val webView = view.webView
        webView.progressChangedFilter.setWaitingForCommandLoadUrl(false)
        webView.loadUrl(url)
    }

    override fun clearFormData(view: RNCWebViewWrapper) {
        view.webView.clearFormData()
    }

    override fun clearCache(view: RNCWebViewWrapper, includeDiskFiles: Boolean) {
        view.webView.clearCache(includeDiskFiles)
    }

    override fun clearHistory(view: RNCWebViewWrapper) {
        view.webView.clearHistory()
    }

    override fun addEventEmitters(reactContext: ThemedReactContext, view: RNCWebViewWrapper) {
        // Do not register default touch emitter and let WebView implementation handle touches
        view.webView.webViewClient = RNCWebViewClient()
    }

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
        val export = super.getExportedCustomDirectEventTypeConstants() ?: MapBuilder.newHashMap()
        // Default events but adding them here explicitly for clarity
        export[TopLoadingStartEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onLoadingStart")
        export[TopLoadingFinishEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onLoadingFinish")
        export[TopLoadingErrorEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onLoadingError")
        export[SubResourceErrorEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onLoadingSubResourceError")
        export[TopMessageEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onMessage")
        // !Default events but adding them here explicitly for clarity

        export[TopLoadingProgressEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onLoadingProgress")
        export[TopShouldStartLoadWithRequestEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onShouldStartLoadWithRequest")
        export[ScrollEventType.getJSEventName(ScrollEventType.SCROLL)] = MapBuilder.of("registrationName", "onScroll")
        export[TopHttpErrorEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onHttpError")
        export[TopRenderProcessGoneEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onRenderProcessGone")
        export[TopCustomMenuSelectionEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onCustomMenuSelection")
        export[TopOpenWindowEvent.EVENT_NAME] = MapBuilder.of("registrationName", "onOpenWindow")
        return export
    }

    override fun onAfterUpdateTransaction(view: RNCWebViewWrapper) {
        super.onAfterUpdateTransaction(view)
        mPendingSource?.let { source ->
            loadSource(view, source)
        }
        mPendingSource = null
    }

    override fun onDropViewInstance(view: RNCWebViewWrapper) {
        val webView = view.webView
        webView.themedReactContext.removeLifecycleEventListener(webView)
        webView.cleanupCallbacksAndDestroy()
        webView.mWebChromeClient = null
        super.onDropViewInstance(view)
    }
}
