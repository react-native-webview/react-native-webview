const path = require('path');

const project = (() => {
  try {
    const {configureProjects} = require('react-native-test-app');
    return configureProjects({
      android: {
        sourceDir: 'android',
      },
      ios: {
        sourceDir: 'ios',
      },
      windows: {
        sourceDir: 'windows',
        solutionFile: 'ReactNativeWebviewExample.sln',
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? {project} : undefined),
  dependencies: {
    'react-native-webview': {
      root: path.resolve(__dirname, '..'),
      platforms: {
        windows: {
          sourceDir: 'windows',
          solutionFile: 'ReactNativeWebView.sln',
          projects: [
            {
              projectFile: 'ReactNativeWebView\\ReactNativeWebView.vcxproj',
              projectName: 'ReactNativeWebView',
              projectLang: 'cpp',
              projectGuid: '{30CADFC7-80EF-4296-A405-47E4B97C0C71}',
              directDependency: true,
              cppHeaders: ['winrt/ReactNativeWebView.h'],
              cppPackageProviders: ['ReactNativeWebView::ReactPackageProvider'],
            },
          ],
        },
      },
    },
  },
};
