#include "ReactNativeWebviewComponentsRegistry.h"

#include <CoreComponentsRegistry.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <react/renderer/components/rncore/ComponentDescriptors.h>
#include <react/renderer/components/reactnativewebview/ComponentDescriptors.h>

namespace facebook {
namespace react {

ReactNativeWebviewComponentsRegistry::ReactNativeWebviewComponentsRegistry(
    ComponentFactory *delegate)
    : delegate_(delegate) {}

std::shared_ptr<ComponentDescriptorProviderRegistry const>
ReactNativeWebviewComponentsRegistry::sharedProviderRegistry() {
  auto providerRegistry = CoreComponentsRegistry::sharedProviderRegistry();

  // Gesture Handler
  // providerRegistry->add(concreteComponentDescriptorProvider<RNGestureHandlerButtonComponentDescriptor>());
  // Webview

  return providerRegistry;
}

jni::local_ref<ReactNativeWebviewComponentsRegistry::jhybriddata>
ReactNativeWebviewComponentsRegistry::initHybrid(
    jni::alias_ref<jclass>,
    ComponentFactory *delegate) {
  auto instance = makeCxxInstance(delegate);

  auto buildRegistryFunction =
      [](EventDispatcher::Weak const &eventDispatcher,
         ContextContainer::Shared const &contextContainer)
      -> ComponentDescriptorRegistry::Shared {
    auto registry = ReactNativeWebviewComponentsRegistry::sharedProviderRegistry()
                        ->createComponentDescriptorRegistry(
                            {eventDispatcher, contextContainer});

    auto mutableRegistry =
        std::const_pointer_cast<ComponentDescriptorRegistry>(registry);

    mutableRegistry->setFallbackComponentDescriptor(
        std::make_shared<UnimplementedNativeViewComponentDescriptor>(
            ComponentDescriptorParameters{
                eventDispatcher, contextContainer, nullptr}));

    return registry;
  };

  delegate->buildRegistryFunction = buildRegistryFunction;
  return instance;
}

void ReactNativeWebviewComponentsRegistry::registerNatives() {
  registerHybrid({
      makeNativeMethod("initHybrid", ReactNativeWebviewComponentsRegistry::initHybrid),
  });
  
  // This is a temporary solution that allows components exported by gesture-handler
  // library to be added to the main component registry. This code is triggered
  // when c++ gesture-handler library is initialized and is needed because RN's autolinking
  // does not currently support Fabric components. As a consequence, users would need
  // to manually put library initialization calls in their ReactNativeHost implementation
  // which is undesirable.
  sharedProviderRegistry();
}

} // namespace react
} // namespace facebook