import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';
export declare class StewardConfig {
    base_url: string;
    access_token?: string;
    headers?: HttpHeaders;
}
/**
 * Oauth2 client details
 */
export declare class ClientDetails {
    clientSecret: string;
    clientId: String;
}
export declare class StewardClientService<T, E> {
    private http;
    private config;
    private clientDetails?;
    /**
     * Http request headers
     */
    private headers;
    /**
     * Authorization token
     */
    private token;
    /**
     * Oauth refresh token
     */
    private refreshToken;
    /**
     * Base url
     */
    base_url: string;
    /**
     * Token expiry token
     */
    private expiryDate;
    /**
     * Oauth token endpoint
     */
    private oauthTokenEndpoint;
    /**
     * Constructor
     *
     * @param http http client service
     * @param config base url, access token and request headers
     * @param clientDetails Oauth2 client details
     */
    constructor(http: HttpClient, config: StewardConfig, clientDetails?: ClientDetails);
    /**
     *  Used to update authorization token. Currently supports bearer token
     *
     * @param token
     */
    setToken(token: string): void;
    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     * @param data a valid object
     * @param addHeaders additional headers to be appended to existing headers
     */
    post(endpoint: string, data: T, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>>;
    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     * @param addHeaders additional headers to be appended to existing headers
     */
    put(endpoint: string, data: T, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>>;
    /**
     * Handles http delete request
     * @param endpoint expects either an endpoint or url
     * @param data
     * @param addHeaders additional headers to be appended to existing headers
     */
    delete(endpoint: string, data: T, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>>;
    /**
     * Handles http get request
     * @param endpoint expects either an endpoint or url
     * @param data request params
     * @param addHeaders additional headers to be appended to existing headers
     */
    get(endpoint: string, data?: Map<string, string>, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>>;
    /**
     * Fetch a file
     * @param endpoint expects either an endpoint or url
     * @param data
     */
    getFile(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>>;
    /**
     * if
     * @param endpoint expects either an endpoint or url
     * @param data
     * @param headers
     */
    postFormData(endpoint: string, data: T, headers?: HttpHeaders): Observable<ResponseWrapper<E>>;
    /**
     * handle http form data request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid object
     */
    postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    /**
     * Handles http put form data request
     * @param endpoint expects either an endpoint or url
     * @param data valid object
     */
    putFormDataMultiPart(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    /**
     * Convert map to HttpParams
     * @param data
     */
    private getHttpParams;
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     */
    private handleError;
    /**
     * Used to render action buttons
     */
    static renderMore(id: any): string;
    /**
     * Handles datatable request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid map
     */
    intiateDataTable(endpoint: string, data?: Map<string, string>): Observable<any>;
    /**
     * Used to validate if a string is a valid URL
     * @param url
     */
    isURL(url: string): boolean;
    /**
     * If the url parameter is an endpoint it appends to the base url
     * @param url
     * @see base_url
     */
    serviceURL(url: string): string;
    /**
   * Used to find key value based on the key sequence provided
   * @param data expects an object
   * @param keys i.e. user.gender.type.type
   */
    getObjectValue(data: any, keys: Array<string>): any;
    /**
     * Used to append headers the current httpHeaders
     * @returns merged headers
     */
    appendHeaders(entries: Map<String, string | string[]>): HttpHeaders;
    /**
     * Handles oauth authentication with password grant
     *
     * @param username user's username
     * @param password user's password
     * @param addHeaders additional headers to be appended to existing headers
     */
    authenticate(endpoint: string, username: string, password: string, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>>;
    /**
     * Update authorization token cookie. Also updates Bearer Authorization token
     *
     * @param token oauth token
     * @param refreshToken oauth refresh token
     * @param expiry token expiry in seconds
     */
    private setSessionCookie;
    /**
     * If client details exists, expired token is refreshed.
     *
     */
    private oauthContext;
    /**
     * Update access token and refresh token from session cookie
     */
    private updateAccessToken;
    /**
     * Refreshes access token
     *
     * @param fun callback function after token refresh
     */
    refreshAccessToken(): Observable<ResponseWrapper<E>>;
    /**
     * Get http basic token
     */
    private getHttpBasicToken;
}
/**
 * Authorization token details
 */
export interface Token {
    accessToken: String;
    refreshToken: String;
}
