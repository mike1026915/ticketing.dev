export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeError(): {message: string, field?: string}[];

    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}