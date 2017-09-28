import {Bytes} from "./Bytes";

export class DataWriter {
    private _data: Int8Array[] = [];

    get data(): Int8Array {
        const dataLength = this._data.reduce((length, d) => length + d.length, 0);
        const data = new Int8Array(dataLength);
        let offset = 0;
        this._data.forEach(d => {
            data.set(d, offset);
            offset += d.length;
        });

        return data;
    }

    set (data: Int8Array): DataWriter {
        this._data.push(data);

        return this;
    }

    async setString(data: string): Promise<DataWriter> {
        this.set(new Int8Array(await Bytes.stringToByteArray(data)));

        return this;
    }

    setNumber(data: number): DataWriter {
        this.set(new Int8Array([data]));

        return this;
    }
}
