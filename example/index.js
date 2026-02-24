/**
 * @format
 */

// Eagerly import RCTWebView2NativeComponent so that its view config is
// registered in ReactNativeViewConfigRegistry BEFORE the Fabric renderer
// attempts to mount any RCTWebView2 instance.
import '../src/RCTWebView2NativeComponent';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
