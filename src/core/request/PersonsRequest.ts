import {BaseRequest} from "./BaseRequest";
import {IPerson} from "../stores/era/IPerson";
import {IEraPersonData} from "../../types/era/IEraPersonData";
import {IEraPerson} from "../../types/era/IEraPerson";

export class PersonsRequest extends BaseRequest {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async byAddress(address: string): Promise<IPerson> {
        return await this.fetchJSON(`personbyaddress/${address}`);
    }

    async personsfilter(filterName: string): Promise<IPerson[]> {
        return await this.fetchJSON(`personsfilter/${filterName}`);
    }

    async byPublicKey(publicKey: string): Promise<number> {
        return await this.fetchJSON(`personkeybypublickey/${publicKey}`);
    }

    async byKey(key: number): Promise<IPerson> {
        return await this.fetchJSON(`person/${key}`);
    }

    async data(key: number): Promise<IEraPersonData> {
        return await this.fetchJSON(`persondata/${key}`);
    }

    async personbypublickeybase32(base32key: string): Promise<IEraPerson> {
        return await this.fetchJSON(`personbypublickeybase32/${base32key}`)
            .then(r => {
                if (r.Error) {
                    throw r.Error;
                }
                return r;
            });
    }
}
