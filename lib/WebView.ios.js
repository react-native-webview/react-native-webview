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
import { Image, View, } from 'react-native';
import invariant from 'invariant';
import RNCWebView, { Commands } from "./RNCWebViewNativeComponent";
import RNCWebViewModule from "./NativeRNCWebView";
import { defaultOriginWhitelist, defaultRenderError, defaultRenderLoading, useWebViewLogic, } from './WebViewShared';
import styles from './WebView.styles';
var resolveAssetSource = Image.resolveAssetSource;
var processDecelerationRate = function (decelerationRate) {
    var newDecelerationRate = decelerationRate;
    if (newDecelerationRate === 'normal') {
        newDecelerationRate = 0.998;
    }
    else if (newDecelerationRate === 'fast') {
        newDecelerationRate = 0.99;
    }
    return newDecelerationRate;
};
var useWarnIfChanges = function (value, name) {
    var ref = useRef(value);
    if (ref.current !== value) {
        console.warn("Changes to property ".concat(name, " do nothing after the initial render."));
        ref.current = value;
    }
};
var WebViewComponent = forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.fraudulentWebsiteWarningEnabled, fraudulentWebsiteWarningEnabled = _d === void 0 ? true : _d, _e = _a.javaScriptEnabled, javaScriptEnabled = _e === void 0 ? true : _e, _f = _a.cacheEnabled, cacheEnabled = _f === void 0 ? true : _f, _g = _a.originWhitelist, originWhitelist = _g === void 0 ? defaultOriginWhitelist : _g, _h = _a.useSharedProcessPool, useSharedProcessPool = _h === void 0 ? true : _h, _j = _a.textInteractionEnabled, textInteractionEnabled = _j === void 0 ? true : _j, injectedJavaScript = _a.injectedJavaScript, injectedJavaScriptBeforeContentLoaded = _a.injectedJavaScriptBeforeContentLoaded, _k = _a.injectedJavaScriptForMainFrameOnly, injectedJavaScriptForMainFrameOnly = _k === void 0 ? true : _k, _l = _a.injectedJavaScriptBeforeContentLoadedForMainFrameOnly, injectedJavaScriptBeforeContentLoadedForMainFrameOnly = _l === void 0 ? true : _l, injectedJavaScriptObject = _a.injectedJavaScriptObject, startInLoadingState = _a.startInLoadingState, onNavigationStateChange = _a.onNavigationStateChange, onLoadStart = _a.onLoadStart, onError = _a.onError, onLoad = _a.onLoad, onLoadEnd = _a.onLoadEnd, onLoadProgress = _a.onLoadProgress, onContentProcessDidTerminateProp = _a.onContentProcessDidTerminate, onFileDownload = _a.onFileDownload, onHttpErrorProp = _a.onHttpError, onMessageProp = _a.onMessage, onOpenWindowProp = _a.onOpenWindow, renderLoading = _a.renderLoading, renderError = _a.renderError, style = _a.style, containerStyle = _a.containerStyle, source = _a.source, nativeConfig = _a.nativeConfig, allowsInlineMediaPlayback = _a.allowsInlineMediaPlayback, allowsAirPlayForMediaPlayback = _a.allowsAirPlayForMediaPlayback, mediaPlaybackRequiresUserAction = _a.mediaPlaybackRequiresUserAction, dataDetectorTypes = _a.dataDetectorTypes, incognito = _a.incognito, decelerationRateProp = _a.decelerationRate, onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequest, otherProps = __rest(_a, ["fraudulentWebsiteWarningEnabled", "javaScriptEnabled", "cacheEnabled", "originWhitelist", "useSharedProcessPool", "textInteractionEnabled", "injectedJavaScript", "injectedJavaScriptBeforeContentLoaded", "injectedJavaScriptForMainFrameOnly", "injectedJavaScriptBeforeContentLoadedForMainFrameOnly", "injectedJavaScriptObject", "startInLoadingState", "onNavigationStateChange", "onLoadStart", "onError", "onLoad", "onLoadEnd", "onLoadProgress", "onContentProcessDidTerminate", "onFileDownload", "onHttpError", "onMessage", "onOpenWindow", "renderLoading", "renderError", "style", "containerStyle", "source", "nativeConfig", "allowsInlineMediaPlayback", "allowsAirPlayForMediaPlayback", "mediaPlaybackRequiresUserAction", "dataDetectorTypes", "incognito", "decelerationRate", "onShouldStartLoadWithRequest"]);
    var webViewRef = useRef(null);
    var onShouldStartLoadWithRequestCallback = useCallback(function (shouldStart, _url, lockIdentifier) {
        if (lockIdentifier === void 0) { lockIdentifier = 0; }
        RNCWebViewModule.shouldStartLoadWithLockIdentifier(shouldStart, lockIdentifier);
    }, []);
    var _m = useWebViewLogic({
        onNavigationStateChange: onNavigationStateChange,
        onLoad: onLoad,
        onError: onError,
        onHttpErrorProp: onHttpErrorProp,
        onLoadEnd: onLoadEnd,
        onLoadProgress: onLoadProgress,
        onLoadStart: onLoadStart,
        onMessageProp: onMessageProp,
        onOpenWindowProp: onOpenWindowProp,
        startInLoadingState: startInLoadingState,
        originWhitelist: originWhitelist,
        onShouldStartLoadWithRequestProp: onShouldStartLoadWithRequestProp,
        onShouldStartLoadWithRequestCallback: onShouldStartLoadWithRequestCallback,
        onContentProcessDidTerminateProp: onContentProcessDidTerminateProp
    }), onLoadingStart = _m.onLoadingStart, onShouldStartLoadWithRequest = _m.onShouldStartLoadWithRequest, onMessage = _m.onMessage, viewState = _m.viewState, setViewState = _m.setViewState, lastErrorEvent = _m.lastErrorEvent, onHttpError = _m.onHttpError, onLoadingError = _m.onLoadingError, onLoadingFinish = _m.onLoadingFinish, onLoadingProgress = _m.onLoadingProgress, onOpenWindow = _m.onOpenWindow, onContentProcessDidTerminate = _m.onContentProcessDidTerminate;
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
        setTintColor: function (red, blue, green, alpha) { return webViewRef.current && Commands.setTintColor(webViewRef.current, red, blue, green, alpha); },
        requestFocus: function () { return webViewRef.current && Commands.requestFocus(webViewRef.current); },
        clearCache: function (includeDiskFiles) { return webViewRef.current && Commands.clearCache(webViewRef.current, includeDiskFiles); }
    }); }, [setViewState, webViewRef]);
    useWarnIfChanges(allowsInlineMediaPlayback, 'allowsInlineMediaPlayback');
    useWarnIfChanges(allowsAirPlayForMediaPlayback, 'allowsAirPlayForMediaPlayback');
    useWarnIfChanges(incognito, 'incognito');
    useWarnIfChanges(mediaPlaybackRequiresUserAction, 'mediaPlaybackRequiresUserAction');
    useWarnIfChanges(dataDetectorTypes, 'dataDetectorTypes');
    var otherView = null;
    if (viewState === 'LOADING') {
        otherView = (renderLoading || defaultRenderLoading)();
    }
    else if (viewState === 'ERROR') {
        invariant(lastErrorEvent != null, 'lastErrorEvent expected to be non-null');
        otherView = (renderError || defaultRenderError)(lastErrorEvent === null || lastErrorEvent === void 0 ? void 0 : lastErrorEvent.domain, (_b = lastErrorEvent === null || lastErrorEvent === void 0 ? void 0 : lastErrorEvent.code) !== null && _b !== void 0 ? _b : 0, (_c = lastErrorEvent === null || lastErrorEvent === void 0 ? void 0 : lastErrorEvent.description) !== null && _c !== void 0 ? _c : '');
    }
    else if (viewState !== 'IDLE') {
        console.error("RNCWebView invalid state encountered: ".concat(viewState));
    }
    var webViewStyles = [styles.container, styles.webView, style];
    var webViewContainerStyle = [styles.container, containerStyle];
    var decelerationRate = processDecelerationRate(decelerationRateProp);
    var NativeWebView = (nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.component)
        || RNCWebView;
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
    var webView = (<NativeWebView key="webViewKey" {...otherProps} fraudulentWebsiteWarningEnabled={fraudulentWebsiteWarningEnabled} javaScriptEnabled={javaScriptEnabled} cacheEnabled={cacheEnabled} useSharedProcessPool={useSharedProcessPool} textInteractionEnabled={textInteractionEnabled} decelerationRate={decelerationRate} messagingEnabled={typeof onMessageProp === 'function'} messagingModuleName="" // android ONLY
     onLoadingError={onLoadingError} onLoadingFinish={onLoadingFinish} onLoadingProgress={onLoadingProgress} onFileDownload={onFileDownload} onLoadingStart={onLoadingStart} onHttpError={onHttpError} onMessage={onMessage} onOpenWindow={onOpenWindowProp && onOpenWindow} hasOnOpenWindowEvent={onOpenWindowProp !== undefined} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} onContentProcessDidTerminate={onContentProcessDidTerminate} injectedJavaScript={injectedJavaScript} injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoaded} injectedJavaScriptForMainFrameOnly={injectedJavaScriptForMainFrameOnly} injectedJavaScriptBeforeContentLoadedForMainFrameOnly={injectedJavaScriptBeforeContentLoadedForMainFrameOnly} injectedJavaScriptObject={JSON.stringify(injectedJavaScriptObject)} dataDetectorTypes={!dataDetectorTypes || Array.isArray(dataDetectorTypes) ? dataDetectorTypes : [dataDetectorTypes]} allowsAirPlayForMediaPlayback={allowsAirPlayForMediaPlayback} allowsInlineMediaPlayback={allowsInlineMediaPlayback} incognito={incognito} mediaPlaybackRequiresUserAction={mediaPlaybackRequiresUserAction} newSource={newSource} style={webViewStyles} hasOnFileDownload={!!onFileDownload} ref={webViewRef} 
    // @ts-expect-error old arch only
    source={sourceResolved} {...nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.props}/>);
    return (<View style={webViewContainerStyle}>
      {webView}
      {otherView}
    </View>);
});
// no native implementation for iOS, depends only on permissions
var isFileUploadSupported = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, true];
}); }); };
var WebView = Object.assign(WebViewComponent, { isFileUploadSupported: isFileUploadSupported });
export default WebView;
