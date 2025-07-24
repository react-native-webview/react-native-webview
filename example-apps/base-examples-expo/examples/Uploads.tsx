import React, {Component} from 'react';
import {Button, Linking, Text, View} from 'react-native';

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
    <p>
      <label for="images-only">Images only file upload</label>
      <input name="images-only" type="file" accept="image/*">
    </p>
    <p>
      <label for="video-only">Video only file upload</label>
      <input name="video-only" type="file" accept="video/*">
    </p>
    <p>
      <label for="any-file">Any file upload</label>
      <input name="any-file" type="file">
    </p>
  </body>
</html>
`;

type Props = {};
type State = {};

export default class Uploads extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View>
        <View style={{ height: 120 }}>
          <WebView
            source={{html: HTML}}
            automaticallyAdjustContentInsets={false}
          />
        </View>
        <Text>
            Android limitation: If the file input should show camera options for the user,
            and the app has the ability to request the camera permission, then the user must
            grant permission first in order to see the options. Since this example app does
            have the permission declared, you must allow it in settings to be able to see
            camera options. If your app does not have the camera permission declared, then
            there is no restriction to showing the camera options.
        </Text>
        <Button
          title="Open settings"
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }
}
