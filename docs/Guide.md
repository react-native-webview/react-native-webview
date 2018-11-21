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
        source={{uri: 'https://infinite.red/react-native'}}
      />
    );
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

