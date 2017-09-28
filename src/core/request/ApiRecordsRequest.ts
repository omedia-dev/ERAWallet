import {BaseRequest} from "./BaseRequest";

export class ApiRecordsRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
    }

    getbyaddress(address: string, asset: number): Promise<IWalletHistoryRow[]> {
        return this.fetchJSON(`getbyaddress?address=${address}&asset=${asset}`);
    }

    getbyaddressfromtransactionlimit(address: string, asset: number, start: number, end: number, type: number): Promise<{[id: string]: IWalletHistoryRow}> {

        console.log(`getbyaddressfromtransactionlimit?address=${address}&asset=${asset}&start=${start}&end=${end}&type=${type}`);
        return this.fetchJSON(`getbyaddressfromtransactionlimit?address=${address}&asset=${asset}&start=${start}&end=${end}&type=${type}&sort=des`);
    }
}

export interface IWalletHistoryRow {
    action_key: number,
    amount: string,
    asset: number ,
    confirmations: number,
    creator: string,
    data: string,
    encrypted: boolean,
    fee: string,
    head: string,
    height: number,
    isText: boolean,
    property1: number,
    property2: number,
    recipient: string,
    record_type: string,
    reference: string,
    sequence: number,
    signature: string,
    size: number
    sub_type_name: string,
    timestamp: number,
    type: number,
    type_name: string,
    version: number,
}
