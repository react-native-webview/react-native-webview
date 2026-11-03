import React from 'react';
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
    <p>
      <label for="photo-capture">Photo capture</label>
      <input name="photo-capture" type="file" accept="image/*" capture>
    </p>
    <p>
      <label for="video-capture">Video capture</label>
      <input name="video-capture" type="file" accept="video/*" capture>
    </p>
  </body>
</html>
`;

export default function Uploads() {
  return (
    <View>
      <View style={{ height: 260 }}>
        <WebView
          source={{ html: HTML }}
          automaticallyAdjustContentInsets={false}
        />
      </View>
      <Text>
        {
          'Android limitation: this example app declares the camera permission, so the other inputs only show camera options once it has been granted. The capture inputs ask for it.'
        }
      </Text>
      <Button
        title="Open settings"
        onPress={() => Linking.openSettings()}
      />
    </View>
  );
}
