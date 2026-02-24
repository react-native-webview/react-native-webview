import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
} from 'react-native';

import Alerts from './examples/Alerts';
import Messaging from './examples/Messaging';
import MultiMessaging from './examples/MultiMessaging';
import OpenWindow from './examples/OpenWindow';

const TESTS = {
  Messaging: {
    title: 'Messaging',
    testId: 'messaging',
    description: 'js-webview postMessage messaging test',
    render() {
      return <Messaging />;
    },
  },
  MultiMessaging: {
    title: 'MultiMessaging',
    testId: 'multimessaging',
    description: 'Multi js-webview postMessage messaging test',
    render() {
      return <MultiMessaging />;
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
  OpenWindow: {
    title: 'Open Window',
    testId: 'OpenWindow',
    description: 'Test to intercept new window events',
    render() {
      return <OpenWindow />;
    },
  },
};

interface Props {}
interface State {
  restarting: boolean;
  currentTest: Object;
}

export default class App extends Component<Props, State> {
  state = {
    restarting: false,
    currentTest: TESTS.Alerts,
  };

  _simulateRestart = () => {
    this.setState({ restarting: true }, () =>
      this.setState({ restarting: false }),
    );
  };

  _changeTest = (testName) => {
    this.setState({ currentTest: TESTS[testName] });
  };

  render() {
    const { restarting, currentTest } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeKeyboardView}
          onPress={() => Keyboard.dismiss()}
          testID="closeKeyboard"
        />

        <TouchableOpacity
          testID="restart_button"
          onPress={this._simulateRestart}
          style={styles.restartButton}
          activeOpacity={0.6}
        >
          <Text>Simulate Restart</Text>
        </TouchableOpacity>

        <View style={styles.testPickerContainer}>
          <Button
            testID="testType_alerts"
            title="Alerts"
            onPress={() => this._changeTest('Alerts')}
          />
          <Button
            testID="testType_messaging"
            title="Messaging"
            onPress={() => this._changeTest('Messaging')}
          />
          <Button
            testID="testType_multimessaging"
            title="MultiMessaging"
            onPress={() => this._changeTest('MultiMessaging')}
          />
          <Button
            testID="testType_openwindow"
            title="OpenWindow"
            onPress={() => this._changeTest('OpenWindow')}
          />
        </View>

        {restarting ? null : (
          <View
            testID={`example-${currentTest.testId}`}
            key={currentTest.title}
            style={styles.exampleContainer}
          >
            <Text style={styles.exampleTitle}>{currentTest.title}</Text>
            <Text style={styles.exampleDescription}>
              {currentTest.description}
            </Text>
            <View style={styles.exampleInnerContainer}>
              {currentTest.render()}
            </View>
          </View>
        )}
      </View>
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
