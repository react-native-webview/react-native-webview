import React, { Component } from 'react';
import { View, Button, NativeModules, requireNativeComponent, UIManager } from 'react-native';
import WebView from 'react-native-webview';
import { alertIsPresent } from 'selenium-webdriver/lib/until';

const CustomViewName = 'CustomWebView';
const { CustomWebViewManager } = NativeModules;
const CustomWebView = requireNativeComponent(CustomViewName);

type Props = {};
type State = {};

export default class Custom extends Component<Props, State> {
    webview = null;

    reload = () => this.webview.reload();

    showCommands = () => {
        const commands = this.webview.getCommands();
        alert(JSON.stringify(commands));
    }

    injectAlert = () => {
        this.webview.injectJavaScript("alert('Hi from WebView')");
    }

    render() {
        return (
            <View>
                <View style={{ width: '100%', height: '100%' }}>
                    <Button title={"Inject Alert"} onPress={this.injectAlert} />
                    <Button title={"Show commands"} onPress={this.showCommands} />
                    <WebView
                      ref={ref => {this.webview = ref}}
                      source={{uri: "https://archive.org"}}
                      nativeConfig={{
                         component: CustomWebView,
                         viewManager: CustomWebViewManager,
                         viewName: CustomViewName
                      }}
                    />
                </View>
            </View>
        );
    }
}