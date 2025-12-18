/// <reference types="react-native/types/modules/codegen" />
import React from 'react';
import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler, Double, Int32, WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
export type WebViewNativeEvent = Readonly<{
    url: string;
    loading: boolean;
    title: string;
    canGoBack: boolean;
    canGoForward: boolean;
    lockIdentifier: Double;
}>;
export type WebViewMessageEvent = Readonly<{
    url: string;
    loading: boolean;
    title: string;
    canGoBack: boolean;
    canGoForward: boolean;
    lockIdentifier: Double;
    data: string;
}>;
export type WebViewOpenWindowEvent = Readonly<{
    targetUrl: string;
}>;
export type WebViewHttpErrorEvent = Readonly<{
    url: string;
    loading: boolean;
    title: string;
    canGoBack: boolean;
    canGoForward: boolean;
    lockIdentifier: Double;
    description: string;
    statusCode: Int32;
}>;
export type WebViewErrorEvent = Readonly<{
    url: string;
    loading: boolean;
    title: string;
    canGoBack: boolean;
    canGoForward: boolean;
    lockIdentifier: Double;
    domain?: string;
    code: Int32;
    description: string;
}>;
export type WebViewNativeProgressEvent = Readonly<{
    url: string;
    loading: boolean;
    title: string;
    canGoBack: boolean;
    canGoForward: boolean;
    lockIdentifier: Double;
    progress: Double;
}>;
export type WebViewNavigationEvent = Readonly<{
    url: string;
    loading: boolean;
    title: string;
    canGoBack: boolean;
    canGoForward: boolean;
    lockIdentifier: Double;
    navigationType: 'click' | 'formsubmit' | 'backforward' | 'reload' | 'formresubmit' | 'other';
    mainDocumentURL?: string;
}>;
export type ShouldStartLoadRequestEvent = Readonly<{
    url: string;
    loading: boolean;
    title: string;
    canGoBack: boolean;
    canGoForward: boolean;
    lockIdentifier: Double;
    navigationType: 'click' | 'formsubmit' | 'backforward' | 'reload' | 'formresubmit' | 'other';
    mainDocumentURL?: string;
    isTopFrame: boolean;
}>;
type ScrollEvent = Readonly<{
    contentInset: {
        bottom: Double;
        left: Double;
        right: Double;
        top: Double;
    };
    contentOffset: {
        y: Double;
        x: Double;
    };
    contentSize: {
        height: Double;
        width: Double;
    };
    layoutMeasurement: {
        height: Double;
        width: Double;
    };
    targetContentOffset?: {
        y: Double;
        x: Double;
    };
    velocity?: {
        y: Double;
        x: Double;
    };
    zoomScale?: Double;
    responderIgnoreScroll?: boolean;
}>;
export interface WindowsNativeProps extends ViewProps {
    testID?: string;
    /**
     * Boolean value that determines whether link handling is enabled.
     * When true, the webview can handle link clicks.
     * @platform windows
     */
    linkHandlingEnabled?: boolean;
    /**
     * Function that is invoked when the `WebView` should open a new window.
     * This happens when the JS calls `window.open('http://someurl', '_blank')`
     * or when the user clicks on a `<a href="http://someurl" target="_blank">` link.
     * @platform windows
     */
    onOpenWindow?: DirectEventHandler<WebViewOpenWindowEvent>;
    /**
     * Function that is invoked when the `WebView` responds to a request to load a new resource.
     * @platform windows
     */
    onSourceChanged?: DirectEventHandler<WebViewNavigationEvent>;
    cacheEnabled?: WithDefault<boolean, true>;
    incognito?: boolean;
    injectedJavaScript?: string;
    injectedJavaScriptBeforeContentLoaded?: string;
    injectedJavaScriptForMainFrameOnly?: WithDefault<boolean, true>;
    injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: WithDefault<boolean, true>;
    javaScriptCanOpenWindowsAutomatically?: boolean;
    javaScriptEnabled?: WithDefault<boolean, true>;
    mediaPlaybackRequiresUserAction?: WithDefault<boolean, true>;
    webviewDebuggingEnabled?: boolean;
    messagingEnabled: boolean;
    onLoadingError: DirectEventHandler<WebViewErrorEvent>;
    onLoadingFinish: DirectEventHandler<WebViewNavigationEvent>;
    onLoadingProgress: DirectEventHandler<WebViewNativeProgressEvent>;
    onLoadingStart: DirectEventHandler<WebViewNavigationEvent>;
    onHttpError: DirectEventHandler<WebViewHttpErrorEvent>;
    onMessage: DirectEventHandler<WebViewMessageEvent>;
    onScroll?: DirectEventHandler<ScrollEvent>;
    onShouldStartLoadWithRequest: DirectEventHandler<ShouldStartLoadRequestEvent>;
    showsHorizontalScrollIndicator?: WithDefault<boolean, true>;
    showsVerticalScrollIndicator?: WithDefault<boolean, true>;
    newSource: Readonly<{
        uri?: string;
        method?: string;
        body?: string;
        headers?: ReadonlyArray<Readonly<{
            name: string;
            value: string;
        }>>;
        html?: string;
        baseUrl?: string;
    }>;
    basicAuthCredential?: Readonly<{
        username: string;
        password: string;
    }>;
    userAgent?: string;
    applicationNameForUserAgent?: string;
}
export interface WindowsNativeCommands {
    goBack: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
    goForward: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
    reload: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
    stopLoading: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
    injectJavaScript: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>, javascript: string) => void;
    requestFocus: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>) => void;
    postMessage: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>, data: string) => void;
    loadUrl: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>, url: string) => void;
    clearCache: (viewRef: React.ElementRef<HostComponent<WindowsNativeProps>>, includeDiskFiles: boolean) => void;
}
export declare const WindowsCommands: WindowsNativeCommands;
export declare const RCTWebView2: HostComponent<WindowsNativeProps>;
export default RCTWebView2;
