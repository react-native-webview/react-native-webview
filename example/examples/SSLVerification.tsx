import React, {Component} from 'react';
import {Button, Switch, StyleSheet, Text, View} from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {
  isVerifySSL: boolean;
  isWebViewLoaded: boolean;
  webViewKey: number;
};

export default class SSLVerification extends Component<Props, State> {
  state = {
    isVerifySSL: true,
    isWebViewLoaded: false,
    webViewKey: 1,
  };

  toggleVerifySSL = () => {
    this.setState((prevState) => ({
      ...prevState,
      isVerifySSL: !prevState.isVerifySSL,
    }))
  };

  showWebView = () => {
    this.setState((prevState) => ({
      ...prevState,
      isWebViewLoaded: true,
      webViewKey: prevState.webViewKey + 1
    }))
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.interceptSection}>
          <Text style={styles.text}>
            Enable SSL verification
          </Text>
          <Switch
            onValueChange={this.toggleVerifySSL}
            value={this.state.isVerifySSL}
          />
        </View>
        <Button title="Open webview" onPress={this.showWebView} />
        {this.state.isWebViewLoaded && (
          <WebView
            allowInsecureHttps={!this.state.isVerifySSL}
            source={{ uri: 'https://wrong.host.badssl.com' }}
            key={this.state.webViewKey}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300
  },
  interceptSection: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 20
  },
  text: {
    color: 'black'
  }
})
