import React from 'react';

import {
  ActivityIndicator,
  Image,
  requireNativeComponent,
  StyleSheet,
  UIManager,
  View,
  NativeModules,

  NativeSyntheticEvent,
  findNodeHandle  
} from 'react-native';

import invariant from 'invariant';

import {
  defaultOriginWhitelist,
  createOnShouldStartLoadWithRequest,
  originWhitelistToRegex
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hidden: {
    height: 0,
    flex: 0, // disable 'flex:1' when hiding a View
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingProgressBar: {
    height: 20,
  },
});

enum WebViewState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

const isWebViewUriSource = (
  source: WebViewSource,
): source is WebViewSourceUri =>
  typeof source !== 'number' && !('html' in source);

const defaultRenderLoading = (): React.ReactNode => (
  <View style={styles.loadingView}>
    <ActivityIndicator style={styles.loadingProgressBar} />
  </View>
);

type State = {
  viewState: WebViewState;
  lastErrorEvent: WebViewError | null;
};

const RNCWebView = requireNativeComponent('RNCWebView');

/**
 * Renders a native WebView.
 */
export default class WebView extends React.Component<
  WebViewSharedProps,
  State
> {
  static defaultProps = {
    overScrollMode: 'always',
    javaScriptEnabled: true,
    thirdPartyCookiesEnabled: true,
    scalesPageToFit: true,
    allowFileAccess: false,
    saveFormDataDisabled: false,
    originWhitelist: defaultOriginWhitelist,
  };

  static isFileUploadSupported = async (): Promise<boolean> =>
    // native implementation should return "true" only for Android 5+
    NativeModules.RNCWebView.isFileUploadSupported();

  state: State = {
    viewState: this.props.startInLoadingState
      ? WebViewState.LOADING
      : WebViewState.IDLE,
    lastErrorEvent: null,
  };

  webViewRef = React.createRef<React.ComponentClass>();


  goForward = (): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.RNCWebView.Commands.goForward,
      null,
    );
  };

  goBack = (): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.RNCWebView.Commands.goBack,
      null,
    );
  };

  reload = (): void => {
    this.setState({
      viewState: WebViewState.LOADING,
    });
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.RNCWebView.Commands.reload,
      null,
    );
  };

  stopLoading = (): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.RNCWebView.Commands.stopLoading,
      null,
    );
  };

  postMessage = (data: string): void => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewHandle(),
      UIManager.RNCWebView.Commands.postMessage,
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
      UIManager.RNCWebView.Commands.injectJavaScript,
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



  onShouldStartLoadWithRequestCallback = (
    shouldStart: boolean,
    url: string,
  ): void => {
    if (shouldStart) {
      UIManager.dispatchViewManagerCommand(
        this.getWebViewHandle(),
        UIManager.RNCWebView.Commands.loadUrl,
        [String(url)],
      );
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

  
  render(): React.ReactNode {
    let otherView = null;

    if (this.state.viewState === WebViewState.LOADING) {
      otherView = (this.props.renderLoading || defaultRenderLoading)();
    } else if (this.state.viewState === WebViewState.ERROR) {
      const errorEvent = this.state.lastErrorEvent;
      if (errorEvent) {
        otherView
          = this.props.renderError
          && this.props.renderError(
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

    const webViewStyles = [styles.container, this.props.style];
    if (
      this.state.viewState === WebViewState.LOADING
      || this.state.viewState === WebViewState.ERROR
    ) {
      // if we're in either LOADING or ERROR states, don't show the webView
      webViewStyles.push(styles.hidden);
    }

    let source: WebViewSource = this.props.source || {};
    if (!this.props.source && this.props.html) {
      source = { html: this.props.html };
    } else if (!this.props.source && this.props.url) {
      source = { uri: this.props.url };
    }

    if (isWebViewUriSource(source)) {
      if (source.method === 'POST' && source.headers) {
        // eslint-disable-next-line no-console
        console.warn(
          'WebView: `source.headers` is not supported when using POST.',
        );
      } else if (source.method === 'GET' && source.body) {
        // eslint-disable-next-line no-console
        console.warn('WebView: `source.body` is not supported when using GET.');
      }
    }

    const nativeConfig = this.props.nativeConfig || {};

    const originWhitelist = (this.props.originWhitelist || []).map(
      originWhitelistToRegex,
    );

    const NativeWebView = nativeConfig.component || RNCWebView;

    const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
      this.onShouldStartLoadWithRequestCallback,
      this.props.originWhitelist,
      this.props.onShouldStartLoadWithRequest,
    );
    
    const webView = (
      <NativeWebView
        ref={this.webViewRef}
        key="webViewKey"
        style={webViewStyles}
        source={Image.resolveAssetSource(source as WebViewSourceUri)} // typing issue of not compatible of WebViewSourceHtml in react native.
        scalesPageToFit={this.props.scalesPageToFit}
        allowFileAccess={this.props.allowFileAccess}
        injectedJavaScript={this.props.injectedJavaScript}
        userAgent={this.props.userAgent}
        javaScriptEnabled={this.props.javaScriptEnabled}
        thirdPartyCookiesEnabled={this.props.thirdPartyCookiesEnabled}
        domStorageEnabled={this.props.domStorageEnabled}
        messagingEnabled={typeof this.props.onMessage === 'function'}
        onMessage={this.onMessage}
        overScrollMode={this.props.overScrollMode}
        contentInset={this.props.contentInset}
        automaticallyAdjustContentInsets={
          this.props.automaticallyAdjustContentInsets
        }
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onContentSizeChange={this.props.onContentSizeChange}
        onLoadingStart={this.onLoadingStart}
        onLoadingFinish={this.onLoadingFinish}
        onLoadingError={this.onLoadingError}
        onLoadingProgress={this.onLoadingProgress}
        testID={this.props.testID}
        geolocationEnabled={this.props.geolocationEnabled}
        mediaPlaybackRequiresUserAction={
          this.props.mediaPlaybackRequiresUserAction
        }
        allowUniversalAccessFromFileURLs={
          this.props.allowUniversalAccessFromFileURLs
        }
        originWhitelist={originWhitelist}
        mixedContentMode={this.props.mixedContentMode}
        saveFormDataDisabled={this.props.saveFormDataDisabled}
        urlPrefixesForDefaultIntent={this.props.urlPrefixesForDefaultIntent}
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
