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
      auto view = winrt::ReactNativeWebView::ReactWebView(m_reactContext);
      return view;
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
        nativeProps.Insert(L"backgroundColor", ViewManagerPropertyType::Color);
        nativeProps.Insert(L"messagingEnabled", ViewManagerPropertyType::Boolean);
        return nativeProps.GetView();
    }

    void ReactWebViewManager::UpdateProperties(
        FrameworkElement const& view,
        IJSValueReader const& propertyMapReader) noexcept {
        auto control = view.as<winrt::UserControl>();
        auto content = control.Content();
        auto webView = content.as<winrt::WebView>();
        const JSValueObject& propertyMap = JSValueObject::ReadFrom(propertyMapReader);

        for (auto const& pair : propertyMap) {
            auto const& propertyName = pair.first;
            auto const& propertyValue = pair.second;
            if (propertyValue.IsNull()) continue;

            if (propertyName == "source") {
                auto const& srcMap = propertyValue.AsObject();
                if (srcMap.find("uri") != srcMap.end()) {
                    auto uriString = srcMap.at("uri").AsString();
                    if (uriString.length() == 0) {
                        continue;
                    }

                    bool isPackagerAsset = false;
                    if (srcMap.find("__packager_asset") != srcMap.end()) {
                        isPackagerAsset = srcMap.at("__packager_asset").AsBoolean();
                    }
                    if (isPackagerAsset && uriString.find("file://") == 0) {
                        auto bundleRootPath = winrt::to_string(ReactNativeHost().InstanceSettings().BundleRootPath());
                        uriString.replace(0, 7, bundleRootPath.empty() ? "ms-appx-web:///Bundle/" : bundleRootPath);
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
            else if (propertyName == "messagingEnabled") {
              auto messagingEnabled = propertyValue.To<bool>();
              auto reactWebView = view.as<ReactNativeWebView::ReactWebView>();
              reactWebView.SetMessagingEnabled(messagingEnabled);
            }
        }        
    }

    // IViewManagerWithExportedEventTypeConstants
    ConstantProviderDelegate ReactWebViewManager::ExportedCustomBubblingEventTypeConstants() noexcept {
        return nullptr;
    }

    ConstantProviderDelegate ReactWebViewManager::ExportedCustomDirectEventTypeConstants() noexcept {
        return [](winrt::IJSValueWriter const& constantWriter) {
            WriteCustomDirectEventTypeConstant(constantWriter, "LoadingStart");
            WriteCustomDirectEventTypeConstant(constantWriter, "LoadingFinish");
            WriteCustomDirectEventTypeConstant(constantWriter, "LoadingError");
            WriteCustomDirectEventTypeConstant(constantWriter, "Message");
        };
    }

    // IViewManagerWithCommands
    IVectorView<hstring> ReactWebViewManager::Commands() noexcept {
        auto commands = winrt::single_threaded_vector<hstring>();
        commands.Append(L"goForward");
        commands.Append(L"goBack");
        commands.Append(L"reload");
        commands.Append(L"stopLoading");
        commands.Append(L"injectJavaScript");
        return commands.GetView();
    }

    void ReactWebViewManager::DispatchCommand(
        FrameworkElement const& view,
        winrt::hstring const& commandId,
        winrt::IJSValueReader const& commandArgsReader) noexcept {
        auto control = view.as<winrt::UserControl>();
        auto content = control.Content();
        auto webView = content.as<winrt::WebView>();
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
            webView.Refresh();
        }
        else if (commandId == L"stopLoading") {
            webView.Stop();
        }
        else if (commandId == L"injectJavaScript") {
            webView.InvokeScriptAsync(L"eval", { winrt::to_hstring(commandArgs[0].AsString()) });
        } 
    }

} // namespace winrt::ReactWebView::implementation