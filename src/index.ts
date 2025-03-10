import WebView from './WebView';
import { NitroModules } from 'react-native-nitro-modules';
import type { NitroBridgeWebview } from './specs/NitroBridgeWebview.nitro';

export { WebView };
export default WebView;

const NitroBridgeWebviewHybridObject =
  NitroModules.createHybridObject<NitroBridgeWebview>('NitroBridgeWebview');

export function multiply(a: number, b: number, input: string): string {
  console.log('🌈 index multiply');
  return NitroBridgeWebviewHybridObject.multiply(a, b, input);
}
