import {BaseRequest} from "./BaseRequest";

export class AddressRequest extends BaseRequest {
    async lastReference(address: string): Promise<number> {
        return this.fetch(`addresslastreference/${address}`)
            .then(r => parseFloat(r.data));
    }

    async addresspublickey(address: string): Promise<string> {
        return this.fetch(`addresspublickey/${address}`)
            .then(r => r.data);
    }
}
