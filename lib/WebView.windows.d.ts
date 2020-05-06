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
import { NativeWebViewWindows, WebViewSharedProps, State } from './WebViewTypes';
export default class WebView extends React.Component<WebViewSharedProps, State> {
    static defaultProps: {
        javaScriptEnabled: boolean;
    };
    state: State;
    webViewRef: React.RefObject<NativeWebViewWindows>;
    goForward: () => void;
    goBack: () => void;
    reload: () => void;
    injectJavaScript: (data: string) => void;
    /**
     * We return an event with a bunch of fields including:
     *  url, title, loading, canGoBack, canGoForward
     */
    updateNavigationState: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNavigation>) => void;
    getWebViewHandle: () => number | null;
    onLoadingStart: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNavigation>) => void;
    onLoadingProgress: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNativeProgressEvent>) => void;
    onLoadingError: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewError>) => void;
    onLoadingFinish: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNavigation>) => void;
    onMessage: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewMessage>) => void;
    onHttpError: (event: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewHttpError>) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=WebView.windows.d.ts.map