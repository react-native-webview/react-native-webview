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

auto stringToOnShouldStartLoadWithRequestNavigationTypeEnum(std::string value) {
    if (value == "click") return RNCWebViewEventEmitter::OnShouldStartLoadWithRequestNavigationType::Click;
    if (value == "formsubmit") return RNCWebViewEventEmitter::OnShouldStartLoadWithRequestNavigationType::Formsubmit;
    if (value == "backforward") return RNCWebViewEventEmitter::OnShouldStartLoadWithRequestNavigationType::Backforward;
    if (value == "reload") return RNCWebViewEventEmitter::OnShouldStartLoadWithRequestNavigationType::Reload;
    if (value == "formresubmit") return RNCWebViewEventEmitter::OnShouldStartLoadWithRequestNavigationType::Formresubmit;
    return RNCWebViewEventEmitter::OnShouldStartLoadWithRequestNavigationType::Other;
}

auto stringToOnLoadingStartNavigationTypeEnum(std::string value) {
    if (value == "click") return RNCWebViewEventEmitter::OnLoadingStartNavigationType::Click;
    if (value == "formsubmit") return RNCWebViewEventEmitter::OnLoadingStartNavigationType::Formsubmit;
    if (value == "backforward") return RNCWebViewEventEmitter::OnLoadingStartNavigationType::Backforward;
    if (value == "reload") return RNCWebViewEventEmitter::OnLoadingStartNavigationType::Reload;
    if (value == "formresubmit") return RNCWebViewEventEmitter::OnLoadingStartNavigationType::Formresubmit;
    return RNCWebViewEventEmitter::OnLoadingStartNavigationType::Other;
}

auto stringToOnLoadingFinishNavigationTypeEnum(std::string value) {
    if (value == "click") return RNCWebViewEventEmitter::OnLoadingFinishNavigationType::Click;
    if (value == "formsubmit") return RNCWebViewEventEmitter::OnLoadingFinishNavigationType::Formsubmit;
    if (value == "backforward") return RNCWebViewEventEmitter::OnLoadingFinishNavigationType::Backforward;
    if (value == "reload") return RNCWebViewEventEmitter::OnLoadingFinishNavigationType::Reload;
    if (value == "formresubmit") return RNCWebViewEventEmitter::OnLoadingFinishNavigationType::Formresubmit;
    return RNCWebViewEventEmitter::OnLoadingFinishNavigationType::Other;
}

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
        
        _view.onShouldStartLoadWithRequest = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnShouldStartLoadWithRequest data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .navigationType = stringToOnShouldStartLoadWithRequestNavigationTypeEnum(std::string([[dictionary valueForKey:@"navigationType"] UTF8String])),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .isTopFrame = [[dictionary valueForKey:@"isTopFrame"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue],
                    .mainDocumentURL = std::string([[dictionary valueForKey:@"mainDocumentURL"] UTF8String])
                };
                webViewEventEmitter->onShouldStartLoadWithRequest(data);
            };
        };
        _view.onLoadingStart = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnLoadingStart data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .navigationType = stringToOnLoadingStartNavigationTypeEnum(std::string([[dictionary valueForKey:@"navigationType"] UTF8String])),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue],
                    .mainDocumentURL = std::string([[dictionary valueForKey:@"mainDocumentURL"] UTF8String], [[dictionary valueForKey:@"mainDocumentURL"] lengthOfBytesUsingEncoding:NSUTF8StringEncoding])
                };
                webViewEventEmitter->onLoadingStart(data);
            }
        };
        _view.onLoadingError = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnLoadingError data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .code = [[dictionary valueForKey:@"code"] intValue],
                    .description = std::string([[dictionary valueForKey:@"description"] UTF8String]),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue],
                    .domain = std::string([[dictionary valueForKey:@"domain"] UTF8String])
                };
                webViewEventEmitter->onLoadingError(data);
            }
        };
        _view.onMessage = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnMessage data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue],
                    .data = std::string([[dictionary valueForKey:@"data"] UTF8String])
                };
                webViewEventEmitter->onMessage(data);
            }
        };
        _view.onFileDownload = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnFileDownload data = {
                    .downloadUrl = std::string([[dictionary valueForKey:@"downloadUrl"] UTF8String])
                };
                webViewEventEmitter->onFileDownload(data);
            }
        };
        _view.onLoadingFinish = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnLoadingFinish data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .navigationType = stringToOnLoadingFinishNavigationTypeEnum(std::string([[dictionary valueForKey:@"navigationType"] UTF8String], [[dictionary valueForKey:@"navigationType"] lengthOfBytesUsingEncoding:NSUTF8StringEncoding])),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue],
                    .mainDocumentURL = std::string([[dictionary valueForKey:@"mainDocumentURL"] UTF8String], [[dictionary valueForKey:@"mainDocumentURL"] lengthOfBytesUsingEncoding:NSUTF8StringEncoding])
                };
                webViewEventEmitter->onLoadingFinish(data);
            }
        };
        _view.onLoadingProgress = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnLoadingProgress data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue],
                    .progress = [[dictionary valueForKey:@"progress"] doubleValue]
                };
                webViewEventEmitter->onLoadingProgress(data);
            }
        };
        _view.onContentProcessDidTerminate = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnContentProcessDidTerminate data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue]
                };
                webViewEventEmitter->onContentProcessDidTerminate(data);
            }
        };
        _view.onCustomMenuSelection = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnCustomMenuSelection data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue],
                    .selectedText = std::string([[dictionary valueForKey:@"selectedText"] UTF8String]),
                    .key = std::string([[dictionary valueForKey:@"key"] UTF8String]),
                    .label = std::string([[dictionary valueForKey:@"label"] UTF8String])
                    
                };
                webViewEventEmitter->onCustomMenuSelection(data);
            }
        };
        _view.onScroll = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                NSDictionary* contentOffset = [dictionary valueForKey:@"contentOffset"];
                NSDictionary* contentInset = [dictionary valueForKey:@"contentInset"];
                NSDictionary* contentSize = [dictionary valueForKey:@"contentSize"];
                NSDictionary* layoutMeasurement = [dictionary valueForKey:@"layoutMeasurement"];
                double zoomScale = [[dictionary valueForKey:@"zoomScale"] doubleValue];

                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnScroll data = {
                    .contentOffset = {
                        .x = [[contentOffset valueForKey:@"x"] doubleValue],
                        .y = [[contentOffset valueForKey:@"y"] doubleValue]
                    },
                    .contentInset = {
                        .left = [[contentInset valueForKey:@"left"] doubleValue],
                        .right = [[contentInset valueForKey:@"right"] doubleValue],
                        .top = [[contentInset valueForKey:@"top"] doubleValue],
                        .bottom = [[contentInset valueForKey:@"bottom"] doubleValue]
                    },
                    .contentSize = {
                        .width = [[contentSize valueForKey:@"width"] doubleValue],
                        .height = [[contentSize valueForKey:@"height"] doubleValue]
                    },
                    .layoutMeasurement = {
                        .width = [[layoutMeasurement valueForKey:@"width"] doubleValue],
                        .height = [[layoutMeasurement valueForKey:@"height"] doubleValue]                    },
                    .zoomScale = zoomScale
                };
                webViewEventEmitter->onScroll(data);
            }
        };
        _view.onHttpError = [self](NSDictionary* dictionary) {
            if (_eventEmitter) {
                auto webViewEventEmitter = std::static_pointer_cast<RNCWebViewEventEmitter const>(_eventEmitter);
                facebook::react::RNCWebViewEventEmitter::OnHttpError data = {
                    .url = std::string([[dictionary valueForKey:@"url"] UTF8String]),
                    .lockIdentifier = [[dictionary valueForKey:@"lockIdentifier"] doubleValue],
                    .title = std::string([[dictionary valueForKey:@"title"] UTF8String]),
                    .statusCode = [[dictionary valueForKey:@"statusCode"] intValue],
                    .description = std::string([[dictionary valueForKey:@"description"] UTF8String]),
                    .canGoBack = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .canGoForward = [[dictionary valueForKey:@"canGoBack"] boolValue],
                    .loading = [[dictionary valueForKey:@"loading"] boolValue]
                };
                webViewEventEmitter->onHttpError(data);
            }
        };
        self.contentView = _view;
    }
    return self;
}

- (void)updateEventEmitter:(EventEmitter::Shared const &)eventEmitter
{
    [super updateEventEmitter:eventEmitter];
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNCWebViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNCWebViewProps const>(props);

#define REMAP_WEBVIEW_PROP(name)                    \
    if (oldViewProps.name != newViewProps.name) {   \
        _view.name = newViewProps.name;             \
    }

#define REMAP_WEBVIEW_STRING_PROP(name)                             \
    if (oldViewProps.name != newViewProps.name) {                   \
        _view.name = RCTNSStringFromString(newViewProps.name);      \
    }

    REMAP_WEBVIEW_PROP(scrollEnabled)
    REMAP_WEBVIEW_STRING_PROP(injectedJavaScript)
    REMAP_WEBVIEW_STRING_PROP(injectedJavaScriptBeforeContentLoaded)
    REMAP_WEBVIEW_PROP(injectedJavaScriptForMainFrameOnly)
    REMAP_WEBVIEW_PROP(injectedJavaScriptBeforeContentLoadedForMainFrameOnly)
    REMAP_WEBVIEW_PROP(javaScriptEnabled)
    REMAP_WEBVIEW_PROP(javaScriptCanOpenWindowsAutomatically)
    REMAP_WEBVIEW_PROP(allowFileAccessFromFileURLs)
    REMAP_WEBVIEW_PROP(allowUniversalAccessFromFileURLs)
    REMAP_WEBVIEW_PROP(allowsInlineMediaPlayback)
    REMAP_WEBVIEW_PROP(allowsAirPlayForMediaPlayback)
    REMAP_WEBVIEW_PROP(mediaPlaybackRequiresUserAction)
    REMAP_WEBVIEW_PROP(automaticallyAdjustContentInsets)
    REMAP_WEBVIEW_PROP(autoManageStatusBarEnabled)
    REMAP_WEBVIEW_PROP(hideKeyboardAccessoryView)
    REMAP_WEBVIEW_PROP(allowsBackForwardNavigationGestures)
    REMAP_WEBVIEW_PROP(incognito)
    REMAP_WEBVIEW_PROP(pagingEnabled)
    REMAP_WEBVIEW_STRING_PROP(applicationNameForUserAgent)
    REMAP_WEBVIEW_PROP(cacheEnabled)
    REMAP_WEBVIEW_PROP(allowsLinkPreview)
    REMAP_WEBVIEW_STRING_PROP(allowingReadAccessToURL)
    
    REMAP_WEBVIEW_PROP(messagingEnabled)
    REMAP_WEBVIEW_PROP(enableApplePay)
//    RCT_EXPORT_VIEW_PROPERTY(menuItems, NSArray);
//    RCT_EXPORT_VIEW_PROPERTY(onCustomMenuSelection, RCTDirectEventBlock)
    REMAP_WEBVIEW_PROP(pullToRefreshEnabled)
    REMAP_WEBVIEW_PROP(bounces)
    REMAP_WEBVIEW_PROP(useSharedProcessPool)
    REMAP_WEBVIEW_STRING_PROP(userAgent)
    REMAP_WEBVIEW_PROP(sharedCookiesEnabled)
    #if !TARGET_OS_OSX
    REMAP_WEBVIEW_PROP(decelerationRate)
    #endif // !TARGET_OS_OSX
    REMAP_WEBVIEW_PROP(directionalLockEnabled)
    REMAP_WEBVIEW_PROP(showsHorizontalScrollIndicator)
    REMAP_WEBVIEW_PROP(showsVerticalScrollIndicator)
    REMAP_WEBVIEW_PROP(keyboardDisplayRequiresUserAction)
    
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000 /* __IPHONE_13_0 */
    REMAP_WEBVIEW_PROP(automaticallyAdjustContentInsets)
#endif
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 140000 /* iOS 14 */
    REMAP_WEBVIEW_PROP(limitsNavigationsToAppBoundDomains)
#endif
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 140500 /* iOS 14.5 */
    REMAP_WEBVIEW_PROP(textInteractionEnabled)
#endif
    
    if (oldViewProps.source.uri != newViewProps.source.uri) {
        [_view setSource:@{
            @"uri": RCTNSStringFromString(newViewProps.source.uri),
        }];
    }
    if (oldViewProps.dataDetectorTypes != newViewProps.dataDetectorTypes) {
        WKDataDetectorTypes dataDetectorTypes = WKDataDetectorTypeNone;
        for (const auto &dataDetectorType: newViewProps.dataDetectorTypes) {
            if (dataDetectorType == "address") {
                dataDetectorTypes |= WKDataDetectorTypeAddress;
            } else if (dataDetectorType == "link") {
                dataDetectorTypes |= WKDataDetectorTypeLink;
            } else if (dataDetectorType == "calendarEvent") {
                dataDetectorTypes |= WKDataDetectorTypeCalendarEvent;
            } else if (dataDetectorType == "trackingNumber") {
                dataDetectorTypes |= WKDataDetectorTypeTrackingNumber;
            } else if (dataDetectorType == "flightNumber") {
                dataDetectorTypes |= WKDataDetectorTypeFlightNumber;
            } else if (dataDetectorType == "lookupSuggestion") {
                dataDetectorTypes |= WKDataDetectorTypeLookupSuggestion;
            } else if (dataDetectorType == "phoneNumber") {
                dataDetectorTypes |= WKDataDetectorTypePhoneNumber;
            } else if (dataDetectorType == "all") {
                dataDetectorTypes |= WKDataDetectorTypeAll;
            } else if (dataDetectorType == "none") {
                dataDetectorTypes = WKDataDetectorTypeNone;
            }
        }
        [_view setDataDetectorTypes:dataDetectorTypes];
    }
    if (oldViewProps.contentInset.top != newViewProps.contentInset.top || oldViewProps.contentInset.left != newViewProps.contentInset.left || oldViewProps.contentInset.right != newViewProps.contentInset.right || oldViewProps.contentInset.bottom != newViewProps.contentInset.bottom) {
        UIEdgeInsets edgesInsets = {
            .top = newViewProps.contentInset.top,
            .left = newViewProps.contentInset.left,
            .right = newViewProps.contentInset.right,
            .bottom = newViewProps.contentInset.bottom
        };
        [_view setContentInset: edgesInsets];
    }

    if (oldViewProps.basicAuthCredential.username != newViewProps.basicAuthCredential.username || oldViewProps.basicAuthCredential.password != newViewProps.basicAuthCredential.password) {
        [_view setBasicAuthCredential: @{
            @"username": RCTNSStringFromString(newViewProps.basicAuthCredential.username),
            @"password": RCTNSStringFromString(newViewProps.basicAuthCredential.password)
        }];
    }
    if (oldViewProps.contentInsetAdjustmentBehavior != newViewProps.contentInsetAdjustmentBehavior) {
        if (newViewProps.contentInsetAdjustmentBehavior == "never") {
            [_view setContentInsetAdjustmentBehavior: UIScrollViewContentInsetAdjustmentNever];
        } else if (newViewProps.contentInsetAdjustmentBehavior == "automatic") {
            [_view setContentInsetAdjustmentBehavior: UIScrollViewContentInsetAdjustmentAutomatic];
        } else if (newViewProps.contentInsetAdjustmentBehavior == "scrollableAxes") {
            [_view setContentInsetAdjustmentBehavior: UIScrollViewContentInsetAdjustmentScrollableAxes];
        } else if (newViewProps.contentInsetAdjustmentBehavior == "always") {
            [_view setContentInsetAdjustmentBehavior: UIScrollViewContentInsetAdjustmentAlways];
        }
    }

//
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000 /* iOS 13 */
    if (oldViewProps.contentMode != newViewProps.contentMode) {
        if (newViewProps.contentMode == "recommended") {
            [_view setContentMode: WKContentModeRecommended];
        } else if (newViewProps.contentMode == "mobile") {
            [_view setContentMode:WKContentModeMobile];
        } else if (newViewProps.contentMode == "desktop") {
            [_view setContentMode:WKContentModeDesktop];
        }
    }
#endif

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 150000 /* iOS 15 */
    if (oldViewProps.mediaCapturePermissionGrantType != newViewProps.mediaCapturePermissionGrantType) {
        if (newViewProps.mediaCapturePermissionGrantType == "prompt") {
            [_view setMediaCapturePermissionGrantType:RNCWebViewPermissionGrantType_Prompt];
        } else if (newViewProps.mediaCapturePermissionGrantType == "grant") {
            [_view setMediaCapturePermissionGrantType:RNCWebViewPermissionGrantType_Grant];
        } else if (newViewProps.mediaCapturePermissionGrantType == "deny") {
            [_view setMediaCapturePermissionGrantType:RNCWebViewPermissionGrantType_Deny];
        }else if (newViewProps.mediaCapturePermissionGrantType == "grantIfSameHostElsePrompt") {
            [_view setMediaCapturePermissionGrantType:RNCWebViewPermissionGrantType_GrantIfSameHost_ElsePrompt];
        }else if (newViewProps.mediaCapturePermissionGrantType == "grantIfSameHostElseDeny") {
            [_view setMediaCapturePermissionGrantType:RNCWebViewPermissionGrantType_GrantIfSameHost_ElseDeny];
        }
    }
#endif
    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNCWebViewCls(void)
{
    return RNCWebView.class;
}

@end
#endif
