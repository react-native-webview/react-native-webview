#ifndef RNCWebViewManager_h
#define RNCWebViewManager_h

#if __has_include(<React/RCTViewManager.h>)
#import <React/RCTViewManager.h>
#else
#import <React_Core/RCTViewManager.h>
#endif

@interface RNCWebViewManager : RCTViewManager
@end

#endif /* RNCWebViewManager_h */
