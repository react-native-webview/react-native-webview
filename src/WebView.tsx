import React from 'react';
import { Text, View } from 'react-native';
import { IOSWebViewProps, AndroidWebViewProps } from './WebViewTypes';
import styles from './WebView.styles';

export type WebViewProps = IOSWebViewProps & AndroidWebViewProps;

// This "dummy" WebView is to render something for unsupported platforms,
// like for example Expo SDK "web" platform.
const WebView: React.FunctionComponent<WebViewProps> = () => (
  <View style={styles.flexStart}>
    <Text style={styles.colorRed}>
      React Native WebView does not support this platform.
    </Text>
  </View>
);

export { WebView };
export default WebView;
