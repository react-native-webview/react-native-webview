'use strict';

if (process.argv.includes('--use-react-native-macos')) {
  process.argv = process.argv.filter(arg => arg !== '--use-react-native-macos');
  process.argv.push('--config=metro.config.macos.js');
  module.exports = {
    reactNativePath: 'node_modules/react-native-macos',
  };
}