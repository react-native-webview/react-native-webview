/**
 * This cli config is needed for development purposes, e.g. for running
 * integration tests during local development or on CI services.
 */

const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver: {
    platforms: ['macos', 'ios', 'android'],
    blacklistRE: blacklist([/node_modules\/react-native\/.*/])
  },
};
