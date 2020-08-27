import { windowsAppDriverCapabilities } from 'selenium-appium'

switch (platform) {
    case "windows":
        const webViewWindowsAppId = 'WebViewWindows_3x6rhkkr9xcf6!App';
        module.exports = {
            capabilites: windowsAppDriverCapabilities(webViewWindowsAppId)
        }
        break;
    default:
        throw "Unknown platform: " + platform;
}