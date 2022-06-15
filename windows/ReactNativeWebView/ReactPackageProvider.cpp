#include "pch.h"
#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "ReactWebView2Manager.h"
#include "ReactWebViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeWebView::implementation {

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept {
  packageBuilder.AddViewManager(L"ReactWebViewManager", []() { return winrt::make<ReactWebViewManager>(); });

#if HAS_WEBVIEW2
  packageBuilder.AddViewManager(L"ReactWebView2Manager", []() { return winrt::make<ReactWebView2Manager>(); });
#endif
}

} // namespace winrt::ReactNativeWebView::implementation