#pragma once

using namespace Windows::Foundation;

namespace WebViewBridge
{
  public delegate void MessagePosted(int message);

  [Windows::Foundation::Metadata::AllowForWebAttribute]
  public ref class WebBridge sealed
    {
    public:
      WebBridge(int64 tag);
      void PostMessage(int message);
      event MessagePosted^ MessagePostedEvent;
    private:
      Windows::UI::Core::CoreDispatcher^ m_dispatcher;
      int64 m_tag;
    };
}
