import WebViewIOS from './lib/WebView.ios';
import WebViewAndroid from './lib/WebView.android';

declare const WebView: WebViewIOS | WebViewAndroid;

export { WebView };
export default WebView;
