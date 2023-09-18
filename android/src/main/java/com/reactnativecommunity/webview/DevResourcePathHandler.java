package com.reactnativecommunity.webview;

import android.content.Context;
import android.util.Log;
import android.webkit.WebResourceResponse;

import androidx.annotation.NonNull;
import androidx.annotation.WorkerThread;
import androidx.webkit.WebViewAssetLoader;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Handler class to open a file from cache directory.
 * Only used in debug when connected with a metro server.
 */
public final class DevResourcePathHandler implements WebViewAssetLoader.PathHandler {
  private final File cacheDirectory;

  public DevResourcePathHandler(@NonNull Context context) {
    this.cacheDirectory = context.getCacheDir();
  }

  @Override
  @WorkerThread
  public WebResourceResponse handle(@NonNull String path) {
    try {
      String cachePath = this.cacheDirectory.getAbsolutePath() + "/" + path;
      InputStream is = new FileInputStream(cachePath);
      String mimeType = "text/html";
      return new WebResourceResponse(mimeType, null, is);
    } catch (IOException e) {
      Log.e("RNCWebViewManager", "Error opening asset path: " + path, e);
      throw new RuntimeException("Error opening asset path: " + path, e);
    }
  }
}