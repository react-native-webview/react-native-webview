# React Native WebView 调试指南

以下是一些有用的 React Native WebView 调试技巧。

## 脚本错误

在 WebView 中调试语法错误和其他脚本错误可能比较困难，因为错误默认不会显示在控制台中。

如果你是从外部来源加载 HTML，可以在内容加载前注入一个错误处理函数：

```js
<WebView
  injectedJavaScriptBeforeContentLoaded={`
    window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
    true;
  `}
  source={{
    uri:
      'https://bl.ocks.org/jamonholmgren/raw/48423fd99537283beace1daa2688e80f/',
  }}
/>
```

这样会弹出一个 Alert，包含（希望有用的）调试信息。

如果你注入的 JavaScript 失败并出现 `Script error` 且没有更多信息，可以把注入脚本用 try/catch 包裹：

```js
const js = `
  try {
    // your code here
  } catch(e) {
    alert(e)
  }
  true;
`;
```

这会弹出包含错误信息的 alert。

如果以上两种方法都不能定位问题，请尝试下面的技术。

## 调试 WebView 内容

### iOS & Safari

可以使用 Safari 开发者工具调试 iOS 模拟器或设备上的 WebView 内容。

#### 步骤：

1. 使用 `webviewDebuggingEnabled` prop 将 WebView 标记为可调试
2. 打开 Safari 偏好设置 -> "高级" -> 勾选 "在菜单栏中显示开发 (Develop) 菜单"
3. 启动包含 WebView 的 app（在模拟器或设备上）
4. Safari -> Develop -> [设备名] -> [应用名] -> [url - title]
5. 现在可以像在网页上一样调试 WebView 内容

##### 注意：

在设备上调试时需在设备设置中启用 Web Inspector：

设置 -> Safari -> 高级 -> Web Inspector

如果在 Develop 菜单中看不到设备，并且你是在启动 Simulator 之前先启动的 Safari，试着重启 Safari。

### Android & Chrome

可以使用 Chrome DevTools 调试 Android 模拟器或设备上的 WebView 内容。

1. 需要在 WebView 上设置 `webviewDebuggingEnabled` prop
2. 启动包含 WebView 的 app（在模拟器或设备上）
3. 在 Chrome 中打开 `chrome://inspect/#devices`
4. 在左侧选择你的设备，然后在要调试的 WebView 内容上点击 "Inspect"
5. 现在可以像在网页上一样调试 WebView 内容

![image](https://user-images.githubusercontent.com/1479215/47129785-9476e480-d24b-11e8-8cb1-fba77ee1c072.png)

##### 注意：

在设备上调试时需在设备设置中启用 USB 调试：

设置 -> 系统 -> 关于手机 -> 开发者选项 -> 启用 USB 调试

## 翻译

此文件提供以下翻译版本：

- [巴西葡萄牙语](Debugging.portuguese.md)
- [意大利语](Debugging.italian.md)
