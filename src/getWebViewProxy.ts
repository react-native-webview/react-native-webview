import { IWebViewProxy } from './WebViewProxyTypes';
import WebViewProxy from './WebViewProxy';

export default function getWebViewProxy(webViewKey: string): IWebViewProxy {
  return new WebViewProxy(webViewKey);
}
