/* tslint:disable:no-bitwise number-literal-format */

import {NativeModules} from "react-native";

const RNUtil = NativeModules.ChainUtilities;

export class Bytes {
    static ensureCapacity(numbers: Int8Array, minLength: number, padding: number): Int8Array {
        const array = numbers.length < minLength ? [...new Array(numbers), ...new Array(minLength + padding - numbers.length).fill(0)] : numbers;

        return new Int8Array(array);
    }

    static async intToByteArray(int: number): Promise<Int8Array> {
        const int8Array = await RNUtil.intToByteArray(int);
        // debugger;
        return int8Array;
    }

    static async intFromByteArray(bytes: Int8Array): Promise<number> {
        const number = await RNUtil.intFromByteArray(Array.from(bytes));
        // debugger;
        return number;
    }

    static async longToByteArray(long: number): Promise<Int8Array> {
        const int8Array = await RNUtil.longToByteArray(long.toFixed(0));
        // debugger;
        return int8Array;
    }

    static async longFromByteArray(bytes: Int8Array): Promise<number> {
        const byteArray = await RNUtil.longFromByteArray(Array.from(bytes));
        // debugger;
        return parseFloat(byteArray);
    }

    static async floatToByteArray(float: number): Promise<Int8Array> {
        const int8Array = await RNUtil.floatToByteArray(`${float}`);
        // debugger;
        return int8Array;
    }

    static async floatFromByteArray(bytes: Int8Array): Promise<number> {
        const byteArray = await RNUtil.floatFromByteArray(Array.from(bytes));
        // debugger;
        return parseFloat(byteArray);
    }

    static async stringToByteArray(str: string): Promise<Int8Array> {
        const int8Array = await RNUtil.stringToByteArray(str);
        // debugger;
        return int8Array;
    }

    static async stringFromByteArray(bytes: Int8Array): Promise<string> {
        const s = await RNUtil.stringFromByteArray(Array.from(bytes));
        // debugger;
        return s;
    }
}
