import * as React from 'react';
import {View, Button} from 'react-native';
import PortalGate from '../portals/PortalGate';
import PortalProvider from '../portals/PortalProvider';

import WebView from 'react-native-webview';
import { PortalContext } from '../portals/PortalContext';

const IFRAME_URI = 'https://www.usaswimming.org';
const BLUE_GATE_NAME = 'blueGate';
const GREEN_GATE_NAME = 'greenGate';
const WEB_VIEW_KEY = 'PortalTestingWebViewKey'
const IFRAME_WIDTH = 360;

const source = {
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>iframe test</title>
      </head>
      <body>
       <iframe src="${IFRAME_URI}" name="iframe_0" style="width: ${IFRAME_WIDTH}px; height: 500px;"></iframe>
      </body>
    </html>
`,
};

export default function Portals() {
  return (
    <PortalProvider>
      <PortalGates/>
    </PortalProvider>
  )
}

function PortalGates() {
  const {gates, teleport} = React.useContext(PortalContext);

  const [releaseCounter, setReleaseCounter] = React.useState(0);

  const webViewRef = React.useRef<WebView>(null);

  const webView = React.useMemo(() => {
    return (
      <WebView
          source={source}
          webViewKey={WEB_VIEW_KEY}
          keepWebViewInstanceAfterUnmount
          ref={webViewRef}
        />
    );
  }, [releaseCounter]);

  const teleportToBlueGate = React.useCallback(() => {
    teleport(gates, GREEN_GATE_NAME, undefined);
    teleport(gates, BLUE_GATE_NAME, webView);
  }, [teleport, webView]);

  const teleportToGreenGate = React.useCallback(() => {
    teleport(gates, BLUE_GATE_NAME, undefined);
    teleport(gates, GREEN_GATE_NAME, webView);
  }, [teleport, webView])

  const release = React.useCallback(() => {
    teleport(gates, GREEN_GATE_NAME, undefined);
    teleport(gates, BLUE_GATE_NAME, undefined);
    setReleaseCounter(releaseCounter + 1);
    webViewRef.current?.release();
  }, []);

  return (
    <>
      <Button
        title="Teleport to blue gate"
        onPress={teleportToBlueGate}
      />
      <Button
        title="Teleport to green gate"
        onPress={teleportToGreenGate}
      />
      <Button
        title="Release WebView"
        onPress={release}
      />
      <View style={{width: IFRAME_WIDTH, height: 160, backgroundColor: 'blue', marginBottom: 32}}>
        <PortalGate gateName={BLUE_GATE_NAME}/>
      </View>
      <View style={{width: IFRAME_WIDTH, height: 200, backgroundColor: 'green'}}>
        <PortalGate gateName={GREEN_GATE_NAME}/>
      </View>
    </>
  )
}
