import { NativeModules, Platform, NativeEventEmitter } from "react-native";
var scriptMessageEmitter = new NativeEventEmitter(Platform.select({
    ios: NativeModules.ScriptMessageEventEmitter,
    android: null
}));
export default function addOnMessageListenerWithWebViewKey(webViewKey, listener) {
    return scriptMessageEmitter.addListener('ReactNativeWebViewOnMessageWithWebViewKey', function (eventData) {
        if (eventData.webViewKey === webViewKey) {
            listener(eventData);
        }
    });
}
