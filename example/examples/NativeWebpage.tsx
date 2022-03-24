import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 400 }}>
        <WebView
          source={{
            uri: 'https://player.vimeo.com/video/538457669?transparent=false&autoplay=1',
          }}
          style={{ width: '100%', height: '100%' }}
          allowsAirPlayForMediaPlayback={true}
        />
      </View>
    );
  }
}
