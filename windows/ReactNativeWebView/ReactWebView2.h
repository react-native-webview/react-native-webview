// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
#if RNW_VERSION_AT_LEAST(0,68,0)
#pragma once

#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"
#include "ReactWebView2.g.h"

#include "winrt/ReactNativeWebView.h"

using namespace winrt::ReactNativeWebView;

namespace winrt::ReactNativeWebView::implementation {

    class ReactWebView2 : public ReactWebView2T<ReactWebView2> {
    public:
        ReactWebView2(Microsoft::ReactNative::IReactContext const& reactContext);
        void NavigateToHtml(winrt::hstring html);
        ~ReactWebView2();

    private:
        winrt::hstring m_navigateToHtml = L"";

        winrt::Microsoft::UI::Xaml::Controls::WebView2 m_webView{ nullptr };
        Microsoft::ReactNative::IReactContext m_reactContext{ nullptr };
        winrt::event_token m_messageToken;
        winrt::Microsoft::UI::Xaml::Controls::WebView2::NavigationStarting_revoker m_navigationStartingRevoker{};
        winrt::Microsoft::UI::Xaml::Controls::WebView2::NavigationCompleted_revoker m_navigationCompletedRevoker{};
        winrt::Microsoft::UI::Xaml::Controls::WebView2::CoreWebView2Initialized_revoker m_CoreWebView2InitializedRevoker{};
        void RegisterEvents();
        void WriteWebViewNavigationEventArg(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::ReactNative::IJSValueWriter const& eventDataWriter);
        void OnNavigationStarting(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationStartingEventArgs const& args);
        void OnNavigationCompleted(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationCompletedEventArgs const& args);
        void OnCoreWebView2Initialized(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::UI::Xaml::Controls::CoreWebView2InitializedEventArgs const& args);
        bool Is17763OrHigher();
    };
} // namespace winrt::ReactNativeWebView2::implementation

namespace winrt::ReactNativeWebView::factory_implementation {
    struct ReactWebView2 : ReactWebView2T<ReactWebView2, implementation::ReactWebView2> {};
} // namespace winrt::ReactNativeWebView2::factory_implementation
#endif