import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import {
  Image,
  View,
  NativeModules,
  ImageSourcePropType,
} from 'react-native';

import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
// @ts-expect-error react-native doesn't have this type
import codegenNativeCommandsUntyped from 'react-native/Libraries/Utilities/codegenNativeCommands';

import invariant from 'invariant';

import RNCWebView from "./WebViewNativeComponent.android";
import {
  defaultOriginWhitelist,
  createOnShouldStartLoadWithRequest,
  defaultRenderError,
  defaultRenderLoading,
} from './WebViewShared';
import {
  WebViewRenderProcessGoneEvent,
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
  WebViewMessageEvent,
  WebViewNavigationEvent,
  WebViewProgressEvent,
  AndroidWebViewProps,
  NativeWebViewAndroid,
  WebViewError,
} from './WebViewTypes';

import styles from './WebView.styles';

const codegenNativeCommands = codegenNativeCommandsUntyped as <T extends {}>(options: { supportedCommands: (keyof T)[] }) => T;

const Commands = codegenNativeCommands({
  supportedCommands: ['goBack', 'goForward', 'reload', 'stopLoading', 'injectJavaScript', 'requestFocus', 'postMessage', 'clearFormData', 'clearCache', 'clearHistory', 'loadUrl'],
});

const { resolveAssetSource } = Image;

/**
 * A simple counter to uniquely identify WebView instances. Do not use this for anything else.
 */
let uniqueRef = 0;


// native implementation should return "true" only for Android 5+
const isFileUploadSupported: () => Promise<boolean>
  = NativeModules.RNCWebView.isFileUploadSupported();

const WebView = forwardRef<{}, AndroidWebViewProps>(({
  overScrollMode = 'always',
  javaScriptEnabled = true,
  thirdPartyCookiesEnabled = true,
  scalesPageToFit = true,
  allowsFullscreenVideo = false,
  allowFileAccess = false,
  saveFormDataDisabled = false,
  cacheEnabled = true,
  androidHardwareAccelerationDisabled = false,
  androidLayerType = "none",
  originWhitelist = defaultOriginWhitelist,
  setSupportMultipleWindows = true,
  setBuiltInZoomControls = true,
  setDisplayZoomControls = false,
  nestedScrollEnabled = false,
  startInLoadingState,
  onNavigationStateChange,
  onLoadStart,
  onError,
  onLoad,
  onLoadEnd,
  onLoadProgress,
  onHttpError: onHttpErrorProp,
  onRenderProcessGone: onRenderProcessGoneProp,
  onMessage: onMessageProp,
  renderLoading,
  renderError,
  style,
  containerStyle,
  source,
  nativeConfig,
  onShouldStartLoadWithRequest: onShouldStartLoadWithRequestProp,
  ...otherProps
}, ref) => {
  const startUrl = useRef<string | null>(null)
  const [viewState, setViewState] = useState<'IDLE' | 'LOADING' | 'ERROR'>(startInLoadingState ? "LOADING" : "IDLE");
  const [lastErrorEvent, setLastErrorEvent] = useState<WebViewError | null>(null);
  const onShouldStartLoadWithRequest = useRef<ReturnType<typeof createOnShouldStartLoadWithRequest> | null>(null);
  const webViewRef = useRef<NativeWebViewAndroid | null>(null);
  const messagingModuleName = useRef<string>(`WebViewMessageHandler${uniqueRef += 1}`).current;

  useEffect(() => {
    // TODO useMemo and add events
    BatchedBridge.registerCallableModule(messagingModuleName, {});
  }, [])

  useImperativeHandle(ref, () => ({
    goForward: () => Commands.goForward(webViewRef.current),
    goBack: () => Commands.goBack(webViewRef.current),
    reload: () => {
      setViewState(
        'LOADING',
      ); Commands.reload(webViewRef.current)
    },
    stopLoading: () => Commands.stopLoading(webViewRef.current),
    postMessage: (data: string) => Commands.postMessage(webViewRef.current, data),
    injectJavaScript: (data: string) => Commands.injectJavaScript(webViewRef.current, data),
    requestFocus: () => Commands.requestFocus(webViewRef.current),
    clearFormData: () => Commands.clearFormData(webViewRef.current),
    clearCache: (includeDiskFiles: boolean) => Commands.clearCache(webViewRef.current, includeDiskFiles),
    clearHistory: () => Commands.clearHistory(webViewRef.current),
    isFileUploadSupported,
  }), [])

  const updateNavigationState = useCallback((event: WebViewNavigationEvent) => {
    onNavigationStateChange?.(event.nativeEvent);
  }, [onNavigationStateChange]);

  const onLoadingStart = useCallback((event: WebViewNavigationEvent) => {
    startUrl.current = event.nativeEvent.url;
    onLoadStart?.(event);
    updateNavigationState(event);
  }, [onLoadStart, updateNavigationState]);

  const onLoadingError = useCallback((event: WebViewErrorEvent) => {
    event.persist();
    if (onError) {
      onError(event);
    } else {
      console.warn('Encountered an error loading page', event.nativeEvent);
    }
    onLoadEnd?.(event);
    if (event.isDefaultPrevented()) { return };
    setViewState('ERROR');
    setLastErrorEvent(event.nativeEvent);
  }, []);

  const onHttpError = useCallback((event: WebViewHttpErrorEvent) => {
    onHttpErrorProp?.(event);
  }, []);

  const onRenderProcessGone = useCallback((event: WebViewRenderProcessGoneEvent) => {
    onRenderProcessGoneProp?.(event);
  }, []);

  const onLoadingFinish = useCallback((event: WebViewNavigationEvent) => {
    onLoad?.(event);
    onLoadEnd?.(event);
    const { nativeEvent: { url } } = event;
    if (url === startUrl.current) {
      setViewState('IDLE');
    }
    updateNavigationState(event);
  }, []);

  const onMessage = useCallback((event: WebViewMessageEvent) => {
    onMessageProp?.(event);
  }, []);

  const onLoadingProgress = useCallback((event: WebViewProgressEvent) => {
    const { nativeEvent: { progress } } = event;
    if (progress === 1) {
      setViewState(prevViewState => prevViewState === 'LOADING' ? 'IDLE' : prevViewState);
    }
    onLoadProgress?.(event);
  }, []);

  const onShouldStartLoadWithRequestCallback = useCallback((shouldStart: boolean,
    url: string,
    lockIdentifier?: number) => {
    if (lockIdentifier) {
      NativeModules.RNCWebView.onShouldStartLoadWithRequestCallback(shouldStart, lockIdentifier);
    } else if (shouldStart) {
      Commands.loadUrl(webViewRef, url);
    }
  }, []);

  let otherView = null;
  if (viewState === 'LOADING') {
    otherView = (renderLoading || defaultRenderLoading)();
  } else if (viewState === 'ERROR') {
    invariant(lastErrorEvent != null, 'lastErrorEvent expected to be non-null');
    otherView = (renderError || defaultRenderError)(
      lastErrorEvent.domain,
      lastErrorEvent.code,
      lastErrorEvent.description,
    );
  } else if (viewState !== 'IDLE') {
    console.error(`RNCWebView invalid state encountered: ${viewState}`);
  }

  const webViewStyles = [styles.container, styles.webView, style];
  const webViewContainerStyle = [styles.container, containerStyle];

  if (typeof source !== "number" && source && 'method' in source) {
    if (source.method === 'POST' && source.headers) {
      console.warn(
        'WebView: `source.headers` is not supported when using POST.',
      );
    } else if (source.method === 'GET' && source.body) {
      console.warn('WebView: `source.body` is not supported when using GET.');
    }
  }


  const NativeWebView
    = (nativeConfig?.component as (typeof NativeWebViewAndroid | undefined)) || RNCWebView;

  onShouldStartLoadWithRequest.current = createOnShouldStartLoadWithRequest(
    onShouldStartLoadWithRequestCallback,
    // casting cause it's in the default props
    originWhitelist as readonly string[],
    onShouldStartLoadWithRequestProp,
  );

  const webView = <NativeWebView
    key="webViewKey"
    {...otherProps}
    messagingEnabled={typeof onMessage === 'function'}
    messagingModuleName={messagingModuleName}
    onLoadingError={onLoadingError}
    onLoadingFinish={onLoadingFinish}
    onLoadingProgress={onLoadingProgress}
    onLoadingStart={onLoadingStart}
    onHttpError={onHttpError}
    onRenderProcessGone={onRenderProcessGone}
    onMessage={onMessage}
    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest.current}
    ref={webViewRef}
    // TODO: find a better way to type this.
    source={resolveAssetSource(source as ImageSourcePropType)}
    style={webViewStyles}
    overScrollMode={overScrollMode}
    javaScriptEnabled={javaScriptEnabled}
    thirdPartyCookiesEnabled={thirdPartyCookiesEnabled}
    scalesPageToFit={scalesPageToFit}
    allowsFullscreenVideo={allowsFullscreenVideo}
    allowFileAccess={allowFileAccess}
    saveFormDataDisabled={saveFormDataDisabled}
    cacheEnabled={cacheEnabled}
    androidHardwareAccelerationDisabled={androidHardwareAccelerationDisabled}
    androidLayerType={androidLayerType}
    setSupportMultipleWindows={setSupportMultipleWindows}
    setBuiltInZoomControls={setBuiltInZoomControls}
    setDisplayZoomControls={setDisplayZoomControls}
    nestedScrollEnabled={nestedScrollEnabled}
    {...nativeConfig?.props}
  />

  return (
    <View style={webViewContainerStyle}>
      {webView}
      {otherView}
    </View>
  );
});
export default WebView;
