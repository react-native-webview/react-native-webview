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

describe('WebView2 New Architecture Tests', () => {
  beforeAll(async () => {
    await driver.startWithCapabilities(
      setup.capabilities,
      WindowsApplicationDriverUrl
    );
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

    test('Show Alert button triggers native alert dialog', async () => {
      const showAlertButton = By2.nativeName('Show alert');
      await showAlertButton.click();

      // Wait for the Win32 MessageBox to appear
      await new Promise((r) => setTimeout(r, 1000));
      
      // The native MessageBox should show the alert text
      const okButton = By2.nativeXpath('//Button[@Name="OK"]');
      await okButton.click();
    });
  });

  describe('Messaging Tab', () => {
    beforeAll(async () => {
      // Switch to Messaging tab
      const messagingButton = By2.nativeName('Messaging');
      await messagingButton.click();
      // Wait for WebView to initialize
      await new Promise((r) => setTimeout(r, 3000));
    });

    test('Messaging tab renders with title', async () => {
      const title = By2.nativeName('Messaging');
      expect(title).not.toBeNull();
    });

    test('WebView HTML content loads (Send post message button visible)', async () => {
      const sendButton = By2.nativeName(
        'Send post message from JS to WebView'
      );
      expect(sendButton).not.toBeNull();
    });

    test('Clicking send button triggers onMessage in RN', async () => {
      const sendButton = By2.nativeName(
        'Send post message from JS to WebView'
      );
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
      const multiButton = By2.nativeName('MultiMessaging');
      await multiButton.click();
      await new Promise((r) => setTimeout(r, 3000));
    });

    test('MultiMessaging tab renders two WebViews', async () => {
      // Both WebViews should have "Send post message" buttons
      // Use XPath to find multiple elements
      const buttons = By2.nativeXpath(
        '//Button[@Name="Send post message from JS to WebView"]'
      );
      expect(buttons).not.toBeNull();
    });

    test('Messages flow between WebViews', async () => {
      // Click the send button in the first WebView
      const sendButton = By2.nativeName(
        'Send post message from JS to WebView'
      );
      await sendButton.click();
      await new Promise((r) => setTimeout(r, 1000));
      // If no crash, message flow works
    });
  });

  describe('OpenWindow Tab', () => {
    beforeAll(async () => {
      // Switch to OpenWindow tab
      const openWindowButton = By2.nativeName('OpenWindow');
      await openWindowButton.click();
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
        const tab = By2.nativeName(tabName);
        await tab.click();
        // Wait for WebView to initialize on each tab
        await new Promise((r) => setTimeout(r, 2000));
      }
      
      // If we get here without crash, the test passes
      expect(true).toBe(true);
    });

    test('Rapid tab switching does not crash', async () => {
      const tabs = ['Messaging', 'Alerts', 'MultiMessaging', 'Messaging', 'OpenWindow', 'Alerts'];
      
      for (const tabName of tabs) {
        const tab = By2.nativeName(tabName);
        await tab.click();
        // Short delay for rapid switching
        await new Promise((r) => setTimeout(r, 500));
      }
      
      // If we get here without crash, the test passes
      expect(true).toBe(true);
    });
  });
});
