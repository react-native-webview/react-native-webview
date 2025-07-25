import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

export default class Alerts extends Component {
  state = {};

  render() {
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
}
