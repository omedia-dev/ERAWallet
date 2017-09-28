import {BaseRequest} from "./BaseRequest";
import {IEraPerson} from "../../types/era/IEraPerson";
import {IEraPersonData} from "../../types/era/IEraPersonData";
import {EraPerson} from "../stores/era/EraPerson";

export class PersonRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
    }

    personsfilter(filter: string): Promise<IEraPerson[]> {
        filter = encodeURI(filter);
        return this.fetchJSON(`personsfilter/${filter}`);
    }

    persondata(key: number): Promise<IEraPersonData> {
        return this.fetchJSON(`persondata/${key}`);
    }

    person(key: number): Promise<EraPerson> {
        return this.fetchJSON(`person/${key}`)
            .then(p => {
                p.hairColor = p["hairСolor"];
                return p;
            });
    }

    personbyaddress(address: string): Promise<EraPerson> {
        return this.fetchJSON(`personbyaddress/${address}`)
            .then(p => {
                p.hairColor = p["hairСolor"];
                return p;
            });
    }

}
