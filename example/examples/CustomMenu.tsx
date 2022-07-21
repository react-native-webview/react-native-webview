import React, {Component} from 'react';
import {Button, Linking, Text, View} from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Context Menu</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
    </style>
  </head>
  <body>
    <p>
      Select the text to see the custom context menu.
    </p>
    <p>
      The custom context menu will show the custom menu's defined in the menuItems prop and call the onCustomMenuSelection
      on clicking on the menu Item.
    </p>
    <p>
      Third Para
    </p>
  </body>
</html>
`;

type Props = {};
type State = {};

//export default class CustomMenu extends Component<Props, State> {
export default CustomMenu = () => {
  const [selectionInfo, setSelectionInfo] = React.useState(null)

    return (
      <View>
        <View style={{ height: 120 }}>
          <WebView
            source={{html: HTML}}
            automaticallyAdjustContentInsets={false}
            menuItems={[{ label: 'Highlight', key: 'highlight' }, { label: 'Strikethrough', key: 'strikethrough' }]}
            onCustomMenuSelection={(webViewEvent) => {
            const { label, key, selectedText } = webViewEvent.nativeEvent;
            console.log('Custom Menu Tapped: ', label, ' :: ', key, ' :: ', selectedText)
            setSelectionInfo(webViewEvent.nativeEvent)
          }}
          />
        </View>
        {selectionInfo && 
          <Text> 
              onCustomMenuSelection called: {"\n"}
              - label: {selectionInfo?.label}{"\n"}
              - key: {selectionInfo?.key}{"\n"}
              - selectedText: {selectionInfo?.selectedText}
          </Text>
        }
      </View>
    );
}
