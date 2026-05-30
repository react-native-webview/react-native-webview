// Type declarations for internal React Native modules used by Windows Fabric components
declare module 'react-native/Libraries/NativeComponent/NativeComponentRegistry' {
  import type { HostComponent } from 'react-native';
  export function get<T>(name: string, viewConfigProvider: () => object): HostComponent<T>;
}
