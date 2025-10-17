# React Native WebView API 参考

本文档列出了 React Native WebView 的公开属性与方法。

## Props 索引

- [`source`](Reference.chinese.md#source)
- [`automaticallyAdjustContentInsets`](Reference.chinese.md#automaticallyadjustcontentinsets)
- [`automaticallyAdjustsScrollIndicatorInsets`](Reference.chinese.md#automaticallyAdjustsScrollIndicatorInsets)
- [`injectedJavaScript`](Reference.chinese.md#injectedjavascript)
- [`injectedJavaScriptBeforeContentLoaded`](Reference.chinese.md#injectedjavascriptbeforecontentloaded)
- [`injectedJavaScriptForMainFrameOnly`](Reference.chinese.md#injectedjavascriptformainframeonly)
- [`injectedJavaScriptBeforeContentLoadedForMainFrameOnly`](Reference.chinese.md#injectedjavascriptbeforecontentloadedformainframeonly)
- [`injectedJavaScriptObject`](Reference.chinese.md#injectedjavascriptobject)
- [`mediaPlaybackRequiresUserAction`](Reference.chinese.md#mediaplaybackrequiresuseraction)
- [`nativeConfig`](Reference.chinese.md#nativeconfig)
- [`onError`](Reference.chinese.md#onerror)
- [`onRenderProcessGone`](Reference.chinese.md#onRenderProcessGone)
- [`onLoad`](Reference.chinese.md#onload)
- [`onLoadEnd`](Reference.chinese.md#onloadend)
- [`onLoadStart`](Reference.chinese.md#onloadstart)
- [`onLoadProgress`](Reference.chinese.md#onloadprogress)
- [`onHttpError`](Reference.chinese.md#onhttperror)
- [`onMessage`](Reference.chinese.md#onmessage)
- [`onNavigationStateChange`](Reference.chinese.md#onnavigationstatechange)
- [`onOpenWindow`](Reference.chinese.md#onopenwindow)
- [`onContentProcessDidTerminate`](Reference.chinese.md#oncontentprocessdidterminate)
- [`onScroll`](Reference.chinese.md#onscroll)
- [`originWhitelist`](Reference.chinese.md#originwhitelist)
- [`renderError`](Reference.chinese.md#rendererror)
- [`renderLoading`](Reference.chinese.md#renderloading)
- [`scalesPageToFit`](Reference.chinese.md#scalespagetofit)
- [`onShouldStartLoadWithRequest`](Reference.chinese.md#onshouldstartloadwithrequest)
- [`startInLoadingState`](Reference.chinese.md#startinloadingstate)
- [`style`](Reference.chinese.md#style)
- [`containerStyle`](Reference.chinese.md#containerStyle)
- [`decelerationRate`](Reference.chinese.md#decelerationrate)
- [`domStorageEnabled`](Reference.chinese.md#domstorageenabled)
- [`javaScriptEnabled`](Reference.chinese.md#javascriptenabled)
- [`javaScriptCanOpenWindowsAutomatically`](Reference.chinese.md#javascriptcanopenwindowsautomatically)
- [`androidLayerType`](Reference.chinese.md#androidLayerType)
- [`mixedContentMode`](Reference.chinese.md#mixedcontentmode)
- [`thirdPartyCookiesEnabled`](Reference.chinese.md#thirdpartycookiesenabled)
- [`userAgent`](Reference.chinese.md#useragent)
- [`applicationNameForUserAgent`](Reference.chinese.md#applicationNameForUserAgent)
- [`allowsFullscreenVideo`](Reference.chinese.md#allowsfullscreenvideo)
- [`allowsInlineMediaPlayback`](Reference.chinese.md#allowsinlinemediaplayback)
- [`allowsPictureInPictureMediaPlayback`](Reference.chinese.md#allowsPictureInPictureMediaPlayback)
- [`allowsAirPlayForMediaPlayback`](Reference.chinese.md#allowsAirPlayForMediaPlayback)
- [`bounces`](Reference.chinese.md#bounces)
- [`overScrollMode`](Reference.chinese.md#overscrollmode)
- [`contentInset`](Reference.chinese.md#contentinset)
- [`contentInsetAdjustmentBehavior`](Reference.chinese.md#contentInsetAdjustmentBehavior)
- [`contentMode`](Reference.chinese.md#contentMode)
- [`dataDetectorTypes`](Reference.chinese.md#datadetectortypes)
- [`indicatorStyle`](Reference.chinese.md#indicatorStyle)
- [`scrollEnabled`](Reference.chinese.md#scrollenabled)
- [`nestedScrollEnabled`](Reference.chinese.md#nestedscrollenabled)
- [`setBuiltInZoomControls`](Reference.chinese.md#setBuiltInZoomControls)
- [`setDisplayZoomControls`](Reference.chinese.md#setDisplayZoomControls)
- [`directionalLockEnabled`](Reference.chinese.md#directionalLockEnabled)
- [`geolocationEnabled`](Reference.chinese.md#geolocationenabled)
- [`allowFileAccessFromFileURLs`](Reference.chinese.md#allowFileAccessFromFileURLs)
- [`allowUniversalAccessFromFileURLs`](Reference.chinese.md#allowUniversalAccessFromFileURLs)
- [`allowingReadAccessToURL`](Reference.chinese.md#allowingReadAccessToURL)
- [`keyboardDisplayRequiresUserAction`](Reference.chinese.md#keyboardDisplayRequiresUserAction)
- [`hideKeyboardAccessoryView`](Reference.chinese.md#hidekeyboardaccessoryview)
- [`allowsBackForwardNavigationGestures`](Reference.chinese.md#allowsbackforwardnavigationgestures)
- [`incognito`](Reference.chinese.md#incognito)
- [`allowFileAccess`](Reference.chinese.md#allowFileAccess)
- [`saveFormDataDisabled`](Reference.chinese.md#saveFormDataDisabled)
- [`cacheEnabled`](Reference.chinese.md#cacheEnabled)
- [`cacheMode`](Reference.chinese.md#cacheMode)
- [`pagingEnabled`](Reference.chinese.md#pagingEnabled)
- [`allowsLinkPreview`](Reference.chinese.md#allowsLinkPreview)
- [`sharedCookiesEnabled`](Reference.chinese.md#sharedCookiesEnabled)
- [`textZoom`](Reference.chinese.md#textZoom)
- [`pullToRefreshEnabled`](Reference.chinese.md#pullToRefreshEnabled)
- [`refreshControlLightMode`](Reference.chinese.md#refreshControlLightMode)
- [`ignoreSilentHardwareSwitch`](Reference.chinese.md#ignoreSilentHardwareSwitch)
- [`onFileDownload`](Reference.chinese.md#onFileDownload)
- [`limitsNavigationsToAppBoundDomains`](Reference.chinese.md#limitsNavigationsToAppBoundDomains)
- [`textInteractionEnabled`](Reference.chinese.md#textInteractionEnabled)
- [`suppressMenuItems`](Reference.chinese.md#suppressMenuItems)
- [`mediaCapturePermissionGrantType`](Reference.chinese.md#mediaCapturePermissionGrantType)
- [`autoManageStatusBarEnabled`](Reference.chinese.md#autoManageStatusBarEnabled)
- [`setSupportMultipleWindows`](Reference.chinese.md#setSupportMultipleWindows)
- [`basicAuthCredential`](Reference.chinese.md#basicAuthCredential)
- [`enableApplePay`](Reference.chinese.md#enableApplePay)
- [`forceDarkOn`](Reference.chinese.md#forceDarkOn)
- [`useWebView2`](Reference.chinese.md#useWebView2)
- [`minimumFontSize`](Reference.chinese.md#minimumFontSize)
- [`downloadingMessage`](Reference.chinese.md#downloadingMessage)
- [`lackPermissionToDownloadMessage`](Reference.chinese.md#lackPermissionToDownloadMessage)
- [`allowsProtectedMedia`](Reference.chinese.md#allowsProtectedMedia)
- [`webviewDebuggingEnabled`](Reference.chinese.md#webviewDebuggingEnabled)
- [`paymentRequestEnabled`](Reference.chinese.md#paymentRequestEnabled)

## 方法索引

- [`goForward`](Reference.chinese.md#goforward)
- [`goBack`](Reference.chinese.md#goback)
- [`reload`](Reference.chinese.md#reload)
- [`stopLoading`](Reference.chinese.md#stoploading)
- [`injectJavaScript`](Reference.chinese.md#injectjavascriptstr)
- [`clearFormData`](Reference.chinese.md#clearFormData)
- [`clearCache`](Reference.chinese.md#clearCachebool)
- [`clearHistory`](Reference.chinese.md#clearHistory)
- [`requestFocus`](Reference.chinese.md#requestFocus)
- [`postMessage`](Reference.chinese.md#postmessagestr)

---

# 参考

## Props

### `source`[⬆](#props-索引)

在 WebView 中加载静态 HTML 或一个 URI（可选请求头）。注意：使用静态 HTML 需要将 [`originWhitelist`](Reference.chinese.md#originwhitelist) 设置为 `["*"]`。

传递给 `source` 的对象可以是以下任一形状：

**加载 URI**

- `uri` (string) - 要在 `WebView` 中加载的 URI。可以是本地或远程文件，并且可以通过 React 的 state 或 props 改变以导航到新页面。
- `method` (string) - 使用的 HTTP 方法。未指定时默认为 GET。在 Android 和 Windows 上，仅支持 GET 和 POST。
- `headers` (object) - 附加到请求的 HTTP 头。在 Android 上，仅可与 GET 请求一起使用。有关自定义请求头的更多信息，请参阅[指南](Guide.chinese.md#设置自定义-header)。
- `body` (string) - 请求要发送的 HTTP body。必须是有效的 UTF-8 字符串，会按原样发送，不会应用额外编码（例如 URL 转义或 base64）。在 Android 和 Windows 上，仅可用于 POST 请求。

**静态 HTML**

_注意：使用静态 HTML 需要将 WebView 属性 [originWhiteList](Reference.chinese.md#originWhiteList) 设置为 `['*']`。对于某些内容（如视频嵌入，例如含视频的 Twitter 或 Facebook 帖子），为使视频播放正常工作，需要设置 baseUrl。_

- `html` (string) - 要在 WebView 中显示的静态 HTML 页面。
- `baseUrl` (string) - 用于 HTML 中任何相对链接的基础 URL。也用作 WebView 发起的 CORS 请求的 origin 头。参见 [Android WebView 文档](https://developer.android.com/reference/android/webkit/WebView#loadDataWithBaseURL)

| 类型   | 必填 |
| ------ | ---- |
| object | 否   |

---

### `automaticallyAdjustContentInsets`[⬆](#props-索引)

控制是否为位于导航栏、标签栏或工具栏后面的 WebView 调整内容内边距。默认值为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `automaticallyAdjustsScrollIndicatorInsets`[⬆](#props-索引)

控制是否为位于导航栏、标签栏或工具栏后面的 WebView 调整滚动指示器的内边距。默认值为 `false`。（iOS 13+）

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | iOS(13+) |

---

### `injectedJavaScript`[⬆](#props-索引)

设置将在文档完成加载后、其他子资源加载完成之前注入到网页的 JavaScript 代码。

确保该字符串能求值为一个有效类型（比如 `true`），并且不会抛出异常。

在 iOS 上，参见 [`WKUserScriptInjectionTimeAtDocumentEnd`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentend?language=objc)。请务必
设置一个 [`onMessage`](Reference.chinese.md#onmessage) 处理器，即使是空实现，否则代码不会运行。

| 类型   | 必填 | 平台                     |
| ------ | ---- | ------------------------ |
| string | 否   | iOS, Android, macOS, Windows |

想了解更多，请阅读[JS 与原生通信](Guide.chinese.md#在-js-与原生之间通信)指南。

_请注意：Windows 没有[对 alert 的原生支持](https://github.com/MicrosoftDocs/winrt-api/blob/docs/windows.ui.xaml.controls/webview.md#use-of-alert)，因此任何显示 alert 的脚本都不会生效。_

示例：

将 `window.location` 的 JSON 对象通过 post message 发送，由 [`onMessage`](Reference.chinese.md#onmessage) 处理。

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

### `injectedJavaScriptBeforeContentLoaded`[⬆](#props-索引)

设置将在文档元素创建后、其他子资源加载完成之前注入到网页的 JavaScript 代码。

确保该字符串能求值为一个有效类型（比如 `true`），并且不会抛出异常。

在 iOS 上，参见 [`WKUserScriptInjectionTimeAtDocumentStart`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentstart?language=objc)

> 警告
> 在 Android 上可能有效，但并非 100% 可靠（参见 [#1609](https://github.com/react-native-webview/react-native-webview/issues/1609) 和 [#1099](https://github.com/react-native-webview/react-native-webview/pull/1099)）。请考虑使用 `injectedJavaScriptObject`。

| 类型   | 必填 | 平台                           |
| ------ | ---- | ------------------------------ |
| string | 否   | iOS, macOS, Android（实验性） |

想了解更多，请阅读[JS 与原生通信](Guide.chinese.md#在-js-与原生之间通信)指南。

示例：

将 `window.location` 的 JSON 对象通过 post message 发送，由 [`onMessage`](Reference.chinese.md#onmessage) 处理。此时 `window.ReactNativeWebView.postMessage` 已可用。

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

### `injectedJavaScriptForMainFrameOnly`[⬆](#props-索引)

如果为 `true`（默认；Android 必须为 true），则仅将 `injectedJavaScript` 注入主框架。

如果为 `false`（仅在 iOS 和 macOS 支持），则会注入到所有框架（例如 iframes）。

| 类型 | 必填 | 平台                                            |
| ---- | ---- | ----------------------------------------------- |
| bool | 否   | iOS、macOS（Android 仅支持 `true`）             |

---

### `injectedJavaScriptBeforeContentLoadedForMainFrameOnly`[⬆](#props-索引)

如果为 `true`（默认；Android 必须为 true），则仅将 `injectedJavaScriptBeforeContentLoaded` 注入主框架。

如果为 `false`（仅在 iOS 和 macOS 支持），则会注入到所有框架（例如 iframes）。

| 类型 | 必填 | 平台                                            |
| ---- | ---- | ----------------------------------------------- |
| bool | 否   | iOS、macOS（Android 仅支持 `true`）             |

---

### `injectedJavaScriptObject`[⬆](#props-索引)

向 WebView 注入任意 JavaScript 对象，使其可供页面中运行的 JS 使用。

| 类型 | 必填 | 平台            |
| ---- | ---- | --------------- |
| obj  | 否   | iOS, Android    |

示例：

设定一个可在 JavaScript 中使用的值。

注意：对象中的任何值都将对网页的“所有” frame 可见。如果存在敏感值，请确保设置了严格的内容安全策略（CSP）以避免数据泄露。

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

### `mediaPlaybackRequiresUserAction`[⬆](#props-索引)

布尔值，决定 HTML5 音视频是否需要用户点击后才开始播放。默认值为 `true`。（Android 最低 API 17）

注意：在 iOS 上，默认的 `true` 可能导致某些视频加载卡住。将其设为 `false` 可能修复该问题。

| 类型 | 必填 | 平台               |
| ---- | ---- | ------------------ |
| bool | 否   | iOS, Android, macOS |

---

### `nativeConfig`[⬆](#props-索引)

覆盖用于渲染 WebView 的原生组件。启用一个自定义的原生 WebView，同时复用原 WebView 的 JavaScript。

`nativeConfig` 需要一个包含以下键的对象：

- `component` (any)
- `props` (object)
- `viewManager` (object)

| 类型   | 必填 | 平台               |
| ------ | ---- | ------------------ |
| object | 否   | iOS, Android, macOS |

---

### `onError`[⬆](#props-索引)

当 `WebView` 加载失败时调用的函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  }}
/>
```

传递给 `onError` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

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

> 注意
> 仅 iOS 使用 domain 字段

可以通过调用 `syntheticEvent.preventDefault()` 阻止其默认行为。

---

### `onLoad`[⬆](#props-索引)

当 `WebView` 完成加载时调用的函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoad={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    this.url = nativeEvent.url;
  }}
/>
```

传递给 `onLoad` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadEnd`[⬆](#props-索引)

当 `WebView` 加载成功或失败时调用的函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadEnd={(syntheticEvent) => {
    // 更新组件，获知加载状态
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

传递给 `onLoadEnd` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadStart`[⬆](#props-索引)

当 `WebView` 开始加载时调用的函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev/=' }}
  onLoadStart={(syntheticEvent) => {
    // 更新组件，获知加载状态
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

传递给 `onLoadStart` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadProgress`[⬆](#props-索引)

当 `WebView` 正在加载时调用的函数。

| 类型     | 必填 | 平台               |
| -------- | ---- | ------------------ |
| function | 否   | iOS, Android, macOS |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadProgress={({ nativeEvent }) => {
    this.loadingProgress = nativeEvent.progress;
  }}
/>
```

传递给 `onLoadProgress` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

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

### `onHttpError`[⬆](#props-索引)

当 `WebView` 收到 HTTP 错误时调用的函数。

> 注意
> Android 最低 API 级别 23。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

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

传递给 `onHttpError` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

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

> 注意
> 仅 Android 使用 description 字段

---

### `onRenderProcessGone`[⬆](#props-索引)

当 `WebView` 进程在 Android 上崩溃或被系统杀死时调用的函数。

> 注意
> 仅 Android，且最低 API 级别 26。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

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

传递给 `onRenderProcessGone` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

```
didCrash
```
---

### `onMessage`[⬆](#props-索引)

当 webview 调用 `window.ReactNativeWebView.postMessage` 时触发的函数。设置此属性会将该全局对象注入到 webview 中。

`window.ReactNativeWebView.postMessage` 接受一个参数 `data`，可在事件对象的 `event.nativeEvent.data` 上获取。`data` 必须是字符串。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

想了解更多，请阅读[JS 与原生通信](Guide.chinese.md#在-js-与原生之间通信)指南。

---

### `onNavigationStateChange`[⬆](#props-索引)

当 `WebView` 开始或结束加载时调用的函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onNavigationStateChange={(navState) => {
    // 在组件中记录是否可以后退
    this.canGoBack = navState.canGoBack;
  }}
/>
```

`navState` 对象包含以下属性：

```
canGoBack
canGoForward
loading
navigationType（仅 iOS）
target
title
url
```

---

### `onOpenWindow`[⬆](#props-索引)<!-- Link generated with jump2header -->

当 `WebView` 需要打开一个新窗口时调用的函数。

当 JS 调用 `window.open('http://someurl', '_blank')` 或用户点击 `<a href="http://someurl" target="_blank">` 链接时会触发。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

示例：

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

传递给 onOpenWindow 的函数接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

```
targetUrl
```

---

### `onContentProcessDidTerminate`[⬆](#props-索引)

当 `WebView` 的内容进程被终止时调用的函数。

| 类型     | 必填 | 平台                |
| -------- | ---- | ------------------- |
| function | 否   | iOS 和 macOS 的 WKWebView |

iOS 的 WebView 使用单独的进程来渲染和管理网页内容。当指定的 webview 的进程因任何原因终止时，WebKit 会调用该方法。
原因不一定是崩溃。举例来说，由于 iOS 的 WebView 不计入应用的总内存，它们可以独立于应用被终止以释放内存给用户正在打开的新应用。因此，在后台一段时间后 WebView 被终止并不罕见。

示例：

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

传递给 `onContentProcessDidTerminate` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onScroll`[⬆](#props-索引)

当 `WebView` 触发滚动事件时调用的函数。

| 类型     | 必填 | 平台                      |
| -------- | ---- | ------------------------- |
| function | 否   | iOS, macOS, Android, Windows |

示例：

```jsx
<Webview
  source={{ uri: 'https://reactnative.dev' }}
  onScroll={syntheticEvent => {
    const { contentOffset } = syntheticEvent.nativeEvent
    console.table(contentOffset)
  }}
/>
```

传递给 `onScroll` 的函数，接收一个 SyntheticEvent，包裹的 nativeEvent 包含以下属性：

```
contentInset
contentOffset
contentSize
layoutMeasurement
velocity
zoomScale
```

---

### `originWhitelist`[⬆](#props-索引)

允许导航到的来源字符串列表。字符串支持通配符，并仅匹配来源（origin），不匹配完整 URL。如果用户点击导航到新页面，但新页面不在白名单中，该 URL 将由操作系统处理。默认白名单为 "http://*" 和 "https://*"。

| 类型             | 必填 | 平台               |
| ---------------- | ---- | ------------------ |
| 字符串数组       | 否   | iOS, Android, macOS |

示例：

```jsx
// 只允许以 https:// 或 git:// 开头的 URI
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  originWhitelist={['https://*', 'git://*']}
/>
```

---

### `renderError`[⬆](#props-索引)

当出现错误时，返回要显示的自定义视图。

| 类型     | 必填 | 平台               |
| -------- | ---- | ------------------ |
| function | 否   | iOS, Android, macOS |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  renderError={(errorName) => <Error name={errorName} />}
/>
```

传递给 `renderError` 的函数会接收到错误名称。

---

### `renderLoading`[⬆](#props-索引)

返回一个加载指示器的视图。要使用此属性，必须将 `startInLoadingState` 设为 `true`。

| 类型     | 必填 | 平台               |
| -------- | ---- | ------------------ |
| function | 否   | iOS, Android, macOS |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  startInLoadingState={true}
  renderLoading={() => <Loading />}
/>
```

---

### `scalesPageToFit`[⬆](#props-索引)

布尔值，控制网页内容是否缩放以适配视图，并启用用户更改缩放。默认值为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `onShouldStartLoadWithRequest`[⬆](#props-索引)

允许对任何 WebView 请求进行自定义处理。函数返回 `true` 继续加载请求，返回 `false` 停止加载。

在 Android 上，首次加载不会调用该回调。

| 类型     | 必填 | 平台               |
| -------- | ---- | ------------------ |
| function | 否   | iOS, Android, macOS |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onShouldStartLoadWithRequest={(request) => {
    // 仅允许在该站点内导航
    return request.url.startsWith('https://reactnative.dev');
  }}
/>
```

`request` 对象包含以下属性：

```
title
url
loading
target
canGoBack
canGoForward
lockIdentifier
mainDocumentURL（仅 iOS）
navigationType（仅 iOS）
isTopFrame（仅 iOS）
hasTargetFrame（仅 iOS）
```

`hasTargetFrame` 为布尔值，当导航目标是新窗口或新标签页时为 `false`，否则应为 `true`（[更多信息](https://developer.apple.com/documentation/webkit/wknavigationaction/1401918-targetframe)）。注意，当 WebView 注册了 `onOpenWindow` 事件时，该值应始终为 `true`，因为 `false` 的情况会被该事件拦截。

---

### `startInLoadingState`[⬆](#props-索引)

布尔值，强制 `WebView` 在首次加载时显示加载视图。要使用 `renderLoading`，必须设为 `true`。

| 类型 | 必填 | 平台               |
| ---- | ---- | ------------------ |
| bool | 否   | iOS, Android, macOS |

---

### `style`[⬆](#props-索引)

用于自定义 `WebView` 样式的样式对象。请注意存在一些默认样式（例如：如果想使用 `height` 属性，需要在样式中添加 `flex: 0`）。

| 类型  | 必填 |
| ----- | ---- |
| style | 否   |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  style={{ marginTop: 20 }}
/>
```

---

### `containerStyle`[⬆](#props-索引)

用于自定义 `WebView` 容器样式的样式对象。请注意存在一些默认样式（例如：如果想使用 `height` 属性，需要在样式中添加 `flex: 0`）。

| 类型  | 必填 |
| ----- | ---- |
| style | 否   |

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  containerStyle={{ marginTop: 20 }}
/>
```

---

### `decelerationRate`[⬆](#props-索引)

一个浮点数，决定手指离开后滚动视图减速的速度。也可以使用字符串快捷值 `"normal"` 和 `"fast"`，分别对应 iOS 底层 `UIScrollViewDecelerationRateNormal` 和 `UIScrollViewDecelerationRateFast`：

- normal: 0.998
- fast: 0.99（iOS webview 的默认值）

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| number | 否   | iOS  |

---

### `domStorageEnabled`[⬆](#props-索引)

布尔值，控制是否启用 DOM Storage。仅用于 Android。默认值为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `javaScriptEnabled`[⬆](#props-索引)

布尔值，启用 `WebView` 中的 JavaScript。默认值为 `true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `javaScriptCanOpenWindowsAutomatically`[⬆](#props-索引)

布尔值，指示 JavaScript 是否可以在没有用户交互的情况下打开新窗口。默认值为 `false`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `androidLayerType`[⬆](#props-索引)

指定图层类型。

可选值：

- `none`（默认）- 视图没有图层。
- `software` - 视图有一个软件图层。软件图层由位图支持，即使启用了硬件加速，也会使用 Android 的软件渲染流水线渲染视图。
- `hardware` - 视图有一个硬件图层。硬件图层由特定硬件的纹理支持，当视图层级启用了硬件加速时，会使用 Android 的硬件渲染流水线渲染。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | Android |

---

### `mixedContentMode`[⬆](#props-索引)

指定混合内容模式。即允许安全来源加载来自其他任何来源的内容。

可选值：

- `never`（默认）- WebView 不允许安全来源加载来自不安全来源的内容。
- `always` - WebView 允许安全来源加载来自任何来源的内容，即使该来源不安全。
- `compatibility` - WebView 会尝试与现代浏览器处理混合内容的方式保持兼容。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | Android |

---

### `thirdPartyCookiesEnabled`[⬆](#props-索引)

布尔值，启用 `WebView` 中的第三方 Cookie。仅在 Android Lollipop 及以上使用（在 Android KitKat 及以下和 iOS 上默认启用第三方 Cookie）。默认值为 `true`。关于 Cookie，参见[指南](Guide.chinese.md#管理-cookie)。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `userAgent`[⬆](#props-索引)

设置 `WebView` 的 user-agent。

| 类型   | 必填 | 平台               |
| ------ | ---- | ------------------ |
| string | 否   | iOS, Android, macOS |

---

### `applicationNameForUserAgent`[⬆](#props-索引)

在现有 user-agent 后追加字符串。若设置了 `userAgent`，将覆盖本项。

| 类型   | 必填 | 平台               |
| ------ | ---- | ------------------ |
| string | 否   | iOS, Android, macOS |

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  applicationNameForUserAgent={'DemoApp/1.1.0'}
/>
// 结果中的 User-Agent 类似：
// Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.021; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36 DemoApp/1.1.0
// Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DemoApp/1.1.0
```

### `allowsFullscreenVideo`[⬆](#props-索引)

布尔值，决定是否允许全屏播放视频。默认值为 `false`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `allowsInlineMediaPlayback`[⬆](#props-索引)

布尔值，决定 HTML5 视频是行内播放还是使用原生全屏控制器。默认值为 `false`。

> 注意
>
> 要使视频行内播放，除了将此属性设为 `true`，HTML 文档中的 video 元素还必须包含 `webkit-playsinline` 属性。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `allowsPictureInPictureMediaPlayback`[⬆](#props-索引)

布尔值，指示是否允许 HTML5 视频以画中画方式播放。默认值为 `false`。

> 注意
>
> 若要限制画中画播放，需要将此属性设为 `false`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `allowsAirPlayForMediaPlayback`[⬆](#props-索引)

布尔值，指示是否允许 AirPlay。默认值为 `false`。

| 类型    | 必填 | 平台        |
| ------- | ---- | ----------- |
| boolean | 否   | iOS 和 macOS |

---

### `bounces`[⬆](#props-索引)

布尔值，决定当到达内容边缘时 webview 是否会弹性回弹。默认值为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `overScrollMode`[⬆](#props-索引)

指定过度滚动模式。

可选值：

- `always`（默认）- 只要视图可滚动，就总是允许过度滚动。
- `content` - 仅当内容足够大且有意义地滚动时允许过度滚动。
- `never` - 不允许过度滚动。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | Android |

---

### `contentInset`[⬆](#props-索引)

webview 内容相对于滚动视图边缘的内边距。默认 `{top: 0, left: 0, bottom: 0, right: 0}`。

| 类型                                                               | 必填 | 平台 |
| ------------------------------------------------------------------ | ---- | ---- |
| object: {top: number, left: number, bottom: number, right: number} | 否   | iOS  |

---

### `contentInsetAdjustmentBehavior`[⬆](#props-索引)

该属性指定如何使用安全区域（safe area）内边距来修改滚动视图的内容区域。iOS 11 及之后可用。默认值为 `never`。

可选值：

- `automatic`
- `scrollableAxes`
- `never`
- `always`

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | iOS  |

---

### `contentMode`[⬆](#props-索引)

控制加载的内容类型。iOS 13 及以上可用。默认值 `recommended`，在 iPhone 和 iPad Mini 上加载移动端内容，在更大的 iPad 上加载桌面端内容。

参见 [iPad 上的桌面级浏览体验](https://developer.apple.com/videos/play/wwdc2019/203/)。

可选值：

- `recommended`
- `mobile`
- `desktop`

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | iOS  |

---

### `dataDetectorTypes`[⬆](#props-索引)

决定 web 内容中哪些类型的数据转换为可点击的 URL。默认仅检测电话号码。

可提供单个类型或类型数组。

可选值：

- `phoneNumber`
- `link`
- `address`
- `calendarEvent`
- `none`
- `all`
- `trackingNumber`
- `flightNumber`
- `lookupSuggestion`

| 类型               | 必填 | 平台 |
| ------------------ | ---- | ---- |
| string 或 string[] | 否   | iOS  |

---

### `scrollEnabled`[⬆](#props-索引)

布尔值，决定 `WebView` 中是否允许滚动。默认值为 `true`。将其设为 `false` 会在键盘遮住输入框时阻止 webview 移动文档的 body。

| 类型 | 必填 | 平台        |
| ---- | ---- | ----------- |
| bool | 否   | iOS 和 macOS |

---

### `indicatorStyle`[⬆](#props-索引)

滚动指示器的颜色风格。默认值为 `default`。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | iOS  |

---

### `nestedScrollEnabled`[⬆](#props-索引)

布尔值，决定在 Android 上将 `WebView` 放入 `ScrollView` 时是否允许滚动。默认值为 `false`。

将其设为 `true` 会阻止 `ScrollView` 在从 `WebView` 内部滚动时滚动。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `setBuiltInZoomControls`[⬆](#props-索引)

设置 WebView 是否使用其内建的缩放机制。默认值为 `true`。设为 `false` 将阻止使用捏合手势缩放。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `setDisplayZoomControls`[⬆](#props-索引)

设置当使用内建缩放机制（参见 `setBuiltInZoomControls`）时，是否显示屏幕上的缩放控件。默认值为 `false`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `directionalLockEnabled`[⬆](#props-索引)

布尔值，决定是否在特定方向上禁用滚动。默认值为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `showsHorizontalScrollIndicator`[⬆](#props-索引)

布尔值，决定是否显示水平滚动指示器。默认值为 `true`。

| 类型 | 必填 | 平台                     |
| ---- | ---- | ------------------------ |
| bool | 否   | iOS, Android, macOS     |

---

### `showsVerticalScrollIndicator`[⬆](#props-索引)

布尔值，决定是否显示垂直滚动指示器。默认值为 `true`。

| 类型 | 必填 | 平台                     |
| ---- | ---- | ------------------------ |
| bool | 否   | iOS, Android, macOS     |

---

### `geolocationEnabled`[⬆](#props-索引)

设置是否启用 `WebView` 的地理定位。默认值为 `false`。仅用于 Android。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | Android |

---

### `allowFileAccessFromFileURLs`[⬆](#props-索引)

布尔值，设置在 file scheme URL 上下文中运行的 JavaScript 是否可以访问其他 file scheme URL 的内容。默认值为 `false`。

| 类型 | 必填 | 平台                      |
| ---- | ---- | ------------------------- |
| bool | 否   | iOS, Android, macOS      |

---

### `allowUniversalAccessFromFileURLs`[⬆](#props-索引)

布尔值，设置在 file scheme URL 上下文中运行的 JavaScript 是否可以访问任何来源的内容，包括其他 file scheme URL。默认值为 `false`。

| 类型 | 必填 | 平台                      |
| ---- | ---- | ------------------------- |
| bool | 否   | iOS, Android, macOS      |

---

### `allowingReadAccessToURL`[⬆](#props-索引)

字符串值，指示 WebView 的文件可以在脚本、AJAX 请求和 CSS import 中引用哪些 URL。仅用于通过 `'file://'` URL（即 `source.uri` 为 file 协议）加载的 WebView。如果不提供，默认仅允许读取 `source.uri` 本身。

| 类型   | 必填 | 平台        |
| ------ | ---- | ----------- |
| string | 否   | iOS 和 macOS |

---

### `keyboardDisplayRequiresUserAction`[⬆](#props-索引)

如果为 `false`，web 内容可以通过代码显示键盘。默认值为 `true`。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

---

### `hideKeyboardAccessoryView`[⬆](#props-索引)

如果为 `true`，将隐藏键盘附加工具栏（< > 和 Done）。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

---

### `allowsBackForwardNavigationGestures`[⬆](#props-索引)

如果为 `true`，将启用水平滑动手势。默认值为 `false`。

| 类型    | 必填 | 平台        |
| ------- | ---- | ----------- |
| boolean | 否   | iOS 和 macOS |

---

### `incognito`[⬆](#props-索引)

在 WebView 生命周期内不存储任何数据。

| 类型    | 必填 | 平台                     |
| ------- | ---- | ------------------------ |
| boolean | 否   | iOS, Android, macOS     |

---

### `allowFileAccess`[⬆](#props-索引)

如果为 `true`，允许通过 `file://` URI 访问文件系统。默认值为 `false`。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | Android |

---

### `saveFormDataDisabled`[⬆](#props-索引)

设置 WebView 是否禁用保存表单数据。默认值为 `false`。自 Android API 级别 26 起，此属性无效，因为有自动填充功能会存储表单数据。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | Android |

---

### `cacheEnabled`[⬆](#props-索引)

设置 WebView 是否使用浏览器缓存。

| 类型    | 必填 | 默认 | 平台                     |
| ------- | ---- | ---- | ------------------------ |
| boolean | 否   | true | iOS, Android, macOS     |

---

### `cacheMode`[⬆](#props-索引)

覆盖缓存的使用方式。默认情况下，普通页面加载会检查缓存并按需重新验证；后退导航时不会重新验证，而是直接从缓存读取。本属性允许客户端覆盖此行为。

可选值：

- `LOAD_DEFAULT` - 默认缓存模式。若导航类型未指定特定行为，则在缓存可用且未过期时使用缓存，否则从网络加载。
- `LOAD_CACHE_ELSE_NETWORK` - 在缓存可用时使用缓存，即使已过期；否则从网络加载。
- `LOAD_NO_CACHE` - 不使用缓存，直接从网络加载。
- `LOAD_CACHE_ONLY` - 不使用网络，仅从缓存加载。

| 类型   | 必填 | 默认        | 平台 |
| ------ | ---- | ----------- | ---- |
| string | 否   | LOAD_DEFAULT | Android |

---

### `pagingEnabled`[⬆](#props-索引)

如果该值为 `true`，当用户滚动时，滚动视图会停在其边界的整数倍位置。默认值为 `false`。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

---

### `allowsLinkPreview`[⬆](#props-索引)

布尔值，决定按下链接时是否显示目标预览。在支持 3D Touch 的设备上可用。iOS 10 及之后默认值为 `true`；之前版本默认 `false`。

| 类型    | 必填 | 平台        |
| ------- | ---- | ----------- |
| boolean | 否   | iOS 和 macOS |

---

### `sharedCookiesEnabled`[⬆](#props-索引)

若为 `true`，则每次 WebView 加载请求都使用 `[NSHTTPCookieStorage sharedHTTPCookieStorage]` 的共享 Cookie。默认值为 `false`。关于 Cookie，参见[指南](Guide.chinese.md#管理-cookie)。

| 类型    | 必填 | 平台        |
| ------- | ---- | ----------- |
| boolean | 否   | iOS 和 macOS |

---

### `textZoom`[⬆](#props-索引)

如果用户在 Android 系统中设置了自定义字体大小，WebView 中可能出现不期望的界面缩放。

当设置标准 `textZoom`（100）时，该不期望效果会消失。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| number | 否   | Android |

示例：

```jsx
<WebView textZoom={100} />
```

---

### `pullToRefreshEnabled`[⬆](#props-索引)

布尔值，决定 `WebView` 中是否启用下拉刷新手势。默认值为 `false`。如果设为 `true`，会自动将 `bounces` 设为 `true`。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

### `refreshControlLightMode`[⬆](#props-索引)

（仅 iOS）
布尔值，决定刷新控件的颜色是否为白色。默认 `false`，表示使用默认颜色。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

### `ignoreSilentHardwareSwitch`[⬆](#props-索引)

（仅 iOS）

当设为 `true` 时忽略硬件静音开关。默认：`false`。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

### `onFileDownload`[⬆](#props-索引)
仅 iOS。

当需要下载文件时调用的函数。

iOS 13+：如果 webview 导航到一个 URL 并返回 `Content-Disposition: attachment...` 的响应头，则会调用此回调。

iOS 8+：如果 MIME 类型表明内容无法被 webview 渲染，也会调用此回调。在 iOS 13 之前，这是触发该函数的唯一情况。

应用需要自行实现实际的下载逻辑。

如果不提供该回调，默认行为是让 webview 尝试渲染该文件。

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onFileDownload={({ nativeEvent: { downloadUrl } }) => {
    // 使用字符串 downloadUrl 以你想要的方式下载文件。
  }}
/>
```

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `limitsNavigationsToAppBoundDomains`[⬆](#props-索引)

若为 `true`，告知 WebKit 此 WKWebView 只会导航到应用绑定的域。仅适用于 iOS 14 或更高。

一旦设置，任何尝试导航到非绑定域都会失败并报错 “App-bound domain failure.”。
应用可以在 Info.plist 中通过 `WKAppBoundDomains` 指定最多 10 个“应用绑定”域。更多信息参见 [App-Bound Domains](https://webkit.org/blog/10882/app-bound-domains/)。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

示例：

```jsx
<WebView limitsNavigationsToAppBoundDomains={true} />
```

---

### `textInteractionEnabled`[⬆](#props-索引)

若为 `false`，告知 WebKit 该 WKWebView 不与文本交互，因此不会显示文本选择放大镜。仅适用于 iOS 14.5 或更高。

默认 `true`。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

示例：

```jsx
<WebView textInteractionEnabled={false} />
```

---

### `suppressMenuItems`[⬆](#props-索引)

允许从默认上下文菜单中移除指定菜单项。

可选值：

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

| 类型             | 必填 | 默认 | 平台 |
| ---------------- | ---- | ---- | ---- |
| 字符串数组       | 否   | []   | iOS  |

### `mediaCapturePermissionGrantType`[⬆](#props-索引)

指定如何处理媒体采集权限请求。默认 `prompt`，会反复提示用户。iOS 15 及以上可用。

可选值：

- `grantIfSameHostElsePrompt`：如果权限请求的安全来源（security origin）的 host 与 WebView 当前 URL 的 host 相同，且之前已授权，则直接授予；否则提示用户。
- `grantIfSameHostElseDeny`：若 host 相同且之前已授权，则直接授予；否则拒绝。
- `deny`
- `grant`：若之前已授予，则直接授予。
- `prompt`

注意，即使是“授予”，在某些情况下仍可能出现提示，例如用户此前从未被提示过该权限。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | iOS  |

示例：

```jsx
<WebView mediaCapturePermissionGrantType={'grantIfSameHostElsePrompt'} />
```

---

### `autoManageStatusBarEnabled`[⬆](#props-索引)

若设为 `true`，WebView 将自动隐藏/显示状态栏（例如观看全屏视频时）。若为 `false`，WebView 将不会管理状态栏。默认 `true`。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | iOS  |

示例：

```jsx
<WebView autoManageStatusBarEnabled={false} />
```

### `setSupportMultipleWindows`[⬆](#props-索引)

设置 WebView 是否支持多窗口。更多信息参见[Android 文档]('https://developer.android.com/reference/android/webkit/WebSettings#setSupportMultipleWindows(boolean)')。
将其设为 `false` 可能会使应用暴露于此[漏洞](https://alesandroortiz.com/articles/uxss-android-webview-cve-2020-6506/)，允许恶意 iframe 逃逸到顶层 DOM。

| 类型    | 必填 | 默认 | 平台 |
| ------- | ---- | ---- | ---- |
| boolean | 否   | true | Android |

示例：

```javascript
<WebView setSupportMultipleWindows={false} />
```

### `enableApplePay`[⬆](#props-索引)

布尔值，设为 `true` 时，WebView 将具备 Apple Pay 支持。设置后，网站可以从 React Native WebView 中调用 Apple Pay。
需要注意，启用后会导致一些功能不可用，比如 [`injectJavaScript`](Reference.chinese.md#injectjavascriptstr)、HTML5 History、[`sharedCookiesEnabled`](Reference.chinese.md#sharedCookiesEnabled)、[`injectedJavaScript`](Reference.chinese.md#injectedjavascript)、[`injectedJavaScriptBeforeContentLoaded`](Reference.chinese.md#injectedjavascriptbeforecontentloaded)。参见 [Apple Pay 发布说明](https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes#Payment-Request-API)。

如果需要向 App 发送消息，网页必须显式调用 webkit message handler，并在 React Native 端的 `onMessage` 处理：
```javascript
window.webkit.messageHandlers.ReactNativeWebView.postMessage("hello apple pay")
```

| 类型    | 必填 | 默认 | 平台 |
| ------- | ---- | ---- | ---- |
| boolean | 否   | false | iOS  |

示例：

```javascript
<WebView enableApplePay={true} />
```

### `forceDarkOn`[⬆](#props-索引)

暗色主题配置

注意：强制暗色设置不是持久的。每次应用进程启动时都必须调用该静态方法。

注意：从日间<->夜间模式切换属于配置更改，默认会重启 Activity 并应用主题。若自定义了此行为，请确保在更改发生时仍然调用该方法。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | Android |

示例：

```javascript
<WebView forceDarkOn={false} />
```

### `menuItems`[⬆](#props-索引)

一个自定义菜单项对象数组，将在选择文本时显示。传空数组将隐藏菜单。与 `onCustomMenuSelection` 搭配使用。

| 类型                                               | 必填 | 平台             |
| -------------------------------------------------- | ---- | ---------------- |
| 对象数组：{label: string, key: string}             | 否   | iOS, Android     |

示例：

```jsx
<WebView menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Save for later', key: 'saveForLater' }]} />
```

### `onCustomMenuSelection`[⬆](#props-索引)

选择自定义菜单项时调用的函数。会收到一个原生事件，其中包含三个自定义键：`label`、`key` 和 `selectedText`。

| 类型     | 必填 | 平台         |
| -------- | ---- | ------------ |
| function | 否   | iOS, Android |

```jsx
<WebView
  menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Save for later', key: 'saveForLater' }]}
  onCustomMenuSelection={(webViewEvent) => {
    const { label } = webViewEvent.nativeEvent; // 菜单项名称，如 'Tweet'
    const { key } = webViewEvent.nativeEvent; // 菜单项 key，如 'tweet'
    const { selectedText } = webViewEvent.nativeEvent; // 选中的文本
  }}
/>
```

### `basicAuthCredential`[⬆](#props-索引)

一个对象，用于指定基本认证（Basic Auth）所使用的用户凭据。

- `username` (string) - 用户名。
- `password` (string) - 密码。

| 类型   | 必填 |
| ------ | ---- |
| object | 否   |

### `useWebView2`[⬆](#props-索引)

在 Windows 上使用 WinUI WebView2 控件替代旧的 WebView 作为原生 webview。WebView2 使用 Microsoft Edge（Chromium）渲染引擎。该选项支持在运行时切换，且支持 Fast Refresh。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | Windows |

示例：

```jsx
<WebView useWebView2={true} />
```

### `minimumFontSize`[⬆](#props-索引)

Android 会基于此值强制最小字体大小。取值为 1 到 72 的非负整数，超出范围的值将被钉住到边界。默认值为 8。如果你使用了更小的字体并且难以将整个窗口内容放到单个屏幕，可尝试设为更小的值。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| number | 否   | Android |

示例：

```jsx
<WebView minimumFontSize={1} />
```

### `downloadingMessage`[⬆](#props-索引)

通过 WebView 下载文件时在 Toast 中显示的消息。默认消息为 "Downloading"。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | Android |

### `lackPermissionToDownloadMessage`[⬆](#props-索引)

当 webview 无法下载文件时在 Toast 中显示的消息。默认消息为 "Cannot download files as permission was denied. Please provide permission to write to storage, in order to download files."。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | Android |

### `allowsProtectedMedia`[⬆](#props-索引)

是否允许 WebView 播放受 DRM 保护的媒体。默认 `false`。
⚠️ 将其设为 `false` 不会撤销已授予当前网页的权限。若需撤销，需要同时重新加载页面。⚠️

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | Android |

### `fraudulentWebsiteWarningEnabled`[⬆](#props-索引)

布尔值，指示 webview 是否显示可疑欺诈内容（如恶意软件或钓鱼尝试）的警告。默认 `true`。（iOS 13+）

| 类型    | 必填 | 默认 | 平台 |
| ------- | ---- | ---- | ---- |
| boolean | 否   | true | iOS  |

### `webviewDebuggingEnabled`[⬆](#props-索引)

是否允许通过 Safari / Chrome 远程调试 webview。默认 `false`。iOS 从 16.4 开始支持，之前版本总是默认允许调试。

| 类型    | 必填 | 平台        |
| ------- | ---- | ----------- |
| boolean | 否   | iOS 与 Android |

### `paymentRequestEnabled`[⬆](#props-索引)

是否启用 Payment Request API。默认 `false`。这对在 WebView 中使用 Google Pay 是必须的。

| 类型    | 必填 | 平台 |
| ------- | ---- | ---- |
| boolean | 否   | Android |

## 方法

### `goForward()`[⬆](#方法索引)

```javascript
goForward();
```

在 webview 的历史记录中前进一页。

### `goBack()`[⬆](#方法索引)

```javascript
goBack();
```

在 webview 的历史记录中后退一页。

### `reload()`[⬆](#方法索引)

```javascript
reload();
```

重新加载当前页面。

### `stopLoading()`[⬆](#方法索引)

```javascript
stopLoading();
```

停止加载当前页面。

### `injectJavaScript(str)`[⬆](#方法索引)

```javascript
injectJavaScript('... javascript string ...');
```

执行该 JavaScript 字符串。

想了解更多，请阅读[JS 与原生通信](Guide.chinese.md#在-js-与原生之间通信)指南。

### `requestFocus()`[⬆](#方法索引)

```javascript
requestFocus();
```

请求 webview 获取焦点。（开发 TV 应用的同学可能会用到）

### `postMessage(str)`[⬆](#方法索引)

```javascript
postMessage('message');
```

向 WebView 发送一条消息，由 [`onMessage`](Reference.chinese.md#onmessage) 处理。

### `clearFormData()`[⬆](#方法索引)

（仅 Android）

```javascript
clearFormData();
```

从当前获得焦点的表单字段中移除自动完成弹出（如果存在）。[developer.android.com 参考](<https://developer.android.com/reference/android/webkit/WebView.html#clearFormData()>)

### `clearCache(bool)`[⬆](#方法索引)

```javascript
clearCache(true);
```

清除资源缓存。注意缓存是“按应用”存储的，因此这会清除应用中所有 WebView 的缓存。[developer.android.com 参考](<https://developer.android.com/reference/android/webkit/WebView.html#clearCache(boolean)>)

iOS 上，includeDiskFiles 还会移除 Web 存储和数据库中的数据。[developer.apple.com 参考](https://developer.apple.com/documentation/webkit/wkwebsitedatastore/1532936-removedata)

在 Windows 上，该方法被设置为清除 Cookie，因为 WebView2 无法清除缓存（它与 Edge 共享）。我们只能清除 Cookie，无法访问历史记录或本地存储。

### `clearHistory()`[⬆](#方法索引)

（仅 Android）

```javascript
clearHistory();
```

清除该 WebView 的内部前进/后退列表。[developer.android.com 参考](<https://developer.android.com/reference/android/webkit/WebView.html#clearHistory()>)

## 其他文档

另请查看我们的[入门指南](Getting-Started.chinese.md)与[深度指南](Guide.chinese.md)。

## 翻译

本文件提供以下语言版本：

- [巴西葡萄牙语](Reference.portuguese.md)
- [意大利语](Reference.italian.md)
- [中文](Reference.chinese.md)
