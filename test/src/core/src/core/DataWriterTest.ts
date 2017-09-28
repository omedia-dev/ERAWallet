import {expect} from "chai";

import {DataWriter} from "../../../../../src/core/src/core/DataWriter";
describe("DataWriter", () => {
    let writer: DataWriter;

    beforeEach(() => {
        writer = new DataWriter;
    });

    it("should create empty data set", () => {
        expect(writer.data.length).to.equal(0);
    });

    it("should not set empty data", () => {
        writer.set(new Int8Array([]));
        expect(writer.data.length).to.eq(0);
    });

    it("should append data to end of data set", () => {
        writer.set(new Int8Array([0, 1, 2]));
        const data = writer.data;

        expect(data.length).to.eq(3);
        expect(data[0]).to.eq(0);
        expect(data[1]).to.eq(1);
        expect(data[2]).to.eq(2);

        writer.set(new Int8Array([0, 1, 2]));
        const _data = writer.data;

        expect(_data.length).to.eq(6);
        expect(_data[3]).to.eq(0);
        expect(_data[4]).to.eq(1);
        expect(_data[5]).to.eq(2);

        expect(_data.toString()).to.eq('0,1,2,0,1,2');
    });

    it("should append string as byte array", () => {
        writer.setString("abc");
        const data = writer.data;

        expect(data.length).to.eq(3);
        expect(data.toString()).to.eq("97,98,99");
    });

    it("should append number", () => {
        writer.setNumber(10);
        const data = writer.data;

        expect(data.length).to.eq(1);
        expect(data.toString()).to.eq("10");
    });
});
