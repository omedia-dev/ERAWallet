import RNFetchBlob from "react-native-fetch-blob";
import {ResponseError} from "./ResponseError";
import {Log} from "../../common/Log";

export class BaseRequest {
    constructor(protected baseUrl: string = "") {
    }

    fetch(url: string, method: Methods = "GET", body?: any, headers?: { [key: string]: string }): Promise<any> {
        const fullUrl = `${this.baseUrl}/${url}`;
        console.log(fullUrl, body);
        return RNFetchBlob
            .fetch(method, fullUrl, headers, body)
            .then(r => {
                if (r.respInfo.status < 200 || r.respInfo.status >= 300) {
                    throw new Error(r.respInfo.status.toString());
                }

                return r;
            })
            .catch(e => {
                Log.error(e);
            });
    }

    fetchJSON(url: string, method: Methods = "GET", body?: any, headers?: { [key: string]: string }): Promise<any> {
        return this
            .fetch(url, method, body, headers)
            .then(r => {
                const data = r.json();
                if (data.error) {
                    throw new ResponseError(data);
                }
                return data;
            });
    }
}

type Methods = "POST" | "GET" | "DELETE" | "PUT" | "post" | "get" | "delete" | "put";
