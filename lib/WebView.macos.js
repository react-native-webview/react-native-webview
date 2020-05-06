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
import { UIManager as NotTypedUIManager, View, requireNativeComponent, NativeModules, Image, findNodeHandle, } from 'react-native';
import invariant from 'invariant';
import { defaultOriginWhitelist, createOnShouldStartLoadWithRequest, defaultRenderError, defaultRenderLoading, } from './WebViewShared';
import styles from './WebView.styles';
var UIManager = NotTypedUIManager;
var resolveAssetSource = Image.resolveAssetSource;
var RNCWebViewManager = NativeModules.RNCWebViewManager;
var RNCWebView = requireNativeComponent('RNCWebView');
var WebView = /** @class */ (function (_super) {
    __extends(WebView, _super);
    function WebView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            viewState: _this.props.startInLoadingState ? 'LOADING' : 'IDLE',
            lastErrorEvent: null
        };
        _this.webViewRef = React.createRef();
        // eslint-disable-next-line react/sort-comp
        _this.getCommands = function () { return UIManager.getViewManagerConfig('RNCWebView').Commands; };
        /**
         * Go forward one page in the web view's history.
         */
        _this.goForward = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().goForward, undefined);
        };
        /**
         * Go back one page in the web view's history.
         */
        _this.goBack = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().goBack, undefined);
        };
        /**
         * Reloads the current page.
         */
        _this.reload = function () {
            _this.setState({ viewState: 'LOADING' });
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().reload, undefined);
        };
        /**
         * Stop loading the current page.
         */
        _this.stopLoading = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().stopLoading, undefined);
        };
        /**
         * Request focus on WebView rendered page.
         */
        _this.requestFocus = function () {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().requestFocus, undefined);
        };
        /**
         * Posts a message to the web view, which will emit a `message` event.
         * Accepts one argument, `data`, which must be a string.
         *
         * In your webview, you'll need to something like the following.
         *
         * ```js
         * document.addEventListener('message', e => { document.title = e.data; });
         * ```
         */
        _this.postMessage = function (data) {
            UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().postMessage, [String(data)]);
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
            if (onLoadStart) {
                onLoadStart(event);
            }
            _this.updateNavigationState(event);
        };
        _this.onLoadingError = function (event) {
            event.persist(); // persist this event because we need to store it
            var _a = _this.props, onError = _a.onError, onLoadEnd = _a.onLoadEnd;
            if (onLoadEnd) {
                onLoadEnd(event);
            }
            if (onError) {
                onError(event);
            }
            console.warn('Encountered an error loading page', event.nativeEvent);
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
        _this.onLoadingProgress = function (event) {
            var onLoadProgress = _this.props.onLoadProgress;
            if (onLoadProgress) {
                onLoadProgress(event);
            }
        };
        _this.onShouldStartLoadWithRequestCallback = function (shouldStart, _url, lockIdentifier) {
            var viewManager = (_this.props.nativeConfig && _this.props.nativeConfig.viewManager)
                || RNCWebViewManager;
            viewManager.startLoadWithResult(!!shouldStart, lockIdentifier);
        };
        _this.onContentProcessDidTerminate = function (event) {
            var onContentProcessDidTerminate = _this.props.onContentProcessDidTerminate;
            if (onContentProcessDidTerminate) {
                onContentProcessDidTerminate(event);
            }
        };
        return _this;
    }
    WebView.prototype.componentDidUpdate = function (prevProps) {
        this.showRedboxOnPropChanges(prevProps, 'allowsInlineMediaPlayback');
        this.showRedboxOnPropChanges(prevProps, 'incognito');
        this.showRedboxOnPropChanges(prevProps, 'mediaPlaybackRequiresUserAction');
    };
    WebView.prototype.showRedboxOnPropChanges = function (prevProps, propName) {
        if (this.props[propName] !== prevProps[propName]) {
            console.error("Changes to property " + propName + " do nothing after the initial render.");
        }
    };
    WebView.prototype.render = function () {
        var _a = this.props, _b = _a.nativeConfig, nativeConfig = _b === void 0 ? {} : _b, onMessage = _a.onMessage, onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequest, originWhitelist = _a.originWhitelist, renderError = _a.renderError, renderLoading = _a.renderLoading, style = _a.style, containerStyle = _a.containerStyle, otherProps = __rest(_a, ["nativeConfig", "onMessage", "onShouldStartLoadWithRequest", "originWhitelist", "renderError", "renderLoading", "style", "containerStyle"]);
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
            console.error("RNCWebView invalid state encountered: " + this.state.viewState);
        }
        var webViewStyles = [styles.container, styles.webView, style];
        var webViewContainerStyle = [styles.container, containerStyle];
        var onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(this.onShouldStartLoadWithRequestCallback, 
        // casting cause it's in the default props
        originWhitelist, onShouldStartLoadWithRequestProp);
        var NativeWebView = nativeConfig.component
            || RNCWebView;
        var webView = (<NativeWebView key="webViewKey" {...otherProps} messagingEnabled={typeof onMessage === 'function'} onLoadingError={this.onLoadingError} onLoadingFinish={this.onLoadingFinish} onLoadingProgress={this.onLoadingProgress} onLoadingStart={this.onLoadingStart} onHttpError={this.onHttpError} onMessage={this.onMessage} onScroll={this.props.onScroll} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} onContentProcessDidTerminate={this.onContentProcessDidTerminate} ref={this.webViewRef} 
        // TODO: find a better way to type this.
        source={resolveAssetSource(this.props.source)} style={webViewStyles} {...nativeConfig.props}/>);
        return (<View style={webViewContainerStyle}>
        {webView}
        {otherView}
      </View>);
    };
    WebView.defaultProps = {
        javaScriptEnabled: true,
        cacheEnabled: true,
        originWhitelist: defaultOriginWhitelist,
        useSharedProcessPool: true
    };
    WebView.isFileUploadSupported = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // no native implementation for macOS, depends only on permissions
            return [2 /*return*/, true];
        });
    }); };
    return WebView;
}(React.Component));
export default WebView;
