import React, {Component} from 'react';
 import {Text, View} from 'react-native';

 import WebView from 'react-native-webview';

 type Props = {};
 type State = {};

 export default class Permission extends Component<Props, State> {
   state = {};

   render() {
     return (
       <View style={{ height: "100%" }}>
         <WebView
           ref={(ref) => (this.webview = ref)}
           onPermissionRequest={(event) => {
               console.log("!!! JS: onPermissionRequest, event: ", event.nativeEvent);
               this.webview.answerPermissionRequest(true, event.nativeEvent.resources );
           }}
             source={{uri: 'https://fatal0.netlify.app/android/webviewvideo.html'}}
           automaticallyAdjustContentInsets={false}
         />
       </View>
     );
   }
 }
