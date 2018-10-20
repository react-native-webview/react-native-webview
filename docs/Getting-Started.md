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

#### 3. Import the webview into your component

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
