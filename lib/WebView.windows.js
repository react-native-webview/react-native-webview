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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from 'react';
import { UIManager as NotTypedUIManager, View, requireNativeComponent, StyleSheet, Image, findNodeHandle, } from 'react-native';
import { createOnShouldStartLoadWithRequest, } from './WebViewShared';
var UIManager = NotTypedUIManager;
var resolveAssetSource = Image.resolveAssetSource;
var RCTWebView = requireNativeComponent('RCTWebView');
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    hidden: {
        height: 0,
        flex: 0
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingProgressBar: {
        height: 20
    }
});
var WebView = /** @class */ (function (_super) {
    __extends(WebView, _super);
    function WebView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            viewState: _this.props.startInLoadingState ? 'LOADING' : 'IDLE',
            lastErrorEvent: null
        };
        _this.webViewRef = React.createRef();
        _this.goForward = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), UIManager.getViewManagerConfig('RCTWebView').Commands.goForward, undefined);
        };
        _this.goBack = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), UIManager.getViewManagerConfig('RCTWebView').Commands.goBack, undefined);
        };
        _this.reload = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), UIManager.getViewManagerConfig('RCTWebView').Commands.reload, undefined);
        };
        _this.injectJavaScript = function (data) {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), UIManager.getViewManagerConfig('RCTWebView').Commands.injectJavaScript, [data]);
        };
        /**
         * We return an event with a bunch of fields including:
         *  url, title, loading, canGoBack, canGoForward
         */
        _this.updateNavigationState = function (event) {
            if (_this.props.onNavigationStateChange) {
                _this.props.onNavigationStateChange(event.nativeEvent);
            }
        };
        _this.getWebViewHandle = function () {
            // eslint-disable-next-line react/no-string-refs
            return findNodeHandle(_this.webViewRef.current);
        };
        _this.onLoadingStart = function (event) {
            var onLoadStart = _this.props.onLoadStart;
            if (onLoadStart) {
                onLoadStart(event);
            }
            _this.updateNavigationState(event);
        };
        _this.onLoadingProgress = function (event) {
            var onLoadProgress = _this.props.onLoadProgress;
            if (onLoadProgress) {
                onLoadProgress(event);
            }
        };
        _this.onLoadingError = function (event) {
            event.persist(); // persist this event because we need to store it
            var _a = _this.props, onError = _a.onError, onLoadEnd = _a.onLoadEnd;
            if (onError) {
                onError(event);
            }
            if (onLoadEnd) {
                onLoadEnd(event);
            }
            console.error('Encountered an error loading page', event.nativeEvent);
            _this.setState({
                lastErrorEvent: event.nativeEvent,
                viewState: 'ERROR'
            });
        };
        _this.onLoadingFinish = function (event) {
            var _a = _this.props, onLoad = _a.onLoad, onLoadEnd = _a.onLoadEnd;
            if (onLoad) {
                onLoad(event);
            }
            if (onLoadEnd) {
                onLoadEnd(event);
            }
            _this.setState({
                viewState: 'IDLE'
            });
            _this.updateNavigationState(event);
        };
        _this.onMessage = function (event) {
            var onMessage = _this.props.onMessage;
            if (onMessage) {
                onMessage(event);
            }
        };
        _this.onHttpError = function (event) {
            var onHttpError = _this.props.onHttpError;
            if (onHttpError) {
                onHttpError(event);
            }
        };
        return _this;
    }
    WebView.prototype.render = function () {
        var _a = this.props, _b = _a.nativeConfig, nativeConfig = _b === void 0 ? {} : _b, onMessage = _a.onMessage, onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequest, originWhitelist = _a.originWhitelist, renderError = _a.renderError, renderLoading = _a.renderLoading, style = _a.style, containerStyle = _a.containerStyle, otherProps = __rest(_a, ["nativeConfig", "onMessage", "onShouldStartLoadWithRequest", "originWhitelist", "renderError", "renderLoading", "style", "containerStyle"]);
        var otherView = null;
        if (this.state.viewState === 'LOADING') {
            otherView = this.props.renderLoading && this.props.renderLoading();
        }
        else if (this.state.viewState === 'ERROR') {
            var errorEvent = this.state.lastErrorEvent;
            otherView = this.props.renderError
                && this.props.renderError(errorEvent.domain, errorEvent.code, errorEvent.description);
        }
        else if (this.state.viewState !== 'IDLE') {
            console.error('RCTWebView invalid state encountered: ', this.state.viewState);
        }
        var webViewStyles = [styles.container, this.props.style];
        if (this.state.viewState === 'LOADING'
            || this.state.viewState === 'ERROR') {
            // if we're in either LOADING or ERROR states, don't show the webView
            webViewStyles.push(styles.hidden);
        }
        var onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(function () { }, 
        // casting cause it's in the default props
        originWhitelist, onShouldStartLoadWithRequestProp);
        var NativeWebView = nativeConfig.component
            || RCTWebView;
        var webView = (<NativeWebView ref={this.webViewRef} key="webViewKey" {...otherProps} messagingEnabled={typeof onMessage === 'function'} onLoadingError={this.onLoadingError} onLoadingFinish={this.onLoadingFinish} onLoadingProgress={this.onLoadingProgress} onLoadingStart={this.onLoadingStart} onHttpError={this.onHttpError} onMessage={this.onMessage} onScroll={this.props.onScroll} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} source={resolveAssetSource(this.props.source)} style={webViewStyles} {...nativeConfig.props}/>);
        return (<View style={styles.container}>
        {webView}
        {otherView}
      </View>);
    };
    WebView.defaultProps = {
        javaScriptEnabled: true
    };
    return WebView;
}(React.Component));
export default WebView;
