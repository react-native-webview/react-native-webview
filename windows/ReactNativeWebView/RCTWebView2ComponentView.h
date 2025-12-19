// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once

#include "pch.h"

#ifdef RNW_NEW_ARCH

#include "codegen_manual/react/components/RNCWebViewSpec/RCTWebView2.g.h"

#include <winrt/Microsoft.ReactNative.h>
#include <winrt/Microsoft.ReactNative.Composition.h>
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#include <winrt/Microsoft.UI.Xaml.h>
#include <winrt/Microsoft.Web.WebView2.Core.h>

namespace winrt::ReactNativeWebView::implementation {

// State to store the WebView2 size
struct RCTWebView2StateData : winrt::implements<RCTWebView2StateData, winrt::IInspectable> {
    RCTWebView2StateData(winrt::Windows::Foundation::Size ds) : desiredSize(ds) {}
    winrt::Windows::Foundation::Size desiredSize;
};

struct RCTWebView2ComponentView : winrt::implements<RCTWebView2ComponentView, winrt::IInspectable>,
                                   RNCWebViewCodegen::BaseRCTWebView2<RCTWebView2ComponentView> {

    void InitializeContentIsland(
        const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView);

    void UpdateProps(
        const winrt::Microsoft::ReactNative::ComponentView &view,
        const winrt::com_ptr<RNCWebViewCodegen::RCTWebView2Props> &newProps,
        const winrt::com_ptr<RNCWebViewCodegen::RCTWebView2Props> &oldProps) noexcept override;

    void UpdateState(
        const winrt::Microsoft::ReactNative::ComponentView &view,
        const winrt::Microsoft::ReactNative::IComponentState &newState) noexcept override;

    // Command handlers (required by BaseRCTWebView2)
    void HandleGoBackCommand() noexcept override;
    void HandleGoForwardCommand() noexcept override;
    void HandleReloadCommand() noexcept override;
    void HandleStopLoadingCommand() noexcept override;
    void HandleInjectJavaScriptCommand(std::string javascript) noexcept override;
    void HandleRequestFocusCommand() noexcept override;
    void HandlePostMessageCommand(std::string data) noexcept override;
    void HandleLoadUrlCommand(std::string url) noexcept override;
    void HandleClearCacheCommand(bool includeDiskFiles) noexcept override;

private:
    void RefreshSize();
    void RegisterEvents();
    void RegisterCoreWebView2Events();
    
    void OnNavigationStarting(winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationStartingEventArgs const& args);
    void OnNavigationCompleted(winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationCompletedEventArgs const& args);
    void OnCoreWebView2Initialized(winrt::Microsoft::UI::Xaml::Controls::CoreWebView2InitializedEventArgs const& args);
    void OnCoreWebView2ResourceRequested(
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& sender,
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2WebResourceRequestedEventArgs const& args);
    void OnCoreWebView2DOMContentLoaded(
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& sender,
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2DOMContentLoadedEventArgs const& args);
    void OnCoreWebView2SourceChanged(
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& sender,
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2SourceChangedEventArgs const& args);
    void OnCoreWebView2NewWindowRequested(
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& sender,
        winrt::Microsoft::Web::WebView2::Core::CoreWebView2NewWindowRequestedEventArgs const& args);

    void OnMessagePosted(winrt::hstring const& message);
    void HandleMessageFromJS(winrt::hstring const& message);
    bool Is17763OrHigher();
    void WriteCookiesToWebView2(std::string const& cookies);

    winrt::weak_ref<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView> m_islandView;
    winrt::Microsoft::UI::Xaml::XamlIsland m_island{nullptr};
    winrt::Microsoft::UI::Xaml::Controls::WebView2 m_webView{nullptr};
    winrt::Microsoft::ReactNative::IComponentState m_state{nullptr};

    // Event revokers
    winrt::event_token m_messageToken;
    winrt::Microsoft::UI::Xaml::Controls::WebView2::NavigationStarting_revoker m_navigationStartingRevoker{};
    winrt::Microsoft::UI::Xaml::Controls::WebView2::NavigationCompleted_revoker m_navigationCompletedRevoker{};
    winrt::Microsoft::UI::Xaml::Controls::WebView2::CoreWebView2Initialized_revoker m_CoreWebView2InitializedRevoker{};
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2::WebResourceRequested_revoker m_webResourceRequestedRevoker{};
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2::DOMContentLoaded_revoker m_CoreWebView2DOMContentLoadedRevoker{};
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2::SourceChanged_revoker m_sourceChangedRevoker{};
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2::NewWindowRequested_revoker m_newWindowRequestedRevoker{};

    // Settings
    bool m_messagingEnabled{true};
    bool m_linkHandlingEnabled{true};
    winrt::hstring m_injectedJavascript{L""};
    winrt::hstring m_userAgent{L""};
    bool m_updating{false};
};

void RegisterRCTWebView2ComponentView(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const& packageBuilder) noexcept;

} // namespace winrt::ReactNativeWebView::implementation

#endif // RNW_NEW_ARCH
