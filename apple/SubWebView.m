//
//  SubWebView.m
//  RNCWebView
//
//  Created by Artem Litchmanov on 2022-06-27.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "SubWebView.h"

@implementation SubWebView
  - (BOOL)canPerformAction:(SEL)action withSender:(id)sender
  {
    if (self.defaultMenuItemsVisible) {
      return [super canPerformAction:action withSender:sender];

    }
    return NO;
  }
@end
