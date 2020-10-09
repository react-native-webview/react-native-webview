/*
 
 TSKTrustDecision.h
 TrustKit
 
 Copyright 2015 The TrustKit Project Authors
 Licensed under the MIT license, see associated LICENSE file for terms.
 See AUTHORS file for the list of project authors.
 
 */

@import Foundation;

/**
 Possible return values when verifying a server's identity against a set of pins.
 */
typedef NS_ENUM(NSInteger, TSKTrustEvaluationResult)
{
    /**
     The server trust was succesfully evaluated and contained at least one of the configured pins.
     */
    TSKTrustEvaluationSuccess,
    
    /**
     The server trust was succesfully evaluated but did not contain any of the configured pins.
     */
    TSKTrustEvaluationFailedNoMatchingPin,
    
    /**
     The server trust's evaluation failed: the server's certificate chain is not trusted.
     */
    TSKTrustEvaluationFailedInvalidCertificateChain,
    
    /**
     The server trust could not be evaluated due to invalid parameters.
     */
    TSKTrustEvaluationErrorInvalidParameters,
    
    /**
     The server trust was succesfully evaluated but did not contain any of the configured pins. However, the certificate chain terminates at a user-defined trust anchor (ie. a custom/private CA that was manually added to the macOS trust store). Only available on macOS.
     */
    TSKTrustEvaluationFailedUserDefinedTrustAnchor NS_AVAILABLE_MAC(10_9),
    
    /**
     The server trust could not be evaluated due to an error when trying to generate the certificate's subject public key info hash. On iOS 9 or below, this could be caused by a Keychain failure when trying to extract the certificate's public key bytes.
     */
    TSKTrustEvaluationErrorCouldNotGenerateSpkiHash,
};

/**
 Possible return values when verifying a server's identity against an SSL pinning policy.
 */
typedef NS_ENUM(NSInteger, TSKTrustDecision)
{
    /**
     Based on the server's certificate chain and the configured pinning policy for this domain, the SSL connection should be allowed.
     This return value does not necessarily mean that the pinning validation succeded (for example if `kTSKEnforcePinning` was set to `NO` for this domain). If a pinning validation failure occured and if a report URI was configured, a pin failure report was sent.
     */
    TSKTrustDecisionShouldAllowConnection,
    
    /**
     Based on the server's certificate chain and the configured pinning policy for this domain, the SSL connection should be blocked.
     A pinning validation failure occured and if a report URI was configured, a pin failure report was sent.
     */
    TSKTrustDecisionShouldBlockConnection,
    
    /**
     No pinning policy was configured for this domain and TrustKit did not validate the server's identity.
     Because this will happen in an authentication handler, it means that the server's _serverTrust_ object __needs__ to be verified against the device's trust store using `SecTrustEvaluate()`. Failing to do so will __disable SSL certificate validation__.
     */
    TSKTrustDecisionDomainNotPinned,
};
