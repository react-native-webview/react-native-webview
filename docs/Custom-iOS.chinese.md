**注意：本文件从原始 WebView 文档导入（https://github.com/facebook/react-native-website/.../custom-webview-ios.md）。虽然可能有用，但尚未完全适配 React Native WebView。**

尽管内置的 webview 功能强大，但在 React Native 中不可能覆盖所有用例。你可以通过原生代码扩展 webview，而无需 fork React Native 或复制现有代码。

在开始之前，你应熟悉 [原生 UI 组件](native-components-ios) 的概念。你还应该参考 webview 的原生代码（如 apple/RNCWebViewManager.m），因为实现新功能时需要参考它，不过不需要非常深入的理解。

## 原生代码

与常规原生组件类似，你需要一个 view manager 和一个 web view。

对于 view，你需要制作 `RCTWebView` 的子类。

```objc
// RCTCustomWebView.h
#import <React/RCTWebView.h>

@interface RCTCustomWebView : RCTWebView

@end

// RCTCustomWebView.m
#import "RCTCustomWebView.h"

@interface RCTCustomWebView ()

@end

@implementation RCTCustomWebView { }

@end
```

对于 view manager，需要创建 `RCTWebViewManager` 的子类。必须包含：

* `(UIView *)view` 返回你的自定义 view
* `RCT_EXPORT_MODULE()` 标记

```objc
// RCTCustomWebViewManager.h
#import <React/RCTWebViewManager.h>

@interface RCTCustomWebViewManager : RCTWebViewManager

@end

// RCTCustomWebViewManager.m
#import "RCTCustomWebViewManager.h"
#import "RCTCustomWebView.h"

@interface RCTCustomWebViewManager () <RCTWebViewDelegate>

@end

@implementation RCTCustomWebViewManager { }

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RCTCustomWebView *webView = [RCTCustomWebView new];
  webView.delegate = self;
  return webView;
}

@end
```

### 添加新事件与属性

添加属性和事件与常规 UI 组件相同。对于属性，在 header 中定义 `@property`。对于事件，在 view 的 `@interface` 中定义 `RCTDirectEventBlock`。

```objc
// RCTCustomWebView.h
@property (nonatomic, copy) NSString *finalUrl;

// RCTCustomWebView.m
@interface RCTCustomWebView ()

@property (nonatomic, copy) RCTDirectEventBlock onNavigationCompleted;

@end
```

然后在 view manager 的实现中暴露这些属性。

```objc
// RCTCustomWebViewManager.m
RCT_EXPORT_VIEW_PROPERTY(onNavigationCompleted, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(finalUrl, NSString)
```

### 扩展已有事件

参考 React Native 代码中的 `RCTWebView.m` 查看有哪些 handler 可用以及如何实现。你可以扩展这些方法以提供额外功能。

默认情况下，大多数方法在 RCTWebView 中没有暴露。如果需要暴露它们，你需要创建一个 Objective-C 类别（category），然后将需要的方法都暴露出来。

```objc
// RCTWebView+Custom.h
#import <React/RCTWebView.h>

@interface RCTWebView (Custom)
- (BOOL)webView:(__unused UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (NSMutableDictionary<NSString *, id> *)baseEvent;
@end
```

暴露后，你可以在自定义 web view 类中引用它们。

```objc
// RCTCustomWebView.m

// Remember to import the category file.
#import "RCTWebView+Custom.h"

- (BOOL)webView:(__unused UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType
{
  BOOL allowed = [super webView:webView shouldStartLoadWithRequest:request navigationType:navigationType];

  if (allowed) {
    NSString* url = request.URL.absoluteString;
    if (url && [url isEqualToString:_finalUrl]) {
      if (_onNavigationCompleted) {
        NSMutableDictionary<NSString *, id> *event = [self baseEvent];
        _onNavigationCompleted(event);
      }
    }
  }

  return allowed;
}
```

### 设置客户端证书认证凭据

如果你打开的网页需要客户端证书进行认证，你可以创建一个凭据并传递给 webview：

```
[RNCWebView setClientAuthenticationCredential:credential];
```

这可以与从 Javascript 传入标签并在原生侧从 keychain 获取证书以创建凭据对象配合使用。该调用可以放在合适的位置（例如用户认证流程中）。唯一的要求是在展示任何 webviews 之前进行此调用。

### 允许自定义 CA（证书颁发机构）并启用 SSL Pinning

如果需要连接到使用自签名证书的服务器，或想对 webview 请求执行 SSL Pinning，需要传入一个字典，主机作为 key，证书作为 value：

```objc
-(void)installCerts {

  // Get the bundle where the certificates in DER format are present.
  NSBundle *bundle = [NSBundle mainBundle];
  
  NSMutableDictionary* certMap = [NSMutableDictionary new];

  NSData *rootCertData = [NSData dataWithContentsOfFile:[bundle pathForResource:@"example_ca" ofType:@"der"]];

  SecCertificateRef certificate = SecCertificateCreateWithData(NULL, (CFDataRef) rootCertData);
   
  OSStatus err = SecItemAdd((CFDictionaryRef) [NSDictionary dictionaryWithObjectsAndKeys:(id) kSecClassCertificate, kSecClass, certificate, kSecValueRef, nil], NULL);
  
  [certMap setObject:(__bridge id _Nonnull)(certificate) forKey:@"example.com"];

  [RNCWebView setCustomCertificatesForHost:certMap];
}

```

可以为多个主机添加条目，但每个主机只允许一个证书。只要请求链中有任一证书与为该主机关联的证书匹配，验证就会通过。

## JavaScript 接口

要在 JS 侧使用自定义 webview，你可以为其创建一个类。该类必须返回一个 `WebView` 组件，并将 prop `nativeConfig.component` 设置为你的原生组件（见下）。

获取原生组件需使用 `requireNativeComponent`，与常规自定义组件相同。

```javascript
import React, {Component} from 'react';
import {WebView, requireNativeComponent, NativeModules} from 'react-native';
const {CustomWebViewManager} = NativeModules;

export default class CustomWebView extends Component {
  render() {
    return (
      <WebView
        {...this.props}
        nativeConfig={{
          component: RCTCustomWebView,
          viewManager: CustomWebViewManager,
        }}
      />
    );
  }
}

const RCTCustomWebView = requireNativeComponent('RCTCustomWebView');
```

如果想为原生组件添加自定义 props，可在 `nativeConfig.props` 中设置。在 iOS 上，也应该设置 `nativeConfig.viewManager`。

事件处理器必须始终设置为函数。标准做法是在类中创建一个事件处理器，然后在调用时判断 `this.props` 中是否提供了回调。

如果不确定如何从 JS 侧实现，请参考 `WebView.ios.tsx`。

```javascript
export default class CustomWebView extends Component {
  _onNavigationCompleted = (event) => {
    const {onNavigationCompleted} = this.props;
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
          viewManager: CustomWebViewManager,
        }}
      />
    );
  }
}
```

## 翻译
此文件提供以下翻译版本：

- [巴西葡萄牙语](Custom-iOS.portuguese.md)
- [意大利语](Contributing.italian.md)
