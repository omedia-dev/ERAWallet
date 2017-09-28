import {BlockRequest} from "./BlockRequest";
import {BlocksRequest} from "./BlocksRequest";
import {PersonsRequest} from "./PersonsRequest";
import {AssetsRequest} from "./AssetsRequest";
import {PersonRequest} from "./PersonRequest";
import {BroadcastRequest} from "./BroadcastRequest";
import {GoogleRequest} from "./GoogleRequest";
import {ApiRecordsRequest} from "./ApiRecordsRequest";
import {AddressRequest} from "./AddressRequest";
import {settings} from "../settings/AppSettings";
import {AccountRequest} from "./AccountRequest";
import {LocalizationRequest} from "./LocalizationRequest";

const googleUrl = "https://maps.googleapis.com/maps/api";
const localizationUrl = "http://era.dextechnology.com:8100/uploads/Localization";
const apiRecordsUrl = settings.baseUrl + "records";

export class FetchRequest {
    block: BlockRequest;
    blocks: BlocksRequest;
    persons: PersonsRequest;
    assets: AssetsRequest;
    person: PersonRequest;
    broadcast: BroadcastRequest;
    google: GoogleRequest;
    records: ApiRecordsRequest;
    address: AddressRequest;
    account: AccountRequest;
    localization: LocalizationRequest;

    constructor(baseUrl: string) {
        this.block = new BlockRequest(baseUrl);
        this.blocks = new BlocksRequest(baseUrl);
        this.persons = new PersonsRequest(baseUrl);
        this.assets = new AssetsRequest(baseUrl);
        this.person = new PersonRequest(baseUrl);
        this.broadcast = new BroadcastRequest(baseUrl);
        this.google = new GoogleRequest(googleUrl);
        this.records = new ApiRecordsRequest(apiRecordsUrl);
        this.address = new AddressRequest(baseUrl);
        this.account = new AccountRequest(baseUrl);
        this.localization = new LocalizationRequest(localizationUrl);
    }
}
