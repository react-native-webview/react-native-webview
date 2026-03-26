/**
 * Unit tests for WebView Windows New Architecture integration.
 * Tests the JS-side logic for the WebView2 Fabric component.
 */

// Mock react-native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Linking: {
      openURL: jest.fn().mockResolvedValue(undefined),
      canOpenURL: jest.fn().mockResolvedValue(true),
    },
    Image: {
      resolveAssetSource: jest.fn((source) => source),
    },
    UIManager: {
      getViewManagerConfig: jest.fn(() => null),
      hasViewManagerConfig: jest.fn(() => false),
    },
    Platform: { OS: 'windows', select: (obj) => obj.windows || obj.default },
  };
});

// Mock NativeComponentRegistry
jest.mock(
  'react-native/Libraries/NativeComponent/NativeComponentRegistry',
  () => ({
    get: jest.fn((name, viewConfigFactory) => {
      viewConfigFactory();
      const MockComponent = 'RCTWebView2-Mock';
      return MockComponent;
    }),
  })
);

// Mock codegenNativeCommands
jest.mock('react-native/Libraries/Utilities/codegenNativeCommands', () => {
  return jest.fn((options) => {
    const commands = {};
    options.supportedCommands.forEach((cmd) => {
      commands[cmd] = jest.fn();
    });
    return commands;
  });
});

describe('RCTWebView2NativeComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registers component with correct name', () => {
    const {
      get,
    } = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');
    // Re-require to trigger registration
    jest.isolateModules(() => {
      require('../RCTWebView2NativeComponent');
    });
    expect(get).toHaveBeenCalledWith('RCTWebView2', expect.any(Function));
  });

  test('view config has correct uiViewClassName', () => {
    const {
      get,
    } = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');
    let capturedViewConfig;
    get.mockImplementation((name, factory) => {
      capturedViewConfig = factory();
      return 'MockComponent';
    });

    jest.isolateModules(() => {
      require('../RCTWebView2NativeComponent');
    });

    expect(capturedViewConfig.uiViewClassName).toBe('RCTWebView2');
  });

  test('view config registers all required direct event types', () => {
    const {
      get,
    } = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');
    let capturedViewConfig;
    get.mockImplementation((name, factory) => {
      capturedViewConfig = factory();
      return 'MockComponent';
    });

    jest.isolateModules(() => {
      require('../RCTWebView2NativeComponent');
    });

    const directEvents = capturedViewConfig.directEventTypes;

    // All required events must be registered
    expect(directEvents.topOpenWindow).toEqual({
      registrationName: 'onOpenWindow',
    });
    expect(directEvents.topSourceChanged).toEqual({
      registrationName: 'onSourceChanged',
    });
    expect(directEvents.topLoadingError).toEqual({
      registrationName: 'onLoadingError',
    });
    expect(directEvents.topLoadingFinish).toEqual({
      registrationName: 'onLoadingFinish',
    });
    expect(directEvents.topLoadingProgress).toEqual({
      registrationName: 'onLoadingProgress',
    });
    expect(directEvents.topLoadingStart).toEqual({
      registrationName: 'onLoadingStart',
    });
    expect(directEvents.topHttpError).toEqual({
      registrationName: 'onHttpError',
    });
    expect(directEvents.topMessage).toEqual({ registrationName: 'onMessage' });
    expect(directEvents.topScroll).toEqual({ registrationName: 'onScroll' });
    expect(directEvents.topShouldStartLoadWithRequest).toEqual({
      registrationName: 'onShouldStartLoadWithRequest',
    });
  });

  test('view config registers all valid attributes', () => {
    const {
      get,
    } = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');
    let capturedViewConfig;
    get.mockImplementation((name, factory) => {
      capturedViewConfig = factory();
      return 'MockComponent';
    });

    jest.isolateModules(() => {
      require('../RCTWebView2NativeComponent');
    });

    const attrs = capturedViewConfig.validAttributes;

    // Core props
    expect(attrs.testID).toBe(true);
    expect(attrs.messagingEnabled).toBe(true);
    expect(attrs.javaScriptEnabled).toBe(true);
    expect(attrs.cacheEnabled).toBe(true);
    expect(attrs.incognito).toBe(true);

    // Source-related
    expect(attrs.newSource).toBe(true);
    expect(attrs.sourceHeaders).toBe(true);

    // Injection
    expect(attrs.injectedJavaScript).toBe(true);
    expect(attrs.injectedJavaScriptBeforeContentLoaded).toBe(true);

    // UI
    expect(attrs.showsHorizontalScrollIndicator).toBe(true);
    expect(attrs.showsVerticalScrollIndicator).toBe(true);
    expect(attrs.userAgent).toBe(true);

    // Debugging
    expect(attrs.webviewDebuggingEnabled).toBe(true);
  });

  test('Commands exports all supported commands', () => {
    const { codegenNativeCommands } = require('react-native');

    jest.isolateModules(() => {
      require('../RCTWebView2NativeComponent');
    });

    expect(codegenNativeCommands).toHaveBeenCalledWith({
      supportedCommands: [
        'goBack',
        'goForward',
        'reload',
        'stopLoading',
        'injectJavaScript',
        'requestFocus',
        'postMessage',
        'loadUrl',
        'clearCache',
      ],
    });
  });

  test('no bubblingEventTypes are registered', () => {
    const {
      get,
    } = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');
    let capturedViewConfig;
    get.mockImplementation((name, factory) => {
      capturedViewConfig = factory();
      return 'MockComponent';
    });

    jest.isolateModules(() => {
      require('../RCTWebView2NativeComponent');
    });

    expect(capturedViewConfig.bubblingEventTypes).toEqual({});
  });
});
