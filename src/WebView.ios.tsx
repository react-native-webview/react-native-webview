import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  UIManager,
  View,
  requireNativeComponent,
  NativeModules,
  Image,
  findNodeHandle,
  NativeSyntheticEvent,
} from 'react-native';

import invariant from 'invariant';

import {
  defaultOriginWhitelist,
  createOnShouldStartLoadWithRequest,
} from './WebViewShared';

import {
  WebViewSourceUri,
  WebViewError,
  WebViewErrorEvent,
  WebViewMessageEvent,
  WebViewNavigationEvent,
  WebViewSharedProps,
  WebViewSource,
  WebViewProgressEvent,
} from './types/WebViewTypes';

type DecelerationRate = number | 'normal' | 'fast';

// Imported from https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollView/processDecelerationRate.js
function processDecelerationRate(
  decelerationRate?: DecelerationRate,
): number | undefined {
  if (decelerationRate === 'normal') {
    return 0.998;
  }
  if (decelerationRate === 'fast') {
    return 0.99;
  }
  return decelerationRate;
}

const { RNCWKWebViewManager, RNCUIWebViewManager } = NativeModules;

const BGWASH = 'rgba(255,255,255,0.8)';

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

enum WebViewState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

enum NavigationType {
  click = 'click',
  formsubmit = 'formsubmit',
  backforward = 'backforward',
  reload = 'reload',
  formresubmit = 'formresubmit',
  other = 'other',
}

const JSNavigationScheme = 'react-js-navigation';

type State = {
  viewState: WebViewState;
  lastErrorEvent: WebViewError | null;
};

const defaultRenderLoading = (): React.ReactNode => (
  <View style={styles.loadingView}>
    <ActivityIndicator />
  </View>
);
const defaultRenderError = (
  errorDomain: string | undefined,
  errorCode: number,
  errorDesc: string,
): React.ReactNode => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTextTitle}>Error loading page</Text>
    <Text style={styles.errorText}>{`Domain: ${errorDomain}`}</Text>
    <Text style={styles.errorText}>{`Error Code: ${errorCode}`}</Text>
    <Text style={styles.errorText}>{`Description: ${errorDesc}`}</Text>
  </View>
);

const RNCUIWebView = requireNativeComponent('RNCUIWebView');
const RNCWKWebView = requireNativeComponent('RNCWKWebView');

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
export default class WebView extends React.Component<
  WebViewSharedProps,
  State
> {
  static JSNavigationScheme = JSNavigationScheme;

  static NavigationType = NavigationType;

  static defaultProps = {
    useWebKit: true,
    originWhitelist: defaultOriginWhitelist,
  };

  static isFileUploadSupported = async (): Promise<boolean> =>
    // no native implementation for iOS, depends only on permissions
    true;

  state: State = {
    viewState: this.props.startInLoadingState
      ? WebViewState.LOADING
      : WebViewState.IDLE,
    lastErrorEvent: null,
  };

  webViewRef = React.createRef<React.ComponentClass>();

  // eslint-disable-next-line camelcase, react/sort-comp
  UNSAFE_componentWillMount(): void {
    if (
      this.props.useWebKit === true
      && this.props.scalesPageToFit !== undefined
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        'The scalesPageToFit property is not supported when useWebKit = true',
      );
    }
    if (
      !this.props.useWebKit
      && this.props.allowsBackForwardNavigationGestures
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        'The allowsBackForwardNavigationGestures property is not supported when useWebKit = false',
      );
    }
  }

  /**
   * Go forward one page in the web view's history.
   */
  goForward = (): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this.getCommands().goForward,
      null,
    );
  };

  getCommands(): {
    goForward: () => void;
    goBack: () => void;
    reload: () => void;
    stopLoading: () => void;
    postMessage: () => void;
    injectJavaScript: () => void;
  } {
    if (!this.props.useWebKit) {
      return UIManager.RNCUIWebView.Commands;
    }

    return UIManager.RNCWKWebView.Commands;
  }

  /**
   * Go back one page in the web view's history.
   */
  goBack = (): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this.getCommands().goBack,
      null,
    );
  };

  /**
   * Reloads the current page.
   */
  reload = (): void => {
    this.setState({ viewState: WebViewState.LOADING });
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this.getCommands().reload,
      null,
    );
  };

  /**
   * Stop loading the current page.
   */
  stopLoading = (): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this.getCommands().stopLoading,
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
  postMessage = (data: string): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this.getCommands().postMessage,
      [String(data)],
    );
  };

  /**
   * Injects a javascript string into the referenced WebView. Deliberately does not
   * return a response because using eval() to return a response breaks this method
   * on pages with a Content Security Policy that disallows eval(). If you need that
   * functionality, look into postMessage/onMessage.
   */
  injectJavaScript = (data: string): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      this.getCommands().injectJavaScript,
      [data],
    );
  };

  /**
   * We return an event with a bunch of fields including:
   *  url, title, loading, canGoBack, canGoForward
   */
  updateNavigationState = (event: WebViewNavigationEvent): void => {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(event.nativeEvent);
    }
  };

  /**
   * Returns the native `WebView` node.
   */
  getWebViewHandle = (): number | null =>
    findNodeHandle(this.webViewRef.current);

  onLoadingStart = (event: WebViewNavigationEvent): void => {
    const { onLoadStart } = this.props;
    if (onLoadStart) {
      onLoadStart(event);
    }
    this.updateNavigationState(event);
  };

  onLoadingError = (event: WebViewErrorEvent): void => {
    event.persist(); // persist this event because we need to store it
    const { onError, onLoadEnd } = this.props;
    if (onError) {
      onError(event);
    }
    if (onLoadEnd) {
      onLoadEnd(event);
    }
    // eslint-disable-next-line no-console
    console.warn('Encountered an error loading page', event.nativeEvent);

    this.setState({
      lastErrorEvent: event.nativeEvent,
      viewState: WebViewState.ERROR,
    });
  };

  onLoadingFinish = (event: WebViewNavigationEvent): void => {
    const { onLoad, onLoadEnd } = this.props;
    if (onLoad) {
      onLoad(event);
    }
    if (onLoadEnd) {
      onLoadEnd(event);
    }
    this.setState({
      viewState: WebViewState.IDLE,
    });
    this.updateNavigationState(event);
  };

  onMessage = (event: WebViewMessageEvent): void => {
    const { onMessage } = this.props;
    if (onMessage) {
      onMessage(event);
    }
  };

  onLoadingProgress = (
    event: NativeSyntheticEvent<WebViewProgressEvent>,
  ): void => {
    const { onLoadProgress } = this.props;
    if (onLoadProgress) {
      onLoadProgress(event);
    }
  };

  onShouldStartLoadWithRequestCallback = (
    shouldStart: boolean,
    _url: string,
    lockIdentifier: number,
  ): void => {
    let viewManager = (this.props.nativeConfig || {}).viewManager;

    if (this.props.useWebKit) {
      viewManager = viewManager || RNCWKWebViewManager;
    } else {
      viewManager = viewManager || RNCUIWebViewManager;
    }
    invariant(viewManager != null, 'viewManager expected to be non-null');
    viewManager.startLoadWithResult(!!shouldStart, lockIdentifier);
  };

  componentDidUpdate(prevProps: WebViewSharedProps): void {
    if (!(prevProps.useWebKit && this.props.useWebKit)) {
      return;
    }

    this.showRedboxOnPropChanges(prevProps, 'allowsInlineMediaPlayback');
    this.showRedboxOnPropChanges(prevProps, 'mediaPlaybackRequiresUserAction');
    this.showRedboxOnPropChanges(prevProps, 'dataDetectorTypes');

    if (this.props.scalesPageToFit !== undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        'The scalesPageToFit property is not supported when useWebKit = true',
      );
    }
  }

  showRedboxOnPropChanges(
    prevProps: WebViewSharedProps,
    propName:
      | 'allowsInlineMediaPlayback'
      | 'mediaPlaybackRequiresUserAction'
      | 'dataDetectorTypes',
  ): void {
    if (this.props[propName] !== prevProps[propName]) {
      // eslint-disable-next-line no-console
      console.error(
        `Changes to property ${propName} do nothing after the initial render.`,
      );
    }
  }

  render(): React.ReactNode {
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
      if (errorEvent) {
        otherView = (this.props.renderError || defaultRenderError)(
          errorEvent.domain,
          errorEvent.code,
          errorEvent.description,
        );
      } else {
        invariant(errorEvent != null, 'lastErrorEvent expected to be non-null');
      }
    } else if (this.state.viewState !== WebViewState.IDLE) {
      // eslint-disable-next-line no-console
      console.error(
        `RNCWebView invalid state encountered: ${this.state.viewState}`,
      );
    }

    const webViewStyles = [styles.container, styles.webView, this.props.style];
    if (
      this.state.viewState === WebViewState.LOADING
      || this.state.viewState === WebViewState.ERROR
    ) {
      // if we're in either LOADING or ERROR states, don't show the webView
      webViewStyles.push(styles.hidden);
    }

    const nativeConfig = this.props.nativeConfig || {};

    let { viewManager } = nativeConfig;

    if (this.props.useWebKit) {
      viewManager = viewManager || RNCWKWebViewManager;
    } else {
      viewManager = viewManager || RNCUIWebViewManager;
    }

    const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
      this.onShouldStartLoadWithRequestCallback,
      this.props.originWhitelist,
      this.props.onShouldStartLoadWithRequest,
    );

    const decelerationRate = processDecelerationRate(
      this.props.decelerationRate,
    );

    let source: WebViewSource = this.props.source || {};
    if (!this.props.source && this.props.html) {
      source = { html: this.props.html };
    } else if (!this.props.source && this.props.url) {
      source = { uri: this.props.url };
    }

    const messagingEnabled = typeof this.props.onMessage === 'function';

    const NativeWebView
      = nativeConfig.component
      || (this.props.useWebKit ? RNCWKWebView : RNCUIWebView);

    const webView = (
      <NativeWebView
        ref={this.webViewRef}
        key="webViewKey"
        style={webViewStyles}
        source={Image.resolveAssetSource(source as WebViewSourceUri)} // typing issue of not compatible of WebViewSourceHtml in react native.
        injectedJavaScript={this.props.injectedJavaScript}
        bounces={this.props.bounces}
        scrollEnabled={this.props.scrollEnabled}
        pagingEnabled={this.props.pagingEnabled}
        decelerationRate={decelerationRate}
        contentInset={this.props.contentInset}
        automaticallyAdjustContentInsets={
          this.props.automaticallyAdjustContentInsets
        }
        hideKeyboardAccessoryView={this.props.hideKeyboardAccessoryView}
        allowsBackForwardNavigationGestures={
          this.props.allowsBackForwardNavigationGestures
        }
        userAgent={this.props.userAgent}
        onLoadingStart={this.onLoadingStart}
        onLoadingFinish={this.onLoadingFinish}
        onLoadingError={this.onLoadingError}
        onLoadingProgress={this.onLoadingProgress}
        messagingEnabled={messagingEnabled}
        onMessage={this.onMessage}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        scalesPageToFit={scalesPageToFit}
        allowsInlineMediaPlayback={this.props.allowsInlineMediaPlayback}
        mediaPlaybackRequiresUserAction={
          this.props.mediaPlaybackRequiresUserAction
        }
        dataDetectorTypes={this.props.dataDetectorTypes}
        allowsLinkPreview={this.props.allowsLinkPreview}
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
}
