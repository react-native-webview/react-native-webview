import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import WebView, { type WebViewMessageEvent } from 'react-native-webview';

// A real page with a path and a query, so the difference between an origin and a full
// document URL is visible. Its body is replaced with three senders after load.
const PAGE_URL = 'https://httpbin.org/html?product=42&view=app';

const SENDERS = {
  main: { label: 'MAIN FRAME', color: '#1565c0', tint: '#e3f2fd' },
  sameOrigin: { label: 'IFRAME · same origin', color: '#e65100', tint: '#fff3e0' },
  sandboxed: { label: 'IFRAME · sandboxed', color: '#6a1b9a', tint: '#f3e5f5' },
} as const;

type Sender = keyof typeof SENDERS;

// Runs in the page. The bridge object is only injected into the main frame on iOS, so the
// iframes fall back to the raw WebKit message handler there.
const INJECTED = `
  (function () {
    var senders = ${JSON.stringify(SENDERS)};
    var button = function (sender) {
      return '<button style="display:block;width:100%;height:30px;font-size:14px" onclick="' +
        '(window.ReactNativeWebView || window.webkit.messageHandlers.ReactNativeWebView)' +
        ".postMessage('" + sender + "')" + '">postMessage</button>';
    };
    var section = function (sender, content) {
      var box = document.createElement('div');
      box.style.cssText = 'border:2px solid ' + senders[sender].color + ';background:' +
        senders[sender].tint + ';border-radius:6px;padding:4px 6px 6px;margin-bottom:5px';
      var label = document.createElement('div');
      label.textContent = senders[sender].label;
      label.style.cssText = 'font:600 11px sans-serif;margin-bottom:3px;color:' + senders[sender].color;
      box.appendChild(label);
      box.appendChild(content);
      return box;
    };
    var frame = function (sender, sandboxed) {
      var iframe = document.createElement('iframe');
      iframe.style.cssText = 'display:block;width:100%;height:30px;border:0';
      if (sandboxed) {
        iframe.setAttribute('sandbox', 'allow-scripts');
      }
      iframe.srcdoc = '<body style="margin:0">' + button(sender) + '</body>';
      return iframe;
    };
    var viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(viewport);
    var mainButton = document.createElement('div');
    mainButton.innerHTML = button('main');
    document.body.style.cssText = 'margin:6px';
    document.body.innerHTML = '';
    document.body.appendChild(section('main', mainButton));
    document.body.appendChild(section('sameOrigin', frame('sameOrigin', false)));
    document.body.appendChild(section('sandboxed', frame('sandboxed', true)));
  })();
  true;
`;

const CAPTION = `${Platform.OS} · page: ${PAGE_URL}`;
const HINT = 'Tap a button above to see what onMessage receives from each sender.';

type Received = {
  id: number;
  sender: Sender;
  url: string;
  mainDocumentURL?: string;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  caption: { fontSize: 12, color: '#555', marginBottom: 4 },
  webViewContainer: { flex: 0, height: 200 },
  log: { flex: 1, marginTop: 4 },
  hint: { color: '#777', fontSize: 13 },
  entry: { borderLeftWidth: 4, borderRadius: 4, padding: 6, marginBottom: 6 },
  sender: { fontWeight: '700', fontSize: 12, marginBottom: 2 },
  field: { fontSize: 12, color: '#222' },
  provided: { fontSize: 12, color: '#1b5e20', fontWeight: '700' },
  missing: { fontSize: 12, color: '#999' },
});

export default function MessageSource() {
  const [received, setReceived] = useState<Received[]>([]);

  const onMessage = (event: WebViewMessageEvent) => {
    const { data, url, mainDocumentURL } = event.nativeEvent;
    if (data in SENDERS) {
      const sender = data as Sender;
      setReceived((prev) => [...prev, { id: Date.now(), sender, url, mainDocumentURL }].slice(-6));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>{CAPTION}</Text>
      <WebView
        containerStyle={styles.webViewContainer}
        source={{ uri: PAGE_URL }}
        injectedJavaScript={INJECTED}
        onLoadStart={() => setReceived([])}
        onMessage={onMessage}
      />
      <ScrollView style={styles.log}>
        {received.length === 0 ? <Text style={styles.hint}>{HINT}</Text> : null}
        {received.map((item) => (
          <View
            key={item.id}
            style={[
              styles.entry,
              {
                borderLeftColor: SENDERS[item.sender].color,
                backgroundColor: SENDERS[item.sender].tint,
              },
            ]}
          >
            <Text style={[styles.sender, { color: SENDERS[item.sender].color }]}>
              {SENDERS[item.sender].label}
            </Text>
            <Text style={styles.field}>{`url: ${item.url}`}</Text>
            <Text style={item.mainDocumentURL ? styles.provided : styles.missing}>
              {`mainDocumentURL: ${item.mainDocumentURL || '(not provided)'}`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
