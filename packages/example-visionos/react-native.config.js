let project;
try {
  const { configureProjects } = require('react-native-test-app');
  project = configureProjects({
    visionos: {
      sourceDir: 'visionos',
    },
  });
} catch (e) {
  project = undefined;
}

module.exports = {
  ...(project ? { project } : undefined),
};
