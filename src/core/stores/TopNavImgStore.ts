import {observable} from "mobx";

export class TopNavImgStore {
    @observable
    height: number;
}

export const topNavImgStore = new TopNavImgStore();
