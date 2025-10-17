# React Native WebView 指南

本文档介绍了 React Native WebView 的常见用例。它没有覆盖完整的 [API](Reference.md)，但阅读后并结合示例代码，你应该能掌握 WebView 的工作方式和常用模式。

_该指南仍在持续完善中。_

## 指南索引

- [内联 HTML 基本用法](#基本内联-html)
- [URL 源基本用法](#基本-url-源)
- [加载本地 HTML 文件](#加载本地-html-文件)
- [控制导航状态变化](#控制导航状态变化)
- [添加文件上传支持](#添加文件上传支持)
- [多文件上传](#多文件上传)
- [添加文件下载支持](#添加文件下载支持)
- [在 JS 与原生之间通信](#在-js-与原生之间通信)
- [自定义 header、session 与 cookie](#自定义-headersession-与-cookie)
- [页面导航手势与按钮支持](#页面导航手势与按钮支持)

### 基本内联 HTML

最简单的使用方式是直接传入要展示的 HTML。注意：设置 `html` 源需要将 [originWhiteList](Reference.md#originWhiteList) 属性设置为 `['*']`。

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>This is a static HTML source!</h1>' }}
      />
    );
  }
}
```

传入新的静态 HTML 源会导致 WebView 重新渲染。

### 基本 URL 源

这是 WebView 最常见的用法。

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
  }
}
```

### 加载本地 HTML 文件

注意：如在 issue #428 和 #518 中讨论，这在当前不是完全可行。可行的替代方案包括使用 webpack 将所有资源打包，或运行一个本地 webserver。

<details><summary>显示不可用方法</summary>

有时你会把 HTML 文件打包到应用内并希望在 WebView 中加载。在 iOS 和 Windows 上，你可以像导入其他资源一样导入 html 文件：

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

const myHtmlFile = require('./my-asset-folder/local-site.html');

class MyWeb extends Component {
  render() {
    return <WebView source={myHtmlFile} />;
  }
}
```

但在 Android 上，你需要将 HTML 文件放到 android 项目的资产目录，例如 `android/app/src/main/assets/`，然后使用如下方式加载：

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView source={{ uri: 'file:///android_asset/local-site.html' }} />
    );
  }
}
```

</details>

### 控制导航状态变化

有时你可能想拦截用户点击 webview 中的链接并做不同处理，而不是在 webview 中导航。下面演示如何使用 `onNavigationStateChange`：

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  webview = null;

  render() {
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{ uri: 'https://reactnative.dev/' }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // 打开 PDF 查看器等
    }

    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // 例如关闭视图
    }

    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    if (url.includes('google.com')) {
      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
}
```

### 添加文件上传支持

##### iOS

对于 iOS，只需在 `ios/[project]/Info.plist` 中声明权限：

照片拍摄：

```
<key>NSCameraUsageDescription</key>
<string>Take pictures for certain activities</string>
```

图库选择：

```
<key>NSPhotoLibraryUsageDescription</key>
<string>Select pictures for certain activities</string>
```

录像：

```
<key>NSMicrophoneUsageDescription</key>
<string>Need microphone access for recording videos</string>
```

##### Android

在 AndroidManifest.xml 中添加权限：

```xml
<manifest ...>
  ......

  <!-- this is required only for Android 4.1-5.1 (api 16-22)  -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

###### Android 上摄像头作为上传选项

当文件输入指示需要图片或视频（使用 `accept` 属性）时，WebView 会尝试为用户提供使用相机拍照/录像的选项。

如果 `capture` 指定了前/后摄像头，有些 Android 设备需要在 AndroidManifest.xml 中添加 `queries`：
```xml
<queries>
    <intent>
        <action android:name="android.media.action.IMAGE_CAPTURE" />
    </intent>
</queries>
```

注意：部分 Android 版本在没有声明 camera 权限时无法触发相机 intent，因此在必要时需在运行时请求权限。

##### 检查文件上传支持

```jsx
import { WebView } from "react-native-webview";

WebView.isFileUploadSupported().then(res => {
  if (res === true) {
    // 支持
  } else {
    // 不支持
  }
});

```

##### MacOS

在 `Signing & Capabilities` 中的 `App Sandbox` 下为 `User Selected File` 添加读取权限：

注意：如果没有此权限，尝试打开文件输入会导致 webview 崩溃。

### 多文件上传

通过在 `<input>` 元素上使用 `multiple` 属性来控制单选或多选：

```
<input type="file" multiple />

<input type="file" />
```

### 添加文件下载支持

##### iOS

在 iOS 上，你需要提供自己的下载实现。可以为 WebView 提供 `onFileDownload` 回调。当 RNCWebView 确认需要下载文件时，会把下载 URL 传给 `onFileDownload`，你可以在回调中自行下载。

注意：iOS 13+ 支持更好的下载体验（可读取 HTTP 响应头判断是否是附件）。在 iOS 12 及更早版本，只有在 MIME 类型不可被 webview 渲染时才会触发 `onFileDownload`。

示例：

```javascript
onFileDownload = ({ nativeEvent }) => {
  const { downloadUrl } = nativeEvent;
  // 在此执行下载逻辑
};
```

如果需要将图片保存到相册，需在 Info.plist 中声明：

```
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Save pictures for certain activities.</string>
```

##### Android

Android 内置与 DownloadManager 的集成。在 AndroidManifest.xml 中添加权限（仅当支持 Android 10 以下版本时需要）：

```xml
<manifest ...>
  ......

  <!-- this is required to save files on Android versions lower than 10 -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

### 在 JS 与原生之间通信

通常你会想向 webview 中加载的页面发送消息，或从页面接收消息。React Native WebView 提供三种方式：

1. React Native -> Web：`injectedJavaScript` prop
2. React Native -> Web：`injectJavaScript` 方法
3. Web -> React Native：`postMessage` 方法与 `onMessage` prop

#### `injectedJavaScript` prop

该脚本在页面首次加载完成后执行，仅执行一次（即便页面重新加载或导航也不会再次执行）。确保脚本返回一个有效值（例如 `true`），并设置 `onMessage`（即便是空实现），否则代码不会运行。

示例：

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

_实现细节_

在 iOS 上，`injectedJavaScript` 使用 `WKUserScript` 注入并在 document end 时执行；因此不再返回评估值或在控制台记录警告。在 Android 上，使用 `evaluateJavascriptWithFallback`。

#### `injectedJavaScriptBeforeContentLoaded` prop

该脚本在文档元素创建后、其他子资源加载前执行，只会运行一次。对于某些场景很有用（例如在页面脚本运行前设置 window 或 localStorage）。

示例：

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

> 警告：在 Android 上可能不够可靠，考虑使用 `injectedJavaScriptObject`。

#### `injectedJavaScriptObject` prop

为页面在加载前注入一个 JS 对象（以 JSON 形式提供），比 `injectedJavaScript` 在某些平台更可靠。页面可通过 `window.ReactNativeWebView.injectedObjectJson()` 获取该 JSON 字符串并解析。

示例：

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  injectedJavaScriptObject={{ customValue: 'myCustomValue' }}
/>;
```

页面使用示例：

```html
<html>
  <head>
    <script>
      window.onload = (event) => {
        if (window.ReactNativeWebView.injectedObjectJson()) {
          document.getElementById('output').innerHTML = JSON.parse(window.ReactNativeWebView.injectedObjectJson()).customValue;
        }
      }
    </script>
  </head>
  <body>
    <p id="output">undefined</p>
  </body>
</html>
```

#### `injectJavaScript` 方法

注入脚本只会运行一次，这是 `injectedJavaScript` 的缺点。为此提供了 `injectJavaScript` 方法，可在任意时刻通过 webview 引用执行 JS。

示例：

```jsx
const run = `
  document.body.style.backgroundColor = 'blue';
  true;
`;

setTimeout(() => {
  this.webref.injectJavaScript(run);
}, 3000);
```

#### `window.ReactNativeWebView.postMessage` 与 `onMessage`

要从网页向 React Native 发送消息，请在页面中调用 `window.ReactNativeWebView.postMessage(string)`；同时必须在 WebView 上设置 `onMessage`，否则该方法不会被注入。

示例：

```jsx
const html = `
  <html>
  <head></head>
  <body>
    <script>
      setTimeout(function () {
        window.ReactNativeWebView.postMessage("Hello!")
      }, 2000)
    </script>
  </body>
  </html>
`;

<WebView
  source={{ html }}
  onMessage={(event) => {
    alert(event.nativeEvent.data);
  }}
/>;
```

### 自定义 header、session 与 cookie

#### 设置自定义 header

```jsx
<WebView
  source={{
    uri: 'http://example.com',
    headers: {
      'my-custom-header-key': 'my-custom-header-value',
    },
  }}
/>
```

这只会在第一次加载时设置 header，后续导航不会自动带上这些 header。可通过拦截导航并手动处理来实现每次请求带上头部的需求。

#### 管理 Cookie

可以使用 `@react-native-cookies/cookies` 包在 RN 端设置 Cookie，配合 `sharedCookiesEnabled` 使用可以共享 Cookie。

如果在 WebView 内直接发送自定义 cookie，可在 headers 中使用 `Cookie` 字段，但这仅在首次请求生效，需配合上文所述的技术实现持续生效。

### 页面导航手势与按钮支持

可在 iOS 上启用 `allowsBackForwardNavigationGestures` 支持前进/后退滑动手势。在 Android 上，可以使用 `BackHandler.addEventListener` 钩子调用 WebView 的 `goBack` 来响应硬件返回按钮。

示例（函数式组件，使用 Hook）：

```jsx
const [canGoBack, setCanGoBack] = useState(false);
const webViewRef = useRef(null);
const onAndroidBackPress = useCallback(() => {
  if (canGoBack) {
    webViewRef.current?.goBack();
    return true;
  }
  return false;
}, [canGoBack]);

useEffect(() => {
  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }
}, [onAndroidBackPress]);
```

并在 WebView 上使用：

```jsx
<WebView
  ref={webViewRef}
  onLoadProgress={event => {
    setCanGoBack(event.nativeEvent.canGoBack);
  }}
/>
```

### 硬件静音开关

在 iOS 与 Android 之间、以及内置 audio 与 video 元素之间，对于硬件静音开关的处理存在不一致性。iOS 下 audio 会被静音（除非设置 `ignoreSilentHardwareSwitch` 为 true），video 总是忽略静音开关。

## 翻译

此文件提供以下翻译版本：

- 巴西葡萄牙语
- 意大利语
