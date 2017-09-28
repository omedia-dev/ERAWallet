import {IRegistrationData} from "../src/core/item/persons/IFullPersonHuman";
import {action, observable} from "mobx";
import {persist} from "mobx-persist";
import {ScaleImage} from "../../common/ScaleImage";
import {PublicKeyAccount} from "../src/core/account/PublicKeyAccount";
import {PersonHuman} from "../src/core/item/persons/PersonHuman";
import {stores} from "./Stores";
import {Base58} from "../crypt/libs/Base58";
import {Log} from "../../common/Log";
import {FullPersonHuman} from "./FullPersonHuman";
import {f} from "../../common/t";

export class RegistrationStore {
    @observable @persist("object", FullPersonHuman)
    private _data: IRegistrationData = new FullPersonHuman();

    get data(): IRegistrationData {
        return this._data;
    }

    @action
    setData(data: IRegistrationData): void {
        this._data = data;
    }

    validate(): string[] {
        return ([] as string[]).concat(
            this.validateImage(),
            this.validateName(),
            this.validateDescription(),
            this.validateDate(),
            this.validateGeo()
        );
    }

    async getShareData(): Promise<string> {
        const data = this.data;
        const image = await new ScaleImage(this.data.imageInfo).scale();
        const keys = stores.localWallet.keys;

        const person = new PersonHuman(
            new PublicKeyAccount(keys.publicKey),
            data.name || "",
            (new Date(data.date).getTime() || 0),
            (new Date(data.date).getTime() || 0) - 1,
            data.gender || 1,
            data.race || "",
            data.geoDetails.geometry.location.lat || 0,
            data.geoDetails.geometry.location.lng || 0,
            data.skinColor || "",
            data.eyeColor || "",
            data.hairColor || "",
            data.height || 0,
            new Int8Array(0),
            image,
            data.description
        );

        await person.sign(keys.secretKey);
        const bytes = await person.toBytes(false, false);
        const encode = await Base58.encode(new Int8Array(bytes));
        Log.log(encode);
        Log.log("publicKey", keys.publicKey);
        Log.log("secretKey", keys.secretKey);

        return encode;
    }

    private validateImage(): string[] {
        if (!this._data.imageInfo) {
            return [f`Need select image`];
        }

        return [];
    }

    private validateName(): string[] {
        if (!this._data.name || this._data.name.length < 12) {
            return [f`error_1`];
        }

        return [];
    }

    private validateDescription(): string[] {
        if (!this._data.description) {
            return [f`error_2`];
        }

        return [];
    }

    private validateDate(): string[] {
        if (!this._data.date) {
            return [f`error_3`];
        }

        return [];
    }

    private validateGeo(): string[] {
        if (!this._data.geoData || !this._data.geoDetails) {
            return [f`error_4`];
        }

        return [];
    }
}

export const registrationStore = new RegistrationStore();
