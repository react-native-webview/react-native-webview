/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <WebKit/WebKit.h>

#if TARGET_OS_IOS
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class RNCWebViewChildWindow;

typedef WKWebView *_Nullable (^RNCWebViewChildWindowOpenHandler)(RNCWebViewChildWindow *opener,
                                                                 WKWebViewConfiguration *configuration,
                                                                 WKNavigationAction *navigationAction);
typedef void (^RNCWebViewChildWindowCloseHandler)(RNCWebViewChildWindow *window);

/**
 * A native window for `window.open()`, presented as a sheet.
 *
 * Its WKWebView is built from the configuration WebKit supplies, so WebKit links it to its opener.
 * It gets an empty WKUserContentController: no injected scripts and no ReactNativeWebView bridge.
 * JavaScript dialogs use the calling frame's host as their title, and a dialog on screen is answered
 * with its default when the window closes.
 */
@interface RNCWebViewChildWindow : UIViewController <UIAdaptivePresentationControllerDelegate, WKNavigationDelegate, WKUIDelegate>

@property (nonatomic, strong, readonly, nullable) WKWebView *webView;
@property (nonatomic, assign) BOOL isClosed;
@property (nonatomic, assign) BOOL isPresented;
/// Called for a new-window request from inside this window. Returns the nested window's WKWebView,
/// or nil to ignore the request.
@property (nonatomic, copy, nullable) RNCWebViewChildWindowOpenHandler onOpenWindow;
@property (nonatomic, copy, nullable) RNCWebViewChildWindowCloseHandler onCloseRequest;

- (instancetype)initWithConfiguration:(WKWebViewConfiguration *)configuration
                            userAgent:(nullable NSString *)userAgent
                          inspectable:(BOOL)inspectable NS_DESIGNATED_INITIALIZER;
- (instancetype)initWithNibName:(nullable NSString *)nibNameOrNil bundle:(nullable NSBundle *)nibBundleOrNil NS_UNAVAILABLE;
- (instancetype)initWithCoder:(NSCoder *)coder NS_UNAVAILABLE;

/// Releases the WKWebView. WebKit then closes the page, and the opener sees `popup.closed === true`.
- (void)releaseWebView;
/// Stops the page and disconnects it from native code. The WKWebView stays on screen until
/// `releaseWebView`, so a closing sheet keeps showing its page.
- (void)tearDown;

@end

NS_ASSUME_NONNULL_END

#endif // TARGET_OS_IOS
