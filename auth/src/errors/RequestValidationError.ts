import { ValidationError } from "express-validator";

import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {
    readonly statusCode = 400

    constructor(public errors: ValidationError[]) {
        super('RequestValidationError');

        Object.setPrototypeOf(this, RequestValidationError);
    }

    serializeError() {
        return this.errors.map((error) => {
            return {
                message: error.msg,
                field: error.param,
            }
        })
    }
}