#include "pch.h"
#include "ReactWebView2Manager.h"

#if HAS_WEBVIEW2
#include "NativeModules.h"
#include "ReactWebView2.h"
#include "JSValueXaml.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation;
    using namespace Windows::Foundation::Collections;
    using namespace Windows::UI;
    using namespace Windows::UI::Xaml;
    using namespace Windows::UI::Xaml::Controls;
    using namespace Microsoft::UI::Xaml::Controls;
    using namespace Windows::Web::Http;
    using namespace Windows::Web::Http::Headers;
}

namespace winrt::ReactNativeWebView::implementation {

    ReactWebView2Manager::ReactWebView2Manager() {}

    // IViewManager
    winrt::hstring ReactWebView2Manager::Name() noexcept {
        return L"RCTWebView2";
    }

    winrt::FrameworkElement ReactWebView2Manager::CreateView() noexcept {
      auto view = winrt::ReactNativeWebView::ReactWebView2(m_reactContext);
      return view;
    }

    // IViewManagerWithReactContext
    winrt::IReactContext ReactWebView2Manager::ReactContext() noexcept {
        return m_reactContext;
    }

    void ReactWebView2Manager::ReactContext(IReactContext reactContext) noexcept {
        m_reactContext = reactContext;
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> ReactWebView2Manager::NativeProps() noexcept {
        auto nativeProps = winrt::single_threaded_map<hstring, ViewManagerPropertyType>();
        nativeProps.Insert(L"source", ViewManagerPropertyType::Map);
        nativeProps.Insert(L"messagingEnabled", ViewManagerPropertyType::Boolean);
        return nativeProps.GetView();
    }

    void ReactWebView2Manager::UpdateProperties(
        FrameworkElement const& view,
        IJSValueReader const& propertyMapReader) noexcept {
        auto control = view.as<winrt::ContentPresenter>();
        auto content = control.Content();
        auto webView = content.as<winrt::WebView2>();
        const JSValueObject& propertyMap = JSValueObject::ReadFrom(propertyMapReader);

        for (auto const& pair : propertyMap) {
            auto const& propertyName = pair.first;
            auto const& propertyValue = pair.second;
            if (propertyValue.IsNull()) continue;

            if (propertyName == "source") {
                auto const& srcMap = propertyValue.AsObject();
                std::string file = "file://";
                if (srcMap.find("uri") != srcMap.end()) {
                    auto uriString = srcMap.at("uri").AsString();
                    if (uriString.length() == 0) {
                        continue;
                    }

                    bool isPackagerAsset = false;
                    if (srcMap.find("__packager_asset") != srcMap.end()) {
                        isPackagerAsset = srcMap.at("__packager_asset").AsBoolean();
                    }
                    if (isPackagerAsset && uriString.find(file) == 0) {
                        auto bundleRootPath = winrt::to_string(ReactNativeHost().InstanceSettings().BundleRootPath());
                        uriString.replace(0, std::size(file), bundleRootPath.empty() ? "ms-appx-web:///Bundle/" : bundleRootPath);
                    }
                    webView.Source(winrt::Uri(to_hstring(uriString)));
                }
                else if (srcMap.find("html") != srcMap.end()) {
                    auto htmlString = srcMap.at("html").AsString();
                    auto reactWebView2 = view.as<winrt::ReactNativeWebView::ReactWebView2>();
                    reactWebView2.NavigateToHtml(to_hstring(htmlString));
                }
            }
            else if (propertyName == "messagingEnabled") {
                auto messagingEnabled = propertyValue.To<bool>();
                auto reactWebView2 = view.as<ReactNativeWebView::ReactWebView2>();
                reactWebView2.MessagingEnabled(messagingEnabled);
            }
        }        
    }

    // IViewManagerWithExportedEventTypeConstants
    ConstantProviderDelegate ReactWebView2Manager::ExportedCustomBubblingEventTypeConstants() noexcept {
        return nullptr;
    }

    ConstantProviderDelegate ReactWebView2Manager::ExportedCustomDirectEventTypeConstants() noexcept {
        return [](winrt::IJSValueWriter const& constantWriter) {
            WriteCustomDirectEventTypeConstant(constantWriter, "LoadingStart");
            WriteCustomDirectEventTypeConstant(constantWriter, "LoadingFinish");
            WriteCustomDirectEventTypeConstant(constantWriter, "LoadingError");
            WriteCustomDirectEventTypeConstant(constantWriter, "Message");
        };
    }

    // IViewManagerWithCommands
    IVectorView<hstring> ReactWebView2Manager::Commands() noexcept {
        auto commands = winrt::single_threaded_vector<hstring>();
        commands.Append(L"goForward");
        commands.Append(L"goBack");
        commands.Append(L"reload");
        commands.Append(L"stopLoading");
        commands.Append(L"injectJavaScript");
        return commands.GetView();
    }

    void ReactWebView2Manager::DispatchCommand(
        FrameworkElement const& view,
        winrt::hstring const& commandId,
        winrt::IJSValueReader const& commandArgsReader) noexcept {
        auto control = view.as<winrt::ContentPresenter>();
        auto content = control.Content();
        auto webView = content.as<winrt::WebView2>();
        auto commandArgs = JSValue::ReadArrayFrom(commandArgsReader);

        if (commandId == L"goForward") {
            if (webView.CanGoForward()) {
                webView.GoForward();
            }
        }
        else if (commandId == L"goBack") {
            if (webView.CanGoBack()) {
                webView.GoBack();
            }
        }
        else if (commandId == L"reload") {
            webView.Reload();
        }
        else if (commandId == L"stopLoading") {
            webView.CoreWebView2().Stop();
        }
        else if (commandId == L"injectJavaScript") {
            webView.ExecuteScriptAsync(winrt::to_hstring(commandArgs[0].AsString()));
        } 
    }

} // namespace winrt::ReactNativeWebView::implementation

#endif // HAS_WEBVIEW2
