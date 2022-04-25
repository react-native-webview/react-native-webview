#import "ScriptMessageEventEmitter.h"
#import <Foundation/Foundation.h>

#import <React/RCTDefines.h>
#import <React/RCTBridgeModule.h>

NSString * const kScriptMessageNotificationName = @"ScriptMessageNotificationName";
NSString * const kMessageHandlerBodyKey = @"data";

@implementation ScriptMessageEventEmitter
{
  BOOL _hasListeners;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"onMessage"];
}

// Will be called when this module's first listener is added.
- (void)startObserving
{
  _hasListeners = YES;
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onMessageNotification:)  name:kScriptMessageNotificationName object:nil];
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving
{
  _hasListeners = NO;
  [[NSNotificationCenter defaultCenter] removeObserver:self name:kScriptMessageNotificationName object:nil];
}

- (void) onMessageNotification:(NSNotification *) notification
{
  if (_hasListeners && [[notification name] isEqualToString:kScriptMessageNotificationName]) {
    NSDictionary* userInfo = notification.userInfo;
    [self sendEventWithName:@"onMessage" body:userInfo];
  }
}

@end
