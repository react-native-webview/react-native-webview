import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  onLoadStart = (e) => {
    console.log(e.nativeEvent)
  }

  render() {
    return (
      <View style={{ height: 400 }}>
        <WebView
          source={{ uri: 'https://d3ward.github.io/toolz/adblock' }}
          style={{ width: '100%', height: '100%' }}
          onLoadStart={this.onLoadStart}
          blockAds={false}
        />
      </View>
    );
  }
}
