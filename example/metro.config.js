const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const fs = require('fs');
const path = require('path');
const escape = require('escape-string-regexp');
const pack = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys({ ...pack.peerDependencies });

const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-windows/package.json'), '..')
);

// Block peer deps AND react-native-windows from the library ROOT node_modules.
// Without this, Metro bundles two copies of react-native-windows (one from root,
// one from example/) — each with its own ReactNativeViewConfigRegistry Map.
// Our NativeComponentRegistry.get() registers on Map A, but the Renderer reads
// from Map B → "View config getter callback must be a function (received undefined)".
const modulesToBlock = [...modules, 'react-native-windows'];
const blockListPatterns = modulesToBlock.map((m) => {
  const modulePath = path.join(root, 'node_modules', m);
  const escapedPath = escape(modulePath).replace(/\\\\/g, '[\\\\/]');
  const pattern = `^${escapedPath}[\\\\/].*$`;
  return new RegExp(pattern);
});

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 */
const config = {
  watchFolders: [root],

  resolver: {
    platforms: [... defaultConfig.resolver.platforms, 'windows'],
    sourceExts: [...defaultConfig.resolver.sourceExts],

    blockList: blockListPatterns.concat([
      new RegExp(
        `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`
      ),
      new RegExp(`${rnwPath.replace(/\\/g, '/')}/build/.*`),
      new RegExp(`${rnwPath.replace(/\\/g, '/')}/target/.*`),
      /.*\.ProjectImports\.zip/,
      // Block the entire nested node_modules inside react-native-webview to prevent
      // duplicate copies of react, react-native, react-native-windows, etc.
      new RegExp(
        `${escape(path.resolve(__dirname, 'node_modules', 'react-native-webview', 'node_modules')).replace(/\\\\/g, '[\\\\/]')}[\\\\/].*`
      ),
    ]),

    extraNodeModules: {
      'react-native-windows': path.resolve(__dirname, 'node_modules/react-native-windows'),
      'react-native-webview': root,
      ...modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
    },

    resolveRequest: (context, moduleName, platform) => {
      // Only apply redirects for Windows platform
      if (platform === 'windows') {
        // Redirect bare 'react-native' to 'react-native-windows'
        if (moduleName === 'react-native') {
          return context.resolveRequest(
            { ...context, resolveRequest: undefined },
            'react-native-windows',
            platform
          );
        }

        // Redirect react-native/* paths to react-native-windows/*
        if (moduleName.startsWith('react-native/')) {
          const redirected = moduleName.replace('react-native/', 'react-native-windows/');
          try {
            return context.resolveRequest(
              { ...context, resolveRequest: undefined },
              redirected,
              platform
            );
          } catch (e) {
            // Fall through to default resolution
          }
        }
      }

      return context.resolveRequest(
        { ...context, resolveRequest:  undefined },
        moduleName,
        platform
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
