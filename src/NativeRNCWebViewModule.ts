// ReactWebViewNativeSpec.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  // Already existing APIs
  isFileUploadSupported(): Promise<boolean>;
  shouldStartLoadWithLockIdentifier(
    shouldStart: boolean,
    lockIdentifier: Double
  ): void;

  // Added from ReactWebView.h
  messagingEnabled(enabled: boolean): void;
  isMessagingEnabled(): boolean;

  setInjectedJavascript(payload: string): void;
  requestFocus(): void;
  postMessage(message: string): void;

  onDOMContentLoaded(): void;
  onNavigationStarting(): void;
  onNavigationCompleted(): void;
  onNavigationFailed(): void;
  onMessagePosted(message: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNCWebViewModule');
