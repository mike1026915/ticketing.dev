import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super('NotFoundError');

        Object.setPrototypeOf(this, NotFoundError)
    }

    serializeError(): { message: string; field?: string; }[] {
        return [{
            message: 'Not Found'
        }]
    }

}