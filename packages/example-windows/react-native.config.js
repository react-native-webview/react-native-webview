const path = require('path');

module.exports = {
  dependencies: {
    'react-native-webview': {
      root: path.resolve(__dirname, '../react-native-webview'),
      platforms: {
        windows: {
          sourceDir: 'windows',
          solutionFile: 'ReactNativeWebView.sln',
          projects: [
            {
              projectFile:
                'ReactNativeWebView\\ReactNativeWebView.vcxproj',
              projectName: 'ReactNativeWebView',
              projectLang: 'cpp',
              projectGuid: '{30CADFC7-80EF-4296-A405-47E4B97C0C71}',
              directDependency: true,
              cppHeaders: ['winrt/ReactNativeWebView.h'],
              cppPackageProviders: [
                'ReactNativeWebView::ReactPackageProvider',
              ],
            },
          ],
        },
      },
    },
  },
};
