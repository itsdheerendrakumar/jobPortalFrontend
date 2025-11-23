import { AxiosError } from "axios";

interface ErrorResponse {
    message: string
}

export type CustomError = AxiosError<ErrorResponse>;