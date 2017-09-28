import {IEraPerson} from "../../../types/era/IEraPerson";
import * as _ from "lodash";
import {request} from "../../../App";
import {IAddressComponents} from "../../request/GoogleRequest";
import {persist} from "mobx-persist";
import {action, comparer, computed, observable} from "mobx";
import {pluralise, f} from "../../../common/t";
import {IEraBalance} from "../../../types/era/IEraBalanse";
import {settings} from "../../settings/AppSettings";

export class EraPerson implements IEraPerson {
    @persist
    @observable
    birthday: number;

    @persist
    @observable
    creator: string;

    loadBalance = _.throttle(() => {
        request.assets.addressassets(this.creator)
            .then(b => this.balance = b);
    }, 30000, {leading: true, trailing: false});

    @persist
    @observable
    gender: number;

    @persist
    @observable
    race: string;

    @persist
    @observable
    skinColor: string;

    @persist
    @observable
    item_type: string;

    @persist
    @observable
    hairColor: string;

    @persist
    @observable
    description: string;

    @persist
    @observable
    birthLongitude: number;

    @persist
    @observable
    type1: number;

    @persist
    @observable
    deathday: number;

    @persist
    @observable
    type0: number;

    @persist
    @observable
    reference: string;

    @persist
    @observable
    item_type_sub: string;

    @persist
    @observable
    eyeColor: string;

    @persist
    @observable
    name: string;

    @persist
    @observable
    isConfirmed: boolean;

    @persist
    @observable
    birthLatitude: number;

    @persist
    @observable
    key: number;

    loadAccounts = _.throttle(async (): Promise<void> => {
        const accounts = await request.account.getaccountsfromperson(this.key);
        this.accounts = _.values(accounts).filter(k => k !== "null");
    }, 30000, {leading: true, trailing: false});

    @persist
    @observable
    timestamp: number;

    @persist
    @observable
    height: number;

    @persist
    @observable
    favorite: boolean;

    @persist("object")
    @observable
    private _location: IPersonLocation;

    @observable
    private _balance: IEraBalance | null;

    @observable
    @persist("object")
    private _accounts: string[];

    private _publicKey: string;

    constructor(person?: IEraPerson) {
        if (person) {
            _.extend(this, person);
        }
    }

    @computed
    get birthdayFormatted(): string {
        const birthday = new Date(this.birthday);
        return birthday.toLocaleDateString();
    }

    @computed
    get sexFormatted(): string {
        return this.gender === 0 ? f`Male` : f`Female`;
    }

    @computed
    get age(): number {
        const birthday = new Date(this.birthday);
        const ageDelta = new Date(new Date().getTime() - birthday.getTime());
        return ageDelta.getFullYear() - new Date(new Date().setTime(0)).getFullYear();
    }

    @computed
    get ageFormatted(): string {
        return this.age + " " + pluralise(this.age, "год", "года", "лет");
    }

    @computed
    get imageUri(): string {
        return `${settings.baseUrl}/personimage/${this.key}`;
    }

    @computed.equals(comparer.structural)
    get balance(): IEraBalance | null {
        if (this.creator) {
            this.loadBalance();
        }

        return this._balance;
    }

    set balance(balance: IEraBalance | null) {
        this._balance = balance;
    }

    @computed
    get isAuthorized(): boolean {
        return (this.accounts && this.accounts.length > 0) || false;
    }

    @computed.equals(comparer.structural)
    get accounts(): string[] {
        if (this.key) {
            this.loadAccounts();
        }

        return this._accounts;
    }

    set accounts(accounts: string[]) {
        this._accounts = accounts;
    }

    @action
    resetBalance() {
        this.loadBalance.cancel();
        this.loadBalance();
    }

    async getLocation(): Promise<IPersonLocation | null> {
        if (this._location) {
            return this._location;
        }

        const locationData = await request.google.decode(this.birthLatitude, this.birthLongitude);
        let city = "";
        let country = "";
        if (locationData.results.length > 0) {
            locationData.results[0].address_components.forEach((item: IAddressComponents) => {
                if (item.types[0] === "country") {
                    country = item.long_name;
                }
                if (item.types[0] === "locality") {
                    city = item.long_name;
                } else if (item.types[0] === "administrative_area_level_1" && city === "") {
                    city = item.long_name;
                }
            });
        }

        return this._location = {city, country};
    }

    async getImageUri(): Promise<string | null> {
        if (!this.key) {
            return null;
        }

        return `${settings.baseUrl}/personimage/${this.key}`;
    }

    async getPublicKey() {
        if (!this._publicKey) {
            this._publicKey = await request.address.addresspublickey(this.creator);
        }

        return this._publicKey;
    }
}

export interface IPersonLocation {
    city: string;
    country: string
}

//
