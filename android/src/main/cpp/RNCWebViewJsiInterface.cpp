#include "RNCWebViewJsiInterface.h"

#include "jsi/jsi.h"
#include "RNCWebViewJniUtils.h"

#define LOG_TAG "RNCWebViewJsiInterface"
#include "RNCWebViewLoggingMacros.h"


using namespace facebook;


extern "C" JNIEXPORT jboolean JNICALL
Java_com_reactnativecommunity_webview_jsi_WebViewJsiInterface_onShouldStartLoadWithRequest(
  JNIEnv* env,
  jobject thiz,
  jlong runtimePtr,
  jstring key,
  jstring url,
  jboolean loading,
  jstring title,
  jboolean canGoBack,
  jboolean canGoForward)
{
  UNUSED(thiz);

  auto *runtime = (jsi::Runtime *)runtimePtr;
  if (runtime != nullptr) {
    auto rncWebViewGlobal = runtime->global().getPropertyAsObject(*runtime, "RNCWebView");
    auto onShouldStartLoadWithRequest =
        rncWebViewGlobal.getPropertyAsFunction(*runtime, env->GetStringUTFChars(key, 0));
    try {
      auto nativeEvent = jsi::Object(*runtime);
      nativeEvent.setProperty(*runtime, "url", jstring2string(env, url));
      nativeEvent.setProperty(*runtime, "title", jstring2string(env, title));
      nativeEvent.setProperty(*runtime, "loading", (bool)(loading == JNI_TRUE));
      nativeEvent.setProperty(*runtime, "canGoBack", (bool)(canGoBack == JNI_TRUE));
      nativeEvent.setProperty(*runtime, "canGoForward", (bool)(canGoForward == JNI_TRUE));

      auto result = onShouldStartLoadWithRequest.call(*runtime, std::move(nativeEvent));
      return (jboolean)(result.getBool() ? JNI_TRUE : JNI_FALSE);
    } catch (...) {
      swallow_cpp_exception_and_throw_java(env);
      return JNI_FALSE;
    }
  } else {
    LOGE("Unexpected null JSI runtime found! Falling back to allowing request.");
    return JNI_FALSE;
  }
}
