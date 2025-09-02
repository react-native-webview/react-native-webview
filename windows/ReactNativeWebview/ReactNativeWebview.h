#pragma once

#include "pch.h"
#include "resource.h"

#if __has_include("codegen/NativeReactNativeWebviewDataTypes.g.h")
  #include "codegen/NativeReactNativeWebviewDataTypes.g.h"
#endif
#include "codegen/NativeRNCWebViewModuleSpec.g.h"

#include "NativeModules.h"

namespace winrt::ReactNativeWebview
{

// See https://microsoft.github.io/react-native-windows/docs/native-platform for help writing native modules

REACT_MODULE(ReactNativeWebview)
struct ReactNativeWebview
{
  using ModuleSpec = RNCWebViewModuleCodegen::ReactNativeWebviewSpec;

  REACT_INIT(Initialize)
  void Initialize(React::ReactContext const &reactContext) noexcept;

  REACT_METHOD(isFileUploadSupported)
  void isFileUploadSupported(bool result) noexcept;

  REACT_METHOD(shouldStartLoadWithLockIdentifier)
  void shouldStartLoadWithLockIdentifier(bool shouldStart, double lockIdentifier) noexcept;

  REACT_METHOD(messagingEnabled)
  void messagingEnabled(bool enabled) noexcept;

  REACT_METHOD(setInjectedJavascript)
  void setInjectedJavascript(winrt::hstring const& payload) noexcept;

  REACT_METHOD(requestFocus)
  void requestFocus() noexcept;

  REACT_METHOD(postMessage)
  void postMessage(winrt::hstring const& message) noexcept;

  REACT_METHOD(onDOMContentLoaded)
  void onDOMContentLoaded() noexcept;

  REACT_METHOD(onNavigationStarting)
  void onNavigationStarting() noexcept;

  REACT_METHOD(onNavigationCompleted)
  void onNavigationCompleted() noexcept;

  REACT_METHOD(onNavigationFailed)
  void onNavigationFailed() noexcept;

  REACT_METHOD(onMessagePosted)
  void onMessagePosted(winrt::hstring const& message) noexcept;

private:
  React::ReactContext m_context;
};

} // namespace winrt::ReactNativeWebview