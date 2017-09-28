import {IPerson} from "../../../../stores/era/IPerson";

export interface IPersonHuman extends IPerson {
    image?: Int8Array;
    imagePath?: string;
}
