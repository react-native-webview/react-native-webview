import IOSWebView from "./WebView.ios"; 
import AndroidWebView from "./WebView.android"; 

declare var _test1: typeof IOSWebView;
declare var _test2: typeof AndroidWebView;
console.log('_test1', _test1)
console.log('_test2', _test2)

/// export to get the shape of the module
export default { WebView: IOSWebView}