import {BaseRequest} from "./BaseRequest";
import {EraAsset} from "../stores/era/EraAsset";
import {IEraAssetsList} from "../../types/era/IEraAssetsList";
import {IEraBalance} from "../../types/era/IEraBalanse";
import {IEraAssetData} from "../../types/era/IEraAssetData";

export class AssetsRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
    }

    assets(): Promise<IEraAssetsList> {
        return this.fetchJSON(`assets/`);
    }

    asset(assetId: string): Promise<EraAsset> {
        return this.fetchJSON(`assets/${assetId}`);
    }

    addressassets(address: string): Promise<IEraBalance> {
        return this.fetchJSON(`addressassets/${address}`);
    }

    assetsfilter(filter: string): Promise<EraAsset[]> {
        filter = encodeURI(filter);
        return this.fetchJSON(`assetsfilter/${filter}`);
    }

    data(key: number): Promise<IEraAssetData> {
        return this.fetchJSON(`assetdata/${key}`);
    }
}
