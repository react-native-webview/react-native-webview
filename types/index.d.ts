import WebViewIOS from './src/WebView.ios';
import WebViewAndroid from './src/WebView.android';
declare const WebView: typeof WebViewAndroid | typeof WebViewIOS;
export { WebView };
export default WebView;
