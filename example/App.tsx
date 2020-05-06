import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
  Platform,
} from 'react-native';

import Alerts from './examples/Alerts';
import Scrolling from './examples/Scrolling';
import Background from './examples/Background';
import Downloads from './examples/Downloads';
import Uploads from './examples/Uploads';
import Injection from './examples/Injection';

const TESTS = {
  Alerts: {
    title: 'Alerts',
    testId: 'alerts',
    description: 'Alerts tests',
    render() {
      return <Alerts />;
    },
  },
  Scrolling: {
    title: 'Scrolling',
    testId: 'scrolling',
    description: 'Scrolling event test',
    render() {
      return <Scrolling />;
    },
  },
  Background: {
    title: 'Background',
    testId: 'background',
    description: 'Background color test',
    render() {
      return <Background />;
    },
  },
  Downloads: {
    title: 'Downloads',
    testId: 'downloads',
    description: 'File downloads test',
    render() {
      return <Downloads />;
    },
  },
  Uploads: {
    title: 'Uploads',
    testId: 'uploads',
    description: 'Upload test',
    render() {
      return <Uploads />;
    },
  },
  Injection: {
    title: 'Injection',
    testId: 'injection',
    description: 'Injection test',
    render() {
      return <Injection />;
    },
  },
};

type Props = {};
type State = {restarting: boolean, currentTest: Object};

export default class App extends Component<Props, State> {
  state = {
    restarting: false,
    currentTest: TESTS.Alerts,
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
            testID="testType_alerts"
            title="Alerts"
            onPress={() => this._changeTest('Alerts')}
          />
          <Button
            testID="testType_scrolling"
            title="Scrolling"
            onPress={() => this._changeTest('Scrolling')}
          />
          <Button
            testID="testType_background"
            title="Background"
            onPress={() => this._changeTest('Background')}
          />
          <Button
            testID="testType_injection"
            title="Injection"
            onPress={() => this._changeTest('Injection')}
          />
          {Platform.OS == "ios" && <Button
            testID="testType_downloads"
            title="Downloads"
            onPress={() => this._changeTest('Downloads')}
          />}
          {Platform.OS === 'android' && <Button
            testID="testType_uploads"
            title="Uploads"
            onPress={() => this._changeTest('Uploads')}
          />}
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
