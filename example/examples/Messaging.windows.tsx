import React, { useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `<!DOCTYPE html>\n
<html>
  <head>
    <title>Messaging</title>
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
    <button onclick="sendPostMessage()">Send post message from JS to WebView</button>
    <p id="demo"></p>    
    <p id="test">Nothing received yet</p>

    <script>
      function sendPostMessage() {
        window.postMessage('Message from JS');
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

export default function Messaging() {
  const webView = useRef<WebView | null>(null);
  // Displayed inline because the RNW alert module is not supported in
  // Win32/WinAppSDK composition apps.
  const [lastMessage, setLastMessage] = useState('');

  return (
    <View style={{ height: 120 }}>
      {lastMessage ? (
        <Text style={{ padding: 4, backgroundColor: '#eee' }}>Message from JS: {lastMessage}</Text>
      ) : null}
      <TextInput
        placeholder="Type a message and press Enter"
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
          console.log('Message received from JS: ', e.nativeEvent.data);
          setLastMessage(e.nativeEvent.data || '');
        }}
        useWebView2
      />
    </View>
  );
}
