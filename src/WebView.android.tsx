import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

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
  defaultRenderError,
  defaultRenderLoading,
  useWebWiewLogic,
} from './WebViewShared';
import {
  AndroidWebViewProps,
  NativeWebViewAndroid,
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

const WebViewComponent = forwardRef<{}, AndroidWebViewProps>(({
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
  const messagingModuleName = useRef<string>(`WebViewMessageHandler${uniqueRef += 1}`).current;
  const webViewRef = useRef<NativeWebViewAndroid | null>(null);

  const onShouldStartLoadWithRequestCallback = useCallback((shouldStart: boolean,
    url: string,
    lockIdentifier?: number) => {
    if (lockIdentifier) {
      NativeModules.RNCWebView.onShouldStartLoadWithRequestCallback(shouldStart, lockIdentifier);
    } else if (shouldStart) {
      Commands.loadUrl(webViewRef.current, url);
    }
  }, []);

  const { onLoadingStart, onShouldStartLoadWithRequest, onMessage, viewState, setViewState, lastErrorEvent, onHttpError, onLoadingError, onLoadingFinish, onLoadingProgress, onRenderProcessGone } = useWebWiewLogic({
    onNavigationStateChange,
    onLoad,
    onError,
    onHttpErrorProp,
    onLoadEnd,
    onLoadProgress,
    onLoadStart,
    onRenderProcessGoneProp,
    onMessageProp,
    startInLoadingState,
    originWhitelist,
    onShouldStartLoadWithRequestProp,
    onShouldStartLoadWithRequestCallback,
  })

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
  }), [setViewState, webViewRef]);

  const directEventCallbacks = useMemo(() => ({
    onShouldStartLoadWithRequest,
    onMessage,
  }), [onMessage, onShouldStartLoadWithRequest]);

  useEffect(() => {
    BatchedBridge.registerCallableModule(messagingModuleName, directEventCallbacks);
  }, [messagingModuleName, directEventCallbacks])

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
    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}

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

// native implementation should return "true" only for Android 5+
const isFileUploadSupported: () => Promise<boolean>
  = NativeModules.RNCWebView.isFileUploadSupported();

const WebView = Object.assign(WebViewComponent, {isFileUploadSupported});

export default WebView;
