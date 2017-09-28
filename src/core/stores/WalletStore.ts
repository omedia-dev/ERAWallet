import {observable} from "mobx";
import {request} from "../../App";
import {persist} from "mobx-persist";
import {IWalletHistoryRow} from "../request/ApiRecordsRequest";
import {stores} from "./Stores";
import {PredefinedAssets} from "./AssetsStore";
import {f} from "../../common/t";

const PageSize = 10;

export class WalletStore {
    @persist("object")
    @observable
    history: IWalletHistoryItem[] = [];

    @persist("object")
    @observable
    selectedHistoryIndex: number;

    @persist("object")
    @observable
    selectedAsset: number = PredefinedAssets.Era;

    @persist("object")
    @observable
    pageOffset: number = 0;

    @observable
    refreshing: boolean = false;

    @observable
    loading: boolean = false;

    selectIndex(index: number): void {
        this.selectedHistoryIndex = index;
    }

    async getHistory(start: number, end: number): Promise<IWalletHistoryItem[]> {
        const assets = await request.assets.assets();
        const address = stores.localWallet.address;//"7BLSgTuKo2w7k5diNdMnQN224bqGJPfhUW"
        const _sendHistory: IWalletHistoryItem[] = [];
        const historyType = 31;
        try {
            // const serverHistory = await request.records.getbyaddress(address, this.selectedAsset);
            const serverHistory = await request.records.getbyaddressfromtransactionlimit(address, this.selectedAsset, start, end, historyType);
            Object.keys(serverHistory).forEach((key: string) => {
                const item = serverHistory[key];
                const asset = assets[this.selectedAsset];
                let positive = address === item.recipient;
                let sum = `${positive ? "+" : "-"}${item.amount}`;
                let sourceData = item;
                const index = +key;

                const date = new Date(new Date().setTime(item.timestamp));
                let day = date.getDate().toString();
                day = day.length < 2 ? `0${day}` : day;
                let month = (date.getMonth() + 1).toString();
                month = month.length < 2 ? `0${month}` : month;
                let min = date.getMinutes().toString();
                min = min.length < 2 ? `0${min}` : min;

                let dateTime = `${day}.${month}.${date.getFullYear()} ${date.getHours()}:${min}`;
                let header = item.head;
                let height = item.height;
                let confirmation = item.confirmations > 0 ? f`${item.confirmations} confirmations` : f`uncomfirmed`;
                let account = `${item.recipient.slice(0, 5)}…….${item.recipient.slice(item.recipient.length - 5, item.recipient.length)}`;
                _sendHistory.push({
                    sum,
                    dateTime,
                    header,
                    positive,
                    confirmation,
                    account,
                    index,
                    sourceData,
                    asset,
                    height
                });

            });
        } catch (error) {
            return [];
        }
        return _sendHistory;//.reverse();
    }

    async loadMoreHistory(): Promise<void> {
        this.loading = true;
        this.pageOffset+=PageSize;
        this.history.push(...await this.getHistory(this.pageOffset, this.pageOffset + PageSize));
        this.loading = false;
    }

    async refreshHistory(): Promise<void> {
        this.refreshing = true;
        this.pageOffset = 0;
        this.history = await this.getHistory(this.pageOffset, this.pageOffset + PageSize);
        this.refreshing = false;
    }
}

export interface IWalletHistoryItem {
    index: number;
    sum: string;
    header: string;
    account: string;
    dateTime: string;
    positive: boolean;
    confirmation: string;
    sourceData: IWalletHistoryRow;
    asset: string;
    height: number;
}

export const walletStore = new WalletStore();
