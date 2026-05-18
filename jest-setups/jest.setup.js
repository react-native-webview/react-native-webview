import { windowsAppDriverCapabilities } from 'selenium-appium';

const { platform } = require('./jest.setup.windows');

switch (platform) {
  case 'windows':
    // For New Architecture (Win32/WinAppSDK cpp-app), use the executable path.
    // For old architecture (UWP), use the App ID: 'WebViewWindows_3x6rhkkr9xcf6!App'
    const isNewArch = process.env.RNW_NEW_ARCH === 'true';
    
    if (isNewArch) {
      // Win32 app - use executable path
      const appPath = process.env.WEBVIEW_APP_PATH || 
        'D:\\react-native-webview\\example\\windows\\x64\\Debug\\ReactNativeWebviewExample.exe';
      module.exports = {
        capabilities: {
          platformName: 'Windows',
          'appium:app': appPath,
          'appium:deviceName': 'WindowsPC',
        },
      };
    } else {
      // Legacy UWP app
      const webViewWindowsAppId = 'WebViewWindows_3x6rhkkr9xcf6!App';
      module.exports = {
        capabilities: windowsAppDriverCapabilities(webViewWindowsAppId),
      };
    }
    break;
  default:
    throw 'Unknown platform: ' + platform;
}
