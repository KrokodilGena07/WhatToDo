import {ErrorData} from "../models/ErrorResponse";

export const isWrong = (err: ErrorData, field: string) => {
    return err.errors.find(err => err.path === field);
};