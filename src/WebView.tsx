import React from 'react';
import { Text, View } from 'react-native';
import { IOSWebViewProps, AndroidWebViewProps, WindowsWebViewProps } from './WebViewTypes';

export type WebViewProps = IOSWebViewProps & AndroidWebViewProps & WindowsWebViewProps;

// This "dummy" WebView is to render something for unsupported platforms,
// like for example Expo SDK "web" platform.
const WebView: React.FunctionComponent<WebViewProps> = () => (
	<View style={{ alignSelf: 'flex-start' }}>
		<Text style={{ color: 'red' }}>
			React Native WebView does not support this platform.
		</Text>
	</View>
);

export { WebView };
export default WebView;
