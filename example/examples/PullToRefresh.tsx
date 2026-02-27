import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {
  lastRefresh: Date | null;
};

export default class PullToRefresh extends Component<Props, State> {
  state = {
    lastRefresh: null as Date | null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Pull down to refresh the webpage
          </Text>
          {this.state.lastRefresh && (
            <Text style={styles.refreshText}>
              Last refreshed: {this.state.lastRefresh.toLocaleTimeString()}
            </Text>
          )}
        </View>
        <WebView
          source={{ uri: 'https://reactnative.dev/' }}
          pullToRefreshEnabled={true}
          onLoadStart={() => {
            this.setState({ lastRefresh: new Date() });
          }}
          style={styles.webview}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  refreshText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  webview: {
    flex: 1,
  },
});
