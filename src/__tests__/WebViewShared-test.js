import { Linking } from 'react-native';

import {
  defaultOriginWhitelist,
  createOnShouldStartLoadWithRequest,
} from '../WebViewShared';

describe('WebViewShared', () => {
  test('exports defaultOriginWhitelist', () => {
    expect(defaultOriginWhitelist).toMatchSnapshot();
  });

  describe('createOnShouldStartLoadWithRequest', () => {
    const alwaysTrueOnShouldStartLoadWithRequest = (nativeEvent) => {
      return true;
    };

    const alwaysFalseOnShouldStartLoadWithRequest = (nativeEvent) => {
      return false;
    };

    const loadRequest = jest.fn();

    test('loadRequest is called without onShouldStartLoadWithRequest override', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
        loadRequest,
        defaultOriginWhitelist,
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://www.example.com/', lockIdentifier: 1 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenCalledWith(true, 'https://www.example.com/', 1);
    });

    test('Linking.openURL is called without onShouldStartLoadWithRequest override', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
        loadRequest,
        defaultOriginWhitelist,
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'invalid://example.com/', lockIdentifier: 2 } });
      expect(Linking.openURL).toHaveBeenCalledWith('invalid://example.com/');
      expect(loadRequest).toHaveBeenCalledWith(false, 'invalid://example.com/', 2);
    });

    test('loadRequest with true onShouldStartLoadWithRequest override is called', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
        loadRequest,
        defaultOriginWhitelist,
        alwaysTrueOnShouldStartLoadWithRequest,
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://www.example.com/', lockIdentifier: 1 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'https://www.example.com/', 1);
    });

    test('Linking.openURL with true onShouldStartLoadWithRequest override is called for links not passing the whitelist', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
        loadRequest,
        defaultOriginWhitelist,
        alwaysTrueOnShouldStartLoadWithRequest,
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'invalid://example.com/', lockIdentifier: 1 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('invalid://example.com/');
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'invalid://example.com/', 1);
    });

    test('loadRequest with false onShouldStartLoadWithRequest override is called', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
        loadRequest,
        defaultOriginWhitelist,
        alwaysFalseOnShouldStartLoadWithRequest,
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://www.example.com/', lockIdentifier: 1 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'https://www.example.com/', 1);
    });

    test('loadRequest with limited whitelist', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
        loadRequest,
        ['https://*'],
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://www.example.com/', lockIdentifier: 1 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'https://www.example.com/', 1);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'http://insecure.com/', lockIdentifier: 2 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('http://insecure.com/');
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'http://insecure.com/', 2);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'git+https://insecure.com/', lockIdentifier: 3 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('git+https://insecure.com/');
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'git+https://insecure.com/', 3);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'fakehttps://insecure.com/', lockIdentifier: 4 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('fakehttps://insecure.com/');
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'fakehttps://insecure.com/', 4);
    });

    test('loadRequest allows for valid URIs', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
          loadRequest,
          ['plus+https://*', 'DOT.https://*', 'dash-https://*', '0invalid://*', '+invalid://*'],
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'plus+https://www.example.com/', lockIdentifier: 1 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'plus+https://www.example.com/', 1);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'DOT.https://www.example.com/', lockIdentifier: 2 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'DOT.https://www.example.com/', 2);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'dash-https://www.example.com/', lockIdentifier: 3 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'dash-https://www.example.com/', 3);

      onShouldStartLoadWithRequest({ nativeEvent: { url: '0invalid://www.example.com/', lockIdentifier: 4 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('0invalid://www.example.com/');
      expect(loadRequest).toHaveBeenLastCalledWith(false, '0invalid://www.example.com/', 4);

      onShouldStartLoadWithRequest({ nativeEvent: { url: '+invalid://www.example.com/', lockIdentifier: 5 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('+invalid://www.example.com/');
      expect(loadRequest).toHaveBeenLastCalledWith(false, '+invalid://www.example.com/', 5);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'FAKE+plus+https://www.example.com/', lockIdentifier: 6 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('FAKE+plus+https://www.example.com/');
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'FAKE+plus+https://www.example.com/', 6);
    });

    test('loadRequest with specific domains in whitelist', () => {
      const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
        loadRequest,
        ['https://*.example.co', 'https://example.co'],
      );

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://www.example.co/page0', lockIdentifier: 0 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'https://www.example.co/page0', 0);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://a.b.c.example.co/page1', lockIdentifier: 1 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'https://a.b.c.example.co/page1', 1);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://example.co/page2', lockIdentifier: 2 } });
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      expect(loadRequest).toHaveBeenLastCalledWith(true, 'https://example.co/page2', 2);

      // Wrong domain:
      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://www.example.com/page3', lockIdentifier: 3 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('https://www.example.com/page3');
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'https://www.example.com/page3', 3);

      onShouldStartLoadWithRequest({ nativeEvent: { url: 'https://www.example.co.malicious.com', lockIdentifier: 4 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('https://www.example.co.malicious.com');
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'https://www.example.co.malicious.com', 4);

      // Wrong protocol:
      onShouldStartLoadWithRequest({ nativeEvent: { url: 'http://www.example.co/page5', lockIdentifier: 5 } });
      expect(Linking.openURL).toHaveBeenLastCalledWith('http://www.example.co/page5');
      expect(loadRequest).toHaveBeenLastCalledWith(false, 'http://www.example.co/page5', 5);
    });

  });
});
