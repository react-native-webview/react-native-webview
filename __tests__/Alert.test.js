/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { driver, By2 } from 'selenium-appium'
import { until } from 'selenium-webdriver';

const setup = require('../jest-setups/jest.setup');
jest.setTimeout(50000);

beforeAll(() => {
  return driver.startWithCapabilities(setup.capabilites);
});

afterAll(() => {
  return driver.quit();
});

describe('Alert Tests', () => {
  
  test('Show Alert', async () => {
    const showAlertButton = await driver.wait(until.elementLocated(By2.nativeName('Show alert')));
    await showAlertButton.click();
    await driver.wait(until.elementLocated(By2.nativeName('Hello! I am an alert box!')));
    await By2.nativeName('OK').click();
    const dismissMessage = await driver.wait(until.elementLocated(By2.nativeName('Alert dismissed!')));
    expect(dismissMessage).not.toBeNull();
  });

});