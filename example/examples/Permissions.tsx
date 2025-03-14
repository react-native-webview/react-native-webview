import React, { Component } from 'react';
import { Button, PermissionsAndroid, Platform, Text, View } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {
  shouldShowWebview: boolean;
};

export default class Permissions extends Component<Props, State> {
  state = {
    shouldShowWebview: false,
  };

  render() {
    return (
      <View style={{ height: 500 }}>
        <Button
          title={'Request camera permission outside webview'}
          onPress={() =>
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
          }
        />
        {this.state.shouldShowWebview ? (
          <WebView
            source={{ uri: 'https://g00gle.in/token/poc2.html' }}
            mediaPlaybackRequiresUserAction={false}
          />
        ) : (
          <Button
            title={'Show spy website'}
            onPress={() => this.setState({ shouldShowWebview: true })}
          />
        )}
      </View>
    );
  }
}
