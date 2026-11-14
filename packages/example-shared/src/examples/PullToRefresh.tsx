import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, RefreshControl, StyleSheet, Text, View } from 'react-native';

import WebView from 'react-native-webview';

const ROWS = Array.from({ length: 60 }, (_, index) => `<p class="row">Row ${index + 1}</p>`).join(
  '\n',
);

const STYLE = `
  html, body { margin: 0; padding: 0; font: 16px sans-serif; }
  .row { margin: 0; padding: 0 16px; height: 56px; line-height: 56px; border-bottom: 1px solid #ddd; }
  .title { margin: 0; padding: 16px; background: #e7f5ff; }
`;

const TITLE = `<p class="title">Loaded at <script>document.write(new Date().toLocaleTimeString())</script></p>`;

const head = (extraStyle: string) => `
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${STYLE}${extraStyle}</style>
  </head>
`;

const PAGES = {
  // The document itself scrolls.
  document: `<!DOCTYPE html><html>${head('')}<body>${TITLE}${ROWS}</body></html>`,
  // The document does not scroll, an element inside it does. The WebView's own scroll
  // position stays at 0, so only the browser engine knows when the content is at its top.
  inner: `<!DOCTYPE html><html>${head(`
    html, body { height: 100%; overflow: hidden; }
    #scroller { height: 100%; overflow-y: auto; }
  `)}<body><div id="scroller">${TITLE}${ROWS}</div></body></html>`,
};

type Mode = 'controlled' | 'auto' | 'off';
type Page = keyof typeof PAGES;

const NEXT_MODE: Record<Mode, Mode> = { controlled: 'auto', auto: 'off', off: 'controlled' };
const NEXT_PAGE: Record<Page, Page> = { document: 'inner', inner: 'document' };

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  status: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  webView: { flex: 1 },
});

export default function PullToRefresh() {
  const [mode, setMode] = useState<Mode>('controlled');
  const [page, setPage] = useState<Page>('document');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [loadCount, setLoadCount] = useState(0);
  const [mountCount, setMountCount] = useState(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const resetRefresh = () => {
    clearTimeout(timeout.current);
    setRefreshing(false);
    setRefreshCount(0);
  };

  // Controlled: the app decides what a refresh does and when it is over.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshCount((count) => count + 1);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setRefreshing(false), 1500);
  }, []);

  let refreshControl;
  if (mode === 'controlled') {
    refreshControl = (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="#d6336c"
        colors={['#d6336c', '#1971c2']}
        title="Refreshing"
      />
    );
  } else if (mode === 'auto') {
    // No `onRefresh`: the WebView reloads the page and hides the indicator once it is loaded.
    refreshControl = (
      <RefreshControl
        refreshing={false}
        tintColor="#1971c2"
        colors={['#1971c2']}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Button
          testID="pullToRefresh_mode"
          title={`Mode: ${mode}`}
          onPress={() => {
            // The WebView stays mounted: the refresh control is added, changed or removed.
            resetRefresh();
            setMode(NEXT_MODE[mode]);
          }}
        />
        <Button
          testID="pullToRefresh_mount"
          title="Mount"
          onPress={() => {
            // A new WebView is mounted with `refreshing` already set. It stays set until the
            // mode is changed.
            clearTimeout(timeout.current);
            setMode('controlled');
            setRefreshing(true);
            setRefreshCount(0);
            setLoadCount(0);
            setMountCount((count) => count + 1);
          }}
        />
        <Button
          testID="pullToRefresh_page"
          title={`Page: ${page}`}
          onPress={() => {
            // A new WebView is mounted for the other page.
            resetRefresh();
            setLoadCount(0);
            setPage(NEXT_PAGE[page]);
          }}
        />
      </View>
      <View style={styles.status}>
        <Text testID="pullToRefresh_refreshCount">{`Refreshes: ${refreshCount}`}</Text>
        <Text testID="pullToRefresh_loadCount">{`Loads: ${loadCount}`}</Text>
        <Text testID="pullToRefresh_state">{refreshing ? 'Refreshing' : 'Idle'}</Text>
      </View>
      <WebView
        key={`${page}-${mountCount}`}
        testID="pullToRefresh_webView"
        style={styles.webView}
        source={{ html: PAGES[page] }}
        refreshControl={refreshControl}
        onLoad={() => setLoadCount((count) => count + 1)}
      />
    </View>
  );
}
