import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import NativeWebpage from './examples/NativeWebpage';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NativeWebpage />
        <View style={styles.bottomBar}>
          <Text>Bottom Bar</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const BOTTOM_BAR_HEIGHT = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bottomBar: {
    height: BOTTOM_BAR_HEIGHT,
    backgroundColor: 'gray',
    padding: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
