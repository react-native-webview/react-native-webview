#import "CustomWebViewManager.h"

#import "CustomWebView.h"

#import <React/RCTDefines.h>
#import <React/RCTUIManager.h>

@implementation CustomWebViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(exampleCommand:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, CustomWebView *> *viewRegistry) {
    CustomWebView *view = [viewRegistry objectForKey:reactTag];
    if (![view isKindOfClass:[CustomWebView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting CustomWebView, got: %@", view);
    } else {
      [view reload];
    }
  }];
}

@end
