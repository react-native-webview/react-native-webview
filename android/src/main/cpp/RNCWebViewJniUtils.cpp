#include <iostream>
#include <stdexcept>

#include "RNCWebViewJniUtils.h"
#include "jsi/jsi.h"


using facebook::jsi::JSIException;
using facebook::jsi::JSINativeException;
using facebook::jsi::JSError;


// This is how we represent a Java exception already in progress
struct ThrownJavaException : std::runtime_error {
    ThrownJavaException() :std::runtime_error("") {}
    ThrownJavaException(const std::string& msg ) :std::runtime_error(msg) {}
};

inline void assert_no_exception(JNIEnv * env) {
  if (env->ExceptionCheck()==JNI_TRUE)
    throw ThrownJavaException("assert_no_exception");
}

// used to throw a new Java exception. use full paths like:
// "java/lang/NoSuchFieldException"
// "java/lang/NullPointerException"
// "java/security/InvalidParameterException"
struct NewJavaException : public ThrownJavaException{
    NewJavaException(JNIEnv * env, const char* type="", const char* message="")
      :ThrownJavaException(type+std::string(" ")+message)
    {
      jclass newExcCls = env->FindClass(type);
      if (newExcCls != NULL)
        env->ThrowNew(newExcCls, message);
      //if it is null, a NoClassDefFoundError was already thrown
    }
};

void swallow_cpp_exception_and_throw_java(JNIEnv * env) {
  try {
    throw;
  } catch(const ThrownJavaException&) {
    // already reported to Java, ignore
  } catch(const JSError& e) {
    NewJavaException(env, "com/reactnativecommunity/webview/jsi/JsiJSError", e.what());
  } catch(const JSINativeException& e) {
    NewJavaException(env, "com/reactnativecommunity/webview/jsi/JsiException", e.what());
  } catch(const JSIException& e) {
    NewJavaException(env, "com/reactnativecommunity/webview/jsi/JsiException", e.what());
  } catch(const std::bad_alloc& e) {
    // translate OOM C++ exception to a Java exception
    NewJavaException(env, "java/lang/OutOfMemoryError", e.what());
  } catch(const std::exception& e) {
    // translate unknown C++ exception to a Java exception
    NewJavaException(env, "java/lang/RuntimeException", e.what());
  } catch(...) {
    // translate unknown C++ exception to a Java exception
    NewJavaException(env, "java/lang/Error", "Unknown exception type");
  }
}

std::string jstring2string(JNIEnv *env, jstring jStr) {
  if (!jStr)
    return "";

  const jclass stringClass = env->GetObjectClass(jStr);
  const jmethodID getBytes = env->GetMethodID(stringClass, "getBytes", "(Ljava/lang/String;)[B");
  const jbyteArray stringJbytes =
      (jbyteArray) env->CallObjectMethod(jStr, getBytes, env->NewStringUTF("UTF-8"));

  size_t length = (size_t) env->GetArrayLength(stringJbytes);
  jbyte* pBytes = env->GetByteArrayElements(stringJbytes, NULL);

  std::string ret = std::string((char *)pBytes, length);
  env->ReleaseByteArrayElements(stringJbytes, pBytes, JNI_ABORT);

  env->DeleteLocalRef(stringJbytes);
  env->DeleteLocalRef(stringClass);
  return ret;
}