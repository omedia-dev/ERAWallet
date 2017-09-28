export interface IResponseError {
    error: number;
    message: string;
}

export class ResponseError extends Error implements IResponseError {
    error: number;
    message: string;
    _message: string;

    constructor(data: IResponseError) {
        super(data.message);
        this.error = data.error;
        this.message = data.message;
        this._message = data.message;
    }
}
