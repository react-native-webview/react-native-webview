import React, { Component, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Alerts</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style>
    html, body {
        margin: 0;
        padding: 0;
        background-color: gray;
        height: 2000px;
    }
  </style>
  </head>
   <body>
   <p>This is the content</p>
  </body>
</html>
`;

type Props = {};
type State = {};

export default class PullToRefresh extends Component<Props, State> {
  state = {};

  render() {
    return <PullToRefreshFunction />;
  }
}

function PullToRefreshFunction() {
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshingEnabled, setIsRefreshingEnabled] = useState(true);

  return (
    <View style={{ height: 400 }}>
      <WebView
        onScroll={(e) => {
          setIsRefreshingEnabled(e.nativeEvent.contentOffset.y <= 10);
        }}
        source={{ html: HTML }}
        style={{ backgroundColor: 'red' }}
        contentContainerStyle={{ backgroundColor: 'blue', flex: 1 }}
        automaticallyAdjustContentInsets={false}
        pullToRefreshEnabled={true}
        refreshControl={
          <RefreshControl
            enabled={isRefreshingEnabled}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 1000);
            }}
          />
        }
      />
    </View>
  );
}
