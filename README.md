# React Native WebView - a Modern, Cross-Platform WebView for React Native

**React Native WebView** is a modern, well-supported, and cross-platform WebView for React Native. It is intended to be a replacement for the built-in WebView (which will be [removed from core](https://github.com/react-native-community/discussions-and-proposals/pull/3)).

## Platforms Supported

- [x] iOS (both UIWebView and WKWebView)
- [x] Android
- [ ] Windows 10 (coming soon)

_Note: React Native WebView is not currently supported by Expo unless you "eject"._

## Versioning

If you need the exact same WebView as the one from react-native, please use version **2.0.0**. Future versions will follow [semantic versioning](https://semver.org/).

## Getting Started

```
$ yarn add react-native-webview
$ react-native link react-native-webview
```

Read our [Getting Started Guide](./docs/Getting-Started.md) for more.

## Usage

Import the `WebView` component from `react-native-webview` and use it like so:

```jsx
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

// ...
class MyWebComponent extends Component {
  render() {
    return (
      <WebView
        source={{ uri: "https://infinite.red/react-native" }}
        style={{ marginTop: 20 }}
        onLoadProgress={e => console.log(e.nativeEvent.progress)}
      />
    );
  }
}
```

For more, read the [API Reference](./docs/Reference.md) and [Guide](./docs/Guide.md). If you're interested in contributing, check out the [Contributing Guide](./docs/Contributing.md).

## Migrate from React Native core WebView to React Native WebView

Simply install React Native WebView and then use it in place of the core WebView. Their APIs are currently identical, except that this package defaults `useWebKit={true}` unlike the built-in WebView.

## Troubleshooting

- If you're getting `Invariant Violation: Native component for "RNCWKWebView does not exist"` it likely means you forgot to run `react-native link` or there was some error with the linking process

### Contributor Notes

- I've removed all PropTypes for now. Instead, we'll be using Flow types. TypeScript types will be added at a later date.
- UIWebView is not tested fully and you will encounter some yellow warning boxes. Since it is deprecated, we don't intend to put a lot of time into supporting it, but feel free to submit PRs if you have a special use case. Note that you will need to specify `useWebKit={false}` to use UIWebView
- After pulling this repo and installing all dependencies, you can run flow on iOS and Android-specific files using the commands:
  - `yarn test:ios:flow` for iOS
  - `yarn test:android:flow` for Android
- If you want to add another React Native platform to this repository, you will need to create another `.flowconfig` for it. If your platform is `example`, copy the main flowconfig and rename it to `.flowconfig.example`. Then edit the config to ignore other platforms, and add `.*/*[.]example.js` to the ignore lists of the other platforms. Then add an entry to `package.json` like this:
  - `"test:example:flow": "flow check --flowconfig-name .flowconfig.example"`
- Currently you need to install React Native 0.57 to be able to test these types - `flow check` will not pass against 0.56.

## Maintainers

- [Jamon Holmgren](https://github.com/jamonholmgren) ([Twitter @jamonholmgren](https://twitter.com/jamonholmgren)) from [Infinite Red](https://infinite.red/react-native)
- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) from [Brigad](https://brigad.co/about)
- [Empyrical](https://github.com/empyrical) ([Twitter @empyrical](https://twitter.com/empyrical))

## License

MIT
