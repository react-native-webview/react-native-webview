/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { WebView } from "react-native-webview";
import file from './index.html';

type Props = {};
export default class App extends Component<Props> {
  render() {
    let source = { uri: "https://infinite.red/react-native" };
    source=file; // comment this line if want to test with the url above.

    return (
      <WebView
        source={source}
        style={{ marginTop: 20 }}
        onLoadProgress={e => console.log(e.nativeEvent.progress)}
        onMessage={e => console.log(e.nativeEvent.data)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
