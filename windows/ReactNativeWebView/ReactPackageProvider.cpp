#include "pch.h"

#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "ReactNativeWebview.h"

#ifdef RNW_NEW_ARCH
#include "RCTWebView2ComponentView.h"
#endif

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeWebView::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
  AddAttributedModules(packageBuilder, true);

#ifdef RNW_NEW_ARCH
  // Register Fabric component with XamlIsland support
  RegisterRCTWebView2ComponentView(packageBuilder);
#endif
}

} // namespace winrt::ReactNativeWebView::implementation
