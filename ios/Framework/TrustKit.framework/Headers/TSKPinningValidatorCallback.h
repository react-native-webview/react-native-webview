/*
 
 TSKPinningValidatorCallback.h
 TrustKit
 
 Copyright 2017 The TrustKit Project Authors
 Licensed under the MIT license, see associated LICENSE file for terms.
 See AUTHORS file for the list of project authors.
 
 */

#ifndef TSKPinningValidatorCallback_h
#define TSKPinningValidatorCallback_h

#import "TSKPinningValidatorResult.h"
#import "TSKTrustKitConfig.h"

/**
 The pinning policy set for a specific hostname.
 */
typedef NSDictionary<TSKDomainConfigurationKey, id> TKSDomainPinningPolicy;


/**
 A block that can be set in a `TrustKit` instance to be invoked for every request that is going through
 instance's pinning validation logic.
 
 The callback will be invoked every time the validator performs pinning validation against a server's
 certificate chain; if the server's hostname is not defined in the pinning policy, no invocations will
 result as no pinning validation was performed.
 
 The callback provides the following arguments:
 
 * The `TSKPinningValidatorResult` resulting from the validation of the server's identity.
 * The `notedHostname`, which is the entry within the SSL pinning configuration that was used for the
 server being validated.
 * The `notedHostname`'s pinning policy, which was used for the server being validated.
 
 The callback can be used for advanced features such as performance measurement or customizing the
 reporting mechanism. Hence, most Apps should not have to use this callback. If set, the callback may
 be invoked very frequently and is not a suitable place for expensive tasks.
 
 Lastly, the callback is always invoked after the validation has been completed, and therefore
 cannot be used to modify the result of the validation (for example to accept invalid certificates).
 */
typedef void (^TSKPinningValidatorCallback)(TSKPinningValidatorResult * _Nonnull result, NSString * _Nonnull notedHostname, TKSDomainPinningPolicy * _Nonnull policy);



#endif /* TSKPinningValidatorCallback_h */
