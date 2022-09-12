import { NativeModules } from 'react-native';
export default function injectJavaScriptWithWebViewKey(webViewKey, script) {
    return NativeModules.RNCWebViewManager.injectJavaScriptWithWebViewKey(webViewKey, script);
}
