import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  /**
   * Callback for onShouldStartLoadWithRequest.
   * Called to determine whether loading should continue.
   * @param shouldStart - Whether to allow the load request
   * @param lockIdentifier - Unique identifier for the request
   */
  onShouldStartLoadWithRequestCallback(
    shouldStart: boolean,
    lockIdentifier: number
  ): void;
}

// RCTWebView2 module for Chromium-based Edge WebView2
export const RCTWebView2Module = TurboModuleRegistry.get<Spec>('RCTWebView2');

export default RCTWebView2Module;
