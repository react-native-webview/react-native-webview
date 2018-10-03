
package com.reactnativecommunity.webview;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.support.annotation.RequiresApi;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.FileProvider;
import android.util.Log;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static android.app.Activity.RESULT_OK;

public class RNCWebViewModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  private final ReactApplicationContext reactContext;
  private RNCWebViewPackage aPackage;

  private static final int REQUEST_CAMERA = 1;
  private static final int SELECT_FILE = 2;

  private ValueCallback<Uri[]> filePathCallback;
  private Uri outputFileUri;
  private String intentTypeAfterPermissionGranted;

  final String[] DEFAULT_MIME_TYPES = {"*/*"};

  // @todo these could be passed from JS
  final String TAKE_PHOTO = "Take a photo…";
  final String TAKE_VIDEO = "Record a video…";
  final String CHOOSE_FILE = "Choose an existing file…";
  final String CANCEL = "Cancel";

  public RNCWebViewModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addActivityEventListener(this);
  }

  @Override
  public String getName() {
    return "RNCWebView";
  }

  @ReactMethod
  public void isFileUploadSupported(final Promise promise) {
      Boolean result = false;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
          result = true;
      }
      promise.resolve(result);
  }

  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    if (this.filePathCallback == null) {
        return;
    }

    // based off of which button was pressed, we get an activity result and a file
    // the camera activity doesn't properly return the filename* (I think?) so we use
    // this filename instead
    switch (requestCode) {
    case REQUEST_CAMERA:
        if (resultCode == RESULT_OK) {
            Log.i("RESULT_OK", outputFileUri.toString());
            filePathCallback.onReceiveValue(new Uri[] { outputFileUri });
        } else {
            filePathCallback.onReceiveValue(null);
        }
        break;
    case SELECT_FILE:
        if (resultCode == RESULT_OK && data != null) {
            Uri result[] = this.getSelectedFiles(data, resultCode);
            filePathCallback.onReceiveValue(result);
        } else {
            filePathCallback.onReceiveValue(null);
        }
        break;
    }
    this.filePathCallback = null;
  }

  public void onNewIntent(Intent intent) {
  }

  private Uri[] getSelectedFiles(Intent data, int resultCode) {
    // we have one file selected
    if (data.getData() != null) {
        if (resultCode == RESULT_OK && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Uri[] result = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
            return result;
        } else {
            return null;
        }
    }
    // we have multiple files selected
    if (data.getClipData() != null) {
        final int numSelectedFiles = data.getClipData().getItemCount();
        Uri[] result = new Uri[numSelectedFiles];
        for (int i = 0; i < numSelectedFiles; i++) {
            result[i] = data.getClipData().getItemAt(i).getUri();
        }
        return result;
    }
    return null;
  }

  @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
  public boolean startPhotoPickerIntent(final ValueCallback<Uri[]> filePathCallback, final Intent intent, final String[] acceptTypes, final boolean allowMultiple) {
    this.filePathCallback = filePathCallback;
    final CharSequence[] items = getDialogItems(acceptTypes);

    android.app.AlertDialog.Builder builder = new android.app.AlertDialog.Builder(getCurrentActivity());
    builder.setTitle("Upload file:");

    // this gets called when the user:
    // 1. chooses "Cancel"
    // 2. presses "Back button"
    // 3. taps outside the dialog
    builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
        @Override
        public void onCancel(DialogInterface dialog) {
            // we need to tell the callback we cancelled
            filePathCallback.onReceiveValue(null);
        }
    });

    builder.setItems(items, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int item) {
            if (items[item].equals(TAKE_PHOTO)) {
                startCamera(MediaStore.ACTION_IMAGE_CAPTURE);
            } else if (items[item].equals(TAKE_VIDEO)) {
                startCamera(MediaStore.ACTION_VIDEO_CAPTURE);
            } else if (items[item].equals(CHOOSE_FILE)) {
                startFileChooser(intent, acceptTypes, allowMultiple);
            } else if (items[item].equals(CANCEL)) {
                dialog.cancel();
            }
        }
    });
    builder.show();

    return true;
  }

  public RNCWebViewPackage getPackage() {
    return this.aPackage;
  }

  public void setPackage(RNCWebViewPackage aPackage) {
    this.aPackage = aPackage;
  }

  private PermissionListener listener = new PermissionListener() {
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case REQUEST_CAMERA: {
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    startCamera(intentTypeAfterPermissionGranted);
                    break;
                }
                else {
                    filePathCallback.onReceiveValue(null);
                    break;
                }
            }
        }
        return false;
    }
  };

  @TargetApi(Build.VERSION_CODES.M)
  private void requestPermissions() {
    if (getCurrentActivity() instanceof ReactActivity) {
        ((ReactActivity) getCurrentActivity()).requestPermissions(new String[]{ Manifest.permission.CAMERA}, REQUEST_CAMERA, listener);
    }
    else {
        ((PermissionAwareActivity) getCurrentActivity()).requestPermissions(new String[]{ Manifest.permission.CAMERA}, REQUEST_CAMERA, listener);
    }
  }

  @TargetApi(Build.VERSION_CODES.M)
  private boolean permissionsGranted() {
    return ActivityCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
  }

  private void startCamera(String intentType) {
    if (permissionsGranted()) {
        // bring up a camera picker intent
        // we need to pass a filename for the file to be saved to
        Intent intent = new Intent(intentType);

        // Create the File where the photo should go
        outputFileUri = getOutputFilename(intentType);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, outputFileUri);
        getCurrentActivity().startActivityForResult(intent, REQUEST_CAMERA);
    } else {
        intentTypeAfterPermissionGranted = intentType;
        requestPermissions();
    }
  }

  @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
  private void startFileChooser(Intent intent, String[] acceptTypes, boolean allowMultiple) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        intent.setType("*/*");
        intent.putExtra(Intent.EXTRA_MIME_TYPES, getAcceptedMimeType(acceptTypes));
        intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, allowMultiple);
        getCurrentActivity().startActivityForResult(intent, SELECT_FILE);
    }
  }

  private File createCapturedFile(String prefix, String suffix) throws IOException {
    String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
    String imageFileName = prefix + "_" + timeStamp;
    File storageDir = getReactApplicationContext().getExternalFilesDir(null);
    return File.createTempFile(imageFileName, suffix, storageDir);
  }

  private CharSequence[] getDialogItems(String[] types) {
    List<String> listItems = new ArrayList<String>();

    if (acceptsImages(types)) {
        listItems.add(TAKE_PHOTO);
    }
    if (acceptsVideo(types)) {
        listItems.add(TAKE_VIDEO);
    }

    listItems.add(CHOOSE_FILE);
    listItems.add(CANCEL);

    return listItems.toArray(new CharSequence[listItems.size()]);
  }

  private Boolean acceptsImages(String[] types) {
    return isArrayEmpty(types) || arrayContainsString(types, "image");
  }

  private Boolean acceptsVideo(String[] types) {
    return isArrayEmpty(types) || arrayContainsString(types, "video");
  }

  private Boolean arrayContainsString(String[] array, String pattern){
    for(String content : array){
        if(content.contains(pattern)){
            return true;
        }
    }
    return false;
  }

  private String[] getAcceptedMimeType(String[] types) {
    if (isArrayEmpty(types)) {
        return DEFAULT_MIME_TYPES;
    }
    return types;
  }

  private Uri getOutputFilename(String intentType) {
    String prefix = "";
    String suffix = "";

    if (intentType == MediaStore.ACTION_IMAGE_CAPTURE) {
        prefix = "image-";
        suffix = ".jpg";
    } else if (intentType == MediaStore.ACTION_VIDEO_CAPTURE) {
        prefix = "video-";
        suffix = ".mp4";
    }

    String packageName = getReactApplicationContext().getPackageName();
    File capturedFile = null;
    try {
        capturedFile = createCapturedFile(prefix, suffix);
    } catch (IOException e) {
        Log.e("CREATE FILE", "Error occurred while creating the File", e);
        e.printStackTrace();
    }
    return FileProvider.getUriForFile(getReactApplicationContext(), packageName+".fileprovider", capturedFile);
  }

  private Boolean isArrayEmpty(String[] arr) {
    // when our array returned from getAcceptTypes() has no values set from the webview
    // i.e. <input type="file" />, without any "accept" attr
    // will be an array with one empty string element, afaik
    return arr.length == 0 || (arr.length == 1 && arr[0].length() == 0);
  }
}
