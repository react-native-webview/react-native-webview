'use strict';

if (process.argv.includes('--use-react-native-macos')) {
  process.argv = process.argv.filter(arg => arg !== '--use-react-native-macos');

  module.exports = {
    reactNativePath: 'node_modules/react-native-macos',
  };
}