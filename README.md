# React Native WebView - a Modern, Cross-Platform WebView for React Native

**React Native WebView** is a modern, well-supported, and cross-platform WebView for React Native. It is intended to be a replacement for the built-in WebView (which will be [removed from core](https://github.com/react-native-community/discussions-and-proposals/pull/3)).

## Platforms Supported

* [x] iOS
* [x] Android
* [ ] Windows 10 (coming soon)

## Installation

```
$ npm install --save react-native-webview
$ react-native link react-native-webview
```

## Usage

Import the `WebView` component from `react-native-webview` and use it like so:

```jsx
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

// ...
class MyWebComponent extends Component {
  render () {
    return (
      <WebView
        src={{uri: "https://infinite.red"}}
        style={{marginTop: 20}}
      />
    )
  }
}
```

Additional properties are supported and will be added here; for now, refer to the previous React Native WebView documentation for more.

[https://facebook.github.io/react-native/docs/webview](https://facebook.github.io/react-native/docs/webview)

## Migrate from React Native core WebView to React Native WebView

Simply install React Native WebView and then use it in place of the core WebView. Their APIs are currently identical.

## Contributing

_Guide coming soon_

### Contributor Notes

* I've removed all PropTypes for now. Instead, we'll be moving toward Flow or TypeScript at some later date

## Maintainers

* [Jamon Holmgren](https://github.com/jamonholmgren) ([Twitter](https://twitter.com/jamonholmgren)) from [Infinite Red](https://infinite.red/react-native)

## License

MIT
