import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';

export class StewardConfig {
    base_url: string;
    access_token?: string;
    headers?: HttpHeaders;
}

/**
 * Oauth2 client details
 */
export class ClientDetails {
    clientSecret: string;
    clientId: String;
}

@Injectable()
export class StewardClientService<T, E> {
    /**
     * Http request headers
     */
    private headers: HttpHeaders;
    /**
     * Authorization token
     */
    private token: string;
    /**
     * Oauth refresh token
     */
    private refreshToken: String;
    /**
     * Base url
     */
    base_url: string = "/";
    /**
     * Token expiry token
     */
    private expiryDate: Date;
    /**
     * Oauth token endpoint
     */
    private oauthTokenEndpoint: string;

    /**
     * Constructor
     * 
     * @param http http client service
     * @param config base url, access token and request headers
     * @param clientDetails Oauth2 client details
     */
    constructor(private http: HttpClient, private config: StewardConfig, @Optional() private clientDetails?: ClientDetails) {
        this.base_url = config.base_url;
        if (config.headers) {
            this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
        } else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            });
        }
        if (config.access_token) {//append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + config.access_token);
        }
    }

    /**
     *  Used to update authorization token. Currently supports bearer token
     *
     * @param token
     */
    setToken(token: string) {
        if (this.config.access_token) {//update token header
            this.headers = this.headers.set("Authorization", "Bearer " + token);
        } else {//append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + token);
        }
    }
    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     * @param data a valid object
     * @param addHeaders additional headers to be appended to existing headers
     */
    post(endpoint: string, data: T, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>> {
        this.oauthContext()
        return this.http.post(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(
            catchError(this.handleError<any>())
        );

    }

    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     * @param addHeaders additional headers to be appended to existing headers
     */
    put(endpoint: string, data: T, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>> {
        this.oauthContext();
        return this.http.put(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Handles http delete request
     * @param endpoint expects either an endpoint or url
     * @param data
     * @param addHeaders additional headers to be appended to existing headers
     */
    delete(endpoint: string, data: T, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>> {
        this.oauthContext();
        return this.http.request('delete', this.serviceURL(endpoint), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers, body: JSON.stringify(data) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Handles http get request
     * @param endpoint expects either an endpoint or url
     * @param data request params
     * @param addHeaders additional headers to be appended to existing headers
     */
    get(endpoint: string, data?: Map<string, string>, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>> {
        this.oauthContext();
        const options = {
            headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Fetch a file
     * @param endpoint expects either an endpoint or url
     * @param data
     */
    getFile(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
        this.oauthContext();
        const options = {
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint) + '?access_token=' + this.token, options).pipe(
            catchError(this.handleError<any>())
        );
    }
    /**
     * if
     * @param endpoint expects either an endpoint or url
     * @param data
     * @param headers
     */
    postFormData(endpoint: string, data: T, headers?: HttpHeaders): Observable<ResponseWrapper<E>> {
        this.oauthContext();
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        if (this.headers.get("Authorization") && (!headers)) {
            headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
        } else if (!headers) {
            headers = new HttpHeaders();
        }
        return this.http.post(this.serviceURL(endpoint), formData, { headers: headers }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * handle http form data request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid object
     */
    postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        this.oauthContext();
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        return this.http.post(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Handles http put form data request
     * @param endpoint expects either an endpoint or url
     * @param data valid object
     */
    putFormDataMultiPart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        this.oauthContext();
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        return this.http.put(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Convert map to HttpParams
     * @param data
     */
    private getHttpParams(data: Map<string, string>): HttpParams {
        if (data == undefined) {
            return new HttpParams();
        }
        let httpParams: HttpParams = new HttpParams();
        data.forEach((value: string, key: string) => {
            httpParams = httpParams.append(key, value);
        });
        return httpParams;
    }
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     */
    private handleError<ResponseWrapper>() {
        return (error: HttpErrorResponse): Observable<any> => {
            const res = new ResponseWrapper();
            //            console.error(error); // log to console instead
            if (error.status == 500) {
                res.status = error.status;
                res.message = 'Sorry internal server error occured please try again later';
            } else {
                res.status = error.status;
                res.message = error.error.message;
                res.data = error.error.data;
            }
            return of(res);
        };
    }
    /**
     * Used to render action buttons
     */
    static renderMore(id: any) {
        return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
    }

    /**
     * Handles datatable request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid map
     */
    public intiateDataTable(endpoint: string, data?: Map<string, string>) {
        this.oauthContext();
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Used to validate if a string is a valid URL
     * @param url
     */
    public isURL(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * If the url parameter is an endpoint it appends to the base url
     * @param url
     * @see base_url
     */
    public serviceURL(url: string): string {
        return (this.isURL(url)) ? url : this.base_url + url;
    }

    /**
   * Used to find key value based on the key sequence provided
   * @param data expects an object
   * @param keys i.e. user.gender.type.type
   */
    public getObjectValue(data: any, keys: Array<string>) {
        if ((!(data instanceof Object)) || (keys.length === 1)) {
            return data[keys[keys.length - 1]];
        }
        let value = null;
        Object.keys(data).forEach((key) => {
            if ((key === keys[0]) && (data[key] instanceof Object)) {
                value = this.getObjectValue(data[key], keys);
            } else if (key === keys[keys.length - 1]) {
                value = data[key];
            }
        });
        return value;

    }

    /**
     * Used to append headers the current httpHeaders
     * @returns merged headers
     */
    public appendHeaders(entries: Map<String, string | string[]>): HttpHeaders {
        let customHeaders: HttpHeaders = this.headers;
        entries.forEach((val: string | string[], key: string) => {
            customHeaders = customHeaders.append(key, val);
        });
        return customHeaders;
    }

    /**
     * Handles oauth authentication with password grant
     * 
     * @param username user's username
     * @param password user's password
     * @param addHeaders additional headers to be appended to existing headers
     */
    public authenticate(endpoint: string, username: string, password: string, addHeaders?: Map<string, string | string[]>): Observable<ResponseWrapper<E>> {
        if (!this.clientDetails) {
            console.warn("oauth 2 authentication not support ensure you have injected client details(client secret and client id)")
        }
        let formHeaders = addHeaders ? this.appendHeaders(addHeaders) : this.headers
        formHeaders = formHeaders.set('Authorization', 'Basic ' + this.getHttpBasicToken());
        formHeaders = formHeaders.delete("Content-Type");
        const formData: FormData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("grant_type", "password");
        return this.http.post(this.serviceURL(endpoint), formData, { headers: formHeaders }).pipe(
            catchError(this.handleError<any>())
        ).pipe(tap(response => {
            if (response["access_token"]) {
                this.setSessionCookie(response["access_token"], response["refresh_token"], response["expires_in"]);
            }
        }));

    }

    /**
     * Update authorization token cookie. Also updates Bearer Authorization token
     * 
     * @param token oauth token
     * @param refreshToken oauth refresh token
     * @param expiry token expiry in seconds
     */
    private setSessionCookie(token: string, refreshToken: string, expiry: number) {
        let cookie = ";samesite=strict;path=/";
        document.cookie = "token=" + token + cookie + ";max-age=" + expiry;
        document.cookie = "refreshToken=" + refreshToken + cookie + ";max-age=" + expiry + 300;
        this.headers = this.headers.set("Authorization", "Bearer " + token)
    }

    /**
     * If client details exists, expired token is refreshed.
     * 
     */
    private async oauthContext() {
        if (!this.clientDetails) {
            return;
        }
        this.updateAccessToken();
        if ((!this.token) && this.refreshToken) {
            await this.refreshAccessToken().subscribe(response => {
                if (!response["access_token"]) {
                    console.error("Failed to refresh access token", response);
                }
            });
        } else {
            return;
        }

    }

    /**
     * Update access token and refresh token from session cookie
     */
    private updateAccessToken(){
        console.debug("Updating session credentials...")
        let inst = this;
        document.cookie.split(';').forEach(function (item) {
            if(item.includes("token=")){
                inst.token = item.split('=')[1];
                inst.headers = inst.headers.set("Authorization", "Bearer " + inst.token)
            } else if(item.includes("refreshToken=")){
                inst.refreshToken = item.split('=')[1];
            }
        });
    }

    /**
     * Refreshes access token
     * 
     * @param fun callback function after token refresh
     */
    public refreshAccessToken(): Observable<ResponseWrapper<E>> {
        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic '
                + this.getHttpBasicToken()
        });
        return this.http.post(this.serviceURL(this.oauthTokenEndpoint), {
            refresh_token: this.refreshAccessToken,
            grant_type: "refresh_token"
        }, { headers: headers })
            .pipe(catchError(this.handleError<any>()))
            .pipe(
                tap(response => {
                    if (response["refresh_token"]) {
                        this.setSessionCookie(response["access_token"], response["refresh_token"], response["expires_in"])
                    }
                }));
    }

    /**
     * Get http basic token
     */
    private getHttpBasicToken(): string {
        return btoa(this.clientDetails.clientId + ":" + this.clientDetails.clientSecret)
    }
}
/**
 * Authorization token details
 */
export interface Token {
    accessToken: String;
    refreshToken: String;
}
