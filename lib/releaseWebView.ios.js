import { NativeModules } from 'react-native';
export default function releaseWebView(webViewKey) {
    NativeModules.RNCWebViewManager.releaseWebView(webViewKey);
}
