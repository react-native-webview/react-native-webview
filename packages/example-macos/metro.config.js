const path = require('path');

const { makeMetroConfig } = require('@rnx-kit/metro-config');

const monorepoRoot = path.resolve(__dirname, '../..');
const webviewPackage = path.resolve(__dirname, '../react-native-webview');
const sharedPackage = path.resolve(__dirname, '../example-shared');

module.exports = makeMetroConfig({
  projectRoot: __dirname,
  watchFolders: [monorepoRoot, webviewPackage, sharedPackage],
  resolver: {
    resolverMainFields: ['main-internal', 'browser', 'main'],
    extraNodeModules: {
      'react-native-webview': webviewPackage,
      'example-shared': sharedPackage,
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
