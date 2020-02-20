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
    <p style="">beforeContentLoaded <span id="before_failed" style="display: inline-block;">failed</span><span id="before_succeeded" style="display: none;">succeeded</span>!</p>
    <p style="">afterContentLoaded <span id="after_failed" style="display: inline-block;">failed</span><span id="after_succeeded" style="display: none;">succeeded</span>!</p>
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
          <View style={{ height: 200 }}>
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
              injectedJavaScriptBeforeContentLoaded={`
              window.self.colourToUse = "green";

              function declareSuccessBeforeContentLoaded(head){
                var style = window.self.document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = "#before_failed { display: none !important; }#before_succeeded { display: inline-block !important; }";
                head.appendChild(style);
              }

              const head = (window.self.document.head || window.self.document.getElementsByTagName('head')[0]);

              if(head){
                declareSuccessBeforeContentLoaded(head);
              }

              window.self.document.addEventListener("DOMContentLoaded", function (event) {
                const head = (window.self.document.head || window.self.document.getElementsByTagName('head')[0]);
                declareSuccessBeforeContentLoaded(head);
              });
              `}
              
              injectedJavaScriptForMainFrameOnly={false}

              /* We read the colourToUse property in each frame to recolour each frame */
              injectedJavaScript={`
              function declareSuccessAfterContentLoaded(head){
                var style = window.self.document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = "#after_failed { display: none !important; }#after_succeeded { display: inline-block !important; }";
                head.appendChild(style);
              }

              declareSuccessAfterContentLoaded(window.self.document.head || window.self.document.getElementsByTagName('head')[0]);

              if(window.self.colourToUse){
                window.self.document.body.style.backgroundColor = window.self.colourToUse;
              } else {
                window.self.document.body.style.backgroundColor = "cyan";
              } 
              `}
            />
          </View>
        </View>
        <Text>This test presents three iframes: iframe_0 (yellow); iframe_1 (pink); and iframe_2 (transparent, because its 'X-Frame-Options' is set to 'SAMEORIGIN').</Text>
        <Text>Before injection, the main frame's background is the browser's default value (transparent or white) and each frame has its natural colour.</Text>
        <Text>1a) At injection time "beforeContentLoaded", a variable will be set in each frame to set 'green' as the "colour to be used".</Text>
        <Text>1b) Also upon "beforeContentLoaded", a style element to change the text "beforeContentLoaded failed" -> "beforeContentLoaded succeeded" will be applied as soon as the head has loaded.</Text>
        <Text>2a) At injection time "afterContentLoaded", that variable will be read – if present, the colour green will be injected into all frames. Otherwise, cyan.</Text>
        <Text>2b) Also upon "afterContentLoaded", a style element to change the text "afterContentLoaded failed" -> "afterContentLoaded succeeded" will be applied as soon as the head has loaded.</Text>
        <Text>✅ If the main frame, iframe_0, and iframe_1 all become green or cyan, then multi-frame injection is supported.</Text>
        <Text>✅ If the two texts say "beforeContentLoaded succeeded!" and "afterContentLoaded succeeded!", then both injection times are supported.</Text>
        <Text>❌ If the text "beforeContentLoaded failed" remains unchanged, then JS injection has failed on the main frame before the content loaded.</Text>
        <Text>❌ If the text "afterContentLoaded failed" remains unchanged, then JS injection has failed on the main frame after the content loaded.</Text>
        <Text>❌ If any frames become coloured cyan, then JS injection has failed before the content loaded (but succeeded after the content loaded).</Text>
        <Text>❌ If only the main frame changes colour (to green or cyan), then multi-frame injection is not supported.</Text>
      </ScrollView>
    );
  }
}
