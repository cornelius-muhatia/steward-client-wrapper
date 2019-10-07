import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { __spread, __extends } from 'tslib';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
import { SelectionModel } from '@angular/cdk/collections';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter, MatSort, MatInputModule, MatTableModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatButtonModule, MatSortModule, MatMenuModule, MatProgressSpinnerModule, MatAutocompleteModule } from '@angular/material';
import { DatePipe, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Wraps server response
 * @template T
 */
var  /**
 * Wraps server response
 * @template T
 */
ResponseWrapper = /** @class */ (function () {
    function ResponseWrapper() {
    }
    return ResponseWrapper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StewardConfig = /** @class */ (function () {
    function StewardConfig() {
    }
    return StewardConfig;
}());
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
        Object.keys(data).forEach(function (key) {
            formData.append(key, data[key]);
        });
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
        return this.http.put(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
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
            return new HttpParams();
        }
        /** @type {?} */
        var httpParams = new HttpParams();
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
            return of(res);
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
        return this.http.get(this.serviceURL(endpoint), options).pipe(catchError(this.handleError()));
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
        entries.forEach(function (val, key) {
            customHeaders = customHeaders.append(key, val);
        });
        return customHeaders;
    };
    StewardClientService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StewardClientService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: StewardConfig }
    ]; };
    return StewardClientService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        { type: Component, args: [{
                    selector: 'stw-steward-client',
                    template: "\n    <p>\n      steward-client works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    StewardClientComponent.ctorParameters = function () { return []; };
    return StewardClientComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
var  /**
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
/**
 * used to map sort request
 */
var  /**
 * used to map sort request
 */
Sort = /** @class */ (function () {
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
var  /**
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
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
var  /**
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
/**
 * Represents html textarea input
 */
var  /**
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
/**
 * Represents html select control
 */
var  /**
 * Represents html select control
 */
TgrSelect = /** @class */ (function () {
    function TgrSelect(options) {
        this.options = options;
    }
    return TgrSelect;
}());
var TgrSelectOption = /** @class */ (function () {
    function TgrSelectOption(value, text) {
        if (text === void 0) { text = null; }
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
var  /**
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
}(NativeDateAdapter));
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
var TgrMaterialTableComponent = /** @class */ (function () {
    function TgrMaterialTableComponent(sterwardService) {
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
        this.filter = {};
        /**
         * Checks if server request has been processed
         */
        this.isLoadingResults = false;
        this.page = new Page();
        this.page.content = [];
        this.datePipe = new DatePipe("en-US");
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
            this.displayedColumns.push("checkbox");
        }
        if (this.showNumberColumn) {
            this.displayedColumns.push("no");
        }
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
        });
        //add default controls
        group['from'] = new FormControl('', Validators.maxLength(100));
        group['to'] = new FormControl('', Validators.maxLength(100));
        group['needle'] = new FormControl('', Validators.maxLength(200));
        this.filterForm = new FormGroup(group);
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
        this.sterwardService.get(this.endpoint, request, this.headers).subscribe(function (response) {
            if (response.status == 200) {
                if (_this.showNumberColumn) {
                    /** @type {?} */
                    var no_1 = 1 + (response.data.number * response.data.size);
                    response.data.content.forEach(function (val) {
                        val['no'] = no_1++;
                    });
                }
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
        var keys = new (Queue.bind.apply(Queue, __spread([void 0], k)))();
        /** @type {?} */
        var value = this.sterwardService.getObjectValue(data, keys);
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
        console.debug("Refreshed data tables");
        //@ts-ignore
        this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
    };
    TgrMaterialTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tgr-material-table',
                    template: "<div class=\"row\"  *ngIf=\"showDefaultFilters || filterComponents.length > 0\">\n  <div class=\"col-md-12\">\n    <div class=\"card card-outline-default mat-elevation-z4\">\n      <div class=\"card-body\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"mat-table-filter\">\n                <button title=\"Refresh\" (click) = \"refreshTable()\" mat-icon-button color=\"basic\" type=\"reset\"><mat-icon>refresh</mat-icon></button>\n            </div>\n          </div>\n        </div>\n        <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n          <div class=\"row\">\n            <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n              <!-- Intialize form select control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isSelect(control.controlType)\">\n                <mat-select [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\">\n                  <mat-option *ngFor=\"let o of control.controlType.options\" [value]=\"o.value\">\n                    {{o.text}}\n                  </mat-option>\n                </mat-select>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form textarea control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isTextArea(control.controlType)\">\n                <textarea matInput [formControlName]=\"control.name\" [placeholder]=\"control.label\" [cols]=\"control.controlType.cols\"\n                  [rows]=\"control.controlType.rows\"></textarea>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form input control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isInput(control.controlType)\">\n                <!-- <mat-icon matPrefix class=\"material-icons icon-margin-right\">perm_identity</mat-icon> -->\n                <input matInput [placeholder]=\"control.label\" [type]=\"control.controlType.type\" [formControlName]=\"control.name\" />\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than\n                  {{control.controlType.min}}</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than\n                  {{control.controlType.max}}</mat-error>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <!-- <mat-icon matPrefix class=\"material-icons col-md-3\">date_range</mat-icon> -->\n              <mat-form-field class=\"col-md-12\">\n                <input matInput placeholder=\"From\" type=\"date\" [matDatepicker]=\"picker\" formControlName=\"from\" />\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <!-- <mat-icon>home</mat-icon> -->\n                <input matInput placeholder=\"To\" type=\"date\" [matDatepicker]=\"toPicker\" formControlName=\"to\" />\n                <mat-datepicker-toggle matSuffix [for]=\"toPicker\"></mat-datepicker-toggle>\n                <mat-datepicker #toPicker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <input matInput maxlength=\"100\" placeholder=\"Search\" type=\"text\" formControlName=\"needle\" />\n              </mat-form-field>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n            </span>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"pull-right mat-table-filter\">\n                <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"filterForm.invalid\">Filter</button>\n                <button mat-raised-button color=\"basic\" type=\"reset\">Reset</button>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <div class=\"mat-table-loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n    <table mat-table [dataSource]=\"page.content\" class=\"mat-elevation-z8\" style=\"width: 100%\" matSort (matSortChange)=\"processSorting($event)\">\n\n      <!--- Note that these columns can be defined in any order.\n          The actual rendered columns are set as a property on the row definition\" -->\n\n      <!-- Position Column -->\n      <ng-container matColumnDef=\"checkbox\" *ngIf=\"enableCheckbox\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\" [checked]=\"selection.hasValue() && isAllSelected()\"\n            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n          </mat-checkbox>\n        </th>\n        <!-- <td mat-cell *matCellDef=\"let element\"> <mat-checkbox></mat-checkbox> </td> -->\n        <td mat-cell *matCellDef=\"let row\">\n          <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\" [checked]=\"selection.isSelected(row)\">\n          </mat-checkbox>\n        </td>\n      </ng-container>\n\n      <!-- Number Column -->\n      <ng-container matColumnDef=\"no\" *ngIf=\"showNumberColumn\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>\n        <td mat-cell *matCellDef=\"let element\" > \n           <div>{{element['no']}}</div>\n          </td>\n      </ng-container>\n\n      <!-- Fields Columns -->\n      <ng-container [matColumnDef]=\"c.fieldName\" *ngFor=\"let c of columns\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header [class.hide_on_xs]=\"c.hideOnXs\"> {{c.columnName}} </th>\n        <td mat-cell *matCellDef=\"let element\" [class.hide_on_xs]=\"c.hideOnXs\"> \n          <!-- {{c.isDateColumn ?\n          (getFieldValue(element, c) | date:'medium') :\n          getFieldValue(element, c)}} -->\n           <div [innerHtml] = \"getFieldValue(element, c)\"></div></td>\n      </ng-container>\n\n      <!-- Other Column -->\n      <ng-container matColumnDef=\"actions\" *ngIf=\"moreActions\">\n        <th mat-header-cell *matHeaderCellDef> {{moreActions.name}} </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n            <mat-icon>list</mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item *ngFor=\"let action of moreActions.actions\" (click)=\"onActionClick({id: element[moreActions.idFieldName], actionName: action.actionName})\">{{action.actionName}}</button>\n          </mat-menu>\n        </td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n    <mat-paginator (page)=\"pageEvent($event)\" showFirstLastButtons [length]=\"page.totalElements\" [pageSize]=\"20\" [pageSizeOptions]=\"[1, 5, 10, 20, 50, 100, 200]\">\n    </mat-paginator>\n  </div>\n</div>",
                    styles: [".mat-table-filter button{margin-right:8px;float:right}@media (max-width:576px){.hide_on_xs{display:none}}.mat-table-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.mat-cell{padding-right:8px}"],
                    providers: [
                        { provide: DateAdapter, useClass: AppDateAdapter },
                        {
                            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TgrMaterialTableComponent.ctorParameters = function () { return [
        { type: StewardClientService }
    ]; };
    TgrMaterialTableComponent.propDecorators = {
        selection: [{ type: Output }],
        rowSelection: [{ type: Output }],
        sort: [{ type: ViewChild, args: [MatSort,] }],
        columns: [{ type: Input }],
        enableCheckbox: [{ type: Input }],
        endpoint: [{ type: Input }],
        moreActions: [{ type: Input }],
        actionsEvent: [{ type: Output }],
        filterComponents: [{ type: Input }],
        params: [{ type: Input }],
        showDefaultFilters: [{ type: Input }],
        showNumberColumn: [{ type: Input }],
        headers: [{ type: Input }],
        table: [{ type: ViewChild, args: [DatatableComponent,] }]
    };
    return TgrMaterialTableComponent;
}());
/**
 * Used to display more actions column and the end of the table
 */
var  /**
 * Used to display more actions column and the end of the table
 */
TgrMoreActions = /** @class */ (function () {
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
var TgrAutocompleteComponent$$1 = /** @class */ (function () {
    /**
     * Steward service client
     *
     * @param sterwardService
     */
    function TgrAutocompleteComponent$$1(client) {
        this.client = client;
        /**
         * Model object
         */
        this.model = {};
        /**
         * Text field control
         */
        this.textControl = new FormControl();
        /**
         * Retailer Rjx handler
         */
        this.searchElement = new BehaviorSubject([]);
    }
    /**
     * @return {?}
     */
    TgrAutocompleteComponent$$1.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.client.get(this.url).subscribe(function (response) {
            if (response.status == 200) {
                _this.searchElement.next(response.data['content']);
            }
        });
    };
    /**
     * Display name of the selected user
     *
     * @param val selected user
     */
    /**
     * Display name of the selected user
     *
     * @param {?} val selected user
     * @return {?}
     */
    TgrAutocompleteComponent$$1.prototype.displayVal = /**
     * Display name of the selected user
     *
     * @param {?} val selected user
     * @return {?}
     */
    function (val) {
        // if(this.displayWith){
        //   this.displayWith(val);
        // }
        return val == null ? '' : this.getFieldValue(val);
    };
    /**
     * Set assignee agent it
     *
     * @param event
     */
    /**
     * Set assignee agent it
     *
     * @param {?} event
     * @return {?}
     */
    TgrAutocompleteComponent$$1.prototype.setFieldId = /**
     * Set assignee agent it
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // this.optionSelected(event);
        this.model[this.inputAttribute.fieldId] = event.option.value[this.inputAttribute.fieldId];
    };
    /**
     * Get field value
     *
     * @param {?} elem
     * @return {?}
     */
    TgrAutocompleteComponent$$1.prototype.getFieldValue = /**
     * Get field value
     *
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        if (this.inputAttribute.callback) {
            return this.inputAttribute.callback(elem);
        }
        /** @type {?} */
        var k = this.inputAttribute.fieldName.split(".");
        /** @type {?} */
        var keys = new (Queue.bind.apply(Queue, __spread([void 0], k)))();
        return this.client.getObjectValue(elem, keys);
    };
    TgrAutocompleteComponent$$1.decorators = [
        { type: Component, args: [{
                    selector: 'tgr-autocomplete',
                    template: "<mat-form-field class=\"full-width md-icon-left\">\n    <mat-icon *ngIf=\"icon\" matPrefix class=\"material-icons text-esoko-till icon-margin-right\">{{icon}}</mat-icon>\n    <input required matInput [placeholder]=\"inputAttribute.placeholder\" #textInput [formControl]=\"textControl\"\n      [matAutocomplete]=\"textInput\" />\n    <!-- <mat-hint class=\"text-danger\"\n      *ngIf=\"(agentInput.touched || agentInput.dirty) && agentInput.invalid && agentInput.errors.required\"\n      align=\"end\">Current agent is required</mat-hint> -->\n    <mat-autocomplete [autoActiveFirstOption]=\"true\" #textInput=\"matAutocomplete\" [displayWith]=\"displayVal\"\n      [disableRipple]=\"false\" (optionSelected)=\"setFieldId($event)\">\n      <mat-option *ngFor=\"let elem of searchElement | async\" [value]=\"elem\">\n        <div [innerHtml] = \"getFieldValue(elem)\"></div>\n      </mat-option>\n    </mat-autocomplete>\n  </mat-form-field>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    TgrAutocompleteComponent$$1.ctorParameters = function () { return [
        { type: StewardClientService }
    ]; };
    TgrAutocompleteComponent$$1.propDecorators = {
        icon: [{ type: Input }],
        inputAttribute: [{ type: Input }],
        url: [{ type: Input }],
        httpHeaders: [{ type: Input }],
        displayWith: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return TgrAutocompleteComponent$$1;
}());
var InputAttribute$$1 = /** @class */ (function () {
    function InputAttribute$$1() {
    }
    return InputAttribute$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StewardClientModule = /** @class */ (function () {
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
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgxDatatableModule,
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
                        TgrAutocompleteComponent$$1
                    ],
                    exports: [StewardClientComponent, TgrMaterialTableComponent, TgrAutocompleteComponent$$1]
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

export { StewardConfig, StewardClientService, StewardClientComponent, StewardClientModule, Page, Sort, ResponseWrapper, AppDateAdapter, APP_DATE_FORMATS, TgrMaterialTableComponent, TgrMoreActions, TgrDynamicControl, TgrInput, TgrTextarea, TgrSelect, TgrSelectOption, TgrAutocompleteComponent$$1 as TgrAutocompleteComponent, InputAttribute$$1 as InputAttribute };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy90Z3ItZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvdGdyLW1hdGVyaWFsLXRhYmxlL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi90Z3ItYXV0b2NvbXBsZXRlL3Rnci1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNwb25zZVdyYXBwZXI8VD4ge1xuICAgIC8qKlxuICAgICAqIEh0dHAgc3RhdHVzIGNvZGUgZS5nLiAyMDBcbiAgICAgKi9cbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTZXJ2ZXIgbWVzc2FnZVxuICAgICAqL1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBY3R1YWwgcmVzcG9uc2UgZGF0YVxuICAgICAqL1xuICAgIGRhdGE6IFQ7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XHJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENvbmZpZyB7XHJcbiAgICBiYXNlX3VybDogc3RyaW5nO1xyXG4gICAgYWNjZXNzX3Rva2VuPzogc3RyaW5nO1xyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50U2VydmljZTxULCBFPiB7XHJcblxyXG4gICAgcHJpdmF0ZSBoZWFkZXJzOiBIdHRwSGVhZGVycztcclxuICAgIHRva2VuOiBzdHJpbmc7XHJcbiAgICBiYXNlX3VybDogc3RyaW5nID0gXCIvXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuYmFzZV91cmwgPSBjb25maWcuYmFzZV91cmw7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL2FwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIFwiQmVhcmVyIFwiICsgY29uZmlnLmFjY2Vzc190b2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFVzZWQgdG8gdXBkYXRlIGF1dGhvcml6YXRpb24gdG9rZW4uIEN1cnJlbnRseSBzdXBwb3J0cyBiZWFyZXIgdG9rZW5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRva2VuIFxyXG4gICAgICovXHJcbiAgICBzZXRUb2tlbih0b2tlbjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFjY2Vzc190b2tlbikgey8vdXBkYXRlIHRva2VuIGhlYWRlclxyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKTtcclxuICAgICAgICB9IGVsc2Ugey8vYXBwZW5kIGFjY2VzcyB0b2tlbiBpZiB0aGUgZW52aXJvbm1lbnQgaGFzIGFjY2VzcyB0b2tlbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgXCJCZWFyZXIgXCIgKyB0b2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwb3N0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHsgaGVhZGVyczogYWRkSGVhZGVycyA/IHRoaXMuYXBwZW5kSGVhZGVycyhhZGRIZWFkZXJzKSA6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHB1dChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBhZGRIZWFkZXJzPzogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBkZWxldGUgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBkZWxldGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdkZWxldGUnLCB0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCB7IGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBnZXQgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgcmVxdWVzdCBwYXJhbXNcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPiwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogYWRkSGVhZGVycyA/IHRoaXMuYXBwZW5kSGVhZGVycyhhZGRIZWFkZXJzKSA6IHRoaXMuaGVhZGVycyxcclxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoIGEgZmlsZVxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIGdldEZpbGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpICsgJz9hY2Nlc3NfdG9rZW49JyArIHRoaXMudG9rZW4sIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogaWZcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGhlYWRlcnMgXHJcbiAgICAgKi9cclxuICAgIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnMuZ2V0KFwiQXV0aG9yaXphdGlvblwiKSAmJiAoIWhlYWRlcnMpKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghaGVhZGVycykge1xyXG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZSBodHRwIGZvcm0gZGF0YSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSkgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBodHRwIHB1dCBmb3JtIGRhdGEgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1dEZvcm1EYXRhTXVsdGlQYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgbWFwIHRvIEh0dHBQYXJhbXNcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xyXG4gICAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlV3JhcHBlcigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZW5kZXJNb3JlKGlkOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgZGF0YXRhYmxlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYSB2YWxpZCBtYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGlmIGEgc3RyaW5nIGlzIGEgdmFsaWQgVVJMXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1VSTCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBVUkwodXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoXykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlIHVybCBwYXJhbWV0ZXIgaXMgYW4gZW5kcG9pbnQgaXQgYXBwZW5kcyB0byB0aGUgYmFzZSB1cmxcclxuICAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAgKiBAc2VlIGJhc2VfdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJ2aWNlVVJMKHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaXNVUkwodXJsKSkgPyB1cmwgOiB0aGlzLmJhc2VfdXJsICsgdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxyXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XHJcbiAgICogQHBhcmFtIGtleXMgaS5lLiB1c2VyLmdlbmRlci50eXBlLnR5cGVcclxuICAgKi9cclxuICAgIHB1YmxpYyBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcclxuICAgICAgICBpZiAoKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHx8IChrZXlzLmxlbmd0aCA9PSAxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVtrZXlzLnRhaWxdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKGtleSA9PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGFba2V5XSwga2V5cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09IGtleXMudGFpbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gYXBwZW5kIGhlYWRlcnMgdGhlIGN1cnJlbnQgaHR0cEhlYWRlcnNcclxuICAgICAqIEByZXR1cm5zIG1lcmdlZCBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhcHBlbmRIZWFkZXJzKGVudHJpZXM6IE1hcDxTdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IEh0dHBIZWFkZXJze1xyXG4gICAgICAgIGxldCBjdXN0b21IZWFkZXJzOiBIdHRwSGVhZGVycyA9IHRoaXMuaGVhZGVycztcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goKHZhbDogc3RyaW5nIHwgc3RyaW5nW10sIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGN1c3RvbUhlYWRlcnMgPSBjdXN0b21IZWFkZXJzLmFwcGVuZChrZXksIHZhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGN1c3RvbUhlYWRlcnM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LXN0ZXdhcmQtY2xpZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHA+XHJcbiAgICAgIHN0ZXdhcmQtY2xpZW50IHdvcmtzIVxyXG4gICAgPC9wPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyoqXG4gKiBEYXRhYmxlIHBhZ2UgdXNlZCB0byB3cmFwcGVyIHNlcnZlciBjb250ZW50IHJlc3BvbnNlXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlPFQ+IHtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2Ugc2FtZSBhcyBsaW1pdFxuICAgICAqL1xuICAgIHNpemU6IG51bWJlciA9IDIwO1xuICAgIC8qKlxuICAgICAqIFRvdGFsIGl0ZW1zIGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyXG4gICAgICovXG4gICAgdG90YWxFbGVtZW50czogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgcGFnZXMgcHJlc2VudFxuICAgICAqL1xuICAgIHRvdGFsUGFnZXM6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGlzIHRoZSBmaXJzdCBwYWdlXG4gICAgICovXG4gICAgZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBpdCBpcyB0aGUgbGFzdCBwYWdlXG4gICAgICovXG4gICAgbGFzdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFRoZSBhY3R1YWwgcGFnZSBjb250ZW50XG4gICAgICovXG4gICAgY29udGVudDogQXJyYXk8VD4gPSBbXTtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIG1hcCBzb3J0IHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBzb3J0ZWQ6IFNvcnQgPSBuZXcgU29ydCgpO1xuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgcGFnZSBudW1iZXJcbiAgICAgKi9cbiAgICBudW1iZXI6IG51bWJlciA9IDA7XG59XG4vKipcbiAqIHVzZWQgdG8gbWFwIHNvcnQgcmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgU29ydHtcbiAgICBzb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB1bnNvcnRlZDogYm9vbGVhbiA9IHRydWU7XG59XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgZHluYW1pYyBodG1sIGNvbnRyb2xzIChJbnB1dCwgVGV4dEFyZWEgYW5kIFNlbGVjdClcbiAqL1xuZXhwb3J0IGNsYXNzIFRnckR5bmFtaWNDb250cm9sPFQ+IHtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIGxhYmVsXG4gICAgICovXG4gICAgbGFiZWw6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJY29uIHRvIGJlIGFwcGVuZGVkIGJlZm9yZSB0aGUgY29udHJvbCAoc3VwcG9ydHMgY2xhc3MgZGVmaW5lZCBpY29ucylcbiAgICAgKi9cbiAgICBpY29uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgY29udHJvbCAocHJvdmlkZSB2YXJpYWJsZSB2YWxpZCBuYW1lcyBpZS4gbm8gc3BhY2VzIHByZWZhcmFibHkgYXBpIGNvcnJlc3BvbmRpbmcgbmFtZXMgZS5nLiB1c2VyTmFtZSlcbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdHVhbCBjb250cm9sIChUZ3JJbnB1dCwgVGdyVGV4dEFyZWEgJiBUZ3JTZWxlY3QpXG4gICAgICovXG4gICAgY29udHJvbFR5cGU6IFQ7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBmaWVsZCBpcyByZXF1aXJlZFxuICAgICAqL1xuICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ29udHJvbCBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjb250cm9sVHlwZTogVCwgaWNvbjogc3RyaW5nID0gXCJmYSBmYS1maWxlLXRleHQtb1wiLFxuICAgICAgICBpc1JlcXVpcmVkOiBib29sZWFuID0gZmFsc2UsIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IGNvbnRyb2xUeXBlO1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLmlzUmVxdWlyZWQgPSBpc1JlcXVpcmVkO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgPyBwbGFjZWhvbGRlciA6IGxhYmVsO1xuICAgIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIHJlcHJlc2VudCBodG1sIGlucHV0IHdpdGggb3B0aW9uczpcbiAqIHR5cGU6IGRlZmF1bHQgdG8gdGV4dCwgIG1heExlbmd0aCwgbWluTGVuZ3RoLCBtaW4sIG1heFxuICovXG5leHBvcnQgY2xhc3MgVGdySW5wdXR7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBpbnB1dCBlLmcuIHRleHQsIG51bWJlciwgZGF0ZVxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGxlbmd0aCBvZiB0aGUgaW5wdXRcbiAgICAgKi9cbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWluOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWF4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcgPSBcInRleHRcIikge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IHRoaXMubWluID0gMDtcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1heCA9IDEwMDAwMDAwMDA7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgaHRtbCB0ZXh0YXJlYSBpbnB1dFxuICovXG5leHBvcnQgY2xhc3MgVGdyVGV4dGFyZWF7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIHRleHRhcmVhIGNvbHVtbnNcbiAgICAgKi9cbiAgICBjb2xzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiB0ZXh0YXJlYSByb3dzXG4gICAgICovXG4gICAgcm93cz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBtYXhpbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xzOiBudW1iZXIgPSA1LCByb3dzOiBudW1iZXIgPSAxKXtcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IDBcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHNlbGVjdCBjb250cm9sXG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JTZWxlY3Qge1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCBvcHRpb25zXG4gICAgICovXG4gICAgb3B0aW9uczogQXJyYXk8VGdyU2VsZWN0T3B0aW9uPjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PFRnclNlbGVjdE9wdGlvbj4pe1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgVGdyU2VsZWN0T3B0aW9ue1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRleHQvbGFiZWxcbiAgICAgKi9cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgPSBudWxsKXtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0ID8gdGV4dCA6IHZhbHVlO1xuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcbmltcG9ydCB7IE1sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrVGV4dGFyZWEsIE1sa1NlbGVjdCB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZURhdGVBZGFwdGVyLCBQYWdlRXZlbnQsIE1hdFNvcnQsIFNvcnQgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IFRnckR5bmFtaWNDb250cm9sLCBUZ3JJbnB1dCwgVGdyU2VsZWN0LCBUZ3JUZXh0YXJlYSB9IGZyb20gJy4uL2VudGl0aWVzL3Rnci1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEZvcm1hdCBhbmd1bGFyIGRhdGUgdG8gZGQtbW0teXl5eVxuICovXG5leHBvcnQgY2xhc3MgQXBwRGF0ZUFkYXB0ZXIgZXh0ZW5kcyBOYXRpdmVEYXRlQWRhcHRlciB7XG5cbiAgLyoqXG4gICAqIFBhcnNlIGRhdGUgdG8gZGQtbW0teXl5eVxuICAgKiBAcGFyYW0gZGF0ZSAgZGF0ZSBpbnB1dFxuICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBleHBlY3RzIHRvIGJlIGlucHV0IHN0cmluZ1xuICAgKi9cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IE9iamVjdCk6IHN0cmluZyB7XG5cbiAgICBpZiAoZGlzcGxheUZvcm1hdCA9PT0gJ2lucHV0Jykge1xuXG4gICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGxldCBkYXlTdHJpbmc6IHN0cmluZztcbiAgICAgIGxldCBtb250aFN0cmluZzogc3RyaW5nO1xuXG4gICAgICBpZiAoZGF5IDwgMTApIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJzAnICsgZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJycgKyBkYXk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgIG1vbnRoU3RyaW5nID0gJzAnICsgbW9udGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb250aFN0cmluZyA9ICcnICsgbW9udGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRoU3RyaW5nfS0ke2RheVN0cmluZ31gO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpO1xuICB9XG59XG4vKipcbiAqIE1hdGVyaWFsIGRhdGUgZm9ybWF0c1xuICovXG5leHBvcnQgY29uc3QgQVBQX0RBVEVfRk9STUFUUyA9XG57XG4gIHBhcnNlOiB7XG4gICAgZGF0ZUlucHV0OiB7IG1vbnRoOiAnbnVtZXJpYycsIHllYXI6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgfSxcbiAgZGlzcGxheToge1xuICAgIGRhdGVJbnB1dDogJ2lucHV0JyxcbiAgICBtb250aFllYXJMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycgfSxcbiAgICBkYXRlQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgICBtb250aFllYXJBMTF5TGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnIH0sXG4gIH1cbn07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGdyLW1hdGVyaWFsLXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicm93XCIgICpuZ0lmPVwic2hvd0RlZmF1bHRGaWx0ZXJzIHx8IGZpbHRlckNvbXBvbmVudHMubGVuZ3RoID4gMFwiPlxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHQgbWF0LWVsZXZhdGlvbi16NFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC10YWJsZS1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHRpdGxlPVwiUmVmcmVzaFwiIChjbGljaykgPSBcInJlZnJlc2hUYWJsZSgpXCIgbWF0LWljb24tYnV0dG9uIGNvbG9yPVwiYmFzaWNcIiB0eXBlPVwicmVzZXRcIj48bWF0LWljb24+cmVmcmVzaDwvbWF0LWljb24+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxuICAgICAgICAgICAgICA8IS0tIEludGlhbGl6ZSBmb3JtIHNlbGVjdCBjb250cm9sIC0tPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIiAqbmdJZj1cImlzU2VsZWN0KGNvbnRyb2wuY29udHJvbFR5cGUpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG8gb2YgY29udHJvbC5jb250cm9sVHlwZS5vcHRpb25zXCIgW3ZhbHVlXT1cIm8udmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAge3tvLnRleHR9fVxuICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19XG4gICAgICAgICAgICAgICAgICBpcyByZXF1aXJlZDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgICAgICAgICAgIDwhLS0gSW50aWFsaXplIGZvcm0gdGV4dGFyZWEgY29udHJvbCAtLT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCIgKm5nSWY9XCJpc1RleHRBcmVhKGNvbnRyb2wuY29udHJvbFR5cGUpXCI+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wubGFiZWxcIiBbY29sc109XCJjb250cm9sLmNvbnRyb2xUeXBlLmNvbHNcIlxuICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiY29udHJvbC5jb250cm9sVHlwZS5yb3dzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19XG4gICAgICAgICAgICAgICAgICBpcyByZXF1aXJlZDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZlxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heExlbmd0aH19IGNoYXJhY3RlcnM8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgICAgICAgICAgICA8IS0tIEludGlhbGl6ZSBmb3JtIGlucHV0IGNvbnRyb2wgLS0+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiICpuZ0lmPVwiaXNJbnB1dChjb250cm9sLmNvbnRyb2xUeXBlKVwiPlxuICAgICAgICAgICAgICAgIDwhLS0gPG1hdC1pY29uIG1hdFByZWZpeCBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGljb24tbWFyZ2luLXJpZ2h0XCI+cGVybV9pZGVudGl0eTwvbWF0LWljb24+IC0tPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5sYWJlbFwiIFt0eXBlXT1cImNvbnRyb2wuY29udHJvbFR5cGUudHlwZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgLz5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19XG4gICAgICAgICAgICAgICAgICBpcyByZXF1aXJlZDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZlxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heExlbmd0aH19IGNoYXJhY3RlcnM8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWluJylcIj5TaG91bGQgYmUgZ3JlYXRlciB0aGFuXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWlufX08L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4fX08L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIiAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVyc1wiPlxuICAgICAgICAgICAgICA8IS0tIDxtYXQtaWNvbiBtYXRQcmVmaXggY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBjb2wtbWQtM1wiPmRhdGVfcmFuZ2U8L21hdC1pY29uPiAtLT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiRnJvbVwiIHR5cGU9XCJkYXRlXCIgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwiZnJvbVwiIC8+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiICpuZ0lmPVwic2hvd0RlZmF1bHRGaWx0ZXJzXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICAgIDwhLS0gPG1hdC1pY29uPmhvbWU8L21hdC1pY29uPiAtLT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJUb1wiIHR5cGU9XCJkYXRlXCIgW21hdERhdGVwaWNrZXJdPVwidG9QaWNrZXJcIiBmb3JtQ29udHJvbE5hbWU9XCJ0b1wiIC8+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJ0b1BpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjdG9QaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIiAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVyc1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgbWF4bGVuZ3RoPVwiMTAwXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIiB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cIm5lZWRsZVwiIC8+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAyMDAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0IG1hdC10YWJsZS1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiZmlsdGVyRm9ybS5pbnZhbGlkXCI+RmlsdGVyPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImJhc2ljXCIgdHlwZT1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwicm93XCI+XG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtdGFibGUtbG9hZGluZy1zaGFkZVwiICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPlxuICAgICAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+PC9tYXQtc3Bpbm5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwicGFnZS5jb250ZW50XCIgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXo4XCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiIG1hdFNvcnQgKG1hdFNvcnRDaGFuZ2UpPVwicHJvY2Vzc1NvcnRpbmcoJGV2ZW50KVwiPlxuXG4gICAgICA8IS0tLSBOb3RlIHRoYXQgdGhlc2UgY29sdW1ucyBjYW4gYmUgZGVmaW5lZCBpbiBhbnkgb3JkZXIuXG4gICAgICAgICAgVGhlIGFjdHVhbCByZW5kZXJlZCBjb2x1bW5zIGFyZSBzZXQgYXMgYSBwcm9wZXJ0eSBvbiB0aGUgcm93IGRlZmluaXRpb25cIiAtLT5cblxuICAgICAgPCEtLSBQb3NpdGlvbiBDb2x1bW4gLS0+XG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImNoZWNrYm94XCIgKm5nSWY9XCJlbmFibGVDaGVja2JveFwiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPlxuICAgICAgICAgIDxtYXQtY2hlY2tib3ggKGNoYW5nZSk9XCIkZXZlbnQgPyBtYXN0ZXJUb2dnbGUoKSA6IG51bGxcIiBbY2hlY2tlZF09XCJzZWxlY3Rpb24uaGFzVmFsdWUoKSAmJiBpc0FsbFNlbGVjdGVkKClcIlxuICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwic2VsZWN0aW9uLmhhc1ZhbHVlKCkgJiYgIWlzQWxsU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgICA8L3RoPlxuICAgICAgICA8IS0tIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCBlbGVtZW50XCI+IDxtYXQtY2hlY2tib3g+PC9tYXQtY2hlY2tib3g+IDwvdGQ+IC0tPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgPG1hdC1jaGVja2JveCAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGNoYW5nZSk9XCIkZXZlbnQgPyBzZWxlY3Rpb24udG9nZ2xlKHJvdykgOiBudWxsXCIgW2NoZWNrZWRdPVwic2VsZWN0aW9uLmlzU2VsZWN0ZWQocm93KVwiPlxuICAgICAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gTnVtYmVyIENvbHVtbiAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwibm9cIiAqbmdJZj1cInNob3dOdW1iZXJDb2x1bW5cIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXI+IE5vLiA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiID4gXG4gICAgICAgICAgIDxkaXY+e3tlbGVtZW50WydubyddfX08L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gRmllbGRzIENvbHVtbnMgLS0+XG4gICAgICA8bmctY29udGFpbmVyIFttYXRDb2x1bW5EZWZdPVwiYy5maWVsZE5hbWVcIiAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zXCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIFtjbGFzcy5oaWRlX29uX3hzXT1cImMuaGlkZU9uWHNcIj4ge3tjLmNvbHVtbk5hbWV9fSA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiIFtjbGFzcy5oaWRlX29uX3hzXT1cImMuaGlkZU9uWHNcIj4gXG4gICAgICAgICAgPCEtLSB7e2MuaXNEYXRlQ29sdW1uID9cbiAgICAgICAgICAoZ2V0RmllbGRWYWx1ZShlbGVtZW50LCBjKSB8IGRhdGU6J21lZGl1bScpIDpcbiAgICAgICAgICBnZXRGaWVsZFZhbHVlKGVsZW1lbnQsIGMpfX0gLS0+XG4gICAgICAgICAgIDxkaXYgW2lubmVySHRtbF0gPSBcImdldEZpZWxkVmFsdWUoZWxlbWVudCwgYylcIj48L2Rpdj48L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gT3RoZXIgQ29sdW1uIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJhY3Rpb25zXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPiB7e21vcmVBY3Rpb25zLm5hbWV9fSA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPlxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24+bGlzdDwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9yZUFjdGlvbnMuYWN0aW9uc1wiIChjbGljayk9XCJvbkFjdGlvbkNsaWNrKHtpZDogZWxlbWVudFttb3JlQWN0aW9ucy5pZEZpZWxkTmFtZV0sIGFjdGlvbk5hbWU6IGFjdGlvbi5hY3Rpb25OYW1lfSlcIj57e2FjdGlvbi5hY3Rpb25OYW1lfX08L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIj48L3RyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnM7XCI+PC90cj5cbiAgICA8L3RhYmxlPlxuICAgIDxtYXQtcGFnaW5hdG9yIChwYWdlKT1cInBhZ2VFdmVudCgkZXZlbnQpXCIgc2hvd0ZpcnN0TGFzdEJ1dHRvbnMgW2xlbmd0aF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIiBbcGFnZVNpemVdPVwiMjBcIiBbcGFnZVNpemVPcHRpb25zXT1cIlsxLCA1LCAxMCwgMjAsIDUwLCAxMDAsIDIwMF1cIj5cbiAgICA8L21hdC1wYWdpbmF0b3I+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFibGUtZmlsdGVyIGJ1dHRvbnttYXJnaW4tcmlnaHQ6OHB4O2Zsb2F0OnJpZ2h0fUBtZWRpYSAobWF4LXdpZHRoOjU3NnB4KXsuaGlkZV9vbl94c3tkaXNwbGF5Om5vbmV9fS5tYXQtdGFibGUtbG9hZGluZy1zaGFkZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjU2cHg7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjE1KTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5tYXQtY2VsbHtwYWRkaW5nLXJpZ2h0OjhweH1gXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IEFwcERhdGVBZGFwdGVyIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IEFQUF9EQVRFX0ZPUk1BVFNcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbXTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbjogU2VsZWN0aW9uTW9kZWw8YW55PiA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxhbnk+KHRydWUsIFtdKTtcbiAgQE91dHB1dCgpIHJvd1NlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uTW9kZWw8YW55Pj4oKTtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG5cbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8VGdyTWF0VGFibGVDb2x1bW4+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcbiAgQElucHV0KCkgbW9yZUFjdGlvbnM6IFRnck1vcmVBY3Rpb25zO1xuICBAT3V0cHV0KCkgYWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxUZ3JNb3JlQWN0aW9uRGF0YT4oKVxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxUZ3JEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xuICBASW5wdXQoKSBwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIEBJbnB1dCgpIHNob3dEZWZhdWx0RmlsdGVyczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dOdW1iZXJDb2x1bW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIEFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCBvbiB0aGUgcmVxdWVzdCBoZWFkZXJzXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT47XG4gIHBhZ2U6IFBhZ2U8YW55PjtcbiAgc2VsZWN0ZWQgPSBbXTtcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XG4gIGZpbHRlcjogT2JqZWN0ID0ge307XG4gIGZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgcHJpdmF0ZSBzb3J0UGFyYW1zOiBTb3J0O1xuICAvKipcbiAgICogQ2hlY2tzIGlmIHNlcnZlciByZXF1ZXN0IGhhcyBiZWVuIHByb2Nlc3NlZFxuICAgKi9cbiAgaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAvKipcbiAgICogRGF0ZSBwaXBlXG4gICAqL1xuICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55Pikge1xuICAgIHRoaXMucGFnZSA9IG5ldyBQYWdlKCk7XG4gICAgdGhpcy5wYWdlLmNvbnRlbnQgPSBbXTtcbiAgICB0aGlzLmRhdGVQaXBlID0gbmV3IERhdGVQaXBlKFwiZW4tVVNcIik7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgLy9pbnRpYWxpemluZyB0YWJsZSBjb2x1bW5zXG4gICAgaWYodGhpcy5lbmFibGVDaGVja2JveCl7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChcImNoZWNrYm94XCIpO1xuICAgIH1cbiAgICBpZih0aGlzLnNob3dOdW1iZXJDb2x1bW4pe1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goXCJub1wiKTtcbiAgICB9XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goYyA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChjLmZpZWxkTmFtZSk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubW9yZUFjdGlvbnMpIHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKFwiYWN0aW9uc1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIm1vcmVBY3Rpb25zIG5vdCBpbmplY3RlZCBza2lwcGluZyByZW5kZXJpbmcgJ01vcmUgQWN0aW9ucycgY29sdW1uXCIpO1xuICAgIH1cbiAgICBsZXQgZ3JvdXAgPSB7fTtcbiAgICB0aGlzLmZpbHRlckNvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgIGxldCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBpZiAoY29tcC5pc1JlcXVpcmVkKSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBUZ3JJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgVGdyVGV4dGFyZWEpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1heExlbmd0aCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIFRncklucHV0KSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpXG4gICAgfSk7XG4gICAgLy9hZGQgZGVmYXVsdCBjb250cm9sc1xuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMDApKTtcbiAgICBncm91cFsnbmVlZGxlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwMCkpO1xuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IDAsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGludGlhbGl6YXRpb24gZmlyZSBzZWxlY3Rpb24gZXZlbnRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvd1NlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgZWxlbWVudHMgbWF0Y2hlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MuICovXG4gIGlzQWxsU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgbnVtUm93cyA9IHRoaXMucGFnZS5jb250ZW50Lmxlbmd0aDtcbiAgICByZXR1cm4gbnVtU2VsZWN0ZWQgPT0gbnVtUm93cztcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIGFsbCByb3dzIGlmIHRoZXkgYXJlIG5vdCBhbGwgc2VsZWN0ZWQ7IG90aGVyd2lzZSBjbGVhciBzZWxlY3Rpb24uICovXG4gIG1hc3RlclRvZ2dsZSgpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpIDpcbiAgICAgIHRoaXMucGFnZS5jb250ZW50LmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBUZ3JNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMuYWN0aW9uc0V2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxuICAgKiBAcGFyYW0gcGFnZUluZm9cbiAgICogQHBhcmFtIGZpbHRlcnNcbiAgICovXG4gIGxvYWRQYWdlKHBhZ2VJbmZvLCBmaWx0ZXJzKSB7XG4gICAgaWYgKCF0aGlzLmVuZHBvaW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbXMpIHtcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleSAhPSBudWxsICYmIGtleSAhPSB1bmRlZmluZWQpIHsgLy9pZ25vcmUgbnVsbCB2YWx1ZXNcbiAgICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVlc3Quc2V0KFwicGFnZVwiLCBwYWdlSW5mby5vZmZzZXQpO1xuICAgIHJlcXVlc3Quc2V0KFwic2l6ZVwiLCBwYWdlSW5mby5saW1pdCk7XG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QsIHRoaXMuaGVhZGVycykuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGlmKHRoaXMuc2hvd051bWJlckNvbHVtbil7XG4gICAgICAgICAgbGV0IG5vID0gMSArIChyZXNwb25zZS5kYXRhLm51bWJlciAqIHJlc3BvbnNlLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgcmVzcG9uc2UuZGF0YS5jb250ZW50LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgdmFsWydubyddID0gbm8rKztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2UgPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNlcnZlciByZXF1ZXN0IGhhcyBmYWlsZWRcIik7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvbGlzdGVuIHRvIHBhZ2luYXRpb24gZXZlbnRzL2FjdGlvbnNcbiAgICogQHBhcmFtIHBhZ2UgXG4gICAqL1xuICBwYWdlRXZlbnQocGFnZTogUGFnZUV2ZW50KSB7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiBwYWdlLnBhZ2VTaXplLCBvZmZzZXQ6IHBhZ2UucGFnZUluZGV4IH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2Vzc2luZyB0YWJsZSBzb3J0aW5nXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHByb2Nlc3NTb3J0aW5nKGV2ZW50OiBTb3J0KSB7XG4gICAgdGhpcy5zb3J0UGFyYW1zID0gZXZlbnQ7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSwgb2Zmc2V0OiAwIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGdldCBmaWx0ZXIgZW50cmllcyBmcm9tIHRoZSBmaWx0ZXIgZm9ybS4gQWxzbyBhZGRzIHNvcnQgcGFyYW1ldGVycyB0byByZXF1ZXN0XG4gICAqL1xuICBwcml2YXRlIGdldEZpbHRlcnMoKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgLy8gbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIGxldCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJLZXkgaXMgXCIgKyBrZXkgKyBcIiBhbmQgdmFsdWUgXCIgKyB2YWwpO1xuICAgICAgaWYgKHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdKSB7XG4gICAgICAgIGlmICh2YWwgPT0gJ2Zyb20nIHx8IHZhbCA9PSBcInRvXCIpIHtcbiAgICAgICAgICBmLnNldCh2YWwsIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdLCAneXl5eS1NTS1kZCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmLnNldCh2YWwsIHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLy9hZGQgc29ydGluZyBwYXJhbWV0ZXJzXG4gICAgaWYgKHRoaXMuc29ydFBhcmFtcykge1xuICAgICAgZi5zZXQoXCJzb3J0XCIsIHRoaXMuc29ydFBhcmFtcy5hY3RpdmUgKyBcIixcIiArIHRoaXMuc29ydFBhcmFtcy5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZjtcbiAgfVxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXMgXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcbiAgICogQHBhcmFtIGZvcm0gXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBwcm9jZXNzRmlsdGVyKGZvcm0pIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgaW5wdXRcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzSW5wdXQoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JTZWxlY3Q7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxuICAgKi9cbiAgaXNUZXh0QXJlYShjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIFRnclRleHRhcmVhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgdmFyIG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcblxuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xuXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBjb2x1bW46IFRnck1hdFRhYmxlQ29sdW1uKSB7XG4gICAgaWYgKGNvbHVtbi5jYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGNvbHVtbi5jYWxsYmFjayhkYXRhKTtcbiAgICB9XG4gICAgdmFyIGs6IEFycmF5PHN0cmluZz4gPSBjb2x1bW4uZmllbGROYW1lLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldE9iamVjdFZhbHVlKGRhdGEsIGtleXMpO1xuICAgIHJldHVybiBjb2x1bW4uaXNEYXRlQ29sdW1uID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsICdtZWRpdW0nKSA6IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggZGF0YSB0YWJsZSB2YWx1ZXNcbiAgICovXG4gIHJlZnJlc2hUYWJsZSgpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiUmVmcmVzaGVkIGRhdGEgdGFibGVzXCIpO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCB0aGlzLmdldEZpbHRlcnMoKSk7XG4gIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIGRlZmluZSBkYXRhdGFibGUgY29sdW1ucyB3aXRoIGF0dHJpYnV0ZXMgKGNvbHVtbk5hbWUsIGZpZWxkTmFtZSwgd2lkdGgsIHNvcnRhYmxlLCBjYW5BdXRvUmVzaXplLFxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbilcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZ3JNYXRUYWJsZUNvbHVtbiB7XG4gIC8qKlxuICAgKiBjb2x1bW4gdGl0bGVcbiAgICovXG4gIGNvbHVtbk5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFNlcnZlciBzaWRlIHJlc3BvbnNlIGZpZWxkIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNvbHVtbiBpLmUgZnVsbE5hbWUgbWF5IGNvcnJlc3BvbmQgdG8gTmFtZSBjb2x1bW5cbiAgICovXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGNvbHVtblxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmFibGUgc29ydGluZyBpbiBhIGNvbHVtblxuICAgKi9cbiAgc29ydGFibGU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gIC8vICAqL1xuICAvLyBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcbiAgLy8gLyoqXG4gIC8vICAqIEVuYWJsZXMgYSBjb2x1bW4gdG8gYmUgZHJhZ2dhYmxlXG4gIC8vICAqL1xuICAvLyBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gIC8vICAqL1xuICAvLyByZXNpemVhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyB0aW1lc3RhbXAgdG8gc3RyaW5nIGRhdGVcbiAgICovXG4gIGlzRGF0ZUNvbHVtbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBIaWRlIG9uIHNtYWxsIGRldmljZSBsZXNzIHRoYW4gNTc2cHhcbiAgICovXG4gIGhpZGVPblhzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIHVzZWQgZm9yIGNlbGwgcmVuZGVyaW5nLlxuICAgKiAgTm90ZTogRnVuY3Rpb24gcmVzdWx0cyBhcmUgbm90IHNhbml0aXNlZFxuICAgKi9cbiAgY2FsbGJhY2s/OiBGdW5jdGlvbjtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIFRnck1vcmVBY3Rpb25zIHtcbiAgLyoqXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xuICAgKi9cbiAgbmFtZTogc3RyaW5nID0gXCJBY3Rpb25zXCI7XG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXG4gICAqL1xuICBpZEZpZWxkTmFtZTogc3RyaW5nID0gXCJpZFwiO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8VGdyTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PFRnck1vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZ3JNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSwgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vLi4vcHVibGljX2FwaSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGdyLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZnVsbC13aWR0aCBtZC1pY29uLWxlZnRcIj5cbiAgICA8bWF0LWljb24gKm5nSWY9XCJpY29uXCIgbWF0UHJlZml4IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdGV4dC1lc29rby10aWxsIGljb24tbWFyZ2luLXJpZ2h0XCI+e3tpY29ufX08L21hdC1pY29uPlxuICAgIDxpbnB1dCByZXF1aXJlZCBtYXRJbnB1dCBbcGxhY2Vob2xkZXJdPVwiaW5wdXRBdHRyaWJ1dGUucGxhY2Vob2xkZXJcIiAjdGV4dElucHV0IFtmb3JtQ29udHJvbF09XCJ0ZXh0Q29udHJvbFwiXG4gICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cInRleHRJbnB1dFwiIC8+XG4gICAgPCEtLSA8bWF0LWhpbnQgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXG4gICAgICAqbmdJZj1cIihhZ2VudElucHV0LnRvdWNoZWQgfHwgYWdlbnRJbnB1dC5kaXJ0eSkgJiYgYWdlbnRJbnB1dC5pbnZhbGlkICYmIGFnZW50SW5wdXQuZXJyb3JzLnJlcXVpcmVkXCJcbiAgICAgIGFsaWduPVwiZW5kXCI+Q3VycmVudCBhZ2VudCBpcyByZXF1aXJlZDwvbWF0LWhpbnQ+IC0tPlxuICAgIDxtYXQtYXV0b2NvbXBsZXRlIFthdXRvQWN0aXZlRmlyc3RPcHRpb25dPVwidHJ1ZVwiICN0ZXh0SW5wdXQ9XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZGlzcGxheVZhbFwiXG4gICAgICBbZGlzYWJsZVJpcHBsZV09XCJmYWxzZVwiIChvcHRpb25TZWxlY3RlZCk9XCJzZXRGaWVsZElkKCRldmVudClcIj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBlbGVtIG9mIHNlYXJjaEVsZW1lbnQgfCBhc3luY1wiIFt2YWx1ZV09XCJlbGVtXCI+XG4gICAgICAgIDxkaXYgW2lubmVySHRtbF0gPSBcImdldEZpZWxkVmFsdWUoZWxlbSlcIj48L2Rpdj5cbiAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgVGdyQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvKipcbiAgICogTW9kZWwgb2JqZWN0XG4gICAqL1xuICBtb2RlbDogT2JqZWN0ID0ge307XG4gIC8qKlxuICAgKiBQcm9ncmVzcyBpbmRpY2F0b3JcbiAgICovXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRleHQgZmllbGQgY29udHJvbFxuICAgKi9cbiAgdGV4dENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgLyoqXG4gICAqIFJldGFpbGVyIFJqeCBoYW5kbGVyXG4gICAqL1xuICBzZWFyY2hFbGVtZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oW10pO1xuICAvKipcbiAgICogR29vZ2xlIG1hdGVyaWFsIGljb25cbiAgICovXG4gIEBJbnB1dCgpIGljb246IHN0cmluZztcbiAgLyoqXG4gICAqIElkIGZpZWxkXG4gICAqL1xuICBASW5wdXQoKSBpbnB1dEF0dHJpYnV0ZTogSW5wdXRBdHRyaWJ1dGU7XG4gIC8qKlxuICAgKiBSZXF1ZXN0IHVybFxuICAgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjdXN0b20gaHR0cCBoZWFkZXJzXG4gICAqL1xuICBASW5wdXQoKSBodHRwSGVhZGVyczogSHR0cEhlYWRlcnM7XG4gIC8qKlxuICAgKiBEaXNwbGF5IHZhbHVlIGZ1bmN0aW9uXG4gICAqL1xuICBAT3V0cHV0KCkgZGlzcGxheVdpdGg6IEZ1bmN0aW9uO1xuICAvKipcbiAgICogU2VsZWN0aW9uIGV2ZW50IGZ1bmN0aW9uXG4gICAqL1xuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBTdGV3YXJkIHNlcnZpY2UgY2xpZW50IFxuICAgKiBcbiAgICogQHBhcmFtIHN0ZXJ3YXJkU2VydmljZSBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50OiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8YW55PiwgYW55PikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jbGllbnQuZ2V0KHRoaXMudXJsKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09IDIwMCl7XG4gICAgICAgIHRoaXMuc2VhcmNoRWxlbWVudC5uZXh0KHJlc3BvbnNlLmRhdGFbJ2NvbnRlbnQnXSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5IG5hbWUgb2YgdGhlIHNlbGVjdGVkIHVzZXJcbiAgICogXG4gICAqIEBwYXJhbSB2YWwgc2VsZWN0ZWQgdXNlclxuICAgKi9cbiAgZGlzcGxheVZhbCh2YWw6IGFueSkge1xuICAgIC8vIGlmKHRoaXMuZGlzcGxheVdpdGgpe1xuICAgIC8vICAgdGhpcy5kaXNwbGF5V2l0aCh2YWwpO1xuICAgIC8vIH1cbiAgICByZXR1cm4gdmFsID09IG51bGwgPyAnJyA6IHRoaXMuZ2V0RmllbGRWYWx1ZSh2YWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhc3NpZ25lZSBhZ2VudCBpdCBcbiAgICogXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHNldEZpZWxkSWQoZXZlbnQ6IE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQpe1xuICAgIC8vIHRoaXMub3B0aW9uU2VsZWN0ZWQoZXZlbnQpO1xuICAgIHRoaXMubW9kZWxbdGhpcy5pbnB1dEF0dHJpYnV0ZS5maWVsZElkXSA9IGV2ZW50Lm9wdGlvbi52YWx1ZVt0aGlzLmlucHV0QXR0cmlidXRlLmZpZWxkSWRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmaWVsZCB2YWx1ZVxuICAgKiBcbiAgICogQHBhcmFtIGVsZW0gXG4gICAqL1xuICBwdWJsaWMgZ2V0RmllbGRWYWx1ZShlbGVtOiBhbnkpe1xuICAgIGlmICh0aGlzLmlucHV0QXR0cmlidXRlLmNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnB1dEF0dHJpYnV0ZS5jYWxsYmFjayhlbGVtKTtcbiAgICB9XG4gICAgdmFyIGs6IEFycmF5PHN0cmluZz4gPSB0aGlzLmlucHV0QXR0cmlidXRlLmZpZWxkTmFtZS5zcGxpdChcIi5cIik7XG4gICAgdmFyIGtleXMgPSBuZXcgUXVldWU8c3RyaW5nPiguLi5rKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0T2JqZWN0VmFsdWUoZWxlbSwga2V5cyk7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRBdHRyaWJ1dGV7XG4gIFxuICAvKipcbiAgICogRmllbGQgbmFtZVxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBGaWVsZCBpZFxuICAgKi9cbiAgZmllbGRJZDogc3RyaW5nO1xuICAvKipcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdXNlZCBmb3IgZWxlbWVudHMgcmVuZGVyaW5nLlxuICAgKiAgTm90ZTogRnVuY3Rpb24gcmVzdWx0cyBhcmUgbm90IHNhbml0aXNlZFxuICAgKi9cbiAgY2FsbGJhY2s/OiBGdW5jdGlvbjtcbiAgLyoqXG4gICAqIHBsYWNlaG9sZGVyXG4gICAqL1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Rld2FyZENsaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU3Rld2FyZENvbmZpZyB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3Rnci1tYXRlcmlhbC10YWJsZS90Z3ItbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBNYXRJbnB1dE1vZHVsZSwgXHJcbiAgTWF0VGFibGVNb2R1bGUsIFxyXG4gIE1hdENoZWNrYm94TW9kdWxlLCBcclxuICBNYXRJY29uTW9kdWxlLCBcclxuICBNYXREYXRlcGlja2VyTW9kdWxlLCBcclxuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFNvcnRNb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSxcclxuICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXHJcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBUZ3JBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL3Rnci1hdXRvY29tcGxldGUvdGdyLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0U29ydE1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXHJcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgU3Rld2FyZENsaWVudENvbXBvbmVudCwgXHJcbiAgICBUZ3JNYXRlcmlhbFRhYmxlQ29tcG9uZW50LFxyXG4gICAgVGdyQXV0b2NvbXBsZXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCwgVGdyQXV0b2NvbXBsZXRlQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU3Rld2FyZENsaWVudE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbIHtwcm92aWRlOiBTdGV3YXJkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSBdXHJcbiAgICB9XHJcbiAgfVxyXG4gfVxyXG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJUZ3JBdXRvY29tcGxldGVDb21wb25lbnQiLCJJbnB1dEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFBQTs7OzBCQUhBO0lBZ0JDOzs7Ozs7QUNoQkQsSUFPQTs7O3dCQVBBO0lBV0MsQ0FBQTtBQUpEOzs7O0lBYUksOEJBQW9CLElBQWdCLEVBQVUsTUFBcUI7UUFBL0MsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7d0JBRmhELEdBQUc7UUFHbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1NBQzNGO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxH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