import React, {Component} from 'react';
import {Button, Linking, ScrollView, Text, View} from 'react-native';

import WebView from 'react-native-webview';
import Tweet from './CrashComponents/Tweet';


export default class Crash extends Component {
  state = {};

  render() {
    return (
      <ScrollView>
        {new Array(10).fill(null).map((_,id) => <Tweet key={id} />)}
      </ScrollView>
    );
  }
}
