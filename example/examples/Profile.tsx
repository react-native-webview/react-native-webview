import React, { useRef } from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import WebView from 'react-native-webview';

const COOKIES_URL = 'https://httpbin.org/cookies';
const CLEAR_URL = 'https://httpbin.org/cookies/delete?token=';

type WebViewConfig = {
  id: string;
  label: string;
  profile?: string;
  setUrl: string;
};

const WEBVIEW_CONFIGS: WebViewConfig[] = [
  {
    id: 'alpha',
    label: 'Profile "alpha"',
    profile: 'alpha',
    setUrl: 'https://httpbin.org/cookies/set?token=alpha',
  },
  {
    id: 'beta',
    label: 'Profile "beta"',
    profile: 'beta',
    setUrl: 'https://httpbin.org/cookies/set?token=beta',
  },
  {
    id: 'default-1',
    label: 'No profile 1 (default jar)',
    profile: undefined,
    setUrl: 'https://httpbin.org/cookies/set?token=default',
  },
  {
    id: 'default-2',
    label: 'No profile 2 (default jar)',
    profile: undefined,
    setUrl: 'https://httpbin.org/cookies/set?token=default',
  },
];

export default function ProfileExample() {
  const refs = useRef<Record<string, WebView | null>>({});

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          The `profile` prop is Android-only. Run this example on Android to test isolated cookie jars.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.intro}>
        Each WebView below is bound to a different androidx.webkit Profile (or no profile).
        Tap "Set cookie" on one row, then "Get cookie" — the other rows should not see it.
      </Text>

      {WEBVIEW_CONFIGS.map((config) => (
        <View key={config.id} style={styles.webviewRow}>
          <Text style={styles.webviewLabel}>{config.label}</Text>
          <View style={styles.buttonRow}>
            <Button
              title="Set cookie"
              onPress={() =>
                refs.current[config.id]?.injectJavaScript(
                  `window.location.href = ${JSON.stringify(config.setUrl)};`,
                )
              }
            />
            <Button
              title="Get cookie"
              onPress={() =>
                refs.current[config.id]?.injectJavaScript(
                  `window.location.href = ${JSON.stringify(COOKIES_URL)};`,
                )
              }
            />
            <Button
              title="Clear cookie"
              onPress={() =>
                refs.current[config.id]?.injectJavaScript(
                  `window.location.href = ${JSON.stringify(CLEAR_URL)};`,
                )
              }
            />
          </View>
          <WebView
            ref={(r) => {
              refs.current[config.id] = r;
            }}
            profile={config.profile}
            source={{ uri: COOKIES_URL }}
            style={styles.webview}
            textZoom={300}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  intro: { padding: 8, fontSize: 16, color: '#444' },
  webviewRow: { marginBottom: 12, borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 8 },
  webviewLabel: { fontWeight: '600', paddingHorizontal: 8 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 4 },
  webview: { height: 220, marginTop: 8 },
  notice: { padding: 24 },
  noticeText: { fontSize: 18, color: '#555' },
});
