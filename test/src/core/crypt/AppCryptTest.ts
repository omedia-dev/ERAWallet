/* tslint:disable */
import {expect} from "chai";
import {createHash} from "crypto";
import {AppCrypt} from "../../../../src/core/crypt/AppCrypt";
import {fixtures} from "../../../assets/fixtures";
import {Base58} from "../../../../src/core/crypt/libs/Base58";

describe("AppCrypt", () => {
    it("generateSeed", () => {
        expect(AppCrypt.generateSeed(fixtures.phrase).length).to.eq(44);
        expect(AppCrypt.generateSeed(fixtures.phrase)).to.eq(fixtures.seed);
    });

    it("createAddress", () => {
        const address = AppCrypt.createAddress();
        expect(address).to.eq(fixtures.address);
    });

    it("generateKeys", () => {
        // const seedArr: Uint8Array = Base58.decode(fixtures.seed);
        const keys = AppCrypt.generateKeys();

        expect(keys.publicKey.toString()).to.eq(fixtures.publicKey.toString());
        expect(keys.secretKey.toString()).to.eq(fixtures.privateKey.toString());
    });

    it("get address", () => {
        console.log(AppCrypt.getAddressByPublicKey("ChgzaxYqboMEYgC9RaZ8dCDpBajiU8UJKfkJ8C1rp3JV"));
    });

    it("test SHA256", () => {
        const bytes = Base58.decode("ChgzaxYqboMEYgC9RaZ8dCDpBajiU8UJKfkJ8C1rp3JV");
        const buffer = new Buffer(bytes);
        const hash = createHash("SHA256");
        hash.end(buffer);
        console.log(new Int8Array(hash.read()));
        // console.log(Bytes.stringToByteArray(SHA256("test").toString()));
    });
});
