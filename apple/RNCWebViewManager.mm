#import <React/RCTViewManager.h>
#import "RNCWebViewImpl.h"
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCWebViewSpec/RNCWebViewSpec.h"
#endif

@interface RNCWebViewManager : RCTViewManager
@end

@implementation RCTConvert (WKWebView)
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000 /* iOS 13 */
RCT_ENUM_CONVERTER(WKContentMode, (@{
  @"recommended": @(WKContentModeRecommended),
  @"mobile": @(WKContentModeMobile),
  @"desktop": @(WKContentModeDesktop),
}), WKContentModeRecommended, integerValue)
#endif

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 150000 /* iOS 15 */
RCT_ENUM_CONVERTER(RNCWebViewPermissionGrantType, (@{
  @"grantIfSameHostElsePrompt": @(RNCWebViewPermissionGrantType_GrantIfSameHost_ElsePrompt),
  @"grantIfSameHostElseDeny": @(RNCWebViewPermissionGrantType_GrantIfSameHost_ElseDeny),
  @"deny": @(RNCWebViewPermissionGrantType_Deny),
  @"grant": @(RNCWebViewPermissionGrantType_Grant),
  @"prompt": @(RNCWebViewPermissionGrantType_Prompt),
}), RNCWebViewPermissionGrantType_Prompt, integerValue)
#endif
@end


@implementation RNCWebViewManager {
    NSConditionLock *_shouldStartLoadLock;
    BOOL _shouldStartLoad;
}

RCT_EXPORT_MODULE(RNCWebView)

- (UIView *)view
{
return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onFileDownload, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingStart, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingFinish, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingProgress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onHttpError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onShouldStartLoadWithRequest, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onContentProcessDidTerminate, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(injectedJavaScript, NSString)
RCT_EXPORT_VIEW_PROPERTY(injectedJavaScriptBeforeContentLoaded, NSString)
RCT_EXPORT_VIEW_PROPERTY(injectedJavaScriptForMainFrameOnly, BOOL)
RCT_EXPORT_VIEW_PROPERTY(injectedJavaScriptBeforeContentLoadedForMainFrameOnly, BOOL)
RCT_EXPORT_VIEW_PROPERTY(javaScriptEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(javaScriptCanOpenWindowsAutomatically, BOOL)
RCT_EXPORT_VIEW_PROPERTY(allowFileAccessFromFileURLs, BOOL)
RCT_EXPORT_VIEW_PROPERTY(allowUniversalAccessFromFileURLs, BOOL)
RCT_EXPORT_VIEW_PROPERTY(allowsInlineMediaPlayback, BOOL)
RCT_EXPORT_VIEW_PROPERTY(allowsAirPlayForMediaPlayback, BOOL)
RCT_EXPORT_VIEW_PROPERTY(mediaPlaybackRequiresUserAction, BOOL)
#if WEBKIT_IOS_10_APIS_AVAILABLE
RCT_EXPORT_VIEW_PROPERTY(dataDetectorTypes, WKDataDetectorTypes)
#endif
RCT_EXPORT_VIEW_PROPERTY(contentInset, UIEdgeInsets)
RCT_EXPORT_VIEW_PROPERTY(automaticallyAdjustContentInsets, BOOL)
RCT_EXPORT_VIEW_PROPERTY(autoManageStatusBarEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(hideKeyboardAccessoryView, BOOL)
RCT_EXPORT_VIEW_PROPERTY(allowsBackForwardNavigationGestures, BOOL)
RCT_EXPORT_VIEW_PROPERTY(incognito, BOOL)
RCT_EXPORT_VIEW_PROPERTY(pagingEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(applicationNameForUserAgent, NSString)
RCT_EXPORT_VIEW_PROPERTY(cacheEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(allowsLinkPreview, BOOL)
RCT_EXPORT_VIEW_PROPERTY(allowingReadAccessToURL, NSString)
RCT_EXPORT_VIEW_PROPERTY(basicAuthCredential, NSDictionary)

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 110000 /* __IPHONE_11_0 */
RCT_EXPORT_VIEW_PROPERTY(contentInsetAdjustmentBehavior, UIScrollViewContentInsetAdjustmentBehavior)
#endif
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000 /* __IPHONE_13_0 */
RCT_EXPORT_VIEW_PROPERTY(automaticallyAdjustsScrollIndicatorInsets, BOOL)
#endif

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000 /* iOS 13 */
RCT_EXPORT_VIEW_PROPERTY(contentMode, WKContentMode)
#endif

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 140000 /* iOS 14 */
RCT_EXPORT_VIEW_PROPERTY(limitsNavigationsToAppBoundDomains, BOOL)
#endif

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 140500 /* iOS 14.5 */
RCT_EXPORT_VIEW_PROPERTY(textInteractionEnabled, BOOL)
#endif

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 150000 /* iOS 15 */
RCT_EXPORT_VIEW_PROPERTY(mediaCapturePermissionGrantType, RNCWebViewPermissionGrantType)
#endif

/**
 * Expose methods to enable messaging the webview.
 */
RCT_EXPORT_VIEW_PROPERTY(messagingEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onMessage, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onScroll, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(enableApplePay, BOOL)
RCT_EXPORT_VIEW_PROPERTY(menuItems, NSArray);
RCT_EXPORT_VIEW_PROPERTY(onCustomMenuSelection, RCTDirectEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(pullToRefreshEnabled, BOOL, RNCWebViewImpl) {
  view.pullToRefreshEnabled = json == nil ? false : [RCTConvert BOOL: json];
}

RCT_CUSTOM_VIEW_PROPERTY(bounces, BOOL, RNCWebViewImpl) {
  view.bounces = json == nil ? true : [RCTConvert BOOL: json];
}

RCT_CUSTOM_VIEW_PROPERTY(useSharedProcessPool, BOOL, RNCWebViewImpl) {
  view.useSharedProcessPool = json == nil ? true : [RCTConvert BOOL: json];
}

RCT_CUSTOM_VIEW_PROPERTY(userAgent, NSString, RNCWebViewImpl) {
  view.userAgent = [RCTConvert NSString: json];
}

RCT_CUSTOM_VIEW_PROPERTY(scrollEnabled, BOOL, RNCWebViewImpl) {
  view.scrollEnabled = json == nil ? true : [RCTConvert BOOL: json];
}

RCT_CUSTOM_VIEW_PROPERTY(sharedCookiesEnabled, BOOL, RNCWebViewImpl) {
  view.sharedCookiesEnabled = json == nil ? false : [RCTConvert BOOL: json];
}

#if !TARGET_OS_OSX
RCT_CUSTOM_VIEW_PROPERTY(decelerationRate, CGFloat, RNCWebViewImpl) {
  view.decelerationRate = json == nil ? UIScrollViewDecelerationRateNormal : [RCTConvert CGFloat: json];
}
#endif // !TARGET_OS_OSX

RCT_CUSTOM_VIEW_PROPERTY(directionalLockEnabled, BOOL, RNCWebViewImpl) {
  view.directionalLockEnabled = json == nil ? true : [RCTConvert BOOL: json];
}

RCT_CUSTOM_VIEW_PROPERTY(showsHorizontalScrollIndicator, BOOL, RNCWebViewImpl) {
  view.showsHorizontalScrollIndicator = json == nil ? true : [RCTConvert BOOL: json];
}

RCT_CUSTOM_VIEW_PROPERTY(showsVerticalScrollIndicator, BOOL, RNCWebViewImpl) {
  view.showsVerticalScrollIndicator = json == nil ? true : [RCTConvert BOOL: json];
}

RCT_CUSTOM_VIEW_PROPERTY(keyboardDisplayRequiresUserAction, BOOL, RNCWebViewImpl) {
  view.keyboardDisplayRequiresUserAction = json == nil ? true : [RCTConvert BOOL: json];
}

- (BOOL)          webView:(RNCWebViewImpl *)webView
shouldStartLoadForRequest:(NSMutableDictionary<NSString *, id> *)request
             withCallback:(RCTDirectEventBlock)callback
{
  _shouldStartLoadLock = [[NSConditionLock alloc] initWithCondition:arc4random()];
  _shouldStartLoad = YES;
  request[@"lockIdentifier"] = @(_shouldStartLoadLock.condition);
  callback(request);

  // Block the main thread for a maximum of 250ms until the JS thread returns
  if ([_shouldStartLoadLock lockWhenCondition:0 beforeDate:[NSDate dateWithTimeIntervalSinceNow:.25]]) {
    BOOL returnValue = _shouldStartLoad;
    [_shouldStartLoadLock unlock];
    _shouldStartLoadLock = nil;
    return returnValue;
  } else {
    RCTLogWarn(@"Did not receive response to shouldStartLoad in time, defaulting to YES");
    return YES;
  }
}

RCT_EXPORT_METHOD(shouldStartLoadWithLockIdentifier:(BOOL)shouldStart
                                        lockIdentifier:(double)lockIdentifier)
{
  if ([_shouldStartLoadLock tryLockWhenCondition:lockIdentifier]) {
    _shouldStartLoad = shouldStart;
    [_shouldStartLoadLock unlockWithCondition:0];
  } else {
    RCTLogWarn(@"shouldStartLoadWithLockIdentifier invoked with invalid lockIdentifier: "
               "got %lld, expected %lld", (long long)lockIdentifier, (long long)_shouldStartLoadLock.condition);
  }
}

// Thanks to this guard, we won't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNCWebViewSpecJSI>(params);
}
#endif

@end
