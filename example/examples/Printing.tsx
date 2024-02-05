import {View} from 'react-native';

import WebView from 'react-native-webview';

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>Printing</title>
    <meta name="viewport" content="width=320, user-scalable=no">
  </head>
  <body>
    <h1>window.print() support test</h1>
    <button onclick="window.print()">
      Print me!
    </button>
  </body>
</html>
`;

const Printing: React.FunctionComponent = () => (
  <View style={{ height: 240 }}>
    <WebView source={{html: HTML}} />
  </View>
);

export default Printing;
