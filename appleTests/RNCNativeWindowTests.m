#import <XCTest/XCTest.h>
#import "RNCWebViewNativeWindow.h"

@interface RNCNativeWindowTestFrame : WKFrameInfo
@property (nonatomic, assign) BOOL testMainFrame;
@end
@implementation RNCNativeWindowTestFrame
- (BOOL)isMainFrame { return self.testMainFrame; }
@end

@interface RNCNativeWindowTestAction : WKNavigationAction
@property (nonatomic, strong) NSURLRequest *testRequest;
@property (nonatomic, strong) WKFrameInfo *testFrame;
@end
@implementation RNCNativeWindowTestAction
- (NSURLRequest *)request { return self.testRequest; }
- (WKFrameInfo *)targetFrame { return self.testFrame; }
@end

@interface RNCNativeWindowTests : XCTestCase
@end

@implementation RNCNativeWindowTests
- (void)testHostBoundariesAndHTTPS
{
  NSArray *hosts = @[@"pay.example.com"];
  XCTAssertTrue(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://pay.example.com/pay"], hosts));
  XCTAssertTrue(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://sub.pay.example.com/pay"], hosts));
  XCTAssertTrue(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://PAY.EXAMPLE.COM/pay"], hosts));
  XCTAssertFalse(RNCNativeWindowAllowsURL([NSURL URLWithString:@"http://pay.example.com"], hosts));
  XCTAssertFalse(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://evilpay.example.com"], hosts));
  XCTAssertFalse(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://pay.example.com.evil.test"], hosts));
  XCTAssertFalse(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://pay.example.com@evil.test"], hosts));
  XCTAssertFalse(RNCNativeWindowAllowsURL([NSURL URLWithString:@"about:blank"], hosts));
  XCTAssertFalse(RNCNativeWindowAllowsURL(nil, hosts));
  XCTAssertFalse(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://pay.example.com"], @[]));
  XCTAssertFalse(RNCNativeWindowAllowsURL([NSURL URLWithString:@"https://pay.example.com"], @[@""]));
}

- (void)testChildConfigurationIsolationAndCustomUserAgent
{
  WKWebViewConfiguration *configuration = [WKWebViewConfiguration new];
  configuration.applicationNameForUserAgent = @"POPUP_TEST";
  configuration.websiteDataStore = [WKWebsiteDataStore nonPersistentDataStore];
  WKUserContentController *parentController = configuration.userContentController;
  [parentController addUserScript:[[WKUserScript alloc] initWithSource:@"window.parentInjected = true"
                                                       injectionTime:WKUserScriptInjectionTimeAtDocumentStart
                                                    forMainFrameOnly:NO]];
  RNCWebViewNativeWindow *window = [[RNCWebViewNativeWindow alloc] initWithConfiguration:configuration
                                                                         allowedHosts:@[@"example.com"]
                                                                            userAgent:@"Custom UA POPUP_TEST"];
  XCTAssertNotEqual(window.webView.configuration.userContentController, parentController);
  XCTAssertEqual(window.webView.configuration.userContentController.userScripts.count, 0);
  XCTAssertEqual(parentController.userScripts.count, 1);
  XCTAssertEqual(window.webView.configuration.websiteDataStore, configuration.websiteDataStore);
  XCTAssertEqualObjects(window.webView.configuration.applicationNameForUserAgent, @"POPUP_TEST");
  XCTAssertEqualObjects(window.webView.customUserAgent, @"Custom UA POPUP_TEST");
  [window close];
}

- (void)testCloseIsIdempotentAndReleasesTheChild
{
  RNCWebViewNativeWindow *window = [[RNCWebViewNativeWindow alloc] initWithConfiguration:[WKWebViewConfiguration new]
                                                                         allowedHosts:@[@"example.com"]
                                                                            userAgent:nil];
  __block NSUInteger closeCount = 0;
  window.onClose = ^{ closeCount++; };
  [window close];
  [window close];
  XCTAssertNil(window.webView);
  XCTAssertNil(window.onClose);
  XCTAssertEqual(closeCount, 1);
}

- (void)testContentProcessTerminationReleasesTheChild
{
  RNCWebViewNativeWindow *window = [[RNCWebViewNativeWindow alloc] initWithConfiguration:[WKWebViewConfiguration new]
                                                                         allowedHosts:@[@"example.com"]
                                                                            userAgent:nil];
  WKWebView *webView = window.webView;
  [window webViewWebContentProcessDidTerminate:webView];
  XCTAssertNil(window.webView);
  XCTAssertNil(webView.navigationDelegate);
  XCTAssertNil(webView.UIDelegate);
}

- (void)testNavigationPolicyRejectsUntrustedTopLevelAndNestedWindows
{
  RNCWebViewNativeWindow *window = [[RNCWebViewNativeWindow alloc] initWithConfiguration:[WKWebViewConfiguration new]
                                                                         allowedHosts:@[@"example.com"]
                                                                            userAgent:nil];
  RNCNativeWindowTestFrame *frame = [RNCNativeWindowTestFrame new];
  frame.testMainFrame = YES;
  RNCNativeWindowTestAction *action = [RNCNativeWindowTestAction new];
  action.testFrame = frame;
  for (NSString *address in @[@"https://example.com/pay", @"https://evil.test/", @"http://example.com/", @"about:blank", @"about:srcdoc"]) {
    action.testRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:address]];
    BOOL allowed = [address isEqualToString:@"https://example.com/pay"] || [address isEqualToString:@"about:blank"];
    [window webView:window.webView decidePolicyForNavigationAction:action decisionHandler:^(WKNavigationActionPolicy policy) {
      XCTAssertEqual(policy, allowed ? WKNavigationActionPolicyAllow : WKNavigationActionPolicyCancel);
    }];
  }
  action.testRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://evil.test/"]];
  frame.testMainFrame = NO;
  [window webView:window.webView decidePolicyForNavigationAction:action decisionHandler:^(WKNavigationActionPolicy policy) {
    XCTAssertEqual(policy, WKNavigationActionPolicyAllow);
  }];
  action.testFrame = nil;
  action.testRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://example.com/nested"]];
  [window webView:window.webView decidePolicyForNavigationAction:action decisionHandler:^(WKNavigationActionPolicy policy) {
    XCTAssertEqual(policy, WKNavigationActionPolicyCancel);
  }];
  [window close];
}
@end
