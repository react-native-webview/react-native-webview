import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  /**
   * Creates a new WKWebView instance and returns its unique ID
   */
  create(): Double;

  /**
   * Loads a URL in the WebView with the given ID
   */
  loadUrl(webviewId: Double, url: string): void;

  /**
   * Destroys the WebView with the given ID
   */
  destroy(webviewId: Double): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNCHeadlessWebViewModule'
);

