/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
 * @template T, E
 */
export class StewardClientService {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
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
        if (config.access_token) {
            //append access token if the environment has access token
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
        if (this.config.access_token) {
            //update token header
            this.headers.set("Authorization", "Bearer " + token);
        }
        else {
            //append access token if the environment has access token
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
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
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
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            }
            else {
                formData.append(key, data[key]);
            }
        });
        return this.http.post(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    }
    /**
     * Handles http put form data request
     * @param {?} endpoint expects either an endpoint or url
     * @param {?} data valid object
     * @return {?}
     */
    putFormDataMultiPart(endpoint, data) {
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            }
            else {
                formData.append(key, data[key]);
            }
        });
        return this.http.put(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    }
    /**
     * Convert map to HttpParams
     * @param {?} data
     * @return {?}
     */
    getHttpParams(data) {
        if (data == undefined) {
            return new HttpParams();
        }
        /** @type {?} */
        let httpParams = new HttpParams();
        data.forEach((value, key) => {
            httpParams = httpParams.append(key, value);
        });
        return httpParams;
    }
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @template ResponseWrapper
     * @return {?}
     */
    handleError() {
        return (error) => {
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
        };
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
        if ((!(data instanceof Object)) || (keys.length == 1)) {
            return data[keys.tail];
        }
        /** @type {?} */
        let value = null;
        Object.keys(data).forEach((key) => {
            if ((key == keys.front) && (data[key] instanceof Object)) {
                value = this.getObjectValue(data[key], keys);
            }
            else if (key == keys.tail) {
                value = data[key];
            }
        });
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
        entries.forEach((val, key) => {
            customHeaders = customHeaders.append(key, val);
        });
        return customHeaders;
    }
}
StewardClientService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StewardClientService.ctorParameters = () => [
    { type: HttpClient },
    { type: StewardConfig }
];
if (false) {
    /** @type {?} */
    StewardClientService.prototype.headers;
    /** @type {?} */
    StewardClientService.prototype.token;
    /** @type {?} */
    StewardClientService.prototype.base_url;
    /** @type {?} */
    StewardClientService.prototype.http;
    /** @type {?} */
    StewardClientService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQXFCLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlGLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUd2RSxNQUFNO0NBSUw7Ozs7Ozs7Ozs7OztBQUdELE1BQU07Ozs7O0lBTUYsWUFBb0IsSUFBZ0IsRUFBVSxNQUFxQjtRQUEvQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTt3QkFGaEQsR0FBRztRQUdsQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztTQUMzRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDM0IsY0FBYyxFQUFFLGlDQUFpQzthQUNwRCxDQUFDLENBQUM7U0FDTjtRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hGO0tBQ0o7Ozs7Ozs7SUFPRCxRQUFRLENBQUMsS0FBYTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDeEQ7UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDMUU7S0FDSjs7Ozs7Ozs7SUFPRCxJQUFJLENBQUMsUUFBZ0IsRUFBRSxJQUFPLEVBQUUsVUFBMkM7UUFFdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDaEosVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUN0QyxDQUFDO0tBQ0w7Ozs7Ozs7O0lBT0QsR0FBRyxDQUFDLFFBQWdCLEVBQUUsSUFBTyxFQUFFLFVBQTJDO1FBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQy9JLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7Ozs7OztJQVFELE1BQU0sQ0FBQyxRQUFnQixFQUFFLElBQU8sRUFBRSxVQUEyQztRQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ25LLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7Ozs7OztJQVFELEdBQUcsQ0FBQyxRQUFnQixFQUFFLElBQTBCLEVBQUUsVUFBMkM7O1FBQ3pGLE1BQU0sT0FBTyxHQUFHO1lBQ1osT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDbkUsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1NBQ25DLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3pELFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7Ozs7O0lBT0QsT0FBTyxDQUFDLFFBQWdCLEVBQUUsSUFBMEI7O1FBQ2hELE1BQU0sT0FBTyxHQUFHO1lBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1NBQ25DLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDekYsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUN0QyxDQUFDO0tBQ0w7Ozs7Ozs7O0lBT0QsWUFBWSxDQUFDLFFBQWdCLEVBQUUsSUFBTyxFQUFFLE9BQXFCOztRQUN6RCxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDOUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDakYsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUN0QyxDQUFDO0tBQ0w7Ozs7Ozs7SUFPRCxxQkFBcUIsQ0FBQyxRQUFnQixFQUFFLElBQU87O1FBQzNDLE1BQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzVCLENBQUMsQ0FBQzthQUNOO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbkM7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3RJLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7Ozs7O0lBT0Qsb0JBQW9CLENBQUMsUUFBZ0IsRUFBRSxJQUFPOztRQUMxQyxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ25CLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM1QixDQUFDLENBQUM7YUFDTjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ25DO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsZUFBZSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNySSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3RDLENBQUM7S0FDTDs7Ozs7O0lBTU8sYUFBYSxDQUFDLElBQXlCO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO1NBQzNCOztRQUNELElBQUksVUFBVSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUN4QyxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7Ozs7SUFNZCxXQUFXO1FBQ2YsTUFBTSxDQUFDLENBQUMsS0FBd0IsRUFBbUIsRUFBRTs7WUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQzs7WUFFbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsNERBQTRELENBQUM7YUFDOUU7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDL0I7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCLENBQUM7Ozs7Ozs7SUFLTixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQU87UUFDckIsTUFBTSxDQUFDLDZDQUE2QyxHQUFHLEVBQUUsR0FBRyx3R0FBd0csQ0FBQztLQUN4Szs7Ozs7OztJQU9NLGdCQUFnQixDQUFDLFFBQWdCLEVBQUUsSUFBMEI7O1FBQ2hFLE1BQU0sT0FBTyxHQUFHO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztTQUNuQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN6RCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3RDLENBQUM7Ozs7Ozs7SUFPQyxLQUFLLENBQUMsR0FBVztRQUNwQixJQUFJLENBQUM7WUFDRCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjs7Ozs7Ozs7SUFRRSxVQUFVLENBQUMsR0FBVztRQUN6QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O0lBUWxELGNBQWMsQ0FBQyxJQUFTLEVBQUUsSUFBbUI7UUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjs7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDaEQ7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztJQVFWLGFBQWEsQ0FBQyxPQUF1Qzs7UUFDeEQsSUFBSSxhQUFhLEdBQWdCLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDOUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQXNCLEVBQUUsR0FBVyxFQUFFLEVBQUU7WUFDcEQsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxhQUFhLENBQUM7Ozs7WUE1UTVCLFVBQVU7Ozs7WUFaRixVQUFVO1lBbUJ1QyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xyXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xyXG4gICAgYmFzZV91cmw6IHN0cmluZztcclxuICAgIGFjY2Vzc190b2tlbj86IHN0cmluZztcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xyXG5cclxuICAgIHByaXZhdGUgaGVhZGVyczogSHR0cEhlYWRlcnM7XHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG4gICAgYmFzZV91cmw6IHN0cmluZyA9IFwiL1wiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcclxuICAgICAgICB0aGlzLmJhc2VfdXJsID0gY29uZmlnLmJhc2VfdXJsO1xyXG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcuYWNjZXNzX3Rva2VuKSB7Ly9hcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBcIkJlYXJlciBcIiArIGNvbmZpZy5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBVc2VkIHRvIHVwZGF0ZSBhdXRob3JpemF0aW9uIHRva2VuLiBDdXJyZW50bHkgc3VwcG9ydHMgYmVhcmVyIHRva2VuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0b2tlbiBcclxuICAgICAqL1xyXG4gICAgc2V0VG9rZW4odG9rZW46IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL3VwZGF0ZSB0b2tlbiBoZWFkZXJcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbik7XHJcbiAgICAgICAgfSBlbHNlIHsvL2FwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIFwiQmVhcmVyIFwiICsgdG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBhIHZhbGlkIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBhZGRIZWFkZXJzPzogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwdXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHsgaGVhZGVyczogYWRkSGVhZGVycyA/IHRoaXMuYXBwZW5kSGVhZGVycyhhZGRIZWFkZXJzKSA6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGh0dHAgZGVsZXRlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGFkZEhlYWRlcnMgYWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIHRvIGV4aXN0aW5nIGhlYWRlcnNcclxuICAgICAqL1xyXG4gICAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgeyBoZWFkZXJzOiBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzLCBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGh0dHAgZ2V0IHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIHJlcXVlc3QgcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBnZXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4sIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGZXRjaCBhIGZpbGVcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBnZXRGaWxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSArICc/YWNjZXNzX3Rva2VuPScgKyB0aGlzLnRva2VuLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGlmXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqIEBwYXJhbSBoZWFkZXJzIFxyXG4gICAgICovXHJcbiAgICBwb3N0Rm9ybURhdGEoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgaGVhZGVycz86IEh0dHBIZWFkZXJzKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5oZWFkZXJzLmdldChcIkF1dGhvcml6YXRpb25cIikgJiYgKCFoZWFkZXJzKSkge1xyXG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWhlYWRlcnMpIHtcclxuICAgICAgICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVycyB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGUgaHR0cCBmb3JtIGRhdGEgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhIHZhbGlkIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwb3N0Rm9ybURhdGFNdWx0aXBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBwdXQgZm9ybSBkYXRhIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIHZhbGlkIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdXRGb3JtRGF0YU11bHRpUGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IG1hcCB0byBIdHRwUGFyYW1zXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRIdHRwUGFyYW1zKGRhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBIdHRwUGFyYW1zIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICBkYXRhLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaHR0cFBhcmFtcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBjYXRjaCBleGNlcHRpb24gdGhyb3duIGJ5IGh0dHAgY2xpZW50IHJldHVybnMgaW50ZXJuYWwgc2VydmVyIGVycm9yXHJcbiAgICAgKiBpZiBzdGF0dXMgNTAwIGlzIGVuY291bnRlcmVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3I8UmVzcG9uc2VXcmFwcGVyPigpIHtcclxuICAgICAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8YW55PiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG5ldyBSZXNwb25zZVdyYXBwZXIoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxyXG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHJlcy5tZXNzYWdlID0gJ1NvcnJ5IGludGVybmFsIHNlcnZlciBlcnJvciBvY2N1cmVkIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHJlcy5tZXNzYWdlID0gZXJyb3IuZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHJlcy5kYXRhID0gZXJyb3IuZXJyb3IuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2YocmVzKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHJlbmRlciBhY3Rpb24gYnV0dG9uc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVuZGVyTW9yZShpZDogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVxcJ2FjdGlvbnMtYnV0dG9ucyBjZW50ZXJcXCcgaWQ9XFwnJyArIGlkICsgJ1xcJz48aSBjbGFzcz1cXCdmYSBmYS1jaGVja1xcJyB0aXRsZT1cXCdBcHByb3ZlXFwnPjwvaT4gPGkgY2xhc3M9XFwnZmEgZmEtYmFuXFwnIHRpdGxlPVxcJ0RlY2xpbmVcXCc+PC9pPjwvZGl2Pic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGRhdGF0YWJsZSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGEgdmFsaWQgbWFwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbnRpYXRlRGF0YVRhYmxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBpZiBhIHN0cmluZyBpcyBhIHZhbGlkIFVSTFxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNVUkwodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgVVJMKHVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSB1cmwgcGFyYW1ldGVyIGlzIGFuIGVuZHBvaW50IGl0IGFwcGVuZHMgdG8gdGhlIGJhc2UgdXJsXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHNlZSBiYXNlX3VybFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VydmljZVVSTCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzVVJMKHVybCkpID8gdXJsIDogdGhpcy5iYXNlX3VybCArIHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiBVc2VkIHRvIGZpbmQga2V5IHZhbHVlIGJhc2VkIG9uIHRoZSBrZXkgc2VxdWVuY2UgcHJvdmlkZWRcclxuICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGFuIG9iamVjdFxyXG4gICAqIEBwYXJhbSBrZXlzIGkuZS4gdXNlci5nZW5kZXIudHlwZS50eXBlXHJcbiAgICovXHJcbiAgICBwdWJsaWMgZ2V0T2JqZWN0VmFsdWUoZGF0YTogYW55LCBrZXlzOiBRdWV1ZTxzdHJpbmc+KSB7XHJcbiAgICAgICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT0gMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5cy50YWlsXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKChrZXkgPT0ga2V5cy5mcm9udCkgJiYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhW2tleV0sIGtleXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PSBrZXlzLnRhaWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGFwcGVuZCBoZWFkZXJzIHRoZSBjdXJyZW50IGh0dHBIZWFkZXJzXHJcbiAgICAgKiBAcmV0dXJucyBtZXJnZWQgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwZW5kSGVhZGVycyhlbnRyaWVzOiBNYXA8U3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBIdHRwSGVhZGVyc3tcclxuICAgICAgICBsZXQgY3VzdG9tSGVhZGVyczogSHR0cEhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XHJcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKCh2YWw6IHN0cmluZyB8IHN0cmluZ1tdLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjdXN0b21IZWFkZXJzID0gY3VzdG9tSGVhZGVycy5hcHBlbmQoa2V5LCB2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjdXN0b21IZWFkZXJzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==