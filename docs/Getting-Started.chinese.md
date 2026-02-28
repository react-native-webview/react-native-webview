# React Native WebView 入门指南

以下为使用 React Native WebView 的快速入门步骤。

## 1. 将 react-native-webview 添加到依赖中

```
$ yarn add react-native-webview
```

(或使用 npm)

```
$ npm install --save react-native-webview
```

## 2. 关联原生依赖

自 react-native 0.60 起，autolinking 会自动处理关联步骤，但别忘了运行 `pod install`。

包含 Objective-C、Swift、Java 或 Kotlin 原生代码的 React Native 模块需要被 "linked"，以便编译器在构建应用时包含它们。

```
$ react-native link react-native-webview
```

注意：如果你需要卸载 React Native WebView，运行 `react-native unlink react-native-webview` 即可解除关联。

### iOS & macOS：

如果使用 CocoaPods，在 `ios/` 或 `macos/` 目录下运行：

```
$ pod install
```

虽然可以使用 react-native 提供的手动链接方式，但我们更推荐使用 CocoaPods。

### Android：

Android - react-native-webview 版本 <6：
该模块在运行 link 命令后不需要额外步骤。

Android - react-native-webview 版本 >=6.X.X：
请确保在项目中启用了 AndroidX，在 `android/gradle.properties` 中添加以下两行：

```
android.useAndroidX=true
android.enableJetifier=true
```

如需手动安装 Android 版本，请参考相关教程。

### Windows：

对于 React Native Windows >= 0.63，autolinking 支持。如果你的 RNW 版本不支持 autolinking，请手动在工程中添加相关引用（包括在解决方案中添加 ReactNativeWebView 项目、在主工程中添加引用、修改 pch.h 和 app.cpp 等）。

## 3. WebView2 支持
WebView2 控件是一个 WinUI 控件，使用 Microsoft Edge (Chromium) 渲染引擎。从 v11.18.0 开始支持 WebView2。

如果你的应用使用 RNW v0.68 或更高版本：

  i. 让 autolinking 处理将 `ReactNativeWebView` 项目添加到应用中。

  ii. 自定义应用的 WinUI 版本至 2.8.0-prerelease.210927001 或更高。

  iii. 可能需要在 `packages.config` 中指定 `Microsoft.Web.WebView2` 包。

然后你就可以通过 `useWebView2` prop 在 JS 中使用 WinUI WebView2 控件。

## 4. 在组件中导入 webview

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
```

内联 HTML 最小示例：

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
      />
    );
  }
}
```

接下来，查看 [API Reference](Reference.chinese.md) 或 [In-Depth Guide](Guide.chinese.md)。

## 翻译

此文件提供以下翻译版本：
- [巴西葡萄牙语](Getting-Started.portuguese.md)
- [意大利语](Getting-Started.italian.md)
