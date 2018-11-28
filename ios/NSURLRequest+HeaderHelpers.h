//
//  NSURLRequest+HeaderHelpers.h
//  RNCWebView
//
//  Created by matt cascone on 27/11/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSURLRequest (HeaderHelpers)

- (BOOL) containsHeader:(NSString *)headerKey withValue:(NSString *)headerValue;
- (BOOL) containsHeaders:(NSDictionary *)headers;

@end

NS_ASSUME_NONNULL_END
