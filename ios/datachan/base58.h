//
//  base58.h
//  base58
//
//  Created by Alexandr Logvinenco on 31/07/2017.
//  Copyright © 2017 Alexandr Logvinenco. All rights reserved.
//

#ifndef base58_h
#define base58_h


#endif /* base58_h */


// Private
bool b58tobin(void *bin, size_t *binszp, const char *b58);
bool b58enc(char *b58, size_t *b58sz, const void *data, size_t binsz);
NSData* base58ToData(NSString* str);
