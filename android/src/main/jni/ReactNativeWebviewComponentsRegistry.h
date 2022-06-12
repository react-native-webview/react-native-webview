#pragma once

#include <ComponentFactory.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <react/renderer/componentregistry/ComponentDescriptorRegistry.h>

namespace facebook {
namespace react {

class ReactNativeWebviewComponentsRegistry
    : public facebook::jni::HybridClass<ReactNativeWebviewComponentsRegistry> {
 public:
  constexpr static auto kJavaDescriptor =
      "Lcom/reactnativecommunity/webview/react/ReactNativeWebviewComponentsRegistry;";

  static void registerNatives();

  ReactNativeWebviewComponentsRegistry(ComponentFactory *delegate);

 private:
  friend HybridBase;

  static std::shared_ptr<ComponentDescriptorProviderRegistry const> sharedProviderRegistry();

  const ComponentFactory *delegate_;

  static jni::local_ref<jhybriddata> initHybrid(
      jni::alias_ref<jclass>,
      ComponentFactory *delegate);
};

} // namespace react
} // namespace facebook