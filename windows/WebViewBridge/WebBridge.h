#pragma once

using namespace Windows::Foundation;

namespace WebViewBridge
{
  public delegate void MessagePosted(Platform::String^ message);

  [Windows::Foundation::Metadata::AllowForWebAttribute]
  public ref class WebBridge sealed
    {
    public:
      WebBridge(int64 tag);
      void PostMessage(Platform::String^ message);
      event MessagePosted^ MessagePostedEvent;
    private:
      Windows::UI::Core::CoreDispatcher^ m_dispatcher;
      int64 m_tag;
    };
}
