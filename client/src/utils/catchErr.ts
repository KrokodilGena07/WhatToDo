import {ErrorData, ErrorResponse} from "../models/ErrorResponse";

export const catchErr = (err: any, setErr: (err: ErrorData) => void) => {
    const error = err as ErrorResponse;
    if (String(error.status) === 'FETCH_ERROR') {
        return setErr({message: 'Looks like something went wrong', errors: []});
    }
    setErr(error.data);
};