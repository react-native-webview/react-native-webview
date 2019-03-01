# React Native WebView Guide

This document walks you through the most common use cases for React Native WebView. It doesn't cover [the full API](Reference.md), but after reading it and looking at the sample code snippets you should have a good sense for how the WebView works and common patterns for using the WebView.

_This guide is currently a work in progress._

## Guide Index

- [Basic Inline HTML](Guide.md#basic-inline-html)
- [Basic URL Source](Guide.md#basic-url-source)

### Basic inline HTML

The simplest way to use the WebView is to simply pipe in the HTML you want to display. Note that setting an `html` source requires the [originWhiteList](Reference.md#originWhiteList) property to be set to `['*']`.

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

Passing a new static html source will cause the WebView to rerender.

### Basic URL Source

This is the most common use-case for WebView.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://facebook.github.io/react-native/'}}
      />
    );
  }
}
```

### Controlling navigation state changes

Sometimes you want to intercept a user tapping on a link in your webview and do something different than navigating there in the webview. Here's some example code on how you might do that using the `onNavigationStateChange` function.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  webview = null;

  render() {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{uri: 'https://facebook.github.io/react-native/'}}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  handleWebViewNavigationStateChange = newNavState => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return

    // handle certain doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      const newURL = 'https://facebook.github.io/react-native/';
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  }
}
```

### Add support for File Upload

##### iOS

For iOS, all you need to do is specify the permissions in your `ios/[project]/Info.plist` file:

Photo capture:
```
<key>NSCameraUsageDescription</key>
<string>Take pictures for certain activities</string>
```

Gallery selection:
```
<key>NSPhotoLibraryUsageDescription</key>
<string>Select pictures for certain activities</string>
```

Video recording:
```
<key>NSMicrophoneUsageDescription</key>
<string>Need microphone access for recording videos</string>
```

##### Android

Add permission in AndroidManifest.xml:
```xml
<manifest ...>
  ......

  <!-- this is required only for Android 4.1-5.1 (api 16-22)  -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

##### Check for File Upload support, with `static isFileUploadSupported()`

File Upload using `<input type="file" />` is not supported for Android 4.4 KitKat (see [details](https://github.com/delight-im/Android-AdvancedWebView/issues/4#issuecomment-70372146)):

```
import { WebView } from "react-native-webview";

WebView.isFileUploadSupported().then(res => {
  if (res === true) {
    // file upload is supported
  } else {
    // not file upload support
  }
});

```

### Add support for File Download

##### iOS

For iOS, all you need to do is specify the permissions in your `ios/[project]/Info.plist` file:

Save to gallery:
```
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Save pictures for certain activities.</string>
```

##### Android

Add permission in AndroidManifest.xml:
```xml
<manifest ...>
  ......

  <!-- this is required to save files on Android  -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```
