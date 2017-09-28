import {comparer, computed, observable} from "mobx";
import {persist} from "mobx-persist";
import * as _ from "lodash";
import {request} from "../../App";
import {stores} from "./Stores";
import {IEraPerson} from "../../types/era/IEraPerson";
import {EraPerson} from "./era/EraPerson";

export class AccountStore {
    @observable
    @persist("object", EraPerson)
    private _profile: EraPerson | null;

    loadProfile = _.throttle(async () => {
        if (this._profile && this._profile.key) {
            return;
        }

        try {
            const profile = await request.person.personbyaddress(stores.localWallet.address);
            this.profile = new EraPerson(profile);
        } catch (e) {
            if (!this._profile) {
                this.profile = new EraPerson({creator: stores.localWallet.address} as IEraPerson);
                this.startTiming();
            }
        }
    }, 5000);

    @computed.equals(comparer.structural)
    get profile(): EraPerson | null {
        return this._profile;
    }

    set profile(value: EraPerson | null) {
        this._profile = value;
    }

    private startTiming() {
        _.delay(() => this.loadProfile(), 60 * 1000);
    }
}

export const accountStore = new AccountStore();
