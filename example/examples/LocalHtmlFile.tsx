import React, { Component, useEffect, useState } from 'react';
import { View, Text, Alert, TextInput, Button } from 'react-native';
import WebView from 'react-native-webview';
import ReactNativeBlobUtil from 'react-native-blob-util';

const path = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/test.html`;

// eslint-disable-next-line import/prefer-default-export
export const LocalHtmlFile = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    ReactNativeBlobUtil.fs
      .writeFile(
        path,
        '<html><h1>File Access is working if you are reading this.</h1></html>',
        'utf8',
      )
      .then(() => {
        setReady(true);
      });
  }, []);
  return ready ? (
    <WebView
      allowFileAccess
      originWhitelist={['file://*']}
      source={{ uri: path }}
    />
  ) : (
    <View />
  );
};
