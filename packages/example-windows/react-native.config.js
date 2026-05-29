const { configureProjects } = require('react-native-test-app');

module.exports = {
  project: configureProjects({
    windows: {
      sourceDir: 'windows',
      solutionFile: 'windows/ExampleWindows2.sln',
    },
  }),
  dependencies: {},
};
