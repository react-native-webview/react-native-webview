#pragma once

#define UNUSED(x) (void)(x);

#include <jni.h>
#include <string>

std::string jstring2string(JNIEnv *env, jstring jStr);
void swallow_cpp_exception_and_throw_java(JNIEnv * env);