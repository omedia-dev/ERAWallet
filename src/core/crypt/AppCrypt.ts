import {Base58} from "./libs/Base58";
import {Qora} from "./libs/Qora";
import {sign, SignKeyPair} from "tweetnacl";
import {createHash} from "crypto";

export class AppCrypt {
    public static HASH_LENGTH = 32;

    static async generateSeed(phrase: string): Promise<string> {
        const byteSeed = AppCrypt.sha256(AppCrypt.sha256(phrase));

        return await Base58.encode(byteSeed);
    }

    static sha256(input: string): Int8Array
    static sha256(input: Buffer): Int8Array
    static sha256(input: Int8Array): Int8Array
    static sha256(input: Buffer | string | Int8Array): Int8Array {
        if (typeof input === "string") {
            return new Int8Array(createHash("sha256").update(input).digest());
        }
        if (input instanceof Int8Array) {
            return AppCrypt.sha256(new Buffer(input));
        }

        const hash = createHash("SHA256");
        hash.end(input);

        return new Int8Array(hash.read());
    }

    static async createAddress(): Promise<string> {
        const keys = AppCrypt.generateKeys();
        return Qora.getAccountAddressFromPublicKey(new Int8Array(keys.publicKey));
    }

    static async getAccountAddressFromPublicKey(key: Int8Array): Promise<string> {
        return Qora.getAccountAddressFromPublicKey(key);
    }

    static generateKeys(): SignKeyPair {
        return sign.keyPair();
    }

    static sign(message: Int8Array, secretKey: Int8Array): Int8Array {
        const result = sign.detached(new Uint8Array(message), new Uint8Array(secretKey));

        return new Int8Array(result);
    }

    static verifySign(message: Int8Array, result: Int8Array, publicKey: Int8Array): boolean {
        return sign.detached.verify(new Uint8Array(message), new Uint8Array(result), new Uint8Array(publicKey));
    }

    static async getAddressByPublicKey(publicKey: string): Promise<string>
    static async getAddressByPublicKey(publicKey: Int8Array): Promise<string>
    static async getAddressByPublicKey(publicKey: string | Int8Array): Promise<string> {
        if (typeof publicKey === "string") {
            publicKey = await Base58.decode(publicKey);
        }

        publicKey = new Int8Array(publicKey);

        return Qora.getAccountAddressFromPublicKey(publicKey);
    }

    static async getAddressBySecretKey(privateKey: string): Promise<string>
    static async getAddressBySecretKey(privateKey: Int8Array): Promise<string>
    static async getAddressBySecretKey(secretKey: string | Int8Array): Promise<string> {
        if (typeof secretKey === "string") {
            secretKey = await Base58.decode(secretKey);
        }
        const keys = sign.keyPair.fromSecretKey(new Uint8Array(secretKey));

        return this.getAddressByPublicKey(new Int8Array(keys.publicKey));
    }

    static async getPublicKeyBySecretKey(secretKey: string): Promise<Int8Array>
    static async getPublicKeyBySecretKey(secretKey: Int8Array): Promise<Int8Array>
    static async getPublicKeyBySecretKey(secretKey: string | Int8Array): Promise<Int8Array> {
        if (typeof secretKey === "string") {
            secretKey = await Base58.decode(secretKey);
        }

        const keys = sign.keyPair.fromSecretKey(new Uint8Array(secretKey));
        return new Int8Array(keys.publicKey);
    }
}
