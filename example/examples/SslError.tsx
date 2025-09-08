import React, {Component} from 'react';
import {View} from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class SslError extends Component<Props, State> {
    state = {};

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{uri: "https://badssl.com/"}}
                    onLoadSubResourceError={(event) => {
                        console.log('onLoadSubResourceError', event.nativeEvent.description);
                    }}
                />
            </View>
        );
    }
}
