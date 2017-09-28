declare module "fs" {
    function readFile(path: string, cb: (error: any, buffer: Buffer) => {}): void;

    function readFileSync(path: string): Buffer;
}

declare class Buffer implements ArrayLike<number> {
    [index: number]: number;
    length: number;

    constructor(input: ArrayLike<number> | number);

    readDoubleLE(pos: number): number;
}
