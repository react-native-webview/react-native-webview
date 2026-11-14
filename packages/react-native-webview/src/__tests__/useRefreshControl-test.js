import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';

import { useRefreshControl } from '../useRefreshControl';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Renders the hook and keeps what it returned on the last render.
function renderRefreshControl(initialElement, setNativeRefreshing = jest.fn()) {
  const result = { current: undefined };
  function Host({ element }) {
    const value = useRefreshControl(element, setNativeRefreshing);
    useEffect(() => {
      result.current = value;
    });
    return null;
  }
  let renderer;
  act(() => {
    renderer = TestRenderer.create(<Host element={initialElement} />);
  });
  return {
    result,
    setNativeRefreshing,
    rerender(element) {
      act(() => {
        renderer.update(<Host element={element} />);
      });
    },
  };
}

describe('useRefreshControl', () => {
  let warn;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
  });

  test('is disabled without a refresh control', () => {
    const { result } = renderRefreshControl(undefined);

    expect(result.current).toEqual({
      refreshControlEnabled: false,
      hasOnRefresh: false,
      refreshing: false,
      onRefresh: undefined,
      refreshControlTintColor: undefined,
      refreshControlColors: undefined,
      refreshControlProgressBackgroundColor: undefined,
      refreshControlSize: undefined,
      refreshControlTitle: undefined,
      refreshControlTitleColor: undefined,
      refreshControlProgressViewOffset: undefined,
    });
  });

  test('lets the native side reload when there is no onRefresh', () => {
    // `refreshing` has no meaning without a handler: the native side owns the indicator.
    const { result } = renderRefreshControl(<RefreshControl refreshing />);

    expect(result.current.refreshControlEnabled).toBe(true);
    expect(result.current.hasOnRefresh).toBe(false);
    expect(result.current.refreshing).toBe(false);
    expect(result.current.onRefresh).toBeUndefined();
  });

  test('is controlled by the app when there is an onRefresh', () => {
    const onRefresh = jest.fn();
    const { result, rerender } = renderRefreshControl(
      <RefreshControl
        refreshing={false}
        onRefresh={onRefresh}
      />,
    );

    expect(result.current.refreshControlEnabled).toBe(true);
    expect(result.current.hasOnRefresh).toBe(true);
    expect(result.current.refreshing).toBe(false);

    rerender(
      <RefreshControl
        refreshing
        onRefresh={onRefresh}
      />,
    );

    expect(result.current.refreshing).toBe(true);
  });

  test('can be disabled with `enabled`', () => {
    const { result } = renderRefreshControl(
      <RefreshControl
        refreshing={false}
        onRefresh={jest.fn()}
        enabled={false}
      />,
    );

    expect(result.current.refreshControlEnabled).toBe(false);
  });

  test('passes the appearance props on', () => {
    const { result } = renderRefreshControl(
      <RefreshControl
        refreshing={false}
        tintColor="red"
        colors={['red', 'blue']}
        progressBackgroundColor="white"
        size="large"
        title="Loading"
        titleColor="green"
        progressViewOffset={20}
      />,
    );

    expect(result.current).toMatchObject({
      refreshControlTintColor: 'red',
      refreshControlColors: ['red', 'blue'],
      refreshControlProgressBackgroundColor: 'white',
      refreshControlSize: 'large',
      refreshControlTitle: 'Loading',
      refreshControlTitleColor: 'green',
      refreshControlProgressViewOffset: 20,
    });
    expect(warn).not.toHaveBeenCalled();
  });

  test('warns about props that the WebView ignores', () => {
    renderRefreshControl(
      <RefreshControl
        refreshing={false}
        testID="refresh"
        style={{ top: 1 }}
      />,
    );

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('testID, style');
  });

  test('warns about a component that is not a RefreshControl', () => {
    // Stands for a component that renders a RefreshControl with an onRefresh of its own. That
    // works on a ScrollView, which renders it. Here it is never called.
    const ThemedRefreshControl = jest.fn(() => null);
    const { result } = renderRefreshControl(<ThemedRefreshControl />);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('is not rendered');
    expect(ThemedRefreshControl).not.toHaveBeenCalled();
    expect(result.current.hasOnRefresh).toBe(false);
  });

  test('stops the native indicator when the app does not start refreshing', () => {
    const onRefresh = jest.fn();
    const { result, setNativeRefreshing } = renderRefreshControl(
      <RefreshControl
        refreshing={false}
        onRefresh={onRefresh}
      />,
    );

    // The user pulled: the native indicator is spinning, and `refreshing` stays `false`.
    act(() => {
      result.current.onRefresh();
    });

    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(setNativeRefreshing).toHaveBeenCalledTimes(1);
    expect(setNativeRefreshing).toHaveBeenCalledWith(false);
  });

  test('leaves the native indicator alone when the app starts refreshing', () => {
    const setNativeRefreshing = jest.fn();
    const result = { current: undefined };
    // An app that answers `onRefresh` by setting `refreshing`, like the React Native docs do.
    function Screen() {
      const [refreshing, setRefreshing] = useState(false);
      const value = useRefreshControl(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />,
        setNativeRefreshing,
      );
      useEffect(() => {
        result.current = { ...value, finish: () => setRefreshing(false) };
      });
      return null;
    }
    act(() => {
      TestRenderer.create(<Screen />);
    });

    act(() => {
      result.current.onRefresh();
    });

    expect(result.current.refreshing).toBe(true);

    act(() => {
      result.current.finish();
    });

    // Both changes reached the native side as a prop, there was nothing to correct.
    expect(result.current.refreshing).toBe(false);
    expect(setNativeRefreshing).not.toHaveBeenCalled();
  });

  test('corrects the native indicator again on a second pull', () => {
    const { result, setNativeRefreshing } = renderRefreshControl(
      <RefreshControl
        refreshing={false}
        onRefresh={jest.fn()}
      />,
    );

    act(() => {
      result.current.onRefresh();
    });
    act(() => {
      result.current.onRefresh();
    });

    expect(setNativeRefreshing).toHaveBeenCalledTimes(2);
    expect(setNativeRefreshing).toHaveBeenLastCalledWith(false);
  });
});
