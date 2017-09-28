import Toast from "react-native-simple-toast";

export class Toaster {
    static errorCodes: { [key: string]: string } = {
        "Invalid pin": "Пин-код введен не верно"
    };

    static error(error: Error | string, silent: boolean = false): void {
        if (!silent) {
            const message = error instanceof Error ? Toaster.getErrorCode(error.message) : error.toString();
            Toast.show(message);
        } else {
            /* tslint:disable-next-line */
            console.error(error);
        }
    }

    static getErrorCode(code: string): string {
        return Toaster.errorCodes[code] || code;
    }
}
