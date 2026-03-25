const path = require('path');

let project;
try {
  const { configureProjects } = require('react-native-test-app');
  project = configureProjects({
    windows: {
      sourceDir: 'windows',
    },
  });
} catch (_) {
  project = undefined;
}

module.exports = {
  ...(project ? { project } : undefined),
};
