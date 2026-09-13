# Contributing to React Native WebView

First off, _thank you_ for considering contributing to the React Native Community. The community-supported packages are only possible because of amazing people like you.

Secondly, we'd like the contribution experience to be as good as possible. While we are a small all-volunteer team, we are happy to hear feedback about your experience, and if we can make the docs or experience better please let us know.

## How to test changes

After you fork the repo, clone it to your machine, and make your changes, you'll want to test them in an app.

There are two methods of testing:

1. Testing within a clone of react-native-webview
2. Testing in a new `react-native init` project

### Testing within react-native-webview

The repository contains one published library and separate platform apps:

| Package                         | Purpose                                                |
| ------------------------------- | ------------------------------------------------------ |
| `packages/react-native-webview` | Library source, native implementations, and unit tests |
| `packages/example-shared`       | Shared example screens and assets                      |
| `packages/example-mobile`       | Android and iOS, React Native 0.87.1                   |
| `packages/example-windows`      | Windows, React Native Windows 0.84.0, and E2E tests    |
| `packages/example-macos`        | macOS, React Native macOS 0.81.9                       |
| `packages/example-visionos`     | visionOS, ReactVision React Native visionOS 0.86.3     |

Use Node.js 22.13+ on the 22.x line, 24.3+ on the 24.x line, or 26+, and
Bun 1.4.1 (also pinned in `.prototools`). The root workspace includes the
library, shared screens, and mobile app. The other apps have separate installs
and lockfiles because their React Native versions differ. Install only the
platforms you are developing.

The examples use RNTA 5.4.10 and React Native CLI 20.2.0. The mobile app uses
Gradle 9.4.1 with the AGP 9 compatibility flags recommended by React Native 0.87.
The shared library currently uses legacy React Native declarations.
`tsconfig.json` enables the supported
`react-native-legacy-deep-imports` condition; migration to the strict TypeScript
API remains a separate follow-up before those declarations are removed.

#### Library, shared screens, Android, and iOS

```sh
bun install --frozen-lockfile
bun run lint:ci
bun run test
bun run prepublishOnly
```

`prepublishOnly` builds JavaScript and declarations into the library's `lib/`
directory. Publishing runs from the repository root, with semantic-release
configured to publish `packages/react-native-webview` to the existing `next`
channel. Documentation stays in the root `docs/` directory.

#### For Android:

```sh
bun run android
```

The Android example app will built, the Metro bundler will launch, and the example app will be installed and started in the Android emulator.

#### For iOS:

```sh
pod install --project-directory=packages/example-mobile/ios
bun run ios
```

The iOS example app will be built, the Metro bundler will launch, and the example app will be installed and started in the Simulator.

#### For macOS:

```sh
bun install --cwd packages/example-macos --frozen-lockfile
pod install --project-directory=packages/example-macos/macos
bun run macos
```

The macOS example app will be built, the Metro bundler will launch, and the example app will be installed and started.

#### For Windows:

```powershell
$env:APPIUM_SKIP_CHROMEDRIVER_INSTALL = 'true'
bun install --cwd packages/example-windows --frozen-lockfile
bun run windows
```

The Windows example app will be built, the Metro bundler will launch, and the example app will be installed and started.

Windows requires Visual Studio 2026 18.6.1 or newer and the Windows 11 SDK (10.0.26100.0),
matching the `windows-2025-vs2026` CI runner. The app uses RNW 0.84.0 with
React Native 0.84.1. RNTA 5.4.10 still declares a peer range ending at RNW 0.83;
the 0.84 pairing builds and launches locally with the maintainer's guidance.

The RNW CLI currently detects full Visual Studio editions only. With standalone
Visual Studio Build Tools, build directly with MSBuild instead. From
`packages/example-windows`, after installing dependencies:

```powershell
bun run bundle
bun x install-windows-test-app --project-directory windows
$vswhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
$buildTools = & $vswhere -latest -products '*' -version '[18.6.1,19.0)' -requires Microsoft.Component.MSBuild Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
$msbuild = Join-Path $buildTools 'MSBuild\Current\Bin\amd64\MSBuild.exe'
& $msbuild windows/WebviewExample.sln /t:Restore /p:RestoreProjectStyle=PackagesConfig /p:RestorePackagesConfig=true /p:Platform=x64 /p:Configuration=Release
bun x react-native autolink-windows
& $msbuild windows/WebviewExample.sln /restore /p:RestorePackagesConfig=true /p:RunAutolinkCheck=false /p:Platform=x64 /p:Configuration=Release /p:AppxBundle=Never /p:WindowsTargetPlatformVersion=10.0.26100.0
```

Windows E2E tests are in `packages/example-windows/__tests__`. Start Appium with
`bun run --cwd packages/example-windows appium`, then run `bun run test:windows`
against the installed app. Set `WEBVIEW_APP_HANDLE` to the hexadecimal window
handle of the running example, as the launch step in
[Windows CI](../.github/workflows/windows-ci.yml) does. The existing New
Architecture limitations and skipped cases are documented in the test file.

#### For visionOS

The visionOS app uses `@reactvision/react-native-visionos` 0.86.3, whose React
Native dependencies are based on 0.86.2. Metro maps React Native imports to this
fork, and `visionos.reactNativePath` in `app.json` points RNTA to the same package.
RNTA 5.4.10 still defaults to the older Callstack package, so this path override
is required. Native builds require macOS, Xcode with the visionOS SDK, CocoaPods,
and CMake. The Podfile builds React Native, its dependencies, and Hermes from
source because the upstream prebuilt frameworks do not include visionOS slices.

```sh
bun install --cwd packages/example-visionos --frozen-lockfile
pod install --project-directory=packages/example-visionos/visionos
bun run visionos
```

To start Metro separately, run `bun run --cwd packages/example-<platform> start`.
All apps load the library and shared screens directly from source. For Windows,
macOS, and visionOS, native autolinking uses the installed `file:` dependency;
rerun that app's install after changing library native files or package metadata.

### Testing in a new `react-native init` project

In a new `react-native init` project, do this:

```
$ yarn add <path to repository>/packages/react-native-webview
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
$ yarn add ../react-native-webview/packages/react-native-webview
```

## Notes

- We use TypeScript.
- After pulling this repo and installing all dependencies, you can run lint using the command: `bun run lint`

## Translations

This file is available in:

- [Brazilian portuguese](Contributing.portuguese.md)
- [Italian](Contributing.italian.md)
