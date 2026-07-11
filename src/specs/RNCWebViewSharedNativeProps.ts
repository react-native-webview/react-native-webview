import type { NativeProps as AndroidNativeProps } from './RNCWebViewAndroidNativeComponent';
import type { NativeProps as AppleNativeProps } from './RNCWebViewAppleNativeComponent';

type SharedNativePropName = keyof AndroidNativeProps & keyof AppleNativeProps;

export type SharedNativeProps = Pick<AndroidNativeProps, SharedNativePropName>;

type AppleSharedNativeProps = Pick<AppleNativeProps, SharedNativePropName>;

type Equal<Left, Right> = [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false;

type Assert<Condition extends true> = Condition;

// Fails type-checking if overlapping platform props differ in type or optionality.
export type SharedNativePropsContract = Assert<Equal<AppleSharedNativeProps, SharedNativeProps>>;
