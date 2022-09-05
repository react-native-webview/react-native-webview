import { NativeModules } from 'react-native';

const releaseWebView = function releaseWebView(webViewKey: string) {
    NativeModules.RNCWebView.releasePreservedWebViewInstance(webViewKey);
}

const clearWebViews = function clearWebViews() {
    NativeModules.RNCWebView.clearPreservedWebViewInstances();
}

export { releaseWebView, clearWebViews };
