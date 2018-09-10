/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import React from 'react';

import ReactNative from 'react-native'
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  UIManager,
  View,
  requireNativeComponent,
  NativeModules,
  Image
} from 'react-native';

import invariant from 'fbjs/lib/invariant';
import keyMirror from 'fbjs/lib/keyMirror';

import WebViewShared from './WebViewShared';
import type {
  WebViewErrorEvent,
  WebViewEvent,
  WebViewSharedProps,
  WebViewSource,
} from './WebViewTypes';

const resolveAssetSource = Image.resolveAssetSource;

// Imported from https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollView/processDecelerationRate.js
function processDecelerationRate(decelerationRate) {
  if (decelerationRate === 'normal') {
    decelerationRate = 0.998;
  } else if (decelerationRate === 'fast') {
    decelerationRate = 0.99;
  }
  return decelerationRate;
}

const RCTUIWebViewManager = NativeModules.UIWebViewManager;
const RCTWKWebViewManager = NativeModules.WKWebViewManager;

const BGWASH = 'rgba(255,255,255,0.8)';
const RCT_WEBVIEW_REF = 'webview';

const WebViewState = keyMirror({
  IDLE: null,
  LOADING: null,
  ERROR: null,
});

const NavigationType = keyMirror({
  click: true,
  formsubmit: true,
  backforward: true,
  reload: true,
  formresubmit: true,
  other: true,
});

const JSNavigationScheme = 'react-js-navigation';

type State = {|
  viewState: WebViewState,
  lastErrorEvent: ?WebViewErrorEvent,
  startInLoadingState: boolean,
|};

const DataDetectorTypes = [
  'phoneNumber',
  'link',
  'address',
  'calendarEvent',
  'trackingNumber',
  'flightNumber',
  'lookupSuggestion',
  'none',
  'all',
];

const defaultRenderLoading = () => (
  <View style={styles.loadingView}>
    <ActivityIndicator />
  </View>
);
const defaultRenderError = (errorDomain, errorCode, errorDesc) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTextTitle}>Error loading page</Text>
    <Text style={styles.errorText}>{'Domain: ' + errorDomain}</Text>
    <Text style={styles.errorText}>{'Error Code: ' + errorCode}</Text>
    <Text style={styles.errorText}>{'Description: ' + errorDesc}</Text>
  </View>
);

/**
 * `WebView` renders web content in a native view.
 *
 *```
 * import React, { Component } from 'react';
 * import { WebView } from 'react-native';
 *
 * class MyWeb extends Component {
 *   render() {
 *     return (
 *       <WebView
 *         source={{uri: 'https://github.com/facebook/react-native'}}
 *         style={{marginTop: 20}}
 *       />
 *     );
 *   }
 * }
 *```
 *
 * You can use this component to navigate back and forth in the web view's
 * history and configure various properties for the web content.
 */
class WebView extends React.Component<WebViewSharedProps, State> {
  static JSNavigationScheme = JSNavigationScheme;
  static NavigationType = NavigationType;

  static defaultProps = {
    useWebKit: true,
    originWhitelist: WebViewShared.defaultOriginWhitelist,
  };

  state = {
    viewState: WebViewState.IDLE,
    lastErrorEvent: (null: ?WebViewErrorEvent),
    startInLoadingState: true,
  };

  UNSAFE_componentWillMount() {
    if (this.props.startInLoadingState) {
      this.setState({ viewState: WebViewState.LOADING });
    }

    if (
      this.props.useWebKit === true &&
      this.props.scalesPageToFit !== undefined
    ) {
      console.warn(
        'The scalesPageToFit property is not supported when useWebKit = true',
      );
    }
  }

  render() {
    let otherView = null;

    let scalesPageToFit;

    if (this.props.useWebKit) {
      ({ scalesPageToFit } = this.props);
    } else {
      ({ scalesPageToFit = true } = this.props);
    }

    if (this.state.viewState === WebViewState.LOADING) {
      otherView = (this.props.renderLoading || defaultRenderLoading)();
    } else if (this.state.viewState === WebViewState.ERROR) {
      const errorEvent = this.state.lastErrorEvent;
      invariant(errorEvent != null, 'lastErrorEvent expected to be non-null');
      otherView = (this.props.renderError || defaultRenderError)(
        errorEvent.domain,
        errorEvent.code,
        errorEvent.description,
      );
    } else if (this.state.viewState !== WebViewState.IDLE) {
      console.error(
        'RCTWebView invalid state encountered: ' + this.state.viewState,
      );
    }

    const webViewStyles = [styles.container, styles.webView, this.props.style];
    if (
      this.state.viewState === WebViewState.LOADING ||
      this.state.viewState === WebViewState.ERROR
    ) {
      // if we're in either LOADING or ERROR states, don't show the webView
      webViewStyles.push(styles.hidden);
    }

    const nativeConfig = this.props.nativeConfig || {};

    let viewManager = nativeConfig.viewManager;

    if (this.props.useWebKit) {
      viewManager = viewManager || RCTWKWebViewManager;
    } else {
      viewManager = viewManager || RCTUIWebViewManager;
    }

    const compiledWhitelist = [
      'about:blank',
      ...(this.props.originWhitelist || []),
    ].map(WebViewShared.originWhitelistToRegex);
    const onShouldStartLoadWithRequest = (event) => {
      let shouldStart = true;
      const { url } = event.nativeEvent;
      const origin = WebViewShared.extractOrigin(url);
      const passesWhitelist = compiledWhitelist.some(x =>
        new RegExp(x).test(origin),
      );
      shouldStart = shouldStart && passesWhitelist;
      if (!passesWhitelist) {
        Linking.openURL(url);
      }
      if (this.props.onShouldStartLoadWithRequest) {
        shouldStart =
          shouldStart &&
          this.props.onShouldStartLoadWithRequest(event.nativeEvent);
      }
      invariant(viewManager != null, 'viewManager expected to be non-null');
      viewManager.startLoadWithResult(
        !!shouldStart,
        event.nativeEvent.lockIdentifier,
      );
    };

    const decelerationRate = processDecelerationRate(
      this.props.decelerationRate,
    );

    let source = this.props.source || ({}: WebViewSource);
    if (!this.props.source && this.props.html) {
      source = { html: this.props.html };
    } else if (!this.props.source && this.props.url) {
      source = { uri: this.props.url };
    }

    const messagingEnabled = typeof this.props.onMessage === 'function';

    let NativeWebView = nativeConfig.component;

    if (this.props.useWebKit) {
      NativeWebView = NativeWebView || RCTWKWebView;
    } else {
      NativeWebView = NativeWebView || RCTWebView;
    }

    const webView = (
      <NativeWebView
        ref={RCT_WEBVIEW_REF}
        key="webViewKey"
        style={webViewStyles}
        source={resolveAssetSource(source)}
        injectedJavaScript={this.props.injectedJavaScript}
        bounces={this.props.bounces}
        scrollEnabled={this.props.scrollEnabled}
        decelerationRate={decelerationRate}
        contentInset={this.props.contentInset}
        automaticallyAdjustContentInsets={
          this.props.automaticallyAdjustContentInsets
        }
        onLoadingStart={this._onLoadingStart}
        onLoadingFinish={this._onLoadingFinish}
        onLoadingError={this._onLoadingError}
        messagingEnabled={messagingEnabled}
        onMessage={this._onMessage}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        scalesPageToFit={scalesPageToFit}
        allowsInlineMediaPlayback={this.props.allowsInlineMediaPlayback}
        mediaPlaybackRequiresUserAction={
          this.props.mediaPlaybackRequiresUserAction
        }
        dataDetectorTypes={this.props.dataDetectorTypes}
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

  _getCommands() {
    if (!this.props.useWebKit) {
      return UIManager.RCTWebView.Commands;
    }

    return UIManager.RCTWKWebView.Commands;
  }

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
    this.setState({ viewState: WebViewState.LOADING });
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
  _updateNavigationState = (event: WebViewEvent) => {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(event.nativeEvent);
    }
  };

  /**
   * Returns the native `WebView` node.
   */
  getWebViewHandle = () => {
    return ReactNative.findNodeHandle(this.refs[RCT_WEBVIEW_REF]);
  };

  _onLoadingStart = (event: WebViewEvent) => {
    const onLoadStart = this.props.onLoadStart;
    onLoadStart && onLoadStart(event);
    this._updateNavigationState(event);
  };

  _onLoadingError = (event: WebViewEvent) => {
    event.persist(); // persist this event because we need to store it
    const { onError, onLoadEnd } = this.props;
    onError && onError(event);
    onLoadEnd && onLoadEnd(event);
    console.warn('Encountered an error loading page', event.nativeEvent);

    this.setState({
      lastErrorEvent: event.nativeEvent,
      viewState: WebViewState.ERROR,
    });
  };

  _onLoadingFinish = (event: WebViewEvent) => {
    const { onLoad, onLoadEnd } = this.props;
    onLoad && onLoad(event);
    onLoadEnd && onLoadEnd(event);
    this.setState({
      viewState: WebViewState.IDLE,
    });
    this._updateNavigationState(event);
  };

  _onMessage = (event: WebViewEvent) => {
    const { onMessage } = this.props;
    onMessage && onMessage(event);
  };

  componentDidUpdate(prevProps: WebViewSharedProps) {
    if (!(prevProps.useWebKit && this.props.useWebKit)) {
      return;
    }

    this._showRedboxOnPropChanges(prevProps, 'allowsInlineMediaPlayback');
    this._showRedboxOnPropChanges(prevProps, 'mediaPlaybackRequiresUserAction');
    this._showRedboxOnPropChanges(prevProps, 'dataDetectorTypes');

    if (this.props.scalesPageToFit !== undefined) {
      console.warn(
        'The scalesPageToFit property is not supported when useWebKit = true',
      );
    }
  }

  _showRedboxOnPropChanges(prevProps, propName: string) {
    if (this.props[propName] !== prevProps[propName]) {
      console.error(
        `Changes to property ${propName} do nothing after the initial render.`,
      );
    }
  }
}

const RCTWebView = requireNativeComponent('RCTWebView');
const RCTWKWebView = requireNativeComponent('RCTWKWebView');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BGWASH,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  errorTextTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  hidden: {
    height: 0,
    flex: 0, // disable 'flex:1' when hiding a View
  },
  loadingView: {
    backgroundColor: BGWASH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  webView: {
    backgroundColor: '#ffffff',
  },
});

module.exports = WebView;
