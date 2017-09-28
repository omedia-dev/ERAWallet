export class Account {
    static ADDRESS_LENGTH = 25;
    private address: string;

    constructor(address: string) {
        this.address = address;
    }

    getAddress() {
        return this.address;
    }

    static isValidAddress(address: string): boolean {
        return /^[\w\d]{34}$/.test(address);
    }
}
