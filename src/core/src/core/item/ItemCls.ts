import {PublicKeyAccount} from "../account/PublicKeyAccount";
// import * as base58 from "bs58";
import {Transaction} from "../transaction/Transaction";
import {Bytes} from "../Bytes";
import {DataWriter} from "../DataWriter";

export class ItemCls {
    static MAX_ICON_LENGTH = 11000;
    static MAX_IMAGE_LENGTH = 1100000;
    static HAIR_COLOR_SIZE_LENGTH = 1;
    static MAX_HAIR_COLOR_LENGTH = 256 ^ ItemCls.HAIR_COLOR_SIZE_LENGTH - 1;
    static EYE_COLOR_SIZE_LENGTH = 1;
    static MAX_EYE_COLOR_LENGTH = 256 ^ ItemCls.EYE_COLOR_SIZE_LENGTH - 1;
    static SKIN_COLOR_SIZE_LENGTH = 1;
    static MAX_SKIN_COLOR_LENGTH = 256 ^ ItemCls.SKIN_COLOR_SIZE_LENGTH - 1;
    static RACE_SIZE_LENGTH = 1;
    static MAX_RACE_LENGTH = 256 ^ ItemCls.RACE_SIZE_LENGTH - 1;
    static REFERENCE_LENGTH = Transaction.SIGNATURE_LENGTH;
    static TIMESTAMP_LENGTH = Transaction.TIMESTAMP_LENGTH;
    static BIRTHDAY_LENGTH = ItemCls.TIMESTAMP_LENGTH;
    static DEATHDAY_LENGTH = ItemCls.TIMESTAMP_LENGTH;
    static LATITUDE_LENGTH = 4;
    static TYPE_LENGTH = 2;
    static OWNER_LENGTH = PublicKeyAccount.PUBLIC_KEY_LENGTH;
    static NAME_SIZE_LENGTH = 1;
    static MAX_NAME_LENGTH = Math.pow(256, ItemCls.NAME_SIZE_LENGTH) - 1;
    static IMAGE_SIZE_LENGTH = 4;
    static ICON_SIZE_LENGTH = 2;
    static DESCRIPTION_SIZE_LENGTH = 4;
    protected static BASE_LENGTH = ItemCls.TYPE_LENGTH + ItemCls.OWNER_LENGTH + ItemCls.NAME_SIZE_LENGTH + ItemCls.ICON_SIZE_LENGTH + ItemCls.IMAGE_SIZE_LENGTH + ItemCls.DESCRIPTION_SIZE_LENGTH;
    typeBytes: Int8Array;
    owner: PublicKeyAccount;
    name: string;
    icon: Int8Array;
    image: Int8Array;
    description: string;
    reference?: Int8Array;

    constructor(typeBytes: Int8Array, owner: PublicKeyAccount, name: string, icon: Int8Array, image: Int8Array, description: string) {
        this.typeBytes = typeBytes;
        this.owner = owner;
        this.name = name;
        this.icon = icon;
        this.image = image;
        this.description = description;

        // this.reference = Bytes.ensureCapacity(base58.decode(name), ItemCls.REFERENCE_LENGTH, 0) as Int8Array;
    }

    async getDataLength(includeReference: boolean): Promise<number> {
        return ItemCls.BASE_LENGTH
            + (await Bytes.stringToByteArray(this.name)).length
            + this.icon.length
            + this.image.length
            + (await Bytes.stringToByteArray(this.description)).length
            + (includeReference ? ItemCls.REFERENCE_LENGTH : 0);
    }

    async toBytes(includeReference: boolean, forOwnerSign: boolean): Promise<Int8Array> {
        const data = new DataWriter();
        const useAll = !forOwnerSign;

        if (useAll) {
            //WRITE TYPE
            this.typeToBytes(data);
        }

        if (useAll) {
            // WRITE OWNER
            this.ownerToBytes(data);
        }

        //WRITE NAME
        await this.nameToBytes(data, useAll);

        if (useAll) {
            //WRITE ICON SIZE - 2 bytes = 64kB max
            //WRITE ICON
            await this.iconToBytes(data);
        }

        await this.imageToBytes(data, useAll);

        // WRITE DESCRIPTION
        await this.descriptionToBytes(data, useAll);

        if (useAll && includeReference && this.reference) {
            //WRITE REFERENCE
            data.set(this.reference);
        }

        return data.data;
    }

    typeToBytes(dataWriter: DataWriter): void {
        dataWriter.set(this.typeBytes);
    }

    ownerToBytes(dataWriter: DataWriter): void {
        dataWriter.set(this.owner.publicKey);
    }

    async nameToBytes(dataWriter: DataWriter, prependLength: boolean = false): Promise<void> {
        const name = await Bytes.stringToByteArray(this.name);
        if (prependLength) {
            dataWriter.setNumber(name.length);
        }
        dataWriter.set(name);
    }

    async iconToBytes(dataWriter: DataWriter): Promise<void> {
        const length = this.icon.length;
        const iconsLength = await Bytes.intToByteArray(length);

        dataWriter.set(new Int8Array([iconsLength[2], iconsLength[3]]));
        dataWriter.set(this.icon);
    }

    async imageToBytes(dataWriter: DataWriter, prependLength: boolean = false): Promise<void> {
        if (prependLength) {
            dataWriter.set(await Bytes.intToByteArray(this.image.length));
        }

        dataWriter.set(this.image);
    }

    async descriptionToBytes(dataWriter: DataWriter, prependLength: boolean = false): Promise<void> {
        const description = await Bytes.stringToByteArray(this.description);
        if (prependLength) {
            dataWriter.set(await Bytes.intToByteArray(description.length));
        }

        dataWriter.set(description);
    }

}
