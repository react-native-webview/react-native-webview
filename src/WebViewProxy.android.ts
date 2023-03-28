import { NativeModules, EmitterSubscription, NativeEventEmitter } from "react-native";
import { IWebViewProxy } from './WebViewProxyTypes';

const scriptMessageEmitter = new NativeEventEmitter(undefined);

export default class WebViewProxy implements IWebViewProxy {
  webViewKey: string;

  constructor(webViewKey: string) {
    this.webViewKey = webViewKey;
  }

  injectJavaScript(script: string): Promise<void> {
    return NativeModules.RNCWebView.injectJavaScriptWithWebViewKey(this.webViewKey, script);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addOnMessageListener(listener: (event: any) => void): EmitterSubscription {
    return scriptMessageEmitter.addListener('ReactNativeWebViewOnMessageWithWebViewKey', (eventData) => {
      if (eventData.webViewKey === this.webViewKey) {
        listener(eventData);
      }
    })
  }

  releaseWebView() {
    NativeModules.RNCWebView.releaseWebView(this.webViewKey);
  }
}
