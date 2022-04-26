#import <WebKit/WebKit.h>

@interface RNCWKWebViewTableManager : NSObject

+ (instancetype) sharedManager;
- (NSMapTable *)sharedWKWebViewTable;

@end
