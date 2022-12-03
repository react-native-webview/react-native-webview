import React, { Component } from 'react';
import { Button, Linking, Text, View } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Uploads</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
    </style>
  </head>
  <body>
    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">just setting up my twttr</p>&mdash; jack (@jack) <a href="https://twitter.com/jack/status/20?ref_src=twsrc%5Etfw">March 21, 2006</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </body>
</html>
`;

type Props = {};
type State = {};

export default class Tweet extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 250 }}>
        <WebView
          source={{ html: HTML }}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}
