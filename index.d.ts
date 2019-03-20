import { ComponentType } from 'react';
// eslint-disable-next-line
import { IOSWebViewProps, AndroidWebViewProps } from './lib/WebViewTypes';

declare const WebView: ComponentType<IOSWebViewProps & AndroidWebViewProps>;

export { WebView };
export default WebView;
