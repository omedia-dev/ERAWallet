import {Transaction} from "./Transaction";
import {PrivateKeyAccount} from "../account/PrivateKeyAccount";
import {PublicKeyAccount} from "../account/PublicKeyAccount";
import {DataWriter} from "../DataWriter";
import {Bytes} from "../Bytes";

export class R_SertifyPubKeys extends Transaction {
    public static DEFAULT_DURATION = 2 * 356;
    private static DATE_DAY_LENGTH = 4; // one year + 256 days max
    private static SELF_LENGTH = R_SertifyPubKeys.DATE_DAY_LENGTH + Transaction.KEY_LENGTH;
    protected static BASE_LENGTH_AS_PACK = Transaction.BASE_LENGTH_AS_PACK + R_SertifyPubKeys.SELF_LENGTH;
    private static TYPE_ID = Transaction.CERTIFY_PUB_KEYS_TRANSACTION;
    private static NAME_ID = "Sertify Person";
    private key: number;
    private sertifiedPublicKey: PublicKeyAccount;
    private add_day: number;

    constructor(creator: PrivateKeyAccount, feePow: number, key: number, sertifiedPublicKey: PublicKeyAccount, add_day: number, timestamp: number, reference: number) {
        const verions = 0;
        const sertifiedPublicKeysCount = 1;
        const typeArray = new Int8Array([R_SertifyPubKeys.TYPE_ID, verions, sertifiedPublicKeysCount, 0]);
        super(typeArray, R_SertifyPubKeys.NAME_ID, creator, feePow, timestamp, reference);

        this.key = key;
        this.sertifiedPublicKey = sertifiedPublicKey;
        if (add_day == 0)
        // set to_date to default
            add_day = R_SertifyPubKeys.DEFAULT_DURATION;
        this.add_day = add_day;
    }

    async getDataLength(asPack: boolean): Promise<number> {
        // not include note reference
        let len = asPack ? R_SertifyPubKeys.BASE_LENGTH_AS_PACK : R_SertifyPubKeys.BASE_LENGTH;
        const accountsSize = 1;
        len += accountsSize * PublicKeyAccount.PUBLIC_KEY_LENGTH;

        return this.typeBytes[1] == 1 ? len + Transaction.SIGNATURE_LENGTH * accountsSize : len;
    }

    public async toBytes(withSign: boolean, releaserReference: number | null): Promise<Int8Array> {

        const data = new DataWriter();
        data.set(await super.toBytes(withSign, releaserReference));

        //WRITE PERSON KEY
        let keyBytes = await Bytes.longToByteArray(this.key);
        keyBytes = Bytes.ensureCapacity(keyBytes, Transaction.KEY_LENGTH, 0);
        data.set(keyBytes);

        //WRITE USER PUBLIC KEYS
        data.set(this.sertifiedPublicKey.publicKey);

        // if (withSign) {
        //     data.set(this.signature);
        // }

        //WRITE DURATION
        data.set(await Bytes.intToByteArray(this.add_day));

        return data.data;
    }

}
