import { windowsAppDriverCapabilities } from 'selenium-appium'

const { platform } = require('./jest.setup.windows');

switch (platform) {
    case "windows":
        const webViewWindowsAppId = '40411fc5-8e92-4d46-b68d-b62df44b1366_3x6rhkkr9xcf6!App';
        module.exports = {
            capabilities: windowsAppDriverCapabilities(webViewWindowsAppId)
        }
        break;
    default:
        throw "Unknown platform: " + platform;
}
