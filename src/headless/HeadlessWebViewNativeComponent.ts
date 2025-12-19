import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {
  /**
   * The ID of the pre-created WebView to display
   */
  webviewId: Double;
}

export default codegenNativeComponent<NativeProps>(
  'RNCHeadlessWebView'
) as HostComponent<NativeProps>;

