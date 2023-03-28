import { EmitterSubscription } from "react-native";

export interface IWebViewProxy {
  injectJavaScript(script: string): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addOnMessageListener(listener: (event: any) => void): EmitterSubscription;

  releaseWebView(): void;
}
