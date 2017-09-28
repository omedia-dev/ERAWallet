export class Log {
    static enabled = __DEV__;

    static log(...message: any[]): void {
        Log.call("log", arguments);
    }

    static info(...message: any[]): void {
        Log.call("info", arguments);
    }

    static error(...message: any[]): void {
        Log.call("error", arguments);
    }

    private static call(method: string, args: any): void {
        if (Log.enabled)
            console[method].apply(console, args);
    }
}

declare const console: {
    [key: string]: () => any;
};
