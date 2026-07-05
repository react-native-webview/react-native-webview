import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Alerts</title>
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
    <button onclick="showAlert()">Show alert</button>
    <p id="demo"></p>
    <script>
      function showAlert() {
        window.ReactNativeWebView.postMessage('show-alert');
      }
      window.addEventListener('message', function (event) {
        document.getElementById('demo').innerHTML = event.data;
      });
      document.addEventListener('message', function (event) {
        document.getElementById('demo').innerHTML = event.data;
      });
    </script>
  </body>
</html>
`;

// The alert is rendered in-app because the RNW alert module is not supported
// in Win32/WinAppSDK composition apps, and a native modal would block the UI
// thread and be invisible to UI automation.
export default function Alerts() {
  const webView = useRef<WebView | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <View style={{ height: 200 }}>
      {alertVisible ? (
        <View style={{ padding: 8, backgroundColor: '#eee' }}>
          <Text>Hello! I am an alert box!</Text>
          <Button
            title="OK"
            onPress={() => {
              setAlertVisible(false);
              webView.current?.postMessage('Alert dismissed!');
            }}
          />
        </View>
      ) : null}
      <WebView
        ref={webView}
        source={{ html: HTML }}
        onMessage={() => setAlertVisible(true)}
        automaticallyAdjustContentInsets={false}
        useWebView2
      />
    </View>
  );
}
