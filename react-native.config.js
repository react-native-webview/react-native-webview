'use strict';

module.exports = {
  project: {
    android: {
      sourceDir: './example/android',
    },
    windows: {
      sourceDir: './example/windows',
      solutionFile: 'ReactNativeWebviewExample.sln',
      project: {
        projectFile: 'ReactNativeWebviewExample/ReactNativeWebviewExample.vcxproj',
      },
    },
  },
  dependency: {
    platforms: {
      android: {
        componentDescriptors: ['RNCWebViewComponentDescriptor'],
        cmakeListsPath: '../android/src/main/jni/CMakeLists.txt',
      },
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
};
