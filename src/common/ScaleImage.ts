import RNFetchBlob from "react-native-fetch-blob";
import {Image} from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";
import {settings} from "../core/settings/AppSettings";

export class ScaleImage {

    constructor(private image: Image,
                private maxImageSize: number = settings.maxImageSize,
                private minImageSize: number = settings.minImageSize) {
    }

    async scale(): Promise<Int8Array> {
        let image = await this.readFile(this.image.path);
        let size = image.length;
        let source = this.image.path;
        let scale = 1;
        let width = this.image.width * scale;
        let height = this.image.height * scale;
        let newImage = image;

        while (size > this.maxImageSize || size < this.minImageSize) {
            if (size > this.maxImageSize) {
                scale = scale / 2;
            } else if (size < this.minImageSize) {
                scale = scale * 1.5;
            }
            width = this.image.width * scale;
            height = this.image.height * scale;
            source = await this.newImage(this.image.path, width, height);
            newImage = await this.readFile(source);
            size = newImage.length;
        }

        return newImage;
    }

    getImage(): Promise<Int8Array> {
        return this.scale();
    }

    private readFile(path: string): Promise<Int8Array> {
        return RNFetchBlob.fs.readFile(path.replace(/^file:/, ""), "ascii");
    }

    private newImage(source: string, width: number, height: number): Promise<string> {
        return ImageResizer.createResizedImage(source, width, height, "JPEG", settings.jpegQuality, 0, RNFetchBlob.fs.dirs.CacheDir);
    }
}
