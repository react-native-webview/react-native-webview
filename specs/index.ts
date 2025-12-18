import Webview from './NativeWebviewModule';

export function multiply(a: number, b: number): number {
  return Webview.multiply(a, b);
}

export {default as Webview} from './RNCWebviewComponent';
export * from './RNCWebviewComponent';

// Windows-specific exports (WebView2 only)
export {
  RCTWebView2 as WindowsWebView2,
  WindowsCommands,
} from './RNCWebviewComponent';
export {
  RCTWebView2Module as WindowsWebView2Module,
} from './NativeWebviewModule';