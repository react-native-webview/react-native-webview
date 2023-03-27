#import <Foundation/Foundation.h>
#import "RNCScriptMessageManager.h"
#import "ScriptMessageEventEmitter.h"
#import "RNCWebView.h"
#import "RNCWKWebViewMapManager.h"

@implementation RNCScriptMessageHandler

- (instancetype)initWithName:(NSString *)name withWebViewKey:(NSString *)webViewKey {
  self = [super init];
  if (self) {
    _name = name;
    _webViewKey = webViewKey;
  }
  return self;
}

- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
  WKWebView *webView = [[RNCWKWebViewMapManager sharedManager] sharedWKWebViewDictionary][_webViewKey];
  if (webView != nil) {
    NSMutableDictionary<NSString *, id> *event = [RNCWebView createEventFromMessage:message withMessageBodyKey:kMessageHandlerBodyKey withWebView:webView];
    event[@"webViewKey"] = _webViewKey;
    [[NSNotificationCenter defaultCenter] postNotificationName:kScriptMessageNotificationName object:self userInfo:event];
  }
}

@end

@interface RNCScriptMessageManager() {
  NSMutableDictionary *_sharedMessageHandlerDictionary;
}
@end

@implementation RNCScriptMessageManager

+ (id) sharedManager {
  static RNCScriptMessageManager *_sharedManager = nil;
  @synchronized(self) {
    if(_sharedManager== nil) {
      _sharedManager = [[super alloc] init];
    }
    return _sharedManager;
  }
}

- (NSMutableDictionary *)sharedMessageHandlerDictionary {
  if (!_sharedMessageHandlerDictionary) {
    _sharedMessageHandlerDictionary = [[NSMutableDictionary alloc] init];
  }
  return _sharedMessageHandlerDictionary;
}

- (void)addScriptMessageHandlerWithName:(NSString *)name withUserContentController:(WKUserContentController *)userContentController withWebViewKey:(NSString *)webViewKey {
  RNCScriptMessageHandler* scriptMessageHandler = [[RNCScriptMessageHandler alloc] initWithName:name withWebViewKey:webViewKey];
  [userContentController addScriptMessageHandler: scriptMessageHandler name:name];
  
  [self sharedMessageHandlerDictionary][webViewKey] = scriptMessageHandler;
}

-(void)removeScriptMessageHandlerWithUserContentController:(WKUserContentController *)userContentController withWebViewKey:(NSString *)webViewKey {
  RNCScriptMessageHandler* scriptMessageHandler = [self sharedMessageHandlerDictionary][webViewKey];
  
  if (scriptMessageHandler != nil) {
    [userContentController removeScriptMessageHandlerForName: [scriptMessageHandler name]];
    [self sharedMessageHandlerDictionary][webViewKey] = nil;
  }
}

@end
