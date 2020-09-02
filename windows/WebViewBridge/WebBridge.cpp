#include "pch.h"
#include "WebBridge.h"



using namespace WebViewBridge;
using namespace Platform;

using namespace Windows::UI::Core;

WebBridge::WebBridge(int64 tag)
{
  m_tag = tag;
  // Must run on App UI thread
  m_dispatcher = Windows::UI::Core::CoreWindow::GetForCurrentThread()->Dispatcher;
}

void WebBridge::PostMessage(int message) {
  m_dispatcher->RunAsync(
    CoreDispatcherPriority::Normal,
    ref new DispatchedHandler([this, message]
      {
        OutputDebugStringW(L"> WebBridge sending MessagePostedEvent \n");
        MessagePostedEvent(message);
      }));
}
