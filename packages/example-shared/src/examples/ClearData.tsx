import React, { useRef } from 'react';
import { View, Button } from 'react-native';

import WebView from 'react-native-webview';

export default function ClearData() {
  const webViewRef = useRef<WebView>(null);

  const clearCacheAndReload = (includeDiskFiles: boolean) => {
    webViewRef.current?.clearCache(includeDiskFiles);
    webViewRef.current?.reload();
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
        onPress={() => webViewRef.current?.reload()}
      />
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://www.theguardian.com/international' }}
        incognito={false}
      />
    </View>
  );
}
