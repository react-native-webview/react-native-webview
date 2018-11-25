import IOSWebView from "./WebView.ios"; 
import AndroidWebView from "./WebView.android"; 

declare var _test1: typeof IOSWebView;
declare var _test2: typeof AndroidWebView;

/// export to get the shape of the module
export default { WebView: IOSWebView}