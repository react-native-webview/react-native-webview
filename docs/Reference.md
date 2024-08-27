# React Native WebView API Reference

This document lays out the current public properties and methods for the React Native WebView.

## Props Index

- [`source`](Reference.md#source)
- [`automaticallyAdjustContentInsets`](Reference.md#automaticallyadjustcontentinsets)
- [`automaticallyAdjustsScrollIndicatorInsets`](Reference.md#automaticallyAdjustsScrollIndicatorInsets)
- [`injectedJavaScript`](Reference.md#injectedjavascript)
- [`injectedJavaScriptBeforeContentLoaded`](Reference.md#injectedjavascriptbeforecontentloaded)
- [`injectedJavaScriptForMainFrameOnly`](Reference.md#injectedjavascriptformainframeonly)
- [`injectedJavaScriptBeforeContentLoadedForMainFrameOnly`](Reference.md#injectedjavascriptbeforecontentloadedformainframeonly)
- [`injectedJavaScriptObject`](Reference.md#injectedjavascriptobject)
- [`mediaPlaybackRequiresUserAction`](Reference.md#mediaplaybackrequiresuseraction)
- [`nativeConfig`](Reference.md#nativeconfig)
- [`onError`](Reference.md#onerror)
- [`onRenderProcessGone`](Reference.md#onRenderProcessGone)
- [`onLoad`](Reference.md#onload)
- [`onLoadEnd`](Reference.md#onloadend)
- [`onLoadStart`](Reference.md#onloadstart)
- [`onLoadProgress`](Reference.md#onloadprogress)
- [`onHttpError`](Reference.md#onhttperror)
- [`onMessage`](Reference.md#onmessage)
- [`onNavigationStateChange`](Reference.md#onnavigationstatechange)
- [`onOpenWindow`](Reference.md#onopenwindow)
- [`onContentProcessDidTerminate`](Reference.md#oncontentprocessdidterminate)
- [`onScroll`](Reference.md#onscroll)
- [`originWhitelist`](Reference.md#originwhitelist)
- [`renderError`](Reference.md#rendererror)
- [`renderLoading`](Reference.md#renderloading)
- [`scalesPageToFit`](Reference.md#scalespagetofit)
- [`onShouldStartLoadWithRequest`](Reference.md#onshouldstartloadwithrequest)
- [`startInLoadingState`](Reference.md#startinloadingstate)
- [`style`](Reference.md#style)
- [`containerStyle`](Reference.md#containerStyle)
- [`decelerationRate`](Reference.md#decelerationrate)
- [`domStorageEnabled`](Reference.md#domstorageenabled)
- [`javaScriptEnabled`](Reference.md#javascriptenabled)
- [`javaScriptCanOpenWindowsAutomatically`](Reference.md#javascriptcanopenwindowsautomatically)
- [`androidLayerType`](Reference.md#androidLayerType)
- [`mixedContentMode`](Reference.md#mixedcontentmode)
- [`thirdPartyCookiesEnabled`](Reference.md#thirdpartycookiesenabled)
- [`userAgent`](Reference.md#useragent)
- [`applicationNameForUserAgent`](Reference.md#applicationNameForUserAgent)
- [`allowsFullscreenVideo`](Reference.md#allowsfullscreenvideo)
- [`allowsInlineMediaPlayback`](Reference.md#allowsinlinemediaplayback)
- [`allowsPictureInPictureMediaPlayback`](Reference.md#allowsPictureInPictureMediaPlayback)
- [`allowsAirPlayForMediaPlayback`](Reference.md#allowsAirPlayForMediaPlayback)
- [`bounces`](Reference.md#bounces)
- [`overScrollMode`](Reference.md#overscrollmode)
- [`contentInset`](Reference.md#contentinset)
- [`contentInsetAdjustmentBehavior`](Reference.md#contentInsetAdjustmentBehavior)
- [`contentMode`](Reference.md#contentMode)
- [`dataDetectorTypes`](Reference.md#datadetectortypes)
- [`scrollEnabled`](Reference.md#scrollenabled)
- [`nestedScrollEnabled`](Reference.md#nestedscrollenabled)
- [`setBuiltInZoomControls`](Reference.md#setBuiltInZoomControls)
- [`setDisplayZoomControls`](Reference.md#setDisplayZoomControls)
- [`directionalLockEnabled`](Reference.md#directionalLockEnabled)
- [`geolocationEnabled`](Reference.md#geolocationenabled)
- [`allowFileAccessFromFileURLs`](Reference.md#allowFileAccessFromFileURLs)
- [`allowUniversalAccessFromFileURLs`](Reference.md#allowUniversalAccessFromFileURLs)
- [`allowingReadAccessToURL`](Reference.md#allowingReadAccessToURL)
- [`keyboardDisplayRequiresUserAction`](Reference.md#keyboardDisplayRequiresUserAction)
- [`hideKeyboardAccessoryView`](Reference.md#hidekeyboardaccessoryview)
- [`allowsBackForwardNavigationGestures`](Reference.md#allowsbackforwardnavigationgestures)
- [`incognito`](Reference.md#incognito)
- [`allowFileAccess`](Reference.md#allowFileAccess)
- [`saveFormDataDisabled`](Reference.md#saveFormDataDisabled)
- [`cacheEnabled`](Reference.md#cacheEnabled)
- [`cacheMode`](Reference.md#cacheMode)
- [`pagingEnabled`](Reference.md#pagingEnabled)
- [`allowsLinkPreview`](Reference.md#allowsLinkPreview)
- [`sharedCookiesEnabled`](Reference.md#sharedCookiesEnabled)
- [`textZoom`](Reference.md#textZoom)
- [`pullToRefreshEnabled`](Reference.md#pullToRefreshEnabled)
- [`refreshControlLightMode`](Reference.md#refreshControlLightMode)
- [`ignoreSilentHardwareSwitch`](Reference.md#ignoreSilentHardwareSwitch)
- [`onFileDownload`](Reference.md#onFileDownload)
- [`limitsNavigationsToAppBoundDomains`](Reference.md#limitsNavigationsToAppBoundDomains)
- [`textInteractionEnabled`](Reference.md#textInteractionEnabled)
- [`suppressMenuItems`](Reference.md#suppressMenuItems)
- [`mediaCapturePermissionGrantType`](Reference.md#mediaCapturePermissionGrantType)
- [`autoManageStatusBarEnabled`](Reference.md#autoManageStatusBarEnabled)
- [`setSupportMultipleWindows`](Reference.md#setSupportMultipleWindows)
- [`basicAuthCredential`](Reference.md#basicAuthCredential)
- [`enableApplePay`](Reference.md#enableApplePay)
- [`forceDarkOn`](Reference.md#forceDarkOn)
- [`useWebView2`](Reference.md#useWebView2)
- [`minimumFontSize`](Reference.md#minimumFontSize)
- [`downloadingMessage`](Reference.md#downloadingMessage)
- [`lackPermissionToDownloadMessage`](Reference.md#lackPermissionToDownloadMessage)
- [`allowsProtectedMedia`](Reference.md#allowsProtectedMedia)
- [`webviewDebuggingEnabled`](Reference.md#webviewDebuggingEnabled)

## Methods Index

- [`goForward`](Reference.md#goforward)
- [`goBack`](Reference.md#goback)
- [`reload`](Reference.md#reload)
- [`stopLoading`](Reference.md#stoploading)
- [`injectJavaScript`](Reference.md#injectjavascriptstr)
- [`clearFormData`](Reference.md#clearFormData)
- [`clearCache`](Reference.md#clearCachebool)
- [`clearHistory`](Reference.md#clearHistory)
- [`requestFocus`](Reference.md#requestFocus)
- [`postMessage`](Reference.md#postmessagestr)

---

# Reference

## Props

### `source`[⬆](#props-index)

Loads static HTML or a URI (with optional headers) in the WebView. Note that static HTML will require setting [`originWhitelist`](Reference.md#originwhitelist) to `["*"]`.

The object passed to `source` can have either of the following shapes:

**Load uri**

- `uri` (string) - The URI to load in the `WebView`. Can be a local or remote file, and can be changed with React state or props to navigate to a new page.
- `method` (string) - The HTTP Method to use. Defaults to GET if not specified. On Android and Windows, the only supported methods are GET and POST.
- `headers` (object) - Additional HTTP headers to send with the request. On Android, this can only be used with GET requests. See the [Guide](Guide.md#setting-custom-headers) for more information on setting custom headers.
- `body` (string) - The HTTP body to send with the request. This must be a valid UTF-8 string, and will be sent exactly as specified, with no additional encoding (e.g. URL-escaping or base64) applied. On Android and Windows, this can only be used with POST requests.

**Static HTML**

_Note that using static HTML requires the WebView property [originWhiteList](Reference.md#originWhiteList) to `['*']`. For some content, such as video embeds (e.g. Twitter or Facebook posts with video), the baseUrl needs to be set for the video playback to work_

- `html` (string) - A static HTML page to display in the WebView.
- `baseUrl` (string) - The base URL to be used for any relative links in the HTML. This is also used for the origin header with CORS requests made from the WebView. See [Android WebView Docs](https://developer.android.com/reference/android/webkit/WebView#loadDataWithBaseURL)

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### `automaticallyAdjustContentInsets`[⬆](#props-index)

Controls whether to adjust the content inset for web views that are placed behind a navigation bar, tab bar, or toolbar. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `automaticallyAdjustsScrollIndicatorInsets`[⬆](#props-index)

Controls whether to adjust the scroll indicator inset for web views that are placed behind a navigation bar, tab bar, or toolbar. The default value `false`. (iOS 13+)

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS(13+) |

---

### `injectedJavaScript`[⬆](#props-index)

Set this to provide JavaScript that will be injected into the web page after the document finishes loading, but before other subresources finish loading.

Make sure the string evaluates to a valid type (`true` works) and doesn't otherwise throw an exception.

On iOS, see [`WKUserScriptInjectionTimeAtDocumentEnd`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentend?language=objc). Be sure
to set an [`onMessage`](Reference.md#onmessage) handler, even if it's a no-op, or the code will not be run.

| Type   | Required | Platform                     |
| ------ | -------- | ---------------------------- |
| string | No       | iOS, Android, macOS, Windows |

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

_Kindly note: Windows does not have [native support for alerts](https://github.com/MicrosoftDocs/winrt-api/blob/docs/windows.ui.xaml.controls/webview.md#use-of-alert), as such any scripts to show an alert will not work._

Example:

Post message a JSON object of `window.location` to be handled by [`onMessage`](Reference.md#onmessage)

```jsx
const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
})();`;

<WebView
  source={{ uri: 'https://reactnative.dev' }}
  injectedJavaScript={INJECTED_JAVASCRIPT}
  onMessage={this.onMessage}
/>;
```

---

### `injectedJavaScriptBeforeContentLoaded`[⬆](#props-index)

Set this to provide JavaScript that will be injected into the web page after the document element is created, but before other subresources finish loading.

Make sure the string evaluates to a valid type (`true` works) and doesn't otherwise throw an exception.

On iOS, see [`WKUserScriptInjectionTimeAtDocumentStart`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentstart?language=objc)

> **Warning**
> On Android, this may work, but it is not 100% reliable (see [#1609](https://github.com/react-native-webview/react-native-webview/issues/1609) and [#1099](https://github.com/react-native-webview/react-native-webview/pull/1099)). Consider `injectedJavaScriptObject` instead.

| Type   | Required | Platform                           |
| ------ | -------- | ---------------------------------- |
| string | No       | iOS, macOS, Android (experimental) |

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

Example:

Post message a JSON object of `window.location` to be handled by [`onMessage`](Reference.md#onmessage). `window.ReactNativeWebView.postMessage` _will_ be available at this time.

```jsx
const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
})();`;

<WebView
  source={{ uri: 'https://reactnative.dev' }}
  injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
  onMessage={this.onMessage}
/>;
```

---

### `injectedJavaScriptForMainFrameOnly`[⬆](#props-index)

If `true` (default; mandatory for Android), loads the `injectedJavaScript` only into the main frame.

If `false`, (only supported on iOS and macOS), loads it into all frames (e.g. iframes).

| Type | Required | Platform                                          |
| ---- | -------- | ------------------------------------------------- |
| bool | No       | iOS and macOS (only `true` supported for Android) |

---

### `injectedJavaScriptBeforeContentLoadedForMainFrameOnly`[⬆](#props-index)

If `true` (default; mandatory for Android), loads the `injectedJavaScriptBeforeContentLoaded` only into the main frame.

If `false`, (only supported on iOS and macOS), loads it into all frames (e.g. iframes).

| Type | Required | Platform                                          |
| ---- | -------- | ------------------------------------------------- |
| bool | No       | iOS and macOS (only `true` supported for Android) |

---

### `injectedJavaScriptObject`[⬆](#props-index)

Inject any JavaScript object into the webview so it is available to the JS running on the page.

| Type | Required | Platform                                          |
| ---- | -------- | ------------------------------------------------- |
| obj | No       | iOS, Android |

Example:

Set a value to be used in JavaScript.

Note: Any value in the object will be accessible to *all* frames of the webpage. If sensitive values are present please ensure that you have a strict Content Security Policy set up to avoid data leaking.

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  injectedJavaScriptObject={{ customValue: 'myCustomValue' }}
/>;
```

```html
<html>
  <head>
    <script>
      window.onload = (event) => {
        if (window.ReactNativeWebView.injectedObjectJson()) {
            const customValue = JSON.parse(window.ReactNativeWebView.injectedObjectJson()).customValue;
            ...
        }
      }
    </script>
  </head>
</html>
```

---

### `mediaPlaybackRequiresUserAction`[⬆](#props-index)

Boolean that determines whether HTML5 audio and video requires the user to tap them before they start playing. The default value is `true`. (Android API minimum version 17).

NOTE: the default `true` value might cause some videos to hang loading on iOS. Setting it to `false` could fix this issue.

| Type | Required | Platform            |
| ---- | -------- | ------------------- |
| bool | No       | iOS, Android, macOS |

---

### `nativeConfig`[⬆](#props-index)

Override the native component used to render the WebView. Enables a custom native WebView which uses the same JavaScript as the original WebView.

The `nativeConfig` prop expects an object with the following keys:

- `component` (any)
- `props` (object)
- `viewManager` (object)

| Type   | Required | Platform            |
| ------ | -------- | ------------------- |
| object | No       | iOS, Android, macOS |

---

### `onError`[⬆](#props-index)

Function that is invoked when the `WebView` load fails.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  }}
/>
```

Function passed to `onError` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
code
description
didFailProvisionalNavigation
domain
loading
target
title
url
```

> **_Note_**
> Domain is only used on iOS

The `syntheticEvent` can be stopped doing its default action by calling `syntheticEvent.preventDefault()`.

---

### `onLoad`[⬆](#props-index)

Function that is invoked when the `WebView` has finished loading.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoad={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    this.url = nativeEvent.url;
  }}
/>
```

Function passed to `onLoad` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadEnd`[⬆](#props-index)

Function that is invoked when the `WebView` load succeeds or fails.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadEnd={(syntheticEvent) => {
    // update component to be aware of loading status
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

Function passed to `onLoadEnd` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadStart`[⬆](#props-index)

Function that is invoked when the `WebView` starts loading.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev/=' }}
  onLoadStart={(syntheticEvent) => {
    // update component to be aware of loading status
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

Function passed to `onLoadStart` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadProgress`[⬆](#props-index)

Function that is invoked when the `WebView` is loading.

| Type     | Required | Platform            |
| -------- | -------- | ------------------- |
| function | No       | iOS, Android, macOS |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadProgress={({ nativeEvent }) => {
    this.loadingProgress = nativeEvent.progress;
  }}
/>
```

Function passed to `onLoadProgress` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
loading
progress
target
title
url
```

---

### `onHttpError`[⬆](#props-index)

Function that is invoked when the `WebView` receives an http error.

> **_Note_**
> Android API minimum level 23.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onHttpError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn(
      'WebView received error status code: ',
      nativeEvent.statusCode,
    );
  }}
/>
```

Function passed to `onHttpError` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
description
loading
statusCode
target
title
url
```

> **_Note_**
> Description is only used on Android

---

### `onRenderProcessGone`[⬆](#props-index)

Function that is invoked when the `WebView` process crashes or is killed by the OS on Android.

> **_Note_**
> Android API minimum level 26. Android Only

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onRenderProcessGone={syntheticEvent => {
    const { nativeEvent } = syntheticEvent;
    console.warn(
      'WebView Crashed: ',
      nativeEvent.didCrash,
    );
  }}
/>
```

Function passed to `onRenderProcessGone` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
didCrash
```
---

### `onMessage`[⬆](#props-index)

Function that is invoked when the webview calls `window.ReactNativeWebView.postMessage`. Setting this property will inject this global into your webview.

`window.ReactNativeWebView.postMessage` accepts one argument, `data`, which will be available on the event object, `event.nativeEvent.data`. `data` must be a string.

| Type     | Required |
| -------- | -------- |
| function | No       |

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

---

### `onNavigationStateChange`[⬆](#props-index)

Function that is invoked when the `WebView` loading starts or ends.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onNavigationStateChange={(navState) => {
    // Keep track of going back navigation within component
    this.canGoBack = navState.canGoBack;
  }}
/>
```

The `navState` object includes these properties:

```
canGoBack
canGoForward
loading
navigationType (iOS only)
target
title
url
```

---

### `onOpenWindow`[⬆](#props-index)<!-- Link generated with jump2header -->

Function that is invoked when the `WebView` should open a new window.

This happens when the JS calls `window.open('http://someurl', '_blank')` or when the user clicks on a `<a href="http://someurl" target="_blank">` link.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onOpenWindow={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    const { targetUrl } = nativeEvent
    console.log('Intercepted OpenWindow for', targetUrl)
  }}
/>
```

Function passed to onOpenWindow is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
targetUrl
```

---

### `onContentProcessDidTerminate`[⬆](#props-index)

Function that is invoked when the `WebView` content process is terminated.

| Type     | Required | Platform                |
| -------- | -------- | ----------------------- |
| function | No       | iOS and macOS WKWebView |

iOS Web views use a separate process to render and manage web content. WebKit calls this method when the process for the specified web view terminates for any reason.
The reason is not necessarily a crash. For instance, since iOS WebViews are not included in the total RAM of the app, they can be terminated independently of the app to liberate memory for new apps the user is opening. It's not unexpected to have WebViews get terminated after a while in the background.

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onContentProcessDidTerminate={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('Content process terminated, reloading', nativeEvent);
    this.refs.webview.reload();
  }}
/>
```

Function passed to `onContentProcessDidTerminate` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onScroll`[⬆](#props-index)

Function that is invoked when the scroll event is fired in the `WebView`.

| Type     | Required | Platform                     |
| -------- | -------- | ---------------------------- |
| function | No       | iOS, macOS, Android, Windows |

Example:

```jsx
<Webview
  source={{ uri: 'https://reactnative.dev' }}
  onScroll={syntheticEvent => {
    const { contentOffset } = syntheticEvent.nativeEvent
    console.table(contentOffset)
  }}
/>
```

Function passed to `onScroll` is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
contentInset
contentOffset
contentSize
layoutMeasurement
velocity
zoomScale
```

---

### `originWhitelist`[⬆](#props-index)

List of origin strings to allow being navigated to. The strings allow wildcards and get matched against _just_ the origin (not the full URL). If the user taps to navigate to a new page but the new page is not in this whitelist, the URL will be handled by the OS. The default whitelisted origins are "http://*" and "https://*".

| Type             | Required | Platform            |
| ---------------- | -------- | ------------------- |
| array of strings | No       | iOS, Android, macOS |

Example:

```jsx
//only allow URIs that begin with https:// or git://
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  originWhitelist={['https://*', 'git://*']}
/>
```

---

### `renderError`[⬆](#props-index)

Function that returns a view to show if there's an error.

| Type     | Required | Platform            |
| -------- | -------- | ------------------- |
| function | No       | iOS, Android, macOS |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  renderError={(errorName) => <Error name={errorName} />}
/>
```

The function passed to `renderError` will be called with the name of the error

---

### `renderLoading`[⬆](#props-index)

Function that returns a loading indicator. The `startInLoadingState` prop must be set to `true` in order to use this prop.

| Type     | Required | Platform            |
| -------- | -------- | ------------------- |
| function | No       | iOS, Android, macOS |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  startInLoadingState={true}
  renderLoading={() => <Loading />}
/>
```

---

### `scalesPageToFit`[⬆](#props-index)

Boolean that controls whether the web content is scaled to fit the view and enables the user to change the scale. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `onShouldStartLoadWithRequest`[⬆](#props-index)

Function that allows custom handling of any web view requests. Return `true` from the function to continue loading the request and `false` to stop loading.

On Android, is not called on the first load.

| Type     | Required | Platform            |
| -------- | -------- | ------------------- |
| function | No       | iOS, Android, macOS |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onShouldStartLoadWithRequest={(request) => {
    // Only allow navigating within this website
    return request.url.startsWith('https://reactnative.dev');
  }}
/>
```

The `request` object includes these properties:

```
title
url
loading
target
canGoBack
canGoForward
lockIdentifier
mainDocumentURL (iOS only)
navigationType (iOS only)
isTopFrame (iOS only)
hasTargetFrame (iOS only)
```

The `hasTargetFrame` prop is a boolean that is `false` when the navigation targets a new window or tab, otherwise it should be `true` ([more info](https://developer.apple.com/documentation/webkit/wknavigationaction/1401918-targetframe)). Note that this prop should always be `true` when `onOpenWindow` event is registered on the WebView because the `false` case is intercepted by this event.

---

### `startInLoadingState`[⬆](#props-index)

Boolean value that forces the `WebView` to show the loading view on the first load. This prop must be set to `true` in order for the `renderLoading` prop to work.

| Type | Required | Platform            |
| ---- | -------- | ------------------- |
| bool | No       | iOS, Android, macOS |

---

### `style`[⬆](#props-index)

A style object that allow you to customize the `WebView` style. Please note that there are default styles (example: you need to add `flex: 0` to the style if you want to use `height` property).

| Type  | Required |
| ----- | -------- |
| style | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  style={{ marginTop: 20 }}
/>
```

---

### `containerStyle`[⬆](#props-index)

A style object that allow you to customize the `WebView` container style. Please note that there are default styles (example: you need to add `flex: 0` to the style if you want to use `height` property).

| Type  | Required |
| ----- | -------- |
| style | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  containerStyle={{ marginTop: 20 }}
/>
```

---

### `decelerationRate`[⬆](#props-index)

A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. You may also use the string shortcuts `"normal"` and `"fast"` which match the underlying iOS settings for `UIScrollViewDecelerationRateNormal` and `UIScrollViewDecelerationRateFast` respectively:

- normal: 0.998
- fast: 0.99 (the default for iOS web view)

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `domStorageEnabled`[⬆](#props-index)

Boolean value to control whether DOM Storage is enabled. Used only in Android.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `javaScriptEnabled`[⬆](#props-index)

Boolean value to enable JavaScript in the `WebView`. The default value is `true`.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `javaScriptCanOpenWindowsAutomatically`[⬆](#props-index)

A Boolean value indicating whether JavaScript can open windows without user interaction. The default value is `false`.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `androidLayerType`[⬆](#props-index)

Specifies the layer type.

Possible values for `androidLayerType` are:

- `none` (default) - The view does not have a layer.
- `software` - The view has a software layer. A software layer is backed by a bitmap and causes the view to be rendered using Android's software rendering pipeline, even if hardware acceleration is enabled.
- `hardware` - The view has a hardware layer. A hardware layer is backed by a hardware specific texture and causes the view to be rendered using Android's hardware rendering pipeline, but only if hardware acceleration is turned on for the view hierarchy.


| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `mixedContentMode`[⬆](#props-index)

Specifies the mixed content mode. i.e WebView will allow a secure origin to load content from any other origin.

Possible values for `mixedContentMode` are:

- `never` (default) - WebView will not allow a secure origin to load content from an insecure origin.
- `always` - WebView will allow a secure origin to load content from any other origin, even if that origin is insecure.
- `compatibility` - WebView will attempt to be compatible with the approach of a modern web browser with regard to mixed content.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `thirdPartyCookiesEnabled`[⬆](#props-index)

Boolean value to enable third party cookies in the `WebView`. Used on Android Lollipop and above only as third party cookies are enabled by default on Android Kitkat and below and on iOS. The default value is `true`. For more on cookies, read the [Guide](Guide.md#Managing-Cookies)

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `userAgent`[⬆](#props-index)

Sets the user-agent for the `WebView`.

| Type   | Required | Platform            |
| ------ | -------- | ------------------- |
| string | No       | iOS, Android, macOS |

---

### `applicationNameForUserAgent`[⬆](#props-index)

Append to the existing user-agent. Setting `userAgent` will override this.

| Type   | Required | Platform            |
| ------ | -------- | ------------------- |
| string | No       | iOS, Android, macOS |

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  applicationNameForUserAgent={'DemoApp/1.1.0'}
/>
// Resulting User-Agent will look like:
// Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.021; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36 DemoApp/1.1.0
// Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DemoApp/1.1.0
```

### `allowsFullscreenVideo`[⬆](#props-index)

Boolean that determines whether videos are allowed to be played in fullscreen. The default value is `false`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `allowsInlineMediaPlayback`[⬆](#props-index)

Boolean that determines whether HTML5 videos play inline or use the native full-screen controller. The default value is `false`.

> **NOTE**
>
> In order for video to play inline, not only does this property need to be set to `true`, but the video element in the HTML document must also include the `webkit-playsinline` attribute.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `allowsPictureInPictureMediaPlayback`[⬆](#props-index)

Boolean value that indicates whether HTML5 videos can play Picture in Picture. The default value is `false`.

> **NOTE**
>
> In order to restrict playing video in picture in picture mode this props need to be set to `false`
.
| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `allowsAirPlayForMediaPlayback`[⬆](#props-index)

A Boolean value indicating whether AirPlay is allowed. The default value is `false`.

| Type    | Required | Platform      |
| ------- | -------- | ------------- |
| boolean | No       | iOS and macOS |

---

### `bounces`[⬆](#props-index)

Boolean value that determines whether the web view bounces when it reaches the edge of the content. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `overScrollMode`[⬆](#props-index)

Specifies the over scroll mode.

Possible values for `overScrollMode` are:

- `always` (default) - Always allow a user to over-scroll this view, provided it is a view that can scroll.
- `content` - Allow a user to over-scroll this view only if the content is large enough to meaningfully scroll, provided it is a view that can scroll.
- `never` - Never allow a user to over-scroll this view.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `contentInset`[⬆](#props-index)

The amount by which the web view content is inset from the edges of the scroll view. Defaults to {top: 0, left: 0, bottom: 0, right: 0}.

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       | iOS      |

---

### `contentInsetAdjustmentBehavior`[⬆](#props-index)

This property specifies how the safe area insets are used to modify the content area of the scroll view. The default value of this property is "never". Available on iOS 11 and later. Defaults to `never`.

Possible values:

- `automatic`
- `scrollableAxes`
- `never`
- `always`

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

---

### `contentMode`[⬆](#props-index)

Controls the type of content to load. Available on iOS 13 and later. Defaults to `recommended`, which loads mobile content on iPhone & iPad Mini but desktop content on larger iPads.

See [Introducing Desktop-class Browsing on iPad](https://developer.apple.com/videos/play/wwdc2019/203/) for more.

Possible values:

- `recommended`
- `mobile`
- `desktop`

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

---

### `dataDetectorTypes`[⬆](#props-index)

Determines the types of data converted to clickable URLs in the web view's content. By default only phone numbers are detected.

You can provide one type or an array of many types.

Possible values for `dataDetectorTypes` are:

- `phoneNumber`
- `link`
- `address`
- `calendarEvent`
- `none`
- `all`
- `trackingNumber`
- `flightNumber`
- `lookupSuggestion`

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
| string, or array | No       | iOS      |

---

### `scrollEnabled`[⬆](#props-index)

Boolean value that determines whether scrolling is enabled in the `WebView`. The default value is `true`. Setting this to `false` will prevent the webview from moving the document body when the keyboard appears over an input.

| Type | Required | Platform      |
| ---- | -------- | ------------- |
| bool | No       | iOS and macOS |

---

### `nestedScrollEnabled`[⬆](#props-index)

Boolean value that determines whether scrolling is possible in the `WebView` when used inside a `ScrollView` on Android. The default value is `false`.

Setting this to `true` will prevent the `ScrollView` to scroll when scrolling from inside the `WebView`.

| Type | Required | Platform      |
| ---- | -------- | ------------- |
| bool | No       | Android       |

---

### `setBuiltInZoomControls`[⬆](#props-index)

Sets whether the WebView should use its built-in zoom mechanisms. The default value is `true`. Setting this to `false` will prevent the use of a pinch gesture to control zooming.

| Type | Required | Platform      |
| ---- | -------- | ------------- |
| bool | No       | Android       |

---

### `setDisplayZoomControls`[⬆](#props-index)

Sets whether the WebView should display on-screen zoom controls when using the built-in zoom mechanisms (see `setBuiltInZoomControls`). The default value is `false`.

| Type | Required | Platform      |
| ---- | -------- | ------------- |
| bool | No       | Android       |

---

### `directionalLockEnabled`[⬆](#props-index)

A Boolean value that determines whether scrolling is disabled in a particular direction.
The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `showsHorizontalScrollIndicator`[⬆](#props-index)

Boolean value that determines whether a horizontal scroll indicator is shown in the `WebView`. The default value is `true`.

| Type | Required | Platform            |
| ---- | -------- | ------------------- |
| bool | No       | iOS, Android, macOS |

---

### `showsVerticalScrollIndicator`[⬆](#props-index)

Boolean value that determines whether a vertical scroll indicator is shown in the `WebView`. The default value is `true`.

| Type | Required | Platform            |
| ---- | -------- | ------------------- |
| bool | No       | iOS, Android, macOS |

---

### `geolocationEnabled`[⬆](#props-index)

Set whether Geolocation is enabled in the `WebView`. The default value is `false`. Used only in Android.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `allowFileAccessFromFileURLs`[⬆](#props-index)

Boolean that sets whether JavaScript running in the context of a file scheme URL should be allowed to access content from other file scheme URLs. The default value is `false`.

| Type | Required | Platform            |
| ---- | -------- | ------------------- |
| bool | No       | iOS, Android, macOS |

---

### `allowUniversalAccessFromFileURLs`[⬆](#props-index)

Boolean that sets whether JavaScript running in the context of a file scheme URL should be allowed to access content from any origin. Including accessing content from other file scheme URLs. The default value is `false`.

| Type | Required | Platform             |
| ---- | -------- | -------------------- |
| bool | No       | iOS, Android, macOS  |

---

### `allowingReadAccessToURL`[⬆](#props-index)

A String value that indicates which URLs the WebView's file can then reference in scripts, AJAX requests, and CSS imports. This is only used in for WebViews that are loaded with a `source.uri` set to a `'file://'` URL. If not provided, the default is to only allow read access to the URL provided in `source.uri` itself.

| Type   | Required | Platform      |
| ------ | -------- | ------------- |
| string | No       | iOS and macOS |

---

### `keyboardDisplayRequiresUserAction`[⬆](#props-index)

If `false`, web content can programmatically display the keyboard. The default value is `true`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `hideKeyboardAccessoryView`[⬆](#props-index)

If `true`, this will hide the keyboard accessory view (< > and Done).

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `allowsBackForwardNavigationGestures`[⬆](#props-index)

If `true`, this will be able horizontal swipe gestures. The default value is `false`.

| Type    | Required | Platform      |
| ------- | -------- | ------------- |
| boolean | No       | iOS and macOS |

---

### `incognito`[⬆](#props-index)

Does not store any data within the lifetime of the WebView.

| Type    | Required | Platform            |
| ------- | -------- | ------------------- |
| boolean | No       | iOS, Android, macOS |

---

### `allowFileAccess`[⬆](#props-index)

If `true`, this will allow access to the file system via `file://` URI's. The default value is `false`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |

---

### `saveFormDataDisabled`[⬆](#props-index)

Sets whether the WebView should disable saving form data. The default value is `false`. This function does not have any effect from Android API level 26 onwards as there is an Autofill feature which stores form data.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |

---

### `cacheEnabled`[⬆](#props-index)

Sets whether WebView should use browser caching.

| Type    | Required | Default | Platform            |
| ------- | -------- | ------- | ------------------- |
| boolean | No       | true    | iOS, Android, macOS |

---

### `cacheMode`[⬆](#props-index)

Overrides the way the cache is used. The way the cache is used is based on the navigation type. For a normal page load, the cache is checked and content is re-validated as needed. When navigating back, content is not revalidated, instead the content is just retrieved from the cache. This property allows the client to override this behavior.

Possible values are:

- `LOAD_DEFAULT` - Default cache usage mode. If the navigation type doesn't impose any specific behavior, use cached resources when they are available and not expired, otherwise load resources from the network.
- `LOAD_CACHE_ELSE_NETWORK` - Use cached resources when they are available, even if they have expired. Otherwise load resources from the network.
- `LOAD_NO_CACHE` - Don't use the cache, load from the network.
- `LOAD_CACHE_ONLY` - Don't use the network, load from the cache.

| Type   | Required | Default      | Platform |
| ------ | -------- | ------------ | -------- |
| string | No       | LOAD_DEFAULT | Android  |

---

### `pagingEnabled`[⬆](#props-index)

If the value of this property is `true`, the scroll view stops on multiples of the scroll view’s bounds when the user scrolls. The default value is `false`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `allowsLinkPreview`[⬆](#props-index)

A Boolean value that determines whether pressing on a link displays a preview of the destination for the link. In iOS this property is available on devices that support 3D Touch. In iOS 10 and later, the default value is `true`; before that, the default value is `false`.

| Type    | Required | Platform      |
| ------- | -------- | ------------- |
| boolean | No       | iOS and macOS |

---

### `sharedCookiesEnabled`[⬆](#props-index)

Set `true` if shared cookies from `[NSHTTPCookieStorage sharedHTTPCookieStorage]` should be used for every load request in the WebView. The default value is `false`. For more on cookies, read the [Guide](Guide.md#Managing-Cookies)

| Type    | Required | Platform      |
| ------- | -------- | ------------- |
| boolean | No       | iOS and macOS |

---

### `textZoom`[⬆](#props-index)

If the user has set a custom font size in the Android system, an undesirable scale of the site interface in WebView occurs.

When setting the standard textZoom (100) parameter size, this undesirable effect disappears.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

Example:

```jsx
<WebView textZoom={100} />
```

---

### `pullToRefreshEnabled`[⬆](#props-index)

Boolean value that determines whether a pull to refresh gesture is available in the `WebView`. The default value is `false`. If `true`, sets `bounces` automatically to `true`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

### `refreshControlLightMode`[⬆](#props-index)

(ios only)
Boolean value that determines whether the refresh control color is white or not.
Default is `false`, meaning the refresh control color will be the default.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

### `ignoreSilentHardwareSwitch`[⬆](#props-index)

(ios only)

When set to `true` the hardware silent switch is ignored. Default: `false`

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

### `onFileDownload`[⬆](#props-index)
This property is iOS-only.

Function that is invoked when the client needs to download a file.

iOS 13+ only: If the webview navigates to a URL that results in an HTTP
response with a Content-Disposition header 'attachment...', then
this will be called.

iOS 8+: If the MIME type indicates that the content is not renderable by the
webview, that will also cause this to be called. On iOS versions before 13,
this is the only condition that will cause this function to be called.

The application will need to provide its own code to actually download
the file.

If not provided, the default is to let the webview try to render the file.

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onFileDownload={({ nativeEvent: { downloadUrl } }) => {
    // You use downloadUrl which is a string to download files however you want.
  }}
/>
```

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `limitsNavigationsToAppBoundDomains`[⬆](#props-index)

If `true` indicates to WebKit that a WKWebView will only navigate to app-bound domains. Only applicable for iOS 14 or greater.

Once set, any attempt to navigate away from an app-bound domain will fail with the error “App-bound domain failure.”
Applications can specify up to 10 “app-bound” domains using a new Info.plist key `WKAppBoundDomains`. For more information see [App-Bound Domains](https://webkit.org/blog/10882/app-bound-domains/).

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

Example:

```jsx
<WebView limitsNavigationsToAppBoundDomains={true} />
```

---

### `textInteractionEnabled`[⬆](#props-index)

If false indicates to WebKit that a WKWebView will not interact with text, thus not showing a text selection loop. Only applicable for iOS 14.5 or greater.

Defaults to `true`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

Example:

```jsx
<WebView textInteractionEnabled={false} />
```

---

### `suppressMenuItems`[⬆](#props-index)

Allows to suppress menu item from the default context menu.

Possible values are:

- `cut`
- `copy`
- `paste`
- `delete`
- `select`
- `selectAll`
- `replace`
- `lookup`
- `translate`
- `bold`
- `italic`
- `underline`
- `share`

| Type             | Required | Default      | Platform |
| ---------------- | -------- | ------------ | -------- |
| array of strings | No       | []           | iOS      |

### `mediaCapturePermissionGrantType`[⬆](#props-index)

This property specifies how to handle media capture permission requests. Defaults to `prompt`, resulting in the user being prompted repeatedly. Available on iOS 15 and later.

Possible values:

- `grantIfSameHostElsePrompt`: If the security origin's host of the permission request equals the host of the WebView's current URL, the permission is granted if it has been granted before. Otherwise, the user gets prompted.
- `grantIfSameHostElseDeny`: If the security origin's host of the permission request equals the host of the WebView's current URL, the permission is granted if it has been granted before. Otherwise, it gets denied.
- `deny`
- `grant`: The permission is granted if it has been granted before.
- `prompt`

Note that a grant may still result in a prompt, for example if the user has never been prompted for the permission before.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

Example:

```jsx
<WebView mediaCapturePermissionGrantType={'grantIfSameHostElsePrompt'} />
```

---

### `autoManageStatusBarEnabled`[⬆](#props-index)

If set to `true`, the status bar will be automatically hidden/shown by WebView, specifically when full screen video is being watched. If `false`, WebView will not manage the status bar at all. The default value is `true`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

Example:

```jsx
<WebView autoManageStatusBarEnabled={false} />
```

### `setSupportMultipleWindows`[⬆](#props-index)

Sets whether the WebView supports multiple windows. See [Android documentation]('https://developer.android.com/reference/android/webkit/WebSettings#setSupportMultipleWindows(boolean)') for more information.
Setting this to `false` can expose the application to this [vulnerability](https://alesandroortiz.com/articles/uxss-android-webview-cve-2020-6506/) allowing a malicious iframe to escape into the top layer DOM.

| Type    | Required | Default | Platform |
| ------- | -------- | ------- | -------- |
| boolean | No       | true    | Android  |

Example:

```javascript
<WebView setSupportMultipleWindows={false} />
```

### `enableApplePay`[⬆](#props-index)

A Boolean value which, when set to `true`, WebView will be rendered with Apple Pay support. Once set, websites will be able to invoke Apple Pay from React Native Webview.
This comes with a cost features like [`injectJavaScript`](Reference.md#injectjavascriptstr), html5 History, [`sharedCookiesEnabled`](Reference.md#sharedCookiesEnabled), [`injectedJavaScript`](Reference.md#injectedjavascript), [`injectedJavaScriptBeforeContentLoaded`](Reference.md#injectedjavascriptbeforecontentloaded) will not work  See [Apple Pay Release Note](https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes#Payment-Request-API).

If you are required to send message to App , webpage has to explicitly call webkit message handler and receive it on `onMessage` handler on react native side
```javascript
window.webkit.messageHandlers.ReactNativeWebView.postMessage("hello apple pay")
```

| Type    | Required | Default | Platform |
| ------- | -------- | ------- | -------- |
| boolean | No       | false   | iOS      |

Example:

```javascript
<WebView enableApplePay={true} />
```

### `forceDarkOn`[⬆](#props-index)

Configuring Dark Theme

*NOTE* : The force dark setting is not persistent. You must call the static method every time your app process is started.

*NOTE* : The change from day<->night mode is a configuration change so by default the activity will be restarted and pickup the new values to apply the theme. Take care when overriding this default behavior to ensure this method is still called when changes are made.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |

Example:

```javascript
<WebView forceDarkOn={false} />
```

### `menuItems`[⬆](#props-index)

An array of custom menu item objects that will be shown when selecting text. An empty array will suppress the menu.  Used in tandem with `onCustomMenuSelection`

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| array of objects: {label: string, key: string}                     | No       | iOS, Android      |

Example:

```jsx
<WebView menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Save for later', key: 'saveForLater' }]} />
```

### `onCustomMenuSelection`[⬆](#props-index)

Function called when a custom menu item is selected.  It receives a Native event, which includes three custom keys: `label`, `key` and `selectedText`.

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| function                                                           | No       | iOS, Android      |

```jsx
<WebView
  menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Save for later', key: 'saveForLater' }]}
  onCustomMenuSelection={(webViewEvent) => {
    const { label } = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
    const { key } = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
    const { selectedText } = webViewEvent.nativeEvent; // Text highlighted
  }}
/>
```

### `basicAuthCredential`[⬆](#props-index)

An object that specifies the credentials of a user to be used for basic authentication.

- `username` (string) - A username used for basic authentication.
- `password` (string) - A password used for basic authentication.

| Type   | Required |
| ------ | -------- |
| object | No       |

### `useWebView2`[⬆](#props-index)

Use WinUI WebView2 control instead of WebView control as the native webview. The WebView2 control is a WinUI control that renders web content using the Microsoft Edge (Chromium) rendering engine. Option can be toggled at runtime and supports Fast Refresh.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Windows  |

Example:

```jsx
<WebView useWebView2={true} />
```

### `minimumFontSize`[⬆](#props-index)

Android enforces a minimum font size based on this value. A non-negative integer between 1 and 72. Any number outside the specified range will be pinned. Default value is 8. If you are using smaller font sizes and are having trouble fitting the whole window onto one screen, try setting this to a smaller value.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

Example:

```jsx
<WebView minimumFontSize={1} />
```

### `downloadingMessage`[⬆](#props-index)

This is the message that is shown in the Toast when downloading a file via WebView. Default message is "Downloading".

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

### `lackPermissionToDownloadMessage`[⬆](#props-index)

This is the message that is shown in the Toast when the webview is unable to download a file. Default message is "Cannot download files as permission was denied. Please provide permission to write to storage, in order to download files.".

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

### `allowsProtectedMedia`[⬆](#props-index)

Whether or not the Webview can play media protected by DRM. Default is `false`.
⚠️ Setting this to `false` won't revoke the permission already granted to the current webpage. In order to do so, you'd have to reload the page as well. ⚠️

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |

### `fraudulentWebsiteWarningEnabled`[⬆](#props-index)

A Boolean value that indicates whether the web view shows warnings for suspected fraudulent content, such as malware or phishing attempts. The default value is `true`. (iOS 13+)

| Type    | Required | Default | Platform |
| ------- | -------- | ------- | -------- |
| boolean | No       | true    | iOS      |

### `webviewDebuggingEnabled`[⬆](#props-index)

Whether or not the webview can be debugged remotely using Safari / Chrome.
Default is `false`. Supported on iOS as of 16.4, previous versions always allow debugging by default.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS & Android  |

## Methods

### `goForward()`[⬆](#methods-index)

```javascript
goForward();
```

Go forward one page in the web view's history.

### `goBack()`[⬆](#methods-index)

```javascript
goBack();
```

Go back one page in the web view's history.

### `reload()`[⬆](#methods-index)

```javascript
reload();
```

Reloads the current page.

### `stopLoading()`[⬆](#methods-index)

```javascript
stopLoading();
```

Stop loading the current page.

### `injectJavaScript(str)`[⬆](#methods-index)

```javascript
injectJavaScript('... javascript string ...');
```

Executes the JavaScript string.

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

### `requestFocus()`[⬆](#methods-index)

```javascript
requestFocus();
```

Request the webView to ask for focus. (People working on TV apps might want having a look at this!)

### `postMessage(str)`[⬆](#methods-index)

```javascript
postMessage('message');
```

Post a message to WebView, handled by [`onMessage`](Reference.md#onmessage).

### `clearFormData()`[⬆](#methods-index)

(android only)

```javascript
clearFormData();
```

Removes the autocomplete popup from the currently focused form field, if present. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearFormData()>)

### `clearCache(bool)`[⬆](#methods-index)

```javascript
clearCache(true);
```

Clears the resource cache. Note that the cache is per-application, so this will clear the cache for all WebViews used. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearCache(boolean)>)

In iOS, includeDiskFiles will also remove data from the web storages and databases.[developer.apple.com reference](https://developer.apple.com/documentation/webkit/wkwebsitedatastore/1532936-removedata)

In Windows, this has been set to clear cookies, since there is no way to clear the cache in WebView2 because it is shared with Edge. The best we can do is clear the cookies, because we cannot access history or local storage.

### `clearHistory()`[⬆](#methods-index)

(android only)

```javascript
clearHistory();
```

Tells this WebView to clear its internal back/forward list. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearHistory()>)

## Other Docs

Also check out our [Getting Started Guide](Getting-Started.md) and [In-Depth Guide](Guide.md).

## Translations

This file is available in:

- [Brazilian portuguese](Reference.portuguese.md)
- [Italian](Reference.italian.md)
