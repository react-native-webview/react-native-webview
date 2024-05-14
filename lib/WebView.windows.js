/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Portions copyright for react-native-windows:
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { View, Image, NativeModules, } from 'react-native';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import invariant from 'invariant';
import { RCTWebView, RCTWebView2 } from "./WebViewNativeComponent.windows";
import { useWebViewLogic, defaultOriginWhitelist, defaultRenderError, defaultRenderLoading, } from './WebViewShared';
import styles from './WebView.styles';
var Commands = codegenNativeCommands({
    supportedCommands: ['goBack', 'goForward', 'reload', 'stopLoading', 'injectJavaScript', 'requestFocus', 'clearCache', 'postMessage', 'loadUrl']
});
var resolveAssetSource = Image.resolveAssetSource;
var WebViewComponent = forwardRef(function (_a, ref) {
    var _b = _a.cacheEnabled, cacheEnabled = _b === void 0 ? true : _b, _c = _a.originWhitelist, originWhitelist = _c === void 0 ? defaultOriginWhitelist : _c, startInLoadingState = _a.startInLoadingState, onNavigationStateChange = _a.onNavigationStateChange, onLoadStart = _a.onLoadStart, onError = _a.onError, onLoad = _a.onLoad, onLoadEnd = _a.onLoadEnd, onLoadProgress = _a.onLoadProgress, onOpenWindowProp = _a.onOpenWindow, onSourceChanged = _a.onSourceChanged, onHttpErrorProp = _a.onHttpError, onMessageProp = _a.onMessage, renderLoading = _a.renderLoading, renderError = _a.renderError, style = _a.style, containerStyle = _a.containerStyle, source = _a.source, nativeConfig = _a.nativeConfig, onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequest, useWebView2 = _a.useWebView2, otherProps = __rest(_a, ["cacheEnabled", "originWhitelist", "startInLoadingState", "onNavigationStateChange", "onLoadStart", "onError", "onLoad", "onLoadEnd", "onLoadProgress", "onOpenWindow", "onSourceChanged", "onHttpError", "onMessage", "renderLoading", "renderError", "style", "containerStyle", "source", "nativeConfig", "onShouldStartLoadWithRequest", "useWebView2"]);
    var webViewRef = useRef(null);
    var RCTWebViewString = useWebView2 ? 'RCTWebView2' : 'RCTWebView';
    var onShouldStartLoadWithRequestCallback = useCallback(function (shouldStart, url, lockIdentifier) {
        if (lockIdentifier) {
            if (RCTWebViewString === 'RCTWebView') {
                NativeModules.RCTWebView.onShouldStartLoadWithRequestCallback(shouldStart, lockIdentifier);
            }
            else {
                NativeModules.RCTWebView2.onShouldStartLoadWithRequestCallback(shouldStart, lockIdentifier);
            }
        }
        else if (shouldStart) {
            Commands.loadUrl(webViewRef, url);
        }
    }, [RCTWebViewString]);
    var _d = useWebViewLogic({
        onNavigationStateChange: onNavigationStateChange,
        onLoad: onLoad,
        onError: onError,
        onHttpErrorProp: onHttpErrorProp,
        onLoadEnd: onLoadEnd,
        onLoadProgress: onLoadProgress,
        onLoadStart: onLoadStart,
        onMessageProp: onMessageProp,
        startInLoadingState: startInLoadingState,
        originWhitelist: originWhitelist,
        onShouldStartLoadWithRequestProp: onShouldStartLoadWithRequestProp,
        onShouldStartLoadWithRequestCallback: onShouldStartLoadWithRequestCallback,
        onOpenWindowProp: onOpenWindowProp
    }), onLoadingStart = _d.onLoadingStart, onShouldStartLoadWithRequest = _d.onShouldStartLoadWithRequest, onMessage = _d.onMessage, viewState = _d.viewState, setViewState = _d.setViewState, lastErrorEvent = _d.lastErrorEvent, onHttpError = _d.onHttpError, onLoadingError = _d.onLoadingError, onLoadingFinish = _d.onLoadingFinish, onLoadingProgress = _d.onLoadingProgress, onOpenWindow = _d.onOpenWindow;
    useImperativeHandle(ref, function () { return ({
        goForward: function () { return Commands.goForward(webViewRef.current); },
        goBack: function () { return Commands.goBack(webViewRef.current); },
        reload: function () {
            setViewState('LOADING');
            Commands.reload(webViewRef.current);
        },
        stopLoading: function () { return Commands.stopLoading(webViewRef.current); },
        postMessage: function (data) { return Commands.postMessage(webViewRef.current, data); },
        injectJavaScript: function (data) { return Commands.injectJavaScript(webViewRef.current, data); },
        requestFocus: function () { return Commands.requestFocus(webViewRef.current); },
        clearCache: function () { return Commands.clearCache(webViewRef.current); },
        loadUrl: function (url) { return Commands.loadUrl(webViewRef.current, url); }
    }); }, [setViewState, webViewRef]);
    var otherView = null;
    if (viewState === 'LOADING') {
        otherView = (renderLoading || defaultRenderLoading)();
    }
    else if (viewState === 'ERROR') {
        invariant(lastErrorEvent != null, 'lastErrorEvent expected to be non-null');
        otherView = (renderError || defaultRenderError)(lastErrorEvent.domain, lastErrorEvent.code, lastErrorEvent.description);
    }
    else if (viewState !== 'IDLE') {
        console.error("RNCWebView invalid state encountered: ".concat(viewState));
    }
    var webViewStyles = [styles.container, styles.webView, style];
    var webViewContainerStyle = [styles.container, containerStyle];
    var NativeWebView = useWebView2 ? RCTWebView2 : RCTWebView;
    var webView = <NativeWebView key="webViewKey" {...otherProps} messagingEnabled={typeof onMessageProp === 'function'} linkHandlingEnabled={typeof onOpenWindowProp === 'function'} onLoadingError={onLoadingError} onLoadingFinish={onLoadingFinish} onLoadingProgress={onLoadingProgress} onLoadingStart={onLoadingStart} onHttpError={onHttpError} onMessage={onMessage} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} onOpenWindow={onOpenWindow} onSourceChanged={onSourceChanged} ref={webViewRef} 
    // TODO: find a better way to type this.
    source={resolveAssetSource(source)} style={webViewStyles} cacheEnabled={cacheEnabled} {...nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.props}/>;
    return (<View style={webViewContainerStyle}>
      {webView}
      {otherView}
    </View>);
});
// native implementation should return "true" only for Android 5+
var isFileUploadSupported = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, false];
}); }); };
var WebView = Object.assign(WebViewComponent, { isFileUploadSupported: isFileUploadSupported });
export default WebView;
