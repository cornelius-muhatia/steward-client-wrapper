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
var StewardConfig = /** @class */ (function () {
    function StewardConfig() {
    }
    return StewardConfig;
}());
export { StewardConfig };
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
var /**
 * Oauth2 client details
 */
ClientDetails = /** @class */ (function () {
    function ClientDetails() {
    }
    return ClientDetails;
}());
/**
 * Oauth2 client details
 */
export { ClientDetails };
if (false) {
    /** @type {?} */
    ClientDetails.prototype.clientSecret;
    /** @type {?} */
    ClientDetails.prototype.clientId;
}
/**
 * @template T, E
 */
var StewardClientService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param http http client service
     * @param config base url, access token and request headers
     * @param clientDetails Oauth2 client details
     */
    function StewardClientService(http, config, clientDetails) {
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
     * @param token
     */
    /**
     *  Used to update authorization token. Currently supports bearer token
     *
     * @param {?} token
     * @return {?}
     */
    StewardClientService.prototype.setToken = /**
     *  Used to update authorization token. Currently supports bearer token
     *
     * @param {?} token
     * @return {?}
     */
    function (token) {
        if (this.config.access_token) { //update token header
            this.headers = this.headers.set("Authorization", "Bearer " + token);
        }
        else { //append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + token);
        }
    };
    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     * @param data a valid object
     * @param addHeaders additional headers to be appended to existing headers
     */
    /**
     * Used to handle http post requests
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data a valid object
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    StewardClientService.prototype.post = /**
     * Used to handle http post requests
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data a valid object
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    function (endpoint, data, addHeaders) {
        this.oauthContext();
        return this.http.post(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(catchError(this.handleError()));
    };
    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     * @param addHeaders additional headers to be appended to existing headers
     */
    /**
     * Used to handle http post requests
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    StewardClientService.prototype.put = /**
     * Used to handle http post requests
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    function (endpoint, data, addHeaders) {
        this.oauthContext();
        return this.http.put(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(catchError(this.handleError()));
    };
    /**
     * Handles http delete request
     * @param endpoint expects either an endpoint or url
     * @param data
     * @param addHeaders additional headers to be appended to existing headers
     */
    /**
     * Handles http delete request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    StewardClientService.prototype.delete = /**
     * Handles http delete request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    function (endpoint, data, addHeaders) {
        this.oauthContext();
        return this.http.request('delete', this.serviceURL(endpoint), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers, body: JSON.stringify(data) }).pipe(catchError(this.handleError()));
    };
    /**
     * Handles http get request
     * @param endpoint expects either an endpoint or url
     * @param data request params
     * @param addHeaders additional headers to be appended to existing headers
     */
    /**
     * Handles http get request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data request params
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    StewardClientService.prototype.get = /**
     * Handles http get request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data request params
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    function (endpoint, data, addHeaders) {
        this.oauthContext();
        /** @type {?} */
        var options = {
            headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(catchError(this.handleError()));
    };
    /**
     * Fetch a file
     * @param endpoint expects either an endpoint or url
     * @param data
     */
    /**
     * Fetch a file
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data
     * @return {?}
     */
    StewardClientService.prototype.getFile = /**
     * Fetch a file
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data
     * @return {?}
     */
    function (endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        var options = {
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint) + '?access_token=' + this.token, options).pipe(catchError(this.handleError()));
    };
    /**
     * if
     * @param endpoint expects either an endpoint or url
     * @param data
     * @param headers
     */
    /**
     * if
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    StewardClientService.prototype.postFormData = /**
     * if
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    function (endpoint, data, headers) {
        this.oauthContext();
        /** @type {?} */
        var formData = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            formData.append(key, data[key]);
        }));
        if (this.headers.get("Authorization") && (!headers)) {
            headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
        }
        else if (!headers) {
            headers = new HttpHeaders();
        }
        return this.http.post(this.serviceURL(endpoint), formData, { headers: headers }).pipe(catchError(this.handleError()));
    };
    /**
     * handle http form data request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid object
     */
    /**
     * handle http form data request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data expects a valid object
     * @return {?}
     */
    StewardClientService.prototype.postFormDataMultipart = /**
     * handle http form data request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data expects a valid object
     * @return {?}
     */
    function (endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        var formData = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (Array.isArray(data[key])) {
                data[key].forEach((/**
                 * @param {?} k2
                 * @return {?}
                 */
                function (k2) {
                    formData.append(key, k2);
                }));
            }
            else {
                formData.append(key, data[key]);
            }
        }));
        return this.http.post(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    };
    /**
     * Handles http put form data request
     * @param endpoint expects either an endpoint or url
     * @param data valid object
     */
    /**
     * Handles http put form data request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data valid object
     * @return {?}
     */
    StewardClientService.prototype.putFormDataMultiPart = /**
     * Handles http put form data request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data valid object
     * @return {?}
     */
    function (endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        var formData = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (Array.isArray(data[key])) {
                data[key].forEach((/**
                 * @param {?} k2
                 * @return {?}
                 */
                function (k2) {
                    formData.append(key, k2);
                }));
            }
            else {
                formData.append(key, data[key]);
            }
        }));
        return this.http.put(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    };
    /**
     * Convert map to HttpParams
     * @param data
     */
    /**
     * Convert map to HttpParams
     * @private
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.getHttpParams = /**
     * Convert map to HttpParams
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data == undefined) {
            return new HttpParams();
        }
        /** @type {?} */
        var httpParams = new HttpParams();
        data.forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        function (value, key) {
            httpParams = httpParams.append(key, value);
        }));
        return httpParams;
    };
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     */
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @private
     * @template ResponseWrapper
     * @return {?}
     */
    StewardClientService.prototype.handleError = /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @private
     * @template ResponseWrapper
     * @return {?}
     */
    function () {
        return (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            /** @type {?} */
            var res = new ResponseWrapper();
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
    };
    /**
     * Used to render action buttons
     */
    /**
     * Used to render action buttons
     * @param {?} id
     * @return {?}
     */
    StewardClientService.renderMore = /**
     * Used to render action buttons
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
    };
    /**
     * Handles datatable request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid map
     */
    /**
     * Handles datatable request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data expects a valid map
     * @return {?}
     */
    StewardClientService.prototype.intiateDataTable = /**
     * Handles datatable request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?=} data expects a valid map
     * @return {?}
     */
    function (endpoint, data) {
        this.oauthContext();
        /** @type {?} */
        var options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(catchError(this.handleError()));
    };
    /**
     * Used to validate if a string is a valid URL
     * @param url
     */
    /**
     * Used to validate if a string is a valid URL
     * @param {?} url
     * @return {?}
     */
    StewardClientService.prototype.isURL = /**
     * Used to validate if a string is a valid URL
     * @param {?} url
     * @return {?}
     */
    function (url) {
        try {
            new URL(url);
            return true;
        }
        catch (_) {
            return false;
        }
    };
    /**
     * If the url parameter is an endpoint it appends to the base url
     * @param url
     * @see base_url
     */
    /**
     * If the url parameter is an endpoint it appends to the base url
     * @see base_url
     * @param {?} url
     * @return {?}
     */
    StewardClientService.prototype.serviceURL = /**
     * If the url parameter is an endpoint it appends to the base url
     * @see base_url
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return (this.isURL(url)) ? url : this.base_url + url;
    };
    /**
   * Used to find key value based on the key sequence provided
   * @param data expects an object
   * @param keys i.e. user.gender.type.type
   */
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    StewardClientService.prototype.getObjectValue = /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    function (data, keys) {
        var _this = this;
        if ((!(data instanceof Object)) || (keys.length === 1)) {
            return data[keys[keys.length - 1]];
        }
        /** @type {?} */
        var value = null;
        Object.keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if ((key === keys[0]) && (data[key] instanceof Object)) {
                value = _this.getObjectValue(data[key], keys);
            }
            else if (key === keys[keys.length - 1]) {
                value = data[key];
            }
        }));
        return value;
    };
    /**
     * Used to append headers the current httpHeaders
     * @returns merged headers
     */
    /**
     * Used to append headers the current httpHeaders
     * @param {?} entries
     * @return {?} merged headers
     */
    StewardClientService.prototype.appendHeaders = /**
     * Used to append headers the current httpHeaders
     * @param {?} entries
     * @return {?} merged headers
     */
    function (entries) {
        /** @type {?} */
        var customHeaders = this.headers;
        entries.forEach((/**
         * @param {?} val
         * @param {?} key
         * @return {?}
         */
        function (val, key) {
            customHeaders = customHeaders.append(key, val);
        }));
        return customHeaders;
    };
    /**
     * Handles oauth authentication with password grant
     *
     * @param username user's username
     * @param password user's password
     * @param addHeaders additional headers to be appended to existing headers
     */
    /**
     * Handles oauth authentication with password grant
     *
     * @param {?} endpoint
     * @param {?} username user's username
     * @param {?} password user's password
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    StewardClientService.prototype.authenticate = /**
     * Handles oauth authentication with password grant
     *
     * @param {?} endpoint
     * @param {?} username user's username
     * @param {?} password user's password
     * @param {?=} addHeaders additional headers to be appended to existing headers
     * @return {?}
     */
    function (endpoint, username, password, addHeaders) {
        var _this = this;
        if (!this.clientDetails) {
            console.warn("oauth 2 authentication not support ensure you have injected client details(client secret and client id)");
        }
        /** @type {?} */
        var formHeaders = addHeaders ? this.appendHeaders(addHeaders) : this.headers;
        formHeaders = formHeaders.set('Authorization', 'Basic ' + this.getHttpBasicToken());
        formHeaders = formHeaders.delete("Content-Type");
        /** @type {?} */
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("grant_type", "password");
        return this.http.post(this.serviceURL(endpoint), formData, { headers: formHeaders }).pipe(catchError(this.handleError())).pipe(tap((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (response["access_token"]) {
                _this.setSessionCookie(response["access_token"], response["refresh_token"], response["expires_in"]);
            }
        })));
    };
    /**
     * Update authorization token cookie. Also updates Bearer Authorization token
     *
     * @param token oauth token
     * @param refreshToken oauth refresh token
     * @param expiry token expiry in seconds
     */
    /**
     * Update authorization token cookie. Also updates Bearer Authorization token
     *
     * @private
     * @param {?} token oauth token
     * @param {?} refreshToken oauth refresh token
     * @param {?} expiry token expiry in seconds
     * @return {?}
     */
    StewardClientService.prototype.setSessionCookie = /**
     * Update authorization token cookie. Also updates Bearer Authorization token
     *
     * @private
     * @param {?} token oauth token
     * @param {?} refreshToken oauth refresh token
     * @param {?} expiry token expiry in seconds
     * @return {?}
     */
    function (token, refreshToken, expiry) {
        /** @type {?} */
        var cookie = ";samesite=strict;path=/";
        document.cookie = "token=" + token + cookie + ";max-age=" + expiry;
        document.cookie = "refreshToken=" + refreshToken + cookie + ";max-age=" + expiry + 300;
        this.headers = this.headers.set("Authorization", "Bearer " + token);
    };
    /**
     * If client details exists, expired token is refreshed.
     *
     */
    /**
     * If client details exists, expired token is refreshed.
     *
     * @private
     * @return {?}
     */
    StewardClientService.prototype.oauthContext = /**
     * If client details exists, expired token is refreshed.
     *
     * @private
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.clientDetails) {
                            return [2 /*return*/];
                        }
                        this.updateAccessToken();
                        if (!((!this.token) && this.refreshToken)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshAccessToken().subscribe((/**
                             * @param {?} response
                             * @return {?}
                             */
                            function (response) {
                                if (!response["access_token"]) {
                                    console.error("Failed to refresh access token", response);
                                }
                            }))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update access token and refresh token from session cookie
     */
    /**
     * Update access token and refresh token from session cookie
     * @private
     * @return {?}
     */
    StewardClientService.prototype.updateAccessToken = /**
     * Update access token and refresh token from session cookie
     * @private
     * @return {?}
     */
    function () {
        console.debug("Updating session credentials...");
        /** @type {?} */
        var inst = this;
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
    };
    /**
     * Refreshes access token
     *
     * @param fun callback function after token refresh
     */
    /**
     * Refreshes access token
     *
     * @return {?}
     */
    StewardClientService.prototype.refreshAccessToken = /**
     * Refreshes access token
     *
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var headers = new HttpHeaders({
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
        function (response) {
            if (response["refresh_token"]) {
                _this.setSessionCookie(response["access_token"], response["refresh_token"], response["expires_in"]);
            }
        })));
    };
    /**
     * Get http basic token
     */
    /**
     * Get http basic token
     * @private
     * @return {?}
     */
    StewardClientService.prototype.getHttpBasicToken = /**
     * Get http basic token
     * @private
     * @return {?}
     */
    function () {
        return btoa(this.clientDetails.clientId + ":" + this.clientDetails.clientSecret);
    };
    StewardClientService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StewardClientService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: StewardConfig },
        { type: ClientDetails, decorators: [{ type: Optional }] }
    ]; };
    return StewardClientService;
}());
export { StewardClientService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQXFCLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlGLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBTyxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdkU7SUFBQTtJQUlBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEcsaUNBQWlCOztJQUNqQixxQ0FBc0I7O0lBQ3RCLGdDQUFzQjs7Ozs7QUFNMUI7Ozs7SUFBQTtJQUdBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7Ozs7O0lBRkcscUNBQXFCOztJQUNyQixpQ0FBaUI7Ozs7O0FBR3JCO0lBMkJJOzs7Ozs7T0FNRztJQUNILDhCQUFvQixJQUFnQixFQUFVLE1BQXFCLEVBQXNCLGFBQTZCO1FBQWxHLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQXNCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjs7OztRQWpCdEgsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQWtCbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxD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bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xyXG4gICAgYmFzZV91cmw6IHN0cmluZztcclxuICAgIGFjY2Vzc190b2tlbj86IHN0cmluZztcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcclxufVxyXG5cclxuLyoqXHJcbiAqIE9hdXRoMiBjbGllbnQgZGV0YWlsc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENsaWVudERldGFpbHMge1xyXG4gICAgY2xpZW50U2VjcmV0OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZDogU3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50U2VydmljZTxULCBFPiB7XHJcbiAgICAvKipcclxuICAgICAqIEh0dHAgcmVxdWVzdCBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGVhZGVyczogSHR0cEhlYWRlcnM7XHJcbiAgICAvKipcclxuICAgICAqIEF1dGhvcml6YXRpb24gdG9rZW5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0b2tlbjogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBPYXV0aCByZWZyZXNoIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFRva2VuOiBTdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIEJhc2UgdXJsXHJcbiAgICAgKi9cclxuICAgIGJhc2VfdXJsOiBzdHJpbmcgPSBcIi9cIjtcclxuICAgIC8qKlxyXG4gICAgICogVG9rZW4gZXhwaXJ5IHRva2VuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhwaXJ5RGF0ZTogRGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogT2F1dGggdG9rZW4gZW5kcG9pbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYXV0aFRva2VuRW5kcG9pbnQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBodHRwIGh0dHAgY2xpZW50IHNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBjb25maWcgYmFzZSB1cmwsIGFjY2VzcyB0b2tlbiBhbmQgcmVxdWVzdCBoZWFkZXJzXHJcbiAgICAgKiBAcGFyYW0gY2xpZW50RGV0YWlscyBPYXV0aDIgY2xpZW50IGRldGFpbHNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogU3Rld2FyZENvbmZpZywgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjbGllbnREZXRhaWxzPzogQ2xpZW50RGV0YWlscykge1xyXG4gICAgICAgIHRoaXMuYmFzZV91cmwgPSBjb25maWcuYmFzZV91cmw7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL2FwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIFwiQmVhcmVyIFwiICsgY29uZmlnLmFjY2Vzc190b2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFVzZWQgdG8gdXBkYXRlIGF1dGhvcml6YXRpb24gdG9rZW4uIEN1cnJlbnRseSBzdXBwb3J0cyBiZWFyZXIgdG9rZW5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdG9rZW5cclxuICAgICAqL1xyXG4gICAgc2V0VG9rZW4odG9rZW46IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL3VwZGF0ZSB0b2tlbiBoZWFkZXJcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbik7XHJcbiAgICAgICAgfSBlbHNlIHsvL2FwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIFwiQmVhcmVyIFwiICsgdG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBhIHZhbGlkIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBhZGRIZWFkZXJzPzogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHRoaXMub2F1dGhDb250ZXh0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHsgaGVhZGVyczogYWRkSGVhZGVycyA/IHRoaXMuYXBwZW5kSGVhZGVycyhhZGRIZWFkZXJzKSA6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGh0dHAgZGVsZXRlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBkZWxldGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgdGhpcy5vYXV0aENvbnRleHQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIHsgaGVhZGVyczogYWRkSGVhZGVycyA/IHRoaXMuYXBwZW5kSGVhZGVycyhhZGRIZWFkZXJzKSA6IHRoaXMuaGVhZGVycywgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBodHRwIGdldCByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSByZXF1ZXN0IHBhcmFtc1xyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgZ2V0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+LCBhZGRIZWFkZXJzPzogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaCBhIGZpbGVcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIGdldEZpbGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHRoaXMub2F1dGhDb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCkgKyAnP2FjY2Vzc190b2tlbj0nICsgdGhpcy50b2tlbiwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBpZlxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEBwYXJhbSBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHRoaXMub2F1dGhDb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVycy5nZXQoXCJBdXRob3JpemF0aW9uXCIpICYmICghaGVhZGVycykpIHtcclxuICAgICAgICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFoZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIGZvcm1EYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlIGh0dHAgZm9ybSBkYXRhIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYSB2YWxpZCBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcG9zdEZvcm1EYXRhTXVsdGlwYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHRoaXMub2F1dGhDb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBwdXQgZm9ybSBkYXRhIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIHZhbGlkIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdXRGb3JtRGF0YU11bHRpUGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICB0aGlzLm9hdXRoQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgbWFwIHRvIEh0dHBQYXJhbXNcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SHR0cFBhcmFtcyhkYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogSHR0cFBhcmFtcyB7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gY2F0Y2ggZXhjZXB0aW9uIHRocm93biBieSBodHRwIGNsaWVudCByZXR1cm5zIGludGVybmFsIHNlcnZlciBlcnJvclxyXG4gICAgICogaWYgc3RhdHVzIDUwMCBpcyBlbmNvdW50ZXJlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yPFJlc3BvbnNlV3JhcHBlcj4oKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBuZXcgUmVzcG9uc2VXcmFwcGVyKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcclxuICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PSA1MDApIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICByZXMubWVzc2FnZSA9ICdTb3JyeSBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICByZXMubWVzc2FnZSA9IGVycm9yLmVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICByZXMuZGF0YSA9IGVycm9yLmVycm9yLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlcyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byByZW5kZXIgYWN0aW9uIGJ1dHRvbnNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlbmRlck1vcmUoaWQ6IGFueSkge1xyXG4gICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cXCdhY3Rpb25zLWJ1dHRvbnMgY2VudGVyXFwnIGlkPVxcJycgKyBpZCArICdcXCc+PGkgY2xhc3M9XFwnZmEgZmEtY2hlY2tcXCcgdGl0bGU9XFwnQXBwcm92ZVxcJz48L2k+IDxpIGNsYXNzPVxcJ2ZhIGZhLWJhblxcJyB0aXRsZT1cXCdEZWNsaW5lXFwnPjwvaT48L2Rpdj4nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBkYXRhdGFibGUgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhIHZhbGlkIG1hcFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW50aWF0ZURhdGFUYWJsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMub2F1dGhDb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBpZiBhIHN0cmluZyBpcyBhIHZhbGlkIFVSTFxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNVUkwodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgVVJMKHVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSB1cmwgcGFyYW1ldGVyIGlzIGFuIGVuZHBvaW50IGl0IGFwcGVuZHMgdG8gdGhlIGJhc2UgdXJsXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAc2VlIGJhc2VfdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJ2aWNlVVJMKHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaXNVUkwodXJsKSkgPyB1cmwgOiB0aGlzLmJhc2VfdXJsICsgdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxyXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XHJcbiAgICogQHBhcmFtIGtleXMgaS5lLiB1c2VyLmdlbmRlci50eXBlLnR5cGVcclxuICAgKi9cclxuICAgIHB1YmxpYyBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBpZiAoKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHx8IChrZXlzLmxlbmd0aCA9PT0gMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKChrZXkgPT09IGtleXNbMF0pICYmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YVtrZXldLCBrZXlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGtleXNba2V5cy5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBhcHBlbmQgaGVhZGVycyB0aGUgY3VycmVudCBodHRwSGVhZGVyc1xyXG4gICAgICogQHJldHVybnMgbWVyZ2VkIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwcGVuZEhlYWRlcnMoZW50cmllczogTWFwPFN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogSHR0cEhlYWRlcnMge1xyXG4gICAgICAgIGxldCBjdXN0b21IZWFkZXJzOiBIdHRwSGVhZGVycyA9IHRoaXMuaGVhZGVycztcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goKHZhbDogc3RyaW5nIHwgc3RyaW5nW10sIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGN1c3RvbUhlYWRlcnMgPSBjdXN0b21IZWFkZXJzLmFwcGVuZChrZXksIHZhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGN1c3RvbUhlYWRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIG9hdXRoIGF1dGhlbnRpY2F0aW9uIHdpdGggcGFzc3dvcmQgZ3JhbnRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIHVzZXIncyB1c2VybmFtZVxyXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIHVzZXIncyBwYXNzd29yZFxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF1dGhlbnRpY2F0ZShlbmRwb2ludDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBhZGRIZWFkZXJzPzogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xpZW50RGV0YWlscykge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJvYXV0aCAyIGF1dGhlbnRpY2F0aW9uIG5vdCBzdXBwb3J0IGVuc3VyZSB5b3UgaGF2ZSBpbmplY3RlZCBjbGllbnQgZGV0YWlscyhjbGllbnQgc2VjcmV0IGFuZCBjbGllbnQgaWQpXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmb3JtSGVhZGVycyA9IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnNcclxuICAgICAgICBmb3JtSGVhZGVycyA9IGZvcm1IZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgdGhpcy5nZXRIdHRwQmFzaWNUb2tlbigpKTtcclxuICAgICAgICBmb3JtSGVhZGVycyA9IGZvcm1IZWFkZXJzLmRlbGV0ZShcIkNvbnRlbnQtVHlwZVwiKTtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJ1c2VybmFtZVwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwicGFzc3dvcmRcIiwgcGFzc3dvcmQpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImdyYW50X3R5cGVcIiwgXCJwYXNzd29yZFwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogZm9ybUhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApLnBpcGUodGFwKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlW1wiYWNjZXNzX3Rva2VuXCJdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlc3Npb25Db29raWUocmVzcG9uc2VbXCJhY2Nlc3NfdG9rZW5cIl0sIHJlc3BvbnNlW1wicmVmcmVzaF90b2tlblwiXSwgcmVzcG9uc2VbXCJleHBpcmVzX2luXCJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYXV0aG9yaXphdGlvbiB0b2tlbiBjb29raWUuIEFsc28gdXBkYXRlcyBCZWFyZXIgQXV0aG9yaXphdGlvbiB0b2tlblxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdG9rZW4gb2F1dGggdG9rZW5cclxuICAgICAqIEBwYXJhbSByZWZyZXNoVG9rZW4gb2F1dGggcmVmcmVzaCB0b2tlblxyXG4gICAgICogQHBhcmFtIGV4cGlyeSB0b2tlbiBleHBpcnkgaW4gc2Vjb25kc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFNlc3Npb25Db29raWUodG9rZW46IHN0cmluZywgcmVmcmVzaFRva2VuOiBzdHJpbmcsIGV4cGlyeTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNvb2tpZSA9IFwiO3NhbWVzaXRlPXN0cmljdDtwYXRoPS9cIjtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBcInRva2VuPVwiICsgdG9rZW4gKyBjb29raWUgKyBcIjttYXgtYWdlPVwiICsgZXhwaXJ5O1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IFwicmVmcmVzaFRva2VuPVwiICsgcmVmcmVzaFRva2VuICsgY29va2llICsgXCI7bWF4LWFnZT1cIiArIGV4cGlyeSArIDMwMDtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgY2xpZW50IGRldGFpbHMgZXhpc3RzLCBleHBpcmVkIHRva2VuIGlzIHJlZnJlc2hlZC5cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIG9hdXRoQ29udGV4dCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xpZW50RGV0YWlscykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQWNjZXNzVG9rZW4oKTtcclxuICAgICAgICBpZiAoKCF0aGlzLnRva2VuKSAmJiB0aGlzLnJlZnJlc2hUb2tlbikge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbigpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlW1wiYWNjZXNzX3Rva2VuXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWZyZXNoIGFjY2VzcyB0b2tlblwiLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGFjY2VzcyB0b2tlbiBhbmQgcmVmcmVzaCB0b2tlbiBmcm9tIHNlc3Npb24gY29va2llXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQWNjZXNzVG9rZW4oKXtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVXBkYXRpbmcgc2Vzc2lvbiBjcmVkZW50aWFscy4uLlwiKVxyXG4gICAgICAgIGxldCBpbnN0ID0gdGhpcztcclxuICAgICAgICBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uaW5jbHVkZXMoXCJ0b2tlbj1cIikpe1xyXG4gICAgICAgICAgICAgICAgaW5zdC50b2tlbiA9IGl0ZW0uc3BsaXQoJz0nKVsxXTtcclxuICAgICAgICAgICAgICAgIGluc3QuaGVhZGVycyA9IGluc3QuaGVhZGVycy5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgaW5zdC50b2tlbilcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGl0ZW0uaW5jbHVkZXMoXCJyZWZyZXNoVG9rZW49XCIpKXtcclxuICAgICAgICAgICAgICAgIGluc3QucmVmcmVzaFRva2VuID0gaXRlbS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgYWNjZXNzIHRva2VuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBmdW4gY2FsbGJhY2sgZnVuY3Rpb24gYWZ0ZXIgdG9rZW4gcmVmcmVzaFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVmcmVzaEFjY2Vzc1Rva2VuKCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmFzaWMgJ1xyXG4gICAgICAgICAgICAgICAgKyB0aGlzLmdldEh0dHBCYXNpY1Rva2VuKClcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKHRoaXMub2F1dGhUb2tlbkVuZHBvaW50KSwge1xyXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbixcclxuICAgICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCJcclxuICAgICAgICB9LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSkpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgdGFwKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VbXCJyZWZyZXNoX3Rva2VuXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Vzc2lvbkNvb2tpZShyZXNwb25zZVtcImFjY2Vzc190b2tlblwiXSwgcmVzcG9uc2VbXCJyZWZyZXNoX3Rva2VuXCJdLCByZXNwb25zZVtcImV4cGlyZXNfaW5cIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGh0dHAgYmFzaWMgdG9rZW5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRIdHRwQmFzaWNUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBidG9hKHRoaXMuY2xpZW50RGV0YWlscy5jbGllbnRJZCArIFwiOlwiICsgdGhpcy5jbGllbnREZXRhaWxzLmNsaWVudFNlY3JldClcclxuICAgIH1cclxufVxyXG4vKipcclxuICogQXV0aG9yaXphdGlvbiB0b2tlbiBkZXRhaWxzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuIHtcclxuICAgIGFjY2Vzc1Rva2VuOiBTdHJpbmc7XHJcbiAgICByZWZyZXNoVG9rZW46IFN0cmluZztcclxufVxyXG4iXX0=