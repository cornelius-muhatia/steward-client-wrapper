import { __awaiter } from 'tslib';
import { Injectable, Optional, Component, EventEmitter, Output, ViewChild, Input, NgModule } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DatePipe, CommonModule } from '@angular/common';
import { Validators, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter, MatSort, MatInputModule, MatTableModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatButtonModule, MatSortModule, MatMenuModule, MatProgressSpinnerModule, MatAutocompleteModule } from '@angular/material';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/entities/wrappers/response-wrapper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Wraps server response
 * @template T
 */
class ResponseWrapper {
}
if (false) {
    /**
     * Http status code e.g. 200
     * @type {?}
     */
    ResponseWrapper.prototype.status;
    /**
     * Server message
     * @type {?}
     */
    ResponseWrapper.prototype.message;
    /**
     * Actual response data
     * @type {?}
     */
    ResponseWrapper.prototype.data;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/steward-client.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StewardConfig {
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
class ClientDetails {
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
class StewardClientService {
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
        return __awaiter(this, void 0, void 0, function* () {
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
function Token() { }
if (false) {
    /** @type {?} */
    Token.prototype.accessToken;
    /** @type {?} */
    Token.prototype.refreshToken;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/steward-client.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StewardClientComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
StewardClientComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-steward-client',
                template: `
    <p>
      steward-client works!
    </p>
  `
            }] }
];
/** @nocollapse */
StewardClientComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/entities/wrappers/page.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
class Page {
    constructor() {
        /**
         * Number of items per page same as limit
         */
        this.size = 20;
        /**
         * Total items available on the server
         */
        this.totalElements = 0;
        /**
         * Total number of pages present
         */
        this.totalPages = 0;
        /**
         * Checks if is the first page
         */
        this.first = true;
        /**
         * Checks if it is the last page
         */
        this.last = false;
        /**
         * The actual page content
         */
        this.content = [];
        /**
         * Used to map sort parameters
         */
        this.sorted = new Sort();
        /**
         * Current page number
         */
        this.number = 0;
    }
}
if (false) {
    /**
     * Number of items per page same as limit
     * @type {?}
     */
    Page.prototype.size;
    /**
     * Total items available on the server
     * @type {?}
     */
    Page.prototype.totalElements;
    /**
     * Total number of pages present
     * @type {?}
     */
    Page.prototype.totalPages;
    /**
     * Checks if is the first page
     * @type {?}
     */
    Page.prototype.first;
    /**
     * Checks if it is the last page
     * @type {?}
     */
    Page.prototype.last;
    /**
     * The actual page content
     * @type {?}
     */
    Page.prototype.content;
    /**
     * Used to map sort parameters
     * @type {?}
     */
    Page.prototype.sorted;
    /**
     * Current page number
     * @type {?}
     */
    Page.prototype.number;
}
/**
 * used to map sort request
 */
class Sort {
    constructor() {
        this.sorted = false;
        this.unsorted = true;
    }
}
if (false) {
    /** @type {?} */
    Sort.prototype.sorted;
    /** @type {?} */
    Sort.prototype.unsorted;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/entities/tgr-dynamic-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
class TgrDynamicControl {
    /**
     * @param {?} label
     * @param {?} name
     * @param {?} controlType
     * @param {?=} icon
     * @param {?=} isRequired
     * @param {?=} placeholder
     */
    constructor(label, name, controlType, icon = "fa fa-file-text-o", isRequired = false, placeholder = null) {
        /**
         * Control placeholder
         */
        this.placeholder = "";
        this.label = label;
        this.name = name;
        this.controlType = controlType;
        this.icon = icon;
        this.isRequired = isRequired;
        this.placeholder = placeholder ? placeholder : label;
    }
}
if (false) {
    /**
     * Control label
     * @type {?}
     */
    TgrDynamicControl.prototype.label;
    /**
     * Icon to be appended before the control (supports class defined icons)
     * @type {?}
     */
    TgrDynamicControl.prototype.icon;
    /**
     * Name of the control (provide variable valid names ie. no spaces prefarably api corresponding names e.g. userName)
     * @type {?}
     */
    TgrDynamicControl.prototype.name;
    /**
     * The actual control (TgrInput, TgrTextArea & TgrSelect)
     * @type {?}
     */
    TgrDynamicControl.prototype.controlType;
    /**
     * Checks if the field is required
     * @type {?}
     */
    TgrDynamicControl.prototype.isRequired;
    /**
     * Control placeholder
     * @type {?}
     */
    TgrDynamicControl.prototype.placeholder;
}
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
class TgrInput {
    /**
     * @param {?=} type
     */
    constructor(type = "text") {
        this.type = type;
        this.minLength = this.min = 0;
        this.maxLength = 4000;
        this.max = 1000000000;
    }
}
if (false) {
    /**
     * Type of input e.g. text, number, date
     * @type {?}
     */
    TgrInput.prototype.type;
    /**
     * Used to validate length of the input
     * @type {?}
     */
    TgrInput.prototype.maxLength;
    /**
     * Used to validate minimum input length
     * @type {?}
     */
    TgrInput.prototype.minLength;
    /**
     * Used to validate number inputs
     * @type {?}
     */
    TgrInput.prototype.min;
    /**
     * Used to validate number inputs
     * @type {?}
     */
    TgrInput.prototype.max;
}
/**
 * Represents html textarea input
 */
class TgrTextarea {
    /**
     * @param {?=} cols
     * @param {?=} rows
     */
    constructor(cols = 5, rows = 1) {
        this.cols = cols;
        this.rows = rows;
        this.maxLength = 4000;
        this.minLength = 0;
    }
}
if (false) {
    /**
     * Number textarea columns
     * @type {?}
     */
    TgrTextarea.prototype.cols;
    /**
     * Number of textarea rows
     * @type {?}
     */
    TgrTextarea.prototype.rows;
    /**
     * Validate maximum input length
     * @type {?}
     */
    TgrTextarea.prototype.maxLength;
    /**
     * Validate minimum input length
     * @type {?}
     */
    TgrTextarea.prototype.minLength;
}
/**
 * Represents html select control
 */
class TgrSelect {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
    }
}
if (false) {
    /**
     * Select options
     * @type {?}
     */
    TgrSelect.prototype.options;
}
class TgrSelectOption {
    /**
     * @param {?} value
     * @param {?=} text
     */
    constructor(value, text = null) {
        this.value = value;
        this.text = text ? text : value;
    }
}
if (false) {
    /**
     * Option value
     * @type {?}
     */
    TgrSelectOption.prototype.value;
    /**
     * Option text/label
     * @type {?}
     */
    TgrSelectOption.prototype.text;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/tgr-material-table/tgr-material-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Format angular date to dd-mm-yyyy
 */
class AppDateAdapter extends NativeDateAdapter {
    /**
     * Parse date to dd-mm-yyyy
     * @param {?} date  date input
     * @param {?} displayFormat expects to be input string
     * @return {?}
     */
    format(date, displayFormat) {
        if (displayFormat === 'input') {
            /** @type {?} */
            var day = date.getDate();
            /** @type {?} */
            var month = date.getMonth() + 1;
            /** @type {?} */
            const year = date.getFullYear();
            /** @type {?} */
            let dayString;
            /** @type {?} */
            let monthString;
            if (day < 10) {
                dayString = '0' + day;
            }
            else {
                dayString = '' + day;
            }
            if (month < 10) {
                monthString = '0' + month;
            }
            else {
                monthString = '' + month;
            }
            return `${year}-${monthString}-${dayString}`;
        }
        return date.toDateString();
    }
}
/**
 * Material date formats
 * @type {?}
 */
const APP_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
class TgrMaterialTableComponent {
    /**
     * @param {?} sterwardService
     */
    constructor(sterwardService) {
        this.sterwardService = sterwardService;
        this.displayedColumns = [];
        this.selection = new SelectionModel(true, []);
        this.rowSelection = new EventEmitter();
        this.columns = [];
        this.enableCheckbox = true;
        this.actionsEvent = new EventEmitter();
        this.filterComponents = [];
        this.showDefaultFilters = true;
        this.showNumberColumn = false;
        this.selected = [];
        // @ViewChild(DatatableComponent) table: DatatableComponent;
        this.filter = {};
        /**
         * Checks if server request has been processed
         */
        this.isLoadingResults = false;
        this.page = new Page();
        this.page.content = [];
        this.datePipe = new DatePipe('en-US');
    }
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     * @return {?}
     */
    ngOnInit() {
        //intializing table columns
        if (this.enableCheckbox) {
            this.displayedColumns.push('checkbox');
        }
        if (this.showNumberColumn) {
            this.displayedColumns.push('no');
        }
        this.columns.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            this.displayedColumns.push(c.fieldName);
        }));
        if (this.moreActions) {
            this.displayedColumns.push('actions');
        }
        else {
            console.debug('moreActions not injected skipping rendering \'More Actions\' column');
        }
        /** @type {?} */
        let group = {};
        this.filterComponents.forEach((/**
         * @param {?} comp
         * @return {?}
         */
        comp => {
            /** @type {?} */
            let validators = [];
            if (comp.isRequired) {
                validators.push(Validators.required);
            }
            if (comp.controlType instanceof TgrInput || comp.controlType instanceof TgrTextarea) {
                validators.push(Validators.minLength(comp.controlType.minLength));
                validators.push(Validators.maxLength(comp.controlType.maxLength));
            }
            if (comp.controlType instanceof TgrInput) {
                validators.push(Validators.max(comp.controlType.max));
                validators.push(Validators.min(comp.controlType.min));
            }
            group[comp.name] = new FormControl('', validators);
        }));
        //add default controls
        group['from'] = new FormControl('', Validators.maxLength(100));
        group['to'] = new FormControl('', Validators.maxLength(100));
        group['needle'] = new FormControl('', Validators.maxLength(200));
        this.filterForm = new FormGroup(group);
        this.loadPage({ offset: 0, limit: this.page.size }, null);
    }
    /**
     * After view intialization fire selection event
     * @return {?}
     */
    ngAfterViewInit() {
        this.rowSelection.emit(this.selection);
    }
    /**
     * Whether the number of selected elements matches the total number of rows.
     * @return {?}
     */
    isAllSelected() {
        /** @type {?} */
        const numSelected = this.selection.selected.length;
        /** @type {?} */
        const numRows = this.page.content.length;
        return numSelected == numRows;
    }
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     * @return {?}
     */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.page.content.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => this.selection.select(row)));
    }
    /**
     * Used to emit click event of the actions
     * @param {?} event Actions data
     * @return {?}
     */
    onActionClick(event) {
        this.actionsEvent.emit(event);
    }
    /**
     * Process server request of datable
     *
     * @param {?} pageInfo Page variables
     * @param {?} filters Filter variables
     * @return {?}
     */
    loadPage(pageInfo, filters) {
        if (!this.endpoint) {
            return;
        }
        this.isLoadingResults = true;
        /** @type {?} */
        let request;
        if (filters) {
            request = filters;
        }
        else {
            request = new Map();
        }
        if (this.params) {
            this.params.forEach((/**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */
            (value, key) => {
                if (key != null && key !== undefined) { // ignore null values
                    request.set(key, value);
                }
            }));
        }
        request.set('page', pageInfo.offset);
        request.set('size', pageInfo.limit);
        this.sterwardService.get(this.endpoint, request, this.headers).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            if (response.status === 200) {
                if (this.showNumberColumn) {
                    /** @type {?} */
                    let no = 1 + (response.data.number * response.data.size);
                    response.data.content.forEach((/**
                     * @param {?} val
                     * @return {?}
                     */
                    (val) => {
                        val.no = no++;
                    }));
                }
                this.page = response.data;
            }
            this.isLoadingResults = false;
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            console.debug('Server request has failed');
            this.isLoadingResults = false;
        }));
    }
    /**
     * Used tolisten to pagination events/actions
     * @param {?} page page variables
     * @return {?}
     */
    pageEvent(page) {
        this.loadPage({ limit: page.pageSize, offset: page.pageIndex }, this.getFilters());
    }
    /**
     * Used to processing table sorting
     * @param {?} event Sort variables
     * @return {?}
     */
    processSorting(event) {
        this.sortParams = event;
        this.loadPage({ limit: this.page.size, offset: 0 }, this.getFilters());
    }
    /**
     * Used to get filter entries from the filter form. Also adds sort parameters to request
     * @private
     * @return {?}
     */
    getFilters() {
        /** @type {?} */
        const f = new Map();
        Object.keys(this.filterForm.value).forEach((/**
         * @param {?} val
         * @param {?} key
         * @return {?}
         */
        (val, key) => {
            // console.debug("Key is " + key + " and value " + val);
            if (this.filterForm.value[val]) {
                if (val === 'from' || val === 'to') {
                    f.set(val, this.datePipe.transform(this.filterForm.value[val], 'yyyy-MM-dd'));
                }
                else {
                    f.set(val, this.filterForm.value[val]);
                }
            }
        }));
        // add sorting parameters
        if (this.sortParams) {
            f.set('sort', this.sortParams.active + ',' + this.sortParams.direction);
        }
        return f;
    }
    /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     *
     * @deprecated
     * @return {?}
     */
    processFilter() {
        this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
    }
    /**
     * Used to check if additional control is input
     *
     * @param {?} control additional control
     * @return {?}
     */
    isInput(control) {
        return control instanceof TgrInput;
    }
    /**
     * Used to check if miliki control is select
     *
     * @param {?} control Select control
     * @return {?}
     */
    isSelect(control) {
        return control instanceof TgrSelect;
    }
    /**
     * Used to check if miliki control is textarea
     * @param {?} control
     * @return {?}
     */
    isTextArea(control) {
        return control instanceof TgrTextarea;
    }
    /**
     * Used to format date to string yyyy-MM-dd
     * @param {?} date Date variable
     * @return {?}
     */
    getFormattedDate(date) {
        /** @type {?} */
        const year = date.getFullYear();
        /** @type {?} */
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        /** @type {?} */
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    }
    /**
     * @param {?} data
     * @param {?} column
     * @return {?}
     */
    getFieldValue(data, column) {
        if (column.callback) {
            return column.callback(data);
        }
        /** @type {?} */
        const k = column.fieldName.split('.');
        /** @type {?} */
        const value = this.sterwardService.getObjectValue(data, k);
        return column.isDateColumn ? this.datePipe.transform(value, 'medium') : value;
    }
    /**
     * Refresh data table values
     * @return {?}
     */
    refreshTable() {
        console.debug('Refreshed data tables');
        this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
    }
}
TgrMaterialTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'tgr-material-table',
                template: "<div class=\"row\"  *ngIf=\"showDefaultFilters || filterComponents.length > 0\">\n  <div class=\"col-md-12\">\n    <div class=\"card card-outline-default mat-elevation-z4\">\n      <div class=\"card-body\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"mat-table-filter\">\n                <button title=\"Refresh\" (click) = \"refreshTable()\" mat-icon-button color=\"basic\" type=\"reset\"><mat-icon>refresh</mat-icon></button>\n            </div>\n          </div>\n        </div>\n        <form (ngSubmit)=\"processFilter()\" [formGroup]=\"filterForm\">\n          <div class=\"row\">\n            <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n              <!-- Intialize form select control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isSelect(control.controlType)\">\n                <mat-select [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\">\n                  <mat-option *ngFor=\"let o of control.controlType.options\" [value]=\"o.value\">\n                    {{o.text}}\n                  </mat-option>\n                </mat-select>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form textarea control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isTextArea(control.controlType)\">\n                <textarea matInput [formControlName]=\"control.name\" [placeholder]=\"control.label\" [cols]=\"control.controlType.cols\"\n                  [rows]=\"control.controlType.rows\"></textarea>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form input control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isInput(control.controlType)\">\n                <!-- <mat-icon matPrefix class=\"material-icons icon-margin-right\">perm_identity</mat-icon> -->\n                <input matInput [placeholder]=\"control.label\" [type]=\"control.controlType.type\" [formControlName]=\"control.name\" />\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than\n                  {{control.controlType.min}}</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than\n                  {{control.controlType.max}}</mat-error>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <!-- <mat-icon matPrefix class=\"material-icons col-md-3\">date_range</mat-icon> -->\n              <mat-form-field class=\"col-md-12\">\n                <input matInput placeholder=\"From\" type=\"date\" [matDatepicker]=\"picker\" formControlName=\"from\" />\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <!-- <mat-icon>home</mat-icon> -->\n                <input matInput placeholder=\"To\" type=\"date\" [matDatepicker]=\"toPicker\" formControlName=\"to\" />\n                <mat-datepicker-toggle matSuffix [for]=\"toPicker\"></mat-datepicker-toggle>\n                <mat-datepicker #toPicker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <input matInput maxlength=\"100\" placeholder=\"Search\" type=\"text\" formControlName=\"needle\" />\n              </mat-form-field>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n            </span>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"pull-right mat-table-filter\">\n                <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"filterForm.invalid\">Filter</button>\n                <button mat-raised-button color=\"basic\" type=\"reset\">Reset</button>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <div class=\"mat-table-loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n    <table mat-table [dataSource]=\"page.content\" class=\"mat-elevation-z8\" style=\"width: 100%\" matSort (matSortChange)=\"processSorting($event)\">\n\n      <!--- Note that these columns can be defined in any order.\n          The actual rendered columns are set as a property on the row definition\" -->\n\n      <!-- Position Column -->\n      <ng-container matColumnDef=\"checkbox\" *ngIf=\"enableCheckbox\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\" [checked]=\"selection.hasValue() && isAllSelected()\"\n            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n          </mat-checkbox>\n        </th>\n        <td mat-cell *matCellDef=\"let row\">\n          <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\" [checked]=\"selection.isSelected(row)\">\n          </mat-checkbox>\n        </td>\n      </ng-container>\n\n      <!-- Number Column -->\n      <ng-container matColumnDef=\"no\" *ngIf=\"showNumberColumn\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>\n        <td mat-cell *matCellDef=\"let element\" > \n           <div>{{element['no']}}</div>\n          </td>\n      </ng-container>\n\n      <!-- Fields Columns -->\n      <ng-container [matColumnDef]=\"c.fieldName\" *ngFor=\"let c of columns\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header [class.hide_on_xs]=\"c.hideOnXs\"> {{c.columnName}} </th>\n        <td mat-cell *matCellDef=\"let element\" [class.hide_on_xs]=\"c.hideOnXs\"> \n           <div [innerHtml] = \"getFieldValue(element, c)\"></div></td>\n      </ng-container>\n\n      <!-- Other Column -->\n      <ng-container matColumnDef=\"actions\" *ngIf=\"moreActions\">\n        <th mat-header-cell *matHeaderCellDef> {{moreActions.name}} </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n            <mat-icon>list</mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item *ngFor=\"let action of moreActions.actions\" (click)=\"onActionClick({data: element, id: element[moreActions.idFieldName], actionName: action.actionName})\">{{action.actionName}}</button>\n          </mat-menu>\n        </td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n    <mat-paginator (page)=\"pageEvent($event)\" showFirstLastButtons [length]=\"page.totalElements\" [pageSize]=\"20\" [pageSizeOptions]=\"[1, 5, 10, 20, 50, 100, 200]\">\n    </mat-paginator>\n  </div>\n</div>",
                providers: [
                    { provide: DateAdapter, useClass: AppDateAdapter },
                    {
                        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
                    }
                ],
                styles: [".mat-table-filter button{margin-right:8px;float:right}@media (max-width:576px){.hide_on_xs{display:none}}.mat-table-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.mat-cell{padding-right:8px}"]
            }] }
];
/** @nocollapse */
TgrMaterialTableComponent.ctorParameters = () => [
    { type: StewardClientService }
];
TgrMaterialTableComponent.propDecorators = {
    selection: [{ type: Output }],
    rowSelection: [{ type: Output }],
    sort: [{ type: ViewChild, args: [MatSort, { static: true },] }],
    columns: [{ type: Input }],
    enableCheckbox: [{ type: Input }],
    endpoint: [{ type: Input }],
    moreActions: [{ type: Input }],
    actionsEvent: [{ type: Output }],
    filterComponents: [{ type: Input }],
    params: [{ type: Input }],
    showDefaultFilters: [{ type: Input }],
    showNumberColumn: [{ type: Input }],
    headers: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TgrMaterialTableComponent.prototype.displayedColumns;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.selection;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.rowSelection;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.sort;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.columns;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.enableCheckbox;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.endpoint;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.moreActions;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.actionsEvent;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.filterComponents;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.params;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.showDefaultFilters;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.showNumberColumn;
    /**
     * Additional headers to be appended on the request headers
     * @type {?}
     */
    TgrMaterialTableComponent.prototype.headers;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.page;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.selected;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.filter;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.filterForm;
    /**
     * @type {?}
     * @private
     */
    TgrMaterialTableComponent.prototype.sortParams;
    /**
     * Checks if server request has been processed
     * @type {?}
     */
    TgrMaterialTableComponent.prototype.isLoadingResults;
    /**
     * Date pipe
     * @type {?}
     * @private
     */
    TgrMaterialTableComponent.prototype.datePipe;
    /**
     * @type {?}
     * @private
     */
    TgrMaterialTableComponent.prototype.sterwardService;
}
/**
 * Used to define datatable columns with attributes (columnName, fieldName, width, sortable, canAutoResize,
 * draggable, resizable, isDateColumn)
 * @record
 */
function TgrMatTableColumn() { }
if (false) {
    /**
     * column title
     * @type {?}
     */
    TgrMatTableColumn.prototype.columnName;
    /**
     * Server side response field corresponding to the column i.e fullName may correspond to Name column
     * @type {?}
     */
    TgrMatTableColumn.prototype.fieldName;
    /**
     * Width of the column
     * @type {?|undefined}
     */
    TgrMatTableColumn.prototype.width;
    /**
     * Enable sorting in a column
     * @type {?|undefined}
     */
    TgrMatTableColumn.prototype.sortable;
    /**
     * Used to enable formating timestamp to string date
     * @type {?|undefined}
     */
    TgrMatTableColumn.prototype.isDateColumn;
    /**
     * Hide on small device less than 576px
     * @type {?|undefined}
     */
    TgrMatTableColumn.prototype.hideOnXs;
    /**
     * Callback function used for cell rendering.
     *  Note: Function results are not sanitised
     * @type {?|undefined}
     */
    TgrMatTableColumn.prototype.callback;
}
/**
 * Used to display more actions column and the end of the table
 */
class TgrMoreActions {
    /**
     * @param {?} actions Rows action data
     * @param {?=} id Id field name currently deprecated
     * @param {?=} name Actions column name
     * @param {?=} callback Rows callback function for data sanitization
     */
    constructor(actions, id, name, callback) {
        /**
         * Action Column name e.g. More Actions
         */
        this.name = 'Actions';
        /**
         * Field name id from the server response e.g userId
         * @deprecated
         */
        this.idFieldName = 'id';
        this.actions = actions;
        this.name = name;
        this.idFieldName = id;
        this.callback = callback;
    }
}
if (false) {
    /**
     * Action Column name e.g. More Actions
     * @type {?}
     */
    TgrMoreActions.prototype.name;
    /**
     * Field name id from the server response e.g userId
     * @deprecated
     * @type {?}
     */
    TgrMoreActions.prototype.idFieldName;
    /**
     * Actions e.g. Edit, Delete
     * @type {?}
     */
    TgrMoreActions.prototype.actions;
    /**
     * Callback function
     * @type {?}
     */
    TgrMoreActions.prototype.callback;
}
/**
 * @record
 */
function TgrMoreActionData() { }
if (false) {
    /**
     * Never mind this field it will be used by the library
     * @deprecated
     * @type {?|undefined}
     */
    TgrMoreActionData.prototype.id;
    /**
     * Action name e.g. Edit, Delete
     * @type {?}
     */
    TgrMoreActionData.prototype.actionName;
    /**
     *
     * @type {?|undefined}
     */
    TgrMoreActionData.prototype.data;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/steward-client.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StewardClientModule {
    /**
     * @param {?} config
     * @param {?=} clientDetails
     * @return {?}
     */
    static forRoot(config, clientDetails) {
        return {
            ngModule: StewardClientModule,
            providers: [{ provide: StewardConfig, useValue: config }, { provide: ClientDetails, useValue: clientDetails }]
        };
    }
}
StewardClientModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    HttpClientModule,
                    MatInputModule,
                    MatTableModule,
                    MatCheckboxModule,
                    MatIconModule,
                    MatDatepickerModule,
                    MatNativeDateModule,
                    MatPaginatorModule,
                    MatSelectModule,
                    MatButtonModule,
                    MatSortModule,
                    MatMenuModule,
                    MatProgressSpinnerModule,
                    MatAutocompleteModule
                ],
                declarations: [
                    StewardClientComponent,
                    TgrMaterialTableComponent,
                ],
                exports: [StewardClientComponent, TgrMaterialTableComponent,]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: steward-client.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { APP_DATE_FORMATS, AppDateAdapter, ClientDetails, Page, ResponseWrapper, Sort, StewardClientComponent, StewardClientModule, StewardClientService, StewardConfig, TgrDynamicControl, TgrInput, TgrMaterialTableComponent, TgrMoreActions, TgrSelect, TgrSelectOption, TgrTextarea };
//# sourceMappingURL=steward-client.js.map
