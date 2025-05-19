module.exports = function(api) {
  api && api.cache(false);
  return {
    env: {
      test: {
        presets: ['module:@react-native/babel-preset'],
      },
    },
    presets: ['module:@react-native/babel-preset'],
  };
};
