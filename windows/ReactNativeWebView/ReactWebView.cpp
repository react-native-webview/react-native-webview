// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "JSValueXaml.h"
#include "ReactWebView.h"
#include "ReactWebView.g.cpp"

#include "winrt/WebViewBridge.h"



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
        this->Content(m_webView);
        RegisterEvents();
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

    void ReactWebView::WriteWebViewNavigationEventArg(winrt::WebView const& sender, winrt::IJSValueWriter const& eventDataWriter) {
        auto tag = this->GetValue(winrt::FrameworkElement::TagProperty()).as<winrt::IPropertyValue>().GetInt64();
        WriteProperty(eventDataWriter, L"canGoBack", sender.CanGoBack());
        WriteProperty(eventDataWriter, L"canGoForward", sender.CanGoForward());
        WriteProperty(eventDataWriter, L"loading", !sender.IsLoaded());
        WriteProperty(eventDataWriter, L"target", tag);
        WriteProperty(eventDataWriter, L"title", sender.DocumentTitle());
        if (auto uri = sender.Source()) {
          WriteProperty(eventDataWriter, L"url", uri.AbsoluteCanonicalUri());
        }
    }

    void ReactWebView::OnNavigationStarting(winrt::WebView const& webView, winrt::WebViewNavigationStartingEventArgs const& /*args*/) {
        m_reactContext.DispatchEvent(
            *this,
            L"topLoadingStart",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                WriteWebViewNavigationEventArg(webView, eventDataWriter);
                eventDataWriter.WriteObjectEnd();
            });

        if (m_messagingEnabled) {
          auto tag = this->GetValue(winrt::FrameworkElement::TagProperty()).as<winrt::IPropertyValue>().GetInt64();

          auto bridge = WebViewBridge::WebBridge(tag);
          webView.AddWebAllowedObject(L"__RN_WEBVIEW_JS_BRIDGE", bridge);
        }
    }

    void ReactWebView::OnNavigationCompleted(winrt::WebView const& webView, winrt::WebViewNavigationCompletedEventArgs const& /*args*/) {
        m_reactContext.DispatchEvent(
            *this,
            L"topLoadingFinish",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                WriteWebViewNavigationEventArg(webView, eventDataWriter);
                eventDataWriter.WriteObjectEnd();
            });

        winrt::hstring windowAlert = L"window.alert = function (msg) {window.external.notify(`{\"type\":\"__alert\",\"message\":\"${msg}\"}`)};";
        winrt::hstring postMessage = L"window.ReactNativeWebView = {postMessage: function (data) {window.external.notify(String(data))}};";
        webView.InvokeScriptAsync(L"eval", { windowAlert + postMessage });
    }

    void ReactWebView::OnNavigationFailed(winrt::IInspectable const& /*sender*/, winrt::WebViewNavigationFailedEventArgs const& args) {
        m_reactContext.DispatchEvent(
            *this,
            L"topLoadingError",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                auto httpCode = static_cast<int32_t>(args.WebErrorStatus());
                eventDataWriter.WriteObjectBegin();
                {
                    WriteProperty(eventDataWriter, L"code", httpCode);
                    WriteWebViewNavigationEventArg(m_webView, eventDataWriter);
                }
                eventDataWriter.WriteObjectEnd();
            });
    }

    void ReactWebView::OnScriptNotify(winrt::IInspectable const& /*sender*/, winrt::Windows::UI::Xaml::Controls::NotifyEventArgs const& args) {
        winrt::JsonObject jsonObject;
        if (winrt::JsonObject::TryParse(args.Value(), jsonObject) && jsonObject.HasKey(L"type")) {
            auto type = jsonObject.GetNamedString(L"type");
            if (type == L"__alert") {
                auto dialog = winrt::MessageDialog(jsonObject.GetNamedString(L"message"));
                dialog.Commands().Append(winrt::UICommand(L"OK"));
                dialog.ShowAsync();
                return;
            }
        }
        
        PostMessage(winrt::hstring(args.Value()));
    }

    void ReactWebView::PostMessage(winrt::hstring const& message) {
        m_reactContext.DispatchEvent(
            *this,
            L"topMessage",
            [&](winrt::Microsoft::ReactNative::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                {
                    WriteProperty(eventDataWriter, L"data", message);
                }
                eventDataWriter.WriteObjectEnd();
            });
    }

    void ReactWebView::SetMessagingEnabled(bool enabled) {
      this->m_messagingEnabled = enabled;
    }

} // namespace winrt::ReactNativeWebView::implementation