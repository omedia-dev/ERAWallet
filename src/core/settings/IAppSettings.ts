export interface IAppSettings {
    environment: string;
    baseUrl: string;
    blocksPerRequest: number;
    googleMapApiKey: string;
    blocksTimeout: number;
    version: string;
    build: number;
    hockeyAppId: string;
    hockeyAppApiToken: string;
    maxImageSize: number;
    minImageSize: number;
    jpegQuality: number;
    licenseUrl: string;
    locationSelectorDebounce: number;
    defaultPin: string;
    defaultSecretKey: string;
    networkPort: number;
    defaultSendAddress: string;
    defaultSendAmount: string;
    defaultSendHead: string;
    defaultSendMessage: string;
}
