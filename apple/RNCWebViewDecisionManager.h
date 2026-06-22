#import <Foundation/Foundation.h>
#if __has_include(<React/RCTLog.h>)
#import <React/RCTLog.h>
#else
#import <React_Core/RCTLog.h>
#endif
#import <WebKit/WebKit.h>

typedef void (^DecisionBlock)(BOOL);

@interface RNCWebViewDecisionManager : NSObject {
    int nextLockIdentifier;
    NSMutableDictionary *decisionHandlers;
}

@property (nonatomic) int nextLockIdentifier;
@property (nonatomic, retain) NSMutableDictionary *decisionHandlers;

+ (id)      getInstance;

- (int)setDecisionHandler:(DecisionBlock)handler;
- (void)    setResult:(BOOL)shouldStart
    forLockIdentifier:(int)lockIdentifier;
@end
