import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

interface Props {}
interface State {}

export default class NativeWebpage extends Component<Props, State> {
  state = {
    modifiedHtml: '',
    webViewKey: 1
  };

  async componentDidMount() {
    const html = await this.fetchAndModifyHtml()
    this.setState({ modifiedHtml: html, webViewKey: this.state.webViewKey + 1 });
  }

  fetchAndModifyHtml = async () => {
    try {
      const response = await fetch('https://infinite.red/');
      const html = await response.text();
      const modifiedHtml = html.replace('<body>', '<body><p>Request succesfully intercepted!</p>');
      return modifiedHtml
    } catch (error) {
      console.error('Error fetching HTML:', error);

      return ""
    }
  };

  render() {
    const { modifiedHtml, webViewKey } = this.state;

    return (
      <View style={{ height: 400 }}>
        <WebView
          key={webViewKey}
          source={{ uri: 'https://infinite.red' }}
          style={{ width: '100%', height: '100%' }}
          onShouldStartLoadWithRequest={(event) => {
            console.log("onShouldStartLoadWithRequest", event);
            return true;
          }}
          onShouldInterceptRequest={(event) => {
            console.log("onShouldInterceptRequest", event);
            if (event.url === 'https://infinite.red/') {
              return modifiedHtml
            }
          }}
          onLoadStart={(event) => {
            console.log("onLoadStart", event.nativeEvent);
          }}
        />
      </View>
    );
  }
}
