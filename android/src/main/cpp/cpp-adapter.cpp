#include <jni.h>
#include "NitroBridgeWebviewOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::bridgewebview::initialize(vm);
}
