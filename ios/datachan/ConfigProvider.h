#import <Foundation/Foundation.h>

@interface ConfigProvider : NSObject
+ (BOOL) isAvailable;
+ (NSString*) testIp;
@end
