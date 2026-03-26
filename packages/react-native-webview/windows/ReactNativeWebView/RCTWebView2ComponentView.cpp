// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "RCTWebView2ComponentView.h"
#include "ReactWebViewHelpers.h"

#ifdef RNW_NEW_ARCH

#include <winrt/Windows.Foundation.Metadata.h>
#include <winrt/Windows.System.h>
#include <winrt/Windows.Data.Json.h>
#include <winrt/Windows.Web.Http.h>
#include <winrt/Windows.Storage.Streams.h>
#include <winrt/Windows.Security.Cryptography.h>
#include <limits>
#include <optional>

namespace winrt::ReactNativeWebView::implementation {

void RegisterRCTWebView2ComponentView(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept {
    
    // Verify we can QI for IReactPackageBuilderFabric
    auto fabricBuilder = packageBuilder.try_as<winrt::Microsoft::ReactNative::IReactPackageBuilderFabric>();
    if (!fabricBuilder) {
        return;
    }
    
    RNCWebViewCodegen::RegisterRCTWebView2NativeComponent<RCTWebView2ComponentView>(
        packageBuilder,
        [](const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder &builder) {
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().XamlSupport(true);
            
            // Use SetContentIslandComponentViewInitializer for XAML hosting
            builder.SetContentIslandComponentViewInitializer(
                [](const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) noexcept {
                    auto userData = winrt::make_self<RCTWebView2ComponentView>();
                    userData->InitializeContentIsland(islandView);
                    islandView.UserData(*userData);
                });
            
            // Set up initial state with zero size
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetInitialStateDataFactory(
                [](const winrt::Microsoft::ReactNative::IComponentProps& /*props*/) noexcept {
                    return winrt::make<RCTWebView2StateData>(winrt::Windows::Foundation::Size{0, 0});
                });

            // Register the measure function - WebView fills available space
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetMeasureContentHandler(
                [](winrt::Microsoft::ReactNative::ShadowNode const& /*shadowNode*/,
                   winrt::Microsoft::ReactNative::LayoutContext const&,
                   winrt::Microsoft::ReactNative::LayoutConstraints const& constraints) noexcept {
                    // WebView should fill available space. Cap infinity to reasonable defaults.
                    float w = constraints.MaximumSize.Width;
                    float h = constraints.MaximumSize.Height;
                    if (w == std::numeric_limits<float>::infinity() || w <= 0) w = 300;
                    if (h == std::numeric_limits<float>::infinity() || h <= 0) h = 200;
                    return winrt::Windows::Foundation::Size{w, h};
                });

            // Handle state updates
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetUpdateStateHandler(
                [](const winrt::Microsoft::ReactNative::ComponentView& view,
                   const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept {
                    try {
                        auto islandView = view.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
                        auto userData = islandView.UserData().as<RCTWebView2ComponentView>();
                        userData->UpdateState(view, newState);
                    } catch (...) {
                        // Silently handle state update failures
                    }
                });
        });
}

void RCTWebView2ComponentView::InitializeContentIsland(
    const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) {
    
    // Create WebView2 control
    m_webView = winrt::Microsoft::UI::Xaml::Controls::WebView2();
    m_webView.HorizontalAlignment(winrt::Microsoft::UI::Xaml::HorizontalAlignment::Stretch);
    m_webView.VerticalAlignment(winrt::Microsoft::UI::Xaml::VerticalAlignment::Stretch);

    // NOTE: SizeChanged → RefreshSize → UpdateStateWithMutation loop disabled.
    // This caused infinite recursion with sibling components (TextInput).
    // WebView fills available space via Yoga constraints instead.
    // m_webView.SizeChanged([this](auto const& /*sender*/, auto const& /*args*/) {
    //     RefreshSize();
    // });

    // Register WebView2 events
    RegisterEvents();

    // Create XamlIsland and connect
    m_island = winrt::Microsoft::UI::Xaml::XamlIsland{};
    m_island.Content(m_webView);
    islandView.Connect(m_island.ContentIsland());
    m_islandView = winrt::make_weak(islandView);
    
    // Explicitly trigger CoreWebView2 initialization.
    // In XamlIsland hosting, the WebView2 won't auto-initialize its browser process.
    m_webView.EnsureCoreWebView2Async();
}

void RCTWebView2ComponentView::UpdateProps(
    const winrt::Microsoft::ReactNative::ComponentView &view,
    const winrt::com_ptr<RNCWebViewCodegen::RCTWebView2Props> &newProps,
    const winrt::com_ptr<RNCWebViewCodegen::RCTWebView2Props> &oldProps) noexcept {
    
    try {
        BaseRCTWebView2::UpdateProps(view, newProps, oldProps);
    } catch (...) {
        // Continue with prop application even if base fails
    }
    
    if (!m_webView || !newProps) {
        return;
    }
    
    m_updating = true;

    // Apply messaging enabled
    m_messagingEnabled = newProps->messagingEnabled;
    
    // Apply link handling
    if (newProps->linkHandlingEnabled.has_value()) {
        m_linkHandlingEnabled = newProps->linkHandlingEnabled.value();
    }
    
    // Apply injected JavaScript
    if (newProps->injectedJavaScript.has_value()) {
        m_injectedJavascript = winrt::to_hstring(newProps->injectedJavaScript.value());
    }
    
    // Apply user agent
    if (newProps->userAgent.has_value()) {
        m_userAgent = winrt::to_hstring(newProps->userAgent.value());
        if (m_webView.CoreWebView2()) {
            m_webView.CoreWebView2().Settings().UserAgent(m_userAgent);
        }
    }
    
    // Handle source navigation
    if (newProps->newSource.uri.has_value() && !newProps->newSource.uri.value().empty()) {
        try {
            auto uri = winrt::Windows::Foundation::Uri(winrt::to_hstring(newProps->newSource.uri.value()));
            m_webView.Source(uri);
        } catch (...) {
            // Invalid URI
        }
    } else if (newProps->newSource.html.has_value() && !newProps->newSource.html.value().empty()) {
        if (m_webView.CoreWebView2()) {
            try {
                m_webView.NavigateToString(winrt::to_hstring(newProps->newSource.html.value()));
            } catch (...) {
                // Navigation failed
            }
        } else {
            // CoreWebView2 not ready yet - save HTML for later navigation in OnCoreWebView2Initialized
            m_pendingHtml = newProps->newSource.html.value();
        }
    }
    
    // Apply debugging enabled
    if (newProps->webviewDebuggingEnabled.has_value() && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().Settings().AreDevToolsEnabled(newProps->webviewDebuggingEnabled.value());
    }
    
    // Apply JavaScript enabled
    if (m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().Settings().IsScriptEnabled(newProps->javaScriptEnabled);
    }

    m_updating = false;
}

void RCTWebView2ComponentView::RefreshSize() {
    if (!m_webView) {
        return;
    }
    
    try {
        m_webView.Measure(winrt::Windows::Foundation::Size{
            std::numeric_limits<float>::infinity(),
            std::numeric_limits<float>::infinity()
        });

        auto desiredSize = m_webView.DesiredSize();

        if (m_state) {
            auto currentState = winrt::get_self<RCTWebView2StateData>(m_state.Data());
            if (desiredSize != currentState->desiredSize) {
                m_state.UpdateStateWithMutation([desiredSize](winrt::Windows::Foundation::IInspectable /*data*/) {
                    return winrt::make<RCTWebView2StateData>(desiredSize);
                });
            }
        }
    } catch (...) {
        // RefreshSize failure is non-fatal
    }
}

void RCTWebView2ComponentView::UpdateState(
    const winrt::Microsoft::ReactNative::ComponentView& /*view*/,
    const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept {
    m_state = newState;
}

void RCTWebView2ComponentView::UpdateLayoutMetrics(
    const winrt::Microsoft::ReactNative::ComponentView& /*view*/,
    const winrt::Microsoft::ReactNative::LayoutMetrics& newLayoutMetrics,
    const winrt::Microsoft::ReactNative::LayoutMetrics& /*oldLayoutMetrics*/) noexcept {
    if (m_webView && newLayoutMetrics.Frame.Width > 0 && newLayoutMetrics.Frame.Height > 0) {
        m_webView.Width(newLayoutMetrics.Frame.Width);
        m_webView.Height(newLayoutMetrics.Frame.Height);
    }
}

void RCTWebView2ComponentView::RegisterEvents() {
    if (!m_webView) return;
    
    m_navigationStartingRevoker = m_webView.NavigationStarting(
        winrt::auto_revoke, [this](auto const& /*sender*/, auto const& args) {
            OnNavigationStarting(args);
        });

    m_navigationCompletedRevoker = m_webView.NavigationCompleted(
        winrt::auto_revoke, [this](auto const& /*sender*/, auto const& args) {
            OnNavigationCompleted(args);
        });

    m_CoreWebView2InitializedRevoker = m_webView.CoreWebView2Initialized(
        winrt::auto_revoke, [this](auto const& /*sender*/, auto const& args) {
            OnCoreWebView2Initialized(args);
        });
}

void RCTWebView2ComponentView::RegisterCoreWebView2Events() {
    if (!m_webView || !m_webView.CoreWebView2()) return;
    
    auto coreWebView = m_webView.CoreWebView2();
    
    m_webResourceRequestedRevoker = coreWebView.WebResourceRequested(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2ResourceRequested(sender, args);
        });

    m_CoreWebView2DOMContentLoadedRevoker = coreWebView.DOMContentLoaded(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2DOMContentLoaded(sender, args);
        });

    m_sourceChangedRevoker = coreWebView.SourceChanged(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2SourceChanged(sender, args);
        });

    m_newWindowRequestedRevoker = coreWebView.NewWindowRequested(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2NewWindowRequested(sender, args);
        });
}

bool RCTWebView2ComponentView::Is17763OrHigher() {
    static std::optional<bool> hasUniversalAPIContract_v7;
    if (!hasUniversalAPIContract_v7.has_value()) {
        hasUniversalAPIContract_v7 = winrt::Windows::Foundation::Metadata::ApiInformation::IsApiContractPresent(
            L"Windows.Foundation.UniversalApiContract", 7);
    }
    return hasUniversalAPIContract_v7.value();
}

void RCTWebView2ComponentView::OnNavigationStarting(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationStartingEventArgs const& /*args*/) {
    
    try {
        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnLoadingStart event;
            if (m_webView && m_webView.Source()) {
                event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
            }
            event.loading = true;
            event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
            event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
            event.navigationType = "other";
            eventEmitter->onLoadingStart(event);
        }
    } catch (...) {
        // Event dispatch failure is non-fatal
    }

    if (m_messagingEnabled && m_webView) {
        try {
            if (m_messageToken) {
                m_webView.WebMessageReceived(m_messageToken);
            }
            m_messageToken = m_webView.WebMessageReceived(
                [this](auto const& /*sender*/, winrt::Microsoft::Web::WebView2::Core::CoreWebView2WebMessageReceivedEventArgs const& messageArgs) {
                    try {
                        auto message = messageArgs.TryGetWebMessageAsString();
                        OnMessagePosted(message);
                    } catch (...) {
                        return;
                    }
                });
        } catch (...) {
            // WebMessageReceived registration failure
        }
    }
}

void RCTWebView2ComponentView::OnNavigationCompleted(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationCompletedEventArgs const& /*args*/) {
    
    try {
        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnLoadingFinish event;
            if (m_webView && m_webView.Source()) {
                event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
            }
            event.loading = false;
            event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
            event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
            event.navigationType = "other";
            eventEmitter->onLoadingFinish(event);
        }
    } catch (...) {
        // Event dispatch failure is non-fatal
    }

    if (m_messagingEnabled && m_webView) {
        try {
            winrt::hstring message = LR"(
                window.alert = function (msg) {window.chrome.webview.postMessage(`{"type":"__alert","message":"${msg}"}`)};
                window.ReactNativeWebView = {postMessage: function (data) {window.chrome.webview.postMessage(String(data))}};
                const originalPostMessage = globalThis.postMessage;
                globalThis.postMessage = function (data) { originalPostMessage(data); globalThis.ReactNativeWebView.postMessage(typeof data == 'string' ? data : JSON.stringify(data));};
                window.chrome.webview.addEventListener('message', function(e) {
                    window.dispatchEvent(new MessageEvent('message', {data: e.data}));
                    document.dispatchEvent(new MessageEvent('message', {data: e.data}));
                });
            )";
            m_webView.ExecuteScriptAsync(message);
        } catch (...) {
            // JS injection failure
        }
    }
}

void RCTWebView2ComponentView::OnCoreWebView2Initialized(
    winrt::Microsoft::UI::Xaml::Controls::CoreWebView2InitializedEventArgs const& /*args*/) {
    
    if (!m_webView || !m_webView.CoreWebView2()) return;
    
    RegisterCoreWebView2Events();
    
    // Apply user agent if set
    if (!m_userAgent.empty()) {
        m_webView.CoreWebView2().Settings().UserAgent(m_userAgent);
    }
    
    // Navigate to deferred HTML source if pending
    if (!m_pendingHtml.empty()) {
        try {
            m_webView.NavigateToString(winrt::to_hstring(m_pendingHtml));
        } catch (...) {
            // Deferred navigation failed
        }
        m_pendingHtml.clear();
    }
}

void RCTWebView2ComponentView::OnCoreWebView2ResourceRequested(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& /*sender*/,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2WebResourceRequestedEventArgs const& /*args*/) {
    // Handle web resource requests if needed
}

void RCTWebView2ComponentView::OnCoreWebView2DOMContentLoaded(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& sender,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2DOMContentLoadedEventArgs const& /*args*/) {
    
    if (!m_injectedJavascript.empty()) {
        sender.ExecuteScriptAsync(m_injectedJavascript);
    }
}

void RCTWebView2ComponentView::OnCoreWebView2SourceChanged(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& /*sender*/,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2SourceChangedEventArgs const& /*args*/) {
    
    if (auto eventEmitter = EventEmitter()) {
        RNCWebViewCodegen::RCTWebView2EventEmitter::OnSourceChanged event;
        if (m_webView && m_webView.Source()) {
            event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
        }
        event.loading = false;
        event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
        event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
        event.navigationType = "other";
        eventEmitter->onSourceChanged(event);
    }
}

void RCTWebView2ComponentView::OnCoreWebView2NewWindowRequested(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& /*sender*/,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2NewWindowRequestedEventArgs const& args) {
    
    if (m_linkHandlingEnabled) {
        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnOpenWindow event;
            event.targetUrl = winrt::to_string(args.Uri());
            eventEmitter->onOpenWindow(event);
        }
        args.Handled(true);
    } else {
        try {
            winrt::Windows::Foundation::Uri uri(args.Uri());
            winrt::Windows::System::Launcher::LaunchUriAsync(uri);
            args.Handled(true);
        } catch (winrt::hresult_error&) {
            // Do Nothing
        }
    }
}

void RCTWebView2ComponentView::OnMessagePosted(winrt::hstring const& message) {
    HandleMessageFromJS(message);
}

void RCTWebView2ComponentView::HandleMessageFromJS(winrt::hstring const& message) {
    try {
        winrt::Windows::Data::Json::JsonObject jsonObject;
        if (winrt::Windows::Data::Json::JsonObject::TryParse(message, jsonObject) && jsonObject.HasKey(L"type")) {
            if (auto v = jsonObject.Lookup(L"type"); v && v.ValueType() == winrt::Windows::Data::Json::JsonValueType::String) {
                auto type = v.GetString();
                if (type == L"__alert") {
                    // Use Win32 MessageBoxW instead of UWP MessageDialog which is incompatible
                    // with Win32/WinAppSDK Composition apps
                    auto alertMsg = jsonObject.GetNamedString(L"message");
                    MessageBoxW(nullptr, alertMsg.c_str(), L"Alert", MB_OK);
                    return;
                }
            }
        }

        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnMessage event;
            if (m_webView && m_webView.Source()) {
                event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
            }
            event.data = winrt::to_string(message);
            event.loading = false;
            event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
            event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
            eventEmitter->onMessage(event);
        }
    } catch (...) {
        // Message handling failure is non-fatal
    }
}

void RCTWebView2ComponentView::WriteCookiesToWebView2(std::string const& cookies) {
    if (!m_webView || !m_webView.CoreWebView2()) return;
    
    auto cookieManager = m_webView.CoreWebView2().CookieManager();
    auto cookiesList = ReactWebViewHelpers::SplitString(cookies, ";,");
    for (const auto& cookie_str : cookiesList) {
        auto cookieData = ReactWebViewHelpers::ParseSetCookieHeader(ReactWebViewHelpers::TrimString(cookie_str));

        if (!cookieData.count("Name") || !cookieData.count("Value")) {
            continue;
        }

        auto cookie = cookieManager.CreateCookie(
            winrt::to_hstring(cookieData["Name"]),
            winrt::to_hstring(cookieData["Value"]),
            cookieData.count("Domain") ? winrt::to_hstring(cookieData["Domain"]) : L"",
            cookieData.count("Path") ? winrt::to_hstring(cookieData["Path"]) : L"");
        cookieManager.AddOrUpdateCookie(cookie);
    }
}

// Command handlers
void RCTWebView2ComponentView::HandleGoBackCommand() noexcept {
    if (m_webView && m_webView.CanGoBack()) {
        m_webView.GoBack();
    }
}

void RCTWebView2ComponentView::HandleGoForwardCommand() noexcept {
    if (m_webView && m_webView.CanGoForward()) {
        m_webView.GoForward();
    }
}

void RCTWebView2ComponentView::HandleReloadCommand() noexcept {
    if (m_webView) {
        m_webView.Reload();
    }
}

void RCTWebView2ComponentView::HandleStopLoadingCommand() noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().Stop();
    }
}

void RCTWebView2ComponentView::HandleInjectJavaScriptCommand(std::string javascript) noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().ExecuteScriptAsync(winrt::to_hstring(javascript));
    }
}

void RCTWebView2ComponentView::HandleRequestFocusCommand() noexcept {
    if (m_webView) {
        m_webView.Focus(winrt::Microsoft::UI::Xaml::FocusState::Programmatic);
    }
}

void RCTWebView2ComponentView::HandlePostMessageCommand(std::string data) noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().PostWebMessageAsString(winrt::to_hstring(data));
    }
}

void RCTWebView2ComponentView::HandleLoadUrlCommand(std::string url) noexcept {
    if (m_webView) {
        m_webView.Source(winrt::Windows::Foundation::Uri(winrt::to_hstring(url)));
    }
}

void RCTWebView2ComponentView::HandleClearCacheCommand(bool /*includeDiskFiles*/) noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        auto profile = m_webView.CoreWebView2().Profile();
        if (profile) {
            profile.ClearBrowsingDataAsync();
        }
    }
}

} // namespace winrt::ReactNativeWebView::implementation

#endif // RNW_NEW_ARCH
