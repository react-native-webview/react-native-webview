import type { HybridObject } from 'react-native-nitro-modules';

export interface NitroBridgeWebview
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  multiply(a: number, b: number, input: string): string;
}
