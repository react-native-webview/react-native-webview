/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <WebView
          source={{uri: 'https://infinite.red/react-native'}}
          useWebKit
          style={styles.webviewContainer}
        />
    );
  }
}

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
  },
});
