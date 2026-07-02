import { windowsAppDriverCapabilities } from 'selenium-appium';

const { platform } = require('./jest.setup.windows');

switch (platform) {
  case 'windows': {
    // The New Architecture (Win32/WinAppSDK) test app is launched by
    // executable path; WinAppDriver accepts either an app ID or an exe path
    // in the `app` capability.
    const path = require('path');
    const appPath =
      process.env.WEBVIEW_APP_PATH ||
      path.resolve(
        __dirname,
        '..',
        'example',
        'windows',
        'x64',
        'Release',
        'WebviewExample',
        'WebviewExample.exe',
      );
    module.exports = {
      capabilities: windowsAppDriverCapabilities(appPath),
    };
    break;
  }
  default:
    throw 'Unknown platform: ' + platform;
}
