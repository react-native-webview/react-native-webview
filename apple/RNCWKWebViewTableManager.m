#import <Foundation/Foundation.h>
#import "RNCWKWebViewTableManager.h"

@interface RNCWKWebViewTableManager() {
    NSMapTable *_sharedWKWebViewTable;
    NSMutableDictionary *_sharedWKWebViewDictionary;

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

- (NSMapTable *)sharedWKWebViewTable {
    if (!_sharedWKWebViewTable) {
//        _sharedWKWebViewTable = [[NSMapTable alloc] init];
        _sharedWKWebViewTable = [NSMapTable strongToStrongObjectsMapTable];
    }
    return _sharedWKWebViewTable;
}

- (NSMutableDictionary *)sharedWKWebViewDictionary {
    if (!_sharedWKWebViewDictionary) {
//        _sharedWKWebViewTable = [[NSMapTable alloc] init];
        _sharedWKWebViewDictionary = [[NSMutableDictionary alloc] init];
//        _sharedWKWebViewTable = [NSMapTable strongToStrongObjectsMapTable];
    }
    return _sharedWKWebViewDictionary;
}

@end

