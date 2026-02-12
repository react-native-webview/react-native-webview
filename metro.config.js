const path = require('path');
const fs = require('fs');
const escape = require('escape-string-regexp');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const exampleDir = path.join(__dirname, 'example');
const pack = require('./package.json');
const modules = Object.keys({...pack.peerDependencies});

// Block duplicate copies of peer dependencies from the library's ROOT node_modules
const blockListPatterns = [];
modules.forEach((m) => {
  const modulePath = path.join(__dirname, 'node_modules', m);
  const escapedPath = escape(modulePath).replace(/\\\\/g, '[\\\\/]');
  blockListPatterns.push(new RegExp(`^${escapedPath}[\\\\/].*$`));
});

// Block the ENTIRE nested node_modules inside example/node_modules/react-native-webview/
// yarn file: protocol copies the library and installs its own deps there, causing
// duplicate copies of react-native-windows, react, react-native, etc. which leads to
// two separate ViewConfigRegistry instances and the "View config getter callback for
// component must be a function" error.
const nestedNodeModules = path.join(
  exampleDir, 'node_modules', 'react-native-webview', 'node_modules',
);
const escapedNested = escape(nestedNodeModules).replace(/\\\\/g, '[\\\\/]');
blockListPatterns.push(new RegExp(`^${escapedNested}[\\\\/].*$`));

// Resolve react-native-windows path for blockList
let rnwPath;
try {
  rnwPath = fs.realpathSync(
    path.resolve(require.resolve('react-native-windows/package.json'), '..'),
  );
} catch (_) {
  rnwPath = null;
}

const config = {
  projectRoot: exampleDir,
  watchFolders: [__dirname],
  resolver: {
    platforms: [...defaultConfig.resolver.platforms, 'windows'],
    resolverMainFields: ['main-internal', 'browser', 'main'],
    extraNodeModules: {
      'react-native-webview': __dirname,
      'react-native-windows': path.join(exampleDir, 'node_modules', 'react-native-windows'),
      ...modules.reduce((acc, name) => {
        acc[name] = path.join(exampleDir, 'node_modules', name);
        return acc;
      }, {}),
    },
    blockList: blockListPatterns.concat([
      // Block windows build output
      new RegExp(
        `${path.resolve(exampleDir, 'windows').replace(/[/\\]/g, '/')}.*`,
      ),
      /.*\.ProjectImports\.zip/,
      ...(rnwPath ? [
        new RegExp(`${rnwPath.replace(/\\/g, '/')}/build/.*`),
        new RegExp(`${rnwPath.replace(/\\/g, '/')}/target/.*`),
      ] : []),
    ]),

    /**
     * Redirect react-native -> react-native-windows on Windows platform.
     * Without this, Metro resolves to base react-native which doesn't have
     * Windows component configs, causing:
     *   "View config getter callback for component `RCTWebView2` must be a
     *    function (received `undefined`)"
     */
    resolveRequest: (context, moduleName, platform) => {
      if (platform === 'windows') {
        if (moduleName === 'react-native') {
          return context.resolveRequest(
            {...context, resolveRequest: undefined},
            'react-native-windows',
            platform,
          );
        }
        if (moduleName.startsWith('react-native/')) {
          const redirected = moduleName.replace(
            'react-native/',
            'react-native-windows/',
          );
          try {
            return context.resolveRequest(
              {...context, resolveRequest: undefined},
              redirected,
              platform,
            );
          } catch (e) {
            // Fall through to default resolution
          }
        }
      }
      return context.resolveRequest(
        {...context, resolveRequest: undefined},
        moduleName,
        platform,
      );
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

module.exports = mergeConfig(defaultConfig, config);
