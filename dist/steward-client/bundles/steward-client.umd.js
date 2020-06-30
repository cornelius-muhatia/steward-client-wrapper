(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/collections'), require('@angular/material/core'), require('@angular/material')) :
    typeof define === 'function' && define.amd ? define('steward-client', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/forms', '@angular/cdk/collections', '@angular/material/core', '@angular/material'], factory) :
    (global = global || self, factory(global['steward-client'] = {}, global.ng.core, global.ng.common.http, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.forms, global.ng.cdk.collections, global.ng.material.core, global.ng.material));
}(this, (function (exports, core, http, rxjs, operators, common, forms, collections, core$1, material) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/entities/wrappers/response-wrapper.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Wraps server response
     * @template T
     */
    var   /**
     * Wraps server response
     * @template T
     */
    ResponseWrapper = /** @class */ (function () {
        function ResponseWrapper() {
        }
        return ResponseWrapper;
    }());
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
    var StewardConfig = /** @class */ (function () {
        function StewardConfig() {
        }
        return StewardConfig;
    }());
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
    var   /**
     * Oauth2 client details
     */
    ClientDetails = /** @class */ (function () {
        function ClientDetails() {
        }
        return ClientDetails;
    }());
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
        function StewardClientService(http$1, config, clientDetails) {
            this.http = http$1;
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
                this.headers = new http.HttpHeaders({
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
            return this.http.post(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(operators.catchError(this.handleError()));
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
            return this.http.put(this.serviceURL(endpoint), JSON.stringify(data), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers }).pipe(operators.catchError(this.handleError()));
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
            return this.http.request('delete', this.serviceURL(endpoint), { headers: addHeaders ? this.appendHeaders(addHeaders) : this.headers, body: JSON.stringify(data) }).pipe(operators.catchError(this.handleError()));
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
            return this.http.get(this.serviceURL(endpoint), options).pipe(operators.catchError(this.handleError()));
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
            return this.http.get(this.serviceURL(endpoint) + '?access_token=' + this.token, options).pipe(operators.catchError(this.handleError()));
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
                headers = new http.HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
            }
            else if (!headers) {
                headers = new http.HttpHeaders();
            }
            return this.http.post(this.serviceURL(endpoint), formData, { headers: headers }).pipe(operators.catchError(this.handleError()));
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
            return this.http.post(this.serviceURL(endpoint), formData, { headers: new http.HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(operators.catchError(this.handleError()));
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
            return this.http.put(this.serviceURL(endpoint), formData, { headers: new http.HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(operators.catchError(this.handleError()));
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
                return new http.HttpParams();
            }
            /** @type {?} */
            var httpParams = new http.HttpParams();
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
                return rxjs.of(res);
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
            return this.http.get(this.serviceURL(endpoint), options).pipe(operators.catchError(this.handleError()));
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
            return this.http.post(this.serviceURL(endpoint), formData, { headers: formHeaders }).pipe(operators.catchError(this.handleError())).pipe(operators.tap((/**
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
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
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
            var headers = new http.HttpHeaders({
                'Authorization': 'Basic '
                    + this.getHttpBasicToken()
            });
            return this.http.post(this.serviceURL(this.oauthTokenEndpoint), {
                refresh_token: this.refreshAccessToken,
                grant_type: "refresh_token"
            }, { headers: headers })
                .pipe(operators.catchError(this.handleError()))
                .pipe(operators.tap((/**
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        StewardClientService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: StewardConfig },
            { type: ClientDetails, decorators: [{ type: core.Optional }] }
        ]; };
        return StewardClientService;
    }());
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
    var StewardClientComponent = /** @class */ (function () {
        function StewardClientComponent() {
        }
        /**
         * @return {?}
         */
        StewardClientComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        StewardClientComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'lib-steward-client',
                        template: "\n    <p>\n      steward-client works!\n    </p>\n  "
                    }] }
        ];
        /** @nocollapse */
        StewardClientComponent.ctorParameters = function () { return []; };
        return StewardClientComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/entities/wrappers/page.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Datable page used to wrapper server content response
     * @template T
     */
    var   /**
     * Datable page used to wrapper server content response
     * @template T
     */
    Page = /** @class */ (function () {
        function Page() {
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
        return Page;
    }());
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
    var   /**
     * used to map sort request
     */
    Sort = /** @class */ (function () {
        function Sort() {
            this.sorted = false;
            this.unsorted = true;
        }
        return Sort;
    }());
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
    var   /**
     * Represents dynamic html controls (Input, TextArea and Select)
     * @template T
     */
    TgrDynamicControl = /** @class */ (function () {
        function TgrDynamicControl(label, name, controlType, icon, isRequired, placeholder) {
            if (icon === void 0) { icon = "fa fa-file-text-o"; }
            if (isRequired === void 0) { isRequired = false; }
            if (placeholder === void 0) { placeholder = null; }
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
        return TgrDynamicControl;
    }());
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
    var   /**
     * Used to represent html input with options:
     * type: default to text,  maxLength, minLength, min, max
     */
    TgrInput = /** @class */ (function () {
        function TgrInput(type) {
            if (type === void 0) { type = "text"; }
            this.type = type;
            this.minLength = this.min = 0;
            this.maxLength = 4000;
            this.max = 1000000000;
        }
        return TgrInput;
    }());
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
    var   /**
     * Represents html textarea input
     */
    TgrTextarea = /** @class */ (function () {
        function TgrTextarea(cols, rows) {
            if (cols === void 0) { cols = 5; }
            if (rows === void 0) { rows = 1; }
            this.cols = cols;
            this.rows = rows;
            this.maxLength = 4000;
            this.minLength = 0;
        }
        return TgrTextarea;
    }());
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
    var   /**
     * Represents html select control
     */
    TgrSelect = /** @class */ (function () {
        function TgrSelect(options) {
            this.options = options;
        }
        return TgrSelect;
    }());
    if (false) {
        /**
         * Select options
         * @type {?}
         */
        TgrSelect.prototype.options;
    }
    var TgrSelectOption = /** @class */ (function () {
        function TgrSelectOption(value, text) {
            if (text === void 0) { text = null; }
            this.value = value;
            this.text = text ? text : value;
        }
        return TgrSelectOption;
    }());
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
    var   /**
     * Format angular date to dd-mm-yyyy
     */
    AppDateAdapter = /** @class */ (function (_super) {
        __extends(AppDateAdapter, _super);
        function AppDateAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Parse date to dd-mm-yyyy
         * @param date  date input
         * @param displayFormat expects to be input string
         */
        /**
         * Parse date to dd-mm-yyyy
         * @param {?} date  date input
         * @param {?} displayFormat expects to be input string
         * @return {?}
         */
        AppDateAdapter.prototype.format = /**
         * Parse date to dd-mm-yyyy
         * @param {?} date  date input
         * @param {?} displayFormat expects to be input string
         * @return {?}
         */
        function (date, displayFormat) {
            if (displayFormat === 'input') {
                /** @type {?} */
                var day = date.getDate();
                /** @type {?} */
                var month = date.getMonth() + 1;
                /** @type {?} */
                var year = date.getFullYear();
                /** @type {?} */
                var dayString = void 0;
                /** @type {?} */
                var monthString = void 0;
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
                return year + "-" + monthString + "-" + dayString;
            }
            return date.toDateString();
        };
        return AppDateAdapter;
    }(material.NativeDateAdapter));
    /**
     * Material date formats
     * @type {?}
     */
    var APP_DATE_FORMATS = {
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
    var TgrMaterialTableComponent = /** @class */ (function () {
        function TgrMaterialTableComponent(sterwardService) {
            this.sterwardService = sterwardService;
            this.displayedColumns = [];
            this.selection = new collections.SelectionModel(true, []);
            this.rowSelection = new core.EventEmitter();
            this.columns = [];
            this.enableCheckbox = true;
            this.actionsEvent = new core.EventEmitter();
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
            this.datePipe = new common.DatePipe('en-US');
        }
        /**
         * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
         */
        /**
         * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.ngOnInit = /**
         * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
         * @return {?}
         */
        function () {
            var _this = this;
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
            function (c) {
                _this.displayedColumns.push(c.fieldName);
            }));
            if (this.moreActions) {
                this.displayedColumns.push('actions');
            }
            else {
                console.debug('moreActions not injected skipping rendering \'More Actions\' column');
            }
            /** @type {?} */
            var group = {};
            this.filterComponents.forEach((/**
             * @param {?} comp
             * @return {?}
             */
            function (comp) {
                /** @type {?} */
                var validators = [];
                if (comp.isRequired) {
                    validators.push(forms.Validators.required);
                }
                if (comp.controlType instanceof TgrInput || comp.controlType instanceof TgrTextarea) {
                    validators.push(forms.Validators.minLength(comp.controlType.minLength));
                    validators.push(forms.Validators.maxLength(comp.controlType.maxLength));
                }
                if (comp.controlType instanceof TgrInput) {
                    validators.push(forms.Validators.max(comp.controlType.max));
                    validators.push(forms.Validators.min(comp.controlType.min));
                }
                group[comp.name] = new forms.FormControl('', validators);
            }));
            //add default controls
            group['from'] = new forms.FormControl('', forms.Validators.maxLength(100));
            group['to'] = new forms.FormControl('', forms.Validators.maxLength(100));
            group['needle'] = new forms.FormControl('', forms.Validators.maxLength(200));
            this.filterForm = new forms.FormGroup(group);
            this.loadPage({ offset: 0, limit: this.page.size }, null);
        };
        /**
         * After view intialization fire selection event
         */
        /**
         * After view intialization fire selection event
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.ngAfterViewInit = /**
         * After view intialization fire selection event
         * @return {?}
         */
        function () {
            this.rowSelection.emit(this.selection);
        };
        /** Whether the number of selected elements matches the total number of rows. */
        /**
         * Whether the number of selected elements matches the total number of rows.
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.isAllSelected = /**
         * Whether the number of selected elements matches the total number of rows.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var numSelected = this.selection.selected.length;
            /** @type {?} */
            var numRows = this.page.content.length;
            return numSelected == numRows;
        };
        /** Selects all rows if they are not all selected; otherwise clear selection. */
        /**
         * Selects all rows if they are not all selected; otherwise clear selection.
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.masterToggle = /**
         * Selects all rows if they are not all selected; otherwise clear selection.
         * @return {?}
         */
        function () {
            var _this = this;
            this.isAllSelected() ?
                this.selection.clear() :
                this.page.content.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return _this.selection.select(row); }));
        };
        /**
         * Used to emit click event of the actions
         * @param event Actions data
         */
        /**
         * Used to emit click event of the actions
         * @param {?} event Actions data
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.onActionClick = /**
         * Used to emit click event of the actions
         * @param {?} event Actions data
         * @return {?}
         */
        function (event) {
            this.actionsEvent.emit(event);
        };
        /**
         * Process server request of datable
         *
         * @param pageInfo Page variables
         * @param filters Filter variables
         */
        /**
         * Process server request of datable
         *
         * @param {?} pageInfo Page variables
         * @param {?} filters Filter variables
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.loadPage = /**
         * Process server request of datable
         *
         * @param {?} pageInfo Page variables
         * @param {?} filters Filter variables
         * @return {?}
         */
        function (pageInfo, filters) {
            var _this = this;
            if (!this.endpoint) {
                return;
            }
            this.isLoadingResults = true;
            /** @type {?} */
            var request;
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
                function (value, key) {
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
            function (response) {
                if (response.status === 200) {
                    if (_this.showNumberColumn) {
                        /** @type {?} */
                        var no_1 = 1 + (response.data.number * response.data.size);
                        response.data.content.forEach((/**
                         * @param {?} val
                         * @return {?}
                         */
                        function (val) {
                            val.no = no_1++;
                        }));
                    }
                    _this.page = response.data;
                }
                _this.isLoadingResults = false;
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.debug('Server request has failed');
                _this.isLoadingResults = false;
            }));
        };
        /**
         * Used tolisten to pagination events/actions
         * @param page page variables
         */
        /**
         * Used tolisten to pagination events/actions
         * @param {?} page page variables
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.pageEvent = /**
         * Used tolisten to pagination events/actions
         * @param {?} page page variables
         * @return {?}
         */
        function (page) {
            this.loadPage({ limit: page.pageSize, offset: page.pageIndex }, this.getFilters());
        };
        /**
         * Used to processing table sorting
         * @param event Sort variables
         */
        /**
         * Used to processing table sorting
         * @param {?} event Sort variables
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.processSorting = /**
         * Used to processing table sorting
         * @param {?} event Sort variables
         * @return {?}
         */
        function (event) {
            this.sortParams = event;
            this.loadPage({ limit: this.page.size, offset: 0 }, this.getFilters());
        };
        /**
         * Used to get filter entries from the filter form. Also adds sort parameters to request
         */
        /**
         * Used to get filter entries from the filter form. Also adds sort parameters to request
         * @private
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.getFilters = /**
         * Used to get filter entries from the filter form. Also adds sort parameters to request
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var f = new Map();
            Object.keys(this.filterForm.value).forEach((/**
             * @param {?} val
             * @param {?} key
             * @return {?}
             */
            function (val, key) {
                // console.debug("Key is " + key + " and value " + val);
                if (_this.filterForm.value[val]) {
                    if (val === 'from' || val === 'to') {
                        f.set(val, _this.datePipe.transform(_this.filterForm.value[val], 'yyyy-MM-dd'));
                    }
                    else {
                        f.set(val, _this.filterForm.value[val]);
                    }
                }
            }));
            // add sorting parameters
            if (this.sortParams) {
                f.set('sort', this.sortParams.active + ',' + this.sortParams.direction);
            }
            return f;
        };
        /**
         * Used to process table filter. If date filter is not provide the from value is
         * set to 2018-01-01 and to value is set to 1 year from today
         *
         * @deprecated
         */
        /**
         * Used to process table filter. If date filter is not provide the from value is
         * set to 2018-01-01 and to value is set to 1 year from today
         *
         * @deprecated
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.processFilter = /**
         * Used to process table filter. If date filter is not provide the from value is
         * set to 2018-01-01 and to value is set to 1 year from today
         *
         * @deprecated
         * @return {?}
         */
        function () {
            this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
        };
        /**
         * Used to check if additional control is input
         *
         * @param control additional control
         */
        /**
         * Used to check if additional control is input
         *
         * @param {?} control additional control
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.isInput = /**
         * Used to check if additional control is input
         *
         * @param {?} control additional control
         * @return {?}
         */
        function (control) {
            return control instanceof TgrInput;
        };
        /**
         * Used to check if miliki control is select
         *
         * @param control Select control
         */
        /**
         * Used to check if miliki control is select
         *
         * @param {?} control Select control
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.isSelect = /**
         * Used to check if miliki control is select
         *
         * @param {?} control Select control
         * @return {?}
         */
        function (control) {
            return control instanceof TgrSelect;
        };
        /**
         * Used to check if miliki control is textarea
         */
        /**
         * Used to check if miliki control is textarea
         * @param {?} control
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.isTextArea = /**
         * Used to check if miliki control is textarea
         * @param {?} control
         * @return {?}
         */
        function (control) {
            return control instanceof TgrTextarea;
        };
        /**
         * Used to format date to string yyyy-MM-dd
         * @param date Date variable
         */
        /**
         * Used to format date to string yyyy-MM-dd
         * @param {?} date Date variable
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.getFormattedDate = /**
         * Used to format date to string yyyy-MM-dd
         * @param {?} date Date variable
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var year = date.getFullYear();
            /** @type {?} */
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            /** @type {?} */
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return year + '-' + month + '-' + day;
        };
        /**
         * @param {?} data
         * @param {?} column
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.getFieldValue = /**
         * @param {?} data
         * @param {?} column
         * @return {?}
         */
        function (data, column) {
            if (column.callback) {
                return column.callback(data);
            }
            /** @type {?} */
            var k = column.fieldName.split('.');
            /** @type {?} */
            var value = this.sterwardService.getObjectValue(data, k);
            return column.isDateColumn ? this.datePipe.transform(value, 'medium') : value;
        };
        /**
         * Refresh data table values
         */
        /**
         * Refresh data table values
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.refreshTable = /**
         * Refresh data table values
         * @return {?}
         */
        function () {
            console.debug('Refreshed data tables');
            this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
        };
        TgrMaterialTableComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'tgr-material-table',
                        template: "<div class=\"row\"  *ngIf=\"showDefaultFilters || filterComponents.length > 0\">\n  <div class=\"col-md-12\">\n    <div class=\"card card-outline-default mat-elevation-z4\">\n      <div class=\"card-body\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"mat-table-filter\">\n                <button title=\"Refresh\" (click) = \"refreshTable()\" mat-icon-button color=\"basic\" type=\"reset\"><mat-icon>refresh</mat-icon></button>\n            </div>\n          </div>\n        </div>\n        <form (ngSubmit)=\"processFilter()\" [formGroup]=\"filterForm\">\n          <div class=\"row\">\n            <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n              <!-- Intialize form select control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isSelect(control.controlType)\">\n                <mat-select [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\">\n                  <mat-option *ngFor=\"let o of control.controlType.options\" [value]=\"o.value\">\n                    {{o.text}}\n                  </mat-option>\n                </mat-select>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form textarea control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isTextArea(control.controlType)\">\n                <textarea matInput [formControlName]=\"control.name\" [placeholder]=\"control.label\" [cols]=\"control.controlType.cols\"\n                  [rows]=\"control.controlType.rows\"></textarea>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form input control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isInput(control.controlType)\">\n                <!-- <mat-icon matPrefix class=\"material-icons icon-margin-right\">perm_identity</mat-icon> -->\n                <input matInput [placeholder]=\"control.label\" [type]=\"control.controlType.type\" [formControlName]=\"control.name\" />\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than\n                  {{control.controlType.min}}</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than\n                  {{control.controlType.max}}</mat-error>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <!-- <mat-icon matPrefix class=\"material-icons col-md-3\">date_range</mat-icon> -->\n              <mat-form-field class=\"col-md-12\">\n                <input matInput placeholder=\"From\" type=\"date\" [matDatepicker]=\"picker\" formControlName=\"from\" />\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <!-- <mat-icon>home</mat-icon> -->\n                <input matInput placeholder=\"To\" type=\"date\" [matDatepicker]=\"toPicker\" formControlName=\"to\" />\n                <mat-datepicker-toggle matSuffix [for]=\"toPicker\"></mat-datepicker-toggle>\n                <mat-datepicker #toPicker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <input matInput maxlength=\"100\" placeholder=\"Search\" type=\"text\" formControlName=\"needle\" />\n              </mat-form-field>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n            </span>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"pull-right mat-table-filter\">\n                <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"filterForm.invalid\">Filter</button>\n                <button mat-raised-button color=\"basic\" type=\"reset\">Reset</button>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <div class=\"mat-table-loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n    <table mat-table [dataSource]=\"page.content\" class=\"mat-elevation-z8\" style=\"width: 100%\" matSort (matSortChange)=\"processSorting($event)\">\n\n      <!--- Note that these columns can be defined in any order.\n          The actual rendered columns are set as a property on the row definition\" -->\n\n      <!-- Position Column -->\n      <ng-container matColumnDef=\"checkbox\" *ngIf=\"enableCheckbox\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\" [checked]=\"selection.hasValue() && isAllSelected()\"\n            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n          </mat-checkbox>\n        </th>\n        <td mat-cell *matCellDef=\"let row\">\n          <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\" [checked]=\"selection.isSelected(row)\">\n          </mat-checkbox>\n        </td>\n      </ng-container>\n\n      <!-- Number Column -->\n      <ng-container matColumnDef=\"no\" *ngIf=\"showNumberColumn\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>\n        <td mat-cell *matCellDef=\"let element\" > \n           <div>{{element['no']}}</div>\n          </td>\n      </ng-container>\n\n      <!-- Fields Columns -->\n      <ng-container [matColumnDef]=\"c.fieldName\" *ngFor=\"let c of columns\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header [class.hide_on_xs]=\"c.hideOnXs\"> {{c.columnName}} </th>\n        <td mat-cell *matCellDef=\"let element\" [class.hide_on_xs]=\"c.hideOnXs\"> \n           <div [innerHtml] = \"getFieldValue(element, c)\"></div></td>\n      </ng-container>\n\n      <!-- Other Column -->\n      <ng-container matColumnDef=\"actions\" *ngIf=\"moreActions\">\n        <th mat-header-cell *matHeaderCellDef> {{moreActions.name}} </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n            <mat-icon>list</mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item *ngFor=\"let action of moreActions.actions\" (click)=\"onActionClick({data: element, id: element[moreActions.idFieldName], actionName: action.actionName})\">{{action.actionName}}</button>\n          </mat-menu>\n        </td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n    <mat-paginator (page)=\"pageEvent($event)\" showFirstLastButtons [length]=\"page.totalElements\" [pageSize]=\"20\" [pageSizeOptions]=\"[1, 5, 10, 20, 50, 100, 200]\">\n    </mat-paginator>\n  </div>\n</div>",
                        providers: [
                            { provide: core$1.DateAdapter, useClass: AppDateAdapter },
                            {
                                provide: core$1.MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
                            }
                        ],
                        styles: [".mat-table-filter button{margin-right:8px;float:right}@media (max-width:576px){.hide_on_xs{display:none}}.mat-table-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.mat-cell{padding-right:8px}"]
                    }] }
        ];
        /** @nocollapse */
        TgrMaterialTableComponent.ctorParameters = function () { return [
            { type: StewardClientService }
        ]; };
        TgrMaterialTableComponent.propDecorators = {
            selection: [{ type: core.Output }],
            rowSelection: [{ type: core.Output }],
            sort: [{ type: core.ViewChild, args: [material.MatSort, { static: true },] }],
            columns: [{ type: core.Input }],
            enableCheckbox: [{ type: core.Input }],
            endpoint: [{ type: core.Input }],
            moreActions: [{ type: core.Input }],
            actionsEvent: [{ type: core.Output }],
            filterComponents: [{ type: core.Input }],
            params: [{ type: core.Input }],
            showDefaultFilters: [{ type: core.Input }],
            showNumberColumn: [{ type: core.Input }],
            headers: [{ type: core.Input }]
        };
        return TgrMaterialTableComponent;
    }());
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
    var   /**
     * Used to display more actions column and the end of the table
     */
    TgrMoreActions = /** @class */ (function () {
        /**
         * @param actions Rows action data
         * @param id Id field name currently deprecated
         * @param name Actions column name
         * @param callback Rows callback function for data sanitization
         */
        function TgrMoreActions(actions, id, name, callback) {
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
        return TgrMoreActions;
    }());
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
    var StewardClientModule = /** @class */ (function () {
        function StewardClientModule() {
        }
        /**
         * @param {?} config
         * @param {?=} clientDetails
         * @return {?}
         */
        StewardClientModule.forRoot = /**
         * @param {?} config
         * @param {?=} clientDetails
         * @return {?}
         */
        function (config, clientDetails) {
            return {
                ngModule: StewardClientModule,
                providers: [{ provide: StewardConfig, useValue: config }, { provide: ClientDetails, useValue: clientDetails }]
            };
        };
        StewardClientModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            common.CommonModule,
                            http.HttpClientModule,
                            material.MatInputModule,
                            material.MatTableModule,
                            material.MatCheckboxModule,
                            material.MatIconModule,
                            material.MatDatepickerModule,
                            material.MatNativeDateModule,
                            material.MatPaginatorModule,
                            material.MatSelectModule,
                            material.MatButtonModule,
                            material.MatSortModule,
                            material.MatMenuModule,
                            material.MatProgressSpinnerModule,
                            material.MatAutocompleteModule
                        ],
                        declarations: [
                            StewardClientComponent,
                            TgrMaterialTableComponent,
                        ],
                        exports: [StewardClientComponent, TgrMaterialTableComponent,]
                    },] }
        ];
        return StewardClientModule;
    }());

    exports.APP_DATE_FORMATS = APP_DATE_FORMATS;
    exports.AppDateAdapter = AppDateAdapter;
    exports.ClientDetails = ClientDetails;
    exports.Page = Page;
    exports.ResponseWrapper = ResponseWrapper;
    exports.Sort = Sort;
    exports.StewardClientComponent = StewardClientComponent;
    exports.StewardClientModule = StewardClientModule;
    exports.StewardClientService = StewardClientService;
    exports.StewardConfig = StewardConfig;
    exports.TgrDynamicControl = TgrDynamicControl;
    exports.TgrInput = TgrInput;
    exports.TgrMaterialTableComponent = TgrMaterialTableComponent;
    exports.TgrMoreActions = TgrMoreActions;
    exports.TgrSelect = TgrSelect;
    exports.TgrSelectOption = TgrSelectOption;
    exports.TgrTextarea = TgrTextarea;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=steward-client.umd.js.map
