/// <reference types="react" />
declare module "src/WebViewShared" {
    const WebViewShared: {
        defaultOriginWhitelist: string[];
        extractOrigin: (url: string) => string;
        originWhitelistToRegex: (originWhitelist: string) => string;
    };
    export default WebViewShared;
}
declare module "src/types/WebViewTypes" {
    import { ComponentType, ReactElement, ReactNode } from 'react';
    import { Insets, NativeSyntheticEvent, StyleProp, ViewProps, ViewStyle } from 'react-native';
    module 'react-native' {
        interface UIManagerStatic {
            dispatchViewManagerCommand(node: any, callback: any, x: any): void;
            RNCUIWebView: any;
            RNCWKWebView: any;
            RNCWebView: any;
        }
    }
    export interface WebViewNativeEvent {
        readonly url: string;
        readonly loading: boolean;
        readonly title: string;
        readonly canGoBack: boolean;
        readonly canGoForward: boolean;
    }
    export interface WebViewIOSLoadRequestEvent extends WebViewNativeEvent {
        target: number;
        lockIdentifier: number;
        navigationType: 'click' | 'formsubmit' | 'backforward' | 'reload' | 'formresubmit' | 'other';
    }
    export interface WebViewProgressEvent extends WebViewNativeEvent {
        readonly progress: number;
    }
    export interface WebViewNavigation extends WebViewNativeEvent {
        readonly navigationType: 'click' | 'formsubmit' | 'backforward' | 'reload' | 'formresubmit' | 'other';
    }
    export interface WebViewMessage extends WebViewNativeEvent {
        readonly data: string;
    }
    export interface WebViewError extends WebViewNativeEvent {
        readonly domain?: string;
        readonly code: number;
        readonly description: string;
    }
    export type WebViewEvent = NativeSyntheticEvent<WebViewNativeEvent>;
    export type WebViewNavigationEvent = NativeSyntheticEvent<WebViewNavigation>;
    export type WebViewMessageEvent = NativeSyntheticEvent<WebViewMessage>;
    export type WebViewErrorEvent = NativeSyntheticEvent<WebViewError>;
    export type DataDetectorTypes = 'phoneNumber' | 'link' | 'address' | 'calendarEvent' | 'trackingNumber' | 'flightNumber' | 'lookupSuggestion' | 'none' | 'all';
    export type OverScrollModeType = 'always' | 'content' | 'never';
    export interface WebViewSourceUri {
        /**
         * The URI to load in the `WebView`. Can be a local or remote file.
         */
        uri?: string;
        /**
         * The HTTP Method to use. Defaults to GET if not specified.
         * NOTE: On Android, only GET and POST are supported.
         */
        method?: string;
        /**
         * Additional HTTP headers to send with the request.
         * NOTE: On Android, this can only be used with GET requests.
         */
        headers?: {
            [key: string]: string;
        };
        /**
         * The HTTP body to send with the request. This must be a valid
         * UTF-8 string, and will be sent exactly as specified, with no
         * additional encoding (e.g. URL-escaping or base64) applied.
         * NOTE: On Android, this can only be used with POST requests.
         */
        body?: string;
    }
    export interface WebViewSourceHtml {
        /**
         * A static HTML page to display in the WebView.
         */
        html?: string;
        /**
         * The base URL to be used for any relative links in the HTML.
         */
        baseUrl?: string;
    }
    export type WebViewSource = WebViewSourceUri | WebViewSourceHtml;
    export interface WebViewNativeConfig {
        component?: ComponentType<WebViewSharedProps>;
        props?: any;
        viewManager?: any;
    }
    export interface IOSWebViewProps {
        /**
         * If true, use WKWebView instead of UIWebView.
         * @platform ios
         */
        useWebKit?: boolean;
        /**
         * Boolean value that determines whether the web view bounces
         * when it reaches the edge of the content. The default value is `true`.
         * @platform ios
         */
        bounces?: boolean;
        /**
         * A floating-point number that determines how quickly the scroll view
         * decelerates after the user lifts their finger. You may also use the
         * string shortcuts `"normal"` and `"fast"` which match the underlying iOS
         * settings for `UIScrollViewDecelerationRateNormal` and
         * `UIScrollViewDecelerationRateFast` respectively:
         *
         *   - normal: 0.998
         *   - fast: 0.99 (the default for iOS web view)
         * @platform ios
         */
        decelerationRate?: 'fast' | 'normal' | number;
        /**
         * Boolean value that determines whether scrolling is enabled in the
         * `WebView`. The default value is `true`.
         * @platform ios
         */
        scrollEnabled?: boolean;
        /**
         * If the value of this property is true, the scroll view stops on multiples
         * of the scroll view’s bounds when the user scrolls.
         * The default value is false.
         * @platform ios
         */
        pagingEnabled?: boolean;
        /**
         * The amount by which the web view content is inset from the edges of
         * the scroll view. Defaults to {top: 0, left: 0, bottom: 0, right: 0}.
         * @platform ios
         */
        contentInset?: Insets;
        /**
         * Determines the types of data converted to clickable URLs in the web view's content.
         * By default only phone numbers are detected.
         *
         * You can provide one type or an array of many types.
         *
         * Possible values for `dataDetectorTypes` are:
         *
         * - `'phoneNumber'`
         * - `'link'`
         * - `'address'`
         * - `'calendarEvent'`
         * - `'none'`
         * - `'all'`
         *
         * With the new WebKit implementation, we have three new values:
         * - `'trackingNumber'`,
         * - `'flightNumber'`,
         * - `'lookupSuggestion'`,
         *
         * @platform ios
         */
        dataDetectorTypes?: DataDetectorTypes | DataDetectorTypes[];
        /**
         * Function that allows custom handling of any web view requests. Return
         * `true` from the function to continue loading the request and `false`
         * to stop loading.
         * @platform ios
         */
        onShouldStartLoadWithRequest?: (event: WebViewIOSLoadRequestEvent) => any;
        /**
         * Boolean that determines whether HTML5 videos play inline or use the
         * native full-screen controller. The default value is `false`.
         *
         * **NOTE** : In order for video to play inline, not only does this
         * property need to be set to `true`, but the video element in the HTML
         * document must also include the `webkit-playsinline` attribute.
         * @platform ios
         */
        allowsInlineMediaPlayback?: boolean;
        /**
         * Hide the accessory view when the keyboard is open. Default is false to be
         * backward compatible.
         */
        hideKeyboardAccessoryView?: boolean;
        /**
         * If true, this will be able horizontal swipe gestures when using the WKWebView. The default value is `false`.
         */
        allowsBackForwardNavigationGestures?: boolean;
        /**
         * A Boolean value that determines whether pressing on a link
         * displays a preview of the destination for the link.
         *
         * This property is available on devices that support 3D Touch.
         * In iOS 10 and later, the default value is `true`; before that, the default value is `false`.
         * @platform ios
         */
        allowsLinkPreview?: boolean;
    }
    export interface AndroidWebViewProps {
        onNavigationStateChange?: (event: WebViewNavigation) => any;
        onContentSizeChange?: (event: WebViewEvent) => any;
        /**
         * https://developer.android.com/reference/android/view/View#OVER_SCROLL_NEVER
         * Sets the overScrollMode. Possible values are:
         *
         * - `'always'` (default)
         * - `'content'`
         * - `'never'`
         *
         * @platform android
         */
        overScrollMode?: OverScrollModeType;
        /**
         * Sets whether Geolocation is enabled. The default is false.
         * @platform android
         */
        geolocationEnabled?: boolean;
        /**
         * Boolean that sets whether JavaScript running in the context of a file
         * scheme URL should be allowed to access content from any origin.
         * Including accessing content from other file scheme URLs
         * @platform android
         */
        allowUniversalAccessFromFileURLs?: boolean;
        /**
         * Sets whether the webview allow access to file system.
         * @platform android
         */
        allowFileAccess?: boolean;
        /**
         * Used on Android only, controls whether form autocomplete data should be saved
         * @platform android
         */
        saveFormDataDisabled?: boolean;
        urlPrefixesForDefaultIntent?: string[];
        /**
         * Boolean value to enable JavaScript in the `WebView`. Used on Android only
         * as JavaScript is enabled by default on iOS. The default value is `true`.
         * @platform android
         */
        javaScriptEnabled?: boolean;
        /**
         * Boolean value to enable third party cookies in the `WebView`. Used on
         * Android Lollipop and above only as third party cookies are enabled by
         * default on Android Kitkat and below and on iOS. The default value is `true`.
         * @platform android
         */
        thirdPartyCookiesEnabled?: boolean;
        /**
         * Boolean value to control whether DOM Storage is enabled. Used only in
         * Android.
         * @platform android
         */
        domStorageEnabled?: boolean;
        /**
         * Sets the user-agent for the `WebView`.
         * @platform android
         */
        userAgent?: string;
        /**
         * Specifies the mixed content mode. i.e WebView will allow a secure origin to load content from any other origin.
         *
         * Possible values for `mixedContentMode` are:
         *
         * - `'never'` (default) - WebView will not allow a secure origin to load content from an insecure origin.
         * - `'always'` - WebView will allow a secure origin to load content from any other origin, even if that origin is insecure.
         * - `'compatibility'` -  WebView will attempt to be compatible with the approach of a modern web browser with regard to mixed content.
         * @platform android
         */
        mixedContentMode?: 'never' | 'always' | 'compatibility';
    }
    export interface WebViewSharedProps extends ViewProps, IOSWebViewProps, AndroidWebViewProps {
        /**
         * @Deprecated. Use `source` instead.
         */
        url?: string;
        /**
         * @Deprecated. Use `source` instead.
         */
        html?: string;
        /**
         * Loads static html or a uri (with optional headers) in the WebView.
         */
        source?: WebViewSource;
        /**
         * Function that returns a view to show if there's an error.
         */
        renderError?: (errorDomain: string | undefined, errorCode: number, errorDesc: string) => ReactElement<any>;
        /**
         * Function that returns a loading indicator.
         */
        renderLoading?: () => ReactElement<any>;
        /**
         * Function that is invoked when the `WebView` has finished loading.
         */
        onLoad?: (event: WebViewNavigationEvent) => any;
        /**
         * Function that is invoked when the `WebView` load succeeds or fails.
         */
        onLoadEnd?: (event: WebViewNavigationEvent | WebViewErrorEvent) => any;
        /**
         * Function that is invoked when the `WebView` starts loading.
         */
        onLoadStart?: (event: WebViewNavigationEvent) => any;
        /**
         * Function that is invoked when the `WebView` load fails.
         */
        onError?: (event: WebViewErrorEvent) => any;
        /**
         * Controls whether to adjust the content inset for web views that are
         * placed behind a navigation bar, tab bar, or toolbar. The default value
         * is `true`.
         */
        automaticallyAdjustContentInsets?: boolean;
        /**
         * Function that is invoked when the `WebView` loading starts or ends.
         */
        onNavigationStateChange?: (event: WebViewNavigation) => any;
        /**
         * A function that is invoked when the webview calls `window.postMessage`.
         * Setting this property will inject a `postMessage` global into your
         * webview, but will still call pre-existing values of `postMessage`.
         *
         * `window.postMessage` accepts one argument, `data`, which will be
         * available on the event object, `event.nativeEvent.data`. `data`
         * must be a string.
         */
        onMessage?: (event: WebViewMessageEvent) => any;
        /**
         * Function that is invoked when the `WebView` is loading.
         */
        onLoadProgress?: (event: NativeSyntheticEvent<WebViewProgressEvent>) => any;
        /**
         * Boolean value that forces the `WebView` to show the loading view
         * on the first load.
         */
        startInLoadingState?: boolean;
        /**
         * Set this to provide JavaScript that will be injected into the web page
         * when the view loads.
         */
        injectedJavaScript?: string;
        /**
         * Boolean that controls whether the web content is scaled to fit
         * the view and enables the user to change the scale. The default value
         * is `true`.
         *
         * On iOS, when `useWebKit=true`, this prop will not work.
         */
        scalesPageToFit?: boolean;
        /**
         * Boolean that determines whether HTML5 audio and video requires the user
         * to tap them before they start playing. The default value is `true`.
         */
        mediaPlaybackRequiresUserAction?: boolean;
        /**
         * List of origin strings to allow being navigated to. The strings allow
         * wildcards and get matched against *just* the origin (not the full URL).
         * If the user taps to navigate to a new page but the new page is not in
         * this whitelist, we will open the URL in Safari.
         * The default whitelisted origins are "http://*" and "https://*".
         */
        originWhitelist?: string[];
        /**
         * Override the native component used to render the WebView. Enables a custom native
         * WebView which uses the same JavaScript as the original WebView.
         */
        nativeConfig?: WebViewNativeConfig;
        style?: StyleProp<ViewStyle>;
        children?: ReactNode;
    }
}
declare module "src/WebView.android" {
    import React from 'react';
    import { NativeSyntheticEvent } from 'react-native';
    import { WebViewError, WebViewSharedProps, WebViewProgressEvent } from "src/types/WebViewTypes";
    enum WebViewState {
        IDLE = "IDLE",
        LOADING = "LOADING",
        ERROR = "ERROR"
    }
    type State = {
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
        updateNavigationState: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewNavigation>) => void;
        getWebViewHandle: () => number | null;
        onLoadingStart: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewNavigation>) => void;
        onLoadingError: (event: NativeSyntheticEvent<WebViewError>) => void;
        onLoadingFinish: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewNavigation>) => void;
        onMessage: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewMessage>) => void;
        onLoadingProgress: (event: NativeSyntheticEvent<WebViewProgressEvent>) => void;
        render(): React.ReactNode;
    }
}
declare module "src/WebView.ios" {
    import React from 'react';
    import { NativeSyntheticEvent } from 'react-native';
    import { WebViewError, WebViewSharedProps, WebViewProgressEvent } from "src/types/WebViewTypes";
    enum WebViewState {
        IDLE = "IDLE",
        LOADING = "LOADING",
        ERROR = "ERROR"
    }
    enum NavigationType {
        click = "click",
        formsubmit = "formsubmit",
        backforward = "backforward",
        reload = "reload",
        formresubmit = "formresubmit",
        other = "other"
    }
    type State = {
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
        _updateNavigationState: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewNavigation>) => void;
        /**
         * Returns the native `WebView` node.
         */
        getWebViewHandle: () => number | null;
        _onLoadingStart: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewNavigation>) => void;
        _onLoadingError: (event: NativeSyntheticEvent<WebViewError>) => void;
        _onLoadingFinish: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewNavigation>) => void;
        _onMessage: (event: NativeSyntheticEvent<import("src/types/WebViewTypes").WebViewMessage>) => void;
        _onLoadingProgress: (event: NativeSyntheticEvent<WebViewProgressEvent>) => void;
        componentDidUpdate(prevProps: WebViewSharedProps): void;
        _showRedboxOnPropChanges(prevProps: WebViewSharedProps, propName: 'allowsInlineMediaPlayback' | 'mediaPlaybackRequiresUserAction' | 'dataDetectorTypes'): void;
        render(): React.ReactNode;
    }
}
declare module "index" {
    import WebViewIOS from "src/WebView.ios";
    import WebViewAndroid from "src/WebView.android";
    const WebView: typeof WebViewAndroid | typeof WebViewIOS;
    export { WebView };
    export default WebView;
}
