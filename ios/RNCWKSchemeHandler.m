//
//  RNCWKSchemeHandler.m
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>
#import "RNCWKSchemeHandler.h"

@implementation RNCWKSchemeHandler

- (instancetype)init {
  self = [super init];

  // Set up the NSURLSession to hold cookies.
  NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
  self.session = [NSURLSession sessionWithConfiguration:configuration delegate:self delegateQueue:nil];

  // Set up a map for saving tasks.
  self.urlSchemeRequestTasks = [[NSMutableDictionary alloc] init];

  return self;
}

-(void)URLSession:(NSURLSession *)session
             task:(NSURLSessionTask *)task
willPerformHTTPRedirection:(NSHTTPURLResponse *)response
       newRequest:(NSURLRequest *)request
completionHandler:(void (^)(NSURLRequest * _Nullable))completionHandler {
  completionHandler(nil);
}

- (void)webView:(WKWebView *)webView startURLSchemeTask:(id <WKURLSchemeTask>)urlSchemeTask {

  // Get request data. For whatever reason, the body data isnt available.
  // https://bugs.webkit.org/show_bug.cgi?id=180220
  NSString* url = [[urlSchemeTask request] URL].absoluteString;
  NSString* method = [urlSchemeTask request].HTTPMethod;
  NSDictionary* headers = urlSchemeTask.request.allHTTPHeaderFields;

  // Save the task in a map.
  NSString* requestId = [NSString stringWithFormat:@"%d", arc4random()];
  [self.urlSchemeRequestTasks setObject:urlSchemeTask forKey:requestId];

  // Package up all the information for the JS event.
  NSDictionary *req = @{
                        @"url": url,
                        @"method": method,
                        @"headers": headers,
                        @"requestId": requestId,
                        };

  // Send off to React Native.
  [self.delegate handleUrlSchemeRequest:req];

}

- (void)handleUrlSchemeResponse:(NSDictionary *)resp
{
  // Grab the task we want to complete.
  NSString *requestId = [resp objectForKey:@"requestId"];
  id<WKURLSchemeTask> urlSchemeTask = [self.urlSchemeRequestTasks objectForKey:requestId];

  NSString *type = [resp objectForKey:@"type"];

  if ([type isEqualToString:@"response"]) {
    NSString *url = [resp objectForKey:@"url"];
    NSDictionary *headers = [resp objectForKey:@"headers"];
    NSString *body = [resp objectForKey:@"body"];
    NSNumber *status = [resp objectForKey:@"status"];

    NSHTTPURLResponse* response = [[NSHTTPURLResponse alloc] initWithURL:[[NSURL alloc] initWithString:url]
                                                              statusCode:[status integerValue]
                                                             HTTPVersion:@"HTTP/2"
                                                            headerFields:headers];

    [urlSchemeTask didReceiveResponse:response];

    if (body) {
      [urlSchemeTask didReceiveData:[body dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:NO]];
    }

    [urlSchemeTask didFinish];
  } else if ([type isEqualToString:@"redirect"]) {
    NSString *url = [resp objectForKey:@"url"];
    NSDictionary *headers = [resp objectForKey:@"headers"];
    NSString *body = [resp objectForKey:@"body"];
    NSString *method = [resp objectForKey:@"method"];

    NSMutableURLRequest* request = [[NSMutableURLRequest alloc] initWithURL:[[NSURL alloc] initWithString:url]
                                                                cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                                            timeoutInterval:60.0];

    [request setHTTPMethod:method];
    [request setAllHTTPHeaderFields:headers];
    if (body) {
      [request setHTTPBody: [body dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:NO]];
    }

    // Would be nice if we had access to body data, but it doesn't.
    // if ([urlSchemeTask request].HTTPBodyStream) {
    //     [request setHTTPBodyStream: [urlSchemeTask request].HTTPBodyStream];
    // } else if ([urlSchemeTask request].HTTPBody) {
    //     [request setHTTPBody: [urlSchemeTask request].HTTPBody];
    // }

    NSURLSessionDataTask* requestTask = [self.session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
      if (response) {
        [urlSchemeTask didReceiveResponse: response];
        [urlSchemeTask didReceiveData:data];
      } else if (error) {
        [urlSchemeTask didFailWithError:error];
      }
      [urlSchemeTask didFinish];
    }];

    [requestTask resume];
  }
}

- (void)webView:(WKWebView *)webView stopURLSchemeTask:(id<WKURLSchemeTask>)urlSchemeTask {}

@end
