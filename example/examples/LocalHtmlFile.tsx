import React, { Component, useEffect, useState } from 'react';
import { View, Text, Alert, TextInput, Button } from 'react-native';
import WebView from 'react-native-webview';
import { Dirs, FileSystem } from 'react-native-file-access';

const path = `${Dirs.DocumentDir}/test.html`;

// eslint-disable-next-line import/prefer-default-export
export const LocalHtmlFile = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    FileSystem.writeFile(
      path,
      '<html><h1>File Access is working if you are reading this.</h1></html>',
      'utf8',
    ).then(() => {
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
