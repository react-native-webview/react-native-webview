/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
} from 'react-native';

import InlineWebView from './examples/InlineWebView';
import Alerts from './examples/Alerts';

const TESTS = {
  InlineWebView: {
    title: 'Inline HTML WebView',
    testId: 'inline-webview',
    description: 'Inline HTML WebView',
    render() {
      return <InlineWebView />;
    },
  },
  Alerts: {
    title: 'Alerts',
    testId: 'alerts',
    description: 'Alerts tests',
    render() {
      return <Alerts />;
    },
  },
};

type Props = {};
type State = {restarting: boolean, currentTest: Object};

export default class App extends Component<Props, State> {
  state = {
    restarting: false,
    currentTest: TESTS.InlineWebView,
  };

  _simulateRestart = () => {
    this.setState({restarting: true}, () => this.setState({restarting: false}));
  };

  _changeTest = testName => {
    this.setState({currentTest: TESTS[testName]});
  };

  render() {
    const {restarting, currentTest} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.closeKeyboardView}
          onPress={() => Keyboard.dismiss()}
          testID="closeKeyboard"
        />

        <TouchableOpacity
          testID="restart_button"
          onPress={this._simulateRestart}
          style={styles.restartButton}
          activeOpacity={0.6}>
          <Text>Simulate Restart</Text>
        </TouchableOpacity>

        <View style={styles.testPickerContainer}>
          <Button
            testID="testType_inlineWebView"
            title="InlineWebView"
            onPress={() => this._changeTest('InlineWebView')}
          />
          <Button
            testID="testType_alerts"
            title="Alerts"
            onPress={() => this._changeTest('Alerts')}
          />
        </View>

        {restarting ? null : (
          <View
            testID={`example-${currentTest.testId}`}
            key={currentTest.title}
            style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>{currentTest.title}</Text>
            <Text style={styles.exampleDescription}>
              {currentTest.description}
            </Text>
            <View style={styles.exampleInnerContainer}>
              {currentTest.render()}
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 8,
  },
  exampleContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },
  exampleTitle: {
    fontSize: 18,
  },
  exampleDescription: {
    color: '#333333',
    marginBottom: 16,
  },
  exampleInnerContainer: {
    borderColor: '#EEE',
    borderTopWidth: 1,
    paddingTop: 10,
    flex: 1,
  },
  restartButton: {
    padding: 6,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  closeKeyboardView: {
    width: 5,
    height: 5,
  },
  testPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
