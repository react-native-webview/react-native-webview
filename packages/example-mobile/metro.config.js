const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const monorepoRoot = path.resolve(__dirname, '../..');
const webviewPackage = path.resolve(__dirname, '../react-native-webview');
const sharedPackage = path.resolve(__dirname, '../example-shared');

const config = {
  watchFolders: [monorepoRoot, webviewPackage, sharedPackage],
  resolver: {
    resolverMainFields: ['main-internal', 'browser', 'main'],
    extraNodeModules: {
      'react-native-webview': webviewPackage,
      'example-shared': sharedPackage,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
