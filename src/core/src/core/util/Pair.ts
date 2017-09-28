export class Pair<T, U> {
    private a: T;
    private b: U;

    constructor()
    constructor(a?: T, b?: U) {
        if (a) {
            this.a = a;
        }
        if (b) {
            this.b = b;
        }
    }

    public setA(a: T) {
        this.a = a;
    }

    public getA(): T {
        return this.a;
    }

    public setB(b: U) {
        this.b = b;
    }

    public getB(): U {
        return this.b;
    }
}
