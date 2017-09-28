import {PublicKeyAccount} from "../../account/PublicKeyAccount";
import {ItemCls} from "../ItemCls";
import {DataWriter} from "../../DataWriter";
import {Bytes} from "../../Bytes";

export class PersonCls extends ItemCls {
    static BIRTHDAY_LENGTH = ItemCls.TIMESTAMP_LENGTH;
    static DEATHDAY_LENGTH = ItemCls.TIMESTAMP_LENGTH;
    birthday: number;
    deathday: number;
    gender: number;
    race: string;
    birthLatitude: number;
    birthLongitude: number;
    skinColor: string;
    eyeColor: string;
    hairColor: string;
    height: number;

    constructor(typeBytes: Int8Array,
                owner: PublicKeyAccount,
                name: string,
                birthday: number,
                deathday: number,
                gender: number,
                race: string,
                birthLatitude: number,
                birthLongitude: number,
                skinColor: string,
                eyeColor: string,
                hairColor: string,
                height: number,
                icon: Int8Array,
                image: Int8Array,
                description: string) {
        super(typeBytes, owner, name, icon, image, description);

        this.birthday = birthday;
        this.deathday = deathday;
        this.gender = gender;
        this.race = race;
        this.birthLatitude = birthLatitude;
        this.birthLongitude = birthLongitude;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
        this.height = height;
    }

    async toBytes(includeReference: boolean, forOwnerSign: boolean): Promise<Int8Array> {
        const dataWriter = new DataWriter();
        dataWriter.set(await super.toBytes(includeReference, forOwnerSign));

        // WRITE BIRTHDAY
        await this.birthdayToBytes(dataWriter);

        // WRITE DEATHDAY
        await this.deathdayToBytes(dataWriter);

        // WRITE GENDER
        this.genderToBytes(dataWriter);

        // WRITE RACE
        await this.raceToBytes(dataWriter);

        //WRITE BIRTH_LATITUDE
        await this.birthLatitudeToBytes(dataWriter);

        //WRITE BIRTH_LONGITUDE
        await this.birthLongitudeToBytes(dataWriter);

        //WRITE SKIN COLOR
        await this.skinColorToBytes(dataWriter);

        //WRITE EYE COLOR
        await this.eyeColorToBytes(dataWriter);

        //WRITE HAIR COLOR
        await this.hairColorToBytes(dataWriter);

        //WRITE HEIGHT
        this.heightToBytes(dataWriter);

        return dataWriter.data;
    }

    async birthdayToBytes(dataWriter: DataWriter): Promise<void> {
        const dayBytes = await Bytes.longToByteArray(this.birthday);
        const bytes = Bytes.ensureCapacity(dayBytes, PersonCls.BIRTHDAY_LENGTH, 0);
        dataWriter.set(bytes);
    }

    async deathdayToBytes(dataWriter: DataWriter): Promise<void> {
        const dayBytes = await Bytes.longToByteArray(this.deathday);
        const bytes = Bytes.ensureCapacity(dayBytes, PersonCls.DEATHDAY_LENGTH, 0);
        dataWriter.set(bytes);
    }

    genderToBytes(dataWriter: DataWriter): void {
        dataWriter.setNumber(this.gender);
    }

    async raceToBytes(dataWriter: DataWriter): Promise<void> {
        const bytes = await Bytes.stringToByteArray(this.race);
        dataWriter.setNumber(bytes.length);
        dataWriter.set(bytes);
    }

    async birthLatitudeToBytes(dataWriter: DataWriter): Promise<void> {
        const bytes = await Bytes.floatToByteArray(this.birthLatitude);
        dataWriter.set(bytes);
    }

    async birthLongitudeToBytes(dataWriter: DataWriter): Promise<void> {
        const bytes = await Bytes.floatToByteArray(this.birthLongitude);
        dataWriter.set(bytes);
    }

    async skinColorToBytes(dataWriter: DataWriter): Promise<void> {
        const bytes = await Bytes.stringToByteArray(this.skinColor);
        dataWriter.setNumber(bytes.length);
        dataWriter.set(bytes);
    }

    async eyeColorToBytes(dataWriter: DataWriter): Promise<void> {
        const bytes = await Bytes.stringToByteArray(this.eyeColor);
        dataWriter.setNumber(bytes.length);
        dataWriter.set(bytes);
    }

    async hairColorToBytes(dataWriter: DataWriter): Promise<void> {
        const bytes = await Bytes.stringToByteArray(this.hairColor);
        dataWriter.setNumber(bytes.length);
        dataWriter.set(bytes);
    }

    heightToBytes(dataWriter: DataWriter): void {
        dataWriter.setNumber(this.height);
    }
}
