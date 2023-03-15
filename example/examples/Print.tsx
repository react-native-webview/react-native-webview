import React, { useRef } from 'react';
import { Button, View, Text } from 'react-native';

import WebView from 'react-native-webview';

export default function Print() {
  const ref = useRef<WebView>(null);

  const [result, setResult] = React.useState<string | undefined>(undefined);

  return (
    <View>
      <View style={{ height: 120, width: 400 }}>
        <WebView
          ref={ref}
          source={{ uri: 'https://infinite.red' }}
          automaticallyAdjustContentInsets={false}
          onPrint={(res) => {
            if (res.nativeEvent.file) setResult(res.nativeEvent.file);
            if (res.nativeEvent.error) console.log(res.nativeEvent.error);
          }}
        />
      </View>
      <Button
        title="Print"
        onPress={() => {
          ref.current?.print({ name: 'output.pdf', isLandscape: true });
        }}
      />
      <Text>{result ? `output file is stored at ${result}` : ''}</Text>
    </View>
  );
}
