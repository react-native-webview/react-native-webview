import * as React from 'react';
import {View, Button, Text} from 'react-native';
import {WebView, releaseWebView, injectJavaScriptWithWebViewKey, addOnMessageListenerForWebViewKey} from 'react-native-webview';
import PortalGate from '../portals/PortalGate';
import PortalProvider from '../portals/PortalProvider';
import { PortalContext } from '../portals/PortalContext';

const IFRAME_URI = 'https://www.usaswimming.org';
const BLUE_GATE_NAME = 'blueGate';
const GREEN_GATE_NAME = 'greenGate';
const WEB_VIEW_KEY = 'PortalTestingWebViewKey'
const IFRAME_WIDTH = 360;
const PORTALS_PAGE = 0;
const NONPORTALS_PAGE = 1;  
const INCREMENT_SECONDS_COUNTER_MESSAGE = 'INCREMENT_SECONDS_COUNTER_MESSAGE';

// based on https://dev.to/yezyilomo/global-state-management-in-react-with-global-variables-and-hooks-state-management-doesn-t-have-to-be-so-hard-2n2c
function GlobalState(initialValue) {
  this.value = initialValue;  // Actual value of a global state
  this.subscribers = [];     // List of subscribers

  this.getValue = () => {
      // Get the actual value of a global state
      return this.value;
  }

  this.setValue = (newState) => {
      // This is a method for updating a global state

      if (this.getValue() === newState) {
          // No new update
          return
      }

      this.value = newState;  // Update global state value
      this.subscribers.forEach(subscriber => {
          // Notify subscribers that the global state has changed
          subscriber(this.value);
      });
  }

  this.subscribe = (itemToSubscribe) => {
      // This is a function for subscribing to a global state
      if (this.subscribers.indexOf(itemToSubscribe) > -1) {
          // Already subsribed
          return
      }
      // Subscribe a component
      this.subscribers.push(itemToSubscribe);
  }

  this.unsubscribe = (itemToUnsubscribe) => {
      // This is a function for unsubscribing from a global state
      this.subscribers = this.subscribers.filter(
          subscriber => subscriber !== itemToUnsubscribe
      );
  }
}

function useGlobalState(globalState) {
  const [, setState] = React.useState<object>();
  const state = globalState.getValue();

  function reRender() {
      // This will be called when the global state changes
      setState({});
  }

  React.useEffect(() => {
      // Subscribe to a global state when a component mounts
      globalState.subscribe(reRender);

      return () => {
          // Unsubscribe from a global state when a component unmounts
          globalState.unsubscribe(reRender);
      }
  })

  return [state];
}

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
        <script type="text/javascript">
          function incrementSecondsCounter() {
            window.ReactNativeWebView.postMessage('${INCREMENT_SECONDS_COUNTER_MESSAGE}');
          }

          setInterval(incrementSecondsCounter, 1000);
        </script>
        <iframe src="${IFRAME_URI}" name="iframe_0" style="width: ${IFRAME_WIDTH}px; height: 500px;"></iframe>
      </body>
    </html>
`,
};


const secondsCounter = new GlobalState(0);

export default function Portals() {
  const [pageNumber, setPageNumber] = React.useState(PORTALS_PAGE);

  React.useEffect(() => {
    const subscription = addOnMessageListenerForWebViewKey(WEB_VIEW_KEY, (eventData) => {
      if (eventData.data === INCREMENT_SECONDS_COUNTER_MESSAGE) {
        secondsCounter.setValue(secondsCounter.getValue() + 1);
      }
    });
    
    return () => {
      subscription.remove();
    };
  }, []);

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

  const [seconds] = useGlobalState(secondsCounter);
  const secondsText = `seconds incremented by WebView: ${seconds};`;

  const webViewRef = React.useRef<WebView>(null);

  const webView = React.useMemo(() => {
    return (
      <WebView
          source={source}
          webViewKey={WEB_VIEW_KEY}
          ref={webViewRef}
          messagingWithWebViewKeyEnabled
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
      <Text>{secondsText}</Text>
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

const injectConsoleLogJavaScript = () => {
  injectJavaScriptWithWebViewKey(WEB_VIEW_KEY,
    `
      (function() {
        console.log('running JavaScript injected from outside of WebView');
      })()
  `);
};

function NonPortalsPage() {
  const release = () => {
    releaseWebView(WEB_VIEW_KEY);
  };

  const [seconds] = useGlobalState(secondsCounter);
  const secondsText = `seconds incremented by WebView: ${seconds};`;

  return (
    <>
      <Button
        title="Release WebView"
        onPress={release}
      />
      <Button
        title="Inject JavaScript that console logs in the WebView"
        onPress={injectConsoleLogJavaScript}
      />
      <Text>{secondsText}</Text>
    </>

  );
}
