import React, { Component } from 'react';
import { Button, PermissionsAndroid, Platform, Switch, Text, View } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {
  inheritAppPermissions: boolean;
  shouldShowWebview: boolean;
};

export default class Permissions extends Component<Props, State> {
  state = {
    inheritAppPermissions: true,
    shouldShowWebview: false,
  };

  toggleInheritAppPermissions = () => {
    this.setState(prevState => ({
      inheritAppPermissions: !prevState.inheritAppPermissions
    }))
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
            inheritAppPermissions={this.state.inheritAppPermissions}
          />
        ) : (
          <>
            <Switch
              onValueChange={this.toggleInheritAppPermissions}
              value={this.state.inheritAppPermissions}
            />
            <Button
              title={'Show spy website'}
              onPress={() => this.setState({ shouldShowWebview: true })}
            />
          </>
        )}
      </View>
    );
  }
}
