import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  errorContainer: ViewStyle;
  errorText: TextStyle;
  errorTextTitle: TextStyle;
  hidden: ViewStyle;
  loadingView: ViewStyle;
  webView: ViewStyle;
  loadingProgressBar: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  hidden: {
    height: 0,
    flex: 0, // disable 'flex:1' when hiding a View
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingProgressBar: {
    height: 20,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  errorTextTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  webView: {
    backgroundColor: '#ffffff',
  },
});

export default styles;
