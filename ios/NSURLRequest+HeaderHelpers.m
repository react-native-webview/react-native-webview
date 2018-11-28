//
//  NSURLRequest+HeaderHelpers.m
//  RNCWebView
//
//  Created by matt cascone on 27/11/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "NSURLRequest+HeaderHelpers.h"

@implementation NSURLRequest (HeaderHelpers)
- (BOOL) containsHeader:(nonnull NSString *)headerKey withValue:(nonnull NSString *)headerValue {
    NSDictionary *currentHeaders = self.allHTTPHeaderFields;
    if (currentHeaders == nil) {
        return NO;
    }
    
    NSArray *headerKeys = currentHeaders.allKeys;
    if ([headerKeys containsObject:headerKey]) {
        NSString *currentValue = [currentHeaders valueForKey:headerKey];
        return [headerValue caseInsensitiveCompare:currentValue] == NSOrderedSame;
    }
    
    return NO;
}

- (BOOL) containsHeaders:(NSDictionary *)headers {
    for (NSString *key in headers) {
        if (![self containsHeader:key withValue:[headers valueForKey:key]]) {
            return NO;
        }
    }
    
    return YES;
}

@end
