const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const monorepoRoot = path.resolve(__dirname, '../..');
const webviewPackage = path.resolve(__dirname, '../react-native-webview');
const sharedPackage = path.resolve(__dirname, '../example-shared');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  projectRoot: __dirname,
  watchFolders: [monorepoRoot, webviewPackage, sharedPackage],
  resolver: {
    platforms: [...(defaultConfig.resolver?.platforms || []), 'windows'],
    resolverMainFields: ['main-internal', 'browser', 'main'],
    extraNodeModules: {
      'react-native-webview': webviewPackage,
      'example-shared': sharedPackage,
    },
    resolveRequest: (context, moduleName, platform) => {
      if (platform === 'windows' && moduleName === 'react-native') {
        return context.resolveRequest(
          { ...context, resolveRequest: undefined },
          'react-native-windows',
          platform,
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
