import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>iframe test</title>
	</head>
	<body>
		<iframe src="https://birchlabs.co.uk/linguabrowse/infopages/obsol/iframe.html?v=1" name="iframe_0" style="width: 100%; height: 25px;"></iframe>
		<iframe src="https://birchlabs.co.uk/linguabrowse/infopages/obsol/iframe2.html?v=1" name="iframe_1" style="width: 100%; height: 25px;"></iframe>
		<iframe src="https://www.ebay.co.uk" name="iframe_2" style="width: 100%; height: 25px;"></iframe>
	</body>
</html>
`;

type Props = {};
type State = {
  backgroundColor: string,
};

export default class Injection extends Component<Props, State> {
  state = {
    backgroundColor: '#FF00FF00'
  };

  render() {
    return (
      <ScrollView>
        <View style={{ }}>
          <View style={{ height: 120 }}>
            <WebView
              /**
               * This HTML is a copy of a multi-frame JS injection test that I had lying around.
               * @see https://birchlabs.co.uk/linguabrowse/infopages/obsol/iframeTest.html
               */
              source={{ html: HTML }}
              automaticallyAdjustContentInsets={false}
              style={{backgroundColor:'#00000000'}}
              
              /* Must be populated in order for `messagingEnabled` to be `true` to activate the
               * JS injection user scripts, consistent with current behaviour. This is undesirable,
               * so needs addressing in a follow-up PR. */
              onMessage={() => {}}
              /* We set this property in each frame */
              injectedJavaScriptBeforeContentLoaded={`window.self.colourToUse = "orange";`}
              injectedJavaScriptForMainFrameOnly={false}
              /* We read the colourToUse property in each frame to recolour each frame */
              injectedJavaScript={`window.self.document.body.style.backgroundColor = window.self.colourToUse;`}
            />
          </View>
        </View>
        <Text>This test presents three iframes: iframe_0 (yellow); iframe_1 (pink); and iframe_2 (transparent, because its 'X-Frame-Options' is set to 'SAMEORIGIN').</Text>
        <Text>Before injection, the main frame's background is the browser's default value (transparent or white) and each frame has its natural colour.</Text>
        <Text>1) At injection time "beforeContentLoaded", a variable will be set in each frame to set 'orange' as the "colour to be used".</Text>
        <Text>2) At injection time "afterContentLoaded", that variable will be read, and thus the colour orange will be injected into all frames.</Text>
        <Text>✅ If the main frame, iframe_0, and iframe_1 all become orange, then multi-frame injection is supported and both injection times are supported.</Text>
        <Text>❌ If no frames become orange, then only one (or neither) of the injection times are supported, or even injection into the main frame is failing.</Text>
        <Text>❌ If only the main frame becomes orange, then multi-frame injection is not supported.</Text>
      </ScrollView>
    );
  }
}
