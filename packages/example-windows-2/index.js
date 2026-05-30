import React, { useState } from 'react';
import { AppRegistry, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { name as appName } from './app.json';

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Example Windows 2 WebView</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        align-items: center;
        background: #f9fafb;
        color: #111827;
        display: flex;
        flex-direction: column;
        font-family: Segoe UI, sans-serif;
        gap: 16px;
        justify-content: flex-start;
        margin: 0;
        padding: 24px;
      }
      button {
        background: #2563eb;
        border: 0;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        padding: 10px 16px;
      }
    </style>
  </head>
  <body>
    <h1>Example Windows 2 WebView</h1>
    <button
      id="ping-button"
      aria-label="Ping from WebView"
      onclick="window.ReactNativeWebView.postMessage('ping')"
    >
      Ping from WebView
    </button>
    <script>
      function sendPing() {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage('ping');
        } else {
          setTimeout(sendPing, 50);
        }
      }
      window.addEventListener('DOMContentLoaded', sendPing);
    </script>
  </body>
</html>
`;

function App() {
  const [message, setMessage] = useState('none');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Example Windows 2</Text>
        <View style={styles.webViewContainer}>
          <WebView
            source={{ html }}
            onMessage={(event) => {
              setMessage(event.nativeEvent.data);
            }}
            automaticallyAdjustContentInsets={false}
            useWebView2
          />
        </View>
        <Text accessibilityLabel={`WebView message: ${message}`} style={styles.body}>
          WebView message: {message}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#1f2937',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  webViewContainer: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    flex: 1,
    marginBottom: 16,
    minHeight: 320,
  },
  body: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 480,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent(appName, () => App);
