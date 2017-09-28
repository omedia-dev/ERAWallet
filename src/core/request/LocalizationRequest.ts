import {BaseRequest} from "./BaseRequest";

export class LocalizationRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
    }

    getAll(): Promise<ILocaleFile[]> {
        return this.fetchJSON("GetAll");
    }
}
export interface ILocaleFile {
    contentType: string,
    entityTag: null,
    fileContents: string,
    fileDownloadName: string,
    lastModified: null
}

