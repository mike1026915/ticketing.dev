import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
    readonly statusCode = 500;
    readonly reason = 'Failed to connect to DB';

    constructor() {
        super('DatabaseConnectionError');

        Object.setPrototypeOf(this, DatabaseConnectionError);
    }

    serializeError() {
        return [{
            message: this.reason,
        }]
    }
}