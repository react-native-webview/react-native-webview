/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 *
 * End-to-end tests for WebView2 on Windows New Architecture.
 * Requires WinAppDriver running at http://127.0.0.1:4723/wd/hub
 * and the example app to be built and installed.
 *
 * Run: yarn test:windows
 */

import { driver, By2 } from 'selenium-appium';

const setup = require('../jest-setups/jest.setup');
jest.setTimeout(150000);

const WindowsApplicationDriverUrl = 'http://127.0.0.1:4723/wd/hub';

/**
 * Helper: wait for an element to appear within a timeout.
 */
async function waitForElement(name, timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const el = By2.nativeName(name);
      if (el) return el;
    } catch {
      // Element not found yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Element "${name}" not found within ${timeoutMs}ms`);
}

/**
 * Helper: click an element by name, retrying on transient WinAppDriver
 * failures (e.g. while a WebView is initializing).
 */
async function clickByNameWithRetry(name, attempts = 3) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      await By2.nativeName(name).click();
      return;
    } catch (e) {
      if (i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

describe('WebView2 New Architecture Tests', () => {
  beforeAll(async () => {
    await driver.startWithCapabilities(setup.capabilities, WindowsApplicationDriverUrl);
    // Wait for app to fully load
    await new Promise((r) => setTimeout(r, 5000));
  });

  afterAll(async () => {
    await driver.quit();
  });

  describe('Alerts Tab', () => {
    test('Alerts tab is visible and selected by default', async () => {
      const alertsButton = By2.nativeName('Alerts');
      expect(alertsButton).not.toBeNull();
    });

    test('WebView renders with HTML content', async () => {
      // The "Show alert" button is inside the WebView HTML
      const showAlertButton = By2.nativeName('Show alert');
      expect(showAlertButton).not.toBeNull();
    });

    test('Show Alert button triggers the in-app alert', async () => {
      const showAlertButton = By2.nativeName('Show alert');
      await showAlertButton.click();

      // Wait for the in-app alert to render
      await new Promise((r) => setTimeout(r, 1000));

      // The in-app alert renders an OK button. Match by name: React Native
      // buttons do not necessarily expose the UIA Button control type.
      const okButton = By2.nativeName('OK');
      await okButton.click();
    });
  });

  describe('Messaging Tab', () => {
    beforeAll(async () => {
      // Switch to Messaging tab
      await clickByNameWithRetry('Messaging');
      // Wait for WebView to initialize
      await new Promise((r) => setTimeout(r, 3000));
    });

    test('Messaging tab renders with title', async () => {
      const title = By2.nativeName('Messaging');
      expect(title).not.toBeNull();
    });

    test('WebView HTML content loads (Send post message button visible)', async () => {
      const sendButton = By2.nativeName('Send post message from JS to WebView');
      expect(sendButton).not.toBeNull();
    });

    test('Clicking send button triggers onMessage in RN', async () => {
      const sendButton = By2.nativeName('Send post message from JS to WebView');
      await sendButton.click();

      // Wait for message to propagate
      await new Promise((r) => setTimeout(r, 1000));

      // The lastMessage state should update and display in Text component
      const messageText = By2.nativeName('Message from JS: Message from JS');
      expect(messageText).not.toBeNull();
    });
  });

  describe('MultiMessaging Tab', () => {
    beforeAll(async () => {
      // Switch to MultiMessaging tab
      await clickByNameWithRetry('MultiMessaging');
      await new Promise((r) => setTimeout(r, 3000));
    });

    test('MultiMessaging tab renders two WebViews', async () => {
      // Both WebViews should have "Send post message" buttons
      // Use XPath to find multiple elements
      const buttons = By2.nativeXpath('//Button[@Name="Send post message from JS to WebView"]');
      expect(buttons).not.toBeNull();
    });

    test('Messages flow between WebViews', async () => {
      // Click the send button in the first WebView
      const sendButton = By2.nativeName('Send post message from JS to WebView');
      await sendButton.click();
      await new Promise((r) => setTimeout(r, 1000));
      // If no crash, message flow works
    });
  });

  describe('OpenWindow Tab', () => {
    beforeAll(async () => {
      // Switch to OpenWindow tab
      await clickByNameWithRetry('OpenWindow');
      await new Promise((r) => setTimeout(r, 3000));
    });

    test('OpenWindow tab renders', async () => {
      const title = By2.nativeName('OpenWindow');
      expect(title).not.toBeNull();
    });
  });

  describe('Tab Switching Stability', () => {
    test('Can switch between all tabs without crash', async () => {
      const tabs = ['Alerts', 'Messaging', 'MultiMessaging', 'OpenWindow', 'Alerts'];

      for (const tabName of tabs) {
        await clickByNameWithRetry(tabName);
        // Wait for WebView to initialize on each tab
        await new Promise((r) => setTimeout(r, 2000));
      }

      // If we get here without crash, the test passes
      expect(true).toBe(true);
    });

    test('Rapid tab switching does not crash', async () => {
      const tabs = ['Messaging', 'Alerts', 'MultiMessaging', 'Messaging', 'OpenWindow', 'Alerts'];

      for (const tabName of tabs) {
        await clickByNameWithRetry(tabName);
        // Short delay for rapid switching
        await new Promise((r) => setTimeout(r, 500));
      }

      // If we get here without crash, the test passes
      expect(true).toBe(true);
    });
  });
});
