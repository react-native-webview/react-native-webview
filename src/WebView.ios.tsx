/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {
  ActivityIndicator,
  Text,
  UIManager as NotTypedUIManager,
  View,
  requireNativeComponent,
  NativeModules,
  Image,
  findNodeHandle,
  ImageSourcePropType,
} from 'react-native';
import invariant from 'invariant';

import {
  defaultOriginWhitelist,
  createOnShouldStartLoadWithRequest,
  getViewManagerConfig,
} from './WebViewShared';
import {
  WebViewErrorEvent,
  WebViewMessageEvent,
  WebViewNavigationEvent,
  WebViewProgressEvent,
  IOSWebViewProps,
  DecelerationRateConstant,
  NativeWebViewIOS,
  ViewManager,
  State,
  CustomUIManager,
} from './WebViewTypes';

import styles from './WebView.styles';

const UIManager = NotTypedUIManager as CustomUIManager;

const resolveAssetSource = Image.resolveAssetSource;
let didWarnAboutUIWebViewUsage = false;
// Imported from https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollView/processDecelerationRate.js
const processDecelerationRate = (
  decelerationRate: DecelerationRateConstant | number | undefined,
) => {
  if (decelerationRate === 'normal') {
    decelerationRate = 0.998;
  } else if (decelerationRate === 'fast') {
    decelerationRate = 0.99;
  }
  return decelerationRate;
};

const RNCUIWebViewManager = NativeModules.RNCUIWebViewManager as ViewManager;
const RNCWKWebViewManager = NativeModules.RNCWKWebViewManager as ViewManager;

const defaultRenderLoading = () => (
  <View style={styles.loadingView}>
    <ActivityIndicator />
  </View>
);
const defaultRenderError = (
  errorDomain: string | undefined,
  errorCode: number,
  errorDesc: string,
) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTextTitle}>Error loading page</Text>
    <Text style={styles.errorText}>{'Domain: ' + errorDomain}</Text>
    <Text style={styles.errorText}>{'Error Code: ' + errorCode}</Text>
    <Text style={styles.errorText}>{'Description: ' + errorDesc}</Text>
  </View>
);

class WebView extends React.Component<IOSWebViewProps, State> {
  static defaultProps = {
    useWebKit: true,
    cacheEnabled: true,
    originWhitelist: defaultOriginWhitelist,
    useSharedProcessPool: true,
  };

  static isFileUploadSupported = async () => {
    // no native implementation for iOS, depends only on permissions
    return true;
  };

  state: State = {
    viewState: this.props.startInLoadingState ? 'LOADING' : 'IDLE',
    lastErrorEvent: null,
  };

  webViewRef = React.createRef<NativeWebViewIOS>();

  UNSAFE_componentWillMount() {
    if (!this.props.useWebKit && !didWarnAboutUIWebViewUsage) {
      didWarnAboutUIWebViewUsage = true;
      console.warn(
        'UIWebView is deprecated and will be removed soon, please use WKWebView (do not override useWebkit={true} prop),' +
          ' more infos here: https://github.com/react-native-community/react-native-webview/issues/312',
      );
    }
    if (
      this.props.useWebKit === true &&
      this.props.scalesPageToFit !== undefined
    ) {
      console.warn(
        'The scalesPageToFit property is not supported when useWebKit = true',
      );
    }
    if (
      !this.props.useWebKit &&
      this.props.allowsBackForwardNavigationGestures
    ) {
      console.warn(
        'The allowsBackForwardNavigationGestures property is not supported when useWebKit = false',
      );
    }

    if (!this.props.useWebKit && this.props.incognito) {
      console.warn(
        'The incognito property is not supported when useWebKit = false',
      );
    }
  }

  render() {
    const {
      decelerationRate: decelerationRateProp,
      nativeConfig = {},
      onMessage,
      onShouldStartLoadWithRequest: onShouldStartLoadWithRequestProp,
      originWhitelist,
      renderError,
      renderLoading,
      scalesPageToFit = this.props.useWebKit ? undefined : true,
      style,
      useWebKit,
      ...otherProps
    } = this.props;

    let otherView = null;

    if (this.state.viewState === 'LOADING') {
      otherView = (renderLoading || defaultRenderLoading)();
    } else if (this.state.viewState === 'ERROR') {
      const errorEvent = this.state.lastErrorEvent;
      invariant(errorEvent != null, 'lastErrorEvent expected to be non-null');
      otherView = (renderError || defaultRenderError)(
        errorEvent.domain,
        errorEvent.code,
        errorEvent.description,
      );
    } else if (this.state.viewState !== 'IDLE') {
      console.error(
        'RNCWebView invalid state encountered: ' + this.state.viewState,
      );
    }

    const webViewStyles = [styles.container, styles.webView, style];
    if (
      this.state.viewState === 'LOADING' ||
      this.state.viewState === 'ERROR'
    ) {
      // if we're in either LOADING or ERROR states, don't show the webView
      webViewStyles.push(styles.hidden);
    }

    const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
      this.onShouldStartLoadWithRequestCallback,
      originWhitelist,
      onShouldStartLoadWithRequestProp,
    );

    const decelerationRate = processDecelerationRate(decelerationRateProp);

    let NativeWebView = nativeConfig.component as typeof NativeWebViewIOS;

    if (useWebKit) {
      NativeWebView = NativeWebViewIOS || RNCWKWebView;
    } else {
      NativeWebView = NativeWebViewIOS || RNCUIWebView;
    }

    const webView = (
      <NativeWebView
        {...otherProps}
        decelerationRate={decelerationRate}
        key="webViewKey"
        messagingEnabled={typeof onMessage === 'function'}
        onLoadingError={this._onLoadingError}
        onLoadingFinish={this._onLoadingFinish}
        onLoadingProgress={this._onLoadingProgress}
        onLoadingStart={this._onLoadingStart}
        onMessage={this._onMessage}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        ref={this.webViewRef}
        scalesPageToFit={scalesPageToFit}
        // TODO: find a better way to type this.
        source={resolveAssetSource(this.props.source as ImageSourcePropType)}
        style={webViewStyles}
        {...nativeConfig.props}
      />
    );

    return (
      <View style={styles.container}>
        {webView}
        {otherView}
      </View>
    );
  }

  _getCommands = () =>
    !this.props.useWebKit
      ? getViewManagerConfig('RNCUIWebView').Commands
      : getViewManagerConfig('RNCWKWebView').Commands;

  /**
   * Go forward one page in the web view's history.
   */
  goForward = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this._getCommands().goForward,
      null,
    );
  };

  /**
   * Go back one page in the web view's history.
   */
  goBack = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this._getCommands().goBack,
      null,
    );
  };

  /**
   * Reloads the current page.
   */
  reload = () => {
    this.setState({ viewState: 'LOADING' });
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this._getCommands().reload,
      null,
    );
  };

  /**
   * Stop loading the current page.
   */
  stopLoading = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this._getCommands().stopLoading,
      null,
    );
  };

  /**
   * Posts a message to the web view, which will emit a `message` event.
   * Accepts one argument, `data`, which must be a string.
   *
   * In your webview, you'll need to something like the following.
   *
   * ```js
   * document.addEventListener('message', e => { document.title = e.data; });
   * ```
   */
  postMessage = (data: string) => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this._getCommands().postMessage,
      [String(data)],
    );
  };

  /**
   * Injects a javascript string into the referenced WebView. Deliberately does not
   * return a response because using eval() to return a response breaks this method
   * on pages with a Content Security Policy that disallows eval(). If you need that
   * functionality, look into postMessage/onMessage.
   */
  injectJavaScript = (data: string) => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this._getCommands().injectJavaScript,
      [data],
    );
  };

  /**
   * We return an event with a bunch of fields including:
   *  url, title, loading, canGoBack, canGoForward
   */
  _updateNavigationState = (event: WebViewNavigationEvent) => {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(event.nativeEvent);
    }
  };

  /**
   * Returns the native `WebView` node.
   */
  getWebViewHandle = () => {
    const nodeHandle = findNodeHandle(this.webViewRef.current);
    invariant(nodeHandle != null, 'nodeHandle expected to be non-null');
    return nodeHandle as number;
  };

  _onLoadingStart = (event: WebViewNavigationEvent) => {
    const onLoadStart = this.props.onLoadStart;
    onLoadStart && onLoadStart(event);
    this._updateNavigationState(event);
  };

  _onLoadingError = (event: WebViewErrorEvent) => {
    event.persist(); // persist this event because we need to store it
    const { onError, onLoadEnd } = this.props;
    onError && onError(event);
    onLoadEnd && onLoadEnd(event);
    console.warn('Encountered an error loading page', event.nativeEvent);

    this.setState({
      lastErrorEvent: event.nativeEvent,
      viewState: 'ERROR',
    });
  };

  _onLoadingFinish = (event: WebViewNavigationEvent) => {
    const { onLoad, onLoadEnd } = this.props;
    onLoad && onLoad(event);
    onLoadEnd && onLoadEnd(event);
    this.setState({
      viewState: 'IDLE',
    });
    this._updateNavigationState(event);
  };

  _onMessage = (event: WebViewMessageEvent) => {
    const { onMessage } = this.props;
    onMessage && onMessage(event);
  };

  _onLoadingProgress = (event: WebViewProgressEvent) => {
    const { onLoadProgress } = this.props;
    onLoadProgress && onLoadProgress(event);
  };

  onShouldStartLoadWithRequestCallback = (
    shouldStart: boolean,
    url: string,
    lockIdentifier: number,
  ) => {
    let viewManager = (this.props.nativeConfig || {}).viewManager;

    if (this.props.useWebKit) {
      viewManager = viewManager || RNCWKWebViewManager;
    } else {
      viewManager = viewManager || RNCUIWebViewManager;
    }
    invariant(viewManager != null, 'viewManager expected to be non-null');
    viewManager.startLoadWithResult(!!shouldStart, lockIdentifier);
  };

  componentDidUpdate(prevProps: IOSWebViewProps) {
    if (!(prevProps.useWebKit && this.props.useWebKit)) {
      return;
    }

    this._showRedboxOnPropChanges(prevProps, 'allowsInlineMediaPlayback');
    this._showRedboxOnPropChanges(prevProps, 'incognito');
    this._showRedboxOnPropChanges(prevProps, 'mediaPlaybackRequiresUserAction');
    this._showRedboxOnPropChanges(prevProps, 'dataDetectorTypes');

    if (this.props.scalesPageToFit !== undefined) {
      console.warn(
        'The scalesPageToFit property is not supported when useWebKit = true',
      );
    }
  }

  _showRedboxOnPropChanges(
    prevProps: IOSWebViewProps,
    propName: keyof IOSWebViewProps,
  ) {
    if (this.props[propName] !== prevProps[propName]) {
      console.error(
        `Changes to property ${propName} do nothing after the initial render.`,
      );
    }
  }
}

const RNCUIWebView: typeof NativeWebViewIOS = requireNativeComponent(
  'RNCUIWebView',
);
const RNCWKWebView: typeof NativeWebViewIOS = requireNativeComponent(
  'RNCWKWebView',
);

module.exports = WebView;
