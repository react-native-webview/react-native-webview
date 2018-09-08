#import <React/RCTView.h>

@class RCTUIWebView;

/**
 * Special scheme used to pass messages to the injectedJavaScript
 * code without triggering a page load. Usage:
 *
 *   window.location.href = RNCJSNavigationScheme + '://hello'
 */
extern NSString *const RNCJSNavigationScheme;

@protocol RCTUIWebViewDelegate <NSObject>

- (BOOL)webView:(RCTUIWebView *)webView
shouldStartLoadForRequest:(NSMutableDictionary<NSString *, id> *)request
   withCallback:(RCTDirectEventBlock)callback;

@end

@interface RCTUIWebView : RCTView

@property (nonatomic, weak) id<RCTUIWebViewDelegate> delegate;

@property (nonatomic, copy) NSDictionary *source;
@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) BOOL automaticallyAdjustContentInsets;
@property (nonatomic, assign) BOOL messagingEnabled;
@property (nonatomic, copy) NSString *injectedJavaScript;
@property (nonatomic, assign) BOOL scalesPageToFit;

- (void)goForward;
- (void)goBack;
- (void)reload;
- (void)stopLoading;
- (void)postMessage:(NSString *)message;
- (void)injectJavaScript:(NSString *)script;

@end
