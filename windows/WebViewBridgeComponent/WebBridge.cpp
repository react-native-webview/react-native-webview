#include "pch.h"
#include "WebBridge.h"
#include "WebBridge.g.cpp"

namespace winrt::WebViewBridgeComponent::implementation
{
  winrt::event_token WebBridge::MessagePostEvent(Windows::Foundation::EventHandler<winrt::hstring> const& handler)
  {
    return m_messageEvent.add(handler);
  }

  void WebBridge::MessagePostEvent(winrt::event_token const& token) noexcept
  {
    m_messageEvent.remove(token);
  }

  void WebBridge::PostMessage(winrt::hstring message)
  {
    m_messageEvent(*this, message);
  }

}
