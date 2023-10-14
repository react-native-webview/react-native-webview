import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

/** This test makes sure that when passed an empty source, we don't crash */
export default function Empty() {
    return (
        <View>
            <WebView source={undefined} />
            <WebView source={null} />
        </View>
    )
}
