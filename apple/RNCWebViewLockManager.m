#import "RNCWebViewLockManager.h"

@implementation RNCWebViewLockManager

@synthesize shouldOverrideLocks;
@synthesize shouldOverrideResponses;

#pragma mark Singleton Methods

+ (id)getInstance {
    static RNCWebViewLockManager *lockManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        lockManager = [[self alloc] init];
    });
    return lockManager;
}

- (int)getNewLock {
    int lockIdentifier = self.nextLockIdentifier++;
    [self.shouldOverrideLocks setObject:[[NSConditionLock alloc] initWithCondition:lockIdentifier] forKey:@(lockIdentifier)];
    [self.shouldOverrideResponses setObject:@YES forKey:@(lockIdentifier)];
    return lockIdentifier;
}

- (BOOL)getLockResult:(int)lockIdentifier {
    NSConditionLock* lock = [self.shouldOverrideLocks objectForKey:@(lockIdentifier)];
    if (lock == nil) {
        RCTLogWarn(@"Lock not found, defaulting to YES");
        return YES;
    }
    // Block the main thread for a maximum of 250ms until the JS thread returns
    if ([lock lockWhenCondition:0 beforeDate:[NSDate dateWithTimeIntervalSinceNow:.25]]) {
        BOOL returnValue = [[shouldOverrideResponses objectForKey:@(lockIdentifier)] boolValue];
        lock = nil;
        return returnValue;
    } else {
      RCTLogWarn(@"Did not receive response to shouldStartLoad in time, defaulting to YES");
      return YES;
    }
}

- (void) setResult:(BOOL)shouldStart
 forLockIdentifier:(int)lockIdentifier {
    NSConditionLock* lock = [self.shouldOverrideLocks objectForKey:@(lockIdentifier)];
    if (lock == nil) {
        RCTLogWarn(@"Lock not found");
    }
    if ([lock tryLockWhenCondition:lockIdentifier]) {
        [self.shouldOverrideResponses setObject:@(shouldStart) forKey:@(lockIdentifier)];
        [lock unlockWithCondition:0];
    } else {
        
    }
}

- (id)init {
  if (self = [super init]) {
      self.nextLockIdentifier = 1;
      self.shouldOverrideLocks = [[NSMutableDictionary alloc] init];
      self.shouldOverrideResponses = [[NSMutableDictionary alloc] init];
  }
  return self;
}

- (void)dealloc {
  // Should never be called, but just here for clarity really.
}

@end
