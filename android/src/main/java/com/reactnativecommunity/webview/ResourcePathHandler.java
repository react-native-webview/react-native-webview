package com.reactnativecommunity.webview;

import android.content.Context;
import android.content.res.Resources;
import android.webkit.WebResourceResponse;

import androidx.annotation.NonNull;
import androidx.annotation.WorkerThread;
import androidx.webkit.WebViewAssetLoader;

import java.io.InputStream;

/**
 * Handler class to open a file from resources directory.
 */
public final class ResourcePathHandler implements WebViewAssetLoader.PathHandler {
  private final Resources resources;
  private final String packageName;

  public ResourcePathHandler(@NonNull Context context) {
    this.resources = context.getResources();
    this.packageName = context.getPackageName();
  }

  @Override
  @WorkerThread
  public WebResourceResponse handle(@NonNull String path) {
    int resId = resources.getIdentifier(path, "raw", packageName);
    InputStream is = resources.openRawResource(resId);
    String mimeType = "text/html";
    return new WebResourceResponse(mimeType, null, is);
  }
}
