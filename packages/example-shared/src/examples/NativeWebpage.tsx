import React from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

type LoadStartEvent = {
  nativeEvent: unknown;
};

export default function NativeWebpage() {
  return (
    <View style={{ height: 400 }}>
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ width: '100%', height: '100%' }}
        onShouldStartLoadWithRequest={(event: unknown) => {
          console.log('onShouldStartLoadWithRequest', event);
          return true;
        }}
        onLoadStart={(event: LoadStartEvent) => {
          console.log('onLoadStart', event.nativeEvent);
        }}
      />
    </View>
  );
}
