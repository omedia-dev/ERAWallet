import {EraBlock} from "../stores/era/EraBlock";
import {BaseRequest} from "./BaseRequest";

export class BlockRequest extends BaseRequest {
    constructor(baseUrl = "") {
        super(baseUrl);
    }

    firstBlock(): Promise<EraBlock> {
        return this.fetchJSON("firstblock");
    }

    lastBlock(): Promise<EraBlock> {
        return this.fetchJSON("lastblock");
    }

    blockBySignature(signature: string): Promise<EraBlock> {
        return this.fetchJSON(`block/${signature}`);
    }

    blockByHeight(height: number): Promise<EraBlock> {
        return this.fetchJSON(`blockbyheight/${height}`);
    }

    childBlockSignature(signature: string): Promise<EraBlock> {
        return this.fetchJSON(`childblocksignature/${signature}`);
    }

    childBlock(signature: string): Promise<EraBlock> {
        return this.fetchJSON(`childblock/${signature}`);
    }
}
