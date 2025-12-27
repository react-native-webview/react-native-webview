#import "RNCHeadlessWebViewModule.h"
#import "RNCHeadlessWebViewManager.h"

@implementation RNCHeadlessWebViewModule

- (NSNumber *)create {
    NSInteger webviewId = [[RNCHeadlessWebViewManager sharedInstance] createWebView];
    return @(webviewId);
}

- (void)loadUrl:(double)webviewId url:(NSString *)url {
    [[RNCHeadlessWebViewManager sharedInstance] loadUrl:(NSInteger)webviewId url:url];
}

- (void)destroy:(double)webviewId {
    [[RNCHeadlessWebViewManager sharedInstance] destroyWebView:(NSInteger)webviewId];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeHeadlessWebViewModuleSpecJSI>(params);
}

+ (NSString *)moduleName {
    return @"RNCHeadlessWebViewModule";
}

@end

