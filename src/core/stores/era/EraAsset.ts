import {IEraAsset} from "../../../types/era/IEraAsset";
import {request} from "../../../App";
import {DecodeImage} from "../../../common/DecodeImage";
import * as _ from "lodash";
import {computed, observable} from "mobx";
import {persist} from "mobx-persist";
import {stores} from "../Stores";

export class EraAsset implements IEraAsset {
    @observable
    @persist
    creator: string;

    @observable
    @persist
    quantity: number;

    @observable
    @persist
    item_type: string;

    @observable
    @persist
    isDivisible: boolean;

    @observable
    @persist
    description: string;

    @observable
    @persist
    scale: number;

    @observable
    @persist
    type1: number;

    @observable
    @persist
    type0: number;

    @observable
    @persist
    reference: string;

    @observable
    @persist
    item_type_sub: string;

    @observable
    @persist
    name: string;

    @observable
    @persist
    isConfirmed: boolean;

    @observable
    @persist
    key: number;

    @observable
    @persist
    timestamp: number;

    constructor(asset: IEraAsset) {
        _.extend(this, asset);
    }

    @computed
    get amount(): number {
        return (stores.accountStore.profile && stores.accountStore.profile.balance && stores.accountStore.profile.balance[this.key] && stores.accountStore.profile.balance[this.key][0]) || 0;
    }

    @computed
    get fixedAmount(): string {
        return this.amount.toFixed(8);
    }

    async getIconPath(): Promise<string | null> {
        const image = new DecodeImage(this.key.toString(), "png", "assets");
        if (!await image.exists()) {
            const data = await request.assets.data(this.key);
            const icon = data.icon;

            if (!icon) return null;

            await image.save(icon);
        }

        return image.fullPath;
    }
}
