import React, { useState } from 'react';
import { Text, View } from 'react-native';

import WebView from 'react-native-webview';
import type { WebViewErrorEvent, WebViewSource } from '../../src/WebViewTypes';

const FAILING_URL = 'https://this-host-does-not-exist.invalid/';

const SCENARIOS: {
  label: string;
  source: WebViewSource;
}[] = [
  { label: 'First load fails', source: { uri: FAILING_URL } },
  {
    label: 'Navigation from a loaded page fails',
    source: {
      html: `<script>location.href = '${FAILING_URL}';</script>`,
      baseUrl: 'https://example.com/',
    },
  },
];

export default function LoadError() {
  const [reportedUrls, setReportedUrls] = useState<Record<string, string>>({});

  return (
    <View style={{ flex: 1 }}>
      <Text>{`Expected url: ${FAILING_URL}`}</Text>
      {SCENARIOS.map(({ label, source }) => (
        <View
          key={label}
          style={{ flex: 1 }}
        >
          <Text>{label}</Text>
          <Text testID={`${label}-url`}>
            {`onError url: ${reportedUrls[label] === undefined ? '(not called yet)' : JSON.stringify(reportedUrls[label])}`}
          </Text>
          <WebView
            style={{ flex: 1 }}
            source={source}
            onError={({ nativeEvent }: WebViewErrorEvent) => {
              setReportedUrls((current) => ({ ...current, [label]: nativeEvent.url }));
            }}
          />
        </View>
      ))}
    </View>
  );
}
