declare module 'react-native-webview' {
  import { Component } from 'react';
  import type {
    AndroidWebViewProps,
    FileDownload,
    IOSWebViewProps,
    WebViewMessageEvent,
    WebViewNavigation,
    WindowsWebViewProps,
  } from '../../src/WebViewTypes';

  export { FileDownload, WebViewMessageEvent, WebViewNavigation };

  export type WebViewProps = IOSWebViewProps & AndroidWebViewProps & WindowsWebViewProps;

  export class WebView<P = unknown> extends Component<WebViewProps & P> {
    goBack: () => void;
    goForward: () => void;
    reload: () => void;
    stopLoading: () => void;
    injectJavaScript: (script: string) => void;
    requestFocus: () => void;
    postMessage: (message: string) => void;
    clearFormData?: () => void;
    clearCache: (includeDiskFiles: boolean) => void;
    clearHistory?: () => void;
  }

  export default WebView;
}
