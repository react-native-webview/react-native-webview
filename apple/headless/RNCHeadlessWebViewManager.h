#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNCHeadlessWebViewManager : NSObject

+ (instancetype)sharedInstance;

/// Creates a new WKWebView with default configuration and returns its unique ID
- (NSInteger)createWebView;

/// Returns the WKWebView for the given ID, or nil if not found
- (nullable WKWebView *)getWebView:(NSInteger)webviewId;

/// Loads a URL in the WebView with the given ID
- (void)loadUrl:(NSInteger)webviewId url:(NSString *)url;

/// Removes and releases the WebView with the given ID
- (void)destroyWebView:(NSInteger)webviewId;

@end

NS_ASSUME_NONNULL_END

