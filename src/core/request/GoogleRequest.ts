import {BaseRequest} from "./BaseRequest";
import {settings} from "../settings/AppSettings";

export class GoogleRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
    }

    decode(lat: number, long: number, key: string = settings.googleMapApiKey): Promise<ILocationData> {
        return this.fetchJSON(`geocode/json?latlng=${lat},${long}&key=${key}`, "POST");
    }
}

export interface ILocationData {
    results: {
        address_components: IAddressComponents[];
        formatted_address: string;
        geometry: any;
        place_id: string;
        types: string[];
    }[];
    status: string;

}

export interface IAddressComponents {
    long_name: string;
    short_name: string;
    types: string[];
}
