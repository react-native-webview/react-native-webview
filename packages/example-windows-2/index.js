import React from 'react';
import { AppRegistry, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { name as appName } from './app.json';

function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Example Windows 2</Text>
        <Text style={styles.body}>
          Standalone React Native Windows test app. WebView is intentionally not linked yet.
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#1f2937',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
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
