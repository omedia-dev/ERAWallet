import {IPersonHuman} from "./IPersonHuman";
import {Image} from "react-native-image-crop-picker";

export interface IRegistrationData extends IPersonHuman {
    imageInfo: Image;
    geoData: any;
    geoDetails: any;
    date: Date;
}
