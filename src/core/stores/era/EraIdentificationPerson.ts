import {EraPerson} from "./EraPerson";
import {DecodeImage} from "../../../common/DecodeImage";
import {IEraPerson} from "../../../types/era/IEraPerson";

export class EraIdentificationPerson extends EraPerson {

    imageData: Int8Array;

    private _imageUri: string;

    constructor(person: IEraPerson, imageData: Int8Array) {
        super(person);
        this.imageData = imageData;
    }

    async getImageUri(): Promise<string | null> {
        if (this._imageUri) {
            return this._imageUri;
        }

        const imageDecode = new DecodeImage(Math.random().toString());
        if (await imageDecode.exists()) {
            await imageDecode.remove();
        }
        await imageDecode.save(this.imageData);

        return this._imageUri = imageDecode.fullUri;
    }
}
