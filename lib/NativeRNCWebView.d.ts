import type { TurboModule } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
export interface Spec extends TurboModule {
    readonly getConstants: () => {};
    isFileUploadSupported(): Promise<boolean>;
    shouldStartLoadWithLockIdentifier(shouldStart: boolean, lockIdentifier: Int32): void;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeRNCWebView.d.ts.map