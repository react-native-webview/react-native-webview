// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
#if RNW_VERSION_AT_LEAST(0,68,0)
#pragma once
#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"
#include "ReactWebView2.h"

namespace winrt::ReactNativeWebView::implementation {
    
    class ReactWebView2Manager : public winrt::implements<
        ReactWebView2Manager,
        winrt::Microsoft::ReactNative::IViewManager,
        winrt::Microsoft::ReactNative::IViewManagerWithReactContext,
        winrt::Microsoft::ReactNative::IViewManagerWithNativeProperties,
        winrt::Microsoft::ReactNative::IViewManagerWithExportedEventTypeConstants,
        winrt::Microsoft::ReactNative::IViewManagerWithCommands> {
    public:
        ReactWebView2Manager();
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
        winrt::Windows::Foundation::Collections::IVectorView<winrt::hstring> Commands() noexcept;

        void DispatchCommand(
            winrt::Windows::UI::Xaml::FrameworkElement const& view,
            winrt::hstring const& commandId,
            winrt::Microsoft::ReactNative::IJSValueReader const& commandArgsReader) noexcept;

    private:
        winrt::Microsoft::ReactNative::IReactContext m_reactContext{ nullptr };

    };
} // namespace winrt::ReactNativeWebView::implementation
#endif