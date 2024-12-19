import React, { Component } from 'react';
import { Button, View } from 'react-native';

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
  <style>
    html, body {
        margin: 0;
        padding: 0;
        background-color: red;
        height: 2000px; // Make it scrollable
    }
  </style>
  <body>
   <p>This is the content</p>
  </body>
</html>
`;

export default class NativeWebpage extends Component<Props, State> {
  state = {
    inset: 0,
  };

  render() {
    return (
      <View style={{ height: 400 }}>
        <Button
          title="increase inset"
          onPress={() => {
            this.setState({ inset: this.state.inset + 10 });
          }}
        />

        <WebView
          source={{ html: HTML }}
          style={{ backgroundColor: 'gray' }}
          contentContainerStyle={{
            backgroundColor: 'transparent',
          }}
          contentInset={{
            top: this.state.inset,
            left: this.state.inset,
            bottom: this.state.inset,
            right: this.state.inset,
          }}
          scrollIndicatorInsets={{
            top: this.state.inset,
            left: this.state.inset,
            bottom: this.state.inset,
            right: this.state.inset,
          }}
        />
      </View>
    );
  }
}
