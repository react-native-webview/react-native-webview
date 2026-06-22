#ifndef RNCWebViewModule_h
#define RNCWebViewModule_h

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCWebViewSpec/RNCWebViewSpec.h"
#endif /* RCT_NEW_ARCH_ENABLED */

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import <React_Core/RCTBridgeModule.h>
#endif

NS_ASSUME_NONNULL_BEGIN

@interface RNCWebViewModule : NSObject <
#ifdef RCT_NEW_ARCH_ENABLED
NativeRNCWebViewModuleSpec
#else
RCTBridgeModule
#endif /* RCT_NEW_ARCH_ENABLED */
>
@end

NS_ASSUME_NONNULL_END

#endif /* RNCWebViewModule_h */
