export default function injectJavaScriptWithWebViewKey(_webViewKey: string, _script: string, ): Promise<void> {
  // no-op. This should get overwritten by platform-specific implementations
  return Promise.resolve();
}
