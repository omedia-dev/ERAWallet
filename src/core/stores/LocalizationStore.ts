import {observable} from "mobx";
import {persist} from "mobx-persist";
import {locales_en_default, locales_ru_default} from "../../common/t";
import {request} from "../../App";
import {ILocaleFile} from "../request/LocalizationRequest";

export const Russian = "Русский";
export const English = "English";

export const RU = "ru_RU";
export const EN = "en_US";

export class LocalizationStore {

    @persist("object")
    @observable
    currentLang: string = "";

    @persist("object")
    @observable
    LanguageKeys: { [key: string]: string } = {};

    @persist("object")
    @observable
    Languages: { [key: string]: { [key: string]: string } } = {};

    async initLanguages(defaultLocale: string) {

        this.LanguageKeys[RU] = Russian;
        this.LanguageKeys[EN] = English;
        this.Languages[RU] = locales_ru_default;
        this.Languages[EN] = locales_en_default;

        if (this.currentLang === "") {
            this.currentLang = this.LanguageKeys[defaultLocale] ? defaultLocale : EN;
        }
        try {


            const locales = await request.localization.getAll();
            if (!locales)
                return;
            locales.forEach((item: ILocaleFile) => {
                const fileContent = item.fileContents;
                const fileData = item.fileDownloadName.split(".")[0].split("-");
                const text: { [key: string]: string } = JSON.parse(decodeURIComponent(Array.prototype.map.call(this.atob(fileContent), function (c: any) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''))) as { [key: string]: string };

                const code = fileData[0];
                const name = fileData[1];

                this.LanguageKeys[code] = name;
                this.Languages[code] = text;
            });
            console.log("LOCA", this.Languages);

        } catch (error) {
            return;
        }
    }

    atob(input: string = ''): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let str = input.replace(/=+$/, '');
        let output = '';

        if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (let bc = 0, bs = 0, buffer, i = 0;
             buffer = str.charAt(i++);

             ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
             bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            buffer = chars.indexOf(buffer);
        }

        return output;
    }

}


export const localizationStore = new LocalizationStore();
