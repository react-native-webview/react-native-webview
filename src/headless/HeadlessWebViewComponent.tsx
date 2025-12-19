import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import HeadlessWebViewNativeComponent from './HeadlessWebViewNativeComponent';
import type { WebViewId } from './HeadlessWebView';

export interface HeadlessWebViewComponentProps {
  /**
   * The ID of the pre-created WebView to display.
   * This should be the value returned by HeadlessWebView.create()
   */
  webviewId: WebViewId;

  /**
   * Style for the WebView container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Component that displays a pre-created WebView.
 *
 * Use HeadlessWebView.create() to create a WebView instance,
 * then pass its ID to this component to display it.
 *
 * @example
 * ```tsx
 * const webviewId = HeadlessWebView.create();
 * HeadlessWebView.loadUrl(webviewId, 'https://example.com');
 *
 * function MyScreen() {
 *   return <HeadlessWebViewComponent webviewId={webviewId} style={{flex: 1}} />;
 * }
 * ```
 */
export function HeadlessWebViewComponent({
  webviewId,
  style,
}: HeadlessWebViewComponentProps) {
  return <HeadlessWebViewNativeComponent webviewId={webviewId} style={style} />;
}

export default HeadlessWebViewComponent;

