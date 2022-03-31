#pragma once

#define NOMINMAX
#include <unknwn.h>
#include <winrt/Windows.Data.Json.h>
#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.Foundation.Collections.h>
#include <winrt/Windows.UI.Popups.h>
#include <winrt/Windows.UI.Xaml.h>
#include <winrt/Windows.UI.Xaml.Controls.h>
#include <winrt/Windows.UI.Xaml.Markup.h>
#include <winrt/Windows.UI.Xaml.Navigation.h>
#include <winrt/Windows.Web.Http.h>
#include <winrt/Windows.Web.Http.Headers.h>
#include <winrt/Microsoft.ReactNative.h>
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#if __has_include(<VersionMacros.h>)
#include <VersionMacros.h>
#else
#define RNW_VERSION_AT_LEAST(x,y,z) false
#endif
