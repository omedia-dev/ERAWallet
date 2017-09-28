import {AppCrypt} from "../crypt/AppCrypt";
import * as CryptoJS from "crypto-js";
import {AES} from "crypto-js";
import {IKeyPairString, KeyPair} from "../src/core/account/KeyPair";
import RNFetchBlob from "react-native-fetch-blob";
import {Bytes} from "../src/core/Bytes";
import {action, observable} from "mobx";
import {Base58} from "../crypt/libs/Base58";
import {request} from "../../App";
import {Base32JS} from "../crypt/libs/BaseJS";

export class LocalWallet {
    lastReference: number;
    private dataFile: string = `${RNFetchBlob.fs.dirs.DocumentDir}/data.dat`;

    @observable
    private data: ILocalWalletData;

    get keys(): KeyPair {
        return this.data.keys;
    }

    get publicKey(): Int8Array {
        return this.data.keys.publicKey;
    }

    get secretKey(): Int8Array {
        return this.data.keys.secretKey;
    }

    get address(): string {
        return this.data.address;
    }

    async stringKeys(): Promise<IKeyPairString> {
        return await this.data.keys.toString();
    }

    async create(pin: string): Promise<void> {
        const seed = await AppCrypt.generateSeed(pin + Math.random());
        const keys = new KeyPair();
        const address = await AppCrypt.getAccountAddressFromPublicKey(new Int8Array(keys.publicKey));

        this.data = {seed, keys, address, pin};
    }

    async writeFile(): Promise<void> {
        const aes = AES.encrypt(JSON.stringify(this.data), this.data.pin).toString();
        const message = await Bytes.stringToByteArray(aes);
        const bytes = Array.from(message);

        await RNFetchBlob.fs.writeFile(this.dataFile, bytes, "ascii");
    }

    async walletExists(): Promise<boolean> {
        return await RNFetchBlob.fs.exists(this.dataFile);
    }

    async deleteLocal(): Promise<void> {
        await RNFetchBlob.fs.unlink(this.dataFile);
    }

    @action
    async unlock(pin: string): Promise<void> {
        const data = await RNFetchBlob.fs.readFile(this.dataFile, "ascii");
        const message = await Bytes.stringFromByteArray(data);
        const enc = AES.decrypt(message, pin);

        try {
            const json = enc.toString(CryptoJS.enc.Utf8);
            const fileData = JSON.parse(json);
            fileData.keys = new KeyPair(new Int8Array(fileData.keys.secretKey), new Int8Array(fileData.keys.publicKey));

            this.data = fileData;
        } catch (e) {
            console.error(e);
            throw new Error("Invalid pin");
        }
    }

    async importSecretKey(secretKey: string, pin: string): Promise<void> {
        const secretKeyInt = await Base58.decode(secretKey);
        const publicKey = await AppCrypt.getPublicKeyBySecretKey(secretKey);
        const keys = new KeyPair(secretKeyInt, publicKey);
        const address = await AppCrypt.getAccountAddressFromPublicKey(keys.publicKey);
        const seed = "";

        this.data = {seed, keys, address, pin};

        await this.writeFile();
    }

    async getLastReference(address: string = this.address): Promise<number> {
        const ref = await request.address.lastReference(address);
        if (ref && this.lastReference && this.lastReference > ref) {
            return this.lastReference;
        }

        return ref;
    }

    base32Key() {
        return Base32JS.encode(this.data.keys.publicKey);
    }
}

interface ILocalWalletData {
    pin: string;
    seed: string;
    keys: KeyPair;
    address: string;
}

export const localWallet = new LocalWallet();
