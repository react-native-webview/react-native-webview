import { NativeModules } from 'react-native';
export default function injectJavaScriptWithWebViewKey(webViewKey, script) {
    return NativeModules.RNCWebView.injectJavaScriptWithWebViewKey(webViewKey, script);
}
