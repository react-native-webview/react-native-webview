import { NativeModules } from 'react-native';

export default function injectJavaScriptWithWebViewKey(webViewKey: string, script: string) {
  NativeModules.RNCWebView.injectJavaScriptWithWebViewKey(webViewKey, script);
}
