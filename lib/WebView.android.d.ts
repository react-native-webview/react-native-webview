import React from 'react';
import { AndroidWebViewProps, NativeWebViewAndroid, State } from './WebViewTypes';
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
        originWhitelist: string[];
    };
    static isFileUploadSupported: () => Promise<any>;
    startUrl: string | null;
    state: State;
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
        onPause: number;
        onResume: number;
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
    updateNavigationState: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNavigation>) => void;
    /**
     * Returns the native `WebView` node.
     */
    getWebViewHandle: () => number;
    onLoadingStart: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNavigation>) => void;
    onLoadingError: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewError>) => void;
    onHttpError: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewHttpError>) => void;
    onLoadingFinish: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNavigation>) => void;
    onMessage: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewMessage>) => void;
    onLoadingProgress: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNativeProgressEvent>) => void;
    onShouldStartLoadWithRequestCallback: (shouldStart: boolean, url: string) => void;
    onPause: () => void;
    onResume: () => void;
    render(): JSX.Element;
}
export default WebView;
//# sourceMappingURL=WebView.android.d.ts.map