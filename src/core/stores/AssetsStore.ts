import {action, computed, observable, ObservableMap} from "mobx";
import {persist} from "mobx-persist";
import {request} from "../../App";
import {IEraAsset} from "../../types/era/IEraAsset";
import {EraAsset} from "./era/EraAsset";
import * as _ from "lodash";

export enum PredefinedAssets {
    Era = 1, Compu = 2
}

export class AssetsStore {
    @observable
    @persist("map", EraAsset)
    assets: ObservableMap<EraAsset> = observable.map({});

    @observable
    @persist("list")
    private _favorite: number[] = [PredefinedAssets.Era, PredefinedAssets.Compu];

    @computed.struct
    get favorite(): EraAsset[] {
        const fav: EraAsset[] = [];
        this._favorite.forEach(key => {
            const asset = this.assets.get(key.toString());
            if (asset) {
                fav.push(asset);
            }
        });

        return fav;
    }

    get compu() {
        return this.favorite.find(asset => asset.key === PredefinedAssets.Compu);
    }

    async search(text: string): Promise<EraAsset[]> {
        const assets = await request.assets.assetsfilter(text);
        const result: EraAsset[] = [];
        assets.forEach(asset => {
            if (this.assets.has(asset.key.toString())) {
                const _asset = this.assets.get(asset.key.toString());
                if (_asset) {
                    _.extend(_asset, asset);
                    result.push(_asset);
                }
            } else {
                const _asset = new EraAsset(asset);
                this.assets.set(asset.key.toString(), _asset);
                result.push(_asset);
            }
        });

        return result;
    }

    @action
    addFavorite(asset: number): void {
        this._favorite.indexOf(asset) < 0 && this._favorite.push(asset);
    }

    @action
    removeFavorite(asset: number): void {
        if ([PredefinedAssets.Era, PredefinedAssets.Compu].indexOf(asset) >= 0) {
            return;
        }

        const index = this._favorite.indexOf(asset);
        if (index >= 0) {
            this._favorite.splice(index, 1);
        }
    }

    isFavorite(asset: number): boolean {
        return this._favorite.indexOf(asset) >= 0;
    }

    async loadAssets(): Promise<EraAsset[]> {
        if (!this.assets.values().length) {
            const assetsMap = await request.assets.assets();
            const keys: number[] = Object.keys(assetsMap).map(k => parseFloat(k));
            const assets = keys.map(key => new EraAsset({key, name: assetsMap[key]} as IEraAsset));

            assets.forEach(asset => this.assets.set(asset.key.toString(), asset));
        }

        return this.assets.values();
    }
}

export const assetsStore = new AssetsStore();

export interface IEraAssetWithIcon extends IEraAsset {
    balance?: number;
    icon: string | null;
}

