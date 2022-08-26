// This guard prevent the code from being compiled in the old architecture
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCWebView.h"
#import "RNCWebViewImpl.h"

#import <react/renderer/components/RNCWebViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNCWebViewSpec/EventEmitters.h>
#import <react/renderer/components/RNCWebViewSpec/Props.h>
#import <react/renderer/components/RNCWebViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNCWebView () <RCTRNCWebViewViewProtocol>

@end

@implementation RNCWebView {
    RNCWebViewImpl * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNCWebViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNCWebViewProps>();
    _props = defaultProps;

    _view = [[RNCWebViewImpl alloc] init];

    self.contentView = _view;
}

return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNCWebViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNCWebViewProps const>(props);

//    if (oldViewProps.color != newViewProps.color) {
//        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
//        [_view setBackgroundColor:[self hexStringToColor:colorToConvert]];
//    }
    if (oldViewProps.source.uri != newViewProps.source.uri) {
        [_view setSource:@{
            @"uri": [[NSString alloc] initWithUTF8String: newViewProps.source.uri.c_str()],
        }];
    }
    if (oldViewProps.scrollEnabled != newViewProps.scrollEnabled) {
        [_view setScrollEnabled:newViewProps.scrollEnabled];
    }
    if (oldViewProps.injectedJavaScript != newViewProps.injectedJavaScript) {
        [_view setInjectedJavaScript: [[NSString alloc] initWithUTF8String: newViewProps.injectedJavaScript.c_str()]];
    }
    if (oldViewProps.injectedJavaScriptBeforeContentLoaded != newViewProps.injectedJavaScriptBeforeContentLoaded) {
        [_view setInjectedJavaScriptBeforeContentLoaded: [[NSString alloc] initWithUTF8String: newViewProps.injectedJavaScriptBeforeContentLoaded.c_str()]];
    }
    if (oldViewProps.injectedJavaScriptForMainFrameOnly != newViewProps.injectedJavaScriptForMainFrameOnly) {
        [_view setInjectedJavaScriptForMainFrameOnly:newViewProps.injectedJavaScriptForMainFrameOnly];
    }
    if (oldViewProps.injectedJavaScriptBeforeContentLoadedForMainFrameOnly != newViewProps.injectedJavaScriptBeforeContentLoadedForMainFrameOnly) {
        [_view setInjectedJavaScriptBeforeContentLoadedForMainFrameOnly:newViewProps.injectedJavaScriptBeforeContentLoadedForMainFrameOnly];
    }
    if (oldViewProps.javaScriptEnabled != newViewProps.javaScriptEnabled) {
        [_view setJavaScriptEnabled:newViewProps.javaScriptEnabled];
    }
    if (oldViewProps.javaScriptCanOpenWindowsAutomatically != newViewProps.javaScriptCanOpenWindowsAutomatically) {
        [_view setJavaScriptCanOpenWindowsAutomatically:newViewProps.javaScriptCanOpenWindowsAutomatically];
    }
    if (oldViewProps.allowFileAccessFromFileURLs != newViewProps.allowFileAccessFromFileURLs) {
        [_view setAllowFileAccessFromFileURLs:newViewProps.allowFileAccessFromFileURLs];
    }
    if (oldViewProps.allowUniversalAccessFromFileURLs != newViewProps.allowUniversalAccessFromFileURLs) {
        [_view setAllowUniversalAccessFromFileURLs:newViewProps.allowUniversalAccessFromFileURLs];
    }
    if (oldViewProps.allowsInlineMediaPlayback != newViewProps.allowsInlineMediaPlayback) {
        [_view setAllowsInlineMediaPlayback:newViewProps.allowsInlineMediaPlayback];
    }
    
    if (oldViewProps.allowsAirPlayForMediaPlayback != newViewProps.allowsAirPlayForMediaPlayback) {
        [_view setAllowsAirPlayForMediaPlayback:newViewProps.allowsAirPlayForMediaPlayback];
    }
    if (oldViewProps.mediaPlaybackRequiresUserAction != newViewProps.mediaPlaybackRequiresUserAction) {
        [_view setMediaPlaybackRequiresUserAction:newViewProps.mediaPlaybackRequiresUserAction];
    }
#if WEBKIT_IOS_10_APIS_AVAILABLE
    if (oldViewProps.dataDetectorTypes != newViewProps.dataDetectorTypes) {
        // TODO: FIXME
        // [_view setDataDetectorTypes:newViewProps.dataDetectorTypes];
    }
#endif
    if (oldViewProps.contentInset.top != newViewProps.contentInset.top || oldViewProps.contentInset.left != newViewProps.contentInset.left || oldViewProps.contentInset.right != newViewProps.contentInset.right || oldViewProps.contentInset.bottom != newViewProps.contentInset.bottom) {
        UIEdgeInsets edgesInsets = {
            .top = newViewProps.contentInset.top,
            .left = newViewProps.contentInset.left,
            .right = newViewProps.contentInset.right,
            .bottom = newViewProps.contentInset.bottom
        };
        [_view setContentInset: edgesInsets];
    }
    if (oldViewProps.automaticallyAdjustContentInsets != newViewProps.automaticallyAdjustContentInsets) {
        [_view setAutomaticallyAdjustContentInsets:newViewProps.automaticallyAdjustContentInsets];
    }
    if (oldViewProps.autoManageStatusBarEnabled != newViewProps.autoManageStatusBarEnabled) {
        [_view setAutoManageStatusBarEnabled:newViewProps.autoManageStatusBarEnabled];
    }
    if (oldViewProps.hideKeyboardAccessoryView != newViewProps.hideKeyboardAccessoryView) {
        [_view setHideKeyboardAccessoryView:newViewProps.hideKeyboardAccessoryView];
    }
    if (oldViewProps.allowsBackForwardNavigationGestures != newViewProps.allowsBackForwardNavigationGestures) {
        [_view setAllowsBackForwardNavigationGestures:newViewProps.allowsBackForwardNavigationGestures];
    }
    if (oldViewProps.incognito != newViewProps.incognito) {
        [_view setIncognito:newViewProps.incognito];
    }
    if (oldViewProps.pagingEnabled != newViewProps.pagingEnabled) {
        [_view setPagingEnabled:newViewProps.pagingEnabled];
    }
    if (oldViewProps.applicationNameForUserAgent != newViewProps.applicationNameForUserAgent) {
        [_view setApplicationNameForUserAgent:[[NSString alloc] initWithUTF8String: newViewProps.applicationNameForUserAgent.c_str()]];
    }
    if (oldViewProps.cacheEnabled != newViewProps.cacheEnabled) {
        [_view setCacheEnabled:newViewProps.cacheEnabled];
    }
    if (oldViewProps.allowsLinkPreview != newViewProps.allowsLinkPreview) {
        [_view setAllowsLinkPreview:newViewProps.allowsLinkPreview];
    }
    if (oldViewProps.allowingReadAccessToURL != newViewProps.allowingReadAccessToURL) {
        [_view setAllowingReadAccessToURL:[[NSString alloc] initWithUTF8String: newViewProps.allowingReadAccessToURL.c_str()]];
    }
    if (oldViewProps.basicAuthCredential.username != newViewProps.basicAuthCredential.username || oldViewProps.basicAuthCredential.password != newViewProps.basicAuthCredential.password) {
        [_view setBasicAuthCredential: @{
            @"username": [[NSString alloc] initWithUTF8String: newViewProps.basicAuthCredential.username.c_str()],
            @"password": [[NSString alloc] initWithUTF8String: newViewProps.basicAuthCredential.password.c_str()]
        }];
    }
    
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 110000 /* __IPHONE_11_0 */
    if (oldViewProps.contentInsetAdjustmentBehavior != newViewProps.contentInsetAdjustmentBehavior) {
        [_view setContentInsetAdjustmentBehavior: UIScrollViewContentInsetAdjustmentNever];
    }
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
    
    
    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNCWebViewCls(void)
{
return RNCWebView.class;
}

@end
#endif
