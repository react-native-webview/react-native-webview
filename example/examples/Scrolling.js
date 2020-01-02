/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello World</title>
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
    <p>Lorem ipsum dolor sit amet, virtute utroque voluptaria et duo, probo aeque partiendo pri at. Mea ut stet aliquip deterruisset. Inani erroribus principes ei mel, no dicit recteque delicatissimi usu. Ne has dolore nominavi, feugait hendrerit interesset vis ea, amet regione ne pri. Te cum amet etiam.</p>
    <p>Ut adipiscing neglegentur mediocritatem sea, suas abhorreant ius cu, ne nostrud feugiat per. Nam paulo facete iudicabit an, an brute mundi suavitate has, ex utamur numquam duo. Sea platonem argumentum instructior in, quo no prima inani perfecto. Ex illum postea copiosae has, ei mea sonet ocurreret.</p>
    <p>Has convenire erroribus cu, quo homero facilisis inciderint ea. Vix choro gloriatur definitionem an, te exerci debitis voluptaria pri, mea admodum antiopam neglegentur te. His ea iisque splendide, nam id malorum pertinacia. Iusto tempor in eos, vis debet erant an. An nostrum rationibus sit, et sed dicta delenit suscipiantur. Est dolore vituperatoribus in, ubique explicari est cu. Legere tractatos ut usu, probo atqui vituperata in usu, mazim nemore praesent pro no.</p>
    <p>Ei pri facilisi accusamus. Ut partem quaestio sit, an usu audiam quaerendum, ei qui hinc soleat. Fabulas phaedrum erroribus ut est. Intellegebat delicatissimi vis cu. His ea vidit libris facilis. Usu ne scripta legimus intellegam. Hendrerit urbanitas accommodare mei in.</p>
    <p>Brute appetere efficiendi has ne. Ei ornatus labores vis. Vel harum fierent no, ad erat partiendo vis, harum democritum duo at. Has no labitur vulputate. Has cu autem aperiam hendrerit, sed eu justo verear menandri.</p>
  </body>
</html>
`;

type Props = {};
type State = { lastScrollEvent: string };

export default class Scrolling extends Component<Props, State> {
  state = {
    lastScrollEvent: ''
  };

  render() {
    return (
      <View>
      <View style={{ height: 120 }}>
        <WebView
          source={{html: HTML}}
          automaticallyAdjustContentInsets={false}
          onScroll={this._onScroll}
        />
      </View>
      <Text>Last scroll event:</Text>
      <Text>{this.state.lastScrollEvent}</Text>
      </View>
    );
  }

  _onScroll = info => {
    this.setState({ lastScrollEvent: JSON.stringify(info.nativeEvent) });
  }
}
