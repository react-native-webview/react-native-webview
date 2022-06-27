//
//  SubWebView.h
//  RNCWebView
//
//  Created by Artem Litchmanov on 2022-06-27.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface SubWebView : WKWebView
@property (nonatomic, assign) BOOL defaultMenuItemsVisible;

@end

NS_ASSUME_NONNULL_END
