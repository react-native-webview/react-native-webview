const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const fs = require('fs');
const path = require('node:path');

const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-windows/package.json'), '..'),
);

// Path to the library
const libraryPath = path.resolve(__dirname, '..');

//

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = {
  // Watch the parent library folder
  watchFolders: [libraryPath],
  resolver: {
    blockList: [
      // This stops "npx @react-native-community/cli run-windows" from causing the metro server to crash if its already running
      new RegExp(
        `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`,
      ),
      // This prevents "npx @react-native-community/cli run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
      new RegExp(`${rnwPath}/build/.*`),
      new RegExp(`${rnwPath}/target/.*`),
      /.*\.ProjectImports\.zip/,
      // Block the library's node_modules to avoid duplicate packages
      new RegExp(`${libraryPath.replace(/[/\\]/g, '/')}/node_modules/react/.*`),
      new RegExp(`${libraryPath.replace(/[/\\]/g, '/')}/node_modules/react-native/.*`),
      new RegExp(`${libraryPath.replace(/[/\\]/g, '/')}/node_modules/react-native-windows/.*`),
    ],
    // Force resolution of these packages from example's node_modules
    extraNodeModules: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      'react-native-windows': path.resolve(__dirname, 'node_modules/react-native-windows'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
