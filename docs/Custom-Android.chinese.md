尽管内置的 webview 功能强大，但在 React Native 中不可能覆盖所有用例。然而，你可以通过原生代码扩展 webview，而无需 fork React Native 或复制现有的 webview 代码。

在开始之前，你应该熟悉 [原生 UI 组件](https://reactnative.dev/docs/native-components-android) 的概念。你还应该参考[原生 webview 代码](https://github.com/react-native-webview/react-native-webview/blob/master/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManager.java)，因为你在实现新功能时需要以此为参考——不过不需要非常深入的理解。

## 原生代码

要开始，你需要创建 `RNCWebViewManager`、`RNCWebView` 和 `RNCWebViewClient` 的子类。在你的 view manager 中，你需要覆盖：

- `createViewInstance`
- `getName`
- `addEventEmitters`

```java
@ReactModule(name = CustomWebViewManager.REACT_CLASS)
public class CustomWebViewManager extends RNCWebViewManager {
  /* This name must match what we're referring to in JS */
  protected static final String REACT_CLASS = "RCTCustomWebView";

  protected static class CustomWebViewClient extends RNCWebViewClient { }

  protected static class CustomWebView extends RNCWebView {
    public CustomWebView(ThemedReactContext reactContext) {
      super(reactContext);
    }
  }

  @Override
  protected RNCWebView createViewInstance(ThemedReactContext reactContext) {
    return super.createViewInstance(reactContext, new CustomWebView(reactContext));
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected void addEventEmitters(ThemedReactContext reactContext, RNCWebViewWrapper view) {
    view.getWebView().setWebViewClient(new CustomWebViewClient());
  }
}
```

你需要按照常规步骤来[注册模块](https://reactnative.dev/docs/native-modules-android#register-the-module-android-specific)。

### 添加新属性

要添加新属性，需要在 `CustomWebView` 中新增字段，然后在 `CustomWebViewManager` 中对外暴露它。

```java
public class CustomWebViewManager extends RNCWebViewManager {
  ...

  protected static class CustomWebView extends RNCWebView {
    public CustomWebView(ThemedReactContext reactContext) {
      super(reactContext);
    }

    protected @Nullable String mFinalUrl;

    public void setFinalUrl(String url) {
        mFinalUrl = url;
    }

    public String getFinalUrl() {
        return mFinalUrl;
    }
  }

  ...

  @ReactProp(name = "finalUrl")
  public void setFinalUrl(RNCWebViewWrapper view, String url) {
    ((CustomWebView) view.getWebView()).setFinalUrl(url);
  }
}
```

### 添加新事件

对于事件，你首先需要创建事件的子类。

```java
// NavigationCompletedEvent.java
public class NavigationCompletedEvent extends Event<NavigationCompletedEvent> {
  private WritableMap mParams;

  public NavigationCompletedEvent(int viewTag, WritableMap params) {
    super(viewTag);
    this.mParams = params;
  }

  @Override
  public String getEventName() {
    return "navigationCompleted";
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    init(getViewTag());
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mParams);
  }
}
```

你可以在你的 web view client 中触发这个事件。如果你的事件基于已有的 handler，你也可以挂钩这些 handler。

应该参考 `RNCWebViewManager.java` 来查看有哪些可用的 handler 以及如何实现它们。你可以扩展其中任何方法以提供额外功能。

```java
public class NavigationCompletedEvent extends Event<NavigationCompletedEvent> {
  private WritableMap mParams;

  public NavigationCompletedEvent(int viewTag, WritableMap params) {
    super(viewTag);
    this.mParams = params;
  }

  @Override
  public String getEventName() {
    return "navigationCompleted";
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    init(getViewTag());
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mParams);
  }
}

// CustomWebViewManager.java
protected static class CustomWebViewClient extends RNCWebViewClient {
  @Override
  public boolean shouldOverrideUrlLoading(WebView view, String url) {
    boolean shouldOverride = super.shouldOverrideUrlLoading(view, url);
    String finalUrl = ((CustomWebView) view).getFinalUrl();

    if (!shouldOverride && url != null && finalUrl != null && new String(url).equals(finalUrl)) {
      final WritableMap params = Arguments.createMap();
      dispatchEvent(view, new NavigationCompletedEvent(view.getId(), params));
    }

    return shouldOverride;
  }
}
```

最后，你需要在 `CustomWebViewManager` 中通过 `getExportedCustomDirectEventTypeConstants` 暴露事件。注意当前默认实现返回 `null`，未来可能会变更。

```java
public class CustomWebViewManager extends RNCWebViewManager {
  ...

  @Override
  public @Nullable
  Map getExportedCustomDirectEventTypeConstants() {
    Map<String, Object> export = super.getExportedCustomDirectEventTypeConstants();
    if (export == null) {
      export = MapBuilder.newHashMap();
    }
    export.put("navigationCompleted", MapBuilder.of("registrationName", "onNavigationCompleted"));
    return export;
  }
}
```

## JavaScript 接口

要在 JS 侧使用自定义 webview，你可能想为其创建一个类。该类必须返回一个 `WebView` 组件，并将 prop `nativeConfig.component` 设置为你的原生组件（见下）。

获取原生组件需使用 `requireNativeComponent`，与常规自定义组件相同。

```javascript
import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
import { WebView } from 'react-native-webview';

export default class CustomWebView extends Component {
  render() {
    return (
      <WebView {...this.props} nativeConfig={{ component: RCTCustomWebView }} />
    );
  }
}

const RCTCustomWebView = requireNativeComponent('RCTCustomWebView');
```

如果你想为原生组件增加自定义属性，可以在 WebView 的 `nativeConfig.props` 中传入这些属性。

对于事件，事件处理函数必须始终是一个函数。这意味着直接从 `this.props` 读取事件处理器并不安全，因为用户可能没有提供该回调。标准做法是在类中创建一个事件处理器，然后在调用时判断 `this.props` 中是否提供了回调。

如果不确定如何从 JS 侧实现某些行为，请参考 `WebView.android.tsx`。

```javascript
export default class CustomWebView extends Component {
  _onNavigationCompleted = (event) => {
    const { onNavigationCompleted } = this.props;
    onNavigationCompleted && onNavigationCompleted(event);
  };

  render() {
    return (
      <WebView
        {...this.props}
        nativeConfig={{
          component: RCTCustomWebView,
          props: {
            finalUrl: this.props.finalUrl,
            onNavigationCompleted: this._onNavigationCompleted,
          },
        }}
      />
    );
  }
}
```

## 翻译
此文件提供以下翻译版本：
- [巴西葡萄牙语](Custom-Android.portuguese.md)
- [意大利语](Custom-Android.italian.md)
