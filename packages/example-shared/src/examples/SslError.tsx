import React from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

type LoadSubResourceErrorEvent = {
  nativeEvent: {
    description?: string;
  };
};

export default function SslError() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://badssl.com/' }}
        onLoadSubResourceError={(event: LoadSubResourceErrorEvent) => {
          console.log('onLoadSubResourceError', event.nativeEvent.description);
        }}
      />
    </View>
  );
}
