import { Component } from 'react';
// eslint-disable-next-line
import { IOSWebViewProps, AndroidWebViewProps } from './lib/WebViewTypes';

export type WebViewProps = IOSWebViewProps & AndroidWebViewProps;

declare class WebView extends Component<WebViewProps> {
    /**
     * Go back one page in the webview's history.
     */
    goBack: () => void;

    /**
     * Go forward one page in the webview's history.
     */
    goForward: () => void;

    /**
     * Reloads the current page.
     */
    reload: () => void;

    /**
     * Stop loading the current page.
     */
    stopLoading(): void;

    /**
     * Extra Native Component Config.
     */
    extraNativeComponentConfig: () => any;

    /**
     * Executes the JavaScript string.
     */
    injectJavaScript: (script: string) => void;
}

export {WebView};
export default WebView;
