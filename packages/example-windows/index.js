// Register Fabric view config before the renderer mounts any RCTWebView2 instance
import 'react-native-webview/src/windows/RCTWebView2NativeComponent';
import { AppRegistry } from 'react-native';
import App from 'example-shared';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
