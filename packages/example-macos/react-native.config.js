let project;
try {
  const { configureProjects } = require('react-native-test-app');
  project = configureProjects({
    macos: {
      sourceDir: 'macos',
    },
  });
} catch (e) {
  project = undefined;
}

module.exports = {
  ...(project ? { project } : undefined),
};
