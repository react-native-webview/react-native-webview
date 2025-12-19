// Re-exports for Windows WebView component
// This file provides backwards compatibility for imports from WebView.windows.tsx

export {
  default,
  RCTWebView2,
  Commands,
  Commands as WindowsCommands,
  type NativeProps,
  type NativeProps as WindowsNativeProps,
  type NativeCommands,
  type WebViewNativeEvent,
  type WebViewMessageEvent,
  type WebViewOpenWindowEvent,
  type WebViewHttpErrorEvent,
  type WebViewErrorEvent,
  type WebViewNativeProgressEvent,
  type WebViewNavigationEvent,
  type ShouldStartLoadRequestEvent,
} from './RCTWebView2NativeComponent';
