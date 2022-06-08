import type { ViewProps } from 'ViewPropTypes';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {Int32} from 'react-native/Libraries/Types/CodegenTypes';

type lol = Readonly<{
  uri: string;
  local: boolean;
}>

export interface NativeProps extends ViewProps {
  color: Readonly<{a: string, b: boolean}>;
  color2: readonly boolean[];
  color3: boolean;
  color4: string;
  test: lol;
  paf2: Int32;
}

export default codegenNativeComponent<NativeProps>(
  'WebViewNativeComponent',
) as HostComponent<NativeProps>;