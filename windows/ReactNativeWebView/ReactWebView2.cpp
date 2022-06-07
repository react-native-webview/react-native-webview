// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#if RNW_VERSION_AT_LEAST(0,68,0)
#include "JSValueXaml.h"
#include "ReactWebView2.h"
#include "ReactWebView2.g.cpp"
#include <winrt/Windows.Foundation.Metadata.h>
#include <optional>

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation;
    using namespace Windows::UI;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
    using namespace Microsoft::UI::Xaml::Controls;
    using namespace Microsoft::Web::WebView2::Core;
} // namespace winrt

namespace winrt::ReactNativeWebView::implementation {

    ReactWebView2::ReactWebView2(winrt::IReactContext const& reactContext) : m_reactContext(reactContext) {
        m_webView = winrt::WebView2();
        this->Content(m_webView);
        RegisterEvents();
    }

    ReactWebView2::~ReactWebView2(){}

    void ReactWebView2::RegisterEvents() {
        m_navigationStartingRevoker = m_webView.NavigationStarting(
            winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
                if (auto self = ref.get()) {
                    self->OnNavigationStarting(sender, args);
                }
                    
            });

        m_navigationCompletedRevoker = m_webView.NavigationCompleted(
            winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
                if (auto self = ref.get()) {
                    self->OnNavigationCompleted(sender, args);
                }
            });

        m_CoreWebView2InitializedRevoker = m_webView.CoreWebView2Initialized(
            winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args){
            if (auto self = ref.get()) {
                self->OnCoreWebView2Initialized(sender, args);
            }
        });
    }  

    bool ReactWebView2::Is17763OrHigher() {
        static std::optional<bool> hasUniversalAPIContract_v7;

        if (!hasUniversalAPIContract_v7.has_value()) {
        hasUniversalAPIContract_v7 = winrt::Windows::Foundation::Metadata::ApiInformation::IsApiContractPresent(L"Windows.Foundation.UniversalApiContract", 7);
        }
        return hasUniversalAPIContract_v7.value();
    }

    void ReactWebView2::WriteWebViewNavigationEventArg(winrt::WebView2 const& sender, winrt::IJSValueWriter const& eventDataWriter) {
        auto tag = this->GetValue(winrt::FrameworkElement::TagProperty()).as<winrt::IPropertyValue>().GetInt64();
        WriteProperty(eventDataWriter, L"canGoBack", sender.CanGoBack());
        WriteProperty(eventDataWriter, L"canGoForward", sender.CanGoForward());
        if (Is17763OrHigher()) {
        WriteProperty(eventDataWriter, L"loading", !sender.IsLoaded());
        }
        WriteProperty(eventDataWriter, L"target", tag);
        if (auto uri = sender.Source()) {
        WriteProperty(eventDataWriter, L"url", uri.AbsoluteCanonicalUri());
        }
    }

    void ReactWebView2::OnNavigationStarting(winrt::WebView2 const& webView, winrt::CoreWebView2NavigationStartingEventArgs const& args) {
        m_reactContext.DispatchEvent(
            *this,
            L"topLoadingStart",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                WriteWebViewNavigationEventArg(webView, eventDataWriter);
                eventDataWriter.WriteObjectEnd();
            });
    }

    void ReactWebView2::OnNavigationCompleted(winrt::WebView2 const& webView, winrt::CoreWebView2NavigationCompletedEventArgs const& args) {
        m_reactContext.DispatchEvent(
            *this,
            L"topLoadingFinish",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                WriteWebViewNavigationEventArg(webView, eventDataWriter);
                eventDataWriter.WriteObjectEnd();
            });
    }

    void ReactWebView2::OnCoreWebView2Initialized(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::UI::Xaml::Controls::CoreWebView2InitializedEventArgs const& args) {
        assert(sender.CoreWebView2());
        if (m_navigateToHtml != L"") {
            m_webView.NavigateToString(m_navigateToHtml);
            m_navigateToHtml = L"";
        }
    }

    void ReactWebView2::NavigateToHtml(winrt::hstring html) {
        if (m_webView.CoreWebView2()) {
            m_webView.NavigateToString(html);
        }
        else {
            m_webView.EnsureCoreWebView2Async();
            m_navigateToHtml = html;
        }
    }

} // namespace winrt::ReactNativeWebView::implementation
#endif