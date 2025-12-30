// Import Swift header BEFORE any C++ code
// The generated Swift header is pure Objective-C and must be imported
// before C++ context is established
#if __has_include("react_native_webview-Swift.h")
#import "react_native_webview-Swift.h"
#elif __has_include("react-native-webview-Swift.h")
#import "react-native-webview-Swift.h"
#elif __has_include(<react_native_webview/react_native_webview-Swift.h>)
#import <react_native_webview/react_native_webview-Swift.h>
#endif

#import "RNCHeadlessWebViewModule.h"

@implementation RNCHeadlessWebViewModule

- (NSNumber *)create {
    NSInteger webviewId = [[RNCHeadlessWebViewManager shared] createWebView];
    return @(webviewId);
}

- (void)loadUrl:(double)webviewId url:(NSString *)url {
    [[RNCHeadlessWebViewManager shared] loadUrl:(NSInteger)webviewId url:url];
}

- (void)destroy:(double)webviewId {
    [[RNCHeadlessWebViewManager shared] destroyWebView:(NSInteger)webviewId];
}

- (void)setScripts:(double)webviewId scripts:(NSArray *)scripts {
    // Convert NSArray (from codegen) to typed ScriptDefinition array
    // Codegen generates NSArray* for arrays of objects, so we validate and convert here
    NSMutableArray<RNCHeadlessWebViewScriptDefinition *> *scriptDefinitions = [NSMutableArray array];
    if ([scripts isKindOfClass:[NSArray class]]) {
        for (id item in scripts) {
            if ([item isKindOfClass:[NSDictionary class]]) {
                RNCHeadlessWebViewScriptDefinition *scriptDef = [RNCHeadlessWebViewScriptDefinition from:(NSDictionary *)item];
                if (scriptDef) {
                    [scriptDefinitions addObject:scriptDef];
                }
            }
        }
    }
    [[RNCHeadlessWebViewManager shared] setScripts:(NSInteger)webviewId scripts:scriptDefinitions];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeHeadlessWebViewModuleSpecJSI>(params);
}

+ (NSString *)moduleName {
    return @"RNCHeadlessWebViewModule";
}

@end

