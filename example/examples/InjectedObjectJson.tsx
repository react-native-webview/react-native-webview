import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>injectedJavaScriptObject test</title>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var ele = document.createElement('p');
        ele.id = "domContentLoadedResult";
        try {
          var json = window.ReactNativeWebView.injectedObjectJson();
          if (json) {
            ele.textContent = "DOMContentLoaded: " + json;
            ele.style.color = "green";
          } else {
            ele.textContent = "DOMContentLoaded: null";
            ele.style.color = "red";
          }
        } catch (e) {
          ele.textContent = "DOMContentLoaded: FAILED - " + e.message;
          ele.style.color = "red";
        }
        document.body.appendChild(ele);
      });
    </script>
  </head>
  <body>
    <p>Testing injectedJavaScriptObject availability:</p>
  </body>
</html>
`;

type Props = {};
type State = {};

export default class InjectedObjectJson extends Component<Props, State> {
  render() {
    return (
      <ScrollView>
        <View style={{height: 300}}>
          <WebView
            source={{html: HTML}}
            onMessage={() => {}}
            injectedJavaScriptObject={{hello: 'world'}}
            injectedJavaScript={`
              var ele = document.createElement('p');
              ele.id = "afterContentLoadedResult";
              try {
                var json = window.ReactNativeWebView.injectedObjectJson();
                if (json) {
                  ele.textContent = "afterContentLoaded: " + json;
                  ele.style.color = "green";
                } else {
                  ele.textContent = "afterContentLoaded: null";
                  ele.style.color = "red";
                }
              } catch (e) {
                ele.textContent = "afterContentLoaded: FAILED - " + e.message;
                ele.style.color = "red";
              }
              document.body.appendChild(ele);
            `}
          />
        </View>
        <Text>
          This test verifies that injectedJavaScriptObject is accessible via
          window.ReactNativeWebView.injectedObjectJson() at both
          DOMContentLoaded and afterContentLoaded times.
        </Text>
        <Text>
          Both lines should be green showing the JSON object.
        </Text>
      </ScrollView>
    );
  }
}
