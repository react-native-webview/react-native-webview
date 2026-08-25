import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WebView from 'react-native-webview';

type PerformanceMetricEvent = Parameters<
  NonNullable<React.ComponentProps<typeof WebView>['onPerformanceMetric']>
>[0];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  const onPerformanceMetric = ({ nativeEvent }: PerformanceMetricEvent) => {
    setMetrics((current) => ({
      ...current,
      [nativeEvent.metric]: nativeEvent.durationMillis,
    }));
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://reactnative.dev' }}
        onPerformanceMetric={onPerformanceMetric}
      />
      <Text>FCP: {metrics.firstContentfulPaint ?? 'pending'} ms</Text>
      <Text>LCP: {metrics.largestContentfulPaint ?? 'pending'} ms</Text>
    </View>
  );
}
