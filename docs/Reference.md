# React Native WebView API Reference

This document lays out the current public properties and methods for the React Native WebView.

## Props Index

- [`source`](Reference.md#source)
- [`automaticallyAdjustContentInsets`](Reference.md#automaticallyadjustcontentinsets)
- [`injectedJavaScript`](Reference.md#injectedjavascript)
- [`injectedJavaScriptBeforeContentLoaded`](Reference.md#injectedjavascriptbeforecontentloaded)
- [`injectedJavaScriptForMainFrameOnly`](Reference.md#injectedjavascriptformainframeonly)
- [`injectedJavaScriptBeforeContentLoadedForMainFrameOnly`](Reference.md#injectedjavascriptbeforecontentloadedformainframeonly)
- [`mediaPlaybackRequiresUserAction`](Reference.md#mediaplaybackrequiresuseraction)
- [`nativeConfig`](Reference.md#nativeconfig)
- [`onError`](Reference.md#onerror)
- [`onLoad`](Reference.md#onload)
- [`onLoadEnd`](Reference.md#onloadend)
- [`onLoadStart`](Reference.md#onloadstart)
- [`onLoadProgress`](Reference.md#onloadprogress)
- [`onHttpError`](Reference.md#onhttperror)
- [`onMessage`](Reference.md#onmessage)
- [`onNavigationStateChange`](Reference.md#onnavigationstatechange)
- [`onContentProcessDidTerminate`](Reference.md#oncontentprocessdidterminate)
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
- [`androidHardwareAccelerationDisabled`](Reference.md#androidHardwareAccelerationDisabled)
- [`mixedContentMode`](Reference.md#mixedcontentmode)
- [`thirdPartyCookiesEnabled`](Reference.md#thirdpartycookiesenabled)
- [`userAgent`](Reference.md#useragent)
- [`applicationNameForUserAgent`](Reference.md#applicationNameForUserAgent)
- [`allowsFullscreenVideo`](Reference.md#allowsfullscreenvideo)
- [`allowsInlineMediaPlayback`](Reference.md#allowsinlinemediaplayback)
- [`bounces`](Reference.md#bounces)
- [`overScrollMode`](Reference.md#overscrollmode)
- [`contentInset`](Reference.md#contentinset)
- [`contentInsetAdjustmentBehavior`](Reference.md#contentInsetAdjustmentBehavior)
- [`dataDetectorTypes`](Reference.md#datadetectortypes)
- [`scrollEnabled`](Reference.md#scrollenabled)
- [`directionalLockEnabled`](Reference.md#directionalLockEnabled)
- [`geolocationEnabled`](Reference.md#geolocationenabled)
- [`allowFileAccessFromFileURLs`](Reference.md#allowFileAccessFromFileURLs)
- [`allowUniversalAccessFromFileURLs`](Reference.md#allowUniversalAccessFromFileURLs)
- [`allowingReadAccessToURL`](Reference.md#allowingReadAccessToURL)
- [`url`](Reference.md#url)
- [`html`](Reference.md#html)
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
- [`ignoreSilentHardwareSwitch`](Reference.md#ignoreSilentHardwareSwitch)
- [`onFileDownload`](Reference.md#onFileDownload)

## Methods Index

- [`extraNativeComponentConfig`](Reference.md#extranativecomponentconfig)
- [`goForward`](Reference.md#goforward)
- [`goBack`](Reference.md#goback)
- [`reload`](Reference.md#reload)
- [`stopLoading`](Reference.md#stoploading)
- [`injectJavaScript`](Reference.md#injectjavascriptstr)
- [`clearFormData`](Reference.md#clearFormData)
- [`clearCache`](Reference.md#clearCache)
- [`clearHistory`](Reference.md#clearHistory)
- [`requestFocus`](Reference.md#requestFocus)

---

# Reference

## Props

### `source`

Loads static HTML or a URI (with optional headers) in the WebView. Note that static HTML will require setting [`originWhitelist`](Reference.md#originwhitelist) to `["*"]`.

The object passed to `source` can have either of the following shapes:

**Load uri**

- `uri` (string) - The URI to load in the `WebView`. Can be a local or remote file, and can be changed with React state or props to navigate to a new page.
- `method` (string) - The HTTP Method to use. Defaults to GET if not specified. On Android, the only supported methods are GET and POST.
- `headers` (object) - Additional HTTP headers to send with the request. On Android, this can only be used with GET requests. See the [Guide](Guide.md#setting-custom-headers) for more information on setting custom headers.
- `body` (string) - The HTTP body to send with the request. This must be a valid UTF-8 string, and will be sent exactly as specified, with no additional encoding (e.g. URL-escaping or base64) applied. On Android, this can only be used with POST requests.

**Static HTML**

_Note that using static HTML requires the WebView property [originWhiteList](Reference.md#originWhiteList) to `['*']`. For some content, such as video embeds (e.g. Twitter or Facebook posts with video), the baseUrl needs to be set for the video playback to work_

- `html` (string) - A static HTML page to display in the WebView.
- `baseUrl` (string) - The base URL to be used for any relative links in the HTML. This is also used for the origin header with CORS requests made from the WebView. See [Android WebView Docs](https://developer.android.com/reference/android/webkit/WebView#loadDataWithBaseURL)

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### `automaticallyAdjustContentInsets`

Controls whether to adjust the content inset for web views that are placed behind a navigation bar, tab bar, or toolbar. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `injectedJavaScript`

Set this to provide JavaScript that will be injected into the web page after the document finishes loading, but before other subresources finish loading.

Make sure the string evaluates to a valid type (`true` works) and doesn't otherwise throw an exception.

On iOS, see [`WKUserScriptInjectionTimeAtDocumentEnd`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentend?language=objc)

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS, Android, macOS

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

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

### `injectedJavaScriptBeforeContentLoaded`

Set this to provide JavaScript that will be injected into the web page after the document element is created, but before other subresources finish loading.

Make sure the string evaluates to a valid type (`true` works) and doesn't otherwise throw an exception.

On iOS, see [`WKUserScriptInjectionTimeAtDocumentStart`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentstart?language=objc)

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS, macOS |

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

Example:

Post message a JSON object of `window.location` to be handled by [`onMessage`](Reference.md#onmessage). `window.ReactNativeWebView.postMessage` *will* be available at this time.

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

### `injectedJavaScriptForMainFrameOnly`

If `true` (default), loads the `injectedJavaScript` only into the main frame.

If `false`, loads it into all frames (e.g. iframes).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| bool | No       | iOS, macOS       |

---

### `injectedJavaScriptBeforeContentLoadedForMainFrameOnly`

If `true` (default), loads the `injectedJavaScriptBeforeContentLoaded` only into the main frame.

If `false`, loads it into all frames (e.g. iframes).

Warning: although support for `injectedJavaScriptBeforeContentLoadedForMainFrameOnly: false` has been implemented for iOS and macOS, [it is not clear](https://github.com/react-native-community/react-native-webview/pull/1119#issuecomment-600275750) that it is actually possible to inject JS into iframes at this point in the page lifecycle, and so relying on the expected behaviour of this prop when set to `false` is not recommended.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| bool | No       | iOS, macOS       |

---

### `mediaPlaybackRequiresUserAction`

Boolean that determines whether HTML5 audio and video requires the user to tap them before they start playing. The default value is `true`. (Android API minimum version 17).

NOTE: the default `true` value might cause some videos to hang loading on iOS. Setting it to `false` could fix this issue.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS, Android, macOS |

---

### `nativeConfig`

Override the native component used to render the WebView. Enables a custom native WebView which uses the same JavaScript as the original WebView.

The `nativeConfig` prop expects an object with the following keys:

- `component` (any)
- `props` (object)
- `viewManager` (object)

| Type   | Required | Platform |
| ------ | -------- | -------- |
| object | No       | iOS, Android, macOS |

---

### `onError`

Function that is invoked when the `WebView` load fails.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onError={syntheticEvent => {
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

---

### `onLoad`

Function that is invoked when the `WebView` has finished loading.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoad={syntheticEvent => {
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

### `onLoadEnd`

Function that is invoked when the `WebView` load succeeds or fails.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadEnd={syntheticEvent => {
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

### `onLoadStart`

Function that is invoked when the `WebView` starts loading.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev/=' }}
  onLoadStart={syntheticEvent => {
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

### `onLoadProgress`

Function that is invoked when the `WebView` is loading.

| Type     | Required | Platform |
| -------- | -------- | --------- |
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

### `onHttpError`

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
  onHttpError={syntheticEvent => {
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

### `onMessage`

Function that is invoked when the webview calls `window.ReactNativeWebView.postMessage`. Setting this property will inject this global into your webview.

`window.ReactNativeWebView.postMessage` accepts one argument, `data`, which will be available on the event object, `event.nativeEvent.data`. `data` must be a string.

| Type     | Required |
| -------- | -------- |
| function | No       |

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

---

### `onNavigationStateChange`

Function that is invoked when the `WebView` loading starts or ends.

| Type     | Required |
| -------- | -------- |
| function | No       |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onNavigationStateChange={navState => {
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
navigationType
target
title
url
```

Note that this method will not be invoked on hash URL changes (e.g. from `https://example.com/users#list` to `https://example.com/users#help`). There is a workaround for this that is described [in the Guide](Guide.md#intercepting-hash-url-changes).

---

### `onContentProcessDidTerminate`

Function that is invoked when the `WebView` content process is terminated.

| Type     | Required | Platform                |
| -------- | -------- | ----------------------- |
| function | No       | iOS and macOS WKWebView |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onContentProcessDidTerminate={syntheticEvent => {
    const { nativeEvent } = syntheticEvent;
    console.warn('Content process terminated, reloading', nativeEvent);
    this.refs.webview.reload();
  }}
/>
```

Function passed to onContentProcessDidTerminate is called with a SyntheticEvent wrapping a nativeEvent with these properties:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `originWhitelist`

List of origin strings to allow being navigated to. The strings allow wildcards and get matched against _just_ the origin (not the full URL). If the user taps to navigate to a new page but the new page is not in this whitelist, the URL will be handled by the OS. The default whitelisted origins are "http://*" and "https://*".

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
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

### `renderError`

Function that returns a view to show if there's an error.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS, Android, macOS |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  renderError={errorName => <Error name={errorName} />}
/>
```

The function passed to `renderError` will be called with the name of the error

---

### `renderLoading`

Function that returns a loading indicator. The startInLoadingState prop must be set to true in order to use this prop.

| Type     | Required | Platform |
| -------- | -------- | -------- |
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

### `scalesPageToFit`

Boolean that controls whether the web content is scaled to fit the view and enables the user to change the scale. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `onShouldStartLoadWithRequest`

Function that allows custom handling of any web view requests. Return `true` from the function to continue loading the request and `false` to stop loading.

On Android, is not called on the first load.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS, Android, macOS |

Example:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onShouldStartLoadWithRequest={request => {
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
navigationType
```

---

### `startInLoadingState`

Boolean value that forces the `WebView` to show the loading view on the first load. This prop must be set to `true` in order for the `renderLoading` prop to work.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS, Android, macOS |

---

### `style`

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

### `containerStyle`

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

### `decelerationRate`

A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. You may also use the string shortcuts `"normal"` and `"fast"` which match the underlying iOS settings for `UIScrollViewDecelerationRateNormal` and `UIScrollViewDecelerationRateFast` respectively:

- normal: 0.998
- fast: 0.99 (the default for iOS web view)

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `domStorageEnabled`

Boolean value to control whether DOM Storage is enabled. Used only in Android.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `javaScriptEnabled`

Boolean value to enable JavaScript in the `WebView`. The default value is `true`.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `androidHardwareAccelerationDisabled`

Boolean value to disable Hardware Acceleration in the `WebView`. Used on Android only as Hardware Acceleration is a feature only for Android. The default value is `false`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `mixedContentMode`

Specifies the mixed content mode. i.e WebView will allow a secure origin to load content from any other origin.

Possible values for `mixedContentMode` are:

- `never` (default) - WebView will not allow a secure origin to load content from an insecure origin.
- `always` - WebView will allow a secure origin to load content from any other origin, even if that origin is insecure.
- `compatibility` - WebView will attempt to be compatible with the approach of a modern web browser with regard to mixed content.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `thirdPartyCookiesEnabled`

Boolean value to enable third party cookies in the `WebView`. Used on Android Lollipop and above only as third party cookies are enabled by default on Android Kitkat and below and on iOS. The default value is `true`. For more on cookies, read the [Guide](Guide.md#Managing-Cookies)

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `userAgent`

Sets the user-agent for the `WebView`.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS, Android, macOS |

---

### `applicationNameForUserAgent`

Append to the existing user-agent. Setting `userAgent` will override this.

| Type   | Required | Platform |
| ------ | -------- | -------- |
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

### `allowsFullscreenVideo`

Boolean that determines whether videos are allowed to be played in fullscreen. The default value is `false`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `allowsInlineMediaPlayback`

Boolean that determines whether HTML5 videos play inline or use the native full-screen controller. The default value is `false`.

> **NOTE**
>
> In order for video to play inline, not only does this property need to be set to `true`, but the video element in the HTML document must also include the `webkit-playsinline` attribute.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `bounces`

Boolean value that determines whether the web view bounces when it reaches the edge of the content. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `overScrollMode`

Specifies the over scroll mode.

Possible values for `overScrollMode` are:

- `always` (default) - Always allow a user to over-scroll this view, provided it is a view that can scroll.
- `content` - Allow a user to over-scroll this view only if the content is large enough to meaningfully scroll, provided it is a view that can scroll.
- `never` - Never allow a user to over-scroll this view.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `contentInset`

The amount by which the web view content is inset from the edges of the scroll view. Defaults to {top: 0, left: 0, bottom: 0, right: 0}.

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       | iOS      |

---

### `contentInsetAdjustmentBehavior`

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

### `dataDetectorTypes`

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

### `scrollEnabled`

Boolean value that determines whether scrolling is enabled in the `WebView`. The default value is `true`. Setting this to `false` will prevent the webview from moving the document body when the keyboard appears over an input.

| Type | Required | Platform      |
| ---- | -------- | ------------- |
| bool | No       | iOS and macOS |

---

### `directionalLockEnabled`

A Boolean value that determines whether scrolling is disabled in a particular direction.
The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `showsHorizontalScrollIndicator`

Boolean value that determines whether a horizontal scroll indicator is shown in the `WebView`. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS, Android, macOS |

---

### `showsVerticalScrollIndicator`

Boolean value that determines whether a vertical scroll indicator is shown in the `WebView`. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS, Android, macOS |

---

### `geolocationEnabled`

Set whether Geolocation is enabled in the `WebView`. The default value is `false`. Used only in Android.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `allowFileAccessFromFileURLs`

Boolean that sets whether JavaScript running in the context of a file scheme URL should be allowed to access content from other file scheme URLs. The default value is `false`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS, Android, macOS |

---

### `allowUniversalAccessFromFileURLs`

Boolean that sets whether JavaScript running in the context of a file scheme URL should be allowed to access content from any origin. Including accessing content from other file scheme URLs. The default value is `false`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `allowingReadAccessToURL`

A String value that indicates which URLs the WebView's file can then reference in scripts, AJAX requests, and CSS imports. This is only used in for WebViews that are loaded with a source.uri set to a `'file://'` URL. If not provided, the default is to only allow read access to the URL provided in source.uri itself.

| Type   | Required | Platform      |
| ------ | -------- | ------------- |
| string | No       | iOS and macOS |

---

### `url`

**Deprecated.** Use the `source` prop instead.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `html`

**Deprecated.** Use the `source` prop instead.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `keyboardDisplayRequiresUserAction`

If false, web content can programmatically display the keyboard. The default value is `true`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `hideKeyboardAccessoryView`

If true, this will hide the keyboard accessory view (< > and Done).

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `allowsBackForwardNavigationGestures`

If true, this will be able horizontal swipe gestures. The default value is `false`.

| Type    | Required | Platform      |
| ------- | -------- | ------------- |
| boolean | No       | iOS and macOS |

---

### `incognito`

Does not store any data within the lifetime of the WebView.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS, Android, macOS |

---

### `allowFileAccess`

If true, this will allow access to the file system via `file://` URI's. The default value is `false`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |

---

### `saveFormDataDisabled`

Sets whether the WebView should disable saving form data. The default value is `false`. This function does not have any effect from Android API level 26 onwards as there is an Autofill feature which stores form data.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |

---

### `cacheEnabled`

Sets whether WebView should use browser caching.

| Type    | Required | Default | Platform |
| ------- | -------- | ------- | -------- |
| boolean | No       | true    | iOS, Android, macOS |

---

### `cacheMode`

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

### `pagingEnabled`

If the value of this property is true, the scroll view stops on multiples of the scroll view’s bounds when the user scrolls. The default value is false.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `allowsLinkPreview`

A Boolean value that determines whether pressing on a link displays a preview of the destination for the link. In iOS this property is available on devices that support 3D Touch. In iOS 10 and later, the default value is true; before that, the default value is false.

| Type    | Required | Platform      |
| ------- | -------- | ------------- |
| boolean | No       | iOS and macOS |

---

### `sharedCookiesEnabled`

Set `true` if shared cookies from `[NSHTTPCookieStorage sharedHTTPCookieStorage]` should used for every load request in the WebView. The default value is `false`. For more on cookies, read the [Guide](Guide.md#Managing-Cookies)

| Type    | Required | Platform      |
| ------- | -------- | ------------- |
| boolean | No       | iOS and macOS |

---

### `textZoom`

If the user has set a custom font size in the Android system, an undesirable scale of the site interface in WebView occurs.

When setting the standard textZoom (100) parameter size, this undesirable effect disappears.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

Example:

`<WebView textZoom={100} />`

### `ignoreSilentHardwareSwitch`

(ios only)

When set to true the hardware silent switch is ignored. Default: `false`

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

### `onFileDownload`
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
  onFileDownload={ ( { nativeEvent: { downloadUrl } } ) => {
    // You use downloadUrl which is a string to download files however you want.
  }}
  />
```

| Type    | Required | Platform |
| ------- | -------- | -------- |
| function | No       | iOS      |

## Methods

### `extraNativeComponentConfig()`

```javascript
static extraNativeComponentConfig()
```

### `goForward()`

```javascript
goForward();
```

Go forward one page in the web view's history.

### `goBack()`

```javascript
goBack();
```

Go back one page in the web view's history.

### `reload()`

```javascript
reload();
```

Reloads the current page.

### `stopLoading()`

```javascript
stopLoading();
```

Stop loading the current page.

### `injectJavaScript(str)`

```javascript
injectJavaScript('... javascript string ...');
```

Executes the JavaScript string.

To learn more, read the [Communicating between JS and Native](Guide.md#communicating-between-js-and-native) guide.

### `requestFocus()`

```javascript
requestFocus();
```

Request the webView to ask for focus. (People working on TV apps might want having a look at this!)

### `clearFormData()`

(android only)

```javascript
clearFormData();
```

Removes the autocomplete popup from the currently focused form field, if present. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearFormData()>)

### `clearCache(bool)`

(android only)

```javascript
clearCache(true);
```

Clears the resource cache. Note that the cache is per-application, so this will clear the cache for all WebViews used. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearCache(boolean)>)

### `clearHistory()`

(android only)

```javascript
clearHistory();
```

Tells this WebView to clear its internal back/forward list. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearHistory()>)

## Other Docs

Also check out our [Getting Started Guide](Getting-Started.md) and [In-Depth Guide](Guide.md).
