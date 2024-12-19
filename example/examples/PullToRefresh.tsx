import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Alerts</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style>
    html, body {
        margin: 0;
        padding: 0;
        background-color: gray;
       
    }
  </style>
  </head>
   <body>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
   <p>This is the content</p>
  </body>
</html>
`;

type Props = {};
type State = {};

export default class PullToRefresh extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 400, backgroundColor: 'green', padding: 10 }}>
        <WebView
          source={{ html: HTML }}
          style={{ backgroundColor: 'red' }}
          automaticallyAdjustContentInsets={false}
          pullToRefreshEnabled={true}
          originWhitelist={['*']}
          webviewDebuggingEnabled={true}
        />
      </View>
    );
  }
}
