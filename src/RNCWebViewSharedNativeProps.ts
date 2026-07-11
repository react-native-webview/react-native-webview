import type { NativeProps as AndroidNativeProps } from './RNCWebViewAndroidNativeComponent';
import type { NativeProps as IOSNativeProps } from './RNCWebViewIOSNativeComponent';

type SharedNativePropName =
  | 'allowFileAccessFromFileURLs'
  | 'allowUniversalAccessFromFileURLs'
  | 'applicationNameForUserAgent'
  | 'basicAuthCredential'
  | 'cacheEnabled'
  | 'hasOnOpenWindowEvent'
  | 'incognito'
  | 'injectedJavaScript'
  | 'injectedJavaScriptBeforeContentLoaded'
  | 'injectedJavaScriptBeforeContentLoadedForMainFrameOnly'
  | 'injectedJavaScriptForMainFrameOnly'
  | 'injectedJavaScriptObject'
  | 'javaScriptCanOpenWindowsAutomatically'
  | 'javaScriptEnabled'
  | 'mediaPlaybackRequiresUserAction'
  | 'menuItems'
  | 'messagingEnabled'
  | 'newSource'
  | 'onCustomMenuSelection'
  | 'onHttpError'
  | 'onLoadingError'
  | 'onLoadingFinish'
  | 'onLoadingProgress'
  | 'onLoadingStart'
  | 'onMessage'
  | 'onOpenWindow'
  | 'onScroll'
  | 'onShouldStartLoadWithRequest'
  | 'showsHorizontalScrollIndicator'
  | 'showsVerticalScrollIndicator'
  | 'userAgent'
  | 'webviewDebuggingEnabled';

export type SharedNativeProps = Pick<AndroidNativeProps, SharedNativePropName>;

type IOSSharedNativeProps = Pick<IOSNativeProps, SharedNativePropName>;

type Equal<Left, Right> = [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false;

type Assert<Condition extends true> = Condition;

// Fails type-checking if either platform removes a shared prop or changes its type/optionality.
export type SharedNativePropsContract = Assert<Equal<IOSSharedNativeProps, SharedNativeProps>>;
