#pragma once

#include <jni.h>


extern "C" {
  JNIEXPORT jboolean JNICALL
  Java_com_reactnativecommunity_webview_jsi_WebViewJsiInterface_onShouldStartLoadWithRequest(
    JNIEnv* env,
    jobject thiz,
    jlong runtimePtr,
    jstring key,
    jstring url,
    jboolean loading,
    jstring title,
    jboolean canGoBack,
    jboolean canGoForward
  );
}
