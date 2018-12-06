//
//  RNCWKSchemeHandler.h
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>


@protocol RNCWKSchemeHandlerDelegate <NSObject>
- (void)handleUrlSchemeRequest:(NSDictionary *)req;
@end


@interface RNCWKSchemeHandler: NSObject <WKURLSchemeHandler,NSURLSessionDataDelegate>
@property (nonatomic, strong) NSURLSession *session;
@property (nonatomic, strong) NSMutableDictionary *urlSchemeRequestTasks;
@property (nonatomic, strong) id<RNCWKSchemeHandlerDelegate> delegate;

- (void)handleUrlSchemeResponse:(NSDictionary *)resp;
@end
