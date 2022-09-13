import { NativeModules, Platform, EmitterSubscription, NativeEventEmitter } from "react-native";

const scriptMessageEmitter = new NativeEventEmitter(
  Platform.select({
    ios: NativeModules.ScriptMessageEventEmitter,
    default: null
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function addOnMessageListenerWithWebViewKey(webViewKey: string, listener: (event: any) => void): EmitterSubscription {
  return scriptMessageEmitter.addListener('ReactNativeWebViewOnMessageWithWebViewKey', (eventData) => {
    if (eventData.webViewKey === webViewKey) {
      listener(eventData);
    }
  })
}
