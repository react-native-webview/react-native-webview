/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { driver, By2 } from 'selenium-appium';

const setup = require('../jest-setups/jest.setup');
jest.setTimeout(150000);

const WindowsApplicationDriverUrl = 'http://127.0.0.1:4723/wd/hub';

describe('Alert Tests', () => {
  test('Show Alert', async () => {
    await driver.startWithCapabilities(setup.capabilities, WindowsApplicationDriverUrl);
    // Make sure the Alerts tab is active; a previous suite may have left the
    // app on another tab.
    await By2.nativeName('Alerts').click();
    await new Promise((r) => setTimeout(r, 2000));
    const showAlertButton = By2.nativeName('Show alert');
    await showAlertButton.click();
    await By2.nativeName('Hello! I am an alert box!');
    // Match by name: React Native buttons do not necessarily expose the UIA
    // Button control type.
    const okButton = By2.nativeName('OK');
    await okButton.click();
    const dismissMessage = By2.nativeName('Alert dismissed!');
    expect(dismissMessage).not.toBeNull();
    await driver.quit();
  });
});
