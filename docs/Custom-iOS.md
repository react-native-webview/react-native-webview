**NOTE: This document was imported from [the original WebView documentation](https://github.com/facebook/react-native-website/blob/7d3e9e120e38a7ba928f6b173eb98f88b6f2f85f/docs/custom-webview-ios.md). While it may prove useful, it has not been adapted to React Native WebView yet.**

While the built-in web view has a lot of features, it is not possible to handle every use-case in React Native. You can, however, extend the web view with native code without forking React Native or duplicating all the existing web view code.

Before you do this, you should be familiar with the concepts in [native UI components](native-components-ios). You should also familiarise yourself with the [native code for web views](https://github.com/react-native-webview/react-native-webview/blob/master/apple/RNCWebViewManager.m), as you will have to use this as a reference when implementing new features—although a deep understanding is not required.

## Native Code

Like for regular native components, you need a view manager and an web view.

For the view, you'll need to make a subclass of `RCTWebView`.

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

For the view manager, you need to make a subclass `RCTWebViewManager`. You must still include:

* `(UIView *)view` that returns your custom view
* The `RCT_EXPORT_MODULE()` tag

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

### Adding New Events and Properties

Adding new properties and events is the same as regular UI components. For properties, you define an `@property` in the header. For events, you define a `RCTDirectEventBlock` in the view's `@interface`.

```objc
// RCTCustomWebView.h
@property (nonatomic, copy) NSString *finalUrl;

// RCTCustomWebView.m
@interface RCTCustomWebView ()

@property (nonatomic, copy) RCTDirectEventBlock onNavigationCompleted;

@end
```

Then expose it in the view manager's `@implementation`.

```objc
// RCTCustomWebViewManager.m
RCT_EXPORT_VIEW_PROPERTY(onNavigationCompleted, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(finalUrl, NSString)
```

### Extending Existing Events

You should refer to [RCTWebView.m](https://github.com/facebook/react-native/blob/master/React/Views/RCTWebView.m) in the React Native codebase to see what handlers are available and how they are implemented. You can extend any methods here to provide extra functionality.

By default, most methods aren't exposed from RCTWebView. If you need to expose them, you need to create an [Objective C category](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/CustomizingExistingClasses/CustomizingExistingClasses.html), and then expose all the methods you need to use.

```objc
// RCTWebView+Custom.h
#import <React/RCTWebView.h>

@interface RCTWebView (Custom)
- (BOOL)webView:(__unused UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (NSMutableDictionary<NSString *, id> *)baseEvent;
@end
```

Once these are exposed, you can reference them in your custom web view class.

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

### Setting Client Certificate Authentication Credential

If you open webpages that needs a Client Certificate for Authentication, you can create a credential and pass it to the webview:

```
[RNCWebView setClientAuthenticationCredential:credential];
```

This can be paired with a call from Javascript to pass a string label for the certificate stored in keychain and use native calls to fetch the certificate to create a credential object. This call can be made anywhere that makes sense for your application (e.g. as part of the user authentication stack). The only requirement is to make this call before displaying any webviews.

### Allowing custom CAs (Certifica Authorities) and enabling SSL Pinning

If you need to connect to a server which has a self signed certificate, or want to perform SSL Pinning on the webview requests, you need to pass a dictionary with the host as the key, and the certificate as the value of each item:


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

Multiple hosts can be added to the dictionary, and only one certificate for a host is allowed. The verification will succeed if any of the certificates in the chain of the request matches the one defined for the request's host.


## JavaScript Interface

To use your custom web view, you may want to create a class for it. Your class must return a `WebView` component with the prop `nativeConfig.component` set to your native component (see below).

To get your native component, you must use `requireNativeComponent`: the same as for regular custom components.

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

If you want to add custom props to your native component, you can use `nativeConfig.props` on the web view. For iOS, you should also set the `nativeConfig.viewManager` prop with your custom WebView ViewManager as in the example above.

For events, the event handler must always be set to a function. This means it isn't safe to use the event handler directly from `this.props`, as the user might not have provided one. The standard approach is to create a event handler in your class, and then invoking the event handler given in `this.props` if it exists.

If you are unsure how something should be implemented from the JS side, look at [WebView.ios.tsx](https://github.com/react-native-webview/react-native-webview/blob/master/src/WebView.ios.tsx) in the React Native WebView source.

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
## Translations

This file is available at:

- [Brazilian portuguese](Custom-iOS.portuguese.md)