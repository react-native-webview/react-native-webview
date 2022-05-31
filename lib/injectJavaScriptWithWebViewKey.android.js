import { NativeModules } from 'react-native';
export default function injectJavaScriptWithWebViewKey(webViewKey, script) {
    NativeModules.RNCWebView.injectJavaScript(webViewKey, script);
}
