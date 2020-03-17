// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "JSValueXaml.h"
#include "ReactWebView.h"
#include "ReactWebView.g.cpp"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Data::Json;
    using namespace Windows::Foundation;
    using namespace Windows::UI;
    using namespace Windows::UI::Popups;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
    using namespace Windows::UI::Xaml::Input;
    using namespace Windows::UI::Xaml::Media;
} // namespace winrt

namespace winrt::ReactNativeWebView::implementation {

    ReactWebView::ReactWebView(winrt::IReactContext const& reactContext) : m_reactContext(reactContext) {
#ifdef CHAKRACORE_UWP
        m_webView = winrt::WebView(winrt::WebViewExecutionMode::SeparateProcess);
#else
        m_webView = winrt::WebView();
#endif
        RegisterEvents();
    }

    winrt::WebView ReactWebView::GetView() {
        return m_webView;
    }

    void ReactWebView::RegisterEvents() {
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

        m_navigationFailedRevoker = m_webView.NavigationFailed(
            winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
                if (auto self = ref.get()) {
                    self->OnNavigationFailed(sender, args);
                }
            });

        m_scriptNotifyRevoker = m_webView.ScriptNotify(
            winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
                if (auto self = ref.get()) {
                    self->OnScriptNotify(sender, args);
                }
            });
    }

    void ReactWebView::WriteWebViewNavigationEventArg(winrt::IJSValueWriter const& eventDataWriter) {
        auto tag = m_webView.GetValue(winrt::FrameworkElement::TagProperty()).as<winrt::IPropertyValue>().GetInt64();
        WriteProperty(eventDataWriter, L"canGoBack", m_webView.CanGoBack());
        WriteProperty(eventDataWriter, L"canGoForward", m_webView.CanGoForward());
        WriteProperty(eventDataWriter, L"loading", !m_webView.IsLoaded());
        WriteProperty(eventDataWriter, L"target", tag);
        WriteProperty(eventDataWriter, L"title", m_webView.DocumentTitle());
        if (auto uri = m_webView.Source()) {
            WriteProperty(eventDataWriter, L"url", uri.AbsoluteCanonicalUri());
        }
    }

    void ReactWebView::OnNavigationStarting(winrt::WebView const& webView, winrt::WebViewNavigationStartingEventArgs const& /*args*/) {
        m_reactContext.DispatchEvent(
            webView,
            L"topLoadingStart",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                WriteWebViewNavigationEventArg(eventDataWriter);
                eventDataWriter.WriteObjectEnd();
            });
    }

    void ReactWebView::OnNavigationCompleted(winrt::WebView const& webView, winrt::WebViewNavigationCompletedEventArgs const& /*args*/) {
        m_reactContext.DispatchEvent(
            webView,
            L"topLoadingFinish",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                WriteWebViewNavigationEventArg(eventDataWriter);
                eventDataWriter.WriteObjectEnd();
            });

        winrt::hstring windowAlert = L"window.alert = function (msg) {window.external.notify(`{\"type\":\"alert\",\"message\":\"${msg}\"}`)};";
        winrt::hstring postMessage = L"window.ReactNativeWebView = {postMessage: function (data) {window.external.notify(String(data))}};";
        m_webView.InvokeScriptAsync(L"eval", { windowAlert + postMessage });
    }

    void ReactWebView::OnNavigationFailed(winrt::IInspectable const& /*sender*/, winrt::WebViewNavigationFailedEventArgs const& args) {
        m_reactContext.DispatchEvent(
            m_webView,
            L"topLoadingError",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                auto httpCode = static_cast<int32_t>(args.WebErrorStatus());
                eventDataWriter.WriteObjectBegin();
                {
                    WriteProperty(eventDataWriter, L"code", httpCode);
                    WriteWebViewNavigationEventArg(eventDataWriter);
                }
                eventDataWriter.WriteObjectEnd();
            });
    }

    void ReactWebView::OnScriptNotify(winrt::IInspectable const& /*sender*/, winrt::Windows::UI::Xaml::Controls::NotifyEventArgs const& args) {
        winrt::JsonObject jsonObject;
        if (winrt::JsonObject::TryParse(args.Value(), jsonObject)) {
            auto type = jsonObject.GetNamedString(L"type");
            if (type == L"alert") {
                auto dialog = winrt::MessageDialog(jsonObject.GetNamedString(L"message"));
                dialog.Commands().Append(winrt::UICommand(L"OK"));
                dialog.ShowAsync();
            }
        }
        else {
            m_reactContext.DispatchEvent(
                m_webView,
                L"topMessage",
                [&](winrt::Microsoft::ReactNative::IJSValueWriter const& eventDataWriter) noexcept {
                    eventDataWriter.WriteObjectBegin();
                    {
                        WriteProperty(eventDataWriter, L"data", winrt::to_string(args.Value()));
                    }
                    eventDataWriter.WriteObjectEnd();
                });
        }
    }

} // namespace winrt::ReactNativeWebView::implementation