import {BaseRequest} from "./BaseRequest";
import {EraBlock} from "../stores/era/EraBlock";

export class BlocksRequest extends BaseRequest {
    constructor(baseUrl = "") {
        super(baseUrl);
    }

    blocksFromHeight(height: number, limit: number): Promise<{ blocks: EraBlock[] }> {
        return this.fetchJSON(`blocksfromheight/${height}/${limit}`);
    }

    blocksSignaturesFromHeight(height: number, limit: number): Promise<{ blocks: EraBlock[] }> {
        return this.fetchJSON(`blockssignaturesfromheight/${height}/${limit}`);
    }
}
