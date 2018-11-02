/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const escapeStringRegexp = require('escape-string-regexp');

const WebViewShared = {
  defaultOriginWhitelist: ['http://*', 'https://*'],
  extractOrigin: (url: string): string => {
    const result = /^[A-Za-z0-9]+:(\/\/)?[^/]*/.exec(url);
    return result === null ? '' : result[0];
  },
  originWhitelistToRegex: (originWhitelist: string): string => {
    return escapeStringRegexp(originWhitelist).replace(/\\\*/g, '.*');
  },
  compileWhitelist: (originWhitelist?: $ReadOnlyArray<string>): Array<string> => [
    'about:blank', ...(originWhitelist || []),
  ].map(WebViewShared.originWhitelistToRegex),
  passesWhitelist: (compiledWhitelist: Array<string>, url: string) => {
    const origin = WebViewShared.extractOrigin(url);
    return compiledWhitelist.some(x =>
        new RegExp(x).test(origin),
    )
  },
  createOnShouldStartLoadWithRequest(loadRequest: () => void,
      compiledWhitelist: Array<string>) {
    return (event) => {
      let shouldStart = true;
      const {url} = event.nativeEvent;

      if (WebViewShared.passesWhitelist(compiledWhitelist, url)) {
        Linking.openURL(url);
      }

      if (this.props.onShouldStartLoadWithRequest)
        shouldStart = this.props.onShouldStartLoadWithRequest(event.nativeEvent) {
      }

      loadRequest(shouldStart, url)
    };
  }
};

module.exports = WebViewShared;
