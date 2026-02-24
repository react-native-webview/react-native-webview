#pragma once

#include "pch.h"
#include "resource.h"

#if __has_include("codegen/NativeWebviewModuleSpec.g.h")
  #include "codegen/NativeWebviewModuleSpec.g.h"
#endif

#include "NativeModules.h"

namespace winrt::ReactNativeWebview
{

// See https://microsoft.github.io/react-native-windows/docs/native-platform for help writing native modules

REACT_MODULE(RNCWebViewModule)
struct RNCWebViewModule
{
#if __has_include("codegen/NativeWebviewModuleSpec.g.h")
  using ModuleSpec = RNCWebViewCodegen::WebviewModuleSpec;
#endif

  REACT_INIT(Initialize)
  void Initialize(React::ReactContext const &reactContext) noexcept;

  REACT_METHOD(shouldStartLoadWithLockIdentifier)
  void shouldStartLoadWithLockIdentifier(bool shouldStart, double lockIdentifier) noexcept;

  REACT_METHOD(isFileUploadSupported)
  void isFileUploadSupported(React::ReactPromise<bool> &&promise) noexcept;

private:
  React::ReactContext m_context;
};

} // namespace winrt::ReactNativeWebview