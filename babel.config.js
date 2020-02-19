module.exports = function(api) {
  api && api.cache(false);
  return {
    env: {
      test: {
        presets: ['module:metro-react-native-babel-preset'],
      },
    },
    presets: ['module:metro-react-native-babel-preset'],
  };
};
