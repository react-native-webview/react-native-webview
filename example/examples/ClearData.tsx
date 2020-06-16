import React, {Component} from 'react';
import {View, Button} from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class ClearCookies extends Component<Props, State> {
  state = {};

  constructor(props) {
    super(props);
    this.webView = React.createRef();
  }
  
  clearCookiesAndReload = () => {
    this.webView.current.clearCookies();
    this.webView.current.reload();
  }

  clearCacheAndReload = () => {
    this.webView.current.clearCache(true);
    this.webView.current.reload();
  }
  
  render() {
    return (
      <View style={{ height: 1000 }}>
        <Button
          title='Clear cookies'
          onPress={this.clearCookiesAndReload}
        />
        <Button
          title='Clear cache'
          onPress={this.clearCacheAndReload}
        />
        <WebView
          ref={this.webView}
          source={{uri: 'https://www.theguardian.com/international'}}
          incognito={false}
        />
      </View>
    );
  }
}
