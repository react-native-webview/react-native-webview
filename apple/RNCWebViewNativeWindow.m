#import "RNCWebViewNativeWindow.h"

#if TARGET_OS_IOS
BOOL RNCNativeWindowAllowsURL(NSURL *url, NSArray<NSString *> *hosts)
{
  if (![url.scheme.lowercaseString isEqualToString:@"https"] || url.host.length == 0) {
    return NO;
  }
  NSString *host = url.host.lowercaseString;
  for (NSString *allowedHost in hosts) {
    NSString *allowed = allowedHost.lowercaseString;
    if (allowed.length > 0 && ([host isEqualToString:allowed] || [host hasSuffix:[@"." stringByAppendingString:allowed]])) {
      return YES;
    }
  }
  return NO;
}

@implementation RNCWebViewNativeWindow {
  NSArray<NSString *> *_allowedHosts;
  BOOL _closeRequested;
}

- (instancetype)initWithConfiguration:(WKWebViewConfiguration *)configuration
                         allowedHosts:(NSArray<NSString *> *)allowedHosts
                            userAgent:(NSString *)userAgent
{
  if ((self = [super initWithNibName:nil bundle:nil])) {
    _allowedHosts = [allowedHosts copy];
    configuration.userContentController = [WKUserContentController new];
    _webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:configuration];
    _webView.customUserAgent = userAgent;
    _webView.UIDelegate = self;
    _webView.navigationDelegate = self;
  }
  return self;
}

- (void)viewDidLoad
{
  [super viewDidLoad];
  self.view.backgroundColor = UIColor.systemBackgroundColor;
  _webView.translatesAutoresizingMaskIntoConstraints = NO;
  [self.view addSubview:_webView];
  [NSLayoutConstraint activateConstraints:@[
    [_webView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor],
    [_webView.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor],
    [_webView.leadingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.leadingAnchor],
    [_webView.trailingAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.trailingAnchor],
  ]];
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemClose
                                                                                    target:self
                                                                                    action:@selector(requestClose)];
}

- (void)viewDidAppear:(BOOL)animated
{
  [super viewDidAppear:animated];
  self.navigationController.presentationController.delegate = self;
}

- (void)requestClose
{
  if (_closeRequested || _webView == nil) {
    return;
  }
  _closeRequested = YES;
  [_webView evaluateJavaScript:@"window.close()" completionHandler:nil];
  // Retain the controller until teardown, including after an interactive dismissal.
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [self close];
  });
}

- (void)close
{
  if (_webView == nil) {
    return;
  }
  [_webView stopLoading];
  _webView.UIDelegate = nil;
  _webView.navigationDelegate = nil;
  [_webView removeFromSuperview];
  _webView = nil;
  [self.navigationController dismissViewControllerAnimated:YES completion:nil];
  if (self.onClose) {
    self.onClose();
    self.onClose = nil;
  }
}

- (void)presentationControllerDidDismiss:(UIPresentationController *)presentationController
{
  [self requestClose];
}

- (void)webViewDidClose:(WKWebView *)webView
{
  [self close];
}

- (void)webViewWebContentProcessDidTerminate:(WKWebView *)webView
{
  [self close];
}

- (WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures
{
  return nil;
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler
{
  NSURL *url = navigationAction.request.URL;
  BOOL isSubframe = navigationAction.targetFrame != nil && !navigationAction.targetFrame.isMainFrame;
  BOOL isAllowed = [url.absoluteString isEqualToString:@"about:blank"] ||
    (isSubframe ? [url.scheme.lowercaseString isEqualToString:@"https"] : RNCNativeWindowAllowsURL(url, _allowedHosts));
  decisionHandler(navigationAction.targetFrame != nil && isAllowed ? WKNavigationActionPolicyAllow : WKNavigationActionPolicyCancel);
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  self.title = webView.URL.host;
}
@end
#endif
