/* tslint:disable */

import {Base58} from "../../../../../src/core/crypt/libs/Base58";
import {expect} from "chai";
import {fixtures} from "../../../../assets/fixtures";
import {Bytes} from "../../../../../src/core/src/core/Bytes";

describe("Base58", () => {
    it("decode", () => {
        expect(Base58.decode(fixtures.base58String).toString()).to.eq(fixtures.base58Array.toString());
    });

    it("encode", () => {
        expect(Base58.encode(new Int8Array(fixtures.base58Array))).to.eq(fixtures.base58String);
    });

    it("test ads sa", () => {
        const str = "Hello, World!+";

        const bytes = Bytes.stringToByteArray(str);
        console.log(new Uint8Array(bytes).length);
        const decode = Base58.encode(new Int8Array(bytes));

        console.log(decode);
        console.log(Base58.decode(decode));
    });

    it("test transaction ", () => {
        const promise = Base58.encode([64, 50, -38, -65, -48, -13, -99, 51, -84, -46, -49, 101, 0, -78, -60, 6, -38, 101, -118, -90, -48, -74, -4, 108, 96, 101, -87, -9, 111, -107, 100, 99, 68, 92, 36, 93, 81, 106, 79, 93, 33, 64, 44, -3, -121, 92, 73, -26, -118, 125, -94, -10, -11, 91, -14, -116, -37, 51, 59, 116, 50, 62, -87, -4]);
        promise.then((e) => console.log(e));
    });
});
