var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from 'react';
import { Image, UIManager as NotTypedUIManager, View, NativeModules, findNodeHandle, } from 'react-native';
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import invariant from 'invariant';
import RNCWebView from "./WebViewNativeComponent.android";
import { defaultOriginWhitelist, createOnShouldStartLoadWithRequest, defaultRenderError, defaultRenderLoading, } from './WebViewShared';
import styles from './WebView.styles';
var UIManager = NotTypedUIManager;
var resolveAssetSource = Image.resolveAssetSource;
/**
 * A simple counter to uniquely identify WebView instances. Do not use this for anything else.
 */
var uniqueRef = 0;
/**
 * Renders a native WebView.
 */
var WebView = /** @class */ (function (_super) {
    __extends(WebView, _super);
    function WebView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startUrl = null;
        _this.state = {
            viewState: _this.props.startInLoadingState ? 'LOADING' : 'IDLE',
            lastErrorEvent: null
        };
        _this.onShouldStartLoadWithRequest = null;
        _this.webViewRef = React.createRef();
        _this.messagingModuleName = "WebViewMessageHandler".concat(uniqueRef += 1);
        _this.componentDidMount = function () {
            BatchedBridge.registerCallableModule(_this.messagingModuleName, _this);
        };
        _this.getCommands = function () { return UIManager.getViewManagerConfig('RNCWebView').Commands; };
        _this.goForward = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().goForward, undefined);
        };
        _this.goBack = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().goBack, undefined);
        };
        _this.reload = function () {
            _this.setState({
                viewState: 'LOADING'
            });
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().reload, undefined);
        };
        _this.stopLoading = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().stopLoading, undefined);
        };
        _this.requestFocus = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().requestFocus, undefined);
        };
        _this.postMessage = function (data) {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().postMessage, [String(data)]);
        };
        _this.clearFormData = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().clearFormData, undefined);
        };
        _this.clearCache = function (includeDiskFiles) {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().clearCache, [includeDiskFiles]);
        };
        _this.clearHistory = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().clearHistory, undefined);
        };
        /**
         * Injects a javascript string into the referenced WebView. Deliberately does not
         * return a response because using eval() to return a response breaks this method
         * on pages with a Content Security Policy that disallows eval(). If you need that
         * functionality, look into postMessage/onMessage.
         */
        _this.injectJavaScript = function (data) {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().injectJavaScript, [data]);
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
        /**
         * Returns the native `WebView` node.
         */
        _this.getWebViewHandle = function () {
            var nodeHandle = findNodeHandle(_this.webViewRef.current);
            invariant(nodeHandle != null, 'nodeHandle expected to be non-null');
            return nodeHandle;
        };
        _this.onLoadingStart = function (event) {
            var onLoadStart = _this.props.onLoadStart;
            var url = event.nativeEvent.url;
            _this.startUrl = url;
            if (onLoadStart) {
                onLoadStart(event);
            }
            _this.updateNavigationState(event);
        };
        _this.onLoadingError = function (event) {
            event.persist(); // persist this event because we need to store it
            var _b = _this.props, onError = _b.onError, onLoadEnd = _b.onLoadEnd;
            if (onError) {
                onError(event);
            }
            else {
                console.warn('Encountered an error loading page', event.nativeEvent);
            }
            if (onLoadEnd) {
                onLoadEnd(event);
            }
            if (event.isDefaultPrevented())
                return;
            _this.setState({
                lastErrorEvent: event.nativeEvent,
                viewState: 'ERROR'
            });
        };
        _this.onHttpError = function (event) {
            var onHttpError = _this.props.onHttpError;
            if (onHttpError) {
                onHttpError(event);
            }
        };
        _this.onRenderProcessGone = function (event) {
            var onRenderProcessGone = _this.props.onRenderProcessGone;
            if (onRenderProcessGone) {
                onRenderProcessGone(event);
            }
        };
        _this.onLoadingFinish = function (event) {
            var _b = _this.props, onLoad = _b.onLoad, onLoadEnd = _b.onLoadEnd;
            var url = event.nativeEvent.url;
            if (onLoad) {
                onLoad(event);
            }
            if (onLoadEnd) {
                onLoadEnd(event);
            }
            if (url === _this.startUrl) {
                _this.setState({
                    viewState: 'IDLE'
                });
            }
            _this.updateNavigationState(event);
        };
        _this.onMessage = function (event) {
            var onMessage = _this.props.onMessage;
            if (onMessage) {
                onMessage(event);
            }
        };
        _this.onLoadingProgress = function (event) {
            var onLoadProgress = _this.props.onLoadProgress;
            var progress = event.nativeEvent.progress;
            if (progress === 1) {
                _this.setState(function (state) {
                    if (state.viewState === 'LOADING') {
                        return { viewState: 'IDLE' };
                    }
                    return null;
                });
            }
            if (onLoadProgress) {
                onLoadProgress(event);
            }
        };
        _this.onShouldStartLoadWithRequestCallback = function (shouldStart, url, lockIdentifier) {
            if (lockIdentifier) {
                NativeModules.RNCWebView.onShouldStartLoadWithRequestCallback(shouldStart, lockIdentifier);
            }
            else if (shouldStart) {
                UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().loadUrl, [String(url)]);
            }
        };
        return _this;
    }
    WebView.prototype.render = function () {
        var _b = this.props, onMessage = _b.onMessage, onShouldStartLoadWithRequestProp = _b.onShouldStartLoadWithRequest, originWhitelist = _b.originWhitelist, renderError = _b.renderError, renderLoading = _b.renderLoading, source = _b.source, style = _b.style, containerStyle = _b.containerStyle, _c = _b.nativeConfig, nativeConfig = _c === void 0 ? {} : _c, otherProps = __rest(_b, ["onMessage", "onShouldStartLoadWithRequest", "originWhitelist", "renderError", "renderLoading", "source", "style", "containerStyle", "nativeConfig"]);
        var otherView = null;
        if (this.state.viewState === 'LOADING') {
            otherView = (renderLoading || defaultRenderLoading)();
        }
        else if (this.state.viewState === 'ERROR') {
            var errorEvent = this.state.lastErrorEvent;
            invariant(errorEvent != null, 'lastErrorEvent expected to be non-null');
            otherView = (renderError || defaultRenderError)(errorEvent.domain, errorEvent.code, errorEvent.description);
        }
        else if (this.state.viewState !== 'IDLE') {
            console.error("RNCWebView invalid state encountered: ".concat(this.state.viewState));
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
        var NativeWebView = nativeConfig.component || RNCWebView;
        this.onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(this.onShouldStartLoadWithRequestCallback, 
        // casting cause it's in the default props
        originWhitelist, onShouldStartLoadWithRequestProp);
        var webView = (<NativeWebView key="webViewKey" {...otherProps} messagingEnabled={typeof onMessage === 'function'} messagingModuleName={this.messagingModuleName} onLoadingError={this.onLoadingError} onLoadingFinish={this.onLoadingFinish} onLoadingProgress={this.onLoadingProgress} onLoadingStart={this.onLoadingStart} onHttpError={this.onHttpError} onRenderProcessGone={this.onRenderProcessGone} onMessage={this.onMessage} onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} ref={this.webViewRef} 
        // TODO: find a better way to type this.
        source={resolveAssetSource(source)} style={webViewStyles} {...nativeConfig.props}/>);
        return (<View style={webViewContainerStyle}>
        {webView}
        {otherView}
      </View>);
    };
    var _a;
    _a = WebView;
    WebView.defaultProps = {
        overScrollMode: 'always',
        javaScriptEnabled: true,
        thirdPartyCookiesEnabled: true,
        scalesPageToFit: true,
        allowsFullscreenVideo: false,
        allowFileAccess: false,
        saveFormDataDisabled: false,
        cacheEnabled: true,
        androidHardwareAccelerationDisabled: false,
        androidLayerType: 'none',
        originWhitelist: defaultOriginWhitelist,
        setSupportMultipleWindows: true,
        setBuiltInZoomControls: true,
        setDisplayZoomControls: false,
        nestedScrollEnabled: false
    };
    WebView.isFileUploadSupported = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            // native implementation should return "true" only for Android 5+
            return [2 /*return*/, NativeModules.RNCWebView.isFileUploadSupported()];
        });
    }); };
    return WebView;
}(React.Component));
export default WebView;
