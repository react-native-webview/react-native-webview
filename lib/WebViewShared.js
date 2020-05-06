var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import escapeStringRegexp from 'escape-string-regexp';
import React from 'react';
import { Linking, View, ActivityIndicator, Text } from 'react-native';
import styles from './WebView.styles';
var defaultOriginWhitelist = ['http://*', 'https://*'];
var extractOrigin = function (url) {
    var result = /^[A-Za-z][A-Za-z0-9+\-.]+:(\/\/)?[^/]*/.exec(url);
    return result === null ? '' : result[0];
};
var originWhitelistToRegex = function (originWhitelist) {
    return "^" + escapeStringRegexp(originWhitelist).replace(/\\\*/g, '.*');
};
var passesWhitelist = function (compiledWhitelist, url) {
    var origin = extractOrigin(url);
    return compiledWhitelist.some(function (x) { return new RegExp(x).test(origin); });
};
var compileWhitelist = function (originWhitelist) {
    return __spreadArrays(['about:blank'], (originWhitelist || [])).map(originWhitelistToRegex);
};
var createOnShouldStartLoadWithRequest = function (loadRequest, originWhitelist, onShouldStartLoadWithRequest) {
    return function (_a) {
        var nativeEvent = _a.nativeEvent;
        var shouldStart = true;
        var url = nativeEvent.url, lockIdentifier = nativeEvent.lockIdentifier;
        if (!passesWhitelist(compileWhitelist(originWhitelist), url)) {
            Linking.canOpenURL(url).then(function (supported) {
                if (supported) {
                    return Linking.openURL(url);
                }
                console.warn("Can't open url: " + url);
                return undefined;
            })["catch"](function (e) {
                console.warn('Error opening URL: ', e);
            });
            shouldStart = false;
        }
        else if (onShouldStartLoadWithRequest) {
            shouldStart = onShouldStartLoadWithRequest(nativeEvent);
        }
        loadRequest(shouldStart, url, lockIdentifier);
    };
};
var defaultRenderLoading = function () { return (<View style={styles.loadingOrErrorView}>
    <ActivityIndicator />
  </View>); };
var defaultRenderError = function (errorDomain, errorCode, errorDesc) { return (<View style={styles.loadingOrErrorView}>
    <Text style={styles.errorTextTitle}>Error loading page</Text>
    <Text style={styles.errorText}>{"Domain: " + errorDomain}</Text>
    <Text style={styles.errorText}>{"Error Code: " + errorCode}</Text>
    <Text style={styles.errorText}>{"Description: " + errorDesc}</Text>
  </View>); };
export { defaultOriginWhitelist, createOnShouldStartLoadWithRequest, defaultRenderLoading, defaultRenderError, };
