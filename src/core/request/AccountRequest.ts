import {BaseRequest} from "./BaseRequest";

export class AccountRequest extends BaseRequest {
    getaccountsfromperson(key: number): Promise<IEraPersonAccounts> {
        return this.fetchJSON(`getaccountsfromperson/${key}`);
    }
}

export interface IEraPersonAccounts {
    [key: number]: string;
}
