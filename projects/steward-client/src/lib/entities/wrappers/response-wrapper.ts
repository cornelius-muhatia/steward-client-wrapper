/**
 * Wraps server response
 */
export class ResponseWrapper<T> {
    /**
     * Http status code e.g. 200
     */
    status: number;
    /**
     * Server message
     */
    message: string;
    /**
     * Actual response data
     */
    data: T;
}
