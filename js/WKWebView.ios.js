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

const RCTWKWebView = requireNativeComponent('RCTWKWebView');

class WKWebView extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.showRedboxOnPropChanges(nextProps, 'allowsInlineMediaPlayback');
    this.showRedboxOnPropChanges(nextProps, 'mediaPlaybackRequiresUserAction');
    this.showRedboxOnPropChanges(nextProps, 'dataDetectorTypes');
  }

  showRedboxOnPropChanges(nextProps, propName) {
    if (this.props[propName] !== nextProps[propName]) {
      console.error(`Changes to property ${propName} do nothing after the initial render.`);
    }
  }

  render() {
    return <RCTWKWebView {...this.props} />;
  }
}

module.exports = WKWebView;
