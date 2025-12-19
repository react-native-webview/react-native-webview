#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCHeadlessWebView.h"
#import "RNCHeadlessWebViewManager.h"

#import <react/renderer/components/RNCWebViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNCWebViewSpec/EventEmitters.h>
#import <react/renderer/components/RNCWebViewSpec/Props.h>
#import <react/renderer/components/RNCWebViewSpec/RCTComponentViewHelpers.h>

#import <React/RCTFabricComponentsPlugins.h>

#import <WebKit/WebKit.h>

using namespace facebook::react;

@interface RNCHeadlessWebView () <RCTRNCHeadlessWebViewViewProtocol>

@end

@implementation RNCHeadlessWebView {
    WKWebView *_attachedWebView;
    NSInteger _currentWebViewId;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNCHeadlessWebViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNCHeadlessWebViewProps>();
        _props = defaultProps;
        _currentWebViewId = -1;
        _attachedWebView = nil;
    }
    return self;
}

- (void)prepareForRecycle
{
    [super prepareForRecycle];
    [self detachWebView];
}

- (void)detachWebView
{
    if (_attachedWebView) {
        [_attachedWebView removeFromSuperview];
        _attachedWebView = nil;
        _currentWebViewId = -1;
    }
}

- (void)attachWebView:(NSInteger)webviewId
{
    if (_currentWebViewId == webviewId && _attachedWebView != nil) {
        // Already attached
        return;
    }
    
    // Detach previous if any
    [self detachWebView];
    
    WKWebView *webview = [[RNCHeadlessWebViewManager sharedInstance] getWebView:webviewId];
    if (webview) {
        _attachedWebView = webview;
        _currentWebViewId = webviewId;
        
        webview.frame = self.bounds;
        webview.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        [self addSubview:webview];
    }
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    if (_attachedWebView) {
        _attachedWebView.frame = self.bounds;
    }
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNCHeadlessWebViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNCHeadlessWebViewProps const>(props);
    
    if (oldViewProps.webviewId != newViewProps.webviewId) {
        [self attachWebView:(NSInteger)newViewProps.webviewId];
    }
    
    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNCHeadlessWebViewCls(void)
{
    return RNCHeadlessWebView.class;
}

@end
#endif

