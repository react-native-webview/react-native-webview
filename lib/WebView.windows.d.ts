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
import React from 'react';
import { NativeWebViewWindows, WindowsWebViewProps, WebViewProgressEvent, WebViewNavigationEvent, WebViewErrorEvent, WebViewHttpErrorEvent, WebViewMessageEvent, State } from './WebViewTypes';
export default class WebView extends React.Component<WindowsWebViewProps, State> {
    static defaultProps: {
        javaScriptEnabled: boolean;
    };
    state: State;
    webViewRef: React.RefObject<NativeWebViewWindows>;
    RnwVersionSupportsWebView2: boolean;
    RCTWebViewString: string;
    goForward: () => void;
    goBack: () => void;
    reload: () => void;
    injectJavaScript: (data: string) => void;
    postMessage: (data: string) => void;
    getInjectableJSMessage: (message: string) => string;
    /**
     * We return an event with a bunch of fields including:
     *  url, title, loading, canGoBack, canGoForward
     */
    updateNavigationState: (event: WebViewNavigationEvent) => void;
    getWebViewHandle: () => number | null;
    onLoadingStart: (event: WebViewNavigationEvent) => void;
    onLoadingProgress: (event: WebViewProgressEvent) => void;
    onLoadingError: (event: WebViewErrorEvent) => void;
    onLoadingFinish: (event: WebViewNavigationEvent) => void;
    onMessage: (event: WebViewMessageEvent) => void;
    onHttpError: (event: WebViewHttpErrorEvent) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=WebView.windows.d.ts.map