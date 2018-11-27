import { Platform } from 'react-native';
import WebViewIOS from './src/WebView.ios';
import WebViewAndroid from './src/WebView.android';

const WebView = Platform.OS === 'android' ? WebViewAndroid : WebViewIOS;

// We keep this for compatibility reasons.
export { WebView };

export default WebView;
