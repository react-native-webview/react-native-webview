import React from 'react';
import { NativeSyntheticEvent } from 'react-native';
import { WebViewError, WebViewSharedProps, WebViewProgressEvent } from './types/WebViewTypes';
declare enum WebViewState {
    IDLE = "IDLE",
    LOADING = "LOADING",
    ERROR = "ERROR"
}
declare enum NavigationType {
    click = "click",
    formsubmit = "formsubmit",
    backforward = "backforward",
    reload = "reload",
    formresubmit = "formresubmit",
    other = "other"
}
declare type State = {
    viewState: WebViewState;
    lastErrorEvent: WebViewError | null;
};
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
export default class WebView extends React.Component<WebViewSharedProps, State> {
    static JSNavigationScheme: string;
    static NavigationType: typeof NavigationType;
    static defaultProps: {
        useWebKit: boolean;
        originWhitelist: string[];
    };
    static isFileUploadSupported: () => Promise<boolean>;
    state: State;
    webViewRef: React.RefObject<React.ComponentClass<{}, any>>;
    UNSAFE_componentWillMount(): void;
    _getCommands(): {
        goForward: () => void;
        goBack: () => void;
        reload: () => void;
        stopLoading: () => void;
        postMessage: () => void;
        injectJavaScript: () => void;
    };
    /**
     * Go forward one page in the web view's history.
     */
    goForward: () => void;
    /**
     * Go back one page in the web view's history.
     */
    goBack: () => void;
    /**
     * Reloads the current page.
     */
    reload: () => void;
    /**
     * Stop loading the current page.
     */
    stopLoading: () => void;
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
    postMessage: (data: string) => void;
    /**
     * Injects a javascript string into the referenced WebView. Deliberately does not
     * return a response because using eval() to return a response breaks this method
     * on pages with a Content Security Policy that disallows eval(). If you need that
     * functionality, look into postMessage/onMessage.
     */
    injectJavaScript: (data: string) => void;
    /**
     * We return an event with a bunch of fields including:
     *  url, title, loading, canGoBack, canGoForward
     */
    _updateNavigationState: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewNavigation>) => void;
    /**
     * Returns the native `WebView` node.
     */
    getWebViewHandle: () => number | null;
    _onLoadingStart: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewNavigation>) => void;
    _onLoadingError: (event: NativeSyntheticEvent<WebViewError>) => void;
    _onLoadingFinish: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewNavigation>) => void;
    _onMessage: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewMessage>) => void;
    _onLoadingProgress: (event: NativeSyntheticEvent<WebViewProgressEvent>) => void;
    componentDidUpdate(prevProps: WebViewSharedProps): void;
    _showRedboxOnPropChanges(prevProps: WebViewSharedProps, propName: 'allowsInlineMediaPlayback' | 'mediaPlaybackRequiresUserAction' | 'dataDetectorTypes'): void;
    render(): React.ReactNode;
}
export {};
