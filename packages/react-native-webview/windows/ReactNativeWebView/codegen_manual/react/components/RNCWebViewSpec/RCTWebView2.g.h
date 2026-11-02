
/*
 * This file is auto-generated from RCTWebView2NativeComponent spec file in flow / TypeScript.
 */
// clang-format off
#pragma once

#include <NativeModules.h>

#ifdef RNW_NEW_ARCH
#include <JSValueComposition.h>

#include <winrt/Microsoft.ReactNative.Composition.h>
#include <winrt/Microsoft.UI.Composition.h>
#endif // #ifdef RNW_NEW_ARCH

#ifdef RNW_NEW_ARCH

namespace RNCWebViewCodegen {

REACT_STRUCT(RCTWebView2Spec_RCTWebView2Props_newSource)
struct RCTWebView2Spec_RCTWebView2Props_newSource {
  REACT_FIELD(uri)
  std::optional<std::string> uri;

  REACT_FIELD(method)
  std::optional<std::string> method;

  REACT_FIELD(body)
  std::optional<std::string> body;

  REACT_FIELD(html)
  std::optional<std::string> html;

  REACT_FIELD(baseUrl)
  std::optional<std::string> baseUrl;
};

REACT_STRUCT(RCTWebView2Spec_RCTWebView2Props_basicAuthCredential)
struct RCTWebView2Spec_RCTWebView2Props_basicAuthCredential {
  REACT_FIELD(username)
  std::string username;

  REACT_FIELD(password)
  std::string password;
};

REACT_STRUCT(RCTWebView2Props)
struct RCTWebView2Props : winrt::implements<RCTWebView2Props, winrt::Microsoft::ReactNative::IComponentProps> {
  RCTWebView2Props(winrt::Microsoft::ReactNative::ViewProps props, const winrt::Microsoft::ReactNative::IComponentProps& cloneFrom)
    : ViewProps(props)
  {
     if (cloneFrom) {
       auto cloneFromProps = cloneFrom.as<RCTWebView2Props>();
       testID = cloneFromProps->testID;
       linkHandlingEnabled = cloneFromProps->linkHandlingEnabled;
       cacheEnabled = cloneFromProps->cacheEnabled;
       incognito = cloneFromProps->incognito;
       injectedJavaScript = cloneFromProps->injectedJavaScript;
       injectedJavaScriptBeforeContentLoaded = cloneFromProps->injectedJavaScriptBeforeContentLoaded;
       injectedJavaScriptForMainFrameOnly = cloneFromProps->injectedJavaScriptForMainFrameOnly;
       injectedJavaScriptBeforeContentLoadedForMainFrameOnly = cloneFromProps->injectedJavaScriptBeforeContentLoadedForMainFrameOnly;
       javaScriptCanOpenWindowsAutomatically = cloneFromProps->javaScriptCanOpenWindowsAutomatically;
       javaScriptEnabled = cloneFromProps->javaScriptEnabled;
       mediaPlaybackRequiresUserAction = cloneFromProps->mediaPlaybackRequiresUserAction;
       webviewDebuggingEnabled = cloneFromProps->webviewDebuggingEnabled;
       messagingEnabled = cloneFromProps->messagingEnabled;
       showsHorizontalScrollIndicator = cloneFromProps->showsHorizontalScrollIndicator;
       showsVerticalScrollIndicator = cloneFromProps->showsVerticalScrollIndicator;
       newSource = cloneFromProps->newSource;
       sourceHeaders = cloneFromProps->sourceHeaders;
       basicAuthCredential = cloneFromProps->basicAuthCredential;
       userAgent = cloneFromProps->userAgent;
       applicationNameForUserAgent = cloneFromProps->applicationNameForUserAgent;  
     }
  }

  void SetProp(uint32_t hash, winrt::hstring propName, winrt::Microsoft::ReactNative::IJSValueReader value) noexcept {
    winrt::Microsoft::ReactNative::ReadProp(hash, propName, value, *this);
  }

  REACT_FIELD(testID)
  std::optional<std::string> testID;

  REACT_FIELD(linkHandlingEnabled)
  std::optional<bool> linkHandlingEnabled{};

  REACT_FIELD(cacheEnabled)
  bool cacheEnabled{true};

  REACT_FIELD(incognito)
  std::optional<bool> incognito{};

  REACT_FIELD(injectedJavaScript)
  std::optional<std::string> injectedJavaScript;

  REACT_FIELD(injectedJavaScriptBeforeContentLoaded)
  std::optional<std::string> injectedJavaScriptBeforeContentLoaded;

  REACT_FIELD(injectedJavaScriptForMainFrameOnly)
  bool injectedJavaScriptForMainFrameOnly{true};

  REACT_FIELD(injectedJavaScriptBeforeContentLoadedForMainFrameOnly)
  bool injectedJavaScriptBeforeContentLoadedForMainFrameOnly{true};

  REACT_FIELD(javaScriptCanOpenWindowsAutomatically)
  std::optional<bool> javaScriptCanOpenWindowsAutomatically{};

  REACT_FIELD(javaScriptEnabled)
  bool javaScriptEnabled{true};

  REACT_FIELD(mediaPlaybackRequiresUserAction)
  bool mediaPlaybackRequiresUserAction{true};

  REACT_FIELD(webviewDebuggingEnabled)
  std::optional<bool> webviewDebuggingEnabled{};

  REACT_FIELD(messagingEnabled)
  bool messagingEnabled{};

  REACT_FIELD(showsHorizontalScrollIndicator)
  bool showsHorizontalScrollIndicator{true};

  REACT_FIELD(showsVerticalScrollIndicator)
  bool showsVerticalScrollIndicator{true};

  REACT_FIELD(newSource)
  RCTWebView2Spec_RCTWebView2Props_newSource newSource;

  REACT_FIELD(sourceHeaders)
  std::optional<std::string> sourceHeaders;

  REACT_FIELD(basicAuthCredential)
  std::optional<RCTWebView2Spec_RCTWebView2Props_basicAuthCredential> basicAuthCredential;

  REACT_FIELD(userAgent)
  std::optional<std::string> userAgent;

  REACT_FIELD(applicationNameForUserAgent)
  std::optional<std::string> applicationNameForUserAgent;

  const winrt::Microsoft::ReactNative::ViewProps ViewProps;
};

REACT_STRUCT(RCTWebView2_OnOpenWindow)
struct RCTWebView2_OnOpenWindow {
  REACT_FIELD(targetUrl)
  std::string targetUrl;
};

REACT_STRUCT(RCTWebView2_OnSourceChanged)
struct RCTWebView2_OnSourceChanged {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(navigationType)
  std::string navigationType;

  REACT_FIELD(mainDocumentURL)
  std::optional<std::string> mainDocumentURL;
};

REACT_STRUCT(RCTWebView2_OnLoadingError)
struct RCTWebView2_OnLoadingError {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(domain)
  std::optional<std::string> domain;

  REACT_FIELD(code)
  int32_t code{};

  REACT_FIELD(description)
  std::string description;
};

REACT_STRUCT(RCTWebView2_OnLoadingFinish)
struct RCTWebView2_OnLoadingFinish {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(navigationType)
  std::string navigationType;

  REACT_FIELD(mainDocumentURL)
  std::optional<std::string> mainDocumentURL;
};

REACT_STRUCT(RCTWebView2_OnLoadingProgress)
struct RCTWebView2_OnLoadingProgress {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(progress)
  double progress{};
};

REACT_STRUCT(RCTWebView2_OnLoadingStart)
struct RCTWebView2_OnLoadingStart {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(navigationType)
  std::string navigationType;

  REACT_FIELD(mainDocumentURL)
  std::optional<std::string> mainDocumentURL;
};

REACT_STRUCT(RCTWebView2_OnHttpError)
struct RCTWebView2_OnHttpError {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(description)
  std::string description;

  REACT_FIELD(statusCode)
  int32_t statusCode{};
};

REACT_STRUCT(RCTWebView2_OnMessage)
struct RCTWebView2_OnMessage {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(data)
  std::string data;
};

REACT_STRUCT(RCTWebView2_OnScroll)
struct RCTWebView2_OnScroll {
  REACT_FIELD(contentInsetTop)
  double contentInsetTop{};

  REACT_FIELD(contentInsetBottom)
  double contentInsetBottom{};

  REACT_FIELD(contentInsetLeft)
  double contentInsetLeft{};

  REACT_FIELD(contentInsetRight)
  double contentInsetRight{};

  REACT_FIELD(contentOffsetX)
  double contentOffsetX{};

  REACT_FIELD(contentOffsetY)
  double contentOffsetY{};

  REACT_FIELD(contentSizeWidth)
  double contentSizeWidth{};

  REACT_FIELD(contentSizeHeight)
  double contentSizeHeight{};

  REACT_FIELD(layoutMeasurementWidth)
  double layoutMeasurementWidth{};

  REACT_FIELD(layoutMeasurementHeight)
  double layoutMeasurementHeight{};

  REACT_FIELD(zoomScale)
  std::optional<double> zoomScale{};
};

REACT_STRUCT(RCTWebView2_OnShouldStartLoadWithRequest)
struct RCTWebView2_OnShouldStartLoadWithRequest {
  REACT_FIELD(url)
  std::string url;

  REACT_FIELD(loading)
  bool loading{};

  REACT_FIELD(title)
  std::string title;

  REACT_FIELD(canGoBack)
  bool canGoBack{};

  REACT_FIELD(canGoForward)
  bool canGoForward{};

  REACT_FIELD(lockIdentifier)
  double lockIdentifier{};

  REACT_FIELD(navigationType)
  std::string navigationType;

  REACT_FIELD(mainDocumentURL)
  std::optional<std::string> mainDocumentURL;

  REACT_FIELD(isTopFrame)
  bool isTopFrame{};
};

struct RCTWebView2EventEmitter {
  RCTWebView2EventEmitter(const winrt::Microsoft::ReactNative::EventEmitter &eventEmitter)
      : m_eventEmitter(eventEmitter) {}

  using OnOpenWindow = RCTWebView2_OnOpenWindow;
  using OnSourceChanged = RCTWebView2_OnSourceChanged;
  using OnLoadingError = RCTWebView2_OnLoadingError;
  using OnLoadingFinish = RCTWebView2_OnLoadingFinish;
  using OnLoadingProgress = RCTWebView2_OnLoadingProgress;
  using OnLoadingStart = RCTWebView2_OnLoadingStart;
  using OnHttpError = RCTWebView2_OnHttpError;
  using OnMessage = RCTWebView2_OnMessage;
  using OnScroll = RCTWebView2_OnScroll;
  using OnShouldStartLoadWithRequest = RCTWebView2_OnShouldStartLoadWithRequest;

  void onOpenWindow(OnOpenWindow &value) const {
    m_eventEmitter.DispatchEvent(L"openWindow", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onSourceChanged(OnSourceChanged &value) const {
    m_eventEmitter.DispatchEvent(L"sourceChanged", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onLoadingError(OnLoadingError &value) const {
    m_eventEmitter.DispatchEvent(L"loadingError", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onLoadingFinish(OnLoadingFinish &value) const {
    m_eventEmitter.DispatchEvent(L"loadingFinish", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onLoadingProgress(OnLoadingProgress &value) const {
    m_eventEmitter.DispatchEvent(L"loadingProgress", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onLoadingStart(OnLoadingStart &value) const {
    m_eventEmitter.DispatchEvent(L"loadingStart", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onHttpError(OnHttpError &value) const {
    m_eventEmitter.DispatchEvent(L"httpError", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onMessage(OnMessage &value) const {
    m_eventEmitter.DispatchEvent(L"message", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onScroll(OnScroll &value) const {
    m_eventEmitter.DispatchEvent(L"scroll", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

  void onShouldStartLoadWithRequest(OnShouldStartLoadWithRequest &value) const {
    m_eventEmitter.DispatchEvent(L"shouldStartLoadWithRequest", [value](const winrt::Microsoft::ReactNative::IJSValueWriter writer) {
      winrt::Microsoft::ReactNative::WriteValue(writer, value);
    });
  }

 private:
  winrt::Microsoft::ReactNative::EventEmitter m_eventEmitter{nullptr};
};

template<typename TUserData>
struct BaseRCTWebView2 {

  virtual void UpdateProps(
    const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
    const winrt::com_ptr<RCTWebView2Props> &newProps,
    const winrt::com_ptr<RCTWebView2Props> &/*oldProps*/) noexcept {
    m_props = newProps;
  }

  // UpdateLayoutMetrics will only be called if this method is overridden
  virtual void UpdateLayoutMetrics(
    const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
    const winrt::Microsoft::ReactNative::LayoutMetrics &/*newLayoutMetrics*/,
    const winrt::Microsoft::ReactNative::LayoutMetrics &/*oldLayoutMetrics*/) noexcept {
  }

  // UpdateState will only be called if this method is overridden
  virtual void UpdateState(
    const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
    const winrt::Microsoft::ReactNative::IComponentState &/*newState*/) noexcept {
  }

  virtual void UpdateEventEmitter(const std::shared_ptr<RCTWebView2EventEmitter> &eventEmitter) noexcept {
    m_eventEmitter = eventEmitter;
  }

  // MountChildComponentView will only be called if this method is overridden
  virtual void MountChildComponentView(const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
           const winrt::Microsoft::ReactNative::MountChildComponentViewArgs &/*args*/) noexcept {
  }

  // UnmountChildComponentView will only be called if this method is overridden
  virtual void UnmountChildComponentView(const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
           const winrt::Microsoft::ReactNative::UnmountChildComponentViewArgs &/*args*/) noexcept {
  }

  // Initialize will only be called if this method is overridden
  virtual void Initialize(const winrt::Microsoft::ReactNative::ComponentView &/*view*/) noexcept {
  }

  // CreateVisual will only be called if this method is overridden
  virtual winrt::Microsoft::UI::Composition::Visual CreateVisual(const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
    return view.as<winrt::Microsoft::ReactNative::Composition::ComponentView>().Compositor().CreateSpriteVisual();
  }

  // FinalizeUpdate will only be called if this method is overridden
  virtual void FinalizeUpdate(const winrt::Microsoft::ReactNative::ComponentView &/*view*/,
                                        winrt::Microsoft::ReactNative::ComponentViewUpdateMask /*mask*/) noexcept {
  }

  // You must provide an implementation of this method to handle the "goBack" command
  virtual void HandleGoBackCommand() noexcept = 0;

  // You must provide an implementation of this method to handle the "goForward" command
  virtual void HandleGoForwardCommand() noexcept = 0;

  // You must provide an implementation of this method to handle the "reload" command
  virtual void HandleReloadCommand() noexcept = 0;

  // You must provide an implementation of this method to handle the "stopLoading" command
  virtual void HandleStopLoadingCommand() noexcept = 0;

  // You must provide an implementation of this method to handle the "injectJavaScript" command
  virtual void HandleInjectJavaScriptCommand(std::string javascript) noexcept = 0;

  // You must provide an implementation of this method to handle the "requestFocus" command
  virtual void HandleRequestFocusCommand() noexcept = 0;

  // You must provide an implementation of this method to handle the "postMessage" command
  virtual void HandlePostMessageCommand(std::string data) noexcept = 0;

  // You must provide an implementation of this method to handle the "loadUrl" command
  virtual void HandleLoadUrlCommand(std::string url) noexcept = 0;

  // You must provide an implementation of this method to handle the "clearCache" command
  virtual void HandleClearCacheCommand(bool includeDiskFiles) noexcept = 0;

  void HandleCommand(const winrt::Microsoft::ReactNative::ComponentView &view, const winrt::Microsoft::ReactNative::HandleCommandArgs& args) noexcept {
    auto userData = view.UserData().as<TUserData>();
    auto commandName = args.CommandName();
    if (commandName == L"goBack") {

      userData->HandleGoBackCommand();
      return;
    }

    if (commandName == L"goForward") {

      userData->HandleGoForwardCommand();
      return;
    }

    if (commandName == L"reload") {

      userData->HandleReloadCommand();
      return;
    }

    if (commandName == L"stopLoading") {

      userData->HandleStopLoadingCommand();
      return;
    }

    if (commandName == L"injectJavaScript") {
      std::string javascript;
      winrt::Microsoft::ReactNative::ReadArgs(args.CommandArgs(), javascript);
      userData->HandleInjectJavaScriptCommand(javascript);
      return;
    }

    if (commandName == L"requestFocus") {

      userData->HandleRequestFocusCommand();
      return;
    }

    if (commandName == L"postMessage") {
      std::string data;
      winrt::Microsoft::ReactNative::ReadArgs(args.CommandArgs(), data);
      userData->HandlePostMessageCommand(data);
      return;
    }

    if (commandName == L"loadUrl") {
      std::string url;
      winrt::Microsoft::ReactNative::ReadArgs(args.CommandArgs(), url);
      userData->HandleLoadUrlCommand(url);
      return;
    }

    if (commandName == L"clearCache") {
      bool includeDiskFiles;
      winrt::Microsoft::ReactNative::ReadArgs(args.CommandArgs(), includeDiskFiles);
      userData->HandleClearCacheCommand(includeDiskFiles);
      return;
    }
  }

  const std::shared_ptr<RCTWebView2EventEmitter>& EventEmitter() const { return m_eventEmitter; }
  const winrt::com_ptr<RCTWebView2Props>& Props() const { return m_props; }

private:
  winrt::com_ptr<RCTWebView2Props> m_props;
  std::shared_ptr<RCTWebView2EventEmitter> m_eventEmitter;
};

template <typename TUserData>
void RegisterRCTWebView2NativeComponent(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder,
    std::function<void(const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder&)> builderCallback) noexcept {
  packageBuilder.as<winrt::Microsoft::ReactNative::IReactPackageBuilderFabric>().AddViewComponent(
      L"WebView2", [builderCallback](winrt::Microsoft::ReactNative::IReactViewComponentBuilder const &builder) noexcept {
        auto compBuilder = builder.as<winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder>();

        builder.SetCreateProps([](winrt::Microsoft::ReactNative::ViewProps props,
                              const winrt::Microsoft::ReactNative::IComponentProps& cloneFrom) noexcept {
            return winrt::make<RCTWebView2Props>(props, cloneFrom); 
        });

        builder.SetUpdatePropsHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     const winrt::Microsoft::ReactNative::IComponentProps &newProps,
                                     const winrt::Microsoft::ReactNative::IComponentProps &oldProps) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->UpdateProps(view, newProps ? newProps.as<RCTWebView2Props>() : nullptr, oldProps ? oldProps.as<RCTWebView2Props>() : nullptr);
        });

        compBuilder.SetUpdateLayoutMetricsHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::LayoutMetrics &newLayoutMetrics,
                                      const winrt::Microsoft::ReactNative::LayoutMetrics &oldLayoutMetrics) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->UpdateLayoutMetrics(view, newLayoutMetrics, oldLayoutMetrics);
        });

        builder.SetUpdateEventEmitterHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     const winrt::Microsoft::ReactNative::EventEmitter &eventEmitter) noexcept {
          auto userData = view.UserData().as<TUserData>();
          userData->UpdateEventEmitter(std::make_shared<RCTWebView2EventEmitter>(eventEmitter));
        });

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::FinalizeUpdate != &BaseRCTWebView2<TUserData>::FinalizeUpdate) {
            builder.SetFinalizeUpdateHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     winrt::Microsoft::ReactNative::ComponentViewUpdateMask mask) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->FinalizeUpdate(view, mask);
          });
        } 

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::UpdateState != &BaseRCTWebView2<TUserData>::UpdateState) {
          builder.SetUpdateStateHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                     const winrt::Microsoft::ReactNative::IComponentState &newState) noexcept {
            auto userData = view.UserData().as<TUserData>();
            userData->UpdateState(view, newState);
          });
        }

        builder.SetCustomCommandHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                          const winrt::Microsoft::ReactNative::HandleCommandArgs& args) noexcept {
          auto userData = view.UserData().as<TUserData>();
          userData->HandleCommand(view, args);
        });

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::MountChildComponentView != &BaseRCTWebView2<TUserData>::MountChildComponentView) {
          builder.SetMountChildComponentViewHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::MountChildComponentViewArgs &args) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->MountChildComponentView(view, args);
          });
        }

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::UnmountChildComponentView != &BaseRCTWebView2<TUserData>::UnmountChildComponentView) {
          builder.SetUnmountChildComponentViewHandler([](const winrt::Microsoft::ReactNative::ComponentView &view,
                                      const winrt::Microsoft::ReactNative::UnmountChildComponentViewArgs &args) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->UnmountChildComponentView(view, args);
          });
        }

        compBuilder.SetViewComponentViewInitializer([](const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
          auto userData = winrt::make_self<TUserData>();
          if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::Initialize != &BaseRCTWebView2<TUserData>::Initialize) {
            userData->Initialize(view);
          }
          view.UserData(*userData);
        });

        if CONSTEXPR_SUPPORTED_ON_VIRTUAL_FN_ADDRESS (&TUserData::CreateVisual != &BaseRCTWebView2<TUserData>::CreateVisual) {
          compBuilder.SetCreateVisualHandler([](const winrt::Microsoft::ReactNative::ComponentView &view) noexcept {
            auto userData = view.UserData().as<TUserData>();
            return userData->CreateVisual(view);
          });
        }

        // Allow app to further customize the builder
        if (builderCallback) {
          builderCallback(compBuilder);
        }
      });
}

} // namespace RNCWebViewCodegen

#endif // #ifdef RNW_NEW_ARCH
