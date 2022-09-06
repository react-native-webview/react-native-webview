import { NativeModules } from 'react-native';
export default function injectJavaScriptWithWebViewKey(webViewKey, script) {
    NativeModules.RNCWebView.injectJavaScriptWithWebViewKey(webViewKey, script);
}
