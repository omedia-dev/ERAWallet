/* tslint:disable:no-object-literal-type-assertion no-bitwise number-literal-format */

export class BaseJS {
    private ALPHABET_MAP: { [p: string]: number };
    private INDEXES = new Int8Array(128);

    constructor(private ALPHABET: string, private base: number = ALPHABET.length) {
        this.ALPHABET_MAP = this.ALPHABET.split("").reduce((map, char, i) => {
            map[this.ALPHABET.charAt(i)] = i;

            return map;
        }, {} as { [key: string]: number });
    }

    encode(bytes: Int8Array): string {
        //
        // Nothing to do for an empty array
        //
        if (bytes.length == 0)
            return "";
        //
        // Make a copy of the input since we will be modifying it as we go along
        //
        const input = new Int8Array(bytes);
        //
        // Count the number of leading zeroes (we will need to prefix the encoded result
        // with this many zero characters)
        //
        let zeroCount = 0;
        while (zeroCount < input.length && input[zeroCount] == 0)
            zeroCount++;
        //
        // Encode the input starting with the first non-zero byte
        //
        let offset = zeroCount;
        const encoded = new Int8Array(input.length << 2);
        let encodedOffset = encoded.length;
        while (offset < input.length) {
            const mod = this.divMod32(input, offset);
            if (input[offset] == 0)
                offset++;
            encoded[--encodedOffset] = this.ALPHABET[mod].codePointAt(0) || 0;
        }
        //
        // Strip any leading zero values in the encoded result
        //
        while (encodedOffset < encoded.length && encoded[encodedOffset] == this.ALPHABET[0].codePointAt(0) || 0)
            encodedOffset++;
        //
        // Now add the number of leading zeroes that we found in the input array
        //
        for (let i = 0; i < zeroCount; i++)
            encoded[--encodedOffset] = this.ALPHABET[0].codePointAt(0) || 0;
        //
        // Create the return string from the encoded bytes
        //
        let encodedResult;
        try {
            let stringBytes = encoded.slice(encodedOffset, encoded.length);
            encodedResult = String.fromCodePoint(...Array.from(stringBytes));
        } catch (exc) {
            encodedResult = ""; // Should never happen
        }
        return encodedResult;
    }

    decode(string: string): Int8Array {
        let INDEXES = [];
        for (let i = 0; i < this.INDEXES.length; i++)
            INDEXES[i] = -1;
        for (let i = 0; i < this.base; i++)
            INDEXES[this.ALPHABET[i].codePointAt(0) || 0] = i;

        //
        // Nothing to do if we have an empty string
        //
        if (string.length == 0)
            return new Int8Array(0);

        if (string.startsWith("+")) {
            // BASE.32 from  BANK
            throw "Not implemented";
        }

        //
        // Convert the input string to a byte sequence
        //
        const input = new Int8Array(string.length);
        for (let i = 0; i < string.length; i++) {
            let codePoint = string.codePointAt(i) || 0;
            let digit = -1;
            if (codePoint >= 0 && codePoint < INDEXES.length)
                digit = INDEXES[codePoint];
            if (digit < 0)
                throw `Illegal character ${string.charAt(i)} at index ${i}`;
            input[i] = digit;
        }
        //
        // Count the number of leading zero characters
        //
        let zeroCount = 0;
        while (zeroCount < input.length && input[zeroCount] == 0)
            zeroCount++;
        //
        // Convert from Base58JS encoding starting with the first non-zero character
        //
        let decoded = new Int8Array(input.length);
        let decodedOffset = decoded.length;
        let offset = zeroCount;
        while (offset < input.length) {
            let mod = this.divMod(input, offset);
            if (input[offset] == 0)
                offset++;
            decoded[--decodedOffset] = mod;
        }
        //
        // Strip leading zeroes from the decoded result
        //
        while (decodedOffset < decoded.length && decoded[decodedOffset] == 0)
            decodedOffset++;
        //
        // Return the decoded result prefixed with the number of leading zeroes
        // that were in the original string
        //
        return new Int8Array(decoded.slice(decodedOffset - zeroCount, decoded.length));
    }

    private divMod(number: Int8Array, offset: number): number {
        let remainder = 0;
        for (let i = offset; i < number.length; i++) {
            const digit = number[i] & 0xff;
            const temp = remainder * this.base + digit;
            number[i] = temp / 256;
            remainder = temp % 256;
        }
        return remainder;
    }

    private divMod32(number: Int8Array, offset: number): number {
        let remainder = 0;
        for (let i = offset; i < number.length; i++) {
            const digit = number[i] & 0xff;
            const temp = remainder * 256 + digit;
            number[i] = temp / this.base;
            remainder = temp % this.base;
        }
        return remainder;
    }
}

export const Base58JS = new BaseJS("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
export const Base32JS = new BaseJS("123456789ABCDEFGHJKLMNPQRSTUVWXYZ", 32);
