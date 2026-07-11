import type { NativeProps as AndroidNativeProps } from './RNCWebViewAndroidNativeComponent';
import type { NativeProps as IOSNativeProps } from './RNCWebViewIOSNativeComponent';

type SharedNativePropName = keyof AndroidNativeProps & keyof IOSNativeProps;

export type SharedNativeProps = Pick<AndroidNativeProps, SharedNativePropName>;

type IOSSharedNativeProps = Pick<IOSNativeProps, SharedNativePropName>;

type Equal<Left, Right> = [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false;

type Assert<Condition extends true> = Condition;

// Fails type-checking if overlapping platform props differ in type or optionality.
export type SharedNativePropsContract = Assert<Equal<IOSSharedNativeProps, SharedNativeProps>>;
