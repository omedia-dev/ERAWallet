import {IEraTransaction} from "../../../types/era/IEraTransaction";
import {EraTransactionsTypes} from "./EraTransactionsTypes";
import {EraTransactionIssuePersonItem} from "../../../types/era/EraTransactionIssuePersonItem";

export class EraTransaction implements IEraTransaction {
    type: EraTransactionsTypes;
    item: EraTransactionIssuePersonItem;
    sertified_public_keys: string[];
}
