import {observable} from "mobx";
import {EraPerson} from "./era/EraPerson";
import {EraAsset} from "./era/EraAsset";
import {Account} from "../src/core/account/Account";
import {stores} from "./Stores";
import {persist} from "mobx-persist";
import {f} from "../../common/t";

export class SendStore {

    @observable
    @persist("object", EraAsset)
    asset: EraAsset | null;

    @observable
    @persist("object", EraPerson)
    recipient: EraPerson | null;

    @observable
    @persist
    amount: string;

    @observable
    @persist
    head: string;

    @observable
    @persist
    message: string;

    @observable
    @persist
    fee: number;

    @observable
    success: boolean;

    backKey: string;

    @observable
    size: number;

    @observable
    resultMessage: string;

    async pasteAddress(address: string): Promise<void> {
        if (!Account.isValidAddress(address)) {
            throw new Error(f`Invalid address`);
        }

        const person = await stores.personsStore.getByAddress(address);
        if (!person) {
            throw new Error(f`Person not found`);
        }

        this.recipient = person;
    }

    setResult(succes: boolean, message: string) {
        this.success = succes;
        this.resultMessage = message;
    }

    clean() {
        this.asset = null;
        this.recipient = null;
        this.amount = "";
        this.head = "";
        this.message = "";
        this.fee = 0;
    }
}

export const sendStore = new SendStore();
