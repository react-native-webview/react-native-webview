# React Native WebView

![star this repo](https://img.shields.io/github/stars/react-native-webview/react-native-webview?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM Version](https://img.shields.io/npm/v/react-native-webview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-webview)
![Npm Downloads](https://img.shields.io/npm/dm/react-native-webview.svg)

**React Native WebView** 是由社区维护的 React Native WebView 组件，旨在替代已从核心移除的内置 WebView。

### 维护者

**非常感谢这些公司**为我们提供维护开源项目的时间。请注意，维护者多为业余时间贡献，如有可能欢迎赞助他们，这会有很大帮助。

- [Thibault Malbranche](https://github.com/Titozzz)（来自 [Brigad](https://www.brigad.co/en-gb/about-us)）
  [*Sponsor me* ❤️ !](https://github.com/sponsors/Titozzz)

Windows 与 macOS 由 Microsoft 维护：
- [Alexander Sklar](https://github.com/asklar)（来自 React Native for Windows）
- [Chiara Mooney](https://github.com/chiaramooney)（来自 React Native for Windows @ Microsoft）

感谢 [Jamon Holmgren](https://github.com/jamonholmgren)（Infinite Red）在有更多时间时对仓库的巨大帮助。

### 免责声明

维护 WebView 十分复杂，因为它被用于很多不同场景（渲染 SVG、PDF、登录流程等）。我们同时支持许多平台与不同架构的 React Native。

自从 WebView 从 React Native core 中拆分以来，已有近 500 个 PR 被合并。
考虑到我们时间有限，issues 主要作为社区讨论场所，而 **我们会优先审查与合并 Pull Requests。**

### 平台兼容性

本项目兼容 **iOS**、**Android**、**Windows** 与 **macOS**。
同时支持 **旧架构 (paper)** 和 **新架构 (fabric)**。
本项目也兼容 [expo](https://docs.expo.dev/versions/latest/sdk/webview/)。

### 入门

请阅读我们的 [Getting Started Guide](docs/Getting-Started.chinese.md)。如果任何步骤不清晰，请提交 PR 修正。

### 版本管理

本项目遵循 [语义化版本控制](https://semver.org/)。必要时会发布包含破坏性变更的主版本。

### 使用示例

从 `react-native-webview` 导入 `WebView` 并这样使用：

```tsx
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
const MyWebComponent = () => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />;
}
```

更多内容请参阅 [API Reference](./docs/Reference.chinese.md) 与 [Guide](./docs/Guide.chinese.md)。如果你有兴趣贡献，请查阅 [Contributing Guide](./docs/Contributing.chinese.md)。

### 常见问题

- 如果遇到 `Invariant Violation: Native component for "RNCWebView does not exist"`，很可能是忘记运行 `react-native link` 或链接过程中出现错误。
- 如果在执行任务 `:app:mergeDexRelease` 时遇到构建错误，需要在 `android/app/build.gradle` 中启用 multidex 支持（见相关 issue）。

#### 贡献

欢迎贡献，见 [Contributing.md](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Contributing.chinese.md)

### 许可证

MIT

### 翻译

本 README 提供以下翻译版本：

- [Brazilian portuguese](docs/README.portuguese.md)
- [French](docs/README.french.md)
- [Italian](docs/README.italian.md)
