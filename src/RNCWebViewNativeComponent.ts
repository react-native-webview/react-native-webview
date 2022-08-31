import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {DirectEventHandler,Double, Int32} from 'react-native/Libraries/Types/CodegenTypes';

export type WebViewNativeEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
}>
export type WebViewCustomMenuSelectionEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  label: string;
  key: string;
  selectedText: string;
}>
export type WebViewMessageEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  data: string;
}>
export type WebViewHttpErrorEvent = Readonly<{
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  description: string;
  statusCode: Int32;
}>

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
}>

export type WebViewNativeProgressEvent = Readonly< {
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: Double;
  progress: Double;
}>

export type WebViewNavigationEvent = Readonly< {
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
}>

export type ShouldStartLoadRequestEvent  = Readonly<{
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
}>

type ScrollEvent = Readonly<{
  contentInset: {
    bottom: Double,
    left: Double,
    right: Double,
    top: Double,
  },
  contentOffset: {
    y: Double,
    x: Double,
  },
  contentSize: {
    height: Double,
    width: Double,
  },
  layoutMeasurement: {
    height: Double,
    width: Double,
  },
  targetContentOffset?: {
    y: Double,
    x: Double,
  },
  velocity?: {
    y: Double,
    x: Double,
  },
  zoomScale?: Double,
  responderIgnoreScroll?: boolean,
}>

type WebViewRenderProcessGoneEvent = Readonly<{
  didCrash: boolean;
}>

type WebViewDownloadEvent = Readonly<{
  downloadUrl: string;
}>

type MenuItem = Readonly<{label: string, key: string}>;

export interface NativeProps extends ViewProps {
  // Android only
  allowFileAccess?: boolean;

  allowsFullscreenVideo?: boolean;
  androidHardwareAccelerationDisabled?: boolean;
  androidLayerType?: string;
  cacheMode?: string;
  domStorageEnabled?: boolean;
  downloadingMessage?: string;
  forceDarkOn?: boolean;
  geolocationEnabled?: boolean;
  lackPermissionToDownloadMessage?: string;
  messagingModuleName: string;
  minimumFontSize?: Int32;
  mixedContentMode?: string;
  nestedScrollEnabled?: boolean;
  onContentSizeChange?: DirectEventHandler<WebViewNativeEvent>;
  onRenderProcessGone?: DirectEventHandler<WebViewRenderProcessGoneEvent>;
  overScrollMode?: string;
  saveFormDataDisabled?: boolean;
  scalesPageToFit?: boolean;
  setBuiltInZoomControls?: boolean;
  setDisplayZoomControls?: boolean;
  setSupportMultipleWindows?: boolean;
  textZoom?: Int32;
  thirdPartyCookiesEnabled?: boolean;
  urlPrefixesForDefaultIntent?: readonly string[];
  // !Android only

  // iOS only
  allowingReadAccessToURL?: string;
  allowsBackForwardNavigationGestures?: boolean;
  allowsInlineMediaPlayback?: boolean;
  allowsAirPlayForMediaPlayback?: boolean;
  allowsLinkPreview?: boolean;
  automaticallyAdjustContentInsets?: boolean;
  autoManageStatusBarEnabled?: boolean;
  bounces?: boolean;
  contentInset?: Readonly<{
    top?: Double;
    left?: Double;
    bottom?: Double;
    right?: Double;
  }>;
  contentInsetAdjustmentBehavior?: string;
  contentMode?: string;
  dataDetectorTypes?: readonly string[];
  decelerationRate?: Double;
  directionalLockEnabled?: boolean;
  enableApplePay: boolean;
  hideKeyboardAccessoryView?: boolean;
  keyboardDisplayRequiresUserAction?: boolean;
  limitsNavigationsToAppBoundDomains?: boolean;
  mediaCapturePermissionGrantType?: string;
  pagingEnabled?: boolean;
  pullToRefreshEnabled?: boolean;
  scrollEnabled?: boolean;
  sharedCookiesEnabled?: boolean;
  textInteractionEnabled?: boolean;
  useSharedProcessPool?: boolean;
  onContentProcessDidTerminate?: DirectEventHandler<WebViewNativeEvent>;
  onCustomMenuSelection?: DirectEventHandler<WebViewCustomMenuSelectionEvent>;
  onFileDownload?: DirectEventHandler<WebViewDownloadEvent>;
  // Todo: FIX this
  // menuItems?: readonly MenuItem[];
  // !iOS only

  allowFileAccessFromFileURLs?: boolean;
  allowUniversalAccessFromFileURLs?: boolean;
  applicationNameForUserAgent?: string;
  basicAuthCredential?: Readonly<{
    username: string;
    password: string;
  }>;
  cacheEnabled?: boolean;
  hasOnScroll?: boolean;
  incognito?: boolean;
  injectedJavaScript?: string;
  injectedJavaScriptBeforeContentLoaded?: string;
  injectedJavaScriptForMainFrameOnly?: boolean;
  injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: boolean;
  javaScriptCanOpenWindowsAutomatically?: boolean;
  javaScriptEnabled?: boolean;
  mediaPlaybackRequiresUserAction?: boolean;
  messagingEnabled: boolean;
  onLoadingError: DirectEventHandler<WebViewErrorEvent>;
  onLoadingFinish: DirectEventHandler<WebViewNavigationEvent>;
  onLoadingProgress: DirectEventHandler<WebViewNativeProgressEvent>;
  onLoadingStart: DirectEventHandler<WebViewNavigationEvent>;
  onHttpError: DirectEventHandler<WebViewHttpErrorEvent>;
  onMessage: DirectEventHandler<WebViewMessageEvent>;
  onScroll?: DirectEventHandler<ScrollEvent>;
  onShouldStartLoadWithRequest: DirectEventHandler<ShouldStartLoadRequestEvent>;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  source: Readonly<{uri: string}>;
  userAgent?: string;
}

export default codegenNativeComponent<NativeProps>(
  'RNCWebView'
) as HostComponent<NativeProps>;