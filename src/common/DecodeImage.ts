import {Base58} from "../core/crypt/libs/Base58";
import RNFetchBlob from "react-native-fetch-blob";
import {Platform} from "react-native";

export class DecodeImage {
    fullPath: string;

    constructor(fileName: string, extension: string = "png", dirName: string = "cache", path = `${RNFetchBlob.fs.dirs.CacheDir}`) {
        this.fullPath = (path.endsWith("/") ? path : `${path}/`) + `${dirName}/${fileName}.${extension}`;
    }

    get fullUri() {
        const prefix = Platform.OS === "ios" ? "" : "file:";
        return prefix + this.fullPath;
    }

    async exists(): Promise<boolean> {
        return RNFetchBlob.fs.exists(this.fullPath);
    }

    async remove(): Promise<void> {
        return RNFetchBlob.fs.unlink(this.fullPath);
    }

    async save(data: string): Promise<void>
    async save(data: Int8Array): Promise<void>
    async save(data: Int8Array | string): Promise<void> {
        if (typeof data === "string") {
            data = await this.decode(data);
        }

        return await RNFetchBlob.fs.writeFile(this.fullPath, Array.from(data), "ascii");
    }

    private async decode(imageData: string): Promise<Int8Array> {
        return await Base58.decode(imageData);
    }
}
