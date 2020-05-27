import React, {Component} from 'react';
import {View, Text, Alert, TextInput, Button} from 'react-native';
import WebView from 'react-native-webview';
const localHtmlFile = require('../assets/test.html');

export default class LocalPageLoad extends Component<Props, State> {
    render() {
      return (
        <View>
            <View style={{ width: '100%', height: '100%' }}>
                <WebView source={localHtmlFile}/>
          </View>
        </View>
      );
    }
  }