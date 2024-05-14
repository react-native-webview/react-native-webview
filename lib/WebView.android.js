var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Image, View, } from 'react-native';
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import invariant from 'invariant';
import RNCWebView, { Commands } from "./RNCWebViewNativeComponent";
import RNCWebViewModule from "./NativeRNCWebView";
import { defaultOriginWhitelist, defaultRenderError, defaultRenderLoading, useWebViewLogic, } from './WebViewShared';
import styles from './WebView.styles';
var resolveAssetSource = Image.resolveAssetSource;
/**
 * A simple counter to uniquely identify WebView instances. Do not use this for anything else.
 */
var uniqueRef = 0;
var WebViewComponent = forwardRef(function (_a, ref) {
    var _b = _a.overScrollMode, overScrollMode = _b === void 0 ? 'always' : _b, _c = _a.javaScriptEnabled, javaScriptEnabled = _c === void 0 ? true : _c, _d = _a.thirdPartyCookiesEnabled, thirdPartyCookiesEnabled = _d === void 0 ? true : _d, _e = _a.scalesPageToFit, scalesPageToFit = _e === void 0 ? true : _e, _f = _a.allowsFullscreenVideo, allowsFullscreenVideo = _f === void 0 ? false : _f, _g = _a.allowFileAccess, allowFileAccess = _g === void 0 ? false : _g, _h = _a.saveFormDataDisabled, saveFormDataDisabled = _h === void 0 ? false : _h, _j = _a.cacheEnabled, cacheEnabled = _j === void 0 ? true : _j, _k = _a.androidLayerType, androidLayerType = _k === void 0 ? "none" : _k, _l = _a.originWhitelist, originWhitelist = _l === void 0 ? defaultOriginWhitelist : _l, _m = _a.setSupportMultipleWindows, setSupportMultipleWindows = _m === void 0 ? true : _m, _o = _a.setBuiltInZoomControls, setBuiltInZoomControls = _o === void 0 ? true : _o, _p = _a.setDisplayZoomControls, setDisplayZoomControls = _p === void 0 ? false : _p, _q = _a.nestedScrollEnabled, nestedScrollEnabled = _q === void 0 ? false : _q, startInLoadingState = _a.startInLoadingState, onNavigationStateChange = _a.onNavigationStateChange, onLoadStart = _a.onLoadStart, onError = _a.onError, onLoad = _a.onLoad, onLoadEnd = _a.onLoadEnd, onLoadProgress = _a.onLoadProgress, onHttpErrorProp = _a.onHttpError, onRenderProcessGoneProp = _a.onRenderProcessGone, onMessageProp = _a.onMessage, onOpenWindowProp = _a.onOpenWindow, renderLoading = _a.renderLoading, renderError = _a.renderError, style = _a.style, containerStyle = _a.containerStyle, source = _a.source, nativeConfig = _a.nativeConfig, onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequest, injectedJavaScriptObject = _a.injectedJavaScriptObject, otherProps = __rest(_a, ["overScrollMode", "javaScriptEnabled", "thirdPartyCookiesEnabled", "scalesPageToFit", "allowsFullscreenVideo", "allowFileAccess", "saveFormDataDisabled", "cacheEnabled", "androidLayerType", "originWhitelist", "setSupportMultipleWindows", "setBuiltInZoomControls", "setDisplayZoomControls", "nestedScrollEnabled", "startInLoadingState", "onNavigationStateChange", "onLoadStart", "onError", "onLoad", "onLoadEnd", "onLoadProgress", "onHttpError", "onRenderProcessGone", "onMessage", "onOpenWindow", "renderLoading", "renderError", "style", "containerStyle", "source", "nativeConfig", "onShouldStartLoadWithRequest", "injectedJavaScriptObject"]);
    var messagingModuleName = useRef("WebViewMessageHandler".concat(uniqueRef += 1)).current;
    var webViewRef = useRef(null);
    var onShouldStartLoadWithRequestCallback = useCallback(function (shouldStart, url, lockIdentifier) {
        if (lockIdentifier) {
            RNCWebViewModule.shouldStartLoadWithLockIdentifier(shouldStart, lockIdentifier);
        }
        else if (shouldStart && webViewRef.current) {
            Commands.loadUrl(webViewRef.current, url);
        }
    }, []);
    var _r = useWebViewLogic({
        onNavigationStateChange: onNavigationStateChange,
        onLoad: onLoad,
        onError: onError,
        onHttpErrorProp: onHttpErrorProp,
        onLoadEnd: onLoadEnd,
        onLoadProgress: onLoadProgress,
        onLoadStart: onLoadStart,
        onRenderProcessGoneProp: onRenderProcessGoneProp,
        onMessageProp: onMessageProp,
        onOpenWindowProp: onOpenWindowProp,
        startInLoadingState: startInLoadingState,
        originWhitelist: originWhitelist,
        onShouldStartLoadWithRequestProp: onShouldStartLoadWithRequestProp,
        onShouldStartLoadWithRequestCallback: onShouldStartLoadWithRequestCallback
    }), onLoadingStart = _r.onLoadingStart, onShouldStartLoadWithRequest = _r.onShouldStartLoadWithRequest, onMessage = _r.onMessage, viewState = _r.viewState, setViewState = _r.setViewState, lastErrorEvent = _r.lastErrorEvent, onHttpError = _r.onHttpError, onLoadingError = _r.onLoadingError, onLoadingFinish = _r.onLoadingFinish, onLoadingProgress = _r.onLoadingProgress, onOpenWindow = _r.onOpenWindow, onRenderProcessGone = _r.onRenderProcessGone;
    useImperativeHandle(ref, function () { return ({
        goForward: function () { return webViewRef.current && Commands.goForward(webViewRef.current); },
        goBack: function () { return webViewRef.current && Commands.goBack(webViewRef.current); },
        reload: function () {
            setViewState('LOADING');
            if (webViewRef.current) {
                Commands.reload(webViewRef.current);
            }
        },
        stopLoading: function () { return webViewRef.current && Commands.stopLoading(webViewRef.current); },
        postMessage: function (data) { return webViewRef.current && Commands.postMessage(webViewRef.current, data); },
        injectJavaScript: function (data) { return webViewRef.current && Commands.injectJavaScript(webViewRef.current, data); },
        requestFocus: function () { return webViewRef.current && Commands.requestFocus(webViewRef.current); },
        clearFormData: function () { return webViewRef.current && Commands.clearFormData(webViewRef.current); },
        clearCache: function (includeDiskFiles) { return webViewRef.current && Commands.clearCache(webViewRef.current, includeDiskFiles); },
        clearHistory: function () { return webViewRef.current && Commands.clearHistory(webViewRef.current); }
    }); }, [setViewState, webViewRef]);
    var directEventCallbacks = useMemo(function () { return ({
        onShouldStartLoadWithRequest: onShouldStartLoadWithRequest,
        onMessage: onMessage
    }); }, [onMessage, onShouldStartLoadWithRequest]);
    useEffect(function () {
        BatchedBridge.registerCallableModule(messagingModuleName, directEventCallbacks);
    }, [messagingModuleName, directEventCallbacks]);
    var otherView;
    if (viewState === 'LOADING') {
        otherView = (renderLoading || defaultRenderLoading)();
    }
    else if (viewState === 'ERROR') {
        invariant(lastErrorEvent != null, 'lastErrorEvent expected to be non-null');
        if (lastErrorEvent) {
            otherView = (renderError || defaultRenderError)(lastErrorEvent.domain, lastErrorEvent.code, lastErrorEvent.description);
        }
    }
    else if (viewState !== 'IDLE') {
        console.error("RNCWebView invalid state encountered: ".concat(viewState));
    }
    var webViewStyles = [styles.container, styles.webView, style];
    var webViewContainerStyle = [styles.container, containerStyle];
    if (typeof source !== "number" && source && 'method' in source) {
        if (source.method === 'POST' && source.headers) {
            console.warn('WebView: `source.headers` is not supported when using POST.');
        }
        else if (source.method === 'GET' && source.body) {
            console.warn('WebView: `source.body` is not supported when using GET.');
        }
    }
    var NativeWebView = (nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.component) || RNCWebView;
    var sourceResolved = resolveAssetSource(source);
    var newSource = typeof sourceResolved === "object" ? Object.entries(sourceResolved).reduce(function (prev, _a) {
        var _b;
        var currKey = _a[0], currValue = _a[1];
        return __assign(__assign({}, prev), (_b = {}, _b[currKey] = currKey === "headers" && currValue && typeof currValue === "object" ? Object.entries(currValue).map(function (_a) {
            var key = _a[0], value = _a[1];
            return {
                name: key,
                value: value
            };
        }) : currValue, _b));
    }, {}) : sourceResolved;
    var webView = <NativeWebView key="webViewKey" {...otherProps} messagingEnabled={typeof onMessageProp === 'function'} messagingModuleName={messagingModuleName} hasOnScroll={!!otherProps.onScroll} onLoadingError={onLoadingError} onLoadingFinish={onLoadingFinish} onLoadingProgress={onLoadingProgress} onLoadingStart={onLoadingStart} onHttpError={onHttpError} onRenderProcessGone={onRenderProcessGone} onMessage={onMessage} onOpenWindow={onOpenWindow} hasOnOpenWindowEvent={onOpenWindowProp !== undefined} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} ref={webViewRef} 
    // TODO: find a better way to type this.
    // @ts-expect-error source is old arch
    source={sourceResolved} newSource={newSource} style={webViewStyles} overScrollMode={overScrollMode} javaScriptEnabled={javaScriptEnabled} thirdPartyCookiesEnabled={thirdPartyCookiesEnabled} scalesPageToFit={scalesPageToFit} allowsFullscreenVideo={allowsFullscreenVideo} allowFileAccess={allowFileAccess} saveFormDataDisabled={saveFormDataDisabled} cacheEnabled={cacheEnabled} androidLayerType={androidLayerType} setSupportMultipleWindows={setSupportMultipleWindows} setBuiltInZoomControls={setBuiltInZoomControls} setDisplayZoomControls={setDisplayZoomControls} nestedScrollEnabled={nestedScrollEnabled} injectedJavaScriptObject={JSON.stringify(injectedJavaScriptObject)} {...nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.props}/>;
    return (<View style={webViewContainerStyle}>
      {webView}
      {otherView}
    </View>);
});
// native implementation should return "true" only for Android 5+
var isFileUploadSupported = RNCWebViewModule.isFileUploadSupported;
var WebView = Object.assign(WebViewComponent, { isFileUploadSupported: isFileUploadSupported });
export default WebView;
