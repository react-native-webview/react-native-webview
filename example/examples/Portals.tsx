import * as React from 'react';
import {View, Button} from 'react-native';
import PortalGate from '../portals/PortalGate';
import PortalProvider from '../portals/PortalProvider';

import WebView from 'react-native-webview';
import { PortalContext } from '../portals/PortalContext';

const IFRAME_WIDTH = 360;
const IFRAME_HEIGHT = 200;
const IFRAME_URI = 'https://www.usaswimming.org';
const BLUE_GATE_NAME = 'blueGate';
const GREEN_GATE_NAME = 'greenGate';

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
       <iframe src="${IFRAME_URI}" name="iframe_0" style="width: 100%; height: 200px;"></iframe>
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

  const webView = React.useMemo(() => {
    return (
      <WebView
          source={source}
        />
    );
  }, []);

  const teleportToBlueGate = React.useCallback(() => {
    teleport(gates, BLUE_GATE_NAME, webView);
    teleport(gates, GREEN_GATE_NAME, undefined);

  }, [teleport, webView]);

  const teleportToGreenGate = React.useCallback(() => {
    teleport(gates, GREEN_GATE_NAME, webView);
    teleport(gates, BLUE_GATE_NAME, undefined);
  }, [teleport, webView])

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
      <View style={{width: IFRAME_WIDTH, height: IFRAME_HEIGHT, backgroundColor: 'blue', marginBottom: 32}}>
        <PortalGate gateName={BLUE_GATE_NAME}/>
      </View>
      <View style={{width: IFRAME_WIDTH, height: IFRAME_HEIGHT, backgroundColor: 'green'}}>
        <PortalGate gateName={GREEN_GATE_NAME}/>
      </View>
    </>
  )
}
