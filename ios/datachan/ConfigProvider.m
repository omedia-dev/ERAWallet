#import "ConfigProvider.h"

@implementation ConfigProvider {
}

+ (BOOL)isDebug {
#ifdef DEBUG
    BOOL isDebug = true;
#else
    BOOL isDebug = false;
#endif
    return isDebug;
}

+ (NSString*) content {
    NSString *ipPath = [[NSBundle mainBundle] pathForResource:@"customPackagerIp" ofType:@"txt"];
    NSString *customIp = [[NSString stringWithContentsOfFile:ipPath encoding:NSUTF8StringEncoding error:nil]
            stringByTrimmingCharactersInSet:[NSCharacterSet newlineCharacterSet]];
    return [customIp stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

+ (BOOL)isAvailable {
    if ([ConfigProvider isDebug]) {
        return [ConfigProvider content].length > 0;
    } else {
        return NO;
    }
}

+ (NSString *)testIp {
    return [ConfigProvider content];
}
@end
