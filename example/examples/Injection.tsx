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
    <p style="">beforeContentLoaded on the top frame <span id="before_failed" style="display: inline-block;">failed</span><span id="before_succeeded" style="display: none;">succeeded</span>!</p>
    <p style="">afterContentLoaded on the top frame <span id="after_failed" style="display: inline-block;">failed</span><span id="after_succeeded" style="display: none;">succeeded</span>!</p>
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
          <View style={{ height: 400 }}>
            <WebView
              /**
               * This HTML is a copy of the hosted multi-frame JS injection test.
               * I have found that Android doesn't support beforeContentLoaded for a hosted HTML webpage, yet does for a static source.
               * The cause of this is unresolved.
               */
              // source={{ html: HTML }}
              source={{ uri: "https://birchlabs.co.uk/linguabrowse/infopages/obsol/rnw_iframe_test.html" }}
              automaticallyAdjustContentInsets={false}
              style={{backgroundColor:'#00000000'}}
              
              /* Must be populated in order for `messagingEnabled` to be `true` to activate the
               * JS injection user scripts, consistent with current behaviour. This is undesirable,
               * so needs addressing in a follow-up PR. */
              onMessage={() => {}}
              injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
              injectedJavaScriptForMainFrameOnly={false}
              injectedJavaScriptObject={{ hello: "world" }}

              /* We set this property in each frame */
              injectedJavaScriptBeforeContentLoaded={`
              console.log("executing injectedJavaScriptBeforeContentLoaded... " + (new Date()).toString());
              if(typeof window.top.injectedIframesBeforeContentLoaded === "undefined"){
                window.top.injectedIframesBeforeContentLoaded = [];
              }
              window.self.colourToUse = "orange";
              if(window.self === window.top){
                console.log("Was window.top. window.frames.length is:", window.frames.length);
                window.self.numberOfFramesAtBeforeContentLoaded = window.frames.length;
                function declareSuccessOfBeforeContentLoaded(head){
                  var style = window.self.document.createElement('style');
                  style.type = 'text/css';
                  style.innerHTML = "#before_failed { display: none !important; }#before_succeeded { display: inline-block !important; }";
                  head.appendChild(style);
                }

                const head = (window.self.document.head || window.self.document.getElementsByTagName('head')[0]);

                if(head){
                  declareSuccessOfBeforeContentLoaded(head);
                } else {
                  window.self.document.addEventListener("DOMContentLoaded", function (event) {
                    const head = (window.self.document.head || window.self.document.getElementsByTagName('head')[0]);
                    declareSuccessOfBeforeContentLoaded(head);
                  });
                }
              } else {
                window.top.injectedIframesBeforeContentLoaded.push(window.self.name);
                console.log("wasn't window.top.");
                console.log("wasn't window.top. Still going...");
              }
              `}

              /* We read the colourToUse property in each frame to recolour each frame */
              injectedJavaScript={`
              console.log("executing injectedJavaScript... " + (new Date()).toString());
              if(typeof window.top.injectedIframesAfterContentLoaded === "undefined"){
                window.top.injectedIframesAfterContentLoaded = [];
              }

              if(window.self.colourToUse){
                window.self.document.body.style.backgroundColor = window.self.colourToUse;
              } else {
                window.self.document.body.style.backgroundColor = "cyan";
              }

              // Example usage of injectedJavaScriptObject({hello: 'world'}), see above
              const injectedObjectJson = window.ReactNativeWebView.injectedObjectJson();
              
              if (injectedObjectJson) {
                const injectedObject = JSON.parse(injectedObjectJson);
                console.log("injectedJavaScriptObject: ", injectedObject); // injectedJavaScriptObject: { hello: 'world' }

                var injectedJavaScriptObjectEle = document.createElement('p');
                injectedJavaScriptObjectEle.textContent = "injectedJavaScriptObject: " + injectedObjectJson;
                injectedJavaScriptObjectEle.id = "injectedJavaScriptObjectEle";
                document.body.appendChild(injectedJavaScriptObjectEle);
              }

              if(window.self === window.top){
                function declareSuccessOfAfterContentLoaded(head){
                  var style = window.self.document.createElement('style');
                  style.type = 'text/css';
                  style.innerHTML = "#after_failed { display: none !important; }#after_succeeded { display: inline-block !important; }";
                  head.appendChild(style);
                }

                declareSuccessOfAfterContentLoaded(window.self.document.head || window.self.document.getElementsByTagName('head')[0]);

                // var numberOfFramesAtBeforeContentLoadedEle = document.createElement('p');
                // numberOfFramesAtBeforeContentLoadedEle.textContent = "Number of iframes upon the main frame's beforeContentLoaded: " +
                // window.self.numberOfFramesAtBeforeContentLoaded;

                // var numberOfFramesAtAfterContentLoadedEle = document.createElement('p');
                // numberOfFramesAtAfterContentLoadedEle.textContent = "Number of iframes upon the main frame's afterContentLoaded: " + window.frames.length;
                // numberOfFramesAtAfterContentLoadedEle.id = "numberOfFramesAtAfterContentLoadedEle";

                var namedFramesAtBeforeContentLoadedEle = document.createElement('p');
                namedFramesAtBeforeContentLoadedEle.textContent = "Names of iframes that called beforeContentLoaded: " + JSON.stringify(window.top.injectedIframesBeforeContentLoaded || []);
                namedFramesAtBeforeContentLoadedEle.id = "namedFramesAtBeforeContentLoadedEle";

                var namedFramesAtAfterContentLoadedEle = document.createElement('p');
                namedFramesAtAfterContentLoadedEle.textContent = "Names of iframes that called afterContentLoaded: " + JSON.stringify(window.top.injectedIframesAfterContentLoaded);
                namedFramesAtAfterContentLoadedEle.id = "namedFramesAtAfterContentLoadedEle";

                // document.body.appendChild(numberOfFramesAtBeforeContentLoadedEle);
                // document.body.appendChild(numberOfFramesAtAfterContentLoadedEle);
                document.body.appendChild(namedFramesAtBeforeContentLoadedEle);
                document.body.appendChild(namedFramesAtAfterContentLoadedEle);
              } else {
                window.top.injectedIframesAfterContentLoaded.push(window.self.name);
                window.top.document.getElementById('namedFramesAtAfterContentLoadedEle').textContent = "Names of iframes that called afterContentLoaded: " + JSON.stringify(window.top.injectedIframesAfterContentLoaded);
              }
              `}
            />
          </View>
        </View>
        <Text>This test presents three iframes: iframe_0 (yellow); iframe_1 (pink); and iframe_2 (transparent, because its 'X-Frame-Options' is set to 'SAMEORIGIN').</Text>
        <Text>Before injection, the main frame's background is the browser's default value (transparent or white) and each frame has its natural colour.</Text>
        {/*<Text>1a) At injection time "beforeContentLoaded", a variable will be set in each frame to set 'orange' as the "colour to be used".</Text>*/}
        {/*<Text>1b) Also upon "beforeContentLoaded", a style element to change the text "beforeContentLoaded failed" -> "beforeContentLoaded succeeded" will be applied as soon as the head has loaded.</Text>*/}
        {/*<Text>2a) At injection time "afterContentLoaded", that variable will be read – if present, the colour orange will be injected into all frames. Otherwise, cyan.</Text>*/}
        {/*<Text>2b) Also upon "afterContentLoaded", a style element to change the text "afterContentLoaded failed" -> "afterContentLoaded succeeded" will be applied as soon as the head has loaded.</Text>*/}
        <Text>✅ If the main frame becomes orange, then top-frame injection both beforeContentLoaded and afterContentLoaded is supported.</Text>
        <Text>✅ If iframe_0, and iframe_1 become orange, then multi-frame injection beforeContentLoaded and afterContentLoaded is supported.</Text>
        <Text>✅ If the two texts say "beforeContentLoaded on the top frame succeeded!" and "afterContentLoaded on the top frame succeeded!", then both injection times are supported at least on the main frame.</Text>
        <Text>❌ If either of the two iframes become coloured cyan, then for that given frame, JS injection succeeded after the content loaded, but didn't occur before the content loaded.</Text>
        <Text>❌ If "Names of iframes that called beforeContentLoaded: " is [], then see above.</Text>
        <Text>❌ If "Names of iframes that called afterContentLoaded: " is [], then afterContentLoaded is not supported in iframes.</Text>
        <Text>❌ If the main frame becomes coloured cyan, then JS injection succeeded after the content loaded, but didn't occur before the content loaded.</Text>
        <Text>❌ If the text "beforeContentLoaded on the top frame failed" remains unchanged, then JS injection has failed on the main frame before the content loaded.</Text>
        <Text>❌ If the text "afterContentLoaded on the top frame failed" remains unchanged, then JS injection has failed on the main frame after the content loaded.</Text>
        <Text>❌ If the iframes remain their original colours (yellow and pink), then multi-frame injection is not supported at all.</Text>
      </ScrollView>
    );
  }
}
