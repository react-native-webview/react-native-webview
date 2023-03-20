#import "HourglassWebViewManager.h"
#import "HourglassWebView.h"
#import <React/RCTUIManager.h>
#import <React/RCTDefines.h>

@implementation HourglassWebViewManager

RCT_EXPORT_MODULE()

#if !TARGET_OS_OSX
- (UIView *)view
#else
- (RCTUIView *)view
#endif // !TARGET_OS_OSX
{
  HourglassWebView *webView = [HourglassWebView new];
  webView.delegate = self;
  return webView;
}

RCT_EXPORT_VIEW_PROPERTY(history, NSArray)

@end
