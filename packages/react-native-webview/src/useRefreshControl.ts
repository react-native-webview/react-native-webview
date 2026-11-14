import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { ReactElement } from 'react';
import type { ColorValue, RefreshControlProps } from 'react-native';

/**
 * The `RefreshControl` props the WebView understands. The element passed as
 * `refreshControl` is never mounted: its props are read here and handed to the
 * native WebView, which owns the platform refresh indicator.
 */
const SUPPORTED_PROPS: ReadonlySet<string> = new Set([
  'refreshing',
  'onRefresh',
  'enabled',
  'tintColor',
  'colors',
  'progressBackgroundColor',
  'size',
  'title',
  'titleColor',
  'progressViewOffset',
]);

export interface RefreshControlNativeProps {
  refreshControlEnabled: boolean;
  hasOnRefresh: boolean;
  refreshing: boolean;
  onRefresh: (() => void) | undefined;
  refreshControlTintColor: ColorValue | undefined;
  refreshControlColors: ReadonlyArray<ColorValue> | undefined;
  refreshControlProgressBackgroundColor: ColorValue | undefined;
  refreshControlSize: 'default' | 'large' | undefined;
  refreshControlTitle: string | undefined;
  refreshControlTitleColor: ColorValue | undefined;
  refreshControlProgressViewOffset: number | undefined;
}

/**
 * Turns the `refreshControl` prop into props for the native WebView.
 *
 * Without `onRefresh`, the native side reloads the page on its own and hides
 * the indicator when the load ends, so nothing has to be kept in sync here.
 *
 * With `onRefresh`, `refreshing` is controlled by the app. The native indicator
 * starts spinning by itself when the user pulls, so if the app does not answer
 * `onRefresh` by setting `refreshing` to `true`, the native side is told to stop
 * (the same thing React Native's `RefreshControl` does for a `ScrollView`).
 */
export const useRefreshControl = (
  refreshControl: ReactElement<RefreshControlProps> | null | undefined,
  setNativeRefreshing: (refreshing: boolean) => void,
): RefreshControlNativeProps => {
  const props = refreshControl?.props;
  const onRefreshProp = props?.onRefresh;
  const hasOnRefresh = typeof onRefreshProp === 'function';
  // `refreshing` only means something when the app handles the refresh.
  const refreshing = hasOnRefresh && props?.refreshing === true;

  const lastNativeRefreshing = useRef(refreshing);
  const previousRefreshing = useRef(refreshing);
  const [, forceUpdate] = useReducer((count: number) => count + 1, 0);

  // Runs after every render on purpose: it has to notice a render where
  // `refreshing` did not change although the native indicator did.
  useEffect(() => {
    if (previousRefreshing.current !== refreshing) {
      // The prop update already reached the native side.
      previousRefreshing.current = refreshing;
      lastNativeRefreshing.current = refreshing;
    } else if (lastNativeRefreshing.current !== refreshing) {
      setNativeRefreshing(refreshing);
      lastNativeRefreshing.current = refreshing;
    }
  });

  const onRefresh = useCallback(() => {
    lastNativeRefreshing.current = true;
    // oxlint-disable-next-line @typescript-eslint/no-floating-promises
    onRefreshProp?.();
    // Render again so that the effect above can compare the two values.
    forceUpdate();
  }, [onRefreshProp]);

  const unsupportedProps =
    __DEV__ && props
      ? Object.keys(props)
          .filter((key) => !SUPPORTED_PROPS.has(key))
          .join(', ')
      : '';
  useEffect(() => {
    if (unsupportedProps) {
      console.warn(
        `WebView: the following RefreshControl props are not supported and are ignored: ${unsupportedProps}.`,
      );
    }
  }, [unsupportedProps]);

  return {
    refreshControlEnabled: props != null && props.enabled !== false,
    hasOnRefresh,
    refreshing,
    onRefresh: hasOnRefresh ? onRefresh : undefined,
    refreshControlTintColor: props?.tintColor,
    refreshControlColors: props?.colors,
    refreshControlProgressBackgroundColor: props?.progressBackgroundColor,
    refreshControlSize: props?.size,
    refreshControlTitle: props?.title,
    refreshControlTitleColor: props?.titleColor,
    refreshControlProgressViewOffset: props?.progressViewOffset,
  };
};
