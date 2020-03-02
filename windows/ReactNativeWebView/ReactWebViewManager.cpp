#include "pch.h"
#include "ReactWebViewManager.h"
#include "NativeModules.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Data::Json;
    using namespace Windows::Foundation;
    using namespace Windows::Foundation::Collections;
    using namespace Windows::UI;
    using namespace Windows::UI::Popups;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
    using namespace Windows::UI::Xaml::Markup;
}

namespace winrt::ReactNativeWebView::implementation {

    ReactWebViewManager::ReactWebViewManager() {}

    // IViewManager
    winrt::hstring ReactWebViewManager::Name() noexcept {
        return L"RCTWebView";
    }

    winrt::FrameworkElement ReactWebViewManager::CreateView() noexcept {
#ifdef CHAKRACORE_UWP
        m_webView = winrt::WebView(winrt::WebViewExecutionMode::SeparateProcess);
#else
        m_webView = winrt::WebView();
#endif
        RegisterEvents();
        return m_webView;
    }

    void ReactWebViewManager::RegisterEvents() {
        m_navigationStartingRevoker = m_webView.NavigationStarting(
            winrt::auto_revoke, [=](auto const& sender, auto const& args) {
                OnNavigationStarting(sender, args);
            });

        m_navigationCompletedRevoker = m_webView.NavigationCompleted(
            winrt::auto_revoke, [=](auto const& sender, auto const& args) {
                OnNavigationCompleted(sender, args);
            });

        m_navigationFailedRevoker = m_webView.NavigationFailed(
            winrt::auto_revoke, [=](auto const& sender, auto const& args) {
                OnNavigationFailed(sender, args);
            });

        m_scriptNotifyRevoker = m_webView.ScriptNotify(
            winrt::auto_revoke, [=](auto const& sender, auto const& args) {
                OnScriptNotify(sender, args);
            });
    }

    // IViewManagerWithReactContext
    winrt::IReactContext ReactWebViewManager::ReactContext() noexcept {
        return m_reactContext;
    }

    void ReactWebViewManager::ReactContext(IReactContext reactContext) noexcept {
        m_reactContext = reactContext;
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> ReactWebViewManager::NativeProps() noexcept {
        auto nativeProps = winrt::single_threaded_map<hstring, ViewManagerPropertyType>();
        nativeProps.Insert(L"source", ViewManagerPropertyType::Map);
        return nativeProps.GetView();
    }

    void ReactWebViewManager::UpdateProperties(
        FrameworkElement const& view,
        IJSValueReader const& propertyMapReader) noexcept {
        if (auto webView = view.try_as<winrt::WebView>()) {
            const JSValueObject& propertyMap = JSValue::ReadObjectFrom(propertyMapReader);

            for (auto const& pair : propertyMap) {
                auto const& propertyName = pair.first;
                auto const& propertyValue = pair.second;
                if (propertyValue.IsNull()) continue;

                if (propertyName == "source") {
                    auto const& srcMap = propertyValue.Object();
                    if (srcMap.find("uri") != srcMap.end()) {
                        m_sourceType = WebViewSourceType::Uri;
                        auto uriString = srcMap.at("uri").String();
                        // non-uri sources not yet supported
                        if (uriString.length() == 0) {
                            continue;
                        }

                        bool isPackagerAsset = false;
                        if (srcMap.find("__packager_asset") != srcMap.end()) {
                            isPackagerAsset = srcMap.at("__packager_asset").Boolean();
                        }

                        if (isPackagerAsset && uriString.find("assets") == 0) {
                            uriString.replace(0, 6, "ms-appx://");
                        }

                        webView.Navigate(winrt::Uri(to_hstring(uriString)));
                    }
                    else if (srcMap.find("html") != srcMap.end()) {
                        m_sourceType = WebViewSourceType::Html;
                        auto htmlString = srcMap.at("html").String();
                        webView.NavigateToString(to_hstring(htmlString));
                    }
                }
                else if (propertyName == "backgroundColor") {
                    webView.DefaultBackgroundColor(ColorFromHex(propertyValue.Int64()));
                }
            }
        }
    }

    // IViewManagerWithExportedEventTypeConstants
    ConstantProviderDelegate ReactWebViewManager::ExportedCustomBubblingEventTypeConstants() noexcept {
        return nullptr;
    }

    ConstantProviderDelegate ReactWebViewManager::ExportedCustomDirectEventTypeConstants() noexcept {
        return [](winrt::IJSValueWriter const& constantWriter) {
            WriteCustomDirectEventTypeConstant(constantWriter, "onLoadingStart");
            WriteCustomDirectEventTypeConstant(constantWriter, "onLoadingFinish");
            WriteCustomDirectEventTypeConstant(constantWriter, "onLoadingError");
            WriteCustomDirectEventTypeConstant(constantWriter, "onMessage");
        };
    }

    // IViewManagerWithCommands
    IMapView<hstring, int64_t> ReactWebViewManager::Commands() noexcept {
        auto commands = winrt::single_threaded_map<hstring, int64_t>();
        commands.Insert(L"goForward", static_cast<int32_t>(WebViewCommands::GoForward));
        commands.Insert(L"goBack", static_cast<int32_t>(WebViewCommands::GoBack));
        commands.Insert(L"reload", static_cast<int32_t>(WebViewCommands::Reload));
        commands.Insert(L"stopLoading", static_cast<int32_t>(WebViewCommands::StopLoading));
        commands.Insert(L"injectJavaScript", static_cast<int32_t>(WebViewCommands::InjectJavaScript));
        return commands.GetView();
    }

    void ReactWebViewManager::DispatchCommand(
        FrameworkElement const& view,
        int64_t commandId,
        winrt::IJSValueReader const& commandArgsReader) noexcept {
        if (auto webView = view.try_as<winrt::WebView>()) {
            switch (commandId) {
                case static_cast<int64_t>(WebViewCommands::GoForward) :
                    if (webView.CanGoForward()) {
                        webView.GoForward();
                    }
                    break;
                case static_cast<int64_t>(WebViewCommands::GoBack) :
                    if (webView.CanGoBack()) {
                        webView.GoBack();
                    }
                    break;
                case static_cast<int64_t>(WebViewCommands::Reload) :
                    webView.Refresh();
                    break;
                case static_cast<int64_t>(WebViewCommands::StopLoading) :
                    webView.Stop();
                    break;
                case static_cast<int64_t>(WebViewCommands::InjectJavaScript) :
                    InjectJavaScript(commandArgsReader.GetString());
                    break;
            }
        }
    }

    void ReactWebViewManager::WriteWebViewNavigationEventArg(winrt::IJSValueWriter const& eventDataWriter) {
        auto tag = m_webView.GetValue(winrt::FrameworkElement::TagProperty()).as<winrt::IPropertyValue>().GetInt64();
        WriteProperty(eventDataWriter, L"canGoBack", m_webView.CanGoBack());
        WriteProperty(eventDataWriter, L"canGoForward", m_webView.CanGoForward());
        WriteProperty(eventDataWriter, L"loading", !m_webView.IsLoaded());
        WriteProperty(eventDataWriter, L"target", tag);
        WriteProperty(eventDataWriter, L"title", m_webView.DocumentTitle());
        if (m_sourceType == WebViewSourceType::Uri) {
            WriteProperty(eventDataWriter, L"url", m_webView.Source().AbsoluteCanonicalUri());
        }
    }

    void ReactWebViewManager::OnNavigationStarting(winrt::WebView const& webView, winrt::WebViewNavigationStartingEventArgs const& /*args*/) {
        m_reactContext.DispatchEvent(
            webView,
            L"topLoadingStart",
            [&](winrt::IJSValueWriter const& eventDataWriter) noexcept {
                eventDataWriter.WriteObjectBegin();
                WriteWebViewNavigationEventArg(eventDataWriter);
                eventDataWriter.WriteObjectEnd();
            });
    }

    void ReactWebViewManager::OnNavigationCompleted(winrt::WebView const& webView, winrt::WebViewNavigationCompletedEventArgs const& /*args*/) {
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
        InjectJavaScript(windowAlert + postMessage);
    }

    void ReactWebViewManager::OnNavigationFailed(winrt::IInspectable const& /*sender*/, winrt::WebViewNavigationFailedEventArgs const& args) {
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

    void ReactWebViewManager::OnScriptNotify(winrt::IInspectable const& /*sender*/, winrt::Windows::UI::Xaml::Controls::NotifyEventArgs const& args) {
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

    winrt::IAsyncAction ReactWebViewManager::InjectJavaScript(winrt::hstring javaScript) {
        auto result = co_await m_webView.InvokeScriptAsync(L"eval", { javaScript });
    }

    winrt::Color ReactWebViewManager::ColorFromHex(int64_t const hex) {
        if (hex == 0) {
            return winrt::Colors::Transparent();
        }

        winrt::Color color;
        color.B = hex & 0xFF;
        color.G = (hex >> 8) & 0xFF;
        color.R = (hex >> 16) & 0xFF;
        color.A = (hex >> 24) & 0xFF;
        return color;
    }

} // namespace winrt::ReactWebView::implementation