#import "RNCHeadlessWebViewModule.h"
#import "RNCHeadlessWebViewManager.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTFabricComponentsPlugins.h>
#endif

@implementation RNCHeadlessWebViewModule

RCT_EXPORT_MODULE(RNCHeadlessWebViewModule)

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, create)
{
    NSInteger webviewId = [[RNCHeadlessWebViewManager sharedInstance] createWebView];
    return @(webviewId);
}

RCT_EXPORT_METHOD(loadUrl:(double)webviewId url:(NSString *)url)
{
    [[RNCHeadlessWebViewManager sharedInstance] loadUrl:(NSInteger)webviewId url:url];
}

RCT_EXPORT_METHOD(destroy:(double)webviewId)
{
    [[RNCHeadlessWebViewManager sharedInstance] destroyWebView:(NSInteger)webviewId];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeRNCHeadlessWebViewModuleSpecJSI>(params);
}
#endif

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end

