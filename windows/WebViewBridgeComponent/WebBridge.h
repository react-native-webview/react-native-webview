#pragma once

#include "WebBridge.g.h"

namespace winrt::WebViewBridgeComponent::implementation
{
    struct WebBridge : WebBridgeT<WebBridge>
    {
      WebBridge() = default;
    };
}

namespace winrt::WebViewBridgeComponent::factory_implementation
{
    struct WebBridge : WebBridgeT<WebBridge, implementation::WebBridge>
    {
    };
}
