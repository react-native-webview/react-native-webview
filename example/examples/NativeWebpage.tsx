import React, { useRef, useState } from 'react';
import { Button, View, Text } from 'react-native';

import WebView from 'react-native-webview';

const NativeWebpage = () => {
  const [uri, setUri] = useState('https://opensea.io');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const ref = useRef<typeof WebView>();

  const onBackPress = () => {
    ref.current?.goBack();
  };

  const onForwardPress = () => {
    ref.current?.goForward();
  };

  const onNavigationStateChange = (e) => {
    setCanGoBack(e.canGoBack);
    setCanGoForward(e.canGoForward);
    setUri(e.url);
  };

  return (
    <View style={{ height: '100%' }}>
      <View style={{ padding: 16, borderWidth: 1, borderColor: 'gray' }}>
        <Text>{uri}</Text>
      </View>
      <WebView
        ref={ref}
        source={{ uri }}
        style={{ width: '100%', flex: 1, borderWidth: 1, borderColor: 'gray' }}
        history={[
          'https://google.com',
          'https://yahoo.com',
          'https://opensea.io',
        ]}
        onNavigationStateChange={onNavigationStateChange}
        // blockAds={false}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ padding: 16, width: '50%' }}>
          <Button title="Back" onPress={onBackPress} disabled={!canGoBack} />
        </View>
        <View style={{ padding: 16, width: '50%' }}>
          <Button
            title="Forward"
            onPress={onForwardPress}
            disabled={!canGoForward}
          />
        </View>
      </View>
    </View>
  );
};

export default NativeWebpage;
