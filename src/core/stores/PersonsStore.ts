import {action, comparer, computed, observable, ObservableMap} from "mobx";
import {request} from "../../App";
import {persist} from "mobx-persist";
import {EraPerson} from "./era/EraPerson";
import {IPerson} from "./era/IPerson";

export class PersonsStore {
    @observable
    @persist("map", EraPerson)
    persons: ObservableMap<EraPerson> = observable.map<EraPerson>({});
    private _favoritesCache: EraPerson[] | null;

    @observable
    @persist("list")
    private _favorites: number[] = [];

    @computed.equals(comparer.structural)
    get favorites(): EraPerson[] {
        if (!this._favoritesCache) {
            this._favoritesCache = this.persons.values().filter(p => this._favorites.indexOf(p.key) >= 0);
        }

        return this._favoritesCache;
    }

    @action
    toggleFavorite(key: number): boolean {
        const index = this._favorites.indexOf(key);
        const isFavorite = index >= 0;
        if (isFavorite) {
            this._favorites.splice(index, 1);
        } else {
            this._favorites.push(key);
        }

        const person = this.persons.get(key.toString());
        if (person) {
            person.favorite = !person.favorite;
        }

        this._favoritesCache = null;

        return !isFavorite;
    }

    favoritesFilter(filter: string): EraPerson[] {
        filter = filter.toLowerCase();

        return this.persons.values().filter(p => this._favorites.indexOf(p.key) >= 0 && p.name.toLowerCase().includes(filter));
    }

    async searchPersons(filter: string): Promise<EraPerson[]> {
        if (filter.length < 3) return [];

        const list = await request.person.personsfilter(filter);

        return list.map(person => {
            const key = person.key.toString();
            let eraPerson = this.persons.get(key);
            if (!eraPerson) {
                eraPerson = new EraPerson(person);
                eraPerson.favorite = this.isFavorite(person.key);
                this.persons.set(key, eraPerson);
            }

            return eraPerson;
        });
    }

    @action
    isFavorite(key: number): boolean {
        return this._favorites.indexOf(key) >= 0;
    }

    async getByAddress(address: string): Promise<EraPerson | null> {
        try {
            const person = await request.persons.byAddress(address);
            return this.createPerson(person);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getByBase32(key: string): Promise<EraPerson | null> {
        try {
            const base32key = key.replace("+", "");
            const person = await request.persons.personbypublickeybase32(base32key);
            return this.createPerson(person);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    private createPerson(person: IPerson) {
        const key = person.key.toString();
        let eraPerson = this.persons.get(key);
        if (!eraPerson) {
            eraPerson = new EraPerson(person);
            this.persons.set(eraPerson.key.toString(), eraPerson);
        }
        return eraPerson;
    }
}

export const personsStore = new PersonsStore();
