import React, { useMemo, useRef, useState } from 'react';
import { Button, View, Text } from 'react-native';

import WebView from 'react-native-webview';

const NativeWebpage = () => {
  const [bg, setBg] = useState('white');
  const [statusBarStyle, setStatusBarStyle] = useState('light');
  const [uri, setUri] = useState('https://amazon.com');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const ref = useRef<typeof WebView>();

  const onBackPress = () => {
    ref.current?.goBack();
  };

  const onForwardPress = () => {
    ref.current?.goForward();
  };

  const onLoadStart = ({ nativeEvent }) => {
    console.log(nativeEvent);
    setBg(nativeEvent.background);
    setStatusBarStyle(nativeEvent.statusBarStyle);
  };

  const onNavigationStateChange = (e) => {
    setCanGoBack(e.canGoBack);
    setCanGoForward(e.canGoForward);
    setUri(e.url);
  };

  const history = useMemo(() => {
    return ['https://google.com', 'https://yahoo.com', 'https://opensea.io'];
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <Button
        title="The Verge"
        onPress={() => setUri('https://theverge.com')}
      />
      <View style={{ padding: 16, backgroundColor: bg }}>
        <Text style={{ color: statusBarStyle === 'light' ? '#000' : '#fff' }}>
          {uri}
        </Text>
      </View>
      <WebView
        ref={ref}
        source={{ uri }}
        style={{ width: '100%', flex: 1, borderWidth: 1, borderColor: 'gray' }}
        // history={history}
        // onNavigationStateChange={onNavigationStateChange}
        // onLoadStart={onLoadStart}
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
