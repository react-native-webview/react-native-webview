#import <WebKit/WebKit.h>

#import <React/RCTConvert.h>

@implementation RCTConvert (WKDataDetectorTypes)

RCT_MULTI_ENUM_CONVERTER(
     WKDataDetectorTypes,
     (@{
       @"none" : @(WKDataDetectorTypeNone),
       @"phoneNumber" : @(WKDataDetectorTypePhoneNumber),
       @"link" : @(WKDataDetectorTypeLink),
       @"address" : @(WKDataDetectorTypeAddress),
       @"calendarEvent" : @(WKDataDetectorTypeCalendarEvent),
       @"trackingNumber" : @(WKDataDetectorTypeTrackingNumber),
       @"flightNumber" : @(WKDataDetectorTypeFlightNumber),
       @"lookupSuggestion" : @(WKDataDetectorTypeLookupSuggestion),
       @"all" : @(WKDataDetectorTypeAll),
     }),
     WKDataDetectorTypeNone,
     unsignedLongLongValue)

@end