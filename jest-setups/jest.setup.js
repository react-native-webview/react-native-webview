import { windowsAppDriverCapabilities } from 'selenium-appium';

const { platform } = require('./jest.setup.windows');

switch (platform) {
  case 'windows': {
    if (process.env.WEBVIEW_APP_HANDLE) {
      // Attach to an already-running app by top-level window handle. Used in
      // CI, where the app is launched beforehand: WinAppDriver only waits a
      // few seconds for a window when it launches the app itself, which a
      // cold start (WebView2 + Hermes init) can exceed.
      module.exports = {
        capabilities: {
          browserName: '',
          platformName: 'windows',
          deviceName: 'WindowsPC',
          appTopLevelWindow: process.env.WEBVIEW_APP_HANDLE,
        },
      };
      break;
    }
    // The New Architecture (Win32/WinAppSDK) test app is launched by
    // Application User Model ID or executable path; WinAppDriver accepts
    // either in the `app` capability.
    const path = require('path');
    const appPath =
      process.env.WEBVIEW_APP_PATH ||
      path.resolve(
        __dirname,
        '..',
        'example',
        'windows',
        'ReactApp.Package',
        'bin',
        'x64',
        'Release',
        'ReactApp',
        'ReactApp.exe',
      );
    module.exports = {
      capabilities: windowsAppDriverCapabilities(appPath),
    };
    break;
  }
  default:
    throw 'Unknown platform: ' + platform;
}
