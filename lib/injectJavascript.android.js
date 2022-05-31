import { NativeModules } from 'react-native';
export default function injectJavaScript(webViewKey) {
    NativeModules.RNCWebView.injectJavaScript(webViewKey);
}
