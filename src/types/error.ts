import { AxiosError } from "axios";

interface ErrorResponse {
    error: string[]
    message: string
}

export type CustomError = AxiosError<ErrorResponse>;