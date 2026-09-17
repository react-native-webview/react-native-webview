import { Component } from 'react';
import { IOSWebViewProps, AndroidWebViewProps, WindowsWebViewProps } from './lib/WebViewTypes';

export { FileDownload, WebViewMessageEvent, WebViewNavigation } from './lib/WebViewTypes';

export type WebViewProps = IOSWebViewProps & AndroidWebViewProps & WindowsWebViewProps;

/**
 * Android WebView feature name for runtime checks.
 *
 * Includes known literals for editor completion while still allowing
 * forward-compatible string values supported by newer AndroidX WebKit versions.
 *
 * @see https://developer.android.com/reference/androidx/webkit/WebViewFeature#isFeatureSupported(java.lang.String)
 */
// oxlint-disable-next-line @typescript-eslint/no-empty-object-type
export type WebViewFeature = 'WEB_AUTHENTICATION' | (string & {});

// `{}` is the identity for intersections: `WebViewProps & undefined` would
// collapse the props to `never` (https://github.com/react-native-webview/react-native-webview/issues/3977).
// oxlint-disable-next-line @typescript-eslint/no-empty-object-type
declare class WebView<P = {}> extends Component<WebViewProps & P> {
  /**
   * Returns whether file upload is supported by the current platform WebView implementation.
   */
  static isFileUploadSupported: () => Promise<boolean>;

  /**
   * Returns whether a specific Android WebView feature is supported at runtime.
   */
  static isWebViewFeatureSupported: (feature: WebViewFeature) => Promise<boolean>;

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
   * Executes the JavaScript string.
   */
  injectJavaScript: (script: string) => void;

  /**
   * Focuses on WebView rendered page.
   */
  requestFocus: () => void;

  /**
   * Posts a message to WebView.
   */
  postMessage: (message: string) => void;

  /**
   * (Android only)
   * Removes the autocomplete popup from the currently focused form field, if present.
   */
  clearFormData?: () => void;

  /**
   * Clears the resource cache. Note that the cache is per-application, so this will clear the cache for all WebViews used.
   */
  clearCache: (includeDiskFiles: boolean) => void;

  /**
   * (Android only)
   * Tells this WebView to clear its internal back/forward list.
   */
  clearHistory?: () => void;
}

export { WebView };
export default WebView;
