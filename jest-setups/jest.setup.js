import { windowsAppDriverCapabilities } from 'selenium-appium'

const { platform } = require('./jest.setup.windows');

switch (platform) {
    case "windows":
        const webViewWindowsAppId = 'WebViewWindows_3x6rhkkr9xcf6!App';
        module.exports = {
            capabilities: windowsAppDriverCapabilities(webViewWindowsAppId)
        }
        break;
    default:
        throw "Unknown platform: " + platform;
}
