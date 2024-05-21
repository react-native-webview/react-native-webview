import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

interface Props {}
interface State {}

export default class NativeWebpage extends Component<Props, State> {
  render() {

    return (
      <View style={{ height: 400 }}>
        <WebView
          source={{ uri: 'https://infinite.red' }}
          style={{ width: '100%', height: '100%' }}
          onShouldStartLoadWithRequest={(event) => {
            console.log("onShouldStartLoadWithRequest", event);
            return true;
          }}
          onShouldInterceptRequest={async (event) => {
            console.log("onShouldInterceptRequest", event);
            if (event.url === 'https://infinite.red/') {

              const response = await fetch('https://infinite.red/');
              const html = await response.text();
              const modifiedHtml = html.replace('<body>', '<body><p>Request succesfully intercepted!</p>');

              return { mimeType: 'text/html', encoding: 'utf-8', statusCode: 200, reasonPhrase: 'OK', response: modifiedHtml}
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
