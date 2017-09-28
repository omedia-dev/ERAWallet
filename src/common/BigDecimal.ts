export class BigDecimal {
    static ROUND_UP = 1;
    static ROUND_DOWN = 2;
    private scale = 8;
    private _num: number;

    constructor(num: string, scale?: number)
    constructor(num: number, scale?: number)
    constructor(num: number | string, scale?: number) {
        if (typeof num === "string") {
            num = parseFloat(num);
        }

        if (scale !== undefined) {
            this.scale = scale;
        }

        this._num = num;
    }

    get intCompact(): number {
        return this._num * Math.pow(10, this.scale);
    }

    get stringCache(): string {
        const float = this.intCompact.toString();
        let repeat = 0;
        if (this.scale > float.length) {
            repeat = this.scale - float.length;
        }
        const zeros = "0".repeat(repeat);

        return `${Math.floor(this._num)}.${zeros}${float}`;
    }

    get num(): number {
        return this._num;
    }

    multiply(x: number): BigDecimal
    multiply(x: BigDecimal): BigDecimal
    multiply(x: number | BigDecimal): BigDecimal {
        return new BigDecimal(this.num * this._value(x));
    }

    setScale(newScale: number = this.scale, roundingMode: number = BigDecimal.ROUND_DOWN): BigDecimal {
        const precision = Math.pow(10, newScale + 1);
        let value = this.num * precision;
        value = roundingMode === BigDecimal.ROUND_UP ? Math.ceil(value) : Math.floor(value);
        value = value / precision;

        return new BigDecimal(value);
    }

    pow(x: number): BigDecimal
    pow(x: BigDecimal): BigDecimal
    pow(x: number | BigDecimal): BigDecimal {
        return new BigDecimal(Math.pow(+this, this._value(x)));
    }

    valueOf(): number {
        return this.num;
    }

    unscaledValue(): number {
        return this.intCompact;
    }

    private _value(x: number | BigDecimal): number {
        if (x instanceof BigDecimal) {
            x = x.num;
        }
        return x;
    }
}
