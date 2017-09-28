import {PersonHuman} from "../src/core/item/persons/PersonHuman";
import {EraIdentificationPerson} from "./era/EraIdentificationPerson";

export class IdentificationStore {

    private _person: PersonHuman;
    private _profile: EraIdentificationPerson | null;

    get person() {
        return this._person;
    }

    set person(person: PersonHuman) {
        this._profile = null;
        this._person = person;
    }

    async getProfile(): Promise<EraIdentificationPerson> {
        if (!this._profile) {
            this._profile = new EraIdentificationPerson({
                birthday: this.person.birthday,
                creator: await this.person.owner.getAddress(),
                gender: this.person.gender,
                race: this.person.race,
                skinColor: this.person.skinColor,
                item_type: "person",
                hairColor: this.person.hairColor,
                description: this.person.description,
                birthLongitude: this.person.birthLongitude,
                type1: 1,
                deathday: 0,
                type0: 1,
                reference: "",
                item_type_sub: "human",
                eyeColor: this.person.eyeColor,
                name: this.person.name,
                isConfirmed: false,
                birthLatitude: this.person.birthLatitude,
                key: 0,
                timestamp: 0,
                height: this.person.height
            }, this.person.image);
        }

        return this._profile;
    }
}

export const identificationStore = new IdentificationStore();
