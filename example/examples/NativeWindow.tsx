import React, { useState } from 'react';
import { Button, Platform, StyleSheet, Switch, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewMessageEvent, WebViewOpenWindowEvent } from '../../src/WebViewTypes';

// Serve example/assets/native-window at an HTTPS origin trusted by your device.
const TEST_ORIGIN = 'https://your-test-host.example';
const TEST_HOST = new URL(TEST_ORIGIN).hostname;

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: { padding: 8 },
});

export default function NativeWindow() {
  const [webViewKey, setWebViewKey] = useState(0);
  const [customUserAgent, setCustomUserAgent] = useState(false);
  const [status, setStatus] = useState('Waiting for a popup message');

  if (Platform.OS !== 'ios') {
    return <Text>{'Native popup windows are available on iOS only.'}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text>{status}</Text>
        <Text>{'Use a custom userAgent'}</Text>
        <Switch
          value={customUserAgent}
          onValueChange={(value) => {
            setCustomUserAgent(value);
            setWebViewKey((key) => key + 1);
          }}
        />
        <Button
          title="Reset parent WebView"
          onPress={() => setWebViewKey((key) => key + 1)}
        />
      </View>
      <WebView
        key={webViewKey}
        source={{ uri: `${TEST_ORIGIN}/opener.html` }}
        nativeWindowHosts={[TEST_HOST]}
        javaScriptCanOpenWindowsAutomatically
        applicationNameForUserAgent="NATIVE_WINDOW_APPEND_TEST"
        userAgent={customUserAgent ? 'Mozilla/5.0 NATIVE_WINDOW_CUSTOM_TEST' : undefined}
        injectedJavaScriptBeforeContentLoaded="window.parentInjected = true; true;"
        onMessage={(event: WebViewMessageEvent) => setStatus(event.nativeEvent.data)}
        onOpenWindow={(event: WebViewOpenWindowEvent) =>
          setStatus(`Fallback onOpenWindow: ${event.nativeEvent.targetUrl}`)
        }
      />
    </View>
  );
}
