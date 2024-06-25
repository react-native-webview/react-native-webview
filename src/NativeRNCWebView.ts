import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { WebResourceResponse } from './WebViewTypes';

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  // your module methods go here, for example:
  isFileUploadSupported(): Promise<boolean>;
  shouldStartLoadWithLockIdentifier(
    shouldStart: boolean,
    lockIdentifier: Double
  ): void;
  shouldInterceptRequestLockIdentifier(
    lockIdentifier: Double,
    response?: WebResourceResponse
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNCWebView');
