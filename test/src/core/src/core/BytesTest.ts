/* tslint:disable */
import {expect} from "chai";
import {Bytes} from "../../../../../src/core/src/core/Bytes";

describe("Bytes", () => {
    it("ensureCapacity", () => {
        const bytes = new Int8Array([0]);
        expect(Bytes.ensureCapacity(bytes, 2, 0).toString()).to.eq("0,0");
        expect(Bytes.ensureCapacity(bytes, 2, 2).toString()).to.eq("0,0,0,0");
    });

    it("intToByteArray", () => {
        expect(Bytes.intToByteArray(123456).toString()).to.eq("0,1,-30,64");
        expect(Bytes.intFromByteArray(new Int8Array([0, 1, -30, 64]))).to.eq(123456);
    });

    it("long", () => {
        const long = new Date(1983, 11, 22, 2, 30).getTime();

        expect(Bytes.longToByteArray(long).toString()).to.equal("0,0,0,102,-89,-65,91,64");
        expect(Bytes.longFromByteArray(new Int8Array([0, 0, 0, 102, -89, -65, 91, 64]))).to.equal(long);
    });

    it("should convert string to byte array", () => {
        const array = Bytes.stringToByteArray("a");
        expect(array.length).to.eq(1);
        expect(array[0]).to.eq("a".charCodeAt(0));
    });

    it("should convert byte array to string", () => {
        const str = "abc";
        const array = Bytes.stringToByteArray(str);
        const backString = Bytes.stringFromByteArray(array);

        expect(backString).to.eq(str);
    });

    it("convert long to bytes", () => {
        const long = new Date(1983, 11, 22, 2, 30).getTime();
        expect(Bytes.longToByteArray(long).toString()).eq([0, 0, 0, 102, -89, -65, 91, 64].toString());
    });

    it("convert bytes to long", () => {
        const long = new Date(1983, 11, 22, 2, 30).getTime();
        expect(Bytes.longFromByteArray(new Int8Array([0, 0, 0, 102, -89, -65, 91, 64])).toString()).eq(long);
    });

    describe("test conver", () => {
        it("test lat", () => {
            const c = Bytes.stringToByteArray("abcфыв");
            expect(Bytes.stringFromByteArray(c)).to.eq("abcфыв");
        });
        it("test cyr", () => {
            const b = Bytes.stringToByteArray("фбв");
            expect(Bytes.stringFromByteArray(b)).to.eq("фбв");
        });
    });

    // describe("test data", () => {
    //     console.log(Base58.encode(new Uint8Array([66, 26, 249, 58, 77, 40, 85, 87, 216, 148, 80, 104, 193, 140, 230, 43, 101, 158, 102, 111, 44, 116, 116, 38, 129, 50, 57, 144, 147, 115, 70, 20])));
    //     console.log(Base58.encode(new Uint8Array([221, 80, 211, 4, 230, 249, 201, 39, 231, 116, 149, 152, 208, 109, 157, 124, 215, 233, 43, 217, 140, 150, 225, 79, 229, 145, 207, 86, 6, 121, 62, 7, 66, 26, 249, 58, 77, 40, 85, 87, 216, 148, 80, 104, 193, 140, 230, 43, 101, 158, 102, 111, 44, 116, 116, 38, 129, 50, 57, 144, 147, 115, 70, 20])));
    //
    //     // console.log(Qora.getAccountAddressFromPublicKey(Base58.decode("GZGtyqLcCxRftYpaC2LjT2VNLMJ3KZghDxFwitZ5MFr6")));
    // });
});
