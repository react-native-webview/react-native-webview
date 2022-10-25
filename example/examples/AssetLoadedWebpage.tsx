import React, { Component } from 'react';
import { View, Button } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class AssetLoadedWebpage extends Component<Props, State> {
  state = {
    type: 'resources'
  };

  render() {
    let path = 'webview_resources/raw/sample_resources.html'

    if (this.state.type === 'assets') {
      path = 'webview_assets/sample_assets.html'
    } 

    return (
      <View style={{ height: 400 }}>
        <WebView
          source={{ uri: `https://infinite.red/${path}` }}
          style={{ width: '100%', height: '100%' }}
          androidAssetLoaderConfig= {{
            domain: "infinite.red",
            pathHandlers: [
              {
                type: "resources",
                path: "/webview_resources/",
              },
              {
                type: "assets",
                path: "/webview_assets/"
              }
            ]
          }}
        />
        <Button title='Resources' onPress={() => {this.setState({type: 'resources'})}}></Button>
        <Button title='Assets' onPress={() => {this.setState({type: 'assets'})}}></Button>
      </View>
    );
  }
}
