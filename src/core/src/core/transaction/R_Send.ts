import {TransactionAmount} from "./TransactionAmount";
import {Account} from "../account/Account";
import {Transaction} from "./Transaction";
import {Bytes} from "../Bytes";
import {DataWriter} from "../DataWriter";
import {BigDecimal} from "../../../../common/BigDecimal";
import {PrivateKeyAccount} from "../account/PrivateKeyAccount";

/* tslint:disable-next-line */
export class R_Send extends TransactionAmount {
    protected static BASE_LENGTH = Transaction.IS_TEXT_LENGTH + Transaction.ENCRYPTED_LENGTH + Transaction.DATA_SIZE_LENGTH;
    private static TYPE_ID: number = Transaction.SEND_ASSET_TRANSACTION;
    private static NAME_ID = "Send";
    private head: string;
    private data: Int8Array;
    private encrypted: Int8Array;
    private isText: Int8Array;

    constructor(creator: PrivateKeyAccount, feePow: number, recipient: Account, key: number, amount: BigDecimal | null, head: string | null, data: Int8Array | null, isText: Int8Array, encrypted: Int8Array, timestamp: number, reference: number) {
        const typeBytes = new Int8Array([R_Send.TYPE_ID, 0, 0, 0]);
        super(typeBytes, R_Send.NAME_ID, creator, feePow, recipient, amount, key, timestamp, reference);

        this.head = head || "";

        if (data == null || data.length === 0) {
            // set version byte
            typeBytes[3] = (typeBytes[3] | -128);
        } else {
            this.data = data;
            this.encrypted = encrypted;
            this.isText = isText;
        }
    }

    async getDataLength(asPack: boolean): Promise<number> {
        const headBytes = await Bytes.stringToByteArray(this.head);
        const dataLen = await super.getDataLength(asPack) + 1 + headBytes.length;

        if (this.typeBytes[3] >= 0) {
            return dataLen + R_Send.BASE_LENGTH + this.data.length;
        } else {
            return dataLen;
        }
    }

    getFee(): number {
        return this.feePow;
    }

    getFeeBig(): BigDecimal {
        return this.fee;
    }

    async toBytes(withSign: boolean, releaserReference: number | null): Promise<Int8Array> {
        const data = new DataWriter();
        data.set(await super.toBytes(withSign, releaserReference));

        // WRITE HEAD
        const headBytes = await Bytes.stringToByteArray(this.head);
        //HEAD SIZE
        data.setNumber(headBytes.length);
        //HEAD
        data.set(headBytes);

        if (this.data != null) {
            //WRITE DATA SIZE
            const dataSizeBytes = await Bytes.intToByteArray(this.data.length);
            data.set(dataSizeBytes);

            //WRITE DATA
            data.set(this.data);

            //WRITE ENCRYPTED
            data.set(this.encrypted);

            //WRITE ISTEXT
            data.set(this.isText);
        }

        return data.data;
    }
}
