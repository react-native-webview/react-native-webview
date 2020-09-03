#pragma once

#include "WebBridge.g.h"

namespace winrt::WebViewBridgeComponent::implementation
{
    struct WebBridge : WebBridgeT<WebBridge>
    {
    public:  
      WebBridge() = default;
      void PostMessage(winrt::hstring message);
      winrt::event_token MessagePostEvent(Windows::Foundation::EventHandler<winrt::hstring> const& handler);
      void MessagePostEvent(winrt::event_token const& token) noexcept;
    private:
      winrt::event<Windows::Foundation::EventHandler<winrt::hstring>> m_messageEvent;
    };

    
}

namespace winrt::WebViewBridgeComponent::factory_implementation
{
    struct WebBridge : WebBridgeT<WebBridge, implementation::WebBridge>
    {
    };
}
