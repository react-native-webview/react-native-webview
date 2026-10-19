require 'xcodeproj'
require 'fileutils'

root = File.expand_path('..', __dir__)
output = File.join(root, 'build', 'NativeWindowTests.xcodeproj')
FileUtils.mkdir_p(File.dirname(output))
project = Xcodeproj::Project.new(output)
host = project.new_target(:application, 'NativeWindowTestHost', :ios, '15.1')
target = project.new_target(:unit_test_bundle, 'NativeWindowTests', :ios, '15.1')
sources = project.new_group('Sources')
host_source = File.join(root, 'build', 'NativeWindowTestHost.m')
File.write(host_source, <<~OBJC)
  #import <UIKit/UIKit.h>
  @interface NativeWindowTestApp : UIResponder <UIApplicationDelegate>
  @property (nonatomic, strong) UIWindow *window;
  @end
  @implementation NativeWindowTestApp
  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)options {
    self.window = [[UIWindow alloc] initWithFrame:UIScreen.mainScreen.bounds];
    self.window.rootViewController = [UIViewController new];
    [self.window makeKeyAndVisible];
    return YES;
  }
  @end
  int main(int argc, char *argv[]) {
    @autoreleasepool {
      return UIApplicationMain(argc, argv, nil, NSStringFromClass(NativeWindowTestApp.class));
    }
  }
OBJC
host.source_build_phase.add_file_reference(sources.new_file(host_source))
host.add_system_framework('UIKit')
host.build_configurations.each do |config|
  config.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'org.reactnativewebview.NativeWindowTestHost'
  config.build_settings['GENERATE_INFOPLIST_FILE'] = 'YES'
  config.build_settings['INFOPLIST_KEY_UILaunchScreen_Generation'] = 'YES'
  config.build_settings['CLANG_ENABLE_OBJC_ARC'] = 'YES'
  config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
end
target.add_dependency(host)
%w[apple/RNCWebViewNativeWindow.m appleTests/RNCNativeWindowTests.m].each do |path|
  target.source_build_phase.add_file_reference(sources.new_file(File.join(root, path)))
end
%w[UIKit WebKit XCTest].each { |name| target.add_system_framework(name) }
target.build_configurations.each do |config|
  config.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'org.reactnativewebview.NativeWindowTests'
  config.build_settings['GENERATE_INFOPLIST_FILE'] = 'YES'
  config.build_settings['CLANG_ENABLE_OBJC_ARC'] = 'YES'
  config.build_settings['HEADER_SEARCH_PATHS'] = File.join(root, 'apple')
  config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
  config.build_settings['TEST_HOST'] = '$(BUILT_PRODUCTS_DIR)/NativeWindowTestHost.app/NativeWindowTestHost'
  config.build_settings['BUNDLE_LOADER'] = '$(TEST_HOST)'
end
project.save
scheme = Xcodeproj::XCScheme.new
scheme.add_build_target(host)
scheme.add_build_target(target)
scheme.add_test_target(target)
scheme.save_as(output, 'NativeWindowTests', true)
puts output
