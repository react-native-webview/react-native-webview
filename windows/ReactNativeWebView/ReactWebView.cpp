// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "JSValueXaml.h"
#include "ReactWebView.h"
#include "ReactWebView.g.cpp"
#include <winrt/Windows.Foundation.Metadata.h>
#include <optional>

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
        m_webView = winrt::WebView();
        this->Content(m_webView);
        RegisterEvents();
    }

    ReactWebView::~ReactWebView()
    {
      if (m_messagingEnabled) {
        m_webBridge.MessagePostEvent(m_messageToken);
      }
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
    }

    bool ReactWebView::Is17763OrHigher() {
      static std::optional<bool> hasUniversalAPIContract_v7;

      if (!hasUniversalAPIContract_v7.has_value()) {
        hasUniversalAPIContract_v7 = winrt::Windows::Foundation::Metadata::ApiInformation::IsApiContractPresent(L"Windows.Foundation.UniversalApiContract", 7);
      }
      return hasUniversalAPIContract_v7.value();
    }

    void ReactWebView::WriteWebViewNavigationEventArg(winrt::WebView const& sender, winrt::IJSValueWriter const& eventDataWriter) {
        auto tag = this->GetValue(winrt::FrameworkElement::TagProperty()).as<winrt::IPropertyValue>().GetInt64();
        WriteProperty(eventDataWriter, L"canGoBack", sender.CanGoBack());
        WriteProperty(eventDataWriter, L"canGoForward", sender.CanGoForward());
        if (Is17763OrHigher()) {
          WriteProperty(eventDataWriter, L"loading", !sender.IsLoaded());
        }
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
          m_webBridge = WebBridge();
          m_messageToken = m_webBridge.MessagePostEvent([this](const auto&, hstring const& message)
            {
              this->OnMessagePosted(message);
            });
          webView.AddWebAllowedObject(L"__REACT_WEB_VIEW_BRIDGE", m_webBridge);
        }
    }

    void ReactWebView::OnMessagePosted(hstring const& message)
    {
        HandleMessageFromJS(message);
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

        if (m_messagingEnabled) {
          winrt::hstring message = LR"(window.alert = function(msg) { __REACT_WEB_VIEW_BRIDGE.postMessage(`{"type":"__alert", "message" : "${msg}" }`) }; 
            window.ReactNativeWebView = {postMessage: function(data) { __REACT_WEB_VIEW_BRIDGE.postMessage(String(data)) }};)";
          webView.InvokeScriptAsync(L"eval", { message });
        }
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

    void ReactWebView::HandleMessageFromJS(winrt::hstring const& message) {
        winrt::JsonObject jsonObject;
        if (winrt::JsonObject::TryParse(message, jsonObject)) {
            if (auto v = jsonObject.Lookup(L"type"); v && v.ValueType() == JsonValueType::String) {
                auto type = v.GetString();
                if (type == L"__alert") {
                    auto dialog = winrt::MessageDialog(jsonObject.GetNamedString(L"message"));
                    dialog.Commands().Append(winrt::UICommand(L"OK"));
                    dialog.ShowAsync();
                    return;
                }
            }
          }
      
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

    void ReactWebView::MessagingEnabled(bool enabled) noexcept{
      m_messagingEnabled = enabled;
    }

    bool ReactWebView::MessagingEnabled() const noexcept{
        return m_messagingEnabled;
    }
} // namespace winrt::ReactNativeWebView::implementation