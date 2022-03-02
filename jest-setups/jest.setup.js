import { windowsAppDriverCapabilities } from 'selenium-appium'

const { platform } = require('./jest.setup.windows');

switch (platform) {
    case "windows":
        const webViewWindowsAppId = 'ReactTestApp!App';
        module.exports = {
            capabilities: windowsAppDriverCapabilities(webViewWindowsAppId)
        }
        break;
    default:
        throw "Unknown platform: " + platform;
}
