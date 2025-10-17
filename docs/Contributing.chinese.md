# 贡献到 React Native WebView

首先，感谢你考虑为 React Native 社区贡献。社区维护的包能够存在，离不开像你这样的贡献者。

我们希望贡献体验尽可能顺畅。虽然我们是一个由志愿者组成的小团队，但我们很乐意听取你对体验或文档的反馈，如果我们可以改进，请告诉我们。

## 如何测试更改

在你 fork 仓库、克隆到本地并做出更改后，你需要在一个应用中测试这些更改。

有两种测试方法：
1) 在 react-native-webview 的克隆仓库内测试
2) 在一个新的 `react-native init` 项目中测试

### 在 react-native-webview 中测试

#### 对所有平台：

```sh
yarn install
```

#### Android：

```sh
yarn android
```

Android 示例应用会被构建，Metro bundler 会启动，示例应用会被安装并在 Android 模拟器中运行。

#### iOS：

```sh
pod install --project-directory=example/ios
yarn ios
```

iOS 示例应用会被构建，Metro bundler 会启动，示例应用会被安装并在模拟器中运行。

#### macOS：

```sh
pod install --project-directory=macos
yarn macos
```

macOS 示例应用会被构建，Metro bundler 会启动，示例应用会被安装并运行。

#### Windows：

```sh
yarn windows
```

Windows 示例应用会被构建，Metro bundler 会启动，示例应用会被安装并运行。

### 在新的 `react-native init` 项目中测试

在新的 `react-native init` 项目中，执行：

```
$ yarn add <path to local react-native-webview>
```

你可能会遇到一个问题，提示 `jest-haste-map` 模块命名冲突，表现为 react-native 被添加了两次：

```
Loading dependency graph...(node:32651) UnhandledPromiseRejectionWarning: Error: jest-haste-map: Haste module naming collision:
  Duplicate module name: react-native
  Paths: /Users/myuser/TestApp/node_modules/react-native/package.json collides with /Users/myuser/TestApp/node_modules/react-native-webview/node_modules/react-native/package.json
```

简单的解决方法是移除第二个路径：

```
$ rm -rf ./node_modules/react-native-webview/node_modules/react-native
```

然后重启打包器：

```
$ react-native start --reset-cache
```

你也可能看到一个关于 “Invalid hook call” 的控制台警告，随后渲染错误提示 "null is not an object (evaluating 'dispatcher.useRef')"。解决方式类似，移除 `react-native-webview/node_modules/react` 即可。

(如果你在移除 `react` 之前移除了 `react-native`，你可能会看到另一个渲染错误 "View config getter callback for component 'RNCWebView' must be a function"，这时也把 `react-native` 一并移除即可)

当你做出更改时，通常需要移除并重新添加本地包：

```
$ yarn remove react-native-webview
$ yarn add ../react-native-webview
```

## 说明

- 我们使用 TypeScript。
- 在拉取仓库并安装所有依赖后，你可以使用命令 `yarn ci` 来运行测试。

## 翻译
此文件提供以下翻译版本：

- [巴西葡萄牙语](Contributing.portuguese.md)
- [意大利语](Contributing.italian.md)
