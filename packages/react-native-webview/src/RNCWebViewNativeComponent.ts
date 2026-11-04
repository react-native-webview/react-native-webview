import type { CodegenTypes, HostComponent, ViewProps } from 'react-native';
import { codegenNativeCommands, codegenNativeComponent } from 'react-native';

export type WebViewNativeEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: CodegenTypes.Double;
}>;
export type WebViewCustomMenuSelectionEvent = Readonly<{
  label: string;
  key: string;
  selectedText: string;
}>;
export type WebViewMessageEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: CodegenTypes.Double;
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
  lockIdentifier: CodegenTypes.Double;
  description: string;
  statusCode: CodegenTypes.Int32;
}>;

export type WebViewErrorEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: CodegenTypes.Double;
  domain?: string;
  code: CodegenTypes.Int32;
  description: string;
}>;

export type WebViewNativeProgressEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: CodegenTypes.Double;
  progress: CodegenTypes.Double;
}>;

export type WebViewNavigationEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: CodegenTypes.Double;
  navigationType: 'click' | 'formsubmit' | 'backforward' | 'reload' | 'formresubmit' | 'other';
  mainDocumentURL?: string;
}>;

export type ShouldStartLoadRequestEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: CodegenTypes.Double;
  navigationType: 'click' | 'formsubmit' | 'backforward' | 'reload' | 'formresubmit' | 'other';
  mainDocumentURL?: string;
  isTopFrame: boolean;
}>;

type ScrollEvent = Readonly<{
  contentInset: {
    bottom: CodegenTypes.Double;
    left: CodegenTypes.Double;
    right: CodegenTypes.Double;
    top: CodegenTypes.Double;
  };
  contentOffset: {
    y: CodegenTypes.Double;
    x: CodegenTypes.Double;
  };
  contentSize: {
    height: CodegenTypes.Double;
    width: CodegenTypes.Double;
  };
  layoutMeasurement: {
    height: CodegenTypes.Double;
    width: CodegenTypes.Double;
  };
  targetContentOffset?: {
    y: CodegenTypes.Double;
    x: CodegenTypes.Double;
  };
  velocity?: {
    y: CodegenTypes.Double;
    x: CodegenTypes.Double;
  };
  zoomScale?: CodegenTypes.Double;
  responderIgnoreScroll?: boolean;
}>;

type WebViewRenderProcessGoneEvent = Readonly<{
  didCrash: boolean;
}>;

type WebViewDownloadEvent = Readonly<{
  downloadUrl: string;
}>;

// type MenuItem = Readonly<{label: string, key: string}>;

export interface NativeProps extends ViewProps {
  // Android only
  allowFileAccess?: boolean;
  allowsProtectedMedia?: boolean;
  allowsFullscreenVideo?: boolean;
  androidLayerType?: CodegenTypes.WithDefault<'none' | 'software' | 'hardware', 'none'>;
  cacheMode?: CodegenTypes.WithDefault<
    'LOAD_DEFAULT' | 'LOAD_CACHE_ELSE_NETWORK' | 'LOAD_NO_CACHE' | 'LOAD_CACHE_ONLY',
    'LOAD_DEFAULT'
  >;
  domStorageEnabled?: boolean;
  downloadingMessage?: string;
  forceDarkOn?: boolean;
  geolocationEnabled?: boolean;
  lackPermissionToDownloadMessage?: string;
  messagingModuleName?: string;
  minimumFontSize?: CodegenTypes.Int32;
  mixedContentMode?: CodegenTypes.WithDefault<'never' | 'always' | 'compatibility', 'never'>;
  nestedScrollEnabled?: boolean;
  onContentSizeChange?: CodegenTypes.DirectEventHandler<WebViewNativeEvent>;
  onRenderProcessGone?: CodegenTypes.DirectEventHandler<WebViewRenderProcessGoneEvent>;
  overScrollMode?: string;
  saveFormDataDisabled?: boolean;
  scalesPageToFit?: CodegenTypes.WithDefault<boolean, true>;
  setBuiltInZoomControls?: CodegenTypes.WithDefault<boolean, true>;
  setDisplayZoomControls?: boolean;
  setSupportMultipleWindows?: CodegenTypes.WithDefault<boolean, true>;
  textZoom?: CodegenTypes.Int32;
  thirdPartyCookiesEnabled?: CodegenTypes.WithDefault<boolean, true>;
  // Workaround to watch if listener if defined
  hasOnScroll?: boolean;
  // !Android only

  // iOS only
  allowingReadAccessToURL?: string;
  allowsBackForwardNavigationGestures?: boolean;
  allowsInlineMediaPlayback?: boolean;
  allowsPictureInPictureMediaPlayback?: boolean;
  allowsAirPlayForMediaPlayback?: boolean;
  allowsLinkPreview?: CodegenTypes.WithDefault<boolean, true>;
  automaticallyAdjustContentInsets?: CodegenTypes.WithDefault<boolean, true>;
  automaticallyAdjustsScrollIndicatorInsets?: CodegenTypes.WithDefault<boolean, false>;
  autoManageStatusBarEnabled?: CodegenTypes.WithDefault<boolean, true>;
  bounces?: CodegenTypes.WithDefault<boolean, true>;
  contentInset?: Readonly<{
    top?: CodegenTypes.Double;
    left?: CodegenTypes.Double;
    bottom?: CodegenTypes.Double;
    right?: CodegenTypes.Double;
  }>;
  contentInsetAdjustmentBehavior?: CodegenTypes.WithDefault<
    'never' | 'automatic' | 'scrollableAxes' | 'always',
    'never'
  >;
  contentMode?: CodegenTypes.WithDefault<'recommended' | 'mobile' | 'desktop', 'recommended'>;
  dataDetectorTypes?: CodegenTypes.WithDefault<
    ReadonlyArray<
      | 'address'
      | 'link'
      | 'calendarEvent'
      | 'trackingNumber'
      | 'flightNumber'
      | 'lookupSuggestion'
      | 'phoneNumber'
      | 'all'
      | 'none'
    >,
    'phoneNumber'
  >;
  decelerationRate?: CodegenTypes.Double;
  directionalLockEnabled?: CodegenTypes.WithDefault<boolean, true>;
  enableApplePay?: boolean;
  hideKeyboardAccessoryView?: boolean;
  keyboardDisplayRequiresUserAction?: CodegenTypes.WithDefault<boolean, true>;
  limitsNavigationsToAppBoundDomains?: boolean;
  mediaCapturePermissionGrantType?: CodegenTypes.WithDefault<
    'prompt' | 'grant' | 'deny' | 'grantIfSameHostElsePrompt' | 'grantIfSameHostElseDeny',
    'prompt'
  >;
  pagingEnabled?: boolean;
  pullToRefreshEnabled?: boolean;
  refreshControlLightMode?: boolean;
  removeIosKeyboardObserver?: CodegenTypes.WithDefault<boolean, false>;
  scrollEnabled?: CodegenTypes.WithDefault<boolean, true>;
  sharedCookiesEnabled?: boolean;
  textInteractionEnabled?: CodegenTypes.WithDefault<boolean, true>;
  useSharedProcessPool?: CodegenTypes.WithDefault<boolean, true>;
  onContentProcessDidTerminate?: CodegenTypes.DirectEventHandler<WebViewNativeEvent>;
  onCustomMenuSelection?: CodegenTypes.DirectEventHandler<WebViewCustomMenuSelectionEvent>;
  onFileDownload?: CodegenTypes.DirectEventHandler<WebViewDownloadEvent>;

  menuItems?: ReadonlyArray<Readonly<{ label: string; key: string }>>;
  suppressMenuItems?: Readonly<string>[];
  // Workaround to watch if listener if defined
  hasOnFileDownload?: boolean;
  fraudulentWebsiteWarningEnabled?: CodegenTypes.WithDefault<boolean, true>;
  // !iOS only

  allowFileAccessFromFileURLs?: boolean;
  allowUniversalAccessFromFileURLs?: boolean;
  applicationNameForUserAgent?: string;
  basicAuthCredential?: Readonly<{
    username: string;
    password: string;
  }>;
  cacheEnabled?: CodegenTypes.WithDefault<boolean, true>;
  incognito?: boolean;
  profile?: string;
  injectedJavaScript?: string;
  injectedJavaScriptBeforeContentLoaded?: string;
  injectedJavaScriptForMainFrameOnly?: CodegenTypes.WithDefault<boolean, true>;
  injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: CodegenTypes.WithDefault<boolean, true>;
  javaScriptCanOpenWindowsAutomatically?: boolean;
  javaScriptEnabled?: CodegenTypes.WithDefault<boolean, true>;
  webviewDebuggingEnabled?: boolean;
  mediaPlaybackRequiresUserAction?: CodegenTypes.WithDefault<boolean, true>;
  messagingEnabled: boolean;
  onLoadingError: CodegenTypes.DirectEventHandler<WebViewErrorEvent>;
  onLoadingSubResourceError?: CodegenTypes.DirectEventHandler<WebViewErrorEvent>;
  onLoadingFinish: CodegenTypes.DirectEventHandler<WebViewNavigationEvent>;
  onLoadingProgress: CodegenTypes.DirectEventHandler<WebViewNativeProgressEvent>;
  onLoadingStart: CodegenTypes.DirectEventHandler<WebViewNavigationEvent>;
  onHttpError: CodegenTypes.DirectEventHandler<WebViewHttpErrorEvent>;
  onMessage: CodegenTypes.DirectEventHandler<WebViewMessageEvent>;
  onOpenWindow?: CodegenTypes.DirectEventHandler<WebViewOpenWindowEvent>;
  hasOnOpenWindowEvent?: boolean;
  onScroll?: CodegenTypes.DirectEventHandler<ScrollEvent>;
  onShouldStartLoadWithRequest: CodegenTypes.DirectEventHandler<ShouldStartLoadRequestEvent>;
  showsHorizontalScrollIndicator?: CodegenTypes.WithDefault<boolean, true>;
  showsVerticalScrollIndicator?: CodegenTypes.WithDefault<boolean, true>;
  indicatorStyle?: CodegenTypes.WithDefault<'default' | 'black' | 'white', 'default'>;
  newSource: Readonly<{
    uri?: string;
    method?: string;
    body?: string;

    headers?: ReadonlyArray<Readonly<{ name: string; value: string }>>;
    html?: string;
    baseUrl?: string;
  }>;
  userAgent?: string;
  injectedJavaScriptObject?: string;
  paymentRequestEnabled?: boolean;
}

export interface NativeCommands {
  goBack: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  goForward: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  stopLoading: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  injectJavaScript: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    javascript: string,
  ) => void;
  requestFocus: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  postMessage: (viewRef: React.ElementRef<HostComponent<NativeProps>>, data: string) => void;
  // Android Only
  loadUrl: (viewRef: React.ElementRef<HostComponent<NativeProps>>, url: string) => void;
  clearFormData: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  clearCache: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    includeDiskFiles: boolean,
  ) => void;
  clearHistory: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
  // !Android Only
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
    'clearFormData',
    'clearCache',
    'clearHistory',
  ],
});

export default codegenNativeComponent<NativeProps>('RNCWebView') as HostComponent<NativeProps>;
