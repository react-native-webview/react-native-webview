import React from 'react';
import { Text, View } from 'react-native';
// This "dummy" WebView is to render something for unsupported platforms,
// like for example Expo SDK "web" platform.
var WebView = function () { return (<View style={{ alignSelf: 'flex-start' }}>
		<Text style={{ color: 'red' }}>
			React Native WebView does not support this platform.
		</Text>
	</View>); };
export { WebView };
export default WebView;
