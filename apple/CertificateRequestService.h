//
//  CertificateRequestService.h
//  WebviewTest
//
//  Created by Developer Landra Sistemas on 18/10/2021.
//

#include <UIKit/UIKit.h>

@interface CertificateRequestService : UIViewController
-(void)viewController: (UIViewController*)viewController selectCertificate: (void (^)(NSURLCredential*))callback;
@end
