/*
 
 TrustKit.h
 TrustKit
 
 Copyright 2015 The TrustKit Project Authors
 Licensed under the MIT license, see associated LICENSE file for terms.
 See AUTHORS file for the list of project authors.
 
 */

@import Foundation;

#ifndef _TRUSTKIT_
#define _TRUSTKIT_
    #import "TSKTrustKitConfig.h"
    #import "TSKPinningValidatorResult.h"
    #import "TSKPinningValidatorCallback.h"
    #import "TSKPinningValidator.h"
    #import "TSKTrustDecision.h"
#endif /* _TRUSTKIT_ */

NS_ASSUME_NONNULL_BEGIN


/**
 `TrustKit` is the main class for configuring an SSL pinning policy within an App.
 
 For most Apps, TrustKit should be used as a singleton, where a global SSL pinning policy is
 configured for the App. In singleton mode, the policy can be set either:
 
 * By adding it to the App's _Info.plist_ under the `TSKConfiguration` key, or 
 * By programmatically supplying it using the `+initSharedInstanceWithConfiguration:` method.
 
 In singleton mode, TrustKit can only be initialized once so only one of the two techniques 
 should be used.
 
 For more complex Apps where multiple SSL pinning policies need to be used independently 
 (for example within different frameworks), TrustKit can be used in "multi-instance" mode
 by leveraging the `-initWithConfiguration:` method described at the end of this page.
 
 A TrustKit pinning policy is a dictionary which contains some global, App-wide settings
 (of type `TSKGlobalConfigurationKey`) as well as domain-specific configuration keys
 (of type `TSKDomainConfigurationKey`) to be defined under the `kTSKPinnedDomains` entry. 
 The following table shows the keys and the types of the corresponding values, and uses
 indentation to indicate structure:
 
 ```
 | Key                                          | Type       |
 |----------------------------------------------|------------|
 | TSKSwizzleNetworkDelegates                   | Boolean    |
 | TSKIgnorePinningForUserDefinedTrustAnchors   | Boolean    |
 | TSKPinnedDomains                             | Dictionary |
 | __ <domain-name-to-pin-as-string>            | Dictionary |
 | ____ TSKPublicKeyHashes                      | Array      |
 | ____ TSKPublicKeyAlgorithms                  | Array      |
 | ____ TSKIncludeSubdomains                    | Boolean    |
 | ____ TSKExcludeSubdomainFromParentPolicy     | Boolean    |
 | ____ TSKEnforcePinning                       | Boolean    |
 | ____ TSKReportUris                           | Array      |
 | ____ TSKDisableDefaultReportUri              | Boolean    |
 | ____ TSKAdditionalTrustAnchors               | Array      |
 ```
 
 When setting the pinning policy programmatically, it has to be supplied to the
 `initSharedInstanceWithConfiguration:` method as a dictionary in order to initialize 
 TrustKit. For example:
 
 ```
    NSDictionary *trustKitConfig =
  @{
    kTSKPinnedDomains : @{
            @"www.datatheorem.com" : @{
                    kTSKExpirationDate: @"2017-12-01",
                    kTSKPublicKeyAlgorithms : @[kTSKAlgorithmRsa2048],
                    kTSKPublicKeyHashes : @[
                            @"HXXQgxueCIU5TTLHob/bPbwcKOKw6DkfsTWYHbxbqTY=",
                            @"0SDf3cRToyZJaMsoS17oF72VMavLxj/N7WBNasNuiR8="
                            ],
                    kTSKEnforcePinning : @NO,
                    kTSKReportUris : @[@"http://report.datatheorem.com/log_report"],
                    },
            @"yahoo.com" : @{
                    kTSKPublicKeyAlgorithms : @[kTSKAlgorithmRsa4096],
                    kTSKPublicKeyHashes : @[
                            @"TQEtdMbmwFgYUifM4LDF+xgEtd0z69mPGmkp014d6ZY=",
                            @"rFjc3wG7lTZe43zeYTvPq8k4xdDEutCmIhI5dn4oCeE=",
                            ],
                    kTSKIncludeSubdomains : @YES
                    }
            }};
    
    [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
    trustKit = [TrustKit sharedInstance];
 ```
 
 Similarly, the TrustKit singleton can be initialized in Swift:
 
 ```
        let trustKitConfig = [
            kTSKSwizzleNetworkDelegates: false,
            kTSKPinnedDomains: [
                "yahoo.com": [
                    kTSKExpirationDate: "2017-12-01",
                    kTSKPublicKeyAlgorithms: [kTSKAlgorithmRsa2048],
                    kTSKPublicKeyHashes: [
                        "JbQbUG5JMJUoI6brnx0x3vZF6jilxsapbXGVfjhN8Fg=",
                        "WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18="
                    ],]]] as [String : Any]
        
        TrustKit.initSharedInstance(withConfiguration:trustKitConfig)
 ```
 
 After initialization, the `TrustKit` instance's `pinningValidator` should be used to implement
 pinning validation within the App's network authentication handlers.
 */
@interface TrustKit : NSObject


#pragma mark Usage in Singleton Mode

/**
 Initialize the global TrustKit singleton with the supplied pinning policy.
 
 @param trustKitConfig A dictionary containing various keys for configuring the SSL pinning policy.
 @exception NSException Thrown when the supplied configuration is invalid or TrustKit has
 already been initialized.
 
 */
+ (void)initSharedInstanceWithConfiguration:(NSDictionary<TSKGlobalConfigurationKey, id> *)trustKitConfig;


/**
 Retrieve the global TrustKit singleton instance. Raises an exception if `+initSharedInstanceWithConfiguration:`
 has not yet been invoked.
 
 @return the shared TrustKit singleton
 */
+ (instancetype)sharedInstance;


#pragma mark Implementing Pinning Validation


/**
 Retrieve the validator instance conforming to the pinning policy of this TrustKit instance.
 
 The validator should be used to implement pinning validation within the App's network
 authentication handlers.
 */
@property (nonatomic, nonnull) TSKPinningValidator *pinningValidator;


#pragma mark Configuring a Validation Callback


/**
 Register a block to be invoked for every request that is going through TrustKit's pinning
 validation mechanism. See `TSKPinningValidatorCallback` for more information.
 */
@property (nonatomic, nullable) TSKPinningValidatorCallback pinningValidatorCallback;

/**
 Queue on which to invoke the `pinningValidatorCallback`; default value is the main queue.
 */
@property (nonatomic, null_resettable) dispatch_queue_t pinningValidatorCallbackQueue;


#pragma mark Usage in Multi-Instance Mode

/**
 Initialize a local TrustKit instance with the supplied SSL pinning policy configuration.
 
 This method is useful in scenarios where the TrustKit singleton cannot be used, for example within
 larger Apps that have split some of their functionality into multiple framework/SDK. Each 
 framework can initialize its own instance of TrustKit and use it for pinning validation independently
 of the App's other components.
 
 @param trustKitConfig A dictionary containing various keys for configuring the SSL pinning policy.
 */
- (instancetype)initWithConfiguration:(NSDictionary<TSKGlobalConfigurationKey, id> *)trustKitConfig;



#pragma mark Other Settings

/**
 Set the global logger.
 
 This method sets the global logger, used when any `TrustKit` instance needs to display a message to 
 the developer.
 
 If a global logger is not set, the default logger will be used, which will only print TrustKit log 
 messages (using `NSLog()`) when the App is built in Debug mode. If the App was built for Release, the default 
 logger will not print any messages at all.
 */
+ (void)setLoggerBlock:(void (^)(NSString *))block;

@end
NS_ASSUME_NONNULL_END
