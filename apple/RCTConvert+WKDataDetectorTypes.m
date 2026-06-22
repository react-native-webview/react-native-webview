#import <WebKit/WebKit.h>

#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
#else
#import <React_Core/RCTConvert.h>
#endif

#if TARGET_OS_IPHONE

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

#endif // TARGET_OS_IPHONE