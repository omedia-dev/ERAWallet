#import "ChainUtilities.h"
#import <React/RCTLog.h>
#import "base58.h"

@implementation ChainUtilities

RCT_EXPORT_MODULE(ChainUtilities);

RCT_REMAP_METHOD(base58encode,
            encData:
            (NSArray *) input
            encResolver:
            (RCTPromiseResolveBlock) resolve
            encRejecter:
            (RCTPromiseRejectBlock) reject) {
    char *b58 = (char *) calloc(1024 * 1024, sizeof(char));
    size_t b58Size = -1;
    size_t dataSize = [input count];

    char *array = (char *) malloc((dataSize + 1) * sizeof(char));

    for (unsigned i = 0; i < dataSize; i++) {
        array[i] = [[input objectAtIndex:i] charValue];
    }

    b58enc(b58, &b58Size, array, dataSize);

    resolve(@(b58));
}

RCT_REMAP_METHOD(base58decode,
            decData:
            (NSString *) input
            decResolver:
            (RCTPromiseResolveBlock) resolve
            decRejecter:
            (RCTPromiseRejectBlock) reject) {

    NSData *data = [self base58ToData:input];

    NSMutableArray *tmpary = [self getArray:data];

    resolve(tmpary);
}

RCT_REMAP_METHOD(intToByteArray,
            intInput:
            (nonnull
        NSNumber*)input
        intResolver:(RCTPromiseResolveBlock)resolve
        intRejecter:(RCTPromiseRejectBlock)reject) {

    uint32_t inputInt = (uint32_t) [input intValue];

    unsigned char bytes[4];

    bytes[0] = (inputInt >> 24) & 0xFF;
    bytes[1] = (inputInt >> 16) & 0xFF;
    bytes[2] = (inputInt >> 8) & 0xFF;
    bytes[3] = inputInt & 0xFF;


    NSMutableData *data = [NSMutableData new];
//      data = [NSMutableData dataWithBytes:&inputInt length:sizeof(uint32_t)];
    [data appendBytes:&bytes length:sizeof(uint32_t)];

    NSMutableArray *tmpary = [self getArray:data];

    resolve(tmpary);
}

RCT_REMAP_METHOD(intFromByteArray,
            intBInput:
            (NSArray *) input
            intBResolver:
            (RCTPromiseResolveBlock) resolve
            intBRejecter:
            (RCTPromiseRejectBlock) reject) {
    size_t dataSize = [input count];
    uint8_t *array = (uint8_t *) malloc((dataSize + 1) * sizeof(uint8_t));

    for (unsigned i = 0; i < dataSize; i++) {
        array[i] = [[input objectAtIndex:i] unsignedIntValue];
    }

    uint8_t a0 = array[0];
    uint8_t a1 = array[1];
    uint8_t a2 = array[2];
    uint8_t a3 = array[3];
  
    int intData = (a0 << 24) | (a1 << 16) | (a2 << 8) | a3;

    resolve(@(intData));
}

RCT_REMAP_METHOD(longToByteArray,
            longInput:
            (NSString *) inputS
            longResolver:
            (RCTPromiseResolveBlock) resolve
            longRejecter:
            (RCTPromiseRejectBlock) reject) {

    long input = [inputS longLongValue];

    uint64_t inputInt = (uint64_t) input;

    char bytes[8];

    for (int i = 7; i >= 0; i--) {
        bytes[i] = (inputInt & 0xffL);
        inputInt >>= 8;
    }

    short shorts[8];
    for (int i = 0; i < 8; i++) {
        shorts[i] = (short) bytes[i];
    }

    NSMutableArray *tmpary = [[NSMutableArray alloc] initWithCapacity:8];

    for (int i = 0; i < 8; i++) {
        [tmpary addObject:[NSNumber numberWithShort:shorts[i]]];
    }

    resolve(tmpary);
}

RCT_REMAP_METHOD(longFromByteArray,
            longBInput:
            (NSArray *) inputA
            longBResolver:
            (RCTPromiseResolveBlock) resolve
            longBRejecter:
            (RCTPromiseRejectBlock) reject) {

    long input[8];
    NSEnumerator *e = [inputA objectEnumerator];

    id object;
    int i = 0;
    while (object = [e nextObject]) {
        NSNumber *number = object;
        input[i++] = number.longValue;
    }

    long intData = (input[0] & 0xFF) << 56
            | (input[1] & 0xFF) << 48
            | (input[2] & 0xFF) << 40
            | (input[3] & 0xFF) << 32
            | (input[4] & 0xFF) << 24
            | (input[5] & 0xFF) << 16
            | (input[6] & 0xFF) << 8
            | (input[7] & 0xFF);

    resolve(@(intData));
}

RCT_REMAP_METHOD(floatToByteArray,
            floatInput:
            (NSString *) inputS
            floatResolver:
            (RCTPromiseResolveBlock) resolve
            floatRejecter:
            (RCTPromiseRejectBlock) reject) {

    float input = [inputS floatValue];

    char a[sizeof(float)];
    memcpy(a, &input, sizeof(float));

    int i, j;

    for (i = 0, j = sizeof(float) - 1; i < j; ++i, --j) {
        char temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    NSMutableArray *tmpary = [[NSMutableArray alloc] initWithCapacity:4];
    for (int i = 0; i < 4; i++) {
        [tmpary addObject:[NSNumber numberWithShort:a[i]]];
    }

    resolve(tmpary);
}

RCT_REMAP_METHOD(floatFromByteArray,
            floatBInput:
            (NSArray *) input
            resolver:
            (RCTPromiseResolveBlock) resolve
            floatBRejecter:
            (RCTPromiseRejectBlock) reject) {

    char a[4];
    NSEnumerator *e = [input objectEnumerator];
    id object;
    int i = 0;
    while (object = [e nextObject]) {
        NSNumber *number = object;
        a[i++] = number.charValue;
    }

    int j;

    for (i = 0, j = sizeof(float) - 1; i < j; ++i, --j) {
        char temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    float g;
    memcpy(&g, a, sizeof g);
    resolve(@(g));
}

RCT_REMAP_METHOD(stringToByteArray,
            stringInput:
            (NSString *) input
            resolver:
            (RCTPromiseResolveBlock) resolve
            rejecter:
            (RCTPromiseRejectBlock) reject) {

    NSData *data = [input dataUsingEncoding:NSUTF8StringEncoding];

    NSMutableArray *tmpary = [self getArray:data];

    resolve(tmpary);
}

RCT_REMAP_METHOD(stringFromByteArray,
            stringBInput:
            (NSArray *) input
            resolver:
            (RCTPromiseResolveBlock) resolve
            rejecter:
            (RCTPromiseRejectBlock) reject) {

    uint8_t *bytes = malloc(sizeof(*bytes) * [input count]);

    unsigned i;
    for (i = 0; i < [input count]; i++) {

        bytes[i] = [input[i] unsignedCharValue];
    }

    NSData *data = [NSData dataWithBytesNoCopy:bytes length:[input count] freeWhenDone:YES];

    NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];

    resolve(string);
}


- (NSMutableArray *)getArray:(NSData *)data {
    unsigned char aBuffer[data.length];
    [data getBytes:&aBuffer length:data.length];

    NSMutableArray *tmpary = [[NSMutableArray alloc] initWithCapacity:data.length];

    for (int i = 0; i < data.length; i++) {
        [tmpary addObject:[NSNumber numberWithUnsignedChar:aBuffer[i]]];
    }

    return tmpary;
}

static const UniChar base58chars[] = {
        '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
};

- (NSData *)base58ToData:(NSString *)str {
    size_t i, z = 0;

    while (z < str.length && [str characterAtIndex:z] == base58chars[0]) z++; // count leading zeroes

    int bufSize = ((str.length - z) * 733 / 1000 + 1);
    uint8_t *buf = malloc(sizeof(uint8_t) * bufSize); // log(58)/log(256), rounded up

    memset(buf, 0, bufSize);

    for (i = z; i < str.length; i++) {
        uint32_t carry = [str characterAtIndex:i];

        switch (carry) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                carry -= '1';
                break;

            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'H':
                carry += 9 - 'A';
                break;

            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
                carry += 17 - 'J';
                break;

            case 'P':
            case 'Q':
            case 'R':
            case 'S':
            case 'T':
            case 'U':
            case 'V':
            case 'W':
            case 'X':
            case 'Y':
            case 'Z':
                carry += 22 - 'P';
                break;

            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h':
            case 'i':
            case 'j':
            case 'k':
                carry += 33 - 'a';
                break;

            case 'm':
            case 'n':
            case 'o':
            case 'p':
            case 'q':
            case 'r':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                carry += 44 - 'm';
                break;

            default:
                carry = UINT32_MAX;
        }

        if (carry >= 58) break; // invalid base58 digit

        for (size_t j = bufSize; j > 0; j--) {
            carry += (uint32_t) buf[j - 1] * 58;
            buf[j - 1] = carry & 0xff;
            carry >>= 8;
        }

        memset(&carry, 0, sizeof(carry));
    }

    i = 0;
    while (i < bufSize && buf[i] == 0) i++; // skip leading zeroes

    NSMutableData *d = [NSMutableData dataWithCapacity:z + bufSize - i];

    d.length = z;
    [d appendBytes:&buf[i] length:bufSize - i];
    memset(buf, 0, bufSize);
    return d;
}


@end
