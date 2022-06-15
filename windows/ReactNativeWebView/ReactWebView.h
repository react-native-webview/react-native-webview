// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once

#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"
#include "ReactWebView.g.h"

#include "winrt/ReactNativeWebView.h"

using namespace winrt::ReactNativeWebView;

namespace winrt::ReactNativeWebView::implementation {

    class ReactWebView : public ReactWebViewT<ReactWebView> {
    public:
        ReactWebView(Microsoft::ReactNative::IReactContext const& reactContext);
        void MessagingEnabled(bool enabled) noexcept;
        bool MessagingEnabled() const noexcept;
        ~ReactWebView();

    private:
        bool m_messagingEnabled{ true };
        winrt::Windows::UI::Xaml::Controls::WebView m_webView{ nullptr };
        Microsoft::ReactNative::IReactContext m_reactContext{ nullptr };
        WebBridge m_webBridge{ nullptr };
        winrt::event_token m_messageToken;
        winrt::Windows::UI::Xaml::Controls::WebView::NavigationStarting_revoker m_navigationStartingRevoker{};
        winrt::Windows::UI::Xaml::Controls::WebView::NavigationCompleted_revoker m_navigationCompletedRevoker{};
        winrt::Windows::UI::Xaml::Controls::WebView::NavigationFailed_revoker m_navigationFailedRevoker{};

        void HandleMessageFromJS(winrt::hstring const& message);
        void RegisterEvents();
        void WriteWebViewNavigationEventArg(winrt::Windows::UI::Xaml::Controls::WebView const& sender, winrt::Microsoft::ReactNative::IJSValueWriter const& eventDataWriter);
        void OnNavigationStarting(winrt::Windows::UI::Xaml::Controls::WebView const& sender, winrt::Windows::UI::Xaml::Controls::WebViewNavigationStartingEventArgs const& args);
        void OnNavigationCompleted(winrt::Windows::UI::Xaml::Controls::WebView const& sender, winrt::Windows::UI::Xaml::Controls::WebViewNavigationCompletedEventArgs const& args);
        void OnNavigationFailed(winrt::Windows::Foundation::IInspectable const& sender, winrt::Windows::UI::Xaml::Controls::WebViewNavigationFailedEventArgs const& args);
        void OnMessagePosted(hstring const& message);
        bool Is17763OrHigher();
    };
} // namespace winrt::ReactNativeWebView::implementation

namespace winrt::ReactNativeWebView::factory_implementation {
    struct ReactWebView : ReactWebViewT<ReactWebView, implementation::ReactWebView> {};
} // namespace winrt::ReactNativeWebView::factory_implementation