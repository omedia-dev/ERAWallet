import {AppCrypt} from "../../../crypt/AppCrypt";

export class PublicKeyAccount {
    static PUBLIC_KEY_LENGTH = AppCrypt.HASH_LENGTH;
    protected _publicKey: Int8Array;
    private _address: string;

    constructor(publicKey: Int8Array) {
        this._publicKey = publicKey;
    }

    get publicKey(): Int8Array {
        return this._publicKey;
    }

    async getAddress(): Promise<string> {
        if (!this._address) {
            this._address = await AppCrypt.getAddressByPublicKey(this.publicKey);
        }

        return this._address;
    }
}
