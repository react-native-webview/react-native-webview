# React Native WebView - a Modern, Cross-Platform WebView for React Native
[![star this repo](http://githubbadges.com/star.svg?user=react-native-community&repo=react-native-webview&style=flat)](https://github.com/react-native-community/react-native-webview) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors) [![Known Vulnerabilities](https://snyk.io/test/github/react-native-community/react-native-webview/badge.svg?style=flat-square)](https://snyk.io/test/github/react-native-community/react-native-webview) 

**React Native WebView** is a modern, well-supported, and cross-platform WebView for React Native. It is intended to be a replacement for the built-in WebView (which will be [removed from core](https://github.com/react-native-community/discussions-and-proposals/pull/3)).

## Core Maintainers - Sponsoring companies
_This project is maintained for free by these people using both their free time and their company work time._

- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) from [Brigad](https://brigad.co/about)
- [Jamon Holmgren](https://github.com/jamonholmgren) ([Twitter @jamonholmgren](https://twitter.com/jamonholmgren)) from [Infinite Red](https://infinite.red/react-native)

## Platforms Supported

- [x] iOS (both UIWebView and WKWebView)
- [x] Android

_Note: React Native WebView is not currently supported by Expo unless you "eject"._

## Getting Started

Read our [Getting Started Guide](docs/Getting-Started.md). If any step seems unclear, please create a detailed issue.

## Versioning

This project follows [semantic versioning](https://semver.org/). We do not hesitate to release breaking changes but they will be in a major version.

**Breaking History:**

- [2.0.0](https://github.com/react-native-community/react-native-webview/releases/tag/v2.0.0) - First release this is a replica of the core webview component
- [3.0.0](https://github.com/react-native-community/react-native-webview/releases/tag/v3.0.0) - WKWebview: Add shared process pool so cookies and localStorage are shared across webviews in iOS (enabled by default).
- [4.0.0](https://github.com/react-native-community/react-native-webview/releases/tag/v4.0.0) - Added cache (enabled by default).
- [5.0.**1**](https://github.com/react-native-community/react-native-webview/releases/tag/v5.0.0) - Refactored the old postMessage implementation for communication from webview to native.

**Upcoming:**

- UIWebView removal
- this.webView.postMessage() removal (never documented and less flexible than injectJavascript)
- Typescript rewrite
- Kotlin rewrite
- Maybe Swift rewrite

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
        source={{ uri: "https://facebook.github.io/react-native/" }}
      />
    );
  }
}
```

For more, read the [API Reference](./docs/Reference.md) and [Guide](./docs/Guide.md). If you're interested in contributing, check out the [Contributing Guide](./docs/Contributing.md).

## Common issues

- If you're getting `Invariant Violation: Native component for "RNCWKWebView does not exist"` it likely means you forgot to run `react-native link` or there was some error with the linking process
- There's a [problem](https://stackoverflow.com/questions/52872045/rendering-webview-on-android-device-overlaps-previous-siblings-from-same-parent) on some Android devices where the webview could overlap previous siblings from same parent. To fix this, wrap the WebView in a View with style `overflow: hidden`.

## Contributing

See [Contributing.md](https://github.com/react-native-community/react-native-webview/blob/master/docs/Contributing.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key-)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/6181446?v=4" width="100px;" alt="Thibault Malbranche"/><br /><sub><b>Thibault Malbranche</b></sub>](https://twitter.com/titozzz)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=titozzz "Code") [🤔](#ideas-titozzz "Ideas, Planning, & Feedback") [👀](#review-titozzz "Reviewed Pull Requests") [📖](https://github.com/react-native-community/react-native-webview/commits?author=titozzz "Documentation") [🚧](#maintenance-titozzz "Maintenance") [⚠️](https://github.com/react-native-community/react-native-webview/commits?author=titozzz "Tests") [🚇](#infra-titozzz "Infrastructure (Hosting, Build-Tools, etc)") [💬](#question-titozzz "Answering Questions") | [<img src="https://avatars3.githubusercontent.com/u/1479215?v=4" width="100px;" alt="Jamon Holmgren"/><br /><sub><b>Jamon Holmgren</b></sub>](https://jamonholmgren.com)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=jamonholmgren "Code") [🤔](#ideas-jamonholmgren "Ideas, Planning, & Feedback") [👀](#review-jamonholmgren "Reviewed Pull Requests") [📖](https://github.com/react-native-community/react-native-webview/commits?author=jamonholmgren "Documentation") [🚧](#maintenance-jamonholmgren "Maintenance") [⚠️](https://github.com/react-native-community/react-native-webview/commits?author=jamonholmgren "Tests") [💡](#example-jamonholmgren "Examples") [💬](#question-jamonholmgren "Answering Questions") | [<img src="https://avatars1.githubusercontent.com/u/2570562?v=4" width="100px;" alt="Andrei Pfeiffer"/><br /><sub><b>Andrei Pfeiffer</b></sub>](https://github.com/andreipfeiffer)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=andreipfeiffer "Code") [👀](#review-andreipfeiffer "Reviewed Pull Requests") [🤔](#ideas-andreipfeiffer "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/5347038?v=4" width="100px;" alt="Michael Diarmid"/><br /><sub><b>Michael Diarmid</b></sub>](https://twitter.com/mikediarmid)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=Salakar "Code") [👀](#review-Salakar "Reviewed Pull Requests") [🤔](#ideas-Salakar "Ideas, Planning, & Feedback") [🔧](#tool-Salakar "Tools") | [<img src="https://avatars3.githubusercontent.com/u/932981?v=4" width="100px;" alt="Scott Mathson"/><br /><sub><b>Scott Mathson</b></sub>](http://smathson.github.io)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=smathson "Code") [📖](https://github.com/react-native-community/react-native-webview/commits?author=smathson "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/8221990?v=4" width="100px;" alt="Margaret"/><br /><sub><b>Margaret</b></sub>](https://github.com/YangXiaomei)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=YangXiaomei "Code") [📖](https://github.com/react-native-community/react-native-webview/commits?author=YangXiaomei "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/1173161?v=4" width="100px;" alt="Jordan Sexton"/><br /><sub><b>Jordan Sexton</b></sub>](https://stylisted.com)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=jordansexton "Code") [📖](https://github.com/react-native-community/react-native-webview/commits?author=jordansexton "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/22333355?v=4" width="100px;" alt="Malcolm Scruggs"/><br /><sub><b>Malcolm Scruggs</b></sub>](https://github.com/MalcolmScruggs)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=MalcolmScruggs "Code") [🔧](#tool-MalcolmScruggs "Tools") [⚠️](https://github.com/react-native-community/react-native-webview/commits?author=MalcolmScruggs "Tests") | [<img src="https://avatars0.githubusercontent.com/u/42069617?v=4" width="100px;" alt="Momazo7u7"/><br /><sub><b>Momazo7u7</b></sub>](https://github.com/Momazo7u7)<br />[📖](https://github.com/react-native-community/react-native-webview/commits?author=Momazo7u7 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/3315507?v=4" width="100px;" alt="Marco"/><br /><sub><b>Marco</b></sub>](https://marco-nett.de)<br />[📖](https://github.com/react-native-community/react-native-webview/commits?author=marconett "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/359723?v=4" width="100px;" alt="Julien Eluard"/><br /><sub><b>Julien Eluard</b></sub>](https://github.com/jeluard)<br />[📖](https://github.com/react-native-community/react-native-webview/commits?author=jeluard "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/3667305?v=4" width="100px;" alt="Jian Wei"/><br /><sub><b>Jian Wei</b></sub>](https://github.com/CubeSugar)<br />[💻](https://github.com/react-native-community/react-native-webview/commits?author=CubeSugar "Code") [📖](https://github.com/react-native-community/react-native-webview/commits?author=CubeSugar "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT
