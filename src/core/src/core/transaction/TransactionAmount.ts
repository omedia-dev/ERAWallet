import {Transaction} from "./Transaction";
import {Account} from "../account/Account";
import {DataWriter} from "../DataWriter";
import {Base58} from "../../../crypt/libs/Base58";
import {Bytes} from "../Bytes";
import {BigDecimal} from "../../../../common/BigDecimal";
import {PrivateKeyAccount} from "../account/PrivateKeyAccount";

export class TransactionAmount extends Transaction {
    protected static RECIPIENT_LENGTH = Account.ADDRESS_LENGTH;
    protected static AMOUNT_LENGTH = 8;
    protected static BASE_LENGTH_AS_PACK = Transaction.BASE_LENGTH_AS_PACK + TransactionAmount.RECIPIENT_LENGTH + Transaction.KEY_LENGTH + TransactionAmount.AMOUNT_LENGTH;
    protected static BASE_LENGTH = Transaction.BASE_LENGTH + TransactionAmount.RECIPIENT_LENGTH + Transaction.KEY_LENGTH + TransactionAmount.AMOUNT_LENGTH;
    private recipient: Account;
    private amount: BigDecimal;
    private key: number;

    constructor(typeBytes: Int8Array, name: string, creator: PrivateKeyAccount, feePow: number, recipient: Account, amount: BigDecimal | null, key: number, timestamp: number, reference: number) {
        super(typeBytes, name, creator, feePow, timestamp, reference);

        this.recipient = recipient;

        if (amount == null || amount.num === 0) {
            // set version to 1
            typeBytes[2] = (typeBytes[2] | -128);
        } else {
            this.amount = amount;
        }

        this.key = key;
    }

    async toBytes(withSign: boolean, releaserReference: number | null): Promise<Int8Array> {

        const data = new DataWriter();
        data.set(await super.toBytes(withSign, releaserReference));

        //WRITE RECIPIENT
        data.set(await Base58.decode(this.recipient.getAddress()));

        if (this.amount != null) {
            //WRITE KEY
            let keyBytes = await Bytes.longToByteArray(this.key);
            keyBytes = Bytes.ensureCapacity(keyBytes, Transaction.KEY_LENGTH, 0);
            data.set(keyBytes);

            //WRITE AMOUNT
            let amountBytes = await Bytes.longToByteArray(this.amount.unscaledValue());
            amountBytes = Bytes.ensureCapacity(amountBytes, TransactionAmount.AMOUNT_LENGTH, 0);
            data.set(amountBytes);
        }

        return data.data;
    }

    async getDataLength(asPack: boolean): Promise<number> {
        return (asPack ? TransactionAmount.BASE_LENGTH_AS_PACK : TransactionAmount.BASE_LENGTH) -
            (this.typeBytes[2] < 0 ? (Transaction.KEY_LENGTH + TransactionAmount.AMOUNT_LENGTH) : 0);
    }
}
