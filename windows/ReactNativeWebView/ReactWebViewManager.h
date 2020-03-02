// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once
#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"

namespace winrt::ReactNativeWebView::implementation {
    
    enum class WebViewCommands : int32_t { GoForward = 0, GoBack = 1,  Reload = 2, StopLoading = 3, InjectJavaScript = 4 };
    enum class WebViewSourceType {Uri, Html, Unset};

    class ReactWebViewManager : public winrt::implements<
        ReactWebViewManager,
        winrt::Microsoft::ReactNative::IViewManager,
        winrt::Microsoft::ReactNative::IViewManagerWithReactContext,
        winrt::Microsoft::ReactNative::IViewManagerWithNativeProperties,
        winrt::Microsoft::ReactNative::IViewManagerWithExportedEventTypeConstants,
        winrt::Microsoft::ReactNative::IViewManagerWithCommands> {
    public:
        ReactWebViewManager();
        // IViewManager
        winrt::hstring Name() noexcept;
        winrt::Windows::UI::Xaml::FrameworkElement CreateView() noexcept;

        // IViewManagerWithReactContext
        winrt::Microsoft::ReactNative::IReactContext ReactContext() noexcept;
        void ReactContext(winrt::Microsoft::ReactNative::IReactContext reactContext) noexcept;

        // IViewManagerWithNativeProperties
        winrt::Windows::Foundation::Collections::
            IMapView<winrt::hstring, winrt::Microsoft::ReactNative::ViewManagerPropertyType>
            NativeProps() noexcept;

        void UpdateProperties(
            winrt::Windows::UI::Xaml::FrameworkElement const& view,
            winrt::Microsoft::ReactNative::IJSValueReader const& propertyMapReader) noexcept;

        // IViewManagerWithExportedEventTypeConstants
        winrt::Microsoft::ReactNative::ConstantProviderDelegate ExportedCustomBubblingEventTypeConstants() noexcept;
        winrt::Microsoft::ReactNative::ConstantProviderDelegate ExportedCustomDirectEventTypeConstants() noexcept;

        // IViewManagerWithCommands
        winrt::Windows::Foundation::Collections::IMapView<winrt::hstring, int64_t> Commands() noexcept;

        void DispatchCommand(
            winrt::Windows::UI::Xaml::FrameworkElement const& view,
            int64_t commandId,
            winrt::Microsoft::ReactNative::IJSValueReader const& commandArgsReader) noexcept;

    private:
        winrt::Windows::UI::Xaml::Controls::WebView m_webView{ nullptr };
        winrt::Microsoft::ReactNative::IReactContext m_reactContext{ nullptr };
        WebViewSourceType m_sourceType{ WebViewSourceType::Unset };
        winrt::Windows::UI::Xaml::Controls::WebView::NavigationStarting_revoker m_navigationStartingRevoker{};
        winrt::Windows::UI::Xaml::Controls::WebView::NavigationCompleted_revoker m_navigationCompletedRevoker{};
        winrt::Windows::UI::Xaml::Controls::WebView::NavigationFailed_revoker m_navigationFailedRevoker{};
        winrt::Windows::UI::Xaml::Controls::WebView::ScriptNotify_revoker m_scriptNotifyRevoker{};

        void RegisterEvents();
        void WriteWebViewNavigationEventArg(winrt::Microsoft::ReactNative::IJSValueWriter const& eventDataWriter);
        void OnNavigationStarting(winrt::Windows::UI::Xaml::Controls::WebView const& sender, winrt::Windows::UI::Xaml::Controls::WebViewNavigationStartingEventArgs const& args);
        void OnNavigationCompleted(winrt::Windows::UI::Xaml::Controls::WebView const& sender, winrt::Windows::UI::Xaml::Controls::WebViewNavigationCompletedEventArgs const& args);
        void OnNavigationFailed(winrt::Windows::Foundation::IInspectable const& sender, winrt::Windows::UI::Xaml::Controls::WebViewNavigationFailedEventArgs const& args);
        void OnScriptNotify(winrt::Windows::Foundation::IInspectable const& sender, winrt::Windows::UI::Xaml::Controls::NotifyEventArgs const& args);

        winrt::Windows::Foundation::IAsyncAction InjectJavaScript(winrt::hstring javaScript);
        winrt::Windows::UI::Color ColorFromHex(int64_t const hex);
    };
} // namespace winrt::ReactWebView::implementation
