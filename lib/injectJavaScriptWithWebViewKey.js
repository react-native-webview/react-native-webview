export default function injectJavaScriptWithWebViewKey(_webViewKey, _script) {
    // no-op. This should get overwritten by platform-specific implementations
    return Promise.resolve();
}
