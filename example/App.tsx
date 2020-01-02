import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#20232a'},
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: 'https://facebook.github.io/react-native/'}} />
    </SafeAreaView>
  );
};

export default App;
