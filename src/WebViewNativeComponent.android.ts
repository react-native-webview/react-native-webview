import { requireNativeComponent } from "react-native";
import type { NativeWebViewAndroid } from "./WebViewTypes";

const RNCWebView: typeof NativeWebViewAndroid = requireNativeComponent(
  'RNCWebView',
);

export default RNCWebView;
