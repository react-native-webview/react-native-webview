/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import type {Node, Element} from 'react';
import type {EdgeInsetsProp} from 'EdgeInsetsPropType';
import type {ViewStyleProp} from 'StyleSheet';
import type {ViewProps} from 'ViewPropTypes';

export type WebViewErrorEvent = {
  domain: any,
  code: any,
  description: any,
};

export type WebViewEvent = Object;

export type DataDetectorTypes =
  | 'phoneNumber'
  | 'link'
  | 'address'
  | 'calendarEvent'
  | 'trackingNumber'
  | 'flightNumber'
  | 'lookupSuggestion'
  | 'none'
  | 'all';

export type WebViewSourceUri = {|
  /**
   * The URI to load in the `WebView`. Can be a local or remote file.
   */
  uri?: ?string,

  /**
   * The HTTP Method to use. Defaults to GET if not specified.
   * NOTE: On Android, only GET and POST are supported.
   */
  method?: string,

  /**
   * Additional HTTP headers to send with the request.
   * NOTE: On Android, this can only be used with GET requests.
   */
  headers?: Object,

  /**
   * The HTTP body to send with the request. This must be a valid
   * UTF-8 string, and will be sent exactly as specified, with no
   * additional encoding (e.g. URL-escaping or base64) applied.
   * NOTE: On Android, this can only be used with POST requests.
   */
  body?: string,
|};

export type WebViewSourceHtml = {|
  /**
   * A static HTML page to display in the WebView.
   */
  html?: ?string,
  /**
   * The base URL to be used for any relative links in the HTML.
   */
  baseUrl?: ?string,
|};

export type WebViewSource = WebViewSourceUri | WebViewSourceHtml;

export type WebViewNativeConfig = $ReadOnly<{|
  /*
   * The native component used to render the WebView.
   */
  component?: ?any,
  /*
   * Set props directly on the native component WebView. Enables custom props which the
   * original WebView doesn't pass through.
   */
  props?: ?Object,
  /*
   * Set the ViewManager to use for communication with the native side.
   * @platform ios
   */
  viewManager?: ?Object,
|}>;

export type WebViewSharedProps =  $ReadOnly<{|
  ...ViewProps,
  /**
   * Deprecated. Use `source` instead.
   */
  url?: ?string,
  /**
   * Deprecated. Use `source` instead.
   */
  html?: ?string,

  /**
   * Loads static html or a uri (with optional headers) in the WebView.
   */
  source?: ?WebViewSource,

  /**
   * If true, use WKWebView instead of UIWebView.
   * @platform ios
   */
  useWebKit?: ?boolean,

  /**
   * Function that returns a view to show if there's an error.
   */
  renderError: (errorDomain: any, errorCode: any, errorDesc: any) => Element<any>, // view to show if there's an error

  /**
   * Function that returns a loading indicator.
   */
  renderLoading: () => Element<any>,

  /**
   * Function that is invoked when the `WebView` has finished loading.
   */
  onLoad: (event: WebViewEvent) => any,

  /**
   * Function that is invoked when the `WebView` load succeeds or fails.
   */
  onLoadEnd: (event: WebViewEvent) => any,

  /**
   * Function that is invoked when the `WebView` starts loading.
   */
  onLoadStart: (event: WebViewEvent) => any,

  /**
   * Function that is invoked when the `WebView` load fails.
   */
  onError: (event: WebViewEvent) => any,

  /**
   * Boolean value that determines whether the web view bounces
   * when it reaches the edge of the content. The default value is `true`.
   * @platform ios
   */
  bounces?: ?boolean,

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
  decelerationRate?: ?('fast' | 'normal' | number),

  /**
   * Boolean value that determines whether scrolling is enabled in the
   * `WebView`. The default value is `true`.
   * @platform ios
   */
  scrollEnabled?: ?boolean,

  /**
   * Controls whether to adjust the content inset for web views that are
   * placed behind a navigation bar, tab bar, or toolbar. The default value
   * is `true`.
   */
  automaticallyAdjustContentInsets?: ?boolean,

  /**
   * The amount by which the web view content is inset from the edges of
   * the scroll view. Defaults to {top: 0, left: 0, bottom: 0, right: 0}.
   * @platform ios
   */
  contentInset?: ?EdgeInsetsProp,

  /**
   * Function that is invoked when the `WebView` loading starts or ends.
   */
  onNavigationStateChange?: (event: WebViewEvent) => any,

  /**
   * A function that is invoked when the webview calls `window.postMessage`.
   * Setting this property will inject a `postMessage` global into your
   * webview, but will still call pre-existing values of `postMessage`.
   *
   * `window.postMessage` accepts one argument, `data`, which will be
   * available on the event object, `event.nativeEvent.data`. `data`
   * must be a string.
   */
  onMessage?: (event: WebViewEvent) => any,

  /**
   * Boolean value that forces the `WebView` to show the loading view
   * on the first load.
   */
  startInLoadingState?: ?boolean,

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
  dataDetectorTypes?:
    | ?DataDetectorTypes
    | $ReadOnlyArray<DataDetectorTypes>,

  /**
   * Boolean value to enable JavaScript in the `WebView`. Used on Android only
   * as JavaScript is enabled by default on iOS. The default value is `true`.
   * @platform android
   */
  javaScriptEnabled?: ?boolean,

  /**
   * Boolean value to enable third party cookies in the `WebView`. Used on
   * Android Lollipop and above only as third party cookies are enabled by
   * default on Android Kitkat and below and on iOS. The default value is `true`.
   * @platform android
   */
  thirdPartyCookiesEnabled?: ?boolean,

  /**
   * Boolean value to control whether DOM Storage is enabled. Used only in
   * Android.
   * @platform android
   */
  domStorageEnabled?: ?boolean,

  /**
   * Set this to provide JavaScript that will be injected into the web page
   * when the view loads.
   */
  injectedJavaScript?: ?string,

  /**
   * Sets the user-agent for the `WebView`.
   * @platform android
   */
  userAgent?: ?string,

  /**
   * Boolean that controls whether the web content is scaled to fit
   * the view and enables the user to change the scale. The default value
   * is `true`.
   *
   * On iOS, when `useWebKit=true`, this prop will not work.
   */
  scalesPageToFit?: ?boolean,

  /**
   * Function that allows custom handling of any web view requests. Return
   * `true` from the function to continue loading the request and `false`
   * to stop loading.
   * @platform ios
   */
  onShouldStartLoadWithRequest?: (event: WebViewEvent) => any,

  /**
   * Boolean that determines whether HTML5 videos play inline or use the
   * native full-screen controller. The default value is `false`.
   *
   * **NOTE** : In order for video to play inline, not only does this
   * property need to be set to `true`, but the video element in the HTML
   * document must also include the `webkit-playsinline` attribute.
   * @platform ios
   */
  allowsInlineMediaPlayback?: ?boolean,

  /**
   * Boolean that determines whether HTML5 audio and video requires the user
   * to tap them before they start playing. The default value is `true`.
   */
  mediaPlaybackRequiresUserAction?: ?boolean,

  /**
   * List of origin strings to allow being navigated to. The strings allow
   * wildcards and get matched against *just* the origin (not the full URL).
   * If the user taps to navigate to a new page but the new page is not in
   * this whitelist, we will open the URL in Safari.
   * The default whitelisted origins are "http://*" and "https://*".
   */
  originWhitelist?: $ReadOnlyArray<string>,

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
  mixedContentMode?: ?('never' | 'always' | 'compatibility'),

  /**
   * Override the native component used to render the WebView. Enables a custom native
   * WebView which uses the same JavaScript as the original WebView.
   */
  nativeConfig?: ?WebViewNativeConfig,

  style?: ViewStyleProp,
  children: Node,
|}>;
