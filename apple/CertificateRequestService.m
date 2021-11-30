//
//  CertificateRequestService.m
//  WebviewTest
//
//  Created by Developer Landra Sistemas on 17/11/2021.
//

#import "CertificateRequestService.h"
#import <UIKit/UIKit.h>

static NSString* certPath;
static NSString* certPass;
UIViewController* vController;
static NSURLCredential* returnCredential;
dispatch_semaphore_t sema;

@interface CertificateRequestService () <UIDocumentPickerDelegate>
@property (nonatomic, copy, nullable) void (^callback)(NSURLCredential*);
@end

@implementation CertificateRequestService

- (void) viewController:(UIViewController*)viewController selectCertificate: (void (^)(NSURLCredential*))callback{
    vController = viewController;
    _callback = callback;
    sema = dispatch_semaphore_create(0);
    bool hasCertificates = [self hasCertificates];
    if(hasCertificates == true){
        [self getCertificateCredentials];
    }else{
        [self loadCertificate];
    }
    if (![NSThread isMainThread]) {
        dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
    } else {
        while (dispatch_semaphore_wait(sema, DISPATCH_TIME_NOW)) {
            [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate dateWithTimeIntervalSinceNow:0]];
        }
    }
    self->_callback(returnCredential);
}

- (bool) hasCertificates{
    NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
    NSArray *certs = [prefs arrayForKey:@"storedCerts"];
    
    if(certs == NULL){
        certs = [[NSArray alloc] init];
        [prefs setObject:certs forKey:@"storedCerts"];
    }
    
    return certs.count > 0;
}

- (void) loadCertificate{
    UIDocumentPickerViewController *importMenu = [[UIDocumentPickerViewController alloc]initWithDocumentTypes:@[@"public.item"] inMode:UIDocumentPickerModeImport];
    importMenu.title = @"Ficheiros";
    importMenu.delegate = self;
    importMenu.allowsMultipleSelection = false;
    importMenu.modalPresentationStyle = UIModalPresentationFullScreen;
    [vController presentViewController:importMenu animated:YES completion: ^{
    }];
}

- (void)documentPicker:(UIDocumentPickerViewController *)controller
didPickDocumentsAtURLs:(NSArray<NSURL *> *)urls{
    certPath = urls[0].path;
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Contrasinal" message:@"" preferredStyle:UIAlertControllerStyleAlert];
    [alert addTextFieldWithConfigurationHandler:^(UITextField *textField) {
        textField.placeholder = @"";
        textField.secureTextEntry = true;
    }];
    UIAlertAction *ok =[UIAlertAction actionWithTitle:@"Aceptar" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action){
        
        NSArray *secItemClasses = @[(__bridge id)kSecClassGenericPassword,
                               (__bridge id)kSecClassInternetPassword,
                               (__bridge id)kSecClassCertificate,
                               (__bridge id)kSecClassKey,
                               (__bridge id)kSecClassIdentity];
        for (id secItemClass in secItemClasses) {
            NSDictionary *spec = @{(__bridge id)kSecClass: secItemClass};
            SecItemDelete((__bridge CFDictionaryRef)spec);
        }
        
        
        NSString *input = alert.textFields[0].text;
        input = @"Fnmt_cert(){};";
        
        NSData *PKCS12Data = [[NSData alloc] initWithContentsOfFile:certPath] ;
        CFDataRef inPKCS12Data = (CFDataRef)CFBridgingRetain(PKCS12Data);
        CFStringRef password = (__bridge CFStringRef)(input);
        const void *keys[] = { kSecImportExportPassphrase };
        const void *values[] = { password };
        CFDictionaryRef optionsDictionary = CFDictionaryCreate(NULL, keys, values, 1, NULL, NULL);
        CFArrayRef items = CFArrayCreate(NULL, 0, 0, NULL);
        OSStatus ret = SecPKCS12Import(inPKCS12Data, optionsDictionary, &items);
        if (ret != errSecSuccess)
        {
            dispatch_semaphore_signal(sema);
            return;
        }
        CFRelease(optionsDictionary);

        CFDictionaryRef identityDict = CFArrayGetValueAtIndex(items, 0);
        SecIdentityRef identityApp = nil;
        
        identityApp = (SecIdentityRef)CFDictionaryGetValue(identityDict, kSecImportItemIdentity);

        SecIdentityRef      identity;
        SecCertificateRef   cert;
        OSStatus            err;
        CFStringRef         certName;

        identity = identityApp;
        
        cert = NULL;
        err = SecIdentityCopyCertificate(identity, &cert);

        certName = SecCertificateCopySubjectSummary(cert);
        NSString *certNameString = CFBridgingRelease(certName);

        //CFRelease(cert);
        
        NSDictionary* addquery = @{ (id)kSecValueRef:   (__bridge id)cert,
                                    (id)kSecClass:      (id)kSecClassCertificate,
                                    (id)kSecAttrLabel:  certNameString,
                                   };
        // Add the identity to the keychain
        OSStatus status = SecItemAdd((__bridge CFDictionaryRef)addquery, NULL);
        if (status != errSecSuccess) {
            NSLog(@"%d", (int)status);
        }
        
        SecKeyRef privateKeyRef = NULL;
        SecIdentityCopyPrivateKey( identity, &privateKeyRef);
        
        NSString *stringTag = [NSString stringWithFormat: @"%@%@", @"es.sergas.keys.", certNameString];
        
        NSString *toStore = [NSString stringWithFormat: @"%@%@", stringTag, @"#!!!#"];
        toStore = [NSString stringWithFormat: @"%@%@", toStore, certNameString];
        
        NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
        NSMutableArray *certs = [prefs mutableArrayValueForKey:@"storedCerts"];
        [certs addObject:toStore];
        [prefs setObject:certs forKey:@"storedCerts"];
        
        NSData *tag = [stringTag dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary* addQueryKey = @{ (id)kSecValueRef: (__bridge id)privateKeyRef,
                                    (id)kSecClass: (id)kSecClassKey,
                                    (id)kSecAttrApplicationTag: tag,
                                   };
        OSStatus statusKey = SecItemAdd((__bridge CFDictionaryRef)addQueryKey, NULL);
        if(statusKey != errSecSuccess){
            NSLog(@"%d", (int)statusKey);
        }
        
        [self getCertificateCredentials];
    }];
    UIAlertAction *cancel =[UIAlertAction actionWithTitle:@"Cancelar" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action){
        dispatch_semaphore_signal(sema);
    }];
    [alert addAction:ok];
    [alert addAction:cancel];
    [vController presentViewController:alert animated:YES completion:^{}];
}

-(void)getCertificateCredentials{
    
    NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
    NSArray *certs = [prefs arrayForKey:@"storedCerts"];
    
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Certificados" message:@"Selecciona un certificado" preferredStyle:UIAlertControllerStyleAlert];
    
    for(int i = 0;i<certs.count;i++){
        NSString *certTag = [certs[i] componentsSeparatedByString:@"#!!!#"][0];
        NSString *certUserName = [certs[i] componentsSeparatedByString:@"#!!!#"][1];
        UIAlertAction *action = [UIAlertAction actionWithTitle: certUserName style:UIAlertActionStyleDefault handler:^(UIAlertAction *action){
            
            NSDictionary *getquery = @{ (id)kSecClass:     (id)kSecClassCertificate,
                                        (id)kSecAttrLabel: certUserName,
                                        (id)kSecReturnRef: @YES,
                                        };

            // Retrieve the identity from the keychain
            SecCertificateRef certificate = nil;
            OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)getquery,
                                                   (CFTypeRef *)&certificate);
            if(status != errSecSuccess){
                //dispatch_semaphore_signal(sema);
                //return;
            }
            
            NSDictionary *getqueryKey = @{ (id)kSecClass:     (id)kSecClassKey,
                                        (id)kSecAttrApplicationTag: certTag,
                                        (id)kSecReturnRef: @YES,
                                        };
            SecKeyRef key = nil;
            OSStatus statusKey = SecItemCopyMatching((__bridge CFDictionaryRef)getqueryKey, (CFTypeRef *)&key);
            
            if(statusKey != errSecSuccess){
                //dispatch_semaphore_signal(sema);
                //return;
            }
            
            NSDictionary *getqueryIdentity = @{ (id)kSecClass:     (id)kSecClassIdentity,
                                        (id)kSecAttrApplicationTag: certTag,
                                        (id)kSecReturnRef: @YES,
                                        };

            // Retrieve the identity from the keychain
            SecIdentityRef identity = nil;
            OSStatus statusIdentity = SecItemCopyMatching((__bridge CFDictionaryRef)getqueryIdentity, (CFTypeRef *)&identity);
            if(statusIdentity != errSecSuccess){
                //dispatch_semaphore_signal(sema);
                //return;
            }
            NSURLCredential* credential = [NSURLCredential credentialWithIdentity:identity certificates: nil persistence:NSURLCredentialPersistenceForSession];
            
            returnCredential = credential;
            dispatch_semaphore_signal(sema);
            
            
        }];
        [alert addAction:action];
    }
    UIAlertAction *add =[UIAlertAction actionWithTitle:@"Añadir certificado" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action){
        [self loadCertificate];
    }];
    UIAlertAction *cancel =[UIAlertAction actionWithTitle:@"Cancelar" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action){
        dispatch_semaphore_signal(sema);
    }];
    [alert addAction:add];
    [alert addAction:cancel];
    [vController presentViewController:alert animated:YES completion:^{}];
}

@end
