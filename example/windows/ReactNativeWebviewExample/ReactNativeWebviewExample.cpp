// ReactNativeWebviewExample.cpp : Defines the entry point for the application.
//

#include "pch.h"
#include "ReactNativeWebviewExample.h"

#include "AutolinkedNativeModules.g.h"

#include "NativeModules.h"

// A PackageProvider containing any turbo modules you define within this app project
struct CompReactPackageProvider
    : winrt::implements<CompReactPackageProvider, winrt::Microsoft::ReactNative::IReactPackageProvider> {
 public: // IReactPackageProvider
  void CreatePackage(winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept {
    AddAttributedModules(packageBuilder, true);
  }
};

// The entry point of the Win32 application
_Use_decl_annotations_ int CALLBACK WinMain(HINSTANCE instance, HINSTANCE, PSTR /* commandLine */, int showCmd) {
  // Initialize WinRT
  winrt::init_apartment(winrt::apartment_type::single_threaded);

  // Enable per monitor DPI scaling
  SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);

  // Find the path hosting the app exe file
  WCHAR appDirectory[MAX_PATH];
  GetModuleFileNameW(NULL, appDirectory, MAX_PATH);
  PathCchRemoveFileSpec(appDirectory, MAX_PATH);

  // Create a ReactNativeWin32App with the ReactNativeAppBuilder
  auto reactNativeWin32App{winrt::Microsoft::ReactNative::ReactNativeAppBuilder().Build()};

  // Configure the initial InstanceSettings for the app's ReactNativeHost
  auto settings{reactNativeWin32App.ReactNativeHost().InstanceSettings()};
  // Register any autolinked native modules
  RegisterAutolinkedNativeModulePackages(settings.PackageProviders());
  // Register any native modules defined within this app project
  settings.PackageProviders().Append(winrt::make<CompReactPackageProvider>());

#if BUNDLE
  // Load the JS bundle from a file (not Metro):
  // Set the path (on disk) where the .bundle file is located
  settings.BundleRootPath(std::wstring(L"file://").append(appDirectory).append(L"\\Bundle\\").c_str());
  // Set the name of the bundle file (without the .bundle extension)
  settings.JavaScriptBundleFile(L"index.windows");
  // Disable hot reload
  settings.UseFastRefresh(false);
#else
  // Load the JS bundle from Metro
  settings.JavaScriptBundleFile(L"index");
  // Enable Fast Refresh so the bridgeless runtime loads the bundle from Metro
  // (UseFastRefresh(false) forces JsBigStringFromPath which requires a local .bundle file)
  settings.UseFastRefresh(true);
#endif
#if _DEBUG
  // For Debug builds
  // Disable Direct Debugging (causes 60s timeout + blank screen in bridgeless mode)
  settings.UseDirectDebugger(false);
  // Enable Fast Refresh — required in bridgeless mode to load bundles from Metro
  settings.UseFastRefresh(true);
  // Enable the Developer Menu
  settings.UseDeveloperSupport(true);
#else
  // For Release builds:
  // Disable Direct Debugging of JS
  settings.UseDirectDebugger(false);
  // Disable the Developer Menu
  settings.UseDeveloperSupport(false);
#endif

  // Get the AppWindow so we can configure its initial title and size
  auto appWindow{reactNativeWin32App.AppWindow()};
  appWindow.Title(L"WebviewExample");
  appWindow.Resize({1000, 1000});

  // Get the ReactViewOptions so we can set the initial RN component to load
  auto viewOptions{reactNativeWin32App.ReactViewOptions()};
  viewOptions.ComponentName(L"WebviewExample");

  // Start the app
  try {
    reactNativeWin32App.Start();
  } catch (winrt::hresult_error const& ex) {
    auto msg = ex.message();
    OutputDebugStringW(L"[RNW CRASH] hresult_error: ");
    OutputDebugStringW(msg.c_str());
    OutputDebugStringW(L"\n");
    wchar_t buf[512];
    swprintf_s(buf, L"hresult_error 0x%08X: %s", static_cast<uint32_t>(ex.code()), msg.c_str());
    MessageBoxW(nullptr, buf, L"ReactNative Crash", MB_OK | MB_ICONERROR);
    return 1;
  } catch (std::exception const& ex) {
    OutputDebugStringA("[RNW CRASH] std::exception: ");
    OutputDebugStringA(ex.what());
    OutputDebugStringA("\n");
    MessageBoxA(nullptr, ex.what(), "ReactNative Crash", MB_OK | MB_ICONERROR);
    return 1;
  } catch (...) {
    OutputDebugStringW(L"[RNW CRASH] Unknown exception\n");
    MessageBoxW(nullptr, L"Unknown exception in Start()", L"ReactNative Crash", MB_OK | MB_ICONERROR);
    return 1;
  }
}
