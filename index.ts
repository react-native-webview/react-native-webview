import { Platform } from 'react-native';
import WebViewIOS from './src/WebView.ios';
import WebViewAndroid from './src/WebView.android';

// We keep this for compatibility reasons.
const WebView = Platform.OS === 'android' ? WebViewAndroid : WebViewIOS;
export { WebView };

export default WebView;
