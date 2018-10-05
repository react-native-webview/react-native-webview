
package com.reactnativecommunity.webview;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.ClipData;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.support.annotation.VisibleForTesting;
import android.util.Log;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RNCWebViewModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  private final ReactApplicationContext reactContext;

  public RNCWebViewModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addActivityEventListener(this);
  }

  @Override
  public String getName() {
    return "RNCWebView";
  }

  private ValueCallback<Uri> mUploadMessage;
  private ValueCallback<Uri[]> mUploadCallbackAboveL;
  private RNCWebViewPackage mPackage;
  private ValueCallback<Uri[]> filePathCallback;
  // @todo this could be configured from JS
  final String[] DEFAULT_MIME_TYPES = { "image/*", "video/*" };
  @VisibleForTesting
  public static final String REACT_CLASS = "AndroidWebViewModule";
  public static final int OPEN_PICKER_REQUEST_CODE = 123;
  private String mCameraPhotoPath;
  private Uri mCapturedImageURI = null;
  private Uri mCapturedVideoURI = null;

  public RNCWebViewPackage getPackage() {
    return this.mPackage;
  }

  public void setPackage(RNCWebViewPackage _package) {
    this.mPackage = _package;
  }

  public Activity getActivity() {
    return getCurrentActivity();
  }

  public void setUploadMessage(ValueCallback<Uri> uploadMessage) {
    mUploadMessage = uploadMessage;
  }

  public void setmUploadCallbackAboveL(ValueCallback<Uri[]> mUploadCallbackAboveL) {
    this.mUploadCallbackAboveL = mUploadCallbackAboveL;
  }

  public void openFileChooserView(ValueCallback<Uri> uploadMessage, String acceptType) {
    mUploadMessage = uploadMessage;
    Activity activity = this.getActivity();
    File imageStorageDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES),
        "AndroidExampleFolder");
    if (!imageStorageDir.exists()) {
      // Create AndroidExampleFolder at sdcard
      imageStorageDir.mkdirs();
    }
    // Create camera captured image file path and name
    File file = new File(
        imageStorageDir + File.separator + "IMG_" + String.valueOf(System.currentTimeMillis()) + ".jpg");
    mCapturedImageURI = Uri.fromFile(file);
    // Camera capture image intent
    final Intent captureIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
    captureIntent.putExtra(MediaStore.EXTRA_OUTPUT, mCapturedImageURI);
    // Create camera captured video file path and name
    File videoFile = new File(
        imageStorageDir + File.separator + "VID_" + String.valueOf(System.currentTimeMillis()) + ".mp4");
    mCapturedVideoURI = Uri.fromFile(videoFile);
    // Video capture intent
    final Intent takeVideoIntent = new Intent(android.provider.MediaStore.ACTION_VIDEO_CAPTURE);
    takeVideoIntent.putExtra(MediaStore.EXTRA_OUTPUT, mCapturedVideoURI);
    Intent i = new Intent(Intent.ACTION_GET_CONTENT);
    i.addCategory(Intent.CATEGORY_OPENABLE);
    i.setType("image/*");
    // Create file chooser intent
    Intent chooserIntent = Intent.createChooser(i, "Image Chooser");
    // Set camera intent to file chooser
    if ((acceptType.toLowerCase().contains("image") && acceptType.toLowerCase().contains("video"))
        || acceptType.isEmpty()) {
      chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Parcelable[] { captureIntent, takeVideoIntent });
    } else if (acceptType.toLowerCase().contains("image")) {
      chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Parcelable[] { captureIntent });
    } else if (acceptType.toLowerCase().contains("video")) {
      chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Parcelable[] { takeVideoIntent });
    }
    // On select image call onActivityResult method of activity
    activity.startActivityForResult(chooserIntent, RNCWebViewModule.OPEN_PICKER_REQUEST_CODE);
  }

  @TargetApi(21)
  public boolean openFileChooserViewL(ValueCallback<Uri[]> filePathCallback,
      WebChromeClient.FileChooserParams fileChooserParams) {
    // Double check that we don't have any existing callbacks
    if (mUploadCallbackAboveL != null) {
      mUploadCallbackAboveL.onReceiveValue(null);
    }
    mUploadCallbackAboveL = filePathCallback;
    this.filePathCallback = filePathCallback;
    final String[] acceptTypes = getSafeAcceptedTypes(fileChooserParams);
    Activity activity = this.getActivity();
    String[] types = fileChooserParams.getAcceptTypes();

    Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
    contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
    String[] mimetypes;
    Intent[] intentArray;
    if (isArrayEmpty(types)) {
      intentArray = new Intent[] { createCameraIntent(), createCamcorderIntent(), createSoundRecorderIntent() };
      contentSelectionIntent.setType("*/*");
    } else if (acceptsImages(types) && acceptsVideo(types)) {
      intentArray = new Intent[] { createCameraIntent(), createCamcorderIntent() };
      contentSelectionIntent.setType("image/*");
      mimetypes = new String[] { "video/*", "image/*" };
      contentSelectionIntent.putExtra(Intent.EXTRA_MIME_TYPES, mimetypes);
    } else if (acceptsImages(types)) {
      intentArray = new Intent[] { createCameraIntent() };
      contentSelectionIntent.setType("image/*");
    } else if (acceptsVideo(types)) {
      intentArray = new Intent[] { createCamcorderIntent() };
      contentSelectionIntent.setType("video/*");
    } else if (acceptsAudio(types)) {
      intentArray = new Intent[] { createSoundRecorderIntent() };
      contentSelectionIntent.setType("audio/*");
    } else {
      intentArray = new Intent[0];
    }
    Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
    chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
    chooserIntent.putExtra(Intent.EXTRA_TITLE, "Image Chooser");
    chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);
    activity.startActivityForResult(chooserIntent, OPEN_PICKER_REQUEST_CODE);
    return true;
  }

  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    if (requestCode == OPEN_PICKER_REQUEST_CODE) {
      if (null == mUploadMessage && null == mUploadCallbackAboveL) {
        return;
      }
      if (mUploadCallbackAboveL != null) {
        onActivityResultAboveL(requestCode, resultCode, data);
      } else if (mUploadMessage != null) {
        Uri result = resultCode != Activity.RESULT_OK ? null : data == null ? mCapturedImageURI : data.getData();
        mUploadMessage.onReceiveValue(result);
        mUploadMessage = null;
      }
    }
  }

  @TargetApi(Build.VERSION_CODES.LOLLIPOP)
  private void onActivityResultAboveL(int requestCode, int resultCode, Intent data) {
    if (requestCode != OPEN_PICKER_REQUEST_CODE || mUploadCallbackAboveL == null) {
      return;
    }
    Uri[] results = null;
    if (resultCode == Activity.RESULT_OK) {
      if (data != null) {
        String dataString = data.getDataString();
        ClipData clipData = data.getClipData();
        if (clipData != null) {
          results = new Uri[clipData.getItemCount()];
          for (int i = 0; i < clipData.getItemCount(); i++) {
            ClipData.Item item = clipData.getItemAt(i);
            results[i] = item.getUri();
          }
        }
        if (dataString != null)
          results = new Uri[] { Uri.parse(dataString) };
      } else if (mCameraPhotoPath != null) {
        results = new Uri[] { Uri.parse(mCameraPhotoPath) };
      }
    }
    mUploadCallbackAboveL.onReceiveValue(results);
    mUploadCallbackAboveL = null;
  }

  public void onNewIntent(Intent intent) {
  }

  private Intent createCameraIntent() {
    Activity activity = this.getActivity();
    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    if (takePictureIntent.resolveActivity(activity.getPackageManager()) != null) {
      // Create the File where the photo should go
      File photoFile = null;
      try {
        photoFile = createCapturedFile("JPEG_", ".jpg");
        takePictureIntent.putExtra("PhotoPath", mCameraPhotoPath);
      } catch (IOException ex) {
        // Error occurred while creating the File
        Log.e("customwebview", "Unable to create Image File", ex);
      }
      // Continue only if the File was successfully created
      if (photoFile != null) {
        mCameraPhotoPath = "file:" + photoFile.getAbsolutePath();
        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(photoFile));
      } else {
        takePictureIntent = null;
      }
    }
    return takePictureIntent;
  }

  private Intent createCamcorderIntent() {
    return new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
  }

  private Intent createSoundRecorderIntent() {
    return new Intent(MediaStore.Audio.Media.RECORD_SOUND_ACTION);
  }

  private File createCapturedFile(String prefix, String suffix) throws IOException {
    String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
    String imageFileName = prefix + "_" + timeStamp;
    File storageDir = getReactApplicationContext().getExternalFilesDir(null);
    return File.createTempFile(imageFileName, suffix, storageDir);
  }

  private Boolean acceptsImages(String[] types) {
    return arrayContainsString(types, "image");
  }

  private Boolean acceptsVideo(String[] types) {
    return arrayContainsString(types, "video");
  }

  private Boolean acceptsAudio(String[] types) {
    return arrayContainsString(types, "audio");
  }

  private Boolean arrayContainsString(String[] array, String pattern) {
    for (String content : array) {
      if (content.contains(pattern)) {
        return true;
      }
    }
    return false;
  }

  private String[] getSafeAcceptedTypes(WebChromeClient.FileChooserParams params) {
    // the getAcceptTypes() is available only in api 21+
    // for lower level, we ignore it
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      return params.getAcceptTypes();
    }
    final String[] EMPTY = {};
    return EMPTY;
  }

  private String[] getAcceptedMimeType(String[] types) {
    if (isArrayEmpty(types)) {
      return DEFAULT_MIME_TYPES;
    }
    return types;
  }

  private Boolean isArrayEmpty(String[] arr) {
    // when our array returned from getAcceptTypes() has no values set from the
    // webview
    // i.e. <input type="file" />, without any "accept" attr
    // will be an array with one empty string element, afaik
    return arr.length == 0 || (arr.length == 1 && arr[0].length() == 0);
  }
}