#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCWebViewModule.h"

#import <React/RCTFabricComponentsPlugins.h>

#import "RNCWebViewDecisionManager.h"

@implementation RNCWebViewModule

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(shouldStartLoadWithLockIdentifier:(BOOL)shouldStart lockIdentifier:(double)lockIdentifier)
{
    [[RNCWebViewDecisionManager getInstance] setResult:shouldStart forLockIdentifier:(int)lockIdentifier];
}

RCT_EXPORT_METHOD(isFileUploadSupported:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    if (resolve) {
        resolve(@(YES));
    }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNCWebViewSpecJSI>(params);
}

@end

Class RNCWebViewModuleCls(void) {
  return RNCWebViewModule.class;
}
#endif /* RCT_NEW_ARCH_ENABLED */
