# React Native WebView Debugging Guide

Here are some helpful React Native WebView debugging tips.

## Debugging WebView Contents

### iOS & Safari

It's possible to debug WebView contents in the iOS simulator or on a device using Safari Developer Toolkit.

#### Steps:

1. Open Safari Preferences -> "Advanced" tab -> enable checkbox "Show Develop menu in menu bar"
2. Start app with React Native WebView in iOS simulator or iOS device
3. Safari -> Develop -> [device name] -> [app name] -> [url - title]
4. You can now debug the WebView contents just as you would on the web

##### Note:

When debugging on device you must enable Web Inspector in your device settings:

Settings -> Safari -> Advanced -> Web Inspector

### Android & Chrome

It's possible to debug WebView contents in the Android emulator or on a device using Chrome DevTools.

1. You will need to make the following change to `MainApplication.java` to enabled web contents debugging:
```java
  import android.webkit.WebView;

  @Override
  public void onCreate() {
    super.onCreate();
	  ...
    WebView.setWebContentsDebuggingEnabled(true);
  }
```
2. Start app with React Native WebView in Android emulator or Android device
3. Chrome -> DevTools -> Menu (3 dots) -> More tools -> Remote devices
4. Select your device on the left and select "Inspect" on the WebView contents you'd like to inspect
5. You can now debug the WebView contents just as you would on the web

![image](https://user-images.githubusercontent.com/1479215/47129785-9476e480-d24b-11e8-8cb1-fba77ee1c072.png)

##### Note:

When debugging on device you must enable USB debugging in your device settings:

Settings -> System -> About Phone -> Developer options -> enable USB debugging
