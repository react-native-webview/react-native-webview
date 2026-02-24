import React from 'react';
import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
// Use NativeComponentRegistry directly for Fabric/Bridgeless mode on Windows.
// The babel-plugin-codegen crashes with "Cannot read properties of null (reading 'loc')"
// on complex component specs, and without the transform the runtime fallback calls
// requireNativeComponent() → UIManager.getViewManagerConfig() which returns null
// for Fabric-only components (no ViewManager, only a ComponentDescriptor).
// NativeComponentRegistry.get() with an inline view config is the canonical pattern
// used by RNW's own Fabric components.
// @ts-ignore - NativeComponentRegistry is internal
import { get as getNativeComponent } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';
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

// Simplified scroll event - flatten the structure to avoid codegen ordering issues
type ScrollEvent = Readonly<{
  contentInsetTop: Double;
  contentInsetBottom: Double;
  contentInsetLeft: Double;
  contentInsetRight: Double;
  contentOffsetX: Double;
  contentOffsetY: Double;
  contentSizeWidth: Double;
  contentSizeHeight: Double;
  layoutMeasurementWidth: Double;
  layoutMeasurementHeight: Double;
  zoomScale?: Double;
}>;

// Windows-specific native props
export interface NativeProps extends ViewProps {
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
    html?: string;
    baseUrl?: string;
  }>;

  // Headers as JSON string (workaround for codegen nested array limitation)
  sourceHeaders?: string;

  // Authentication
  basicAuthCredential?: Readonly<{
    username: string;
    password: string;
  }>;

  // User agent
  userAgent?: string;
  applicationNameForUserAgent?: string;
}

// Alias for backwards compatibility
export type WindowsNativeProps = NativeProps;

// Windows-specific commands
export interface NativeCommands {
  goBack: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  goForward: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  stopLoading: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  injectJavaScript: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    javascript: string
  ) => void;
  requestFocus: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  postMessage: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    data: string
  ) => void;
  loadUrl: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    url: string
  ) => void;
  clearCache: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    includeDiskFiles: boolean
  ) => void;
}

export const Commands = codegenNativeCommands<NativeCommands>({
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

// Alias for backwards compatibility
export const WindowsCommands = Commands;

// RCTWebView2 — Chromium-based Edge WebView2 for Windows Fabric/Bridgeless mode.
//
// We use NativeComponentRegistry.get() directly instead of codegenNativeComponent()
// because:
//   1. The Fabric component is registered on the native C++ side via
//      AddViewComponent(L"RCTWebView2", ...) — there is NO ViewManager.
//   2. babel-plugin-codegen crashes with null loc on complex specs.
//   3. Without the babel transform, the runtime fallback calls
//      requireNativeComponent() → UIManager.getViewManagerConfig() → null.
//   4. NativeComponentRegistry.get() with inline view config is the canonical
//      pattern used by RNW's own Fabric components.
//
// In Bridgeless mode, NativeComponentRegistry.get() defaults to native=false,
// so the JS-supplied view config is used automatically.
const RCTWebView2 = getNativeComponent<NativeProps>('RCTWebView2', () => ({
  uiViewClassName: 'RCTWebView2',
  bubblingEventTypes: {},
  directEventTypes: {
    topOpenWindow: { registrationName: 'onOpenWindow' },
    topSourceChanged: { registrationName: 'onSourceChanged' },
    topLoadingError: { registrationName: 'onLoadingError' },
    topLoadingFinish: { registrationName: 'onLoadingFinish' },
    topLoadingProgress: { registrationName: 'onLoadingProgress' },
    topLoadingStart: { registrationName: 'onLoadingStart' },
    topHttpError: { registrationName: 'onHttpError' },
    topMessage: { registrationName: 'onMessage' },
    topScroll: { registrationName: 'onScroll' },
    topShouldStartLoadWithRequest: { registrationName: 'onShouldStartLoadWithRequest' },
  },
  validAttributes: {
    testID: true,
    linkHandlingEnabled: true,
    cacheEnabled: true,
    incognito: true,
    injectedJavaScript: true,
    injectedJavaScriptBeforeContentLoaded: true,
    injectedJavaScriptForMainFrameOnly: true,
    injectedJavaScriptBeforeContentLoadedForMainFrameOnly: true,
    javaScriptCanOpenWindowsAutomatically: true,
    javaScriptEnabled: true,
    mediaPlaybackRequiresUserAction: true,
    webviewDebuggingEnabled: true,
    messagingEnabled: true,
    showsHorizontalScrollIndicator: true,
    showsVerticalScrollIndicator: true,
    newSource: true,
    sourceHeaders: true,
    basicAuthCredential: true,
    userAgent: true,
    applicationNameForUserAgent: true,
  },
})) as HostComponent<NativeProps>;

export default RCTWebView2;
