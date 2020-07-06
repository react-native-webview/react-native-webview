import React from 'react';
import { View } from 'react-native';
import { IOSWebViewProps, AndroidWebViewProps } from './WebViewTypes';

export type WebViewProps = IOSWebViewProps & AndroidWebViewProps;

// This "dummy" WebView is to render something for unsupported platforms,
// like for example Expo SDK "web" platform. It matches the previous react-native
// implementation which is produced by Expo SDK 37.0.0.1 implementation, with
// similar interface than the native ones have.
const WebView: React.FunctionComponent<WebViewProps> = () => (
	<View style={{
		alignSelf: 'flex-start',
		borderColor: 'rgb(255, 0, 0)',
		borderWidth: 1
	}} />
);

export { WebView };
export default WebView;