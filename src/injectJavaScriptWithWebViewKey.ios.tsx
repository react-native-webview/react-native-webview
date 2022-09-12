import { NativeModules } from 'react-native';

export default function injectJavaScriptWithWebViewKey(webViewKey: string, script: string): Promise<void> {
  return NativeModules.RNCWebViewManager.injectJavaScriptWithWebViewKey(webViewKey, script);
}
