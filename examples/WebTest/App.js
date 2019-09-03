import React, {useState, useRef} from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  const ref = useRef(undefined);
  const [hello, setHello] = useState(false);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>WebTest web view</title>
        <script>
          function sendData() {
            window.ReactNativeWebView.postMessage("Hey!")
          }
        </script>
        <style>
          main {
            padding: 150px;
            font-size: 50px;
          }
          main button {
            font-size: 40px;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Hello, World!</h1>
          <button onClick="sendData()">Send Data</button>
        </div>
      </main>
    </html>
  `;

  const triggerHello = () => {
    ref.current.injectJavaScript('sendData(); true');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <WebView
        testID="test_webview"
        source={{html}}
        ref={ref}
        style={{
          flex: 3,
        }}
        onMessage={event => {
          setHello(true);
        }}
      />
      <View style={{flex: 1}}>
        {hello ? (
          <Text testID="hello">Hello from the webview!</Text>
        ) : (
          <Text testID="hello">No hello yet</Text>
        )}
        <Button
          testID="test_trigger_button"
          onPress={triggerHello}
          title="Trigger Hello"
        />
      </View>
    </>
  );
};

export default App;
