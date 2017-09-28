import {IRegistrationData} from "../src/core/item/persons/IFullPersonHuman";
import {observable} from "mobx";
import {persist} from "mobx-persist";
import {Image} from "react-native-image-crop-picker";

export class FullPersonHuman implements IRegistrationData {
    @observable @persist("object") imageInfo: Image;
    @observable @persist("object") geoData: Object;
    @observable @persist("object") geoDetails: Object;
    @observable @persist("object") date: Date;
    @observable @persist creator: string;
    @observable @persist name: string;
    @observable @persist("object") image: Int8Array;

    @observable @persist description: string;
    @observable @persist birthday: number;
    @observable @persist deathday: number;
    @observable @persist gender: number;
    @observable @persist race: string;
    @observable @persist birthLatitude: number;
    @observable @persist birthLongitude: number;
    @observable @persist skinColor: string;
    @observable @persist eyeColor: string;
    @observable @persist hairColor: string;
    @observable @persist height: number = 150;
    /* tslint:disable-next-line */
    @observable @persist item_type: string;
    @observable @persist type1: number;
    @observable @persist type0: number;
    @observable @persist reference: string;
    /* tslint:disable-next-line */
    @observable @persist item_type_sub: string;
    @observable @persist isConfirmed: boolean;
    @observable @persist key: number;
    @observable @persist timestamp: number;
}
