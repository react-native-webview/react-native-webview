import { NativeModules } from 'react-native';

/**
 * android WebViewDatabase wrapper
 * https://developer.android.com/reference/android/webkit/WebViewDatabase
 * methods are directly translated to native WebViewDatabase
 */
const AndroidWebViewDatabase = {
  errorCodes: {
    unsupported: 'UNSUPPORTED',
  },

  clearHttpAuthUsernamePassword: (): Promise<void> =>
    NativeModules.RNCWebViewDatabase.clearHttpAuthUsernamePassword(),

  /**
   * @throws errorCodes.unsupported error code if called on android sdk < 26
   * @returns Promise - array of string or null.
   */
  getHttpAuthUsernamePassword: (
    host: string,
    realm: string,
  ): Promise<string[] | null> =>
    NativeModules.RNCWebViewDatabase.getHttpAuthUsernamePassword(host, realm),

  /**
   * @throws errorCodes.unsupported error code if called on android sdk < 26
   * @returns Promise - array of string or null.
   */
  setHttpAuthUsernamePassword: (
    host: string,
    realm: string,
    userName: string,
    password: string,
  ): Promise<void> =>
    NativeModules.RNCWebViewDatabase.setHttpAuthUsernamePassword(
      host,
      realm,
      userName,
      password,
    ),

  hasHttpAuthUsernamePassword: (): Promise<boolean> =>
    NativeModules.RNCWebViewDatabase.hasHttpAuthUsernamePassword(),

  clearFormData: (): Promise<void> =>
    NativeModules.RNCWebViewDatabase.clearFormData(),

  hasFormData: (): Promise<boolean> =>
    NativeModules.RNCWebViewDatabase.hasFormData(),
};

export default AndroidWebViewDatabase;
