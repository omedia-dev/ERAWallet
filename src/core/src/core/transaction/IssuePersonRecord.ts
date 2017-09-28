import {Issue_ItemRecord} from "./Issue_ItemRecord";
import {Transaction} from "./Transaction";
import {PersonCls} from "../item/persons/PersonCls";
import {PrivateKeyAccount} from "../account/PrivateKeyAccount";

export class IssuePersonRecord extends Issue_ItemRecord {
    private static TYPE_ID = Transaction.ISSUE_PERSON_TRANSACTION;
    private static NAME_ID = "Issue Person";

    public constructor(creator: PrivateKeyAccount, person: PersonCls, feePow: number, timestamp: number, reference: number) {
        super(new Int8Array([IssuePersonRecord.TYPE_ID, 0, 0, 0]), IssuePersonRecord.NAME_ID, creator, person, feePow, timestamp, reference);
    }

}
