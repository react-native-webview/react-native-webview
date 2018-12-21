# React Native WebView API Reference

This document lays out the current public properties and methods for the React Native WebView.

> **Security Warning:** Currently, `onMessage` and `postMessage` do not allow specifying an origin. This can lead to cross-site scripting attacks if an unexpected document is loaded within a `WebView` instance. Please refer to the MDN documentation for [`Window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) for more details on the security implications of this.

## Props Index

- [`source`](Reference.md#source)
- [`automaticallyAdjustContentInsets`](Reference.md#automaticallyadjustcontentinsets)
- [`injectedJavaScript`](Reference.md#injectedjavascript)
- [`mediaPlaybackRequiresUserAction`](Reference.md#mediaplaybackrequiresuseraction)
- [`nativeConfig`](Reference.md#nativeconfig)
- [`onError`](Reference.md#onerror)
- [`onLoad`](Reference.md#onload)
- [`onLoadEnd`](Reference.md#onloadend)
- [`onLoadStart`](Reference.md#onloadstart)
- [`onLoadProgress`](Reference.md#onloadprogress)
- [`onMessage`](Reference.md#onmessage)
- [`onNavigationStateChange`](Reference.md#onnavigationstatechange)
- [`originWhitelist`](Reference.md#originwhitelist)
- [`renderError`](Reference.md#rendererror)
- [`renderLoading`](Reference.md#renderloading)
- [`scalesPageToFit`](Reference.md#scalespagetofit)
- [`onShouldStartLoadWithRequest`](Reference.md#onshouldstartloadwithrequest)
- [`startInLoadingState`](Reference.md#startinloadingstate)
- [`style`](Reference.md#style)
- [`decelerationRate`](Reference.md#decelerationrate)
- [`domStorageEnabled`](Reference.md#domstorageenabled)
- [`javaScriptEnabled`](Reference.md#javascriptenabled)
- [`mixedContentMode`](Reference.md#mixedcontentmode)
- [`thirdPartyCookiesEnabled`](Reference.md#thirdpartycookiesenabled)
- [`userAgent`](Reference.md#useragent)
- [`allowsInlineMediaPlayback`](Reference.md#allowsinlinemediaplayback)
- [`bounces`](Reference.md#bounces)
- [`overScrollMode`](Reference.md#overscrollmode)
- [`contentInset`](Reference.md#contentinset)
- [`dataDetectorTypes`](Reference.md#datadetectortypes)
- [`scrollEnabled`](Reference.md#scrollenabled)
- [`geolocationEnabled`](Reference.md#geolocationenabled)
- [`allowUniversalAccessFromFileURLs`](Reference.md#allowUniversalAccessFromFileURLs)
- [`useWebKit`](Reference.md#usewebkit)
- [`url`](Reference.md#url)
- [`html`](Reference.md#html)
- [`hideKeyboardAccessoryView`](Reference.md#hidekeyboardaccessoryview)
- [`allowsBackForwardNavigationGestures`](Reference.md#allowsbackforwardnavigationgestures)
- [`allowFileAccess`](Reference.md#allowFileAccess)
- [`saveFormDataDisabled`](Reference.md#saveFormDataDisabled)
- [`pagingEnabled`](Reference.md#pagingEnabled)
- [`allowsLinkPreview`](Reference.md#allowsLinkPreview)

## Methods Index

- [`extraNativeComponentConfig`](Reference.md#extranativecomponentconfig)
- [`goForward`](Reference.md#goforward)
- [`goBack`](Reference.md#goback)
- [`reload`](Reference.md#reload)
- [`stopLoading`](Reference.md#stoploading)
- [`injectJavaScript`](Reference.md#injectjavascriptstr)

---

# Reference

## Props

### `source`

Loads static HTML or a URI (with optional headers) in the WebView. Note that static HTML will require setting [`originWhitelist`](Reference.md#originwhitelist) to `["*"]`.

The object passed to `source` can have either of the following shapes:

**Load uri**

- `uri` (string) - The URI to load in the `WebView`. Can be a local or remote file.
- `method` (string) - The HTTP Method to use. Defaults to GET if not specified. On Android, the only supported methods are GET and POST.
- `headers` (object) - Additional HTTP headers to send with the request. On Android, this can only be used with GET requests.
- `body` (string) - The HTTP body to send with the request. This must be a valid UTF-8 string, and will be sent exactly as specified, with no additional encoding (e.g. URL-escaping or base64) applied. On Android, this can only be used with POST requests.

**Static HTML**

_Note that using static HTML requires the WebView property [originWhiteList](Reference.md#originWhiteList) to `['*']`._

- `html` (string) - A static HTML page to display in the WebView.
- `baseUrl` (string) - The base URL to be used for any relative links in the HTML.

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### `automaticallyAdjustContentInsets`

Controls whether to adjust the content inset for web views that are placed behind a navigation bar, tab bar, or toolbar. The default value is `true`.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `injectedJavaScript`

Set this to provide JavaScript that will be injected into the web page when the view loads. Make sure the string evaluates to a valid type (`true` works) and doesn't otherwise throw an exception.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `mediaPlaybackRequiresUserAction`

Boolean that determines whether HTML5 audio and video requires the user to tap them before they start playing. The default value is `true`. (Android API minimum version 17)

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `nativeConfig`

Override the native component used to render the WebView. Enables a custom native WebView which uses the same JavaScript as the original WebView.

The `nativeConfig` prop expects an object with the following keys:

- `component` (any)
- `props` (object)
- `viewManager` (object)

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### `onError`

Function that is invoked when the `WebView` load fails.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoad`

Function that is invoked when the `WebView` has finished loading.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadEnd`

Function that is invoked when the `WebView` load succeeds or fails.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadStart`

Function that is invoked when the `WebView` starts loading.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadProgress`

Function that is invoked when the `WebView` is loading.

> **_Note_**
>
> On iOS, when useWebKit=false, this prop will not work.
> On android, You can't get the url property, meaning that `event.nativeEvent.url` will be null.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onMessage`

A function that is invoked when the webview calls `window.postMessage`. Setting this property will inject a `postMessage` global into your webview, but will still call pre-existing values of `postMessage`.

`window.postMessage` accepts one argument, `data`, which will be available on the event object, `event.nativeEvent.data`. `data` must be a string.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onNavigationStateChange`

Function that is invoked when the `WebView` loading starts or ends.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `originWhitelist`

List of origin strings to allow being navigated to. The strings allow wildcards and get matched against _just_ the origin (not the full URL). If the user taps to navigate to a new page but the new page is not in this whitelist, the URL will be handled by the OS. The default whitelisted origins are "http://*" and "https://*".

| Type             | Required |
| ---------------- | -------- |
| array of strings | No       |

---

### `renderError`

Function that returns a view to show if there's an error.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderLoading`

Function that returns a loading indicator. The startInLoadingState prop must be set to true in order to use this prop.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `scalesPageToFit`

Boolean that controls whether the web content is scaled to fit the view and enables the user to change the scale. The default value is `true`.

On iOS, when [`useWebKit=true`](Reference.md#usewebkit), this prop will not work.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onShouldStartLoadWithRequest`

Function that allows custom handling of any web view requests. Return `true` from the function to continue loading the request and `false` to stop loading.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `startInLoadingState`

Boolean value that forces the `WebView` to show the loading view on the first load. This prop must be set to `true` in order for the `renderLoading` prop to work.

| Type | Required |
| ---- | -------- |
| bool | No       |

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

Boolean value to enable JavaScript in the `WebView`. Used on Android only as JavaScript is enabled by default on iOS. The default value is `true`.

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

Boolean value to enable third party cookies in the `WebView`. Used on Android Lollipop and above only as third party cookies are enabled by default on Android Kitkat and below and on iOS. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `userAgent`

Sets the user-agent for the `WebView`. This will only work for iOS if you are using WKWebView, not UIWebView (see https://developer.apple.com/documentation/webkit/wkwebview/1414950-customuseragent).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android, iOS WKWebView  |

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

With the [new WebKit](Reference.md#usewebkit) implementation, we have three new values:

- `trackingNumber`
- `flightNumber`
- `lookupSuggestion`

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
| string, or array | No       | iOS      |

---

### `scrollEnabled`

Boolean value that determines whether scrolling is enabled in the `WebView`. The default value is `true`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `geolocationEnabled`

Set whether Geolocation is enabled in the `WebView`. The default value is `false`. Used only in Android.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `allowUniversalAccessFromFileURLs`

Boolean that sets whether JavaScript running in the context of a file scheme URL should be allowed to access content from any origin. Including accessing content from other file scheme URLs. The default value is `false`.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `useWebKit`

If true, use WKWebView instead of UIWebView.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

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

### `hideKeyboardAccessoryView`

If true, this will hide the keyboard accessory view (< > and Done) when using the WKWebView.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `allowsBackForwardNavigationGestures`

If true, this will be able horizontal swipe gestures when using the WKWebView. The default value is `false`.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

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

### `pagingEnabled`

If the value of this property is true, the scroll view stops on multiples of the scroll view’s bounds when the user scrolls. The default value is false.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

---

### `allowsLinkPreview`

A Boolean value that determines whether pressing on a link displays a preview of the destination for the link. In iOS this property is available on devices that support 3D Touch. In iOS 10 and later, the default value is true; before that, the default value is false.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | iOS      |

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

## Other Docs

Also check out our [Getting Started Guide](Getting-Started.md) and [In-Depth Guide](Guide.md).
