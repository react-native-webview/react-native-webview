/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import escapeStringRegexp from 'escape-string-regexp';
import { Linking } from 'react-native';
import type {
  WebViewNavigationEvent,
  WebViewNavigation,
  OnShouldStartLoadWithRequest,
} from './WebViewTypes';

const defaultOriginWhitelist = ['http://*', 'https://*'];

const extractOrigin = (url: string): string => {
  const result = /^[A-Za-z0-9]+:(\/\/)?[^/]*/.exec(url);
  return result === null ? '' : result[0];
};

const originWhitelistToRegex = (originWhitelist: string): string =>
  escapeStringRegexp(originWhitelist).replace(/\\\*/g, '.*');

const passesWhitelist = (compiledWhitelist: Array<string>, url: string) => {
  const origin = extractOrigin(url);
  return compiledWhitelist.some(x => new RegExp(x).test(origin));
};

const compileWhitelist = (
  originWhitelist: ?$ReadOnlyArray<string>,
): Array<string> =>
  ['about:blank', ...(originWhitelist || [])].map(originWhitelistToRegex);

const createOnShouldStartLoadWithRequest = (
  loadRequest: (
    shouldStart: boolean,
    url: string,
    lockIdentifier: number,
  ) => void,
  originWhitelist: ?$ReadOnlyArray<string>,
  onShouldStartLoadWithRequest: ?OnShouldStartLoadWithRequest,
) => {
  return ({ nativeEvent }: WebViewNavigationEvent) => {
    let shouldStart = true;
    const { url, lockIdentifier } = nativeEvent;

    if (!passesWhitelist(compileWhitelist(originWhitelist), url)) {
      Linking.openURL(url);
      shouldStart = false
    }

    if (onShouldStartLoadWithRequest) {
      shouldStart = onShouldStartLoadWithRequest(nativeEvent);
    }

    loadRequest(shouldStart, url, lockIdentifier);
  };
};

export { defaultOriginWhitelist, createOnShouldStartLoadWithRequest };
