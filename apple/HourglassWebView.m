#import "HourglassWebView.h"

@implementation HourglassWebView

- (void)setHistory:(NSArray *)history
{
  _history = history;
  NSLog(@"History: %@", history);
}

@end
