import React, { Component } from 'react';
import { View } from 'react-native';

import WebView from 'react-native-webview';

interface Props {}
interface State {}

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 400 }}>
        <WebView
          source={{ uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&scope=https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.readwrite+offline_access&state=ATlD4ac_Xk8duEVtAtuHINyeBYv9pArhD6diZQVVJZeUpuHg-LF3ydtbqEN3otoyv-3s8wULIocOl-pJGSY0mROxbJsBR4V3IYsj7gonfoLgYiPZH2f0NqaJHhinZlTBPIIt5LF8UmJ_0BLua3g5HPKcDrKRhi44lURRghI4Vfvx0VhSpLNNonF86X7rA-gVC0o0JmxoBw-KKISxawdayRuAWmL06y-z24yDfU0JtnYnRMQkpk7P_Jp1CfK7a2D8CHxGuXSJR64zLWFOZqmM1qb_IjlAXYCUTFupQ9JZBpS6jA&client_id=88bd75cd-44e5-4463-b4c7-f5b7f0de8c37&redirect_uri=https%3A%2F%2Fwork-api.workplace.com%2Factivedirectory%2Fcallback%2F' }}
          style={{ width: '100%', height: '100%' }}
          onShouldStartLoadWithRequest={(event) => {
            console.log("onShouldStartLoadWithRequest", event);
            return true;
          }}
          onLoadStart={(event) => {
            console.log("onLoadStart", event.nativeEvent);
          }}
          autoSelectClientCertificateEnabled={true}
        />
      </View>
    );
  }
}
