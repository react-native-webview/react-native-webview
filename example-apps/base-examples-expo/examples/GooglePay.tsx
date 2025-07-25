import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

export default class Alerts extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://rsolomakhin.github.io/pr/gp2-test' }}
          paymentRequestEnabled={true}
        />
      </View>
    );
  }
}
