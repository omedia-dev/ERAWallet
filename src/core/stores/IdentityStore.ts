import {request} from "../../App";
import {settings} from "../settings/AppSettings";
import {observable} from "mobx";
import {Toaster} from "../../common/Toaster";

// TODO: remove this store
export class IdentityStore {
    @observable
    inserted: boolean = false;
    @observable
    isConfirmed: boolean;
    private _started: number;

    start(publicKey: string): void {
        if (this._started) {
            return;
        }

        this._check(publicKey);
    }

    stop(): void {
        clearTimeout(this._started);
    }

    private async _check(publicKey: string): Promise<void> {
        try {
            const key = await request.persons.byPublicKey(publicKey);
            const person = await request.persons.byKey(key);
            this.inserted = true;
            this.isConfirmed = person.isConfirmed;
        } catch (e) {
            Toaster.error(e, true);
            this.inserted = false;
            this.isConfirmed = false;
        }

        this._started = setTimeout(() => this._check(publicKey), settings.blocksTimeout);
    }
}

export let identityStore = new IdentityStore();
