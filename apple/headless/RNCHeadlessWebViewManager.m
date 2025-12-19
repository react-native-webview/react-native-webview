#import "RNCHeadlessWebViewManager.h"

@interface RNCHeadlessWebViewManager ()

@property (nonatomic, strong) NSMutableDictionary<NSNumber *, WKWebView *> *webviews;
@property (nonatomic, assign) NSInteger nextId;

@end

@implementation RNCHeadlessWebViewManager

+ (instancetype)sharedInstance {
    static RNCHeadlessWebViewManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[RNCHeadlessWebViewManager alloc] init];
    });
    return instance;
}

- (instancetype)init {
    if (self = [super init]) {
        _webviews = [NSMutableDictionary new];
        _nextId = 1;
    }
    return self;
}

- (NSInteger)createWebView {
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    
    // Default configuration
    config.allowsInlineMediaPlayback = YES;
    
    WKWebView *webview = [[WKWebView alloc] initWithFrame:CGRectZero configuration:config];
    
    NSInteger webviewId = self.nextId;
    self.nextId++;
    
    self.webviews[@(webviewId)] = webview;
    
    return webviewId;
}

- (nullable WKWebView *)getWebView:(NSInteger)webviewId {
    return self.webviews[@(webviewId)];
}

- (void)loadUrl:(NSInteger)webviewId url:(NSString *)url {
    WKWebView *webview = [self getWebView:webviewId];
    if (webview && url) {
        NSURL *nsUrl = [NSURL URLWithString:url];
        if (nsUrl) {
            NSURLRequest *request = [NSURLRequest requestWithURL:nsUrl];
            dispatch_async(dispatch_get_main_queue(), ^{
                [webview loadRequest:request];
            });
        }
    }
}

- (void)destroyWebView:(NSInteger)webviewId {
    WKWebView *webview = self.webviews[@(webviewId)];
    if (webview) {
        [webview stopLoading];
        [webview removeFromSuperview];
        [self.webviews removeObjectForKey:@(webviewId)];
    }
}

@end

