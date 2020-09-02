#include "pch.h"
#include "WebBridge.h"



using namespace WebViewBridge;
using namespace Platform;

using namespace Windows::UI::Core;

// https://docs.microsoft.com/en-us/windows/uwp/winrt-components/create-a-windows-runtime-component-in-cppwinrt
// https://github.com/microsoft/react-native-windows/blob/0.59-legacy/current/ReactWindows/ReactNativeWebViewBridge/WebViewBridge.cs
// https://github.com/MicrosoftEdge/JSBrowser/blob/master/NativeListener

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
        MessagePostedEvent(message);
      }));
  
}
