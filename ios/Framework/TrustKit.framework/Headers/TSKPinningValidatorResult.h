/*
 
 TSKPinningValidator.h
 TrustKit
 
 Copyright 2015 The TrustKit Project Authors
 Licensed under the MIT license, see associated LICENSE file for terms.
 See AUTHORS file for the list of project authors.
 
 */

#import "TSKTrustDecision.h"
@import Foundation;


/**
 A `TSKPinningValidatorResult` instance contains all the details regarding a pinning validation
 performed against a specific server.
 */
@interface TSKPinningValidatorResult : NSObject

/**
 The hostname of the server SSL pinning validation was performed against.
 */
@property (nonatomic, readonly, nonnull) NSString *serverHostname;

/**
 The result of validating the server's certificate chain against the set of SSL pins configured for 
 the `notedHostname`.
 */
@property (nonatomic, readonly) TSKTrustEvaluationResult evaluationResult;

/**
 The trust decision returned for this connection, which describes whether the connection should be blocked 
 or allowed, based on the `evaluationResult` returned when evaluating the `serverTrust` and the SSL pining 
 policy configured for this server.

 For example, the pinning validation could have failed (ie. evaluationResult being 
 `TSKTrustEvaluationFailedNoMatchingPin`) but the policy might be set to ignore pinning validation failures 
 for this server, thereby returning `TSKTrustDecisionShouldAllowConnection`.
 */
@property (nonatomic, readonly) TSKTrustDecision finalTrustDecision;

/**
 The time it took for the SSL pinning validation to be performed.
 */
@property (nonatomic, readonly) NSTimeInterval validationDuration;

/**
 The certificate chain sent by the server when establishing the connection as PEM-formatted certificates. 
 */
@property (nonatomic, readonly, nonnull) NSArray *certificateChain;

@end
