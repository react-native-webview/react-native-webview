jest.mock('react', () => {
  const React = jest.requireActual('react');

  return {
    ...React,
    forwardRef: (render) => render,
    useCallback: (callback) => callback,
    useEffect: jest.fn(),
    useImperativeHandle: jest.fn(),
    useRef: (value) => ({ current: value }),
  };
});

jest.mock('../RNCWebViewNativeComponent', () => ({
  __esModule: true,
  Commands: {},
  default: 'RNCWebView',
}));

jest.mock('../NativeRNCWebViewModule', () => ({
  __esModule: true,
  default: {},
}));

jest.mock('../WebViewShared', () => ({
  defaultOriginWhitelist: ['http://*', 'https://*'],
  defaultRenderError: jest.fn(),
  defaultRenderLoading: jest.fn(),
  useWebViewLogic: () => ({
    lastErrorEvent: null,
    onHttpError: jest.fn(),
    onLoadingError: jest.fn(),
    onLoadingFinish: jest.fn(),
    onLoadingProgress: jest.fn(),
    onLoadingStart: jest.fn(),
    onLoadingSubResourceError: jest.fn(),
    onMessage: jest.fn(),
    onOpenWindow: jest.fn(),
    onRenderProcessGone: jest.fn(),
    onShouldStartLoadWithRequest: jest.fn(),
    setViewState: jest.fn(),
    viewState: 'IDLE',
  }),
}));

import WebView from '../WebView.android';

describe('WebView.android', () => {
  it.each(['fast', 'normal', 0.95])(
    'does not forward the iOS-only decelerationRate value %p',
    (decelerationRate) => {
      const onScroll = jest.fn();
      const rendered = WebView(
        {
          decelerationRate,
          onScroll,
          source: { html: '<html />' },
          testID: 'webview',
        },
        null,
      );
      const [nativeWebView] = rendered.props.children;

      expect(nativeWebView.props).not.toHaveProperty('decelerationRate');
      expect(nativeWebView.props.onScroll).toBe(onScroll);
      expect(nativeWebView.props.hasOnScroll).toBe(true);
      expect(nativeWebView.props.testID).toBe('webview');
    },
  );
});
