const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const fs = require('fs');
const path = require('path');
const escape = require('escape-string-regexp');

const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-windows/package.json'), '..'),
);

// Path to the library
const libraryPath = path.resolve(__dirname, '..');
const pack = require('../package.json');
const modules = Object.keys({...pack.peerDependencies});

const defaultConfig = getDefaultConfig(__dirname);

// Block duplicate copies of peer dependencies from the library's ROOT node_modules
const blockListPatterns = modules.map((m) => {
  const modulePath = path.join(libraryPath, 'node_modules', m);
  const escapedPath = escape(modulePath).replace(/\\\\/g, '[\\\\/]');
  return new RegExp(`^${escapedPath}[\\\\/].*$`);
});

// Block the ENTIRE copy of react-native-webview inside example/node_modules/.
// yarn's file: protocol copies the library there, but that copy is stale — it
// doesn't reflect live edits to ../src/.  More critically, its
// RCTWebView2NativeComponent.ts may have a different export pattern than the
// working copy, which causes babel-plugin-codegen to fail to generate the
// static view config (leading to "View config not found for component
// 'RCTWebView2'" in Bridgeless/Fabric mode).
const nestedLibraryCopy = path.join(
  __dirname, 'node_modules', 'react-native-webview',
);
const escapedNested = escape(nestedLibraryCopy).replace(/\\\\/g, '[\\\\/]');
blockListPatterns.push(new RegExp(`^${escapedNested}[\\\\/].*$`));

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
    platforms: [...defaultConfig.resolver.platforms, 'windows'],

    blockList: blockListPatterns.concat([
      // This stops "npx @react-native-community/cli run-windows" from causing the metro server to crash if its already running
      new RegExp(
        `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`,
      ),
      // This prevents "npx @react-native-community/cli run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
      new RegExp(`${rnwPath.replace(/\\/g, '/')}/build/.*`),
      new RegExp(`${rnwPath.replace(/\\/g, '/')}/target/.*`),
      /.*\.ProjectImports\.zip/,
    ]),

    // Force resolution of these packages from example's node_modules
    extraNodeModules: {
      'react-native-windows': path.resolve(__dirname, 'node_modules/react-native-windows'),
      // Point to the live library root so Metro uses ../src/ (not the stale copy
      // in example/node_modules/react-native-webview/ which is blockListed above).
      'react-native-webview': libraryPath,
      ...modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
    },

    /**
     * Redirect react-native -> react-native-windows on Windows platform.
     * This is required because codegenNativeComponent imports from
     * react-native/Libraries/... which must resolve to react-native-windows
     * equivalents for view config registration to work correctly.
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
