#include "ReactNativeWebview.h"

namespace winrt::ReactNativeWebview {

void ReactNativeWebview::Initialize(React::ReactContext const &reactContext) noexcept {
  m_context = reactContext;
}

void ReactNativeWebview::isFileUploadSupported(bool result) noexcept {
  // TODO: Implement isFileUploadSupported
}

void ReactNativeWebview::shouldStartLoadWithLockIdentifier(bool shouldStart, double lockIdentifier) noexcept {
  // TODO: Implement shouldStartLoadWithLockIdentifier
}

void ReactNativeWebview::messagingEnabled(bool enabled) noexcept {
  // TODO: Implement messagingEnabled
}

void ReactNativeWebview::setInjectedJavascript(winrt::hstring const& payload) noexcept {
  // TODO: Implement setInjectedJavascript
}

void ReactNativeWebview::requestFocus() noexcept {
  // TODO: Implement requestFocus
}

void ReactNativeWebview::postMessage(winrt::hstring const& message) noexcept {
  // TODO: Implement postMessage
}

void ReactNativeWebview::onDOMContentLoaded() noexcept {
  // TODO: Implement onDOMContentLoaded
}

void ReactNativeWebview::onNavigationStarting() noexcept {
  // TODO: Implement onNavigationStarting
}

void ReactNativeWebview::onNavigationCompleted() noexcept {
  // TODO: Implement onNavigationCompleted
}

void ReactNativeWebview::onNavigationFailed() noexcept {
  // TODO: Implement onNavigationFailed
}

void ReactNativeWebview::onMessagePosted(winrt::hstring const& message) noexcept {
  // TODO: Implement onMessagePosted
}

} // namespace winrt::ReactNativeWebview
