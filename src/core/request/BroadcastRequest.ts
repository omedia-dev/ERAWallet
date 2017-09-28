import {BaseRequest} from "./BaseRequest";
import {ResponseError} from "./ResponseError";

export class BroadcastRequest extends BaseRequest {

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    broadcast(transaction: string): Promise<IBroadcastResponse | ResponseError> {
        return this.fetchJSON(`broadcast/${transaction}`);
    }

    broadcastPost(raw: string): Promise<IBroadcastResponse | ResponseError> {
        return this
            .fetchJSON(`broadcast`, "POST", `raw=${raw}`, {"content-type": "application/x-www-form-urlencoded"});
    }
}

export interface IBroadcastResponse {
    status: "ok";
}
