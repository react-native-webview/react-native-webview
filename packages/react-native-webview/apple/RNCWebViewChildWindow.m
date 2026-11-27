/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNCWebViewChildWindow.h"

#if TARGET_OS_IOS

@interface RNCWebViewChildWindow ()
/// Answers the JavaScript dialog on screen with its default. WebKit raises if a dialog's completion
/// handler is never called, so `tearDown` calls this.
@property (nonatomic, copy, nullable) void (^cancelPendingDialog)(void);
@end

@implementation RNCWebViewChildWindow

- (instancetype)initWithConfiguration:(WKWebViewConfiguration *)configuration
                            userAgent:(NSString *)userAgent
                          inspectable:(BOOL)inspectable
{
  if ((self = [super initWithNibName:nil bundle:nil])) {
    // The configuration's preferences are the opener's own object, so they are left unchanged.
    configuration.userContentController = [WKUserContentController new];
    _webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:configuration];
    _webView.customUserAgent = userAgent;
    _webView.UIDelegate = self;
    _webView.navigationDelegate = self;
    if (@available(iOS 16.4, *)) {
      _webView.inspectable = inspectable;
    }
  }
  return self;
}

- (void)viewDidLoad
{
  [super viewDidLoad];
  self.view.backgroundColor = UIColor.systemBackgroundColor;
  self.navigationItem.leftBarButtonItem =
    [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemClose
                                                  target:self
                                                  action:@selector(requestClose)];
  if (_webView == nil) {
    return;
  }
  _webView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:_webView];
  UILayoutGuide *safeArea = self.view.safeAreaLayoutGuide;
  [NSLayoutConstraint activateConstraints:@[
    [_webView.topAnchor constraintEqualToAnchor:safeArea.topAnchor],
    [_webView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor],
    [_webView.leadingAnchor constraintEqualToAnchor:safeArea.leadingAnchor],
    [_webView.trailingAnchor constraintEqualToAnchor:safeArea.trailingAnchor],
  ]];
}

- (void)requestClose
{
  if (self.onCloseRequest) {
    self.onCloseRequest(self);
  }
}

- (void)releaseWebView
{
  [_webView removeFromSuperview];
  _webView = nil;
}

- (void)tearDown
{
  if (self.isClosed) {
    return;
  }
  self.isClosed = YES;
  void (^cancelPendingDialog)(void) = self.cancelPendingDialog;
  self.cancelPendingDialog = nil;
  if (cancelPendingDialog) {
    cancelPendingDialog();
  }
  _webView.UIDelegate = nil;
  _webView.navigationDelegate = nil;
  [_webView stopLoading];
  self.onOpenWindow = nil;
  self.onCloseRequest = nil;
}

#pragma mark WKUIDelegate

- (WKWebView *)webView:(WKWebView *)webView
    createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration
               forNavigationAction:(WKNavigationAction *)navigationAction
                    windowFeatures:(WKWindowFeatures *)windowFeatures
{
  // nil ignores the request. Loading it here would replace this window's page.
  return self.onOpenWindow ? self.onOpenWindow(self, configuration, navigationAction) : nil;
}

- (void)webViewDidClose:(WKWebView *)webView
{
  [self requestClose];
}

- (void)webView:(WKWebView *)webView
    runJavaScriptAlertPanelWithMessage:(NSString *)message
                      initiatedByFrame:(WKFrameInfo *)frame
                     completionHandler:(void (^)(void))completionHandler
{
  if (![self canPresentDialog]) {
    completionHandler();
    return;
  }
  __block BOOL answered = NO;
  __weak RNCWebViewChildWindow *weakSelf = self;
  void (^answer)(void) = ^{
    if (answered) {
      return;
    }
    answered = YES;
    weakSelf.cancelPendingDialog = nil;
    completionHandler();
  };
  self.cancelPendingDialog = answer;
  UIAlertController *alert = [UIAlertController alertControllerWithTitle:[self dialogTitleForFrame:frame]
                                                                 message:message
                                                          preferredStyle:UIAlertControllerStyleAlert];
  [alert addAction:[UIAlertAction actionWithTitle:@"Ok" style:UIAlertActionStyleDefault handler:^(__unused UIAlertAction *action) {
    answer();
  }]];
  [self presentViewController:alert animated:YES completion:nil];
}

- (void)webView:(WKWebView *)webView
    runJavaScriptConfirmPanelWithMessage:(NSString *)message
                        initiatedByFrame:(WKFrameInfo *)frame
                       completionHandler:(void (^)(BOOL))completionHandler
{
  if (![self canPresentDialog]) {
    completionHandler(NO);
    return;
  }
  __block BOOL answered = NO;
  __weak RNCWebViewChildWindow *weakSelf = self;
  void (^answer)(BOOL) = ^(BOOL result) {
    if (answered) {
      return;
    }
    answered = YES;
    weakSelf.cancelPendingDialog = nil;
    completionHandler(result);
  };
  self.cancelPendingDialog = ^{
    answer(NO);
  };
  UIAlertController *alert = [UIAlertController alertControllerWithTitle:[self dialogTitleForFrame:frame]
                                                                 message:message
                                                          preferredStyle:UIAlertControllerStyleAlert];
  [alert addAction:[UIAlertAction actionWithTitle:@"Ok" style:UIAlertActionStyleDefault handler:^(__unused UIAlertAction *action) {
    answer(YES);
  }]];
  [alert addAction:[UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(__unused UIAlertAction *action) {
    answer(NO);
  }]];
  [self presentViewController:alert animated:YES completion:nil];
}

- (void)webView:(WKWebView *)webView
    runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt
                              defaultText:(NSString *)defaultText
                         initiatedByFrame:(WKFrameInfo *)frame
                        completionHandler:(void (^)(NSString *))completionHandler
{
  if (![self canPresentDialog]) {
    completionHandler(nil);
    return;
  }
  __block BOOL answered = NO;
  __weak RNCWebViewChildWindow *weakSelf = self;
  void (^answer)(NSString *) = ^(NSString *result) {
    if (answered) {
      return;
    }
    answered = YES;
    weakSelf.cancelPendingDialog = nil;
    completionHandler(result);
  };
  self.cancelPendingDialog = ^{
    answer(nil);
  };
  UIAlertController *alert = [UIAlertController alertControllerWithTitle:[self dialogTitleForFrame:frame]
                                                                 message:prompt
                                                          preferredStyle:UIAlertControllerStyleAlert];
  [alert addTextFieldWithConfigurationHandler:^(UITextField *textField) {
    textField.text = defaultText;
  }];
  __weak UIAlertController *weakAlert = alert;
  UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"Ok" style:UIAlertActionStyleDefault handler:^(__unused UIAlertAction *action) {
    answer(weakAlert.textFields.firstObject.text);
  }];
  [alert addAction:okAction];
  [alert addAction:[UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(__unused UIAlertAction *action) {
    answer(nil);
  }]];
  alert.preferredAction = okAction;
  [self presentViewController:alert animated:YES completion:nil];
}

- (BOOL)canPresentDialog
{
  return !self.isClosed && self.view.window != nil && self.presentedViewController == nil;
}

/**
 * The calling frame's host, so a page cannot pass its dialog off as an app prompt.
 */
- (NSString *)dialogTitleForFrame:(WKFrameInfo *)frame
{
  NSString *host = frame.securityOrigin.host;
  if (host.length == 0) {
    host = _webView.URL.host;
  }
  return host ?: @"";
}

#pragma mark WKNavigationDelegate

- (void)webView:(WKWebView *)webView didCommitNavigation:(WKNavigation *)navigation
{
  self.title = webView.URL.host;
}

- (void)webViewWebContentProcessDidTerminate:(WKWebView *)webView
{
  [self requestClose];
}

#pragma mark UIAdaptivePresentationControllerDelegate

- (void)presentationControllerDidDismiss:(UIPresentationController *)presentationController
{
  // The sheet is already off screen after a swipe down, so closing skips the dismissal.
  self.isPresented = NO;
  [self requestClose];
}

@end

#endif // TARGET_OS_IOS
