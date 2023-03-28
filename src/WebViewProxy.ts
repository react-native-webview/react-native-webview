import { EmitterSubscription, NativeEventEmitter } from "react-native";
import { IWebViewProxy } from './WebViewProxyTypes';

const scriptMessageEmitter = new NativeEventEmitter(undefined);


export default class WebViewProxy implements IWebViewProxy {
  webViewKey: string;

  constructor(webViewKey: string) {
    this.webViewKey = webViewKey;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  injectJavaScript(_script: string): Promise<void> {
    // no-op
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addOnMessageListener(listener: (event: any) => void): EmitterSubscription {
    return scriptMessageEmitter.addListener('ReactNativeWebViewOnMessageWithWebViewKey', (eventData) => {
      if (eventData.webViewKey === this.webViewKey) {
        listener(eventData);
      }
    })
  }

  // eslint-disable-next-line class-methods-use-this
  releaseWebView() {
    // no-op
  }
}
