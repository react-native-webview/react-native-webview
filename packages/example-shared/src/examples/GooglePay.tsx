import React from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

export default function GooglePay() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://rsolomakhin.github.io/pr/gp2-test' }}
        paymentRequestEnabled={true}
      />
    </View>
  );
}
