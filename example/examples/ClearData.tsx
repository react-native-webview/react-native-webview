import React, { Component } from 'react';
import { View, Button } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class ClearData extends Component<Props, State> {
  state = {};

  constructor(props) {
    super(props);
    this.webView = React.createRef();
  }

  clearCacheAndReload = (includeDiskFiles: boolean) => {
    this.webView.current.clearCache(includeDiskFiles);
    this.webView.current.reload();
  };

  reload = () => {
    this.webView.current.reload();
  };

  render() {
    return (
      <View style={{ height: 1000 }}>
        <Button
          title="Clear cache (diskFiles)"
          onPress={() => this.clearCacheAndReload(true)}
        />
        <Button
          title="Clear cache (no diskFiles)"
          onPress={() => this.clearCacheAndReload(false)}
        />
        <Button title="Reload" onPress={this.reload} />
        <WebView
          ref={this.webView}
          source={{ uri: 'https://www.theguardian.com/international' }}
          incognito={false}
        />
      </View>
    );
  }
}
