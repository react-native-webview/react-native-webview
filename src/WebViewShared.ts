import { UIManager as NotTypedUIManager } from 'react-native';
import {
  WebViewNavigationEvent,
  OnShouldStartLoadWithRequest,
  CustomUIManager,
} from './WebViewTypes';

const UIManager = NotTypedUIManager as CustomUIManager;

const createOnShouldStartLoadWithRequest = (
  loadRequest: (
    shouldStart: boolean,
    url: string,
    lockIdentifier: number,
  ) => void,
  onShouldStartLoadWithRequest?: OnShouldStartLoadWithRequest,
) => {
  return ({ nativeEvent }: WebViewNavigationEvent) => {
    const { url, lockIdentifier } = nativeEvent;

    if (
      onShouldStartLoadWithRequest
      && !onShouldStartLoadWithRequest(nativeEvent)
    ) {
      loadRequest(false, url, lockIdentifier);
    }
    loadRequest(true, url, lockIdentifier);
  };
};

const getViewManagerConfig = (
  viewManagerName: 'RNCUIWebView' | 'RNCWKWebView' | 'RNCWebView',
) => {
  if (!UIManager.getViewManagerConfig) {
    return UIManager[viewManagerName];
  }
  return UIManager.getViewManagerConfig(viewManagerName);
};

export { createOnShouldStartLoadWithRequest, getViewManagerConfig };
