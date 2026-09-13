const { getPlatformResolver } = require('@callstack/out-of-tree-platforms');

module.exports = require('../../scripts/metro-config')(
  __dirname,
  getPlatformResolver({
    platformNameMap: { visionos: '@reactvision/react-native-visionos' },
  }),
);
