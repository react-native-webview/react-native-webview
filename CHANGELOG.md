# @phantom/react-native-webview

## 1.1.1

### Patch Changes

- 1388353: Add isMainFrame to new arch serialization layer

## 1.1.0

### Minor Changes

- a08be33: - Merged 16 commits from upstream/master
  - Upgraded androidx.webkit:webkit from 1.4.0 to 1.14.0
  - Added SSL error handling for sub-resources
  - Added Payment Request API support (disabled downloads for security)
  - Preserved Phantom's custom changes:
    - Package name and version (1.0.2)
    - Download blocking with toast message
    - All existing security configurations

## 1.0.2

### Patch Changes

- 9052aae: Implement android alerts when permissions are requested by the webpage

## 1.0.1

### Patch Changes

- 17a37dc: added isMainFrame to onMessage callbacks

## 1.0.0

### Major Changes

- 141fb62: Fork complete
