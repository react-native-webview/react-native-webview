import React from 'react';
import { createOnShouldStartLoadWithRequest } from './WebViewShared';
import { WebViewRenderProcessGoneEvent, WebViewErrorEvent, WebViewHttpErrorEvent, WebViewMessageEvent, WebViewNavigationEvent, WebViewProgressEvent, AndroidWebViewProps, NativeWebViewAndroid, State } from './WebViewTypes';
/**
 * Renders a native WebView.
 */
declare class WebView extends React.Component<AndroidWebViewProps, State> {
    static defaultProps: {
        overScrollMode: string;
        javaScriptEnabled: boolean;
        thirdPartyCookiesEnabled: boolean;
        scalesPageToFit: boolean;
        allowsFullscreenVideo: boolean;
        allowFileAccess: boolean;
        saveFormDataDisabled: boolean;
        cacheEnabled: boolean;
        androidHardwareAccelerationDisabled: boolean;
        androidLayerType: string;
        originWhitelist: string[];
        setSupportMultipleWindows: boolean;
        setBuiltInZoomControls: boolean;
        setDisplayZoomControls: boolean;
        nestedScrollEnabled: boolean;
    };
    static isFileUploadSupported: () => Promise<any>;
    startUrl: string | null;
    state: State;
    onShouldStartLoadWithRequest: ReturnType<typeof createOnShouldStartLoadWithRequest> | null;
    webViewRef: React.RefObject<NativeWebViewAndroid>;
    messagingModuleName: string;
    componentDidMount: () => void;
    getCommands: () => {
        goForward: number;
        goBack: number;
        reload: number;
        stopLoading: number;
        postMessage: number;
        injectJavaScript: number;
        loadUrl: number;
        requestFocus: number;
        clearHistory: number;
        clearCache: number;
        clearFormData: number;
    };
    goForward: () => void;
    goBack: () => void;
    reload: () => void;
    stopLoading: () => void;
    requestFocus: () => void;
    postMessage: (data: string) => void;
    clearFormData: () => void;
    clearCache: (includeDiskFiles: boolean) => void;
    clearHistory: () => void;
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
    updateNavigationState: (event: WebViewNavigationEvent) => void;
    /**
     * Returns the native `WebView` node.
     */
    getWebViewHandle: () => number;
    onLoadingStart: (event: WebViewNavigationEvent) => void;
    onLoadingError: (event: WebViewErrorEvent) => void;
    onHttpError: (event: WebViewHttpErrorEvent) => void;
    onRenderProcessGone: (event: WebViewRenderProcessGoneEvent) => void;
    onLoadingFinish: (event: WebViewNavigationEvent) => void;
    onMessage: (event: WebViewMessageEvent) => void;
    onLoadingProgress: (event: WebViewProgressEvent) => void;
    onShouldStartLoadWithRequestCallback: (shouldStart: boolean, url: string, lockIdentifier?: number | undefined) => void;
    render(): JSX.Element;
}
export default WebView;
//# sourceMappingURL=WebView.android.d.ts.map