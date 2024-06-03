#import "RNCWebViewModule.h"

#import "RNCWebViewDecisionManager.h"

@implementation RNCWebViewModule

RCT_EXPORT_MODULE(RNCWebViewModule)

RCT_EXPORT_METHOD(isFileUploadSupported:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    if (resolve) {
        resolve(@(YES));
    }
}

RCT_EXPORT_METHOD(shouldStartLoadWithLockIdentifier:(BOOL)shouldStart lockIdentifier:(double)lockIdentifier)
{
    [[RNCWebViewDecisionManager getInstance] setResult:shouldStart forLockIdentifier:(int)lockIdentifier];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeRNCWebViewSpecJSI>(params);
}
#endif /* RCT_NEW_ARCH_ENABLED */

@end

Class RNCWebViewModuleCls(void) {
  return RNCWebViewModule.class;
}
