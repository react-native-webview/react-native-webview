import React, { Component } from 'react';
import { View, Text } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 400 }}>
        <Text>This is a test</Text>
        <WebView
          menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Save for later', key: 'saveForLater' }]}
          source={{ uri: 'https://infinite.red' }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    );
  }
}
