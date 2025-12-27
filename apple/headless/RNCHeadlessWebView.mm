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
        // Only remove from superview if the webview is still our child
        // It might have already been moved to another component
        if (_attachedWebView.superview == self) {
            [_attachedWebView removeFromSuperview];
        }
        _attachedWebView = nil;
        _currentWebViewId = -1;
    }
}

- (void)attachWebView:(NSInteger)webviewId
{
    // Check if already properly attached (same id AND actually our subview)
    // The webview might have been "stolen" by another component
    if (_currentWebViewId == webviewId && _attachedWebView != nil && _attachedWebView.superview == self) {
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
    // Only set frame if webview is still our subview (might have been stolen)
    if (_attachedWebView && _attachedWebView.superview == self) {
        _attachedWebView.frame = self.bounds;
    }
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNCHeadlessWebViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNCHeadlessWebViewProps const>(props);

    // Reattach if:
    // 1. webviewId changed, OR
    // 2. No webview attached (after prepareForRecycle), OR
    // 3. Webview was "stolen" by another component
    BOOL needsAttach = oldViewProps.webviewId != newViewProps.webviewId ||
                       _attachedWebView == nil ||
                       _attachedWebView.superview != self;

    if (needsAttach) {
        [self attachWebView:(NSInteger)newViewProps.webviewId];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNCHeadlessWebViewCls(void)
{
    return RNCHeadlessWebView.class;
}

@end

