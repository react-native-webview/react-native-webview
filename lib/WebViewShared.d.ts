import { OnShouldStartLoadWithRequest } from './WebViewTypes';
declare const defaultOriginWhitelist: string[];
declare const createOnShouldStartLoadWithRequest: (loadRequest: (shouldStart: boolean, url: string, lockIdentifier: number) => void, originWhitelist: readonly string[], onShouldStartLoadWithRequest?: OnShouldStartLoadWithRequest | undefined) => ({ nativeEvent }: import("react-native").NativeSyntheticEvent<import("./WebViewTypes").WebViewNavigation>) => void;
declare const defaultRenderLoading: () => JSX.Element;
declare const defaultRenderError: (errorDomain: string | undefined, errorCode: number, errorDesc: string) => JSX.Element;
export { defaultOriginWhitelist, createOnShouldStartLoadWithRequest, defaultRenderLoading, defaultRenderError, };
//# sourceMappingURL=WebViewShared.d.ts.map