import {Base58} from "./Base58";
import {RIPEMD160} from "./RIPEMD160";
import {AppCrypt} from "../AppCrypt";

export class Qora {
    static ADDRESS_VERSION = 15;  // 7

    static async getAccountAddressFromPublicKey(publicKey: Int8Array): Promise<string> {
        // SHA256 PUBLICKEY FOR PROTECTION
        let publicKeyHash = AppCrypt.sha256(publicKey);

        // RIPEMD160 TO CREATE A SHORTER ADDRESS
        const ripEmd160 = new RIPEMD160();
        publicKeyHash = ripEmd160.digest(publicKeyHash);

        // CONVERT TO LIST
        let addressList = new Int8Array(0);

        //ADD VERSION BYTE
        const versionByte = new Int8Array([Qora.ADDRESS_VERSION]);
        addressList = appendBuffer(addressList, versionByte);

        addressList = appendBuffer(addressList, publicKeyHash);

        //GENERATE CHECKSUM
        const checkSum = AppCrypt.sha256(AppCrypt.sha256(addressList));

        //ADD FIRST 4 BYTES OF CHECKSUM TO ADDRESS
        addressList = appendBuffer(addressList, new Int8Array([checkSum[0]]));
        addressList = appendBuffer(addressList, new Int8Array([checkSum[1]]));
        addressList = appendBuffer(addressList, new Int8Array([checkSum[2]]));
        addressList = appendBuffer(addressList, new Int8Array([checkSum[3]]));

        //BASE58 ENCODE ADDRESS
        return await Base58.encode(addressList);
    }
}

function appendBuffer(buffer1: Int8Array, buffer2: Int8Array): Int8Array {
    buffer1 = new Int8Array(buffer1);
    buffer2 = new Int8Array(buffer2);
    const tmp = new Int8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(buffer1, 0);
    tmp.set(buffer2, buffer1.byteLength);

    return tmp;
}
