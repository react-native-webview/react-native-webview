import React from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { name as appName } from './app.json';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>WebView Windows Example</Text>
  </View>
);

AppRegistry.registerComponent(appName, () => App);
