import React from 'react';
import { NativeSyntheticEvent } from 'react-native';
import { WebViewError, WebViewSharedProps, WebViewProgressEvent } from './types/WebViewTypes';
declare enum WebViewState {
    IDLE = "IDLE",
    LOADING = "LOADING",
    ERROR = "ERROR"
}
declare type State = {
    viewState: WebViewState;
    lastErrorEvent: WebViewError | null;
};
/**
 * Renders a native WebView.
 */
export default class WebView extends React.Component<WebViewSharedProps, State> {
    static defaultProps: {
        overScrollMode: string;
        javaScriptEnabled: boolean;
        thirdPartyCookiesEnabled: boolean;
        scalesPageToFit: boolean;
        allowFileAccess: boolean;
        saveFormDataDisabled: boolean;
        originWhitelist: string[];
    };
    static isFileUploadSupported: () => Promise<boolean>;
    state: State;
    webViewRef: React.RefObject<React.ComponentClass<{}, any>>;
    goForward: () => void;
    goBack: () => void;
    reload: () => void;
    stopLoading: () => void;
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
    updateNavigationState: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewNavigation>) => void;
    getWebViewHandle: () => number | null;
    onLoadingStart: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewNavigation>) => void;
    onLoadingError: (event: NativeSyntheticEvent<WebViewError>) => void;
    onLoadingFinish: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewNavigation>) => void;
    onMessage: (event: NativeSyntheticEvent<import("./types/WebViewTypes").WebViewMessage>) => void;
    onLoadingProgress: (event: NativeSyntheticEvent<WebViewProgressEvent>) => void;
    render(): React.ReactNode;
}
export {};
