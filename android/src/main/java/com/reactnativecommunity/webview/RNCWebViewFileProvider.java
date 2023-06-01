package com.reactnativecommunity.webview;

import androidx.core.content.FileProvider;
import com.reactnativecommunity.webview.R;

/**
 * Providing a custom {@code FileProvider} prevents manifest {@code <provider>} name collisions.
 * <p>
 * See https://developer.android.com/guide/topics/manifest/provider-element.html for details.
 */
public class RNCWebViewFileProvider extends FileProvider {
  public RNCWebViewFileProvider() {
    super(R.xml.file_provider_paths);
  }
}