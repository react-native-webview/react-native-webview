import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body { font: 16px -apple-system, sans-serif; margin: 16px; }
      button { display: block; font-size: 16px; margin-bottom: 12px; }
    </style>
  </head>
  <body>
    <button onclick="openPopup()">window.open('https://example.com/')</button>
    <a href="https://example.com/" target="_blank">target="_blank" link</a>
    <p id="status">No window opened</p>
    <script>
      var popup = null;
      function openPopup() {
        popup = window.open('https://example.com/');
        report();
      }
      function report() {
        var status = document.getElementById('status');
        if (popup === null) {
          status.textContent = 'window.open() returned null';
          return;
        }
        status.textContent = popup.closed ? 'Window closed' : 'Window open';
        if (!popup.closed) {
          setTimeout(report, 500);
        }
      }
    </script>
  </body>
</html>
`;

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    color: 'black',
  },
});

export default function MultiWindow() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>{'Open in a native child window'}</Text>
        <Switch
          onValueChange={setIsEnabled}
          value={isEnabled}
        />
      </View>
      <WebView
        source={{ baseUrl: 'https://example.com', html: HTML }}
        automaticallyAdjustContentInsets={false}
        setSupportMultipleWindows={isEnabled}
      />
    </View>
  );
}
