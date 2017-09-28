import {IKeyPair, KeyPair} from "./KeyPair";
import {PublicKeyAccount} from "./PublicKeyAccount";
import {Base58} from "../../../crypt/libs/Base58";

export class PrivateKeyAccount {
    private keyPair: { secretKey: Int8Array, publicKey: Int8Array };
    private privateKey: Int8Array;
    private publicKey: PublicKeyAccount;

    constructor(keyPair: KeyPair = new KeyPair()) {
        this.keyPair = keyPair;
        this.privateKey = this.keyPair.secretKey;
    }

    static async validate(key: string): Promise<boolean> {
        try {
            const keyBytes = await Base58.decode(key);
            return keyBytes.length === 64;
        } catch (e) {
            return false;
        }
    }

    getPublicKey() {
        if (!this.publicKey) {
            this.publicKey = new PublicKeyAccount(this.keyPair.publicKey);
        }

        return this.publicKey;
    }

    public getSecretKey(): Int8Array {
        return this.privateKey;
    }

    public getKeyPair(): IKeyPair {
        return this.keyPair;
    }
}
