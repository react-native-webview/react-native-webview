import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';

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
          source={{ uri: 'https://infinite.red' }}
          style={{ width: '100%', height: '100%' }}
          onMessage={(event) => {
            if (event.nativeEvent.data === 'startLoop') {
              Alert.alert('Start loop!')
            }
          }}
        />
      </View>
    );
  }
}
