import React, {Component} from 'react';
import {Text, View} from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Alerts</title>
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
    <button onclick="showAlert()">Show alert</button>
    <button onclick="showConfirm()">Show confirm</button>
    <button onclick="showPrompt()">Show prompt</button>
    <p id="demo"></p>    
    <script>
      function showAlert() {
        alert("Hello! I am an alert box!");
        document.getElementById("demo").innerHTML = "Alert dismissed!";
      }
      function showConfirm() {
        var response;
        if (confirm("Press a button!")) {
          response = "You pressed OK on confirm!";
        } else {
          response = "You pressed Cancel on confirm!";
        }
        document.getElementById("demo").innerHTML = response;
      }
      function showPrompt() {
        var message;
        const name = prompt("Please enter your name", "Name");
        if (name !== null) {
          message = "Hello " + name;
        } else {
          message = "You pressed Cancel on prompt!";
        }
        document.getElementById("demo").innerHTML = message;
      }
    </script>
  </body>
</html>
`;

type Props = {};
type State = {};

export default class Alerts extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{ height: 120 }}>
        <WebView
          source={{html: HTML}}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}
