# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Inject Javascript on iOS to detect all iFrames inside the current page and report them to the React app (https://github.com/MetaMask/react-native-webview-mm/pull/61)
- Inject Javascript on Android to detect all iFrames inside the current page and report them to the React app (https://github.com/MetaMask/react-native-webview-mm/pull/60)

## [14.2.2]

### Fixed

- On iOS on opening of some Dapps there is download file pop up (https://github.com/MetaMask/react-native-webview-mm/pull/63)

## [14.2.1]

### Fixed

- Download file requested when connecting to any Dapp (https://github.com/MetaMask/react-native-webview-mm/pull/58)

## [14.2.0]

### Added

- Implement tapjacking prevention via 500ms delay (https://github.com/MetaMask/react-native-webview-mm/pull/54, https://github.com/MetaMask/react-native-webview-mm/pull/52)

### Fixed

- Fixes to blob downloading on both platforms (https://github.com/MetaMask/react-native-webview-mm/pull/51, https://github.com/MetaMask/react-native-webview-mm/pull/50)
- Fix to regular file downloads on iOS (https://github.com/MetaMask/react-native-webview-mm/pull/53)

## [14.1.0]

### Changed

- bump ws from 6.2.2 to 6.2.3 in the npm_and_yarn group across 1 directory (https://github.com/MetaMask/react-native-webview-mm/pull/35)
- sync with upstream v13.13.5 (https://github.com/MetaMask/react-native-webview-mm/pull/47)

[Unreleased]: https://github.com/MetaMask/react-native-webview-mm/compare/@metamask/MetaMask:react-native-webview-mm:release/14.2.2...main
[14.2.2]: https://github.com/MetaMask/react-native-webview-mm/compare/release/14.2.1...MetaMask:react-native-webview-mm:release/14.2.2
[14.2.1]: https://github.com/MetaMask/react-native-webview-mm/compare/release/14.2.0...MetaMask:react-native-webview-mm:release/14.2.1
[14.2.0]: https://github.com/MetaMask/react-native-webview-mm/compare/release/14.1.0...MetaMask:react-native-webview-mm:release/14.2.0
[14.1.0]: https://github.com/MetaMask/react-native-webview-mm/compare/v14.0.4...v14.1.0
