/*
 
 TSKPinningValidator.h
 TrustKit
 
 Copyright 2015 The TrustKit Project Authors
 Licensed under the MIT license, see associated LICENSE file for terms.
 See AUTHORS file for the list of project authors.
 
 */

#import "TSKTrustDecision.h"
@import Foundation;

@class TSKPinningValidatorResult;
@class TSKSPKIHashCache;


/**
 A `TSKPinningValidator` instance can be used to verify a server's identity against an SSL pinning policy.
 
 In specific scenarios, TrustKit cannot intercept outgoing SSL connections and automatically validate the server's identity against the pinning policy:
 
 * All connections within an App that disables TrustKit's network delegate swizzling by setting the `kTSKSwizzleNetworkDelegates` configuration key to `NO`.
 * Connections that do not rely on the `NSURLConnection` or `NSURLSession` APIs:
     * `WKWebView` connections.
     * Connections leveraging low-level network APIs (such as `NSStream`).
     * Connections initiated using a third-party SSL library such as OpenSSL.
 
 For these connections, pin validation must be manually triggered using one of the two available methods within `TSKPinningValidator`.
 */
@interface TSKPinningValidator : NSObject

#pragma mark High-level Validation Method

/**
 Helper method for handling authentication challenges received within a `NSURLSessionDelegate`, `NSURLSessionTaskDelegate` or `WKNavigationDelegate`.
 
 This method will evaluate the server trust within the authentication challenge against the global SSL pinning policy previously configured, and then call the `completionHandler` with the corresponding `disposition` and `credential`. For example, this method can be leveraged in a NSURLSessionDelegate challenge handler method:

     -  (void)URLSession:(NSURLSession *)session
                    task:(NSURLSessionTask *)task
     didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge
       completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler {
     {
         TSKPinningValidator *pinningValidator = [[TrustKit sharedInstance] pinningValidator];
         // Pass the authentication challenge to the validator; if the validation fails, the connection will be blocked
         if (![pinningValidator handleChallenge:challenge completionHandler:completionHandler])
         {
             // TrustKit did not handle this challenge: perhaps it was not for server trust
             // or the domain was not pinned. Fall back to the default behavior
             completionHandler(NSURLSessionAuthChallengePerformDefaultHandling, nil);
         }
     }
 
 @param challenge The authentication challenge, supplied by the URL loading system to the delegate's challenge handler method.
 
 @param completionHandler A block to invoke to respond to the challenge, supplied by the URL loading system to the delegate's challenge handler method.
 
 @return `YES` if the challenge was handled and the `completionHandler` was successfuly invoked. `NO` if the challenge could not be handled because it was not for server certificate validation (ie. the challenge's `authenticationMethod` was not `NSURLAuthenticationMethodServerTrust`).
 
 @exception NSException Thrown when TrustKit has not been initialized with a pinning policy.
 */
- (BOOL)handleChallenge:(NSURLAuthenticationChallenge * _Nonnull)challenge
      completionHandler:(void (^ _Nonnull)(NSURLSessionAuthChallengeDisposition disposition,
                                           NSURLCredential * _Nullable credential))completionHandler;


#pragma mark Low-level Validation Method

/**
 Evaluate the supplied server trust against the SSL pinning policy previously configured. If the validation fails, a pin failure report will be sent.
 
 When using the `NSURLSession` or `WKWebView` network APIs, the `handleChallenge:completionHandler:` method should be called instead, as it is simpler to use.
 
 When using low-level network APIs (such as `NSStream`), instructions on how to retrieve the connection's `serverTrust` are available at https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NetworkingTopics/Articles/OverridingSSLChainValidationCorrectly.html .
 
 @param serverTrust The trust object representing the server's certificate chain. The trust's evaluation policy is always overridden using `SecTrustSetPolicies()` to ensure all the proper SSL checks (expiration, hostname validation, etc.) are enabled.
 
 @param serverHostname The hostname of the server whose identity is being validated.
 
 @return A `TSKTrustDecision` which describes whether the SSL connection should be allowed or blocked, based on the configured pinning policy.
 
 @warning If no SSL pinning policy was configured for the supplied _serverHostname_, this method has no effect and will return `TSKTrustDecisionDomainNotPinned` without validating the supplied _serverTrust_ at all. This means that the server's _serverTrust_ object __must__ be verified against the device's trust store using `SecTrustEvaluate()`. Failing to do so will __disable SSL certificate validation__.
 
 @exception NSException Thrown when TrustKit has not been initialized with a pinning policy.
 */
- (TSKTrustDecision)evaluateTrust:(SecTrustRef _Nonnull)serverTrust forHostname:(NSString * _Nonnull)serverHostname;



@end
