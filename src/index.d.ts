import WebViewIOS from './WebView.ios';
import WebViewAndroid from './WebView.android';

declare const WebView: typeof WebViewAndroid | typeof WebViewIOS;
export { WebView };
export default WebView;
