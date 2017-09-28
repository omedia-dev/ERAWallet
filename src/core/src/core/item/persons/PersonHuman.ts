import {PersonCls} from "./PersonCls";
import {PublicKeyAccount} from "../../account/PublicKeyAccount";
import {AppCrypt} from "../../../../crypt/AppCrypt";
import {Base58} from "../../../../crypt/libs/Base58";
import {ItemCls} from "../ItemCls";
import {Bytes} from "../../Bytes";
import {BlockChain} from "../../BlockChain";
import {Transaction} from "../../transaction/Transaction";
import {DataWriter} from "../../DataWriter";

export class PersonHuman extends PersonCls {
    ownerSignature: Int8Array;

    constructor(owner: PublicKeyAccount, name: string, birthday: number, deathday: number, gender: number, race: string, birthLatitude: number, birthLongitude: number, skinColor: string, eyeColor: string, hairColor: string, height: number, icon: Int8Array, image: Int8Array, description: string) {
        super(new Int8Array([1, 1]), owner, name, birthday, deathday, gender, race, birthLatitude, birthLongitude, skinColor, eyeColor, hairColor, height, icon, image, description);
    }

    /* tslint:disable-next-line */
    static async parse(rowData: string, includeReference: boolean = false): Promise<PersonHuman> {
        const data = await Base58.decode(rowData);

        // READ TYPE
        const typeBytes = data.slice(0, ItemCls.TYPE_LENGTH);
        let position = ItemCls.TYPE_LENGTH;

        //READ CREATOR
        const ownerBytes = data.slice(position, position + ItemCls.OWNER_LENGTH);
        const owner = new PublicKeyAccount(ownerBytes);
        position += ItemCls.OWNER_LENGTH;

        //READ FULL NAME
        const fullNameLength = data[position];
        position++;

        if (fullNameLength < 1 || fullNameLength > ItemCls.MAX_NAME_LENGTH) {
            throw new Error(`Invalid full name length: ${fullNameLength}`);
        }

        const fullNameBytes = data.slice(position, position + fullNameLength);
        const fullName = await Bytes.stringFromByteArray(fullNameBytes);
        position += fullNameLength;

        //READ ICON
        const iconLengthBytes = data.slice(position, position + ItemCls.ICON_SIZE_LENGTH);
        const iconLength = await Bytes.intFromByteArray(new Int8Array([0, 0, iconLengthBytes[0], iconLengthBytes[1]]));
        position += ItemCls.ICON_SIZE_LENGTH;

        if (iconLength < 0 || iconLength > ItemCls.MAX_ICON_LENGTH) {
            throw new Error("Invalid icon length: " + iconLength);
        }

        const icon = data.slice(position, position + iconLength);
        position += iconLength;

        //READ IMAGE
        const imageLengthBytes = data.slice(position, position + ItemCls.IMAGE_SIZE_LENGTH);
        const imageLength = await Bytes.intFromByteArray(imageLengthBytes);
        position += ItemCls.IMAGE_SIZE_LENGTH;

        if (imageLength < 0 || imageLength > ItemCls.MAX_IMAGE_LENGTH) {
            throw new Error("Invalid image length: " + imageLength);
        }

        const image = data.slice(position, position + imageLength);
        position += imageLength;

        //READ DESCRIPTION
        const descriptionLengthBytes = data.slice(position, position + ItemCls.DESCRIPTION_SIZE_LENGTH);
        const descriptionLength = await Bytes.intFromByteArray(descriptionLengthBytes);
        position += ItemCls.DESCRIPTION_SIZE_LENGTH;

        if (descriptionLength < 0 || descriptionLength > BlockChain.MAX_REC_DATA_BYTES) {
            throw new Error(`Invalid description length: ${descriptionLength}`);
        }

        const descriptionBytes = data.slice(position, position + descriptionLength);
        const description = await Bytes.stringFromByteArray(descriptionBytes);
        position += descriptionLength;

        let reference: Int8Array | null = null;
        if (includeReference) {
            //READ REFERENCE
            reference = data.slice(position, position + ItemCls.REFERENCE_LENGTH);
            position += ItemCls.REFERENCE_LENGTH;
        }

        //READ BIRTDAY
        const birthdayBytes = data.slice(position, position + ItemCls.BIRTHDAY_LENGTH);
        const birthday = await Bytes.longFromByteArray(birthdayBytes);
        position += ItemCls.BIRTHDAY_LENGTH;

        //READ DEATHDAY
        const deathdayBytes = data.slice(position, position + ItemCls.DEATHDAY_LENGTH);
        const deathday = await Bytes.longFromByteArray(deathdayBytes);
        position += ItemCls.DEATHDAY_LENGTH;

        //READ GENDER
        const gender = data[position];
        position++;

        //READ RACE
        const raceLength = data[position];
        position++;

        if (raceLength < 0 || raceLength > ItemCls.MAX_RACE_LENGTH) {
            throw new Error("Invalid race length");
        }

        const raceBytes = data.slice(position, position + raceLength);
        const race = await Bytes.stringFromByteArray(raceBytes);
        position += raceLength;

        //READ BIRTH LATITUDE
        const birthLatitude = await Bytes.floatFromByteArray(data.slice(position, position + ItemCls.LATITUDE_LENGTH));
        position += ItemCls.LATITUDE_LENGTH;

        //READ BIRTH LONGITUDE
        const birthLongitude = await Bytes.floatFromByteArray(data.slice(position, position + ItemCls.LATITUDE_LENGTH));
        position += ItemCls.LATITUDE_LENGTH;

        //READ SKIN COLOR LENGTH
        const skinColorLength = data[position];
        position++;

        if (skinColorLength < 0 || skinColorLength > ItemCls.MAX_SKIN_COLOR_LENGTH) {
            throw new Error("Invalid skin color length");
        }

        const skinColorBytes = data.slice(position, position + skinColorLength);
        const skinColor = await Bytes.stringFromByteArray(skinColorBytes);
        position += skinColorLength;

        //READ EYE COLOR LENGTH
        const eyeColorLength = data[position];
        position++;

        if (eyeColorLength < 0 || eyeColorLength > ItemCls.MAX_EYE_COLOR_LENGTH) {
            throw new Error("Invalid eye color length");
        }

        const eyeColorBytes = data.slice(position, position + eyeColorLength);
        const eyeColor = await Bytes.stringFromByteArray(eyeColorBytes);
        position += eyeColorLength;

        //READ HAIR COLOR LENGTH
        const hairColorLength = data[position];
        position++;

        if (hairColorLength < 0 || hairColorLength > ItemCls.MAX_HAIR_COLOR_LENGTH) {
            throw new Error("Invalid hair color length");
        }

        const hairColorBytes = data.slice(position, position + hairColorLength);
        const hairColor = await Bytes.stringFromByteArray(hairColorBytes);
        position += hairColorLength;

        //READ HEIGHT
        const height = await Bytes.intFromByteArray(new Int8Array([0, 0, 0, data[position]]));
        position++;

        let ownerSignature = null;
        if (typeBytes[1] === 1) {
            // with signature
            //READ SIGNATURE
            ownerSignature = data.slice(position, position + Transaction.SIGNATURE_LENGTH);
            // position += Transaction.SIGNATURE_LENGTH;
        }

        //RETURN
        const personHuman = new PersonHuman(owner, fullName, birthday, deathday, gender, race, birthLatitude, birthLongitude, skinColor, eyeColor, hairColor, height, icon, image, description);

        personHuman.typeBytes = typeBytes;

        if (includeReference && reference) {
            personHuman.reference = reference;
        }

        if (ownerSignature) {
            personHuman.ownerSignature = ownerSignature;
        }

        return personHuman;
    }

    async sign(secretKey: Int8Array): Promise<void> {
        const data = await this.toBytes(false, true);
        const sign = AppCrypt.sign(data, secretKey);
        this.ownerSignature = new Int8Array(sign);
    }

    async toBytes(includeReference: boolean, onlyBody: boolean): Promise<Int8Array> {
        const data = new DataWriter();
        data.set(await super.toBytes(includeReference, onlyBody));
        if (!onlyBody && this.ownerSignature) {
            data.set(this.ownerSignature);
        }

        return data.data;
    }
}
