const path = require('path');

const { makeMetroConfig } = require('@rnx-kit/metro-config');

const webviewPackage = path.resolve(__dirname, '../react-native-webview');
const monorepoRoot = path.resolve(__dirname, '../..');

module.exports = makeMetroConfig({
  projectRoot: __dirname,
  watchFolders: [monorepoRoot, webviewPackage],
  resolver: {
    resolverMainFields: ['main-internal', 'browser', 'main'],
    extraNodeModules: {
      'react-native-webview': webviewPackage,
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
