import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

interface Props {}
interface State {}

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>Context Menu</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
  </head>
  <body>
    <p contenteditable autofocus>
      Select text to see the context menu.
    </p>
  </body>
</html>
`

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 400 }}>
        <WebView
          source={{ html: HTML }}
          style={{ width: '100%', height: '100%' }}
          onShouldStartLoadWithRequest={(event) => {
            console.log("onShouldStartLoadWithRequest", event);
            return true;
          }}
          onLoadStart={(event) => {
            console.log("onLoadStart", event.nativeEvent);
          }}
          suppressMenuItems={["cut", "copy", "paste", "replace", "bold", "italic", "underline", "select", "share", "lookup"]}
        />
      </View>
    );
  }
}
