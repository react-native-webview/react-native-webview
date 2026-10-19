# Native popup tests

These XCTest cases cover host matching, child configuration isolation, user-agent
inheritance, idempotent teardown, and content-process termination. They do not
exercise a payment provider or prove `window.opener`/`window.closed` behavior.

With Xcode and the `xcodeproj` Ruby gem (included with CocoaPods) installed:

```sh
ruby appleTests/create-project.rb
xcodebuild test \
  -project build/NativeWindowTests.xcodeproj \
  -scheme NativeWindowTests \
  -destination 'platform=iOS Simulator,name=iPhone 17' \
  -derivedDataPath build/NativeWindowTestsDerivedData \
  CODE_SIGNING_ALLOWED=NO
```

For the end-to-end checks, serve `example/assets/native-window/` from an HTTPS
origin with a certificate trusted by the simulator/device. Set `TEST_ORIGIN` in
`example/examples/NativeWindow.tsx` to that origin, then open **Native window**
in the example app. No payment credentials are needed.

1. Open the child. It should report an opener, no React Native bridge, and no
   parent-injected marker; the parent should receive the child's message.
2. Close from the child page, the toolbar, and a swipe. The parent should
   eventually report `closed: true`. Reopen after each close.
3. Use the parent's delayed second-popup button: the existing child must stay
   on its original document. Use the child's nested-popup button: it must stay
   on its original document too.
4. Try the blocked HTTPS and HTTP links in the child; neither should load.
5. Reset the parent WebView with a child open; the child modal must disappear.
6. Test both a custom `userAgent` and `applicationNameForUserAgent` using the
   example's switch. Confirm the child reports the selected marker.
7. Remove both native-window props and check the existing `onOpenWindow`
   behavior. Also build Android and macOS to check the shared native prop spec.

Payment-provider validation is separate: with your own working Google Pay web
integration, append `GOOGLE_PAY_SUPPORTED`, configure the narrowest necessary
hosts, then verify sign-in, success, cancellation, and repeated checkout on a
physical device. This generic implementation does not send private Google Pay
messages to speed up cancellation.
