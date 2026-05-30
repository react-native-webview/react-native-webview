#include "pch.h"

#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "ReactNativeWebview.h"

#ifdef RNW_NEW_ARCH
#pragma message(">>> RNW_NEW_ARCH IS DEFINED - Fabric component registration will be compiled")
#include "RCTWebView2ComponentView.h"
#else
#pragma message(">>> RNW_NEW_ARCH IS NOT DEFINED - Fabric component registration SKIPPED")
#endif

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeWebView::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
  AddAttributedModules(packageBuilder, true);

#ifdef RNW_NEW_ARCH
  try {
    RegisterRCTWebView2ComponentView(packageBuilder);
  } catch (winrt::hresult_error const&) {
  } catch (std::exception const&) {
  } catch (...) {
  }
#endif
}

} // namespace winrt::ReactNativeWebView::implementation
