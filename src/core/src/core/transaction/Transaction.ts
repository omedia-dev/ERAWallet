import {CoreCrypto} from "../crypto/Crypto";
import {PublicKeyAccount} from "../account/PublicKeyAccount";
import {BlockChain} from "../BlockChain";
import {PrivateKeyAccount} from "../account/PrivateKeyAccount";
import {DataWriter} from "../DataWriter";
import {Bytes} from "../Bytes";
import {settings} from "../../../settings/AppSettings";
import {AppCrypt} from "../../../crypt/AppCrypt";
import {BigDecimal} from "../../../../common/BigDecimal";

export abstract class Transaction {
    public static CERTIFY_PUB_KEYS_TRANSACTION = 36;
    static SIGNATURE_LENGTH = CoreCrypto.SIGNATURE_LENGTH;
    static TIMESTAMP_LENGTH = 8;
    static REFERENCE_LENGTH = Transaction.TIMESTAMP_LENGTH;
    static ISSUE_PERSON_TRANSACTION = 24;
    static SEND_ASSET_TRANSACTION = 31;
    static KEY_LENGTH = 8;
    protected static FEE_POWER_LENGTH = 1;
    protected static TYPE_LENGTH = 4;
    protected static CREATOR_LENGTH = PublicKeyAccount.PUBLIC_KEY_LENGTH;
    protected static BASE_LENGTH = Transaction.TYPE_LENGTH + Transaction.FEE_POWER_LENGTH + Transaction.REFERENCE_LENGTH + Transaction.TIMESTAMP_LENGTH + Transaction.CREATOR_LENGTH + Transaction.SIGNATURE_LENGTH;
    protected static BASE_LENGTH_AS_PACK = Transaction.TYPE_LENGTH + Transaction.CREATOR_LENGTH + /*REFERENCE_LENGTH*/ +Transaction.SIGNATURE_LENGTH;
    protected static IS_TEXT_LENGTH = 1;
    protected static ENCRYPTED_LENGTH = 1;
    protected static DATA_SIZE_LENGTH = 4;
    protected typeBytes: Int8Array;
    protected feePow: number;
    protected signature: Int8Array;
    protected fee: BigDecimal;
    private TYPE_NAME: string;
    private creator: PrivateKeyAccount;
    private timestamp: number;
    private reference: number;

    constructor(typeBytes: Int8Array, typeName: string, creator: PrivateKeyAccount, feePow: number, timestamp: number, reference: number) {
        this.typeBytes = typeBytes;
        this.TYPE_NAME = typeName;
        this.creator = creator;
        //this.props = props;
        this.timestamp = timestamp;
        this.reference = reference;

        this.feePow = Math.max(Math.min(feePow, BlockChain.FEE_POW_MAX), 0);
    }

    async sign(creator: PrivateKeyAccount, asPack: boolean): Promise<void> {
        // use this.reference in any case and for Pack too
        // but not with SIGN
        const data = new DataWriter();
        data.set(await this.toBytes(false, null));

        // all test a not valid for main test
        // all other network must be invalid here!
        data.set(await Bytes.intToByteArray(settings.networkPort));
        this.signature = AppCrypt.sign(data.data, creator.getSecretKey());
        if (!asPack) {
            // need for recalc! if not as a pack
            await this.calcFee();
        }
    }

    async toBytes(withSign: boolean, releaserReference: number | null): Promise<Int8Array> {
        const asPack = releaserReference != null;
        const data = new DataWriter();

        //WRITE TYPE
        data.set(this.typeBytes);

        if (!asPack) {
            //WRITE TIMESTAMP
            let timestampBytes = await Bytes.longToByteArray(this.timestamp);
            timestampBytes = Bytes.ensureCapacity(timestampBytes, Transaction.TIMESTAMP_LENGTH, 0);
            data.set(timestampBytes);
        }

        //WRITE REFERENCE - in any case as Pack or not
        if (this.reference != null) {
            // NULL in imprints
            let referenceBytes = await Bytes.longToByteArray(this.reference);
            referenceBytes = Bytes.ensureCapacity(referenceBytes, Transaction.REFERENCE_LENGTH, 0);
            data.set(referenceBytes);
        }

        //WRITE CREATOR
        data.set(await this.creator.getPublicKey().publicKey);

        //WRITE FEE POWER
        if (!asPack) {
            const feePowBytes = new Int8Array([0]);
            feePowBytes[0] = 0; //this.feePow; // todo: fix large feePow
            data.set(feePowBytes);
        }

        //SIGNATURE
        if (withSign) {
            data.set(this.signature);
        }

        return data.data;
    }

    async calcBaseFee(): Promise<number> {
        return this.calcCommonFee();
    }

    async calcFee(): Promise<void> {
        const fee = new BigDecimal(await this.calcBaseFee())
            .multiply(BlockChain.FEE_RATE)
            .setScale(8, BigDecimal.ROUND_UP);

        if (this.feePow > 0) {
            this.fee = fee
                .multiply(new BigDecimal(BlockChain.FEE_POW_BASE).pow(this.feePow))
                .setScale(8, BigDecimal.ROUND_UP);
        } else {
            this.fee = fee;
        }
    }

    async calcCommonFee(): Promise<number> {
        return await this.getDataLength(false) * BlockChain.FEE_PER_BYTE;
    }

    abstract async getDataLength(asPack: boolean): Promise<number>;
}
