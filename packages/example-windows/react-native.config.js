let project;
try {
  const { configureProjects } = require('react-native-test-app');
  project = configureProjects({
    windows: {
      sourceDir: 'windows',
      solutionFile: 'windows/WebviewExample.sln',
    },
  });
} catch (e) {
  project = undefined;
}

module.exports = {
  ...(project ? { project } : undefined),
};
