import React from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

export default function ApplePay() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        enableApplePay={true}
        source={{ uri: 'https://applepaydemo.apple.com/' }}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
}
