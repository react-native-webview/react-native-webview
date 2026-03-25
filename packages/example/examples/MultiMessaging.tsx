/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Alert, TextInput } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `<!DOCTYPE html>\n
<html>
  <head>
    <title>Messaging</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=160, user-scalable=no">
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
    <button onclick="sendPostMessage()">Send post message from JS to WebView</button>
    <p id="demo"></p>
    <p id="test">Nothing received yet</p>

    <script>
      function sendPostMessage() {
        window.ReactNativeWebView.postMessage('Message from JS');
      }

      window.addEventListener('message',function(event){
        document.getElementById('test').innerHTML = event.data;
        console.log("Message received from RN: ",event.data);
      },false);
      document.addEventListener('message',function(event){
        document.getElementById('test').innerHTML = event.data;
        console.log("Message received from RN: ",event.data);
      },false);

    </script>
  </body>
</html>`;

export default function MultiMessaging() {
  const webView = React.useRef<WebView | null>(null);
  const webView2 = React.useRef<WebView | null>(null);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flexDirection: 'column', flex: 1, margin: 4 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 8,
          }}
          onSubmitEditing={(e) => {
            webView.current?.postMessage(e.nativeEvent.text);
          }}
        />
        <WebView
          ref={webView}
          source={{ html: HTML }}
          onLoadEnd={() => {
            webView.current?.postMessage('Hello from RN');
          }}
          automaticallyAdjustContentInsets={false}
          onMessage={(e: { nativeEvent: { data?: string } }) => {
            Alert.alert('Message received from JS: ', e.nativeEvent.data);
          }}
        />
      </View>

      <View style={{ flexDirection: 'column', flex: 1, margin: 4 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 8,
          }}
          onSubmitEditing={(e) => {
            webView2.current?.postMessage(e.nativeEvent.text);
          }}
        />
        <WebView
          ref={webView2}
          source={{
            html: HTML.replace(/from JS/g, 'from JS2'),
          }}
          onLoadEnd={() => {
            webView2.current?.postMessage('Hello from RN2');
          }}
          automaticallyAdjustContentInsets={false}
          onMessage={(e: { nativeEvent: { data?: string } }) => {
            Alert.alert('Message received from JS2: ', e.nativeEvent.data);
          }}
        />
      </View>
    </View>
  );
}
