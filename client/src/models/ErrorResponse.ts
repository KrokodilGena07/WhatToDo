export interface ErrorResponse {
    status: number;
    data: ErrorData
}

export interface ErrorData {
    message: string;
    errors: IError[];
}

interface IError {
    path: string;
    msg: string;
}