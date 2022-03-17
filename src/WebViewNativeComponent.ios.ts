import { requireNativeComponent } from "react-native";
import type { NativeWebViewIOS } from "./WebViewTypes";

const RNCWebView: typeof NativeWebViewIOS = requireNativeComponent(
  'RNCWebView',
);

export default RNCWebView;
