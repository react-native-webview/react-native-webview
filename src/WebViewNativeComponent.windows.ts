import { requireNativeComponent } from "react-native";
import type { NativeWebViewWindows } from "./WebViewTypes";

const RCTWebView: typeof NativeWebViewWindows = requireNativeComponent(
  'RCTWebView',
);

export default RCTWebView;
