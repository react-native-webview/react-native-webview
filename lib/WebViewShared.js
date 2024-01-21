var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import escapeStringRegexp from 'escape-string-regexp';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Linking, View, ActivityIndicator, Text, Platform } from 'react-native';
import styles from './WebView.styles';
var defaultOriginWhitelist = ['http://*', 'https://*'];
var extractOrigin = function (url) {
    var result = /^[A-Za-z][A-Za-z0-9+\-.]+:(\/\/)?[^/]*/.exec(url);
    return result === null ? '' : result[0];
};
var originWhitelistToRegex = function (originWhitelist) {
    return "^".concat(escapeStringRegexp(originWhitelist).replace(/\\\*/g, '.*'));
};
var passesWhitelist = function (compiledWhitelist, url) {
    var origin = extractOrigin(url);
    return compiledWhitelist.some(function (x) { return new RegExp(x).test(origin); });
};
var compileWhitelist = function (originWhitelist) {
    return __spreadArray(['about:blank'], (originWhitelist || []), true).map(originWhitelistToRegex);
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
                console.warn("Can't open url: ".concat(url));
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
    <Text style={styles.errorText}>{"Domain: ".concat(errorDomain)}</Text>
    <Text style={styles.errorText}>{"Error Code: ".concat(errorCode)}</Text>
    <Text style={styles.errorText}>{"Description: ".concat(errorDesc)}</Text>
  </View>); };
export { defaultOriginWhitelist, createOnShouldStartLoadWithRequest, defaultRenderLoading, defaultRenderError, };
export var useWebViewLogic = function (_a) {
    var startInLoadingState = _a.startInLoadingState, onNavigationStateChange = _a.onNavigationStateChange, onLoadStart = _a.onLoadStart, onLoad = _a.onLoad, onLoadProgress = _a.onLoadProgress, onLoadEnd = _a.onLoadEnd, onError = _a.onError, onHttpErrorProp = _a.onHttpErrorProp, onMessageProp = _a.onMessageProp, onOpenWindowProp = _a.onOpenWindowProp, onRenderProcessGoneProp = _a.onRenderProcessGoneProp, onContentProcessDidTerminateProp = _a.onContentProcessDidTerminateProp, originWhitelist = _a.originWhitelist, onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequestProp, onShouldStartLoadWithRequestCallback = _a.onShouldStartLoadWithRequestCallback;
    var _b = useState(startInLoadingState ? "LOADING" : "IDLE"), viewState = _b[0], setViewState = _b[1];
    var _c = useState(null), lastErrorEvent = _c[0], setLastErrorEvent = _c[1];
    var startUrl = useRef(null);
    var updateNavigationState = useCallback(function (event) {
        onNavigationStateChange === null || onNavigationStateChange === void 0 ? void 0 : onNavigationStateChange(event.nativeEvent);
    }, [onNavigationStateChange]);
    var onLoadingStart = useCallback(function (event) {
        // Needed for android
        startUrl.current = event.nativeEvent.url;
        // !Needed for android
        onLoadStart === null || onLoadStart === void 0 ? void 0 : onLoadStart(event);
        updateNavigationState(event);
    }, [onLoadStart, updateNavigationState]);
    var onLoadingError = useCallback(function (event) {
        event.persist();
        if (onError) {
            onError(event);
        }
        else {
            console.warn('Encountered an error loading page', event.nativeEvent);
        }
        onLoadEnd === null || onLoadEnd === void 0 ? void 0 : onLoadEnd(event);
        if (event.isDefaultPrevented()) {
            return;
        }
        ;
        setViewState('ERROR');
        setLastErrorEvent(event.nativeEvent);
    }, [onError, onLoadEnd]);
    var onHttpError = useCallback(function (event) {
        onHttpErrorProp === null || onHttpErrorProp === void 0 ? void 0 : onHttpErrorProp(event);
    }, [onHttpErrorProp]);
    // Android Only
    var onRenderProcessGone = useCallback(function (event) {
        onRenderProcessGoneProp === null || onRenderProcessGoneProp === void 0 ? void 0 : onRenderProcessGoneProp(event);
    }, [onRenderProcessGoneProp]);
    // !Android Only
    // iOS Only
    var onContentProcessDidTerminate = useCallback(function (event) {
        onContentProcessDidTerminateProp === null || onContentProcessDidTerminateProp === void 0 ? void 0 : onContentProcessDidTerminateProp(event);
    }, [onContentProcessDidTerminateProp]);
    // !iOS Only
    var onLoadingFinish = useCallback(function (event) {
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(event);
        onLoadEnd === null || onLoadEnd === void 0 ? void 0 : onLoadEnd(event);
        var url = event.nativeEvent.url;
        // on Android, only if url === startUrl
        if (Platform.OS !== "android" || url === startUrl.current) {
            setViewState('IDLE');
        }
        // !on Android, only if url === startUrl
        updateNavigationState(event);
    }, [onLoad, onLoadEnd, updateNavigationState]);
    var onMessage = useCallback(function (event) {
        onMessageProp === null || onMessageProp === void 0 ? void 0 : onMessageProp(event);
    }, [onMessageProp]);
    var onLoadingProgress = useCallback(function (event) {
        var progress = event.nativeEvent.progress;
        // patch for Android only
        if (Platform.OS === "android" && progress === 1) {
            setViewState(function (prevViewState) { return prevViewState === 'LOADING' ? 'IDLE' : prevViewState; });
        }
        // !patch for Android only
        onLoadProgress === null || onLoadProgress === void 0 ? void 0 : onLoadProgress(event);
    }, [onLoadProgress]);
    var onShouldStartLoadWithRequest = useMemo(function () { return createOnShouldStartLoadWithRequest(onShouldStartLoadWithRequestCallback, originWhitelist, onShouldStartLoadWithRequestProp); }, [originWhitelist, onShouldStartLoadWithRequestProp, onShouldStartLoadWithRequestCallback]);
    // Android and iOS Only
    var onOpenWindow = useCallback(function (event) {
        onOpenWindowProp === null || onOpenWindowProp === void 0 ? void 0 : onOpenWindowProp(event);
    }, [onOpenWindowProp]);
    // !Android and iOS Only
    return {
        onShouldStartLoadWithRequest: onShouldStartLoadWithRequest,
        onLoadingStart: onLoadingStart,
        onLoadingProgress: onLoadingProgress,
        onLoadingError: onLoadingError,
        onLoadingFinish: onLoadingFinish,
        onHttpError: onHttpError,
        onRenderProcessGone: onRenderProcessGone,
        onContentProcessDidTerminate: onContentProcessDidTerminate,
        onMessage: onMessage,
        onOpenWindow: onOpenWindow,
        viewState: viewState,
        setViewState: setViewState,
        lastErrorEvent: lastErrorEvent
    };
};
