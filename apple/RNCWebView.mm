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
    if (oldViewProps.dataDetectorTypes != newViewProps.dataDetectorTypes) {
        [_view setDataDetectorTypes:newViewProps.dataDetectorTypes];
    }
    

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNCWebViewCls(void)
{
return RNCWebView.class;
}

@end
#endif
