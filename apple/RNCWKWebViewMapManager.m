#import <Foundation/Foundation.h>
#import "RNCWKWebViewMapManager.h"

@interface RNCWKWebViewMapManager() {
  NSMutableDictionary *_sharedWKWebViewDictionary;
}
@end

@implementation RNCWKWebViewMapManager

+ (id) sharedManager {
  static RNCWKWebViewMapManager *_sharedManager = nil;
  @synchronized(self) {
    if(_sharedManager == nil) {
      _sharedManager = [[super alloc] init];
    }
    return _sharedManager;
  }
}

- (NSMutableDictionary *)sharedWKWebViewDictionary {
  if (!_sharedWKWebViewDictionary) {
    _sharedWKWebViewDictionary = [[NSMutableDictionary alloc] init];
  }
  return _sharedWKWebViewDictionary;
}

@end
