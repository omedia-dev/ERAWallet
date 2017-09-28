import {observable} from "mobx";


/**
 * Сейчас получение локации реализовано через отдельный скрин и стор
 * Возможно есть смысл сделать это просто модальным окном
 */
export class LocationStore {
    @observable
    selectedLocation?: { data: any, details: any };

    @observable
    newLocation?: { data: any, details: any };
}

export const locationStore = new LocationStore();
