#import <foundation/Foundation.h>
#import <React/RCTLog.h>

@interface RNCWebViewLockManager : NSObject {
    int *nextLockIdentifier;
    NSMutableDictionary *shouldOverrideLocks;
    NSMutableDictionary *shouldOverrideResponses;
}

@property (nonatomic) int nextLockIdentifier;
@property (nonatomic, retain) NSMutableDictionary *shouldOverrideLocks;
@property (nonatomic, retain) NSMutableDictionary *shouldOverrideResponses;

+ (id)      getInstance;

- (int)getNewLock;
- (BOOL)getLockResult:(int)lockIdentifier;
- (void)    setResult:(BOOL)shouldStart
    forLockIdentifier:(int)lockIdentifier;
@end
