#pragma once

using namespace Windows::Foundation;

namespace WebViewBridge
{
  [Windows::Foundation::Metadata::AllowForWebAttribute]
  public ref class WebBridge sealed
    {
    public:
      WebBridge(int64 tag);
      void PostMessage();
    };
}


// https://github.com/MicrosoftEdge/JSBrowser/blob/master/NativeListener/KeyHandler.h