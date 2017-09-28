import {NativeModules} from "react-native";

const RNBase58 = NativeModules.ChainUtilities;

export class Base58 {
    static async encode(input: Int8Array): Promise<string> {
        return RNBase58.base58encode(Array.from(input));
    }

    static async decode(input: string): Promise<Int8Array> {
        const data = await RNBase58.base58decode(input);
        return new Int8Array(data);
    }
}
