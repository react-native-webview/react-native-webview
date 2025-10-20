import React, { Component } from 'react';

import WebView from 'react-native-webview';

interface Props {}
interface State {}

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <WebView source={{ uri: 'https://v0-frame-inspector.vercel.app' }} />
    );
  }
}
