import React, {Component} from 'react';
import {Text, View} from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <p>HTML content in transparent body.</p>
  </body>
</html>
`;

type Props = {};
type State = {
  backgroundColor: string,
};

export default class Background extends Component<Props, State> {
  state = {
    backgroundColor: '#FF00FF00'
  };

  render() {
    return (
      <View>
        <View style={{backgroundColor:'red'}}>
          <View style={{ height: 120 }}>
            <WebView
              source={{html: HTML}}
              automaticallyAdjustContentInsets={false}
              style={{backgroundColor:'#00000000'}}
            />
          </View>
        </View>
        <Text>WebView is transparent contained in a View with a red backgroundColor</Text>
      </View>
    );
  }
}
