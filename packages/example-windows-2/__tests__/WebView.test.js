import { driver, By2 } from 'selenium-appium';

const setup = require('../jest-setups/jest.setup');
jest.setTimeout(150000);

const WindowsApplicationDriverUrl = 'http://127.0.0.1:4723/wd/hub';

async function waitForNativeName(name, timeoutMs = 20000) {
  const start = Date.now();
  let lastError;

  while (Date.now() - start < timeoutMs) {
    try {
      const element = By2.nativeName(name);
      if (element) {
        return element;
      }
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw lastError || new Error(`Element "${name}" was not found`);
}

describe('Example Windows 2 WebView', () => {
  beforeAll(async () => {
    await driver.startWithCapabilities(setup.capabilities, WindowsApplicationDriverUrl);
    await waitForNativeName('Example Windows 2');
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('loads WebView2 content and receives messages from the webview', async () => {
    await waitForNativeName('Example Windows 2 WebView');
    const button = await waitForNativeName('Ping from WebView');

    await button.click();

    await waitForNativeName('WebView message: ping');
  });
});
