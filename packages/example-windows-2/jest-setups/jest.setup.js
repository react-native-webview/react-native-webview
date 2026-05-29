import { windowsAppDriverCapabilities } from 'selenium-appium';

const { platform } = require('./jest.setup.windows');

switch (platform) {
  case 'windows': {
    const appId =
      process.env.WINDOWS_APP_ID ||
      '40411fc5-8e92-4d46-b68d-b62df44b1366_3x6rhkkr9xcf6!App';
    module.exports = {
      capabilities: {
        ...windowsAppDriverCapabilities(appId),
        createSessionTimeout: 60000,
        'ms:waitForAppLaunch': 25,
      },
    };
    break;
  }
  default:
    throw new Error('Unknown platform: ' + platform);
}
