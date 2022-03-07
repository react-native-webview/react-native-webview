/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { driver, By2 } from 'selenium-appium'

const setup = require('../jest-setups/jest.setup');
jest.setTimeout(150000);

const WindowsApplicationDriverUrl = "http://127.0.0.1:4723/wd/hub";

describe('Alert Tests', () => {
  
  test('Show Alert', async () => {
    await driver.startWithCapabilities(setup.capabilities, WindowsApplicationDriverUrl);
    const showAlertButton = By2.nativeName('Show alert');
    await showAlertButton.click();
    await By2.nativeName('Hello! I am an alert box!');
    // await By2.nativeName('OK').click(); All alerts will be automatically dismissed as Windows Webview does not have support for Alerts https://github.com/MicrosoftDocs/winrt-api/blob/docs/windows.ui.xaml.controls/webview.md#use-of-alert
    const dismissMessage = By2.nativeName('Alert dismissed!');
    expect(dismissMessage).not.toBeNull();
    await driver.quit();
  });
});