import { NativeModules } from 'react-native';

export default function releaseWebView(webViewKey: string) {
  NativeModules.RNCWebViewManager.releaseWebView(webViewKey);
}
