(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@swimlane/ngx-datatable'), require('queue-typescript'), require('@angular/cdk/collections'), require('@angular/material/core'), require('@angular/material'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('steward-client', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/forms', '@swimlane/ngx-datatable', 'queue-typescript', '@angular/cdk/collections', '@angular/material/core', '@angular/material', '@angular/common'], factory) :
    (factory((global['steward-client'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,global.ng.forms,null,null,global.ng.cdk.collections,global.ng.material.core,global.ng.material,global.ng.common));
}(this, (function (exports,core,http,rxjs,operators,forms,ngxDatatable,queueTypescript,collections,core$1,material,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Wraps server response
     * @template T
     */
    var /**
     * Wraps server response
     * @template T
     */ ResponseWrapper = (function () {
        function ResponseWrapper() {
        }
        return ResponseWrapper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StewardConfig = (function () {
        function StewardConfig() {
        }
        return StewardConfig;
    }());
    /**
     * @template T, E
     */
    var StewardClientService = (function () {
        function StewardClientService(http$$1, config) {
            this.http = http$$1;
            this.config = config;
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
            if (config.access_token) {
                //append access token if the environment has access token
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
                if (this.config.access_token) {
                    //update token header
                    this.headers.set("Authorization", "Bearer " + token);
                }
                else {
                    //append access token if the environment has access token
                    this.headers = this.headers.append('Authorization', "Bearer " + token);
                }
            };
        /**
         * Used to handle http post requests
         * @param endpoint expects either an endpoint or url
         * @param data a valid object
         */
        /**
         * Used to handle http post requests
         * @param {?} endpoint expects either an endpoint or url
         * @param {?} data a valid object
         * @return {?}
         */
        StewardClientService.prototype.post = /**
         * Used to handle http post requests
         * @param {?} endpoint expects either an endpoint or url
         * @param {?} data a valid object
         * @return {?}
         */
            function (endpoint, data) {
                return this.http.post(this.serviceURL(endpoint), JSON.stringify(data), { headers: this.headers }).pipe(operators.catchError(this.handleError()));
            };
        /**
         * Used to handle http post requests
         * @param endpoint expects either an endpoint or url
         */
        /**
         * Used to handle http post requests
         * @param {?} endpoint expects either an endpoint or url
         * @param {?} data
         * @return {?}
         */
        StewardClientService.prototype.put = /**
         * Used to handle http post requests
         * @param {?} endpoint expects either an endpoint or url
         * @param {?} data
         * @return {?}
         */
            function (endpoint, data) {
                return this.http.put(this.serviceURL(endpoint), JSON.stringify(data), { headers: this.headers }).pipe(operators.catchError(this.handleError()));
            };
        /**
         * Handles http delete request
         * @param endpoint expects either an endpoint or url
         * @param data
         */
        /**
         * Handles http delete request
         * @param {?} endpoint expects either an endpoint or url
         * @param {?} data
         * @return {?}
         */
        StewardClientService.prototype.delete = /**
         * Handles http delete request
         * @param {?} endpoint expects either an endpoint or url
         * @param {?} data
         * @return {?}
         */
            function (endpoint, data) {
                return this.http.request('delete', this.serviceURL(endpoint), { headers: this.headers, body: JSON.stringify(data) }).pipe(operators.catchError(this.handleError()));
            };
        /**
         * Handles http get request
         * @param endpoint expects either an endpoint or url
         * @param data
         */
        /**
         * Handles http get request
         * @param {?} endpoint expects either an endpoint or url
         * @param {?=} data
         * @return {?}
         */
        StewardClientService.prototype.get = /**
         * Handles http get request
         * @param {?} endpoint expects either an endpoint or url
         * @param {?=} data
         * @return {?}
         */
            function (endpoint, data) {
                /** @type {?} */
                var options = {
                    headers: this.headers,
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
                /** @type {?} */
                var formData = new FormData();
                Object.keys(data).forEach(function (key) {
                    formData.append(key, data[key]);
                });
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
                /** @type {?} */
                var formData = new FormData();
                Object.keys(data).forEach(function (key) {
                    if (Array.isArray(data[key])) {
                        data[key].forEach(function (k2) {
                            formData.append(key, k2);
                        });
                    }
                    else {
                        formData.append(key, data[key]);
                    }
                });
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
                /** @type {?} */
                var formData = new FormData();
                Object.keys(data).forEach(function (key) {
                    if (Array.isArray(data[key])) {
                        data[key].forEach(function (k2) {
                            formData.append(key, k2);
                        });
                    }
                    else {
                        formData.append(key, data[key]);
                    }
                });
                return this.http.put(this.serviceURL(endpoint), formData, { headers: new http.HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(operators.catchError(this.handleError()));
            };
        /**
         * Convert map to HttpParams
         * @param {?} data
         * @return {?}
         */
        StewardClientService.prototype.getHttpParams = /**
         * Convert map to HttpParams
         * @param {?} data
         * @return {?}
         */
            function (data) {
                if (data == undefined) {
                    return new http.HttpParams();
                }
                /** @type {?} */
                var httpParams = new http.HttpParams();
                data.forEach(function (value, key) {
                    httpParams = httpParams.append(key, value);
                });
                return httpParams;
            };
        /**
         * Used to catch exception thrown by http client returns internal server error
         * if status 500 is encountered
         * @template ResponseWrapper
         * @return {?}
         */
        StewardClientService.prototype.handleError = /**
         * Used to catch exception thrown by http client returns internal server error
         * if status 500 is encountered
         * @template ResponseWrapper
         * @return {?}
         */
            function () {
                return function (error) {
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
                };
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
                return this.http.get(this.serviceURL(endpoint), options).pipe(operators.catchError(this.handleError()));
            };
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
        StewardClientService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        StewardClientService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: StewardConfig }
            ];
        };
        return StewardClientService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StewardClientComponent = (function () {
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
                        selector: 'stw-steward-client',
                        template: "\n    <p>\n      steward-client works!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        StewardClientComponent.ctorParameters = function () { return []; };
        return StewardClientComponent;
    }());

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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Datable page used to wrapper server content response
     * @template T
     */
    var /**
     * Datable page used to wrapper server content response
     * @template T
     */ Page = (function () {
        function Page() {
            /**
             * Number of items per page same as limit
             */
            this.size = 10;
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
    /**
     * used to map sort request
     */
    var /**
     * used to map sort request
     */ Sort = (function () {
        function Sort() {
            this.sorted = false;
            this.unsorted = true;
        }
        return Sort;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Represents dynamic html controls (Input, TextArea and Select)
     * @template T
     */
    var /**
     * Represents dynamic html controls (Input, TextArea and Select)
     * @template T
     */ TgrDynamicControl = (function () {
        function TgrDynamicControl(label, name, controlType, icon, isRequired, placeholder) {
            if (icon === void 0) {
                icon = "fa fa-file-text-o";
            }
            if (isRequired === void 0) {
                isRequired = false;
            }
            if (placeholder === void 0) {
                placeholder = null;
            }
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
    /**
     * Used to represent html input with options:
     * type: default to text,  maxLength, minLength, min, max
     */
    var /**
     * Used to represent html input with options:
     * type: default to text,  maxLength, minLength, min, max
     */ TgrInput = (function () {
        function TgrInput(type) {
            if (type === void 0) {
                type = "text";
            }
            this.type = type;
            this.minLength = this.min = 0;
            this.maxLength = 4000;
            this.max = 1000000000;
        }
        return TgrInput;
    }());
    /**
     * Represents html textarea input
     */
    var /**
     * Represents html textarea input
     */ TgrTextarea = (function () {
        function TgrTextarea(cols, rows) {
            if (cols === void 0) {
                cols = 5;
            }
            if (rows === void 0) {
                rows = 1;
            }
            this.cols = cols;
            this.rows = rows;
            this.maxLength = 4000;
            this.minLength = 0;
        }
        return TgrTextarea;
    }());
    /**
     * Represents html select control
     */
    var /**
     * Represents html select control
     */ TgrSelect = (function () {
        function TgrSelect(options) {
            this.options = options;
        }
        return TgrSelect;
    }());
    var TgrSelectOption = (function () {
        function TgrSelectOption(value, text) {
            if (text === void 0) {
                text = null;
            }
            this.value = value;
            this.text = text ? text : value;
        }
        return TgrSelectOption;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Format angular date to dd-mm-yyyy
     */
    var /**
     * Format angular date to dd-mm-yyyy
     */ AppDateAdapter = (function (_super) {
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
    /** *
     * Material date formats
      @type {?} */
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
    var TgrMaterialTableComponent = (function () {
        function TgrMaterialTableComponent(sterwardService) {
            this.sterwardService = sterwardService;
            this.displayedColumns = ["checkbox"];
            this.selection = new collections.SelectionModel(true, []);
            this.rowSelection = new core.EventEmitter();
            this.columns = [];
            this.enableCheckbox = true;
            this.actionsEvent = new core.EventEmitter();
            this.filterComponents = [];
            this.showDefaultFilters = true;
            this.selected = [];
            this.filter = {};
            /**
             * Checks if server request has been processed
             */
            this.isLoadingResults = false;
            this.page = new Page();
            this.page.content = [];
            this.datePipe = new common.DatePipe("en-US");
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
                this.columns.forEach(function (c) {
                    _this.displayedColumns.push(c.fieldName);
                });
                if (this.moreActions) {
                    this.displayedColumns.push("actions");
                }
                else {
                    console.debug("moreActions not injected skipping rendering 'More Actions' column");
                }
                /** @type {?} */
                var group = {};
                this.filterComponents.forEach(function (comp) {
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
                });
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
                    this.page.content.forEach(function (row) { return _this.selection.select(row); });
            };
        /**
         * Used to emit click event of the actions
         * @param event
         */
        /**
         * Used to emit click event of the actions
         * @param {?} event
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.onActionClick = /**
         * Used to emit click event of the actions
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.actionsEvent.emit(event);
            };
        /**
         * Process server request of datable
         * @param pageInfo
         * @param filters
         */
        /**
         * Process server request of datable
         * @param {?} pageInfo
         * @param {?} filters
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.loadPage = /**
         * Process server request of datable
         * @param {?} pageInfo
         * @param {?} filters
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
                    this.params.forEach(function (value, key) {
                        if (key != null && key != undefined) {
                            //ignore null values
                            request.set(key, value);
                        }
                    });
                }
                request.set("page", pageInfo.offset);
                request.set("size", pageInfo.limit);
                this.sterwardService.get(this.endpoint, request).subscribe(function (response) {
                    if (response.status == 200) {
                        _this.page = response.data;
                    }
                    _this.isLoadingResults = false;
                }, function (error) {
                    console.debug("Server request has failed");
                    _this.isLoadingResults = false;
                });
            };
        /**
         * Used tolisten to pagination events/actions
         * @param page
         */
        /**
         * Used tolisten to pagination events/actions
         * @param {?} page
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.pageEvent = /**
         * Used tolisten to pagination events/actions
         * @param {?} page
         * @return {?}
         */
            function (page) {
                this.loadPage({ limit: page.pageSize, offset: page.pageIndex }, this.getFilters());
            };
        /**
         * Used to processing table sorting
         * @param event
         */
        /**
         * Used to processing table sorting
         * @param {?} event
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.processSorting = /**
         * Used to processing table sorting
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.sortParams = event;
                this.loadPage({ limit: this.page.size, offset: 0 }, this.getFilters());
            };
        /**
         * Used to get filter entries from the filter form. Also adds sort parameters to request
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.getFilters = /**
         * Used to get filter entries from the filter form. Also adds sort parameters to request
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var f = new Map();
                Object.keys(this.filterForm.value).forEach(function (val, key) {
                    // console.debug("Key is " + key + " and value " + val);
                    if (_this.filterForm.value[val]) {
                        if (val == 'from' || val == "to") {
                            f.set(val, _this.datePipe.transform(_this.filterForm.value[val], 'yyyy-MM-dd'));
                        }
                        else {
                            f.set(val, _this.filterForm.value[val]);
                        }
                    }
                });
                //add sorting parameters
                if (this.sortParams) {
                    f.set("sort", this.sortParams.active + "," + this.sortParams.direction);
                }
                return f;
            };
        /**
         * Used to process table filter. If date filter is not provide the from value is
         * set to 2018-01-01 and to value is set to 1 year from today
         * @param form
         * @deprecated
         */
        /**
         * Used to process table filter. If date filter is not provide the from value is
         * set to 2018-01-01 and to value is set to 1 year from today
         * @deprecated
         * @param {?} form
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.processFilter = /**
         * Used to process table filter. If date filter is not provide the from value is
         * set to 2018-01-01 and to value is set to 1 year from today
         * @deprecated
         * @param {?} form
         * @return {?}
         */
            function (form) {
                //@ts-ignore
                this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
            };
        /**
         * Used to check if miliki control is input
         * @param control
         */
        /**
         * Used to check if miliki control is input
         * @param {?} control
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.isInput = /**
         * Used to check if miliki control is input
         * @param {?} control
         * @return {?}
         */
            function (control) {
                return control instanceof TgrInput;
            };
        /**
         * Used to check if miliki control is select
         * @param control
         */
        /**
         * Used to check if miliki control is select
         * @param {?} control
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.isSelect = /**
         * Used to check if miliki control is select
         * @param {?} control
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
         * @param date
         */
        /**
         * Used to format date to string yyyy-MM-dd
         * @param {?} date
         * @return {?}
         */
        TgrMaterialTableComponent.prototype.getFormattedDate = /**
         * Used to format date to string yyyy-MM-dd
         * @param {?} date
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
                var k = column.fieldName.split(".");
                /** @type {?} */
                var keys = new (queueTypescript.Queue.bind.apply(queueTypescript.Queue, __spread([void 0], k)))();
                /** @type {?} */
                var value = this.getObjectValue(data, keys);
                return column.isDateColumn ? this.datePipe.transform(value, 'medium') : value;
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
        TgrMaterialTableComponent.prototype.getObjectValue = /**
         * Used to find key value based on the key sequence provided
         * @param {?} data expects an object
         * @param {?} keys i.e. user.gender.type.type
         * @return {?}
         */
            function (data, keys) {
                var _this = this;
                if ((!(data instanceof Object)) || (keys.length == 1)) {
                    return data[keys.tail];
                }
                /** @type {?} */
                var value = null;
                Object.keys(data).forEach(function (key) {
                    if ((key == keys.front) && (data[key] instanceof Object)) {
                        value = _this.getObjectValue(data[key], keys);
                    }
                    else if (key == keys.tail) {
                        value = data[key];
                    }
                });
                return value;
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
                console.debug("Refreshed data tables");
                //@ts-ignore
                this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
            };
        TgrMaterialTableComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'tgr-material-table',
                        template: "<div class=\"row\"  *ngIf=\"showDefaultFilters || filterComponents.length > 0\">\n  <div class=\"col-md-12\">\n    <div class=\"card card-outline-default mat-elevation-z4\">\n      <div class=\"card-body\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"mat-table-filter\">\n                <button title=\"Refresh\" (click) = \"refreshTable()\" mat-icon-button color=\"basic\" type=\"reset\"><mat-icon>refresh</mat-icon></button>\n            </div>\n          </div>\n        </div>\n        <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n          <div class=\"row\">\n            <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n              <!-- Intialize form select control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isSelect(control.controlType)\">\n                <mat-select [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\">\n                  <mat-option *ngFor=\"let o of control.controlType.options\" [value]=\"o.value\">\n                    {{o.text}}\n                  </mat-option>\n                </mat-select>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form textarea control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isTextArea(control.controlType)\">\n                <textarea matInput [formControlName]=\"control.name\" [placeholder]=\"control.label\" [cols]=\"control.controlType.cols\"\n                  [rows]=\"control.controlType.rows\"></textarea>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form input control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isInput(control.controlType)\">\n                <!-- <mat-icon matPrefix class=\"material-icons icon-margin-right\">perm_identity</mat-icon> -->\n                <input matInput [placeholder]=\"control.label\" [type]=\"control.controlType.type\" [formControlName]=\"control.name\" />\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than\n                  {{control.controlType.min}}</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than\n                  {{control.controlType.max}}</mat-error>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <!-- <mat-icon matPrefix class=\"material-icons col-md-3\">date_range</mat-icon> -->\n              <mat-form-field class=\"col-md-12\">\n                <input matInput placeholder=\"From\" type=\"date\" [matDatepicker]=\"picker\" formControlName=\"from\" />\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <!-- <mat-icon>home</mat-icon> -->\n                <input matInput placeholder=\"To\" type=\"date\" [matDatepicker]=\"toPicker\" formControlName=\"to\" />\n                <mat-datepicker-toggle matSuffix [for]=\"toPicker\"></mat-datepicker-toggle>\n                <mat-datepicker #toPicker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <input matInput maxlength=\"100\" placeholder=\"Search\" type=\"text\" formControlName=\"needle\" />\n              </mat-form-field>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n            </span>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"pull-right mat-table-filter\">\n                <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"filterForm.invalid\">Filter</button>\n                <button mat-raised-button color=\"basic\" type=\"reset\">Reset</button>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <div class=\"mat-table-loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n    <table mat-table [dataSource]=\"page.content\" class=\"mat-elevation-z8\" style=\"width: 100%\" matSort (matSortChange)=\"processSorting($event)\">\n\n      <!--- Note that these columns can be defined in any order.\n          The actual rendered columns are set as a property on the row definition\" -->\n\n      <!-- Position Column -->\n      <ng-container matColumnDef=\"checkbox\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\" [checked]=\"selection.hasValue() && isAllSelected()\"\n            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n          </mat-checkbox>\n        </th>\n        <!-- <td mat-cell *matCellDef=\"let element\"> <mat-checkbox></mat-checkbox> </td> -->\n        <td mat-cell *matCellDef=\"let row\">\n          <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\" [checked]=\"selection.isSelected(row)\">\n          </mat-checkbox>\n        </td>\n      </ng-container>\n\n      <!-- Fields Columns -->\n      <ng-container [matColumnDef]=\"c.fieldName\" *ngFor=\"let c of columns\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header [class.hide_on_xs]=\"c.hideOnXs\"> {{c.columnName}} </th>\n        <td mat-cell *matCellDef=\"let element\" [class.hide_on_xs]=\"c.hideOnXs\"> \n          <!-- {{c.isDateColumn ?\n          (getFieldValue(element, c) | date:'medium') :\n          getFieldValue(element, c)}} -->\n           <div [innerHtml] = \"getFieldValue(element, c)\"></div></td>\n      </ng-container>\n\n      <!-- Other Column -->\n      <ng-container matColumnDef=\"actions\" *ngIf=\"moreActions\">\n        <th mat-header-cell *matHeaderCellDef> {{moreActions.name}} </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n            <mat-icon>list</mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item *ngFor=\"let action of moreActions.actions\" (click)=\"onActionClick({id: element[moreActions.idFieldName], actionName: action.actionName})\">{{action.actionName}}</button>\n          </mat-menu>\n        </td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n    <mat-paginator (page)=\"pageEvent($event)\" [length]=\"page.totalElements\" [pageSize]=\"20\" [pageSizeOptions]=\"[1, 5, 10, 20, 50, 100, 200]\">\n    </mat-paginator>\n  </div>\n</div>",
                        styles: [".mat-table-filter button{margin-right:8px;float:right}@media (max-width:576px){.hide_on_xs{display:none}}.mat-table-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}"],
                        providers: [
                            { provide: core$1.DateAdapter, useClass: AppDateAdapter },
                            {
                                provide: core$1.MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
                            }
                        ]
                    },] },
        ];
        /** @nocollapse */
        TgrMaterialTableComponent.ctorParameters = function () {
            return [
                { type: StewardClientService }
            ];
        };
        TgrMaterialTableComponent.propDecorators = {
            selection: [{ type: core.Output }],
            rowSelection: [{ type: core.Output }],
            sort: [{ type: core.ViewChild, args: [material.MatSort,] }],
            columns: [{ type: core.Input }],
            enableCheckbox: [{ type: core.Input }],
            endpoint: [{ type: core.Input }],
            moreActions: [{ type: core.Input }],
            actionsEvent: [{ type: core.Output }],
            filterComponents: [{ type: core.Input }],
            params: [{ type: core.Input }],
            showDefaultFilters: [{ type: core.Input }],
            table: [{ type: core.ViewChild, args: [ngxDatatable.DatatableComponent,] }]
        };
        return TgrMaterialTableComponent;
    }());
    /**
     * Used to display more actions column and the end of the table
     */
    var /**
     * Used to display more actions column and the end of the table
     */ TgrMoreActions = (function () {
        function TgrMoreActions(actions, id, name) {
            /**
             * Action Column name e.g. More Actions
             */
            this.name = "Actions";
            /**
             * Field name id from the server response e.g userId
             */
            this.idFieldName = "id";
            this.actions = actions;
            this.name = name;
            this.idFieldName = id;
        }
        return TgrMoreActions;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StewardClientModule = (function () {
        function StewardClientModule() {
        }
        /**
         * @param {?} config
         * @return {?}
         */
        StewardClientModule.forRoot = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: StewardClientModule,
                    providers: [{ provide: StewardConfig, useValue: config }]
                };
            };
        StewardClientModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            ngxDatatable.NgxDatatableModule,
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
                            material.MatProgressSpinnerModule
                        ],
                        declarations: [
                            StewardClientComponent,
                            TgrMaterialTableComponent
                        ],
                        exports: [StewardClientComponent, TgrMaterialTableComponent]
                    },] },
        ];
        return StewardClientModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.StewardConfig = StewardConfig;
    exports.StewardClientService = StewardClientService;
    exports.StewardClientComponent = StewardClientComponent;
    exports.StewardClientModule = StewardClientModule;
    exports.Page = Page;
    exports.Sort = Sort;
    exports.ResponseWrapper = ResponseWrapper;
    exports.AppDateAdapter = AppDateAdapter;
    exports.APP_DATE_FORMATS = APP_DATE_FORMATS;
    exports.TgrMaterialTableComponent = TgrMaterialTableComponent;
    exports.TgrMoreActions = TgrMoreActions;
    exports.TgrDynamicControl = TgrDynamicControl;
    exports.TgrInput = TgrInput;
    exports.TgrTextarea = TgrTextarea;
    exports.TgrSelect = TgrSelect;
    exports.TgrSelectOption = TgrSelectOption;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlci50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy90Z3ItZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvdGdyLW1hdGVyaWFsLXRhYmxlL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9zdGV3YXJkLWNsaWVudC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXcmFwcyBzZXJ2ZXIgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlV3JhcHBlcjxUPiB7XG4gICAgLyoqXG4gICAgICogSHR0cCBzdGF0dXMgY29kZSBlLmcuIDIwMFxuICAgICAqL1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNlcnZlciBtZXNzYWdlXG4gICAgICovXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFjdHVhbCByZXNwb25zZSBkYXRhXG4gICAgICovXG4gICAgZGF0YTogVDtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ29uZmlnIHtcclxuICAgIGJhc2VfdXJsOiBzdHJpbmc7XHJcbiAgICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFQsIEU+IHtcclxuXHJcbiAgICBwcml2YXRlIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xyXG4gICAgdG9rZW46IHN0cmluZztcclxuICAgIGJhc2VfdXJsOiBzdHJpbmcgPSBcIi9cIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5iYXNlX3VybCA9IGNvbmZpZy5iYXNlX3VybDtcclxuICAgICAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnLmFjY2Vzc190b2tlbikgey8vYXBwZW5kIGFjY2VzcyB0b2tlbiBpZiB0aGUgZW52aXJvbm1lbnQgaGFzIGFjY2VzcyB0b2tlblxyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgXCJCZWFyZXIgXCIgKyBjb25maWcuYWNjZXNzX3Rva2VuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVXNlZCB0byB1cGRhdGUgYXV0aG9yaXphdGlvbiB0b2tlbi4gQ3VycmVudGx5IHN1cHBvcnRzIGJlYXJlciB0b2tlblxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdG9rZW4gXHJcbiAgICAgKi9cclxuICAgIHNldFRva2VuKHRva2VuOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL3VwZGF0ZSB0b2tlbiBoZWFkZXJcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbik7XHJcbiAgICAgICAgfSBlbHNley8vYXBwZW5kIGFjY2VzcyB0b2tlbiBpZiB0aGUgZW52aXJvbm1lbnQgaGFzIGFjY2VzcyB0b2tlbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgXCJCZWFyZXIgXCIgKyB0b2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHBvc3QoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKi9cclxuICAgIHB1dChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBodHRwIGRlbGV0ZSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBnZXQgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2ggYSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgZ2V0RmlsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCkgKyAnP2FjY2Vzc190b2tlbj0nICsgdGhpcy50b2tlbiwgb3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBpZlxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0gaGVhZGVycyBcclxuICAgICAqL1xyXG4gICAgcG9zdEZvcm1EYXRhKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodGhpcy5oZWFkZXJzLmdldChcIkF1dGhvcml6YXRpb25cIikgJiYgKCFoZWFkZXJzKSl7XHJcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKCFoZWFkZXJzKXtcclxuICAgICAgICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZSBodHRwIGZvcm0gZGF0YSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSkgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBodHRwIHB1dCBmb3JtIGRhdGEgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1dEZvcm1EYXRhTXVsdGlQYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgbWFwIHRvIEh0dHBQYXJhbXNcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xyXG4gICAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlV3JhcHBlcigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZW5kZXJNb3JlKGlkOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgZGF0YXRhYmxlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYSB2YWxpZCBtYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGlmIGEgc3RyaW5nIGlzIGEgdmFsaWQgVVJMXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1VSTCh1cmw6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IFVSTCh1cmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgXHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUgdXJsIHBhcmFtZXRlciBpcyBhbiBlbmRwb2ludCBpdCBhcHBlbmRzIHRvIHRoZSBiYXNlIHVybFxyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqIEBzZWUgYmFzZV91cmxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlVVJMKHVybDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiAodGhpcy5pc1VSTCh1cmwpKSA/IHVybCA6IHRoaXMuYmFzZV91cmwgKyB1cmw7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LXN0ZXdhcmQtY2xpZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHA+XHJcbiAgICAgIHN0ZXdhcmQtY2xpZW50IHdvcmtzIVxyXG4gICAgPC9wPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKipcbiAqIERhdGFibGUgcGFnZSB1c2VkIHRvIHdyYXBwZXIgc2VydmVyIGNvbnRlbnQgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2U8VD4ge1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XG4gICAgICovXG4gICAgc2l6ZTogbnVtYmVyID0gMTA7XG4gICAgLyoqXG4gICAgICogVG90YWwgaXRlbXMgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXJcbiAgICAgKi9cbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFRvdGFsIG51bWJlciBvZiBwYWdlcyBwcmVzZW50XG4gICAgICovXG4gICAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcbiAgICAgKi9cbiAgICBmaXJzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGl0IGlzIHRoZSBsYXN0IHBhZ2VcbiAgICAgKi9cbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdHVhbCBwYWdlIGNvbnRlbnRcbiAgICAgKi9cbiAgICBjb250ZW50OiBBcnJheTxUPiA9IFtdO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIHNvcnRlZDogU29ydCA9IG5ldyBTb3J0KCk7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBwYWdlIG51bWJlclxuICAgICAqL1xuICAgIG51bWJlcjogbnVtYmVyID0gMDtcbn1cbi8qKlxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBTb3J0e1xuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHVuc29ydGVkOiBib29sZWFuID0gdHJ1ZTtcbn1cbiIsIi8qKlxuICogUmVwcmVzZW50cyBkeW5hbWljIGh0bWwgY29udHJvbHMgKElucHV0LCBUZXh0QXJlYSBhbmQgU2VsZWN0KVxuICovXG5leHBvcnQgY2xhc3MgVGdyRHluYW1pY0NvbnRyb2w8VD4ge1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgbGFiZWxcbiAgICAgKi9cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEljb24gdG8gYmUgYXBwZW5kZWQgYmVmb3JlIHRoZSBjb250cm9sIChzdXBwb3J0cyBjbGFzcyBkZWZpbmVkIGljb25zKVxuICAgICAqL1xuICAgIGljb246IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBjb250cm9sIChwcm92aWRlIHZhcmlhYmxlIHZhbGlkIG5hbWVzIGllLiBubyBzcGFjZXMgcHJlZmFyYWJseSBhcGkgY29ycmVzcG9uZGluZyBuYW1lcyBlLmcuIHVzZXJOYW1lKVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0dWFsIGNvbnRyb2wgKFRncklucHV0LCBUZ3JUZXh0QXJlYSAmIFRnclNlbGVjdClcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogVDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGZpZWxkIGlzIHJlcXVpcmVkXG4gICAgICovXG4gICAgaXNSZXF1aXJlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNvbnRyb2xUeXBlOiBULCBpY29uOiBzdHJpbmcgPSBcImZhIGZhLWZpbGUtdGV4dC1vXCIsXG4gICAgICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZSwgcGxhY2Vob2xkZXI6IHN0cmluZyA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gY29udHJvbFR5cGU7XG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciA/IHBsYWNlaG9sZGVyIDogbGFiZWw7XG4gICAgfVxuXG59XG4vKipcbiAqIFVzZWQgdG8gcmVwcmVzZW50IGh0bWwgaW5wdXQgd2l0aCBvcHRpb25zOlxuICogdHlwZTogZGVmYXVsdCB0byB0ZXh0LCAgbWF4TGVuZ3RoLCBtaW5MZW5ndGgsIG1pbiwgbWF4XG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JJbnB1dHtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIGlucHV0IGUuZy4gdGV4dCwgbnVtYmVyLCBkYXRlXG4gICAgICovXG4gICAgdHlwZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbGVuZ3RoIG9mIHRoZSBpbnB1dFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtaW46IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtYXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZyA9IFwidGV4dFwiKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gdGhpcy5taW4gPSAwO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWF4ID0gMTAwMDAwMDAwMDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHRleHRhcmVhIGlucHV0XG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JUZXh0YXJlYXtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgdGV4dGFyZWEgY29sdW1uc1xuICAgICAqL1xuICAgIGNvbHM/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHRleHRhcmVhIHJvd3NcbiAgICAgKi9cbiAgICByb3dzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1heGltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbHM6IG51bWJlciA9IDUsIHJvd3M6IG51bWJlciA9IDEpe1xuICAgICAgICB0aGlzLmNvbHMgPSBjb2xzO1xuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gMFxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGh0bWwgc2VsZWN0IGNvbnRyb2xcbiAqL1xuZXhwb3J0IGNsYXNzIFRnclNlbGVjdCB7XG4gICAgLyoqXG4gICAgICogU2VsZWN0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBvcHRpb25zOiBBcnJheTxUZ3JTZWxlY3RPcHRpb24+O1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQXJyYXk8VGdyU2VsZWN0T3B0aW9uPil7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBUZ3JTZWxlY3RPcHRpb257XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBPcHRpb24gdGV4dC9sYWJlbFxuICAgICAqL1xuICAgIHRleHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyA9IG51bGwpe1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQgPyB0ZXh0IDogdmFsdWU7XG4gICAgfVxuXG59XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UnO1xuaW1wb3J0IHsgTWxrRHluYW1pY0NvbnRyb2wsIE1sa0lucHV0LCBNbGtUZXh0YXJlYSwgTWxrU2VsZWN0IH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvbWxrLWR5bmFtaWMtY29udHJvbCc7XG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFMsIE1BVF9EQVRFX0xPQ0FMRSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlRGF0ZUFkYXB0ZXIsIFBhZ2VFdmVudCwgTWF0U29ydCwgU29ydCB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgVGdyRHluYW1pY0NvbnRyb2wsIFRncklucHV0LCBUZ3JTZWxlY3QsIFRnclRleHRhcmVhIH0gZnJvbSAnLi4vZW50aXRpZXMvdGdyLWR5bmFtaWMtY29udHJvbCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogRm9ybWF0IGFuZ3VsYXIgZGF0ZSB0byBkZC1tbS15eXl5XG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBEYXRlQWRhcHRlciBleHRlbmRzIE5hdGl2ZURhdGVBZGFwdGVyIHtcblxuICAvKipcbiAgICogUGFyc2UgZGF0ZSB0byBkZC1tbS15eXl5XG4gICAqIEBwYXJhbSBkYXRlICBkYXRlIGlucHV0XG4gICAqIEBwYXJhbSBkaXNwbGF5Rm9ybWF0IGV4cGVjdHMgdG8gYmUgaW5wdXQgc3RyaW5nXG4gICAqL1xuICBmb3JtYXQoZGF0ZTogRGF0ZSwgZGlzcGxheUZvcm1hdDogT2JqZWN0KTogc3RyaW5nIHtcblxuICAgIGlmIChkaXNwbGF5Rm9ybWF0ID09PSAnaW5wdXQnKSB7XG5cbiAgICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgbGV0IGRheVN0cmluZzogc3RyaW5nO1xuICAgICAgbGV0IG1vbnRoU3RyaW5nOiBzdHJpbmc7XG5cbiAgICAgIGlmIChkYXkgPCAxMCkge1xuICAgICAgICBkYXlTdHJpbmcgPSAnMCcgKyBkYXk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXlTdHJpbmcgPSAnJyArIGRheTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcbiAgICAgICAgbW9udGhTdHJpbmcgPSAnMCcgKyBtb250aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vbnRoU3RyaW5nID0gJycgKyBtb250aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGhTdHJpbmd9LSR7ZGF5U3RyaW5nfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGUudG9EYXRlU3RyaW5nKCk7XG4gIH1cbn1cbi8qKlxuICogTWF0ZXJpYWwgZGF0ZSBmb3JtYXRzXG4gKi9cbmV4cG9ydCBjb25zdCBBUFBfREFURV9GT1JNQVRTID1cbntcbiAgcGFyc2U6IHtcbiAgICBkYXRlSW5wdXQ6IHsgbW9udGg6ICdudW1lcmljJywgeWVhcjogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9LFxuICB9LFxuICBkaXNwbGF5OiB7XG4gICAgZGF0ZUlucHV0OiAnaW5wdXQnLFxuICAgIG1vbnRoWWVhckxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJyB9LFxuICAgIGRhdGVBMTF5TGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9LFxuICAgIG1vbnRoWWVhckExMXlMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycgfSxcbiAgfVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0Z3ItbWF0ZXJpYWwtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJyb3dcIiAgKm5nSWY9XCJzaG93RGVmYXVsdEZpbHRlcnMgfHwgZmlsdGVyQ29tcG9uZW50cy5sZW5ndGggPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLW91dGxpbmUtZGVmYXVsdCBtYXQtZWxldmF0aW9uLXo0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0LXRhYmxlLWZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdGl0bGU9XCJSZWZyZXNoXCIgKGNsaWNrKSA9IFwicmVmcmVzaFRhYmxlKClcIiBtYXQtaWNvbi1idXR0b24gY29sb3I9XCJiYXNpY1wiIHR5cGU9XCJyZXNldFwiPjxtYXQtaWNvbj5yZWZyZXNoPC9tYXQtaWNvbj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGZvcm0gKG5nU3VibWl0KT1cInByb2Nlc3NGaWx0ZXIoZmlsdGVyRm9ybSlcIiBbZm9ybUdyb3VwXT1cImZpbHRlckZvcm1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgIG1iLTNcIiAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiBmaWx0ZXJDb21wb25lbnRzXCI+XG4gICAgICAgICAgICAgIDwhLS0gSW50aWFsaXplIGZvcm0gc2VsZWN0IGNvbnRyb2wgLS0+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIj5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XG4gICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIiBbdmFsdWVdPVwiby52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7e28udGV4dH19XG4gICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdyZXF1aXJlZCcpXCI+e3tjb250cm9sLnBsYWNlaG9sZGVyfX1cbiAgICAgICAgICAgICAgICAgIGlzIHJlcXVpcmVkPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgICAgICAgICAgPCEtLSBJbnRpYWxpemUgZm9ybSB0ZXh0YXJlYSBjb250cm9sIC0tPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIiAqbmdJZj1cImlzVGV4dEFyZWEoY29udHJvbC5jb250cm9sVHlwZSlcIj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIiBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5sYWJlbFwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiXG4gICAgICAgICAgICAgICAgICBbcm93c109XCJjb250cm9sLmNvbnRyb2xUeXBlLnJvd3NcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdyZXF1aXJlZCcpXCI+e3tjb250cm9sLnBsYWNlaG9sZGVyfX1cbiAgICAgICAgICAgICAgICAgIGlzIHJlcXVpcmVkPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbmxlbmd0aCcpXCI+TWluaW11bSBvZlxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbkxlbmd0aH19IGNoYXJhY3RlcnM8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX0gY2hhcmFjdGVyczwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgICAgICAgICAgIDwhLS0gSW50aWFsaXplIGZvcm0gaW5wdXQgY29udHJvbCAtLT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCIgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCI+XG4gICAgICAgICAgICAgICAgPCEtLSA8bWF0LWljb24gbWF0UHJlZml4IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgaWNvbi1tYXJnaW4tcmlnaHRcIj5wZXJtX2lkZW50aXR5PC9tYXQtaWNvbj4gLS0+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtwbGFjZWhvbGRlcl09XCJjb250cm9sLmxhYmVsXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIiAvPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdyZXF1aXJlZCcpXCI+e3tjb250cm9sLnBsYWNlaG9sZGVyfX1cbiAgICAgICAgICAgICAgICAgIGlzIHJlcXVpcmVkPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbmxlbmd0aCcpXCI+TWluaW11bSBvZlxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbkxlbmd0aH19IGNoYXJhY3RlcnM8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX0gY2hhcmFjdGVyczwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW5cbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW59fTwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXgnKVwiPlNob3VsZCBiZSBsZXNzIHRoYW5cbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiICpuZ0lmPVwic2hvd0RlZmF1bHRGaWx0ZXJzXCI+XG4gICAgICAgICAgICAgIDwhLS0gPG1hdC1pY29uIG1hdFByZWZpeCBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGNvbC1tZC0zXCI+ZGF0ZV9yYW5nZTwvbWF0LWljb24+IC0tPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJGcm9tXCIgdHlwZT1cImRhdGVcIiBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIiBmb3JtQ29udHJvbE5hbWU9XCJmcm9tXCIgLz5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCIgKm5nSWY9XCJzaG93RGVmYXVsdEZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgPCEtLSA8bWF0LWljb24+aG9tZTwvbWF0LWljb24+IC0tPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cIlRvXCIgdHlwZT1cImRhdGVcIiBbbWF0RGF0ZXBpY2tlcl09XCJ0b1BpY2tlclwiIGZvcm1Db250cm9sTmFtZT1cInRvXCIgLz5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInRvUGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICN0b1BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiICpuZ0lmPVwic2hvd0RlZmF1bHRGaWx0ZXJzXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBtYXhsZW5ndGg9XCIxMDBcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiIHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgLz5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHQgbWF0LXRhYmxlLWZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCJmaWx0ZXJGb3JtLmludmFsaWRcIj5GaWx0ZXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwiYmFzaWNcIiB0eXBlPVwicmVzZXRcIj5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1hdC10YWJsZS1sb2FkaW5nLXNoYWRlXCIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+XG4gICAgICAgIDxtYXQtc3Bpbm5lciAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHNcIj48L21hdC1zcGlubmVyPlxuICAgICAgPC9kaXY+XG4gICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJwYWdlLmNvbnRlbnRcIiBjbGFzcz1cIm1hdC1lbGV2YXRpb24tejhcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgbWF0U29ydCAobWF0U29ydENoYW5nZSk9XCJwcm9jZXNzU29ydGluZygkZXZlbnQpXCI+XG5cbiAgICAgIDwhLS0tIE5vdGUgdGhhdCB0aGVzZSBjb2x1bW5zIGNhbiBiZSBkZWZpbmVkIGluIGFueSBvcmRlci5cbiAgICAgICAgICBUaGUgYWN0dWFsIHJlbmRlcmVkIGNvbHVtbnMgYXJlIHNldCBhcyBhIHByb3BlcnR5IG9uIHRoZSByb3cgZGVmaW5pdGlvblwiIC0tPlxuXG4gICAgICA8IS0tIFBvc2l0aW9uIENvbHVtbiAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiY2hlY2tib3hcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94IChjaGFuZ2UpPVwiJGV2ZW50ID8gbWFzdGVyVG9nZ2xlKCkgOiBudWxsXCIgW2NoZWNrZWRdPVwic2VsZWN0aW9uLmhhc1ZhbHVlKCkgJiYgaXNBbGxTZWxlY3RlZCgpXCJcbiAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cInNlbGVjdGlvbi5oYXNWYWx1ZSgpICYmICFpc0FsbFNlbGVjdGVkKClcIj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC90aD5cbiAgICAgICAgPCEtLSA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPiA8bWF0LWNoZWNrYm94PjwvbWF0LWNoZWNrYm94PiA8L3RkPiAtLT5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgIDxtYXQtY2hlY2tib3ggKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIChjaGFuZ2UpPVwiJGV2ZW50ID8gc2VsZWN0aW9uLnRvZ2dsZShyb3cpIDogbnVsbFwiIFtjaGVja2VkXT1cInNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdylcIj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIEZpZWxkcyBDb2x1bW5zIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbWF0Q29sdW1uRGVmXT1cImMuZmllbGROYW1lXCIgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uc1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBbY2xhc3MuaGlkZV9vbl94c109XCJjLmhpZGVPblhzXCI+IHt7Yy5jb2x1bW5OYW1lfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIiBbY2xhc3MuaGlkZV9vbl94c109XCJjLmhpZGVPblhzXCI+IFxuICAgICAgICAgIDwhLS0ge3tjLmlzRGF0ZUNvbHVtbiA/XG4gICAgICAgICAgKGdldEZpZWxkVmFsdWUoZWxlbWVudCwgYykgfCBkYXRlOidtZWRpdW0nKSA6XG4gICAgICAgICAgZ2V0RmllbGRWYWx1ZShlbGVtZW50LCBjKX19IC0tPlxuICAgICAgICAgICA8ZGl2IFtpbm5lckh0bWxdID0gXCJnZXRGaWVsZFZhbHVlKGVsZW1lbnQsIGMpXCI+PC9kaXY+PC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIE90aGVyIENvbHVtbiAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiYWN0aW9uc1wiICpuZ0lmPVwibW9yZUFjdGlvbnNcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3ttb3JlQWN0aW9ucy5uYW1lfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIj5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmxpc3Q8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG1vcmVBY3Rpb25zLmFjdGlvbnNcIiAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IGVsZW1lbnRbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZX0pXCI+e3thY3Rpb24uYWN0aW9uTmFtZX19PC9idXR0b24+XG4gICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC90cj5cbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO1wiPjwvdHI+XG4gICAgPC90YWJsZT5cbiAgICA8bWF0LXBhZ2luYXRvciAocGFnZSk9XCJwYWdlRXZlbnQoJGV2ZW50KVwiIFtsZW5ndGhdPVwicGFnZS50b3RhbEVsZW1lbnRzXCIgW3BhZ2VTaXplXT1cIjIwXCIgW3BhZ2VTaXplT3B0aW9uc109XCJbMSwgNSwgMTAsIDIwLCA1MCwgMTAwLCAyMDBdXCI+XG4gICAgPC9tYXQtcGFnaW5hdG9yPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AubWF0LXRhYmxlLWZpbHRlciBidXR0b257bWFyZ2luLXJpZ2h0OjhweDtmbG9hdDpyaWdodH1AbWVkaWEgKG1heC13aWR0aDo1NzZweCl7LmhpZGVfb25feHN7ZGlzcGxheTpub25lfX0ubWF0LXRhYmxlLWxvYWRpbmctc2hhZGV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2JvdHRvbTo1NnB4O3JpZ2h0OjA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xNSk7ei1pbmRleDoxO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn1gXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IEFwcERhdGVBZGFwdGVyIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IEFQUF9EQVRFX0ZPUk1BVFNcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbXCJjaGVja2JveFwiXTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbjogU2VsZWN0aW9uTW9kZWw8YW55PiA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxhbnk+KHRydWUsIFtdKTtcbiAgQE91dHB1dCgpIHJvd1NlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uTW9kZWw8YW55Pj4oKTtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG5cbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8VGdyTWF0VGFibGVDb2x1bW4+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcbiAgQElucHV0KCkgbW9yZUFjdGlvbnM6IFRnck1vcmVBY3Rpb25zO1xuICBAT3V0cHV0KCkgYWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxUZ3JNb3JlQWN0aW9uRGF0YT4oKVxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxUZ3JEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xuICBASW5wdXQoKSBwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIEBJbnB1dCgpIHNob3dEZWZhdWx0RmlsdGVyczogYm9vbGVhbiA9IHRydWU7XG4gIHBhZ2U6IFBhZ2U8YW55PjtcbiAgc2VsZWN0ZWQgPSBbXTtcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XG4gIGZpbHRlcjogT2JqZWN0ID0ge307XG4gIGZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgcHJpdmF0ZSBzb3J0UGFyYW1zOiBTb3J0O1xuICAvKipcbiAgICogQ2hlY2tzIGlmIHNlcnZlciByZXF1ZXN0IGhhcyBiZWVuIHByb2Nlc3NlZFxuICAgKi9cbiAgaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAvKipcbiAgICogRGF0ZSBwaXBlXG4gICAqL1xuICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55Pikge1xuICAgIHRoaXMucGFnZSA9IG5ldyBQYWdlKCk7XG4gICAgdGhpcy5wYWdlLmNvbnRlbnQgPSBbXTtcbiAgICB0aGlzLmRhdGVQaXBlID0gbmV3IERhdGVQaXBlKFwiZW4tVVNcIik7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgLy9pbnRpYWxpemluZyB0YWJsZSBjb2x1bW5zXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goYyA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChjLmZpZWxkTmFtZSk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubW9yZUFjdGlvbnMpIHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKFwiYWN0aW9uc1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIm1vcmVBY3Rpb25zIG5vdCBpbmplY3RlZCBza2lwcGluZyByZW5kZXJpbmcgJ01vcmUgQWN0aW9ucycgY29sdW1uXCIpO1xuICAgIH1cbiAgICBsZXQgZ3JvdXAgPSB7fTtcbiAgICB0aGlzLmZpbHRlckNvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgIGxldCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBpZiAoY29tcC5pc1JlcXVpcmVkKSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBUZ3JJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgVGdyVGV4dGFyZWEpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1heExlbmd0aCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIFRncklucHV0KSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpXG4gICAgfSk7XG4gICAgLy9hZGQgZGVmYXVsdCBjb250cm9sc1xuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMDApKTtcbiAgICBncm91cFsnbmVlZGxlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwMCkpO1xuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IDAsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGludGlhbGl6YXRpb24gZmlyZSBzZWxlY3Rpb24gZXZlbnRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvd1NlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgZWxlbWVudHMgbWF0Y2hlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MuICovXG4gIGlzQWxsU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgbnVtUm93cyA9IHRoaXMucGFnZS5jb250ZW50Lmxlbmd0aDtcbiAgICByZXR1cm4gbnVtU2VsZWN0ZWQgPT0gbnVtUm93cztcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIGFsbCByb3dzIGlmIHRoZXkgYXJlIG5vdCBhbGwgc2VsZWN0ZWQ7IG90aGVyd2lzZSBjbGVhciBzZWxlY3Rpb24uICovXG4gIG1hc3RlclRvZ2dsZSgpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpIDpcbiAgICAgIHRoaXMucGFnZS5jb250ZW50LmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBUZ3JNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMuYWN0aW9uc0V2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxuICAgKiBAcGFyYW0gcGFnZUluZm9cbiAgICogQHBhcmFtIGZpbHRlcnNcbiAgICovXG4gIGxvYWRQYWdlKHBhZ2VJbmZvLCBmaWx0ZXJzKSB7XG4gICAgaWYgKCF0aGlzLmVuZHBvaW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbXMpIHtcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleSAhPSBudWxsICYmIGtleSAhPSB1bmRlZmluZWQpIHsgLy9pZ25vcmUgbnVsbCB2YWx1ZXNcbiAgICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVlc3Quc2V0KFwicGFnZVwiLCBwYWdlSW5mby5vZmZzZXQpO1xuICAgIHJlcXVlc3Quc2V0KFwic2l6ZVwiLCBwYWdlSW5mby5saW1pdCk7XG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICB0aGlzLnBhZ2UgPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNlcnZlciByZXF1ZXN0IGhhcyBmYWlsZWRcIik7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvbGlzdGVuIHRvIHBhZ2luYXRpb24gZXZlbnRzL2FjdGlvbnNcbiAgICogQHBhcmFtIHBhZ2UgXG4gICAqL1xuICBwYWdlRXZlbnQocGFnZTogUGFnZUV2ZW50KSB7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiBwYWdlLnBhZ2VTaXplLCBvZmZzZXQ6IHBhZ2UucGFnZUluZGV4IH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2Vzc2luZyB0YWJsZSBzb3J0aW5nXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHByb2Nlc3NTb3J0aW5nKGV2ZW50OiBTb3J0KSB7XG4gICAgdGhpcy5zb3J0UGFyYW1zID0gZXZlbnQ7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSwgb2Zmc2V0OiAwIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGdldCBmaWx0ZXIgZW50cmllcyBmcm9tIHRoZSBmaWx0ZXIgZm9ybS4gQWxzbyBhZGRzIHNvcnQgcGFyYW1ldGVycyB0byByZXF1ZXN0XG4gICAqL1xuICBwcml2YXRlIGdldEZpbHRlcnMoKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgLy8gbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIGxldCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJLZXkgaXMgXCIgKyBrZXkgKyBcIiBhbmQgdmFsdWUgXCIgKyB2YWwpO1xuICAgICAgaWYodGhpcy5maWx0ZXJGb3JtLnZhbHVlW3ZhbF0pe1xuICAgICAgICBpZih2YWwgPT0gJ2Zyb20nIHx8IHZhbCA9PSBcInRvXCIpe1xuICAgICAgICAgIGYuc2V0KHZhbCwgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0odGhpcy5maWx0ZXJGb3JtLnZhbHVlW3ZhbF0sICd5eXl5LU1NLWRkJykpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBmLnNldCh2YWwsIHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLy9hZGQgc29ydGluZyBwYXJhbWV0ZXJzXG4gICAgaWYgKHRoaXMuc29ydFBhcmFtcykge1xuICAgICAgZi5zZXQoXCJzb3J0XCIsIHRoaXMuc29ydFBhcmFtcy5hY3RpdmUgKyBcIixcIiArIHRoaXMuc29ydFBhcmFtcy5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZjtcbiAgfVxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXMgXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcbiAgICogQHBhcmFtIGZvcm0gXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBwcm9jZXNzRmlsdGVyKGZvcm0pIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgaW5wdXRcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzSW5wdXQoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JTZWxlY3Q7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxuICAgKi9cbiAgaXNUZXh0QXJlYShjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIFRnclRleHRhcmVhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgdmFyIG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcblxuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xuXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBjb2x1bW46IFRnck1hdFRhYmxlQ29sdW1uKSB7XG4gICAgaWYgKGNvbHVtbi5jYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGNvbHVtbi5jYWxsYmFjayhkYXRhKTtcbiAgICB9XG4gICAgdmFyIGs6IEFycmF5PHN0cmluZz4gPSBjb2x1bW4uZmllbGROYW1lLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YSwga2V5cyk7XG4gICAgcmV0dXJuIGNvbHVtbi5pc0RhdGVDb2x1bW4gPyB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgJ21lZGl1bScpIDogdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XG4gICAqIEBwYXJhbSBrZXlzIGkuZS4gdXNlci5nZW5kZXIudHlwZS50eXBlXG4gICAqL1xuICBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcbiAgICBpZiAoKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHx8IChrZXlzLmxlbmd0aCA9PSAxKSkge1xuICAgICAgcmV0dXJuIGRhdGFba2V5cy50YWlsXTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoa2V5ID09IGtleXMuZnJvbnQpICYmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhW2tleV0sIGtleXMpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT0ga2V5cy50YWlsKSB7XG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggZGF0YSB0YWJsZSB2YWx1ZXNcbiAgICovXG4gIHJlZnJlc2hUYWJsZSgpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiUmVmcmVzaGVkIGRhdGEgdGFibGVzXCIpO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCB0aGlzLmdldEZpbHRlcnMoKSk7XG4gIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIGRlZmluZSBkYXRhdGFibGUgY29sdW1ucyB3aXRoIGF0dHJpYnV0ZXMgKGNvbHVtbk5hbWUsIGZpZWxkTmFtZSwgd2lkdGgsIHNvcnRhYmxlLCBjYW5BdXRvUmVzaXplLFxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbilcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZ3JNYXRUYWJsZUNvbHVtbiB7XG4gIC8qKlxuICAgKiBjb2x1bW4gdGl0bGVcbiAgICovXG4gIGNvbHVtbk5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFNlcnZlciBzaWRlIHJlc3BvbnNlIGZpZWxkIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNvbHVtbiBpLmUgZnVsbE5hbWUgbWF5IGNvcnJlc3BvbmQgdG8gTmFtZSBjb2x1bW5cbiAgICovXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGNvbHVtblxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmFibGUgc29ydGluZyBpbiBhIGNvbHVtblxuICAgKi9cbiAgc29ydGFibGU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gIC8vICAqL1xuICAvLyBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcbiAgLy8gLyoqXG4gIC8vICAqIEVuYWJsZXMgYSBjb2x1bW4gdG8gYmUgZHJhZ2dhYmxlXG4gIC8vICAqL1xuICAvLyBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gIC8vICAqL1xuICAvLyByZXNpemVhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyB0aW1lc3RhbXAgdG8gc3RyaW5nIGRhdGVcbiAgICovXG4gIGlzRGF0ZUNvbHVtbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBIaWRlIG9uIHNtYWxsIGRldmljZSBsZXNzIHRoYW4gNTc2cHhcbiAgICovXG4gIGhpZGVPblhzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIHVzZWQgZm9yIGNlbGwgcmVuZGVyaW5nLlxuICAgKiAgTm90ZTogRnVuY3Rpb24gcmVzdWx0cyBhcmUgbm90IHNhbml0aXNlZFxuICAgKi9cbiAgY2FsbGJhY2s/OiBGdW5jdGlvbjtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIFRnck1vcmVBY3Rpb25zIHtcbiAgLyoqXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xuICAgKi9cbiAgbmFtZTogc3RyaW5nID0gXCJBY3Rpb25zXCI7XG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXG4gICAqL1xuICBpZEZpZWxkTmFtZTogc3RyaW5nID0gXCJpZFwiO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8VGdyTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PFRnck1vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZ3JNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Rld2FyZENsaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU3Rld2FyZENvbmZpZyB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3Rnci1tYXRlcmlhbC10YWJsZS90Z3ItbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBNYXRJbnB1dE1vZHVsZSwgXHJcbiAgTWF0VGFibGVNb2R1bGUsIFxyXG4gIE1hdENoZWNrYm94TW9kdWxlLCBcclxuICBNYXRJY29uTW9kdWxlLCBcclxuICBNYXREYXRlcGlja2VyTW9kdWxlLCBcclxuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFNvcnRNb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSxcclxuICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdFRhYmxlTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTb3J0TW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBcclxuICAgIFRnck1hdGVyaWFsVGFibGVDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBUZ3JNYXRlcmlhbFRhYmxlQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU3Rld2FyZENsaWVudE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbIHtwcm92aWRlOiBTdGV3YXJkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSBdXHJcbiAgICB9XHJcbiAgfVxyXG4gfVxyXG4iXSwibmFtZXMiOlsiaHR0cCIsIkh0dHBIZWFkZXJzIiwiY2F0Y2hFcnJvciIsIkh0dHBQYXJhbXMiLCJvZiIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiQ29tcG9uZW50IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJOYXRpdmVEYXRlQWRhcHRlciIsIlNlbGVjdGlvbk1vZGVsIiwiRXZlbnRFbWl0dGVyIiwiRGF0ZVBpcGUiLCJWYWxpZGF0b3JzIiwiRm9ybUNvbnRyb2wiLCJGb3JtR3JvdXAiLCJRdWV1ZSIsIkRhdGVBZGFwdGVyIiwiTUFUX0RBVEVfRk9STUFUUyIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIk1hdFNvcnQiLCJJbnB1dCIsIkRhdGF0YWJsZUNvbXBvbmVudCIsIk5nTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTmd4RGF0YXRhYmxlTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRDaGVja2JveE1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXREYXRlcGlja2VyTW9kdWxlIiwiTWF0TmF0aXZlRGF0ZU1vZHVsZSIsIk1hdFBhZ2luYXRvck1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdFNvcnRNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBOzs7UUFBQTs7OzhCQUhBO1FBZ0JDOzs7Ozs7QUNoQkQsUUFNQTs7OzRCQU5BO1FBVUMsQ0FBQTtBQUpEOzs7O1FBYUksOEJBQW9CQSxPQUFnQixFQUFVLE1BQXFCO1lBQS9DLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTs0QkFGaEQsR0FBRztZQUdsQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDaEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO2FBQzNGO2lCQUFNO2dCQUNILElBQUksQ0FBQyxPQUFP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