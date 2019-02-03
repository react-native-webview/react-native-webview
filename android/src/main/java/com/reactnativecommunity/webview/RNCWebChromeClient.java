package com.reactnativecommunity.webview;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.GeolocationPermissions;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.build.ReactBuildConfig;
import com.reactnativecommunity.webview.events.TopLoadingProgressEvent;

import static android.view.Window.DECOR_CAPTION_SHADE_DARK;

public class RNCWebChromeClient extends WebChromeClient {

    private RNCWebViewManager context;
    private ReactContext reactContext;
    private View mCustomView;

    private final Handler handler = new Handler();

    private WebChromeClient.CustomViewCallback mCustomViewCallback;
    protected FrameLayout mFullscreenContainer;
    private int mOriginalOrientation;
    private int mOriginalSystemUiVisibility;

    private int iNavColor;

    View.OnSystemUiVisibilityChangeListener listener1;
    View.OnApplyWindowInsetsListener listener2;


    public RNCWebChromeClient(RNCWebViewManager context, ReactContext reactContext) {
        this.context = context;
        this.reactContext = reactContext;
    }

    @Override
    public boolean onConsoleMessage(ConsoleMessage message) {
        if (ReactBuildConfig.DEBUG) {
            return super.onConsoleMessage(message);
        }
        // Ignore console logs in non debug builds.
        return true;
    }


    @Override
    public void onProgressChanged(WebView webView, int newProgress) {
        super.onProgressChanged(webView, newProgress);
        WritableMap event = Arguments.createMap();
        event.putDouble("target", webView.getId());
        event.putString("title", webView.getTitle());
        event.putBoolean("canGoBack", webView.canGoBack());
        event.putBoolean("canGoForward", webView.canGoForward());
        event.putDouble("progress", (float)newProgress/100);
        context.dispatchEvent(
                webView,
                new TopLoadingProgressEvent(
                        webView.getId(),
                        event));
    }

    @Override
    public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        callback.invoke(origin, true, false);
    }

    protected void openFileChooser(ValueCallback<Uri> filePathCallback, String acceptType) {
        context.getModule().startPhotoPickerIntent(filePathCallback, acceptType);
    }
    protected void openFileChooser(ValueCallback<Uri> filePathCallback) {
        context.getModule().startPhotoPickerIntent(filePathCallback, "");
    }
    protected void openFileChooser(ValueCallback<Uri> filePathCallback, String acceptType, String capture) {
        context.getModule().startPhotoPickerIntent(filePathCallback, acceptType);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @Override
    public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
        String[] acceptTypes = fileChooserParams.getAcceptTypes();
        boolean allowMultiple = fileChooserParams.getMode() == WebChromeClient.FileChooserParams.MODE_OPEN_MULTIPLE;
        Intent intent = fileChooserParams.createIntent();
        return context.getModule().startPhotoPickerIntent(filePathCallback, intent, acceptTypes, allowMultiple);
    }

    public void onHideCustomView() {

        Activity mActivity = reactContext.getCurrentActivity();

        ((FrameLayout)mActivity.getWindow().getDecorView()).removeView(this.mCustomView);
        mActivity.setRequestedOrientation(this.mOriginalOrientation);

        if (Build.VERSION.SDK_INT >= 21) {
            mActivity.getWindow().setNavigationBarColor(iNavColor);
        } else {
            mActivity.getWindow().getDecorView().setSystemUiVisibility(this.mOriginalSystemUiVisibility);
            mActivity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }

        mActivity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
        mActivity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);

        if (Build.VERSION.SDK_INT >= 21) {
            WindowInsets insets = mActivity.getWindow().getDecorView().getRootWindowInsets();

            mActivity.getWindow().getDecorView().setOnApplyWindowInsetsListener(null);
            mActivity.getWindow().getDecorView().setOnSystemUiVisibilityChangeListener(null);

            this.listener1 = null;
            this.listener2 = null;

            mCustomView.setPadding(0, 0, 0, 0);
        }
        
        this.mCustomView = null;
        this.mCustomViewCallback.onCustomViewHidden();
        this.mCustomViewCallback = null;

    }

    public void onShowCustomView(View paramView, WebChromeClient.CustomViewCallback paramCustomViewCallback) {
        if (this.mCustomView != null) {
            onHideCustomView();
            return;
        }
        this.mCustomView = paramView;
        this.mCustomView.setBackgroundColor(Color.BLACK);

        Activity mActivity = reactContext.getCurrentActivity();

        this.mOriginalSystemUiVisibility = mActivity.getWindow().getDecorView().getSystemUiVisibility();
        this.mOriginalOrientation = mActivity.getRequestedOrientation();
        this.mCustomViewCallback = paramCustomViewCallback;

        mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);

        ((FrameLayout)mActivity.getWindow().getDecorView()).addView(this.mCustomView,
                new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));

        if (Build.VERSION.SDK_INT >= 21) {
            WindowInsets insets = mActivity.getWindow().getDecorView().getRootWindowInsets();
            mCustomView.setPadding(0, 0, insets.getStableInsetRight(), insets.getStableInsetBottom());

            iNavColor = mActivity.getWindow().getNavigationBarColor();
            mActivity.getWindow().setNavigationBarColor(Color.BLACK);

            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN;
            mActivity.getWindow().getDecorView().setSystemUiVisibility(uiOptions);

            this.listener1 = new View.OnSystemUiVisibilityChangeListener() {
                @Override
                public void onSystemUiVisibilityChange(int visibility) {
                    handler.removeCallbacksAndMessages(null);
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN;
                            mActivity.getWindow().getDecorView().setSystemUiVisibility(uiOptions);
                        }
                    }, 3000);
                }
            };
            mActivity.getWindow().getDecorView().setOnSystemUiVisibilityChangeListener(this.listener1);

            this.listener2 = new View.OnApplyWindowInsetsListener() {
                @Override
                public WindowInsets onApplyWindowInsets(View v, WindowInsets insets) {
                    mCustomView.setPadding(0, 0, insets.getStableInsetRight(), insets.getStableInsetBottom());
                    return insets;
                }
            };
            mActivity.getWindow().getDecorView().setOnApplyWindowInsetsListener(this.listener2);
        }
        else {
            int uiOptions = mActivity.getWindow().getDecorView().getSystemUiVisibility();
            int newUiOptions = uiOptions;
            if (Build.VERSION.SDK_INT >= 14) {
                newUiOptions ^= View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
            }
            if (Build.VERSION.SDK_INT >= 16) {
                newUiOptions ^= View.SYSTEM_UI_FLAG_FULLSCREEN;
            }
            if (Build.VERSION.SDK_INT >= 18) {
                newUiOptions ^= View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
            }
            mActivity.getWindow().getDecorView().setSystemUiVisibility(newUiOptions);
            mActivity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }

        mActivity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        mActivity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);

    }

}
