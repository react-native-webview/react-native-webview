import NativeHeadlessWebViewModule, {
  type ScriptDefinition,
} from './NativeHeadlessWebViewModule';

export type WebViewId = number;
export type InjectionTime = 'documentStart' | 'documentEnd';
export type { ScriptDefinition };

/**
 * HeadlessWebView allows you to create WebView instances
 * before they are rendered in your React component tree.
 *
 * This is useful for pre-loading content or managing WebView
 * lifecycle independently from React components.
 */
export const HeadlessWebView = {
  /**
   * Creates a new WebView instance and returns its unique ID.
   * The WebView is created immediately but not displayed until
   * you render a HeadlessWebViewComponent with this ID.
   *
   * @returns The unique ID of the created WebView
   */
  create(): WebViewId {
    return NativeHeadlessWebViewModule.create();
  },

  /**
   * Loads a URL in the WebView with the given ID.
   *
   * @param webviewId - The ID returned by create()
   * @param url - The URL to load
   */
  loadUrl(webviewId: WebViewId, url: string): void {
    NativeHeadlessWebViewModule.loadUrl(webviewId, url);
  },

  /**
   * Destroys the WebView with the given ID and releases its resources.
   * Call this when you no longer need the WebView.
   *
   * @param webviewId - The ID returned by create()
   */
  destroy(webviewId: WebViewId): void {
    NativeHeadlessWebViewModule.destroy(webviewId);
  },

  /**
   * Sets user scripts to inject into the WebView using WKUserContentController.
   * Scripts are injected at the specified injection time and can be limited
   * to the main frame only or applied to all frames.
   *
   * @param webviewId - The ID returned by create()
   * @param scripts - Array of script definitions to inject
   */
  setScripts(webviewId: WebViewId, scripts: ScriptDefinition[]): void {
    NativeHeadlessWebViewModule.setScripts(webviewId, scripts);
  },
};

export default HeadlessWebView;

