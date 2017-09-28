import {create} from "mobx-persist";
import {AsyncStorage} from "react-native";
import {navigationStore} from "./NavigationStore";
import {enableLogging} from "mobx-logger";
import {registrationStore} from "./RegistrationStore";
import {locationStore} from "./LocationStore";
import {walletStore} from "./WalletStore";
import {personsStore} from "./PersonsStore";
import {accountStore} from "./AccountStore";
import {localWallet} from "./LocalWallet";
import {identificationStore} from "./IdentificationStore";
import {assetsStore} from "./AssetsStore";
import {sendStore} from "./SendStore";
import {topNavImgStore} from "./TopNavImgStore";
import {localizationStore} from "./LocalizationStore";

enableLogging({
    predicate: (): boolean => __DEV__ && Boolean(window.navigator.userAgent),
    action: true,
    reaction: true,
    transaction: true,
    compute: true
});

export class Stores {
    navigationStore = navigationStore;

    // для скрина регистрации
    registrationStore = registrationStore;

    // для выбора локации
    locationStore = locationStore;

    // история и баланс кошелька
    walletStore = walletStore;

    // поиск персон и выбранная персона, фавориты
    personsStore = personsStore;

    // текущая персона или аноним
    accountStore = accountStore;

    // ключи и адрес
    localWallet = localWallet;

    identificationStore = identificationStore;

    // активы
    assetsStore = assetsStore;

    // отправка
    sendStore = sendStore;

    topNavImgStore = topNavImgStore;

    localizationStore = localizationStore;

    async rehydrate(): Promise<void> {
        const hydrate = create({storage: AsyncStorage, jsonify: true});

        // await hydrate("Navigation", navigationStore);
        await hydrate("Registration", registrationStore);
        await hydrate("Wallet", walletStore);
        await hydrate("Account", accountStore);
        await hydrate("Persons", personsStore);
        await hydrate("Assets", assetsStore);
        await hydrate("Localization", localizationStore);
        __DEV__ && await hydrate("Send", sendStore);

        return;
    }
}

export const stores = new Stores();
