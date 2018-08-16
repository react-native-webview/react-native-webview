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
