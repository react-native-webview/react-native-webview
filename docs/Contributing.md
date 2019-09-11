# Contributing to React Native WebView

First off, _thank you_ for considering contributing to the React Native Community. The community-supported packages are only possible because of amazing people like you.

Secondly, we'd like the contribution experience to be as good as possible. While we are a small all-volunteer team, we are happy to hear feedback about your experience, and if we can make the docs or experience better please let us know.

## How to test changes

After you fork the repo, clone it to your machine, and make your changes, you'll want to test them in an app.

In a new `react-native init` project, do this:

```
$ yarn add ../react-native-webview
$ react-native link react-native-webview
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

When you make a change, you'll probably need to unlink, remove, re-add, and re-link `react-native-webview`:

```
$ react-native unlink react-native-webview && yarn remove react-native-webview
$ yarn add ../react-native-webview && react-native link react-native-webview
```

## Notes

- We use TypeScript.
- After pulling this repo and installing all dependencies, you can run tests using the command: `yarn ci`
