const path = require('path');

let project;
try {
  const { configureProjects } = require('react-native-test-app');
  project = configureProjects({
    android: {
      sourceDir: 'android',
    },
    ios: {
      sourceDir: 'ios',
    },
  });
} catch (e) {
  project = undefined;
}

module.exports = {
  ...(project ? { project } : undefined),
};
