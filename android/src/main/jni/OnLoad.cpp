#include <fbjni/fbjni.h>

#include "ReactNativeWebviewComponentsRegistry.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
  return facebook::jni::initialize(vm, [] {
    facebook::react::ReactNativeWebviewComponentsRegistry::registerNatives();
  });
}