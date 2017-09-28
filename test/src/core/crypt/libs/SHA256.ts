import {SHA256} from "../../../../../src/core/crypt/libs/SHA256";
import {expect} from "chai";
import {fixtures} from "../../../../assets/fixtures";

describe("sha256", () => {
    it("hash", () => {
        expect(SHA256.hash(fixtures.sha256Message)).to.eq(fixtures.sha256Hash);
    });
});
