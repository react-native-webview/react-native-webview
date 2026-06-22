#import <WebKit/WebKit.h>

#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
#else
#import <React_Core/RCTConvert.h>
#endif

#if TARGET_OS_IPHONE
@interface RCTConvert (WKDataDetectorTypes)

+ (WKDataDetectorTypes)WKDataDetectorTypes:(id)json;

@end
#endif // TARGET_OS_IPHONE