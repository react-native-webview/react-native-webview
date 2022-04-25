#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

extern NSString * const kScriptMessageNotificationName;
extern NSString * const kMessageHandlerBodyKey;

@interface ScriptMessageEventEmitter : RCTEventEmitter <RCTBridgeModule>
@end
