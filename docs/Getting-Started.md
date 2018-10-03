# React Native WebView Getting Started Guide

Here's how to get started quickly with the React Native WebView.

#### 1. Add react-native-webview to your dependencies

```
$ npm install --save https://github.com/react-native-community/react-native-webview
```

#### 2. Link native dependencies

React Native modules that include native Objective-C, Swift, Java, or Kotlin code have to be "linked" so that the compiler knows to include them in the app.

Thankfully, there's a way to do this from the terminal with one command:

```
$ react-native link react-native-webview
```

_NOTE: If you ever need to uninstall React Native WebView, run `react-native unlink react-native-webview` to unlink it._

#### 3. Add support for File Upload

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

Add file provider path resource `file_provider_paths.xml` in `[your project]/android/app/src/main/res/xml/` folder. If the folder does not exist, create a new one.

NOTE: this is a requirement for sdk 26

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <external-path name="shared" path="." />
</paths>
```

Add permissions & configure file provider in AndroidManifest.xml:
```xml
<manifest ...>
  ......

  <uses-permission android:name="android.permission.CAMERA" />

  <application ...>
    ......

    <provider
      android:name="android.support.v4.content.FileProvider"
      android:authorities="${applicationId}.fileprovider"
      android:exported="false"
      android:grantUriPermissions="true">
      <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_provider_paths" />
    </provider>

  </application>
</manifest>
```

##### Check for File Upload support, with `static isFileUploadSupported()`

File Upload using `<input type="file" />` is not supported for Android versions lower than 5 (Lollipop):

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

#### 4. Import the webview into your component

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://infinite.red'}}
        style={{marginTop: 20}}
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
