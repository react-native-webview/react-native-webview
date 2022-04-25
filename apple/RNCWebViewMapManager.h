#import <WebKit/WebKit.h>

@interface RNCWebViewMapManager : NSObject
+ (instancetype) sharedManager;
- (NSMutableDictionary *)sharedRNCWebViewDictionary;
@end
