import {ItemCls} from "../../../../../../src/core/src/core/item/ItemCls";
import {expect} from "chai";
import {fixtures} from "../../../../../assets/fixtures";
import {PublicKeyAccount} from "../../../../../../src/core/src/core/account/PublicKeyAccount";
import {DataWriter} from "../../../../../../src/core/src/core/DataWriter";

describe("ItemCls", () => {
    const item = new ItemCls(new Int8Array([1, 0]), new PublicKeyAccount(new Int8Array(fixtures.publicKey)), fixtures.name, fixtures.icon, fixtures.image, fixtures.description);
    let dataWriter = new DataWriter();

    beforeEach(() => {
        dataWriter = new DataWriter();
    });

    describe("toBytes", () => {
        it("typeToBytes", () => {
            item.typeToBytes(dataWriter);
            expect(dataWriter.data.length).to.eq(2);
        });

        it("ownerToBytes", () => {
            item.ownerToBytes(dataWriter);
            expect(dataWriter.data.length).to.eq(fixtures.publicKey.length);
        });

        it("nameToBytes without length", () => {
            item.nameToBytes(dataWriter, false);
            expect(dataWriter.data.length).to.eq(fixtures.nameBytes.length);
        });

        it("nameToBytes with length", () => {
            item.nameToBytes(dataWriter, true);
            expect(dataWriter.data.length).to.eq(fixtures.nameBytes.length + 1);
        });

        it("iconToBytes", () => {
            item.iconToBytes(dataWriter);
            expect(dataWriter.data.length).to.eq(fixtures.icon.length + 2);
        });

        it("imageToBytes without length", () => {
            item.imageToBytes(dataWriter, false);
            expect(dataWriter.data.length).to.eq(fixtures.image.length);
        });

        it("imageToBytes with length", () => {
            item.imageToBytes(dataWriter, true);
            expect(dataWriter.data.length).to.eq(fixtures.image.length + 4);
        });

        it("description without length", () => {
            item.descriptionToBytes(dataWriter, false);
            expect(dataWriter.data.length).to.eq(fixtures.descriptionBytes.length);
        });

        it("description with length", () => {
            item.descriptionToBytes(dataWriter, true);
            expect(dataWriter.data.length).to.eq(fixtures.descriptionBytes.length + 4);
        });

        it("toBytes", () => {
            const data = item.toBytes(false, false);
            expect(data.length).to.eq(fixtures.itemClsDataLength);
        });
    });
});
