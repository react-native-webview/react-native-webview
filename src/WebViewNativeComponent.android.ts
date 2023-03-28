import { requireNativeComponent } from "react-native";
import type { NativeWebViewAndroid } from "./WebViewTypes";

const RNCWebViewContainer: typeof NativeWebViewAndroid = requireNativeComponent(
  'RNCWebViewContainer',
);

export default RNCWebViewContainer;
