// Specs for react-native-webview Windows
// These are used by react-native-windows codegen to generate native types

// Component exports
export { default as RCTWebView2 } from './RCTWebView2NativeComponent';
export * from './RCTWebView2NativeComponent';

// Module exports
export { RNCWebViewModule } from './NativeWebviewModule';
export type { Spec as RNCWebViewModuleSpec } from './NativeWebviewModule';

// Windows-specific exports (WebView2 only)
export {
  RCTWebView2 as WindowsWebView2,
  Commands as WindowsCommands,
} from './RCTWebView2NativeComponent';