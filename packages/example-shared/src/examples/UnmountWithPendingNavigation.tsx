import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

import WebView from 'react-native-webview';

// The iframe navigates every 100 ms, so `onShouldStartLoadWithRequest` often has a
// navigation decision open when the WebView unmounts. On iOS, unmounting must release those
// decisions: none may be left in `RNCWebViewDecisionManager` after the cycles.
const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <p>Iframe navigations: <span id="count">0</span></p>
    <iframe id="frame" style="width: 100%; height: 60px"></iframe>
    <script>
      let n = 0;
      setInterval(() => {
        n += 1;
        document.getElementById('count').textContent = n;
        document.getElementById('frame').src = 'https://example.com/?' + n;
      }, 100);
    </script>
  </body>
</html>
`;

const CYCLES = 20;
const MOUNTED_MS = 1000;
const UNMOUNTED_MS = 300;

export default function UnmountWithPendingNavigation() {
  const [mounted, setMounted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    setCycle(0);
    setRunning(true);
    for (let i = 0; i < CYCLES; i += 1) {
      const start = i * (MOUNTED_MS + UNMOUNTED_MS);
      timers.current.push(setTimeout(() => setMounted(true), start));
      timers.current.push(
        setTimeout(() => {
          setMounted(false);
          setCycle(i + 1);
        }, start + MOUNTED_MS),
      );
    }
    timers.current.push(setTimeout(() => setRunning(false), CYCLES * (MOUNTED_MS + UNMOUNTED_MS)));
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        testID="unmountWithPendingNavigation_run"
        title={running ? `Running (${cycle}/${CYCLES})` : `Run ${CYCLES} cycles`}
        disabled={running}
        onPress={run}
      />
      <Button
        testID="unmountWithPendingNavigation_toggle"
        title={mounted ? 'Unmount' : 'Mount'}
        disabled={running}
        onPress={() => setMounted((m) => !m)}
      />
      <Text testID="unmountWithPendingNavigation_status">{`Cycles done: ${cycle}`}</Text>
      {mounted ? (
        <View style={{ height: 120 }}>
          <WebView
            source={{ html: HTML }}
            onShouldStartLoadWithRequest={() => true}
          />
        </View>
      ) : null}
    </View>
  );
}
