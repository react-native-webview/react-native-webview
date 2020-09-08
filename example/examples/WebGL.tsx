import React, {Component} from 'react';
import {View} from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class WebGL extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{uri: 'https://webglsamples.org/aquarium/aquarium.html'}}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}
