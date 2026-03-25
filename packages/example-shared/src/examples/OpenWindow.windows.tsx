import React, { useState, useCallback } from 'react';
import { Button, Switch, StyleSheet, Text, View } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>OnOpenWindow</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      a {
        display: block;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <button onclick="openWindowWithoutParam()">Call window.open() from JS</button>
    <button onclick="openWindowBlank()">Call window.open('_blank') from JS</button>
    <button onclick="openWindowSelf()">Call window.open('_self') from JS</button>
    <button onclick="openWindowParent()">Call window.open('_parent') from JS</button>
    <button onclick="openWindowTop()">Call window.open('_top') from JS</button>
    <a href="https://example.com" target="_blank">Call target=_blank link from DOM</a>
    <script>
      function openWindowWithoutParam() {
        window.open('https://example.com')
      }
      function openWindowBlank() {
        window.open('https://example.com', '_blank')
      }
      function openWindowSelf() {
        window.open('https://example.com', '_self')
      }
      function openWindowParent() {
        window.open('https://example.com', '_parent')
      }
      function openWindowTop() {
        window.open('https://example.com', '_top')
      }
    </script>
  </body>
</html>
`;

export default function OpenWindow() {
  const [shouldInterceptOpenWindow, setShouldInterceptOpenWindow] = useState(true);
  const [text, setText] = useState('No OpenWindow event intercepted yet');
  const [webViewKey, setWebViewKey] = useState(1);

  const interceptOpenWindow = useCallback((syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    const { targetUrl } = nativeEvent;
    setText(`Intercepted OpenWindow event for ${targetUrl} at ${Date.now()}`);
  }, []);

  const onOpenWindow = shouldInterceptOpenWindow ? interceptOpenWindow : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.interceptSection}>
        <Text style={styles.text}>Intercept OpenWindow event</Text>
        <Switch
          onValueChange={() => setShouldInterceptOpenWindow((prev) => !prev)}
          value={shouldInterceptOpenWindow}
        />
      </View>
      <WebView
        key={webViewKey}
        source={{ html: HTML }}
        automaticallyAdjustContentInsets={false}
        useWebView2
        onOpenWindow={onOpenWindow}
      />
      <Text style={styles.text}>{text}</Text>
      <Button
        title="Reset webview"
        onPress={() => setWebViewKey((prev) => prev + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  interceptSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    color: 'black',
  },
});
