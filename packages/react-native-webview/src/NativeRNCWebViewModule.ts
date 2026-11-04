import type { CodegenTypes, TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  shouldStartLoadWithLockIdentifier(
    shouldStart: boolean,
    lockIdentifier: CodegenTypes.Double,
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNCWebViewModule');
