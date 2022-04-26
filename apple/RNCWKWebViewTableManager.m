#import <Foundation/Foundation.h>
#import "RNCWKWebViewTableManager.h"

@interface RNCWKWebViewTableManager() {
    NSMapTable *_sharedWKWebViewTable;
}
@end

@implementation RNCWKWebViewTableManager

+ (id) sharedManager {
    static RNCWKWebViewTableManager *_sharedManager = nil;
    @synchronized(self) {
        if(_sharedManager == nil) {
            _sharedManager = [[super alloc] init];
        }
        return _sharedManager;
    }
}

- (NSMapTable *)sharedProcessPool {
    if (!_sharedWKWebViewTable) {
        _sharedWKWebViewTable = [[NSMapTable alloc] init];
    }
    return _sharedWKWebViewTable;
}

@end

