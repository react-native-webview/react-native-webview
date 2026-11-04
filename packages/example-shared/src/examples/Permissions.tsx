import React, { useState } from 'react';
import { Button, PermissionsAndroid, Platform, StyleSheet, Switch, Text, View } from 'react-native';

import WebView from 'react-native-webview';

// Asks for the camera as soon as it loads and shows the stream once access is granted.
const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <p id="message">Requesting camera access...</p>
    <video id="video" autoplay playsinline muted width="100%"></video>
    <script>
      var message = document.getElementById('message');
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          message.textContent = 'Camera access granted';
          document.getElementById('video').srcObject = stream;
        })
        .catch(function (error) {
          message.textContent = 'Camera access denied: ' + error.name;
        });
    </script>
  </body>
</html>
`;

const styles = StyleSheet.create({
  container: { flex: 1 },
  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  text: { color: 'black' },
  notice: { padding: 24 },
  noticeText: { fontSize: 18, color: '#555' },
});

export default function Permissions() {
  const [inheritAppPermissions, setInheritAppPermissions] = useState(true);
  const [showWebView, setShowWebView] = useState(false);

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          {'The `inheritAppPermissions` prop is Android-only. Run this example on Android.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Request camera permission outside webview"
        onPress={() => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)}
      />
      <View style={styles.switchRow}>
        <Text style={styles.text}>{`inheritAppPermissions: ${inheritAppPermissions}`}</Text>
        <Switch
          onValueChange={setInheritAppPermissions}
          value={inheritAppPermissions}
        />
      </View>
      <Button
        title={showWebView ? 'Hide spy website' : 'Show spy website'}
        onPress={() => setShowWebView((value) => !value)}
      />
      {showWebView && (
        <WebView
          source={{ html: HTML, baseUrl: 'https://example.com' }}
          mediaPlaybackRequiresUserAction={false}
          inheritAppPermissions={inheritAppPermissions}
        />
      )}
    </View>
  );
}
