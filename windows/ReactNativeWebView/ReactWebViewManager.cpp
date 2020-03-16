#include "pch.h"
#include "ReactWebViewManager.h"
#include "NativeModules.h"
#include "ReactWebView.h"
#include "JSValueXaml.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation;
    using namespace Windows::Foundation::Collections;
    using namespace Windows::UI;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
}

namespace winrt::ReactNativeWebView::implementation {

    ReactWebViewManager::ReactWebViewManager() {}

    // IViewManager
    winrt::hstring ReactWebViewManager::Name() noexcept {
        return L"RCTWebView";
    }

    winrt::FrameworkElement ReactWebViewManager::CreateView() noexcept {
        m_reactWebView = *winrt::make_self<ReactWebView>(m_reactContext);
        return m_reactWebView.GetView();
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
            const JSValueObject& propertyMap = JSValueObject::ReadFrom(propertyMapReader);

            for (auto const& pair : propertyMap) {
                auto const& propertyName = pair.first;
                auto const& propertyValue = pair.second;
                if (propertyValue.IsNull()) continue;

                if (propertyName == "source") {
                    auto const& srcMap = propertyValue.AsObject();
                    if (srcMap.find("uri") != srcMap.end()) {
                        auto uriString = srcMap.at("uri").AsString();
                        // non-uri sources not yet supported
                        if (uriString.length() == 0) {
                            continue;
                        }

                        bool isPackagerAsset = false;
                        if (srcMap.find("__packager_asset") != srcMap.end()) {
                            isPackagerAsset = srcMap.at("__packager_asset").AsBoolean();
                        }

                        if (isPackagerAsset && uriString.find("assets") == 0) {
                            uriString.replace(0, 6, "ms-appx://");
                        }

                        webView.Navigate(winrt::Uri(to_hstring(uriString)));
                    }
                    else if (srcMap.find("html") != srcMap.end()) {
                        auto htmlString = srcMap.at("html").AsString();
                        webView.NavigateToString(to_hstring(htmlString));
                    }
                }
                else if (propertyName == "backgroundColor") {
                    auto color = propertyValue.To<winrt::Color>();
                    webView.DefaultBackgroundColor(color.A==0 ? winrt::Colors::Transparent() : color);
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
                    webView.InvokeScriptAsync(L"eval", { commandArgsReader.GetString() });
                    break;
            }
        }
    }

} // namespace winrt::ReactWebView::implementation