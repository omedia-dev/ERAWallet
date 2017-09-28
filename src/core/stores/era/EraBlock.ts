import {IEraBlock} from "../../../types/era/IEraBlock";
import {IEraTransaction} from "../../../types/era/IEraTransaction";

export class EraBlock implements IEraBlock {
    reference: string;
    blockATs: string;
    creator: string;
    signature: string;
    fee: string;
    transactions: IEraTransaction[];
    version: number;
    generatingBalance: number;
    winValueTargeted: number;
    transactionsHash: string;
    timestamp: number;
    height: number;
}
