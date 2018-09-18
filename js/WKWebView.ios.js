/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 * @providesModule WKWebView
 */

import React from 'react';

import { requireNativeComponent } from 'react-native';

import type {DataDetectorTypes} from './WebViewTypes';

const RNCWKWebView = requireNativeComponent('RNCWKWebView');

type RNCWKWebViewProps = $ReadOnly<{|
  allowsInlineMediaPlayback?: ?boolean,
  mediaPlaybackRequiresUserAction?: ?boolean,
  dataDetectorTypes?:
    | ?DataDetectorTypes
    | $ReadOnlyArray<DataDetectorTypes>,
|}>;

class WKWebView extends React.Component<RNCWKWebViewProps> {
  componentWillReceiveProps(nextProps: RNCWKWebViewProps) {
    this.showRedboxOnPropChanges(nextProps, 'allowsInlineMediaPlayback');
    this.showRedboxOnPropChanges(nextProps, 'mediaPlaybackRequiresUserAction');
    this.showRedboxOnPropChanges(nextProps, 'dataDetectorTypes');
  }

  showRedboxOnPropChanges(nextProps: RNCWKWebViewProps, propName: string) {
    if (this.props[propName] !== nextProps[propName]) {
      console.error(`Changes to property ${propName} do nothing after the initial render.`);
    }
  }

  render() {
    return <RNCWKWebView {...this.props} />;
  }
}

module.exports = WKWebView;
