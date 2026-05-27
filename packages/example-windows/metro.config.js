const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { default: exclusionList } = require('metro-config/private/defaults/exclusionList');

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
    blockList: exclusionList([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
      /.*\.ProjectImports\.zip/,
    ]),
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    extraNodeModules: {
      'react-native-webview': webviewPackage,
      'example-shared': sharedPackage,
    },
    resolveRequest: (context, moduleName, platform) => {
      const defaultResolve = (name) =>
        context.resolveRequest(
          { ...context, resolveRequest: undefined },
          name,
          platform,
        );
      if (platform === 'windows') {
        if (moduleName === 'react-native') {
          return defaultResolve('react-native-windows');
        }
        if (moduleName.startsWith('react-native/')) {
          return defaultResolve(
            moduleName.replace('react-native/', 'react-native-windows/'),
          );
        }
      }
      return defaultResolve(moduleName);
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
