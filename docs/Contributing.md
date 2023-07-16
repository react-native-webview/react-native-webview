# Contributing to React Native WebView

First off, _thank you_ for considering contributing to the React Native Community. The community-supported packages are only possible because of amazing people like you.

Secondly, we'd like the contribution experience to be as good as possible. While we are a small all-volunteer team, we are happy to hear feedback about your experience, and if we can make the docs or experience better please let us know.

## How to test changes

After you fork the repo, clone it to your machine, and make your changes, you'll want to test them in an app.

There are two methods of testing:
1) Testing within a clone of react-native-webview
2) Testing in a new `react-native init` project

### Testing within react-native-webview

#### For all platforms:

```sh
yarn install
```

#### For Android:

```sh
yarn android
```

The Android example app will built, the Metro bundler will launch, and the example app will be installed and started in the Android emulator.

#### For iOS:

```sh
pod install --project-directory=example/ios
yarn ios
```

The iOS example app will be built, the Metro bundler will launch, and the example app will be installed and started in the Simulator.

#### For macOS:

```sh
pod install --project-directory=macos
yarn macos
```

The macOS example app will be built, the Metro bundler will launch, and the example app will be installed and started.

#### For Windows:

```sh
yarn windows
```

The Windows example app will be built, the Metro bundler will launch, and the example app will be installed and started.

### Testing in a new `react-native init` project

In a new `react-native init` project, do this:

```
$ yarn add <path to local react-native-webview>
```

You may run into a problem where the `jest-haste-map` module map says react-native was added twice:

```
Loading dependency graph...(node:32651) UnhandledPromiseRejectionWarning: Error: jest-haste-map: Haste module naming collision:
  Duplicate module name: react-native
  Paths: /Users/myuser/TestApp/node_modules/react-native/package.json collides with /Users/myuser/TestApp/node_modules/react-native-webview/node_modules/react-native/package.json
```

Just remove the second path like this:

```
$ rm -rf ./node_modules/react-native-webview/node_modules/react-native
```

And then re-run the packager:

```
$ react-native start --reset-cache
```

You may also see a console warning about "Invalid hook call," followed by a render error that "null is not an object (evaluating 'dispatcher.useRef')." Resolving this is similar to the above, but this time remove `react-native-webview/node_modules/react`.

(if you remove `react` before `react-native`, you may see another render error for "View config getter callback for component 'RNCWebView' must be a function," just remove `react-native` as well to fix this)

When you make a change, you'll probably need to remove and re-add `react-native-webview`:

```
$ yarn remove react-native-webview
$ yarn add ../react-native-webview
```

## Notes

- We use TypeScript.
- After pulling this repo and installing all dependencies, you can run tests using the command: `yarn ci`

## Translations
This file is available in:

- [Brazilian portuguese](Contributing.portuguese.md)
- [Italian](Contributing.italian.md)
