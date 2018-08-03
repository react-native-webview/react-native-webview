/**
 * Copyright (c) 2018-present, Infinite Red, Inc.
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
  extractOrigin: (url) => {
    const result = /^[A-Za-z0-9]+:(\/\/)?[^/]*/.exec(url);
    return result === null ? null : result[0];
  },
  originWhitelistToRegex: (originWhitelist) => {
    return escapeStringRegexp(originWhitelist).replace(/\\\*/g, '.*');
  },
};

export default WebViewShared;
