import { Component } from 'react';
// eslint-disable-next-line
import { IOSWebViewProps, AndroidWebViewProps } from './lib/WebViewTypes';

declare class WebView extends Component<IOSWebViewProps & AndroidWebViewProps> {
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

    /**
     * Posts a message to the web view, which will emit a `message` event.
     */
    postMessage(data: string): void;
}

export { WebView };
export default WebView;
