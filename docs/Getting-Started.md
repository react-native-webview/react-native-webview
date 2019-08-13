# React Native WebView Getting Started Guide

Here's how to get started quickly with the React Native WebView.

#### 1. Add react-native-webview to your dependencies

```
$ yarn add react-native-webview
```
 (or)
 
 For npm use
```
$ npm install --save react-native-webview
```

#### 2. Link native dependencies

From react-native 0.60 autolinking will take care of the link step but don't forget to run `pod install`

React Native modules that include native Objective-C, Swift, Java, or Kotlin code have to be "linked" so that the compiler knows to include them in the app.

```
$ react-native link react-native-webview
```

iOS:

If using cocoapods in the `ios/` directory run
```
$ pod install
```

Android - react-native-webview version <6:
This module does not require any extra step after running the link command 🎉

Android - react-native-webview version >=6.X.X:
Please make sure AndroidX is enabled in your project by editting `android/gradle.properties` and adding 2 lines:

```
android.useAndroidX=true
android.enableJetifier=true
```

For Android manual installation, please refer to [this article](https://engineering.brigad.co/demystifying-react-native-modules-linking-964399ec731b) where you can find detailed step on how to link any react-native project.

For iOS, while you can manually link the old way using [react-native own tutorial](https://facebook.github.io/react-native/docs/linking-libraries-ios), we find it easier to use cocoapods.
If you wish to use cocoapods and haven't set it up yet, please instead refer to [that article](https://engineering.brigad.co/demystifying-react-native-modules-linking-ae6c017a6b4a).

_NOTE: If you ever need to uninstall React Native WebView, run `react-native unlink react-native-webview` to unlink it._

#### 3. Import the webview into your component

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
