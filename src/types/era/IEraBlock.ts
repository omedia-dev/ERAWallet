import {IEraTransaction} from "./IEraTransaction";

export interface IEraBlock {
    "reference": string,
    "blockATs": string,
    "creator": string,
    "signature": string,
    "fee": string,
    "transactions": IEraTransaction[],
    "version": number,
    "generatingBalance": number,
    "winValueTargeted": number,
    "transactionsHash": string,
    "timestamp": number,
    "height": number
}
