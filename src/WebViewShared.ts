import escapeStringRegexp from 'escape-string-regexp';
import { Linking } from 'react-native';
import {
  WebViewNavigationEvent,
  OnShouldStartLoadWithRequest,
} from './types/WebViewTypes';

const defaultOriginWhitelist = ['http://*', 'https://*'];

const extractOrigin = (url: string): string => {
  const result = /^[A-Za-z0-9]+:(\/\/)?[^/]*/.exec(url);
  return result === null ? '' : result[0];
};

const originWhitelistToRegex = (originWhitelist: string): string =>
  escapeStringRegexp(originWhitelist).replace(/\\\*/g, '.*');

const passesWhitelist = (compiledWhitelist: Array<string>, url: string): boolean => {
  const origin = extractOrigin(url);
  return compiledWhitelist.some((x: string): boolean  => new RegExp(x).test(origin));
};

const compileWhitelist = (
  originWhitelist?: Readonly<string[]>,
): Array<string> =>
  ['about:blank', ...(originWhitelist || [])].map(originWhitelistToRegex);

const createOnShouldStartLoadWithRequest = (
  loadRequest: (
    shouldStart: boolean,
    url: string,
    lockIdentifier: number,
  ) => void,
  originWhitelist?: Readonly<string[]>,
  onShouldStartLoadWithRequest?: OnShouldStartLoadWithRequest,
): (e: WebViewNavigationEvent) => void => 
  ({ nativeEvent }: WebViewNavigationEvent): void => {
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
;

export { originWhitelistToRegex, defaultOriginWhitelist, createOnShouldStartLoadWithRequest };
