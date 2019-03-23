package com.reactnativecommunity.webview;

import android.webkit.WebViewDatabase;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class RNCWebViewDatabase extends ReactContextBaseJavaModule {
  private static final String UNSUPPORTED_CODE = "UNSUPPORTED";

  @Nonnull
  @Override
  public String getName() {
    return "RNCWebViewDatabase";
  }

  public RNCWebViewDatabase(@Nonnull ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void clearHttpAuthUsernamePassword(final Promise promise) {
    try {
      WebViewDatabase.getInstance(this.getReactApplicationContext())
        .clearHttpAuthUsernamePassword();
      promise.resolve(true);
    } catch (Throwable e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void getHttpAuthUsernamePassword(String host, String realm, final Promise promise) {
    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.O) {
      promise.reject(UNSUPPORTED_CODE, "android version is too low");
    } else {
      try {
        String[] result = WebViewDatabase.getInstance(this.getReactApplicationContext())
          .getHttpAuthUsernamePassword(host, realm);
        promise.resolve(result == null ? null : Arguments.fromArray(result));
      } catch (Throwable e) {
        promise.reject(e);
      }
    }
  }

  @ReactMethod
  public void setHttpAuthUsernamePassword(String host,
                                          String realm,
                                          String userName,
                                          String password,
                                          final Promise promise) {
    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.O) {
      promise.reject(UNSUPPORTED_CODE, "android version is too low");
    } else {
      try {
        WebViewDatabase.getInstance(this.getReactApplicationContext())
          .setHttpAuthUsernamePassword(host, realm, userName, password);
        promise.resolve(true);
      } catch (Throwable e) {
        promise.reject(e);
      }
    }
  }


  @ReactMethod
  public void hasHttpAuthUsernamePassword(final Promise promise) {
    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.O) {
      promise.reject(UNSUPPORTED_CODE, "android version is too low");
    } else {
      try {
        boolean result = WebViewDatabase.getInstance(this.getReactApplicationContext())
          .hasHttpAuthUsernamePassword();
        promise.resolve(result);
      } catch (Throwable e) {
        promise.reject(e);
      }
    }
  }

  @ReactMethod
  public void clearFormData(final Promise promise) {
    try {
      WebViewDatabase.getInstance(this.getReactApplicationContext())
        .clearFormData();
      promise.resolve(true);
    } catch (Throwable e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void hasFormData(final Promise promise) {
    try {
      boolean result = WebViewDatabase.getInstance(this.getReactApplicationContext())
        .hasFormData();
      promise.resolve(result);
    } catch (Throwable e) {
      promise.reject(e);
    }
  }
}
