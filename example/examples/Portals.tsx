import * as React from 'react';
import {View, Button, NativeModules} from 'react-native';
import PortalGate from '../portals/PortalGate';
import PortalProvider from '../portals/PortalProvider';
import WebView, {releaseWebView} from 'react-native-webview';
import { PortalContext } from '../portals/PortalContext';

const IFRAME_URI = 'https://www.usaswimming.org';
const BLUE_GATE_NAME = 'blueGate';
const GREEN_GATE_NAME = 'greenGate';
const WEB_VIEW_KEY = 'PortalTestingWebViewKey'
const IFRAME_WIDTH = 360;
const PORTALS_PAGE = 0;
const NONPORTALS_PAGE = 1;

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
  const [pageNumber, setPageNumber] = React.useState(PORTALS_PAGE);

  const togglePages = () => {
    const nextPage =  pageNumber === PORTALS_PAGE ? NONPORTALS_PAGE : PORTALS_PAGE;
    setPageNumber(nextPage);
  }

  return (
    <>
      <Button
        title="Toggle Pages"
        onPress={togglePages}
      />
    {pageNumber === PORTALS_PAGE ? (
      <PortalProvider>
        <PortalGatesPage/>
      </PortalProvider>
    ) : null }
    {pageNumber === NONPORTALS_PAGE ? (
      <NonPortalsPage/>
    ) : null }
    </>

  )
}

function PortalGatesPage() {
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
    releaseWebView(WEB_VIEW_KEY);
  }, []);

  React.useEffect(() => {
    teleportToBlueGate();
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

function NonPortalsPage() {
  const release = () => {
    releaseWebView(WEB_VIEW_KEY);
  };

  return (
    <Button
        title="Release WebView"
        onPress={release}
      />
  );
}
