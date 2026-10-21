import React, { useRef } from 'react';
import { View, Button } from 'react-native';

import WebView from 'react-native-webview';

export default function ClearData() {
  const webView = useRef<WebView | null>(null);

  const clearCacheAndReload = (includeDiskFiles: boolean) => {
    webView.current?.clearCache(includeDiskFiles);
    webView.current?.reload();
  };

  const reload = () => {
    webView.current?.reload();
  };

  return (
    <View style={{ height: 1000 }}>
      <Button
        title="Clear cache (diskFiles)"
        onPress={() => clearCacheAndReload(true)}
      />
      <Button
        title="Clear cache (no diskFiles)"
        onPress={() => clearCacheAndReload(false)}
      />
      <Button
        title="Reload"
        onPress={reload}
      />
      <WebView
        ref={webView}
        source={{ uri: 'https://www.theguardian.com/international' }}
        incognito={false}
      />
    </View>
  );
}
