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
  PlatformOSType,
} from 'react-native';

import Alerts from './examples/Alerts';
import Scrolling from './examples/Scrolling';
import Background from './examples/Background';
import Downloads from './examples/Downloads';
import Empty from './examples/Empty';
import Uploads from './examples/Uploads';
import Injection from './examples/Injection';
import LocalPageLoad from './examples/LocalPageLoad';
import Messaging from './examples/Messaging';
import NativeWebpage from './examples/NativeWebpage';
import ApplePay from './examples/ApplePay';
import CustomMenu from './examples/CustomMenu';
import OpenWindow from './examples/OpenWindow';
import SuppressMenuItems from './examples/Suppress';
import ClearData from './examples/ClearData';

interface Test {
    title: string;
    testId: string;
    description: string;
    render: () => React.ReactNode;
    platforms?: PlatformOSType[];
}

const TESTS: { [test: string]: Test } = {
  Messaging: {
    title: 'Messaging',
    testId: 'messaging',
    description: 'js-webview postMessage messaging test',
    render() {
      return <Messaging />;
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
  ClearData: {
    title: 'ClearData',
    testId: 'clearData',
    description: 'Clear data test',
    render() {
      return <ClearData />;
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
    platforms: ['android', 'macos'],
  },
  Injection: {
    title: 'Injection',
    testId: 'injection',
    description: 'Injection test',
    render() {
      return <Injection />;
    },
  },
  PageLoad: {
    title: 'LocalPageLoad',
    testId: 'LocalPageLoad',
    description: 'Local Page load test',
    render() {
      return <LocalPageLoad />;
    },
  },
  NativeWebpage: {
    title: 'NativeWebpage',
    testId: 'NativeWebpage',
    description: 'Test to open a new webview with a link',
    render() {
      return <NativeWebpage />;
    },
  },
  ApplePay: {
    title: 'Apple Pay ',
    testId: 'ApplePay',
    description: 'Test to open a apple pay supported page',
    render() {
      return <ApplePay />;
    },
    platforms: ['ios']
  },
  CustomMenu: {
    title: 'Custom Menu',
    testId: 'CustomMenu',
    description: 'Test to custom context menu shown on highlighting text',
    render() {
      return <CustomMenu />;
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
  SuppressMenuItems: {
    title: 'SuppressMenuItems',
    testId: 'SuppressMenuItems',
    description: 'SuppressMenuItems in editable content',
    render() {
      return <SuppressMenuItems />;
    }
  },
  Empty: {
    title: 'Empty',
    testId: 'Empty',
    description: 'Does not error if passed a null or undefined source',
    render() {
      return <Empty />;
    }
  }
};

interface Props {}
interface State {restarting: boolean; currentTest: Object}

export default class App extends Component<Props, State> {
  state = {
    restarting: false,
    currentTest: TESTS.Alerts,
  };

  _simulateRestart = () => {
    this.setState({restarting: true}, () => this.setState({restarting: false}));
  };

  _changeTest = (testName: string) => {
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
          {Object.entries(TESTS).map(([key, test]) => {
              if (test.platforms && !test.platforms.includes(Platform.OS)) return null;
              return (
                  <Button
                      key={key}
                      testID={test.testId}
                      title={test.title}
                      onPress={() => this._changeTest(key)}
                  />
              )
          })}
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
