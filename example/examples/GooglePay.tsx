import React, {Component} from 'react';
import {View} from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class Alerts extends Component<Props, State> {
    state = {};

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView                    
                    source={{uri: "https://rsolomakhin.github.io/pr/gp2-test"}}
                    paymentRequestEnabled={true}
                />
            </View>
        );
    }
}
