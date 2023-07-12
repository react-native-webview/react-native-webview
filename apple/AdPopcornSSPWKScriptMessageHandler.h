//
//  AdPopcornSSPWKScriptMessageHandler.h
//  RNCWebView
//
//  Created by UJ on 2023/05/11.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

@interface AdPopcornSSPWKScriptMessageHandler : NSObject<WKScriptMessageHandler>

@property (nonatomic, weak) id<WKScriptMessageHandler> scriptDelegate;
@property (nonatomic, weak) WKWebView *webView;

- (instancetype)initWithDelegate:(id<WKScriptMessageHandler>)scriptDelegate;

@end
