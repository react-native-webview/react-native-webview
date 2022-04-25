#import <WebKit/WebKit.h>

@interface RNCWKWebViewMapManager : NSObject
+ (instancetype) sharedManager;
- (NSMutableDictionary *)sharedWKWebViewDictionary;
@end
