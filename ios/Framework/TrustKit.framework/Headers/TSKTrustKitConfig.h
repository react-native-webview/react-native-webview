/*
 
 TSKTrustKitConfig.h
 TrustKit
 
 Copyright 2017 The TrustKit Project Authors
 Licensed under the MIT license, see associated LICENSE file for terms.
 See AUTHORS file for the list of project authors.
 
 */

@import Foundation;


/**
 The version of TrustKit, such as "1.4.0".
 */
FOUNDATION_EXPORT NSString * const TrustKitVersion;


#pragma mark Configuration Keys


/**
 A global, App-wide configuration key that can be set in the pinning policy.
 */
typedef NSString *TSKGlobalConfigurationKey;


/**
 A domain-specific configuration key (to defined for a domain under the `kTSKPinnedDomains`
 key) that can be set in the pinning policy.
 */
typedef NSString *TSKDomainConfigurationKey;


#pragma mark Global Configuration Keys - Required


/**
 A boolean. If set to `YES`, TrustKit will perform method swizzling on the App's
 `NSURLConnection` and `NSURLSession` delegates in order to automatically add SSL pinning
 validation to the App's connections. This option can only be used if TrustKit is 
 initialized in singleton mode; default value is `NO`.
 
 Swizzling allows enabling pinning within an App without having to find and modify each
 and every instance of `NSURLConnection` or `NSURLSession` delegates.
 However, it should only be enabled for simple Apps, as it may not work properly in several
 scenarios including:
 
 * Apps with complex connection delegates, for example to handle client authentication
 via certificates or basic authentication.
 * Apps where method swizzling of the connection delegates is already performed by another
 module or library (such as Analytics SDKs).
 * Apps that do no use `NSURLSession` or `NSURLConnection` for their connections.
 
 In such scenarios or if the developer wants a tigher control on the App's networking
 behavior, `kTSKSwizzleNetworkDelegates` should be set to `NO`; the developer should then
 manually add pinning validation to the App's authentication handlers.
 
 See the `TSKPinningValidator` class for instructions on how to do so.
 */
FOUNDATION_EXPORT const TSKGlobalConfigurationKey kTSKSwizzleNetworkDelegates;


/**
 A dictionary with domains (such as _www.domain.com_) as keys and dictionaries as values.
 
 Each entry should contain domain-specific settings for performing pinning validation when
 connecting to the domain, including for example the domain's public key hashes. A list of
 all domain-specific keys is available in the "Domain-specific Keys" sections.
 */
FOUNDATION_EXPORT const TSKGlobalConfigurationKey kTSKPinnedDomains;



#pragma mark Global Configuration Keys - Optional


/**
 A boolean. If set to `YES`, pinning validation will be skipped if the server's certificate
 chain terminates at a user-defined trust anchor (such as a root CA that isn't part of OS X's
 default trust store) and no pin failure reports will be sent; default value is `YES`.
 
 This is useful for allowing SSL connections through corporate proxies or firewalls. See
 "How does key pinning interact with local proxies and filters?" within the Chromium security
 FAQ at https://www.chromium.org/Home/chromium-security/security-faq for more information.
 
 Only available on macOS.
 */
FOUNDATION_EXPORT const TSKGlobalConfigurationKey kTSKIgnorePinningForUserDefinedTrustAnchors NS_AVAILABLE_MAC(10_9);


#pragma mark Domain-Specific Configuration Keys - Required

/**
 An array of SSL pins, where each pin is the base64-encoded SHA-256 hash of a certificate's
 Subject Public Key Info.
 
 TrustKit will verify that at least one of the specified pins is found in the server's
 evaluated certificate chain.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKPublicKeyHashes;


/**
 An array of `TSKSupportedAlgorithm` constants to specify the public key algorithms for the
 keys to be pinned.
 
 TrustKit requires this information in order to compute SSL pins when validating a server's
 certificate chain, because the `Security` framework does not provide APIs to extract the
 key's algorithm from an SSL certificate. To minimize the performance impact of Trustkit,
 only one algorithm should be enabled.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKPublicKeyAlgorithms;


#pragma mark Domain-Specific Configuration Keys - Optional

/**
 A boolean. If set to `NO`, TrustKit will not block SSL connections that caused a pin or
 certificate validation error; default value is `YES`.
 
 When a pinning failure occurs, pin failure reports will always be sent to the configured
 report URIs regardless of the value of `kTSKEnforcePinning`.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKEnforcePinning;


/**
 A boolean. If set to `YES`, also pin all the subdomains of the specified domain; default
 value is `NO`.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKIncludeSubdomains;


/**
 A boolean. If set to `YES`, TrustKit will not pin this specific domain if `kTSKIncludeSubdomains`
 was set for this domain's parent domain.
 
 This allows excluding specific subdomains from a pinning policy that was applied to a
 parent domain.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKExcludeSubdomainFromParentPolicy;


/**
 An array of URLs to which pin validation failures should be reported.
 
 To minimize the performance impact of sending reports on each validation failure, the reports
 are uploaded using the background transfer service and are also rate-limited to one per day
 and per type of failure. For HTTPS report URLs, the HTTPS connections will ignore the SSL
 pinning policy and use the default certificate validation mechanisms, in order to maximize
 the chance of the reports reaching the server. The format of the reports is similar to the
 one described in RFC 7469 for the HPKP specification:
 
 {
 "app-bundle-id": "com.datatheorem.testtrustkit2",
 "app-version": "1",
 "app-vendor-id": "599F9C00-92DC-4B5C-9464-7971F01F8370",
 "app-platform": "IOS",
 "app-platform-version": "10.2.0",
 "trustkit-version": "1.3.1",
 "hostname": "www.datatheorem.com",
 "port": 0,
 "noted-hostname": "datatheorem.com",
 "include-subdomains": true,
 "enforce-pinning": true,
 "validated-certificate-chain": [
 pem1, ... pemN
 ],
 "known-pins": [
 "pin-sha256=\"d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=\"",
 "pin-sha256=\"E9CZ9INDbd+2eRQozYqqbQ2yXLVKB9+xcprMF+44U1g=\""
 ],
 "validation-result":1
 }
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKReportUris;


/**
 A boolean. If set to `YES`, the default report URL for sending pin failure reports will
 be disabled; default value is `NO`.
 
 By default, pin failure reports are sent to a report server hosted by Data Theorem, for
 detecting potential CA compromises and man-in-the-middle attacks, as well as providing a
 free dashboard for developers; email info@datatheorem.com if you'd like a dashboard for
 your App. Only pin failure reports are sent, which contain the App's bundle ID, the IDFV,
 and the server's hostname and certificate chain that failed validation.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKDisableDefaultReportUri;


/**
 A string containing the date, in yyyy-MM-dd format, on which the domain's configured SSL
 pins expire, thus disabling pinning validation. If the key is not set, then the pins do
 not expire.
 
 Expiration helps prevent connectivity issues in Apps which do not get updates to their
 pin set, such as when the user disables App updates.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKExpirationDate;

/**
 An array of strings representing additional trust anchors usable for validating
 the trust chain of pinned certificates that do not end in an OS trust anchor.
 
 The default behavior of TrustKit is to ignore these trust anchors unless compiled
 in debug mode (pass -DDEBUG=1 to the preprocessor). This behavior can be modified
 by subclassing TSKPinningValidator and overriding +allowsAdditionalTrustAnchors.
 
 The entries in the array should each be a single PEM-encoded public certificate.
 Standard RFC-7468 PEM format is supported (see https://tools.ietf.org/html/rfc7468#section-2 ).
 Note that the header, footer and any newlines are optional, but aid in readability.
 
 __SECURITY WARNING:__
 Misuse of this configuration option could potentially render your application
 vulnerable to exploits since it bypasses the normal operating system trust store.
 It is intended for enterprise scenarios where a company might be running their
 own internal production-grade certificate authority for debugging purposes.
 */
FOUNDATION_EXPORT const TSKDomainConfigurationKey kTSKAdditionalTrustAnchors;


#pragma mark Supported Public Key Algorithm Keys


/**
 A public key algorithm supported by TrustKit for generating the SSL pin for a certificate.
 */
typedef NSString *TSKSupportedAlgorithm;


/**
 RSA 2048.
 */
FOUNDATION_EXPORT const TSKSupportedAlgorithm kTSKAlgorithmRsa2048;


/**
 RSA 4096.
 */
FOUNDATION_EXPORT const TSKSupportedAlgorithm kTSKAlgorithmRsa4096;


/**
 ECDSA with secp256r1 curve.
 */
FOUNDATION_EXPORT const TSKSupportedAlgorithm kTSKAlgorithmEcDsaSecp256r1;


/**
 ECDSA with secp384r1 curve.
 */
FOUNDATION_EXPORT const TSKSupportedAlgorithm kTSKAlgorithmEcDsaSecp384r1;
