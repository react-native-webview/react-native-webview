package com.reactnativecommunity.webview.jsi;

import com.reactnativecommunity.webview.jsi.JsiException;

/**
 * This exception means that JSI threw a JSError which is caused by an error being thrown
 * by the javascript runtime
 */
public class JsiJSError extends JsiException {
  public JsiJSError(String msg) {
    super(msg);
  }
}
