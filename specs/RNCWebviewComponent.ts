import React from 'react';
import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type {
  DirectEventHandler,
  Double,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

// Event types
export type WebViewNativeEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
}>;

export type WebViewMessageEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  data: string;
}>;

export type WebViewOpenWindowEvent = Readonly<{
  targetUrl: string;
}>;

export type WebViewHttpErrorEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  description: string;
  statusCode: Int32;
}>;

export type WebViewErrorEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  domain?: string;
  code: Int32;
  description: string;
}>;

export type WebViewNativeProgressEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  progress: Double;
}>;

export type WebViewNavigationEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  navigationType:
    | 'click'
    | 'formsubmit'
    | 'backforward'
    | 'reload'
    | 'formresubmit'
    | 'other';
  mainDocumentURL?: string;
}>;

export type ShouldStartLoadRequestEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  navigationType:
    | 'click'
    | 'formsubmit'
    | 'backforward'
    | 'reload'
    | 'formresubmit'
    | 'other';
  mainDocumentURL?: string;
  isTopFrame: boolean;
}>;

type ScrollEvent = Readonly<{
  contentInset: {
    bottom: Double;
    left: Double;
    right: Double;
    top: Double;
  };
  contentOffset: {
    y: Double;
    x: Double;
  };
  contentSize: {
    height: Double;
    width: Double;
  };
  layoutMeasurement: {
    height: Double;
    width: Double;
  };
  targetContentOffset?: {
    y: Double;
    x: Double;
  };
  velocity?: {
    y: Double;
    x: Double;
  };
  zoomScale?: Double;
  responderIgnoreScroll?: boolean;
}>;

// Windows-specific native props
export interface WindowsNativeProps extends ViewProps {
  // Windows-specific props
  testID?: string;
  /**
   * Boolean value that determines whether link handling is enabled.
   * When true, the webview can handle link clicks.
   * @platform windows
   */
  linkHandlingEnabled?: boolean;

  /**
   * Function that is invoked when the `WebView` should open a new window.
   * This happens when the JS calls `window.open('http://someurl', '_blank')`
   * or when the user clicks on a `<a href="http://someurl" target="_blank">` link.
   * @platform windows
   */
  onOpenWindow?: DirectEventHandler<WebViewOpenWindowEvent>;

  /**
   * Function that is invoked when the `WebView` responds to a request to load a new resource.
   * @platform windows
   */
  onSourceChanged?: DirectEventHandler<WebViewNavigationEvent>;

  // Common props shared across platforms
  cacheEnabled?: WithDefault<boolean, true>;
  incognito?: boolean;
  injectedJavaScript?: string;
  injectedJavaScriptBeforeContentLoaded?: string;
  injectedJavaScriptForMainFrameOnly?: WithDefault<boolean, true>;
  injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: WithDefault<
    boolean,
    true
  >;
  javaScriptCanOpenWindowsAutomatically?: boolean;
  javaScriptEnabled?: WithDefault<boolean, true>;
  mediaPlaybackRequiresUserAction?: WithDefault<boolean, true>;
  webviewDebuggingEnabled?: boolean;
  messagingEnabled: boolean;

  // Event handlers
  onLoadingError: DirectEventHandler<WebViewErrorEvent>;
  onLoadingFinish: DirectEventHandler<WebViewNavigationEvent>;
  onLoadingProgress: DirectEventHandler<WebViewNativeProgressEvent>;
  onLoadingStart: DirectEventHandler<WebViewNavigationEvent>;
  onHttpError: DirectEventHandler<WebViewHttpErrorEvent>;
  onMessage: DirectEventHandler<WebViewMessageEvent>;
  onScroll?: DirectEventHandler<ScrollEvent>;
  onShouldStartLoadWithRequest: DirectEventHandler<ShouldStartLoadRequestEvent>;

  // UI props
  showsHorizontalScrollIndicator?: WithDefault<boolean, true>;
  showsVerticalScrollIndicator?: WithDefault<boolean, true>;

  // Source configuration
  newSource: Readonly<{
    uri?: string;
    method?: string;
    body?: string;
    headers?: ReadonlyArray<Readonly<{ name: string; value: string }>>;
    html?: string;
    baseUrl?: string;
  }>;

  // Authentication
  basicAuthCredential?: Readonly<{
    username: string;
    password: string;
  }>;

  // User agent
  userAgent?: string;
  applicationNameForUserAgent?: string;
}

// Windows-specific commands
export interface WindowsNativeCommands {
  goBack: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
  goForward: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
  reload: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
  stopLoading: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
  injectJavaScript: (
    viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>,
    javascript: string
  ) => void;
  requestFocus: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
  postMessage: (
    viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>,
    data: string
  ) => void;
  loadUrl: (
    viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>,
    url: string
  ) => void;
  clearCache: (
    viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>,
    includeDiskFiles: boolean
  ) => void;
}

export const WindowsCommands = codegenNativeCommands<WindowsNativeCommands>({
  supportedCommands: [
    'goBack',
    'goForward',
    'reload',
    'stopLoading',
    'injectJavaScript',
    'requestFocus',
    'postMessage',
    'loadUrl',
    'clearCache',
  ],
});

// RCTWebView2 - Chromium-based Edge WebView2
export const RCTWebView2 = codegenNativeComponent<WindowsNativeProps>(
  'RCTWebView2'
) as HostComponent<WindowsNativeProps>;

export default RCTWebView2;
