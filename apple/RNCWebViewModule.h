// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED

#import "RNCWebViewSpec/RNCWebViewSpec.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNCWebViewModule : NSObject <NativeRNCWebViewSpec>

@end

NS_ASSUME_NONNULL_END

#endif /* RCT_NEW_ARCH_ENABLED */
