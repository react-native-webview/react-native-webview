# React Native WebView Getting Started Guide

Here's how to get started quickly with the React Native WebView.

## 1. Add react-native-webview to your dependencies

```
$ yarn add react-native-webview
```

(or)

For npm use

```
$ npm install --save react-native-webview
```

## 2. Link native dependencies

From react-native 0.60 autolinking will take care of the link step but don't forget to run `pod install`

React Native modules that include native Objective-C, Swift, Java, or Kotlin code have to be "linked" so that the compiler knows to include them in the app.

```
$ react-native link react-native-webview
```

_NOTE: If you ever need to uninstall React Native WebView, run `react-native unlink react-native-webview` to unlink it._

### iOS & macOS:

If using CocoaPods, in the `ios/` or `macos/` directory run:

```
$ pod install
```

While you can manually link the old way using [react-native own tutorial](https://reactnative.dev/docs/linking-libraries-ios), we find it easier to use CocoaPods.
If you wish to use CocoaPods and haven't set it up yet, please instead refer to [that article](https://engineering.brigad.co/demystifying-react-native-modules-linking-ae6c017a6b4a).

### Android:

Android - react-native-webview version <6:
This module does not require any extra step after running the link command 🎉

Android - react-native-webview version >=6.X.X:
Please make sure AndroidX is enabled in your project by editting `android/gradle.properties` and adding 2 lines:

```
android.useAndroidX=true
android.enableJetifier=true
```

For Android manual installation, please refer to [this article](https://engineering.brigad.co/demystifying-react-native-modules-linking-964399ec731b) where you can find detailed step on how to link any react-native project.

### Windows:

Autolinking is supported for React Native Windows v0.63 and higher. If your app uses a React Native Windows version that does not have autolinking support, make the following additions to the given files manually:

#### **windows/myapp.sln**

Add the `ReactNativeWebView` project to your solution.

1. Open the solution in Visual Studio 2019
2. Right-click Solution icon in Solution Explorer > Add > Existing Project
   Select `node_modules\react-native-webview\windows\ReactNativeWebView\ReactNativeWebView.vcxproj`

#### **windows/myapp/myapp.vcxproj**

Add a reference to `ReactNativeWebView` to your main application project. From Visual Studio 2019:

1. Right-click main application project > Add > Reference...
   Check `ReactNativeWebView` from Solution Projects.

2. Modify files below to add the package providers to your main application project

#### **pch.h**

Add `#include "winrt/ReactNativeWebView.h"`.

#### **app.cpp**

Add `PackageProviders().Append(winrt::ReactNativeWebView::ReactPackageProvider());` before `InitializeComponent();`.

Note if you want to enable scroll with Touch for the WebView component you must disable perspective for your app using [ReactRootView.IsPerspectiveEnabled](https://microsoft.github.io/react-native-windows/docs/ReactRootView#isperspectiveenabled).

## 3. WebView2 Support
The WebView2 control is a [WinUI](https://docs.microsoft.com/windows/apps/winui/) control that renders web content using the Microsoft Edge (Chromium) rendering engine. We have added support for the WebView2 control to the react-native-webview community module in v11.18.0.
If your app is RNW v0.68 or higher, follow these steps:

  i. Let autolinking handle adding the `ReactNativeWebView` project to your app.

  iii. Customize your app's WinUI 2.x version to version 2.8.0-prerelease.210927001 or higher. See [here](https://microsoft.github.io/react-native-windows/docs/customizing-sdk-versions) for instructions. The WinUI 2.x support for WebView2 is not yet available in "stable" releases, so for now you will need to use a prerelease version.
  
  iv. You may need to specify the `Microsoft.Web.WebView2` package in your app's `packages.config` file. If this is needed, you will get a build error listing the version of the package that you needed to specify. Simply add the package to your `packages.config`, and you should be good to go.

Now you can access the WinUI WebView2 control from your app's JavaScript via the `useWebView2` prop.

## 4. Import the webview into your component

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

Minimal example with inline HTML:

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

Next, check out the [API Reference](Reference.md) or [In-Depth Guide](Guide.md).

## Translations

This file is available at:

- [Brazilian portuguese](Getting-Started.portuguese.md)