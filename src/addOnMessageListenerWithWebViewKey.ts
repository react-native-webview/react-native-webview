import { NativeModules, Platform, EmitterSubscription, NativeEventEmitter } from "react-native";

const scriptMessageEmitter = new NativeEventEmitter(
  Platform.select({
    ios: NativeModules.ScriptMessageEventEmitter,
    default: null
  })
);

export default function addOnMessageListenerWithWebViewKey(webViewKey: string, listener: (event: any) => void): EmitterSubscription {
  return scriptMessageEmitter.addListener('ReactNativeWebViewOnMessageWithWebViewKey', (eventData) => {
    if (eventData.webViewKey === webViewKey) {
      listener(eventData);
    }
  })
}
