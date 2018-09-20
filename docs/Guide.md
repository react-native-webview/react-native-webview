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

