import React from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

export default function NativeWebpage() {
  return (
    <View style={{ height: 400 }}>
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ width: '100%', height: '100%' }}
        onShouldStartLoadWithRequest={(event) => {
          console.log('onShouldStartLoadWithRequest', event);
          return true;
        }}
        onLoadStart={(event) => {
          console.log('onLoadStart', event.nativeEvent);
        }}
      />
    </View>
  );
}
