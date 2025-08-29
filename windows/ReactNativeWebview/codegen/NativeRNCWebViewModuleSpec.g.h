
/*
 * This file is auto-generated from a NativeModule spec file in js.
 *
 * This is a C++ Spec class that should be used with MakeTurboModuleProvider to register native modules
 * in a way that also verifies at compile time that the native module matches the interface required
 * by the TurboModule JS spec.
 */
#pragma once
// clang-format off


#include <NativeModules.h>
#include <tuple>

namespace ReactNativeWebviewCodegen {

struct RNCWebViewModuleSpec : winrt::Microsoft::ReactNative::TurboModuleSpec {
  static constexpr auto methods = std::tuple{
      Method<void(Promise<bool>) noexcept>{0, L"isFileUploadSupported"},
      Method<void(bool, double) noexcept>{1, L"shouldStartLoadWithLockIdentifier"},
      Method<void(bool) noexcept>{2, L"messagingEnabled"},
      SyncMethod<bool() noexcept>{3, L"isMessagingEnabled"},
      Method<void(std::string) noexcept>{4, L"setInjectedJavascript"},
      Method<void() noexcept>{5, L"requestFocus"},
      Method<void(std::string) noexcept>{6, L"postMessage"},
      Method<void() noexcept>{7, L"onDOMContentLoaded"},
      Method<void() noexcept>{8, L"onNavigationStarting"},
      Method<void() noexcept>{9, L"onNavigationCompleted"},
      Method<void() noexcept>{10, L"onNavigationFailed"},
      Method<void(std::string) noexcept>{11, L"onMessagePosted"},
  };

  template <class TModule>
  static constexpr void ValidateModule() noexcept {
    constexpr auto methodCheckResults = CheckMethods<TModule, RNCWebViewModuleSpec>();

    REACT_SHOW_METHOD_SPEC_ERRORS(
          0,
          "isFileUploadSupported",
          "    REACT_METHOD(isFileUploadSupported) void isFileUploadSupported(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isFileUploadSupported) static void isFileUploadSupported(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          1,
          "shouldStartLoadWithLockIdentifier",
          "    REACT_METHOD(shouldStartLoadWithLockIdentifier) void shouldStartLoadWithLockIdentifier(bool shouldStart, double lockIdentifier) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(shouldStartLoadWithLockIdentifier) static void shouldStartLoadWithLockIdentifier(bool shouldStart, double lockIdentifier) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          2,
          "messagingEnabled",
          "    REACT_METHOD(messagingEnabled) void messagingEnabled(bool enabled) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(messagingEnabled) static void messagingEnabled(bool enabled) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          3,
          "isMessagingEnabled",
          "    REACT_SYNC_METHOD(isMessagingEnabled) bool isMessagingEnabled() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(isMessagingEnabled) static bool isMessagingEnabled() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          4,
          "setInjectedJavascript",
          "    REACT_METHOD(setInjectedJavascript) void setInjectedJavascript(std::string payload) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(setInjectedJavascript) static void setInjectedJavascript(std::string payload) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          5,
          "requestFocus",
          "    REACT_METHOD(requestFocus) void requestFocus() noexcept { /* implementation */ }\n"
          "    REACT_METHOD(requestFocus) static void requestFocus() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          6,
          "postMessage",
          "    REACT_METHOD(postMessage) void postMessage(std::string message) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(postMessage) static void postMessage(std::string message) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          7,
          "onDOMContentLoaded",
          "    REACT_METHOD(onDOMContentLoaded) void onDOMContentLoaded() noexcept { /* implementation */ }\n"
          "    REACT_METHOD(onDOMContentLoaded) static void onDOMContentLoaded() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          8,
          "onNavigationStarting",
          "    REACT_METHOD(onNavigationStarting) void onNavigationStarting() noexcept { /* implementation */ }\n"
          "    REACT_METHOD(onNavigationStarting) static void onNavigationStarting() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          9,
          "onNavigationCompleted",
          "    REACT_METHOD(onNavigationCompleted) void onNavigationCompleted() noexcept { /* implementation */ }\n"
          "    REACT_METHOD(onNavigationCompleted) static void onNavigationCompleted() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          10,
          "onNavigationFailed",
          "    REACT_METHOD(onNavigationFailed) void onNavigationFailed() noexcept { /* implementation */ }\n"
          "    REACT_METHOD(onNavigationFailed) static void onNavigationFailed() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          11,
          "onMessagePosted",
          "    REACT_METHOD(onMessagePosted) void onMessagePosted(std::string message) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(onMessagePosted) static void onMessagePosted(std::string message) noexcept { /* implementation */ }\n");
  }
};

} // namespace ReactNativeWebviewCodegen
