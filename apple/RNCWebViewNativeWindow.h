#import <TargetConditionals.h>

#if TARGET_OS_IOS
#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

BOOL RNCNativeWindowAllowsURL(NSURL * _Nullable url, NSArray<NSString *> * _Nullable hosts);

@interface RNCWebViewNativeWindow : UIViewController <WKUIDelegate, WKNavigationDelegate, UIAdaptivePresentationControllerDelegate>
@property (nonatomic, strong, readonly, nullable) WKWebView *webView;
@property (nonatomic, copy, nullable) void (^onClose)(void);
- (instancetype)initWithConfiguration:(WKWebViewConfiguration *)configuration
                         allowedHosts:(NSArray<NSString *> *)allowedHosts
                            userAgent:(NSString * _Nullable)userAgent;
- (void)close;
@end

NS_ASSUME_NONNULL_END
#endif
