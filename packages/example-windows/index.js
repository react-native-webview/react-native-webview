import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { name as appName } from './app.json';

const App = () => (
  <View style={{ flex: 1 }}>
    <Text style={{ padding: 20 }}>WebView Windows Example</Text>
    <WebView
      source={{ uri: 'https://reactnative.dev' }}
      style={{ flex: 1 }}
    />
  </View>
);

AppRegistry.registerComponent(appName, () => App);
