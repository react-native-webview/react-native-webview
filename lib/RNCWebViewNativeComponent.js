import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
export var Commands = codegenNativeCommands({
    supportedCommands: ['goBack', 'goForward', 'reload', 'stopLoading', 'injectJavaScript', 'requestFocus', 'postMessage', 'loadUrl', 'clearFormData', 'clearCache', 'clearHistory', 'setTintColor']
});
export default codegenNativeComponent('RNCWebView');
