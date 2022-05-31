import { NativeModules } from 'react-native';
export default function injectJavaScriptWithWebViewKey(webViewKey, script) {
    NativeModules.RNCWebViewManager.injectJavaScriptWithWebViewKey(webViewKey, script);
}
