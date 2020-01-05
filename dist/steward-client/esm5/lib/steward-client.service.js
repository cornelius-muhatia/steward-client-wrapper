/**
 * @fileoverview added by tsickle
 * Generated from: lib/steward-client.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
 * @template T, E
 */
var StewardClientService = /** @class */ (function () {
    function StewardClientService(http, config) {
        this.http = http;
        this.config = config;
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
            this.headers.set("Authorization", "Bearer " + token);
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
    StewardClientService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StewardClientService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: StewardConfig }
    ]; };
    return StewardClientService;
}());
export { StewardClientService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.headers;
    /** @type {?} */
    StewardClientService.prototype.token;
    /** @type {?} */
    StewardClientService.prototype.base_url;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFxQixVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RixPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdkU7SUFBQTtJQUlBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEcsaUNBQWlCOztJQUNqQixxQ0FBc0I7O0lBQ3RCLGdDQUFzQjs7Ozs7QUFHMUI7SUFPSSw4QkFBb0IsSUFBZ0IsRUFBVSxNQUFxQjtRQUEvQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUZuRSxhQUFRLEdBQVcsR0FBRyxDQUFDO1FBR25CLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztTQUMzRjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDM0IsY0FBYyxFQUFFLGlDQUFpQzthQUNwRCxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFDLHlEQUF5RDtZQUMv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R0FBRyxDQUFDLFlBQVksTUFBTSxDQUFDLEVBQUU7Z0JBQ3BELEtBQUssR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDdEMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFFakIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0ksNENBQWE7Ozs7O0lBQXBCLFVBQXFCLE9BQXVDOztZQUNwRCxhQUFhLEdBQWdCLElBQUksQ0FBQyxPQUFPO1FBQzdDLE9BQU8sQ0FBQyxPQUFPOzs7OztRQUFDLFVBQUMsR0FBc0IsRUFBRSxHQUFXO1lBQ2hELGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7O2dCQTdRSixVQUFVOzs7O2dCQVhGLFVBQVU7Z0JBa0J1QyxhQUFhOztJQXVRdkUsMkJBQUM7Q0FBQSxBQTlRRCxJQThRQztTQTdRWSxvQkFBb0I7Ozs7OztJQUU3Qix1Q0FBNkI7O0lBQzdCLHFDQUFjOztJQUNkLHdDQUF1Qjs7Ozs7SUFFWCxvQ0FBd0I7Ozs7O0lBQUUsc0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xyXG4gICAgYmFzZV91cmw6IHN0cmluZztcclxuICAgIGFjY2Vzc190b2tlbj86IHN0cmluZztcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xyXG5cclxuICAgIHByaXZhdGUgaGVhZGVyczogSHR0cEhlYWRlcnM7XHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG4gICAgYmFzZV91cmw6IHN0cmluZyA9IFwiL1wiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcclxuICAgICAgICB0aGlzLmJhc2VfdXJsID0gY29uZmlnLmJhc2VfdXJsO1xyXG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcuYWNjZXNzX3Rva2VuKSB7Ly9hcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBcIkJlYXJlciBcIiArIGNvbmZpZy5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBVc2VkIHRvIHVwZGF0ZSBhdXRob3JpemF0aW9uIHRva2VuLiBDdXJyZW50bHkgc3VwcG9ydHMgYmVhcmVyIHRva2VuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRva2VuXHJcbiAgICAgKi9cclxuICAgIHNldFRva2VuKHRva2VuOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWNjZXNzX3Rva2VuKSB7Ly91cGRhdGUgdG9rZW4gaGVhZGVyXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pO1xyXG4gICAgICAgIH0gZWxzZSB7Ly9hcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBcIkJlYXJlciBcIiArIHRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgYSB2YWxpZCBvYmplY3RcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHBvc3QoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBodHRwIGRlbGV0ZSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgeyBoZWFkZXJzOiBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzLCBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGh0dHAgZ2V0IHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIHJlcXVlc3QgcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBnZXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4sIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaCBhIGZpbGVcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIGdldEZpbGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpICsgJz9hY2Nlc3NfdG9rZW49JyArIHRoaXMudG9rZW4sIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogaWZcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwb3N0Rm9ybURhdGEoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgaGVhZGVycz86IEh0dHBIZWFkZXJzKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5oZWFkZXJzLmdldChcIkF1dGhvcml6YXRpb25cIikgJiYgKCFoZWFkZXJzKSkge1xyXG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWhlYWRlcnMpIHtcclxuICAgICAgICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVycyB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGUgaHR0cCBmb3JtIGRhdGEgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhIHZhbGlkIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwb3N0Rm9ybURhdGFNdWx0aXBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBwdXQgZm9ybSBkYXRhIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIHZhbGlkIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdXRGb3JtRGF0YU11bHRpUGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IG1hcCB0byBIdHRwUGFyYW1zXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xyXG4gICAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlV3JhcHBlcigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZW5kZXJNb3JlKGlkOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgZGF0YXRhYmxlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYSB2YWxpZCBtYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGlmIGEgc3RyaW5nIGlzIGEgdmFsaWQgVVJMXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1VSTCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBVUkwodXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoXykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlIHVybCBwYXJhbWV0ZXIgaXMgYW4gZW5kcG9pbnQgaXQgYXBwZW5kcyB0byB0aGUgYmFzZSB1cmxcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqIEBzZWUgYmFzZV91cmxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlcnZpY2VVUkwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5pc1VSTCh1cmwpKSA/IHVybCA6IHRoaXMuYmFzZV91cmwgKyB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXHJcbiAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhbiBvYmplY3RcclxuICAgKiBAcGFyYW0ga2V5cyBpLmUuIHVzZXIuZ2VuZGVyLnR5cGUudHlwZVxyXG4gICAqL1xyXG4gICAgcHVibGljIGdldE9iamVjdFZhbHVlKGRhdGE6IGFueSwga2V5czogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGlmICgoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0KSkgfHwgKGtleXMubGVuZ3RoID09PSAxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVtrZXlzW2tleXMubGVuZ3RoIC0gMV1dO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKGtleSA9PT0ga2V5c1swXSkgJiYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhW2tleV0sIGtleXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0ga2V5c1trZXlzLmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGFwcGVuZCBoZWFkZXJzIHRoZSBjdXJyZW50IGh0dHBIZWFkZXJzXHJcbiAgICAgKiBAcmV0dXJucyBtZXJnZWQgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwZW5kSGVhZGVycyhlbnRyaWVzOiBNYXA8U3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBIdHRwSGVhZGVyc3tcclxuICAgICAgICBsZXQgY3VzdG9tSGVhZGVyczogSHR0cEhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XHJcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKCh2YWw6IHN0cmluZyB8IHN0cmluZ1tdLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjdXN0b21IZWFkZXJzID0gY3VzdG9tSGVhZGVycy5hcHBlbmQoa2V5LCB2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjdXN0b21IZWFkZXJzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==