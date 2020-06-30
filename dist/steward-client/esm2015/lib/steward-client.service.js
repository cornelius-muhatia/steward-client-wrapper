/**
 * @fileoverview added by tsickle
 * Generated from: lib/steward-client.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';
export class StewardConfig {
}
if (false) {
    /** @type {?} */
    StewardConfig.prototype.base_url;
    /** @type {?} */
    StewardConfig.prototype.access_token;
    /** @type {?} */
    StewardConfig.prototype.headers;
}
/**
 * Oauth2 client details
 */
export class ClientDetails {
}
if (false) {
    /** @type {?} */
    ClientDetails.prototype.clientSecret;
    /** @type {?} */
    ClientDetails.prototype.clientId;
}
/**
 * @template T, E
 */
export class StewardClientService {
    /**
     * Constructor
     *
     * @param {?} http http client service
     * @param {?} config base url, access token and request headers
     * @param {?=} clientDetails Oauth2 client details
     */
    constructor(http, config, clientDetails) {
        this.http = http;
        this.config = config;
        this.clientDetails = clientDetails;
        /**
         * Base url
         */
        this.base_url = "/";
        this.base_url = config.base_url;
        if (config.headers) {
            this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
        }
        else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            });
        }
        if (config.access_token) { //append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + config.access_token);
        }
    }
    /**
     *  Used to update authorization token. Currently supports bearer token
     *
     * @param {?} token
     * @return {?}
     */
    setToken(token) {
        if (this.config.access_token) { //update token header
            this.headers = this.headers.set("Authorization", "Bearer " + token);
        }
        else { //append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + token);
        }
    }
    /**
     * Used to handle http post requests
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data a valid object
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    post(endpoint, data, addHeaders) {
        this.oauthContext();
        return this.http.post(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(catchError(this.handleError()));
    }
    /**
     * Used to handle http post requests
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    put(endpoint, data, addHeaders) {
        this.oauthContext();
        return this.http.put(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(catchError(this.handleError()));
    }
    /**
     * Handles http delete request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    delete(endpoint, data, addHeaders) {
        this.oauthContext();
        return this.http.request('delete', this.serviceURL(endpoint), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers, body: JSON.stringify(data) }).pipe(catchError(this.handleError()));
    }
    /**
     * Handles http get request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data request params
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    get(endpoint, data, addHeaders) {
        this.oauthContext();
        /** @type {?} */
        const options = {
            headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(catchError(this.handleError()));
    }
    /**
     * Fetch a file
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data
     * @return {?}
     */
    getFile(endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        const options = {
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint) + '?access_token=' + this.token, options).pipe(catchError(this.handleError()));
    }
    /**
     * if
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    postFormData(endpoint, data, headers) {
        this.oauthContext();
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            formData.append(key, data[key]);
        }));
        if (this.headers.get("Authorization") && (!headers)) {
            headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
        }
        else if (!headers) {
            headers = new HttpHeaders();
        }
        return this.http.post(this.serviceURL(endpoint), formData, { headers: headers }).pipe(catchError(this.handleError()));
    }
    /**
     * handle http form data request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data expects a valid object
     * @return {?}
     */
    postFormDataMultipart(endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach((/**
                 * @param {?} k2
                 * @return {?}
                 */
                k2 => {
                    formData.append(key, k2);
                }));
            }
            else {
                formData.append(key, data[key]);
            }
        }));
        return this.http.post(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    }
    /**
     * Handles http put form data request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data valid object
     * @return {?}
     */
    putFormDataMultiPart(endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach((/**
                 * @param {?} k2
                 * @return {?}
                 */
                k2 => {
                    formData.append(key, k2);
                }));
            }
            else {
                formData.append(key, data[key]);
            }
        }));
        return this.http.put(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    }
    /**
     * Convert map to HttpParams
     * @private
     * @param {?} data
     * @return {?}
     */
    getHttpParams(data) {
        if (data == undefined) {
            return new HttpParams();
        }
        /** @type {?} */
        let httpParams = new HttpParams();
        data.forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        (value, key) => {
            httpParams = httpParams.append(key, value);
        }));
        return httpParams;
    }
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @private
     * @template ResponseWrapper
     * @return {?}
     */
    handleError() {
        return (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            /** @type {?} */
            const res = new ResponseWrapper();
            //            console.error(error); // log to console instead
            if (error.status == 500) {
                res.status = error.status;
                res.message = 'Sorry internal server error occured please try again later';
            }
            else {
                res.status = error.status;
                res.message = error.error.message;
                res.data = error.error.data;
            }
            return of(res);
        });
    }
    /**
     * Used to render action buttons
     * @param {?} id
     * @return {?}
     */
    static renderMore(id) {
        return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
    }
    /**
     * Handles datatable request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data expects a valid map
     * @return {?}
     */
    intiateDataTable(endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(catchError(this.handleError()));
    }
    /**
     * Used to validate if a string is a valid URL
     * @param {?} url
     * @return {?}
     */
    isURL(url) {
        try {
            new URL(url);
            return true;
        }
        catch (_) {
            return false;
        }
    }
    /**
     * If the url parameter is an endpoint it appends to the base url
     * @see base_url
     * @param {?} url
     * @return {?}
     */
    serviceURL(url) {
        return (this.isURL(url)) ? url : this.base_url + url;
    }
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    getObjectValue(data, keys) {
        if ((!(data instanceof Object)) || (keys.length === 1)) {
            return data[keys[keys.length - 1]];
        }
        /** @type {?} */
        let value = null;
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if ((key === keys[0]) && (data[key] instanceof Object)) {
                value = this.getObjectValue(data[key], keys);
            }
            else if (key === keys[keys.length - 1]) {
                value = data[key];
            }
        }));
        return value;
    }
    /**
     * Used to append headers the current httpHeaders
     * @param {?} entries
     * @return {?} merged headers
     */
    appendHeaders(entries) {
        /** @type {?} */
        let customHeaders = this.headers;
        entries.forEach((/**
         * @param {?} val
         * @param {?} key
         * @return {?}
         */
        (val, key) => {
            customHeaders = customHeaders.append(key, val);
        }));
        return customHeaders;
    }
    /**
     * Handles oauth authentication with password grant
     *
     * @param {?} endpoint
     * @param {?} username user's username
     * @param {?} password user's password
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    authenticate(endpoint, username, password, addHeaders) {
        if (!this.clientDetails) {
            console.warn("oauth 2 authentication not support ensure you have injected client details(client secret and client id)");
        }
        /** @type {?} */
        let formHeaders = addHeaders ? this.appendHeaders(addHeaders) : this.headers;
        formHeaders = formHeaders.set('Authorization', 'Basic ' + this.getHttpBasicToken());
        formHeaders = formHeaders.delete("Content-Type");
        /** @type {?} */
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("grant_type", "password");
        return this.http.post(this.serviceURL(endpoint), formData, { headers: formHeaders }).pipe(catchError(this.handleError())).pipe(tap((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            if (response["access_token"]) {
                this.setSessionCookie(response["access_token"], response["refresh_token"], response["expires_in"]);
            }
        })));
    }
    /**
     * Update authorization token cookie. Also updates Bearer Authorization token
     *
     * @private
     * @param {?} token oauth token
     * @param {?} refreshToken oauth refresh token
     * @param {?} expiry token expiry in seconds
     * @return {?}
     */
    setSessionCookie(token, refreshToken, expiry) {
        /** @type {?} */
        let cookie = ";samesite=strict;path=/";
        document.cookie = "token=" + token + cookie + ";max-age=" + expiry;
        document.cookie = "refreshToken=" + refreshToken + cookie + ";max-age=" + expiry + 300;
        this.headers = this.headers.set("Authorization", "Bearer " + token);
    }
    /**
     * If client details exists, expired token is refreshed.
     *
     * @private
     * @return {?}
     */
    oauthContext() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.clientDetails) {
                return;
            }
            this.updateAccessToken();
            if ((!this.token) && this.refreshToken) {
                yield this.refreshAccessToken().subscribe((/**
                 * @param {?} response
                 * @return {?}
                 */
                response => {
                    if (!response["access_token"]) {
                        console.error("Failed to refresh access token", response);
                    }
                }));
            }
            else {
                return;
            }
        });
    }
    /**
     * Update access token and refresh token from session cookie
     * @private
     * @return {?}
     */
    updateAccessToken() {
        console.debug("Updating session credentials...");
        /** @type {?} */
        let inst = this;
        document.cookie.split(';').forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item.includes("token=")) {
                inst.token = item.split('=')[1];
                inst.headers = inst.headers.set("Authorization", "Bearer " + inst.token);
            }
            else if (item.includes("refreshToken=")) {
                inst.refreshToken = item.split('=')[1];
            }
        }));
    }
    /**
     * Refreshes access token
     *
     * @return {?}
     */
    refreshAccessToken() {
        /** @type {?} */
        let headers = new HttpHeaders({
            'Authorization': 'Basic '
                + this.getHttpBasicToken()
        });
        return this.http.post(this.serviceURL(this.oauthTokenEndpoint), {
            refresh_token: this.refreshAccessToken,
            grant_type: "refresh_token"
        }, { headers: headers })
            .pipe(catchError(this.handleError()))
            .pipe(tap((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            if (response["refresh_token"]) {
                this.setSessionCookie(response["access_token"], response["refresh_token"], response["expires_in"]);
            }
        })));
    }
    /**
     * Get http basic token
     * @private
     * @return {?}
     */
    getHttpBasicToken() {
        return btoa(this.clientDetails.clientId + ":" + this.clientDetails.clientSecret);
    }
}
StewardClientService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StewardClientService.ctorParameters = () => [
    { type: HttpClient },
    { type: StewardConfig },
    { type: ClientDetails, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * Http request headers
     * @type {?}
     * @private
     */
    StewardClientService.prototype.headers;
    /**
     * Authorization token
     * @type {?}
     * @private
     */
    StewardClientService.prototype.token;
    /**
     * Oauth refresh token
     * @type {?}
     * @private
     */
    StewardClientService.prototype.refreshToken;
    /**
     * Base url
     * @type {?}
     */
    StewardClientService.prototype.base_url;
    /**
     * Token expiry token
     * @type {?}
     * @private
     */
    StewardClientService.prototype.expiryDate;
    /**
     * Oauth token endpoint
     * @type {?}
     * @private
     */
    StewardClientService.prototype.oauthTokenEndpoint;
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.clientDetails;
}
/**
 * Authorization token details
 * @record
 */
export function Token() { }
if (false) {
    /** @type {?} */
    Token.prototype.accessToken;
    /** @type {?} */
    Token.prototype.refreshToken;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQXFCLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlGLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBTyxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdkUsTUFBTSxPQUFPLGFBQWE7Q0FJekI7OztJQUhHLGlDQUFpQjs7SUFDakIscUNBQXNCOztJQUN0QixnQ0FBc0I7Ozs7O0FBTTFCLE1BQU0sT0FBTyxhQUFhO0NBR3pCOzs7SUFGRyxxQ0FBcUI7O0lBQ3JCLGlDQUFpQjs7Ozs7QUFJckIsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7SUFpQzdCLFlBQW9CLElBQWdCLEVBQVUsTUFBcUIsRUFBc0IsYUFBNkI7UUFBbEcsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7UUFBc0Isa0JBQWEsR0FBYixhQUFhLENBQWdCOzs7O1FBakJ0SCxhQUFRLEdBQVcsR0FBRyxDQUFDO1FBa0JuQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7U0FDM0Y7YUFBTTtZQUNILElB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QXNDLGFBQWEsdUJBQWhELFFBQVE7Ozs7Ozs7O0lBN0I5RSx1Q0FBNkI7Ozs7OztJQUk3QixxQ0FBc0I7Ozs7OztJQUl0Qiw0Q0FBNkI7Ozs7O0lBSTdCLHdDQUF1Qjs7Ozs7O0lBSXZCLDBDQUF5Qjs7Ozs7O0lBSXpCLGtEQUFtQzs7Ozs7SUFTdkIsb0NBQXdCOzs7OztJQUFFLHNDQUE2Qjs7Ozs7SUFBRSw2Q0FBaUQ7Ozs7OztBQWlZMUgsMkJBR0M7OztJQUZHLDRCQUFvQjs7SUFDcEIsNkJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ29uZmlnIHtcclxuICAgIGJhc2VfdXJsOiBzdHJpbmc7XHJcbiAgICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPYXV0aDIgY2xpZW50IGRldGFpbHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDbGllbnREZXRhaWxzIHtcclxuICAgIGNsaWVudFNlY3JldDogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ6IFN0cmluZztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBIdHRwIHJlcXVlc3QgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRob3JpemF0aW9uIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdG9rZW46IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogT2F1dGggcmVmcmVzaCB0b2tlblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hUb2tlbjogU3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCYXNlIHVybFxyXG4gICAgICovXHJcbiAgICBiYXNlX3VybDogc3RyaW5nID0gXCIvXCI7XHJcbiAgICAvKipcclxuICAgICAqIFRva2VuIGV4cGlyeSB0b2tlblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4cGlyeURhdGU6IERhdGU7XHJcbiAgICAvKipcclxuICAgICAqIE9hdXRoIHRva2VuIGVuZHBvaW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2F1dGhUb2tlbkVuZHBvaW50OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaHR0cCBodHRwIGNsaWVudCBzZXJ2aWNlXHJcbiAgICAgKiBAcGFyYW0gY29uZmlnIGJhc2UgdXJsLCBhY2Nlc3MgdG9rZW4gYW5kIHJlcXVlc3QgaGVhZGVyc1xyXG4gICAgICogQHBhcmFtIGNsaWVudERldGFpbHMgT2F1dGgyIGNsaWVudCBkZXRhaWxzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IFN0ZXdhcmRDb25maWcsIEBPcHRpb25hbCgpIHByaXZhdGUgY2xpZW50RGV0YWlscz86IENsaWVudERldGFpbHMpIHtcclxuICAgICAgICB0aGlzLmJhc2VfdXJsID0gY29uZmlnLmJhc2VfdXJsO1xyXG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcuYWNjZXNzX3Rva2VuKSB7Ly9hcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBcIkJlYXJlciBcIiArIGNvbmZpZy5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBVc2VkIHRvIHVwZGF0ZSBhdXRob3JpemF0aW9uIHRva2VuLiBDdXJyZW50bHkgc3VwcG9ydHMgYmVhcmVyIHRva2VuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHNldFRva2VuKHRva2VuOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjZXNzX3Rva2VuKSB7Ly91cGRhdGUgdG9rZW4gaGVhZGVyXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pO1xyXG4gICAgICAgIH0gZWxzZSB7Ly9hcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBcIkJlYXJlciBcIiArIHRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgYSB2YWxpZCBvYmplY3RcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHBvc3QoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgdGhpcy5vYXV0aENvbnRleHQoKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHB1dChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBhZGRIZWFkZXJzPzogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBodHRwIGRlbGV0ZSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHRoaXMub2F1dGhDb250ZXh0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdkZWxldGUnLCB0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCB7IGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBnZXQgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgcmVxdWVzdCBwYXJhbXNcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPiwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgdGhpcy5vYXV0aENvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2ggYSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICBnZXRGaWxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpICsgJz9hY2Nlc3NfdG9rZW49JyArIHRoaXMudG9rZW4sIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogaWZcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwb3N0Rm9ybURhdGEoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgaGVhZGVycz86IEh0dHBIZWFkZXJzKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnMuZ2V0KFwiQXV0aG9yaXphdGlvblwiKSAmJiAoIWhlYWRlcnMpKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghaGVhZGVycykge1xyXG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZSBodHRwIGZvcm0gZGF0YSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGh0dHAgcHV0IGZvcm0gZGF0YSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSB2YWxpZCBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHV0Rm9ybURhdGFNdWx0aVBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgdGhpcy5vYXV0aENvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IG1hcCB0byBIdHRwUGFyYW1zXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xyXG4gICAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlV3JhcHBlcigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZW5kZXJNb3JlKGlkOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgZGF0YXRhYmxlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYSB2YWxpZCBtYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgaWYgYSBzdHJpbmcgaXMgYSB2YWxpZCBVUkxcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzVVJMKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IFVSTCh1cmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChfKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUgdXJsIHBhcmFtZXRlciBpcyBhbiBlbmRwb2ludCBpdCBhcHBlbmRzIHRvIHRoZSBiYXNlIHVybFxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHNlZSBiYXNlX3VybFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VydmljZVVSTCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzVVJMKHVybCkpID8gdXJsIDogdGhpcy5iYXNlX3VybCArIHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiBVc2VkIHRvIGZpbmQga2V5IHZhbHVlIGJhc2VkIG9uIHRoZSBrZXkgc2VxdWVuY2UgcHJvdmlkZWRcclxuICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGFuIG9iamVjdFxyXG4gICAqIEBwYXJhbSBrZXlzIGkuZS4gdXNlci5nZW5kZXIudHlwZS50eXBlXHJcbiAgICovXHJcbiAgICBwdWJsaWMgZ2V0T2JqZWN0VmFsdWUoZGF0YTogYW55LCBrZXlzOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT09IDEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhW2tleXNba2V5cy5sZW5ndGggLSAxXV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgoa2V5ID09PSBrZXlzWzBdKSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGFba2V5XSwga2V5cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBrZXlzW2tleXMubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gYXBwZW5kIGhlYWRlcnMgdGhlIGN1cnJlbnQgaHR0cEhlYWRlcnNcclxuICAgICAqIEByZXR1cm5zIG1lcmdlZCBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhcHBlbmRIZWFkZXJzKGVudHJpZXM6IE1hcDxTdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IEh0dHBIZWFkZXJzIHtcclxuICAgICAgICBsZXQgY3VzdG9tSGVhZGVyczogSHR0cEhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XHJcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKCh2YWw6IHN0cmluZyB8IHN0cmluZ1tdLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjdXN0b21IZWFkZXJzID0gY3VzdG9tSGVhZGVycy5hcHBlbmQoa2V5LCB2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjdXN0b21IZWFkZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBvYXV0aCBhdXRoZW50aWNhdGlvbiB3aXRoIHBhc3N3b3JkIGdyYW50XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB1c2VybmFtZSB1c2VyJ3MgdXNlcm5hbWVcclxuICAgICAqIEBwYXJhbSBwYXNzd29yZCB1c2VyJ3MgcGFzc3dvcmRcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdXRoZW50aWNhdGUoZW5kcG9pbnQ6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNsaWVudERldGFpbHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwib2F1dGggMiBhdXRoZW50aWNhdGlvbiBub3Qgc3VwcG9ydCBlbnN1cmUgeW91IGhhdmUgaW5qZWN0ZWQgY2xpZW50IGRldGFpbHMoY2xpZW50IHNlY3JldCBhbmQgY2xpZW50IGlkKVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZm9ybUhlYWRlcnMgPSBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzXHJcbiAgICAgICAgZm9ybUhlYWRlcnMgPSBmb3JtSGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIHRoaXMuZ2V0SHR0cEJhc2ljVG9rZW4oKSk7XHJcbiAgICAgICAgZm9ybUhlYWRlcnMgPSBmb3JtSGVhZGVycy5kZWxldGUoXCJDb250ZW50LVR5cGVcIik7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwidXNlcm5hbWVcIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcInBhc3N3b3JkXCIsIHBhc3N3b3JkKTtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJncmFudF90eXBlXCIsIFwicGFzc3dvcmRcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIGZvcm1EYXRhLCB7IGhlYWRlcnM6IGZvcm1IZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKS5waXBlKHRhcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZVtcImFjY2Vzc190b2tlblwiXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZXNzaW9uQ29va2llKHJlc3BvbnNlW1wiYWNjZXNzX3Rva2VuXCJdLCByZXNwb25zZVtcInJlZnJlc2hfdG9rZW5cIl0sIHJlc3BvbnNlW1wiZXhwaXJlc19pblwiXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGF1dGhvcml6YXRpb24gdG9rZW4gY29va2llLiBBbHNvIHVwZGF0ZXMgQmVhcmVyIEF1dGhvcml6YXRpb24gdG9rZW5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRva2VuIG9hdXRoIHRva2VuXHJcbiAgICAgKiBAcGFyYW0gcmVmcmVzaFRva2VuIG9hdXRoIHJlZnJlc2ggdG9rZW5cclxuICAgICAqIEBwYXJhbSBleHBpcnkgdG9rZW4gZXhwaXJ5IGluIHNlY29uZHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZXNzaW9uQ29va2llKHRva2VuOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nLCBleHBpcnk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjb29raWUgPSBcIjtzYW1lc2l0ZT1zdHJpY3Q7cGF0aD0vXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gXCJ0b2tlbj1cIiArIHRva2VuICsgY29va2llICsgXCI7bWF4LWFnZT1cIiArIGV4cGlyeTtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBcInJlZnJlc2hUb2tlbj1cIiArIHJlZnJlc2hUb2tlbiArIGNvb2tpZSArIFwiO21heC1hZ2U9XCIgKyBleHBpcnkgKyAzMDA7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIGNsaWVudCBkZXRhaWxzIGV4aXN0cywgZXhwaXJlZCB0b2tlbiBpcyByZWZyZXNoZWQuXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBvYXV0aENvbnRleHQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNsaWVudERldGFpbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUFjY2Vzc1Rva2VuKCk7XHJcbiAgICAgICAgaWYgKCghdGhpcy50b2tlbikgJiYgdGhpcy5yZWZyZXNoVG9rZW4pIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZVtcImFjY2Vzc190b2tlblwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVmcmVzaCBhY2Nlc3MgdG9rZW5cIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBhY2Nlc3MgdG9rZW4gYW5kIHJlZnJlc2ggdG9rZW4gZnJvbSBzZXNzaW9uIGNvb2tpZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUFjY2Vzc1Rva2VuKCl7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlVwZGF0aW5nIHNlc3Npb24gY3JlZGVudGlhbHMuLi5cIilcclxuICAgICAgICBsZXQgaW5zdCA9IHRoaXM7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBpZihpdGVtLmluY2x1ZGVzKFwidG9rZW49XCIpKXtcclxuICAgICAgICAgICAgICAgIGluc3QudG9rZW4gPSBpdGVtLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICAgICAgICBpbnN0LmhlYWRlcnMgPSBpbnN0LmhlYWRlcnMuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIGluc3QudG9rZW4pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLmluY2x1ZGVzKFwicmVmcmVzaFRva2VuPVwiKSl7XHJcbiAgICAgICAgICAgICAgICBpbnN0LnJlZnJlc2hUb2tlbiA9IGl0ZW0uc3BsaXQoJz0nKVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIGFjY2VzcyB0b2tlblxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZnVuIGNhbGxiYWNrIGZ1bmN0aW9uIGFmdGVyIHRva2VuIHJlZnJlc2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICdcclxuICAgICAgICAgICAgICAgICsgdGhpcy5nZXRIdHRwQmFzaWNUb2tlbigpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmljZVVSTCh0aGlzLm9hdXRoVG9rZW5FbmRwb2ludCksIHtcclxuICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4sXHJcbiAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiXHJcbiAgICAgICAgfSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpKVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIHRhcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlW1wicmVmcmVzaF90b2tlblwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlc3Npb25Db29raWUocmVzcG9uc2VbXCJhY2Nlc3NfdG9rZW5cIl0sIHJlc3BvbnNlW1wicmVmcmVzaF90b2tlblwiXSwgcmVzcG9uc2VbXCJleHBpcmVzX2luXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBodHRwIGJhc2ljIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SHR0cEJhc2ljVG9rZW4oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYnRvYSh0aGlzLmNsaWVudERldGFpbHMuY2xpZW50SWQgKyBcIjpcIiArIHRoaXMuY2xpZW50RGV0YWlscy5jbGllbnRTZWNyZXQpXHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIEF1dGhvcml6YXRpb24gdG9rZW4gZGV0YWlsc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUb2tlbiB7XHJcbiAgICBhY2Nlc3NUb2tlbjogU3RyaW5nO1xyXG4gICAgcmVmcmVzaFRva2VuOiBTdHJpbmc7XHJcbn1cclxuIl19