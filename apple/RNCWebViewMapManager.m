#import <Foundation/Foundation.h>
#import "RNCWebViewMapManager.h"

@interface RNCWebViewMapManager() {
  NSMutableDictionary *_sharedRNCWebViewDictionary;
}
@end

@implementation RNCWebViewMapManager

+ (id) sharedManager {
  static RNCWebViewMapManager *_sharedManager = nil;
  @synchronized(self) {
    if(_sharedManager == nil) {
      _sharedManager = [[super alloc] init];
    }
    return _sharedManager;
  }
}

- (NSMutableDictionary *)sharedRNCWebViewDictionary; {
  if (!_sharedRNCWebViewDictionary) {
    _sharedRNCWebViewDictionary = [[NSMutableDictionary alloc] init];
  }
  return _sharedRNCWebViewDictionary;
}

@end

