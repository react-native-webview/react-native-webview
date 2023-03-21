import { requireNativeComponent } from 'react-native';
import type { NativeWebViewIOS } from './WebViewTypes';

const RNCWebView: typeof NativeWebViewIOS
  = requireNativeComponent('HourglassWebView');

export default RNCWebView;
