/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Portions copyright for react-native-windows:
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { View, Image, ImageSourcePropType, HostComponent } from 'react-native';
import invariant from 'invariant';
import RCTWebView2, {
  Commands,
  NativeProps,
} from './RCTWebView2NativeComponent';
import RNCWebViewModule from './NativeWebviewModule';
import {
  useWebViewLogic,
  defaultOriginWhitelist,
  defaultRenderError,
  defaultRenderLoading,
} from './WebViewShared';

import styles from './WebView.styles';

// Re-export types for external consumers
export type { NativeProps as NativeWebViewWindows } from './RCTWebView2NativeComponent';

// Windows-specific WebViewProps that extends shared props
import {
  WebViewSharedProps,
  WebViewOpenWindowEvent,
  WebViewNavigationEvent,
} from './WebViewTypes';

export interface WindowsWebViewProps extends WebViewSharedProps {
  /**
   * Boolean value that determines whether the web view should use the new chromium based edge webview.
   */
  useWebView2?: boolean;
  /**
   * Function that is invoked when the `WebView` should open a new window.
   * @platform windows
   */
  onOpenWindow?: (event: WebViewOpenWindowEvent) => void;
  /**
   * Function that is invoked when the `WebView` responds to a request to load a new resource.
   * @platform windows
   */
  onSourceChanged?: (event: WebViewNavigationEvent) => void;
}
const { resolveAssetSource } = Image;

const WebViewComponent = forwardRef<{}, WindowsWebViewProps>(
  (
    {
      cacheEnabled = true,
      originWhitelist = defaultOriginWhitelist,
      startInLoadingState,
      onNavigationStateChange,
      onLoadStart,
      onError,
      onLoad,
      onLoadEnd,
      onLoadProgress,
      onOpenWindow: onOpenWindowProp,
      onSourceChanged,
      onHttpError: onHttpErrorProp,
      onMessage: onMessageProp,
      renderLoading,
      renderError,
      style,
      containerStyle,
      source,
      nativeConfig,
      onShouldStartLoadWithRequest: onShouldStartLoadWithRequestProp,
      useWebView2: _useWebView2,
      onScroll: _onScroll, // Exclude from otherProps - not currently supported on Windows
      ...otherProps
    },
    ref
  ) => {
    const webViewRef = useRef<React.ComponentRef<
      HostComponent<NativeProps>
    > | null>(null);

    const onShouldStartLoadWithRequestCallback = useCallback(
      (shouldStart: boolean, url: string, lockIdentifier?: number) => {
        if (lockIdentifier) {
          RNCWebViewModule?.shouldStartLoadWithLockIdentifier(
            shouldStart,
            lockIdentifier
          );
        } else if (shouldStart && webViewRef.current) {
          Commands.loadUrl(webViewRef.current, url);
        }
      },
      []
    );

    const {
      onLoadingStart,
      onShouldStartLoadWithRequest,
      onMessage,
      viewState,
      setViewState,
      lastErrorEvent,
      onHttpError,
      onLoadingError,
      onLoadingFinish,
      onLoadingProgress,
      onOpenWindow,
    } = useWebViewLogic({
      onNavigationStateChange,
      onLoad,
      onError,
      onHttpErrorProp,
      onLoadEnd,
      onLoadProgress,
      onLoadStart,
      onMessageProp,
      startInLoadingState,
      originWhitelist,
      onShouldStartLoadWithRequestProp,
      onShouldStartLoadWithRequestCallback,
      onOpenWindowProp,
    });

    useImperativeHandle(
      ref,
      () => ({
        goForward: () =>
          webViewRef.current && Commands.goForward(webViewRef.current),
        goBack: () => webViewRef.current && Commands.goBack(webViewRef.current),
        reload: () => {
          setViewState('LOADING');
          if (webViewRef.current) {
            Commands.reload(webViewRef.current);
          }
        },
        stopLoading: () =>
          webViewRef.current && Commands.stopLoading(webViewRef.current),
        postMessage: (data: string) =>
          webViewRef.current && Commands.postMessage(webViewRef.current, data),
        injectJavaScript: (data: string) =>
          webViewRef.current &&
          Commands.injectJavaScript(webViewRef.current, data),
        requestFocus: () =>
          webViewRef.current && Commands.requestFocus(webViewRef.current),
        clearCache: (includeDiskFiles: boolean = true) =>
          webViewRef.current &&
          Commands.clearCache(webViewRef.current, includeDiskFiles),
        loadUrl: (url: string) =>
          webViewRef.current && Commands.loadUrl(webViewRef.current, url),
      }),
      [setViewState, webViewRef]
    );

    let otherView = null;
    if (viewState === 'LOADING') {
      otherView = (renderLoading || defaultRenderLoading)();
    } else if (viewState === 'ERROR') {
      invariant(
        lastErrorEvent != null,
        'lastErrorEvent expected to be non-null'
      );
      otherView = (renderError || defaultRenderError)(
        lastErrorEvent.domain,
        lastErrorEvent.code,
        lastErrorEvent.description
      );
    } else if (viewState !== 'IDLE') {
      console.error(`RNCWebView invalid state encountered: ${viewState}`);
    }

    const webViewStyles = [styles.container, styles.webView, style];
    const webViewContainerStyle = [styles.container, containerStyle];

    // Transform source to newSource format for Windows native component
    const sourceResolved = resolveAssetSource(source as ImageSourcePropType);
    const newSource =
      typeof sourceResolved === 'object'
        ? {
            uri: (sourceResolved as any).uri,
            method: (sourceResolved as any).method,
            body: (sourceResolved as any).body,
            html: (sourceResolved as any).html,
            baseUrl: (sourceResolved as any).baseUrl,
          }
        : {};

    // Headers as JSON string (workaround for codegen nested array limitation)
    const sourceHeaders =
      typeof sourceResolved === 'object' && (sourceResolved as any).headers
        ? JSON.stringify((sourceResolved as any).headers)
        : undefined;

    const webView = (
      <RCTWebView2
        key="webViewKey"
        {...otherProps}
        messagingEnabled={typeof onMessageProp === 'function'}
        linkHandlingEnabled={typeof onOpenWindowProp === 'function'}
        onLoadingError={onLoadingError}
        onLoadingFinish={onLoadingFinish}
        onLoadingProgress={onLoadingProgress}
        onLoadingStart={onLoadingStart}
        onHttpError={onHttpError}
        onMessage={onMessage}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onOpenWindow={onOpenWindow}
        onSourceChanged={onSourceChanged}
        ref={webViewRef}
        newSource={newSource}
        sourceHeaders={sourceHeaders}
        style={webViewStyles}
        cacheEnabled={cacheEnabled}
        {...nativeConfig?.props}
      />
    );

    return (
      <View style={webViewContainerStyle}>
        {webView}
        {otherView}
      </View>
    );
  }
);

// native implementation should return "true" only for Android 5+
const isFileUploadSupported: () => Promise<boolean> = async () => false;

const WebView = Object.assign(WebViewComponent, { isFileUploadSupported });

export default WebView;
