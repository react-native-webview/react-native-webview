/* eslint-disable import/no-duplicates */
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  // your module methods go here, for example:
  isFileUploadSupported(): Promise<boolean>;
  shouldStartLoadWithLockIdentifier(shouldStart: boolean, lockIdentifier: Int32): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNCWebView');