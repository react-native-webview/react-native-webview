describe('WebView basic test', () => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true});
  });

  it('should have a webview', async () => {
    await expect(element(by.id('test_webview'))).toBeVisible();
  });

  it('should respond to injectJavaScript', async () => {
    const hello = await element(by.id('hello'));
    await expect(hello).toHaveText('No hello yet');
    await element(by.id('test_trigger_button')).tap();
    await waitFor(hello)
      .toHaveText('Hello from the webview!')
      .withTimeout(10000);
  });
});
