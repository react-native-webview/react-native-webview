#include "pch.h"
#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "ReactWebViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeWebView::implementation {

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept {
  packageBuilder.AddViewManager(L"ReactWebViewManager", []() { return winrt::make<ReactWebViewManager>(); });
}

} // namespace winrt::ReactNativeWebView::implementation
