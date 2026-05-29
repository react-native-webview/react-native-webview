const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const monorepoRoot = path.resolve(__dirname, '../..');
const defaultConfig = getDefaultConfig(__dirname);

const blockList = new RegExp(
  [
    /node_modules\/.*\/node_modules\/react-native\/.*/.source,
    /.*\.ProjectImports\.zip/.source,
  ].join('|'),
);

const config = {
  projectRoot: __dirname,
  watchFolders: [monorepoRoot],
  resolver: {
    platforms: [...(defaultConfig.resolver?.platforms || []), 'windows'],
    resolverMainFields: ['main-internal', 'browser', 'main'],
    blockList,
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
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
