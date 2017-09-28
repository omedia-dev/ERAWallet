import {IAppSettings} from "./IAppSettings";

class AppCliSettings {
    private _settings: IAppSettings;
    private _defaultSettings: IAppSettings = {
        environment: "temp",
        baseUrl: "http://18.220.217.143:9067/api",
        blocksPerRequest: 30,
        googleMapApiKey: "",
        blocksTimeout: 10000,
        version: "1",
        build: 1,
        hockeyAppApiToken: "",
        hockeyAppId: "",
        minImageSize: 15 * 1024,
        maxImageSize: 20 * 1024,
        jpegQuality: 80,
        licenseUrl: "https://github.com/icreator/Erachain_public/blob/master/License/1.06.md",
        locationSelectorDebounce: 0,
        defaultPin: "",
        defaultSecretKey: "",
        networkPort: 9066,
        defaultSendAddress: "",
        defaultSendAmount: "",
        defaultSendMessage: "",
        defaultSendHead: "",
    };
    private _environment: "stage" | "production" | "development";

    get settings(): IAppSettings {
        if (!this._settings) {
            this._settings = this.loadSettings();
        }

        return this._settings;
    }

    set environment(environment: "stage" | "production" | "development") {
        const validEnv = ["stage", "production", "development"];
        if (validEnv.indexOf(environment) < 0) {
            throw new Error(`Invalid environment. Valid values is on of "${validEnv.join("\", \"")}".`);
        }
        this._environment = environment;
    }

    loadSettings(): IAppSettings {
        let envName = this._environment;
        const env = require("../../../resources/settings/env.json");
        if (!envName) {
            envName = env.environment;
        }

        const envs: { [key: string]: IAppSettings } = {
            development: require(`../../../resources/settings/development.json`),
            production: require(`../../../resources/settings/production.json`),
            stage: require(`../../../resources/settings/stage.json`),
        };

        const loadedSettings = envs[envName];
        return {...this._defaultSettings, ...env, ...loadedSettings};
    }
}

declare const module: any;
module.exports.settings = new AppCliSettings();
