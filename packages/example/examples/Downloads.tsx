import React, { useCallback } from 'react';
import { Alert, Platform, View } from 'react-native';

import WebView, { FileDownload } from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Downloads</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
    </style>
  </head>
  <body>
    <a href="https://www.7-zip.org/a/7za920.zip">Example zip file download</a>
    <br>
    <a href="http://test.greenbytes.de/tech/tc2231/attwithisofn2231iso.asis">Download file with non-ascii filename: "foo-ä.html"</a>
  </body>
</html>
`;

export default function Downloads() {
  const onFileDownload = useCallback(({ nativeEvent }: { nativeEvent: FileDownload }) => {
    Alert.alert('File download detected', nativeEvent.downloadUrl);
  }, []);

  const platformProps = Platform.select({
    ios: {
      onFileDownload,
    },
  });

  return (
    <View style={{ height: 120 }}>
      <WebView
        source={{ html: HTML }}
        automaticallyAdjustContentInsets={false}
        {...platformProps}
      />
    </View>
  );
}
