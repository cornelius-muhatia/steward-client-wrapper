import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
class ResponseWrapper {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StewardConfig {
}
/**
 * @template T, E
 */
class StewardClientService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                selector: 'stw-steward-client',
                template: `
    <p>
      steward-client works!
    </p>
  `,
                styles: []
            },] },
];
/** @nocollapse */
StewardClientComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
/** *
 * Material date formats
  @type {?} */
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
     * @return {?}
     */
    ngOnInit() {
        //intializing table columns
        if (this.enableCheckbox) {
            this.displayedColumns.push("checkbox");
        }
        if (this.showNumberColumn) {
            this.displayedColumns.push("no");
        }
        this.columns.forEach(c => {
            this.displayedColumns.push(c.fieldName);
        });
        if (this.moreActions) {
            this.displayedColumns.push("actions");
        }
        else {
            console.debug("moreActions not injected skipping rendering 'More Actions' column");
        }
        /** @type {?} */
        let group = {};
        this.filterComponents.forEach(comp => {
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
        });
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
            this.page.content.forEach(row => this.selection.select(row));
    }
    /**
     * Used to emit click event of the actions
     * @param {?} event
     * @return {?}
     */
    onActionClick(event) {
        this.actionsEvent.emit(event);
    }
    /**
     * Process server request of datable
     * @param {?} pageInfo
     * @param {?} filters
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
            this.params.forEach((value, key) => {
                if (key != null && key != undefined) {
                    //ignore null values
                    request.set(key, value);
                }
            });
        }
        request.set("page", pageInfo.offset);
        request.set("size", pageInfo.limit);
        this.sterwardService.get(this.endpoint, request, this.headers).subscribe(response => {
            if (response.status == 200) {
                if (this.showNumberColumn) {
                    /** @type {?} */
                    let no = 1 + (response.data.number * response.data.size);
                    response.data.content.forEach((val) => {
                        val['no'] = no++;
                    });
                }
                this.page = response.data;
            }
            this.isLoadingResults = false;
        }, error => {
            console.debug("Server request has failed");
            this.isLoadingResults = false;
        });
    }
    /**
     * Used tolisten to pagination events/actions
     * @param {?} page
     * @return {?}
     */
    pageEvent(page) {
        this.loadPage({ limit: page.pageSize, offset: page.pageIndex }, this.getFilters());
    }
    /**
     * Used to processing table sorting
     * @param {?} event
     * @return {?}
     */
    processSorting(event) {
        this.sortParams = event;
        this.loadPage({ limit: this.page.size, offset: 0 }, this.getFilters());
    }
    /**
     * Used to get filter entries from the filter form. Also adds sort parameters to request
     * @return {?}
     */
    getFilters() {
        /** @type {?} */
        let f = new Map();
        Object.keys(this.filterForm.value).forEach((val, key) => {
            // console.debug("Key is " + key + " and value " + val);
            if (this.filterForm.value[val]) {
                if (val == 'from' || val == "to") {
                    f.set(val, this.datePipe.transform(this.filterForm.value[val], 'yyyy-MM-dd'));
                }
                else {
                    f.set(val, this.filterForm.value[val]);
                }
            }
        });
        //add sorting parameters
        if (this.sortParams) {
            f.set("sort", this.sortParams.active + "," + this.sortParams.direction);
        }
        return f;
    }
    /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     * @deprecated
     * @param {?} form
     * @return {?}
     */
    processFilter(form) {
        //@ts-ignore
        this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
    }
    /**
     * Used to check if miliki control is input
     * @param {?} control
     * @return {?}
     */
    isInput(control) {
        return control instanceof TgrInput;
    }
    /**
     * Used to check if miliki control is select
     * @param {?} control
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
     * @param {?} date
     * @return {?}
     */
    getFormattedDate(date) {
        /** @type {?} */
        var year = date.getFullYear();
        /** @type {?} */
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        /** @type {?} */
        var day = date.getDate().toString();
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
        var k = column.fieldName.split(".");
        /** @type {?} */
        var keys = new Queue(...k);
        /** @type {?} */
        let value = this.sterwardService.getObjectValue(data, keys);
        return column.isDateColumn ? this.datePipe.transform(value, 'medium') : value;
    }
    /**
     * Refresh data table values
     * @return {?}
     */
    refreshTable() {
        console.debug("Refreshed data tables");
        //@ts-ignore
        this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
    }
}
TgrMaterialTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'tgr-material-table',
                template: `<div class="row"  *ngIf="showDefaultFilters || filterComponents.length > 0">
  <div class="col-md-12">
    <div class="card card-outline-default mat-elevation-z4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="mat-table-filter">
                <button title="Refresh" (click) = "refreshTable()" mat-icon-button color="basic" type="reset"><mat-icon>refresh</mat-icon></button>
            </div>
          </div>
        </div>
        <form (ngSubmit)="processFilter(filterForm)" [formGroup]="filterForm">
          <div class="row">
            <div class="col-md-3  mb-3" *ngFor="let control of filterComponents">
              <!-- Intialize form select control -->
              <mat-form-field class="col-md-12" *ngIf="isSelect(control.controlType)">
                <mat-select [placeholder]="control.placeholder" [formControlName]="control.name">
                  <mat-option *ngFor="let o of control.controlType.options" [value]="o.value">
                    {{o.text}}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="filterForm.get(control.name).hasError('required')">{{control.placeholder}}
                  is required</mat-error>
              </mat-form-field>

              <!-- Intialize form textarea control -->
              <mat-form-field class="col-md-12" *ngIf="isTextArea(control.controlType)">
                <textarea matInput [formControlName]="control.name" [placeholder]="control.label" [cols]="control.controlType.cols"
                  [rows]="control.controlType.rows"></textarea>
                <mat-error *ngIf="filterForm.get(control.name).hasError('required')">{{control.placeholder}}
                  is required</mat-error>
                <mat-error *ngIf="filterForm.get(control.name).hasError('minlength')">Minimum of
                  {{control.controlType.minLength}} characters</mat-error>
                <mat-error *ngIf="filterForm.get(control.name).hasError('maxlength')">Maximum of
                  {{control.controlType.maxLength}} characters</mat-error>
              </mat-form-field>

              <!-- Intialize form input control -->
              <mat-form-field class="col-md-12" *ngIf="isInput(control.controlType)">
                <!-- <mat-icon matPrefix class="material-icons icon-margin-right">perm_identity</mat-icon> -->
                <input matInput [placeholder]="control.label" [type]="control.controlType.type" [formControlName]="control.name" />
                <mat-error *ngIf="filterForm.get(control.name).hasError('required')">{{control.placeholder}}
                  is required</mat-error>
                <mat-error *ngIf="filterForm.get(control.name).hasError('minlength')">Minimum of
                  {{control.controlType.minLength}} characters</mat-error>
                <mat-error *ngIf="filterForm.get(control.name).hasError('maxlength')">Maximum of
                  {{control.controlType.maxLength}} characters</mat-error>
                <mat-error *ngIf="filterForm.get(control.name).hasError('min')">Should be greater than
                  {{control.controlType.min}}</mat-error>
                <mat-error *ngIf="filterForm.get(control.name).hasError('max')">Should be less than
                  {{control.controlType.max}}</mat-error>
              </mat-form-field>
            </div>
            <div class="col-md-3 mb-3" *ngIf="showDefaultFilters">
              <!-- <mat-icon matPrefix class="material-icons col-md-3">date_range</mat-icon> -->
              <mat-form-field class="col-md-12">
                <input matInput placeholder="From" type="date" [matDatepicker]="picker" formControlName="from" />
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>
            <div class="col-md-3 mb-3" *ngIf="showDefaultFilters">
              <mat-form-field class="col-md-12">
                <!-- <mat-icon>home</mat-icon> -->
                <input matInput placeholder="To" type="date" [matDatepicker]="toPicker" formControlName="to" />
                <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
                <mat-datepicker #toPicker></mat-datepicker>
              </mat-form-field>
            </div>
            <div class="col-md-3 mb-3" *ngIf="showDefaultFilters">
              <mat-form-field class="col-md-12">
                <input matInput maxlength="100" placeholder="Search" type="text" formControlName="needle" />
              </mat-form-field>
            </div>
            <span class="help-block" *ngIf="filterForm.get('from').touched">
              <span class="text-danger" *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 200 characters</span>
            </span>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="pull-right mat-table-filter">
                <button mat-raised-button color="primary" type="submit" [disabled]="filterForm.invalid">Filter</button>
                <button mat-raised-button color="basic" type="reset">Reset</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-12">
      <div class="mat-table-loading-shade" *ngIf="isLoadingResults">
        <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
      </div>
    <table mat-table [dataSource]="page.content" class="mat-elevation-z8" style="width: 100%" matSort (matSortChange)="processSorting($event)">

      <!--- Note that these columns can be defined in any order.
          The actual rendered columns are set as a property on the row definition" -->

      <!-- Position Column -->
      <ng-container matColumnDef="checkbox" *ngIf="enableCheckbox">
        <th mat-header-cell *matHeaderCellDef>
          <mat-checkbox (change)="$event ? masterToggle() : null" [checked]="selection.hasValue() && isAllSelected()"
            [indeterminate]="selection.hasValue() && !isAllSelected()">
          </mat-checkbox>
        </th>
        <!-- <td mat-cell *matCellDef="let element"> <mat-checkbox></mat-checkbox> </td> -->
        <td mat-cell *matCellDef="let row">
          <mat-checkbox (click)="$event.stopPropagation()" (change)="$event ? selection.toggle(row) : null" [checked]="selection.isSelected(row)">
          </mat-checkbox>
        </td>
      </ng-container>

      <!-- Number Column -->
      <ng-container matColumnDef="no" *ngIf="showNumberColumn">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>
        <td mat-cell *matCellDef="let element" > 
           <div>{{element['no']}}</div>
          </td>
      </ng-container>

      <!-- Fields Columns -->
      <ng-container [matColumnDef]="c.fieldName" *ngFor="let c of columns">
        <th mat-header-cell *matHeaderCellDef mat-sort-header [class.hide_on_xs]="c.hideOnXs"> {{c.columnName}} </th>
        <td mat-cell *matCellDef="let element" [class.hide_on_xs]="c.hideOnXs"> 
          <!-- {{c.isDateColumn ?
          (getFieldValue(element, c) | date:'medium') :
          getFieldValue(element, c)}} -->
           <div [innerHtml] = "getFieldValue(element, c)"></div></td>
      </ng-container>

      <!-- Other Column -->
      <ng-container matColumnDef="actions" *ngIf="moreActions">
        <th mat-header-cell *matHeaderCellDef> {{moreActions.name}} </th>
        <td mat-cell *matCellDef="let element">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>list</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item *ngFor="let action of moreActions.actions" (click)="onActionClick({id: element[moreActions.idFieldName], actionName: action.actionName})">{{action.actionName}}</button>
          </mat-menu>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <mat-paginator (page)="pageEvent($event)" showFirstLastButtons [length]="page.totalElements" [pageSize]="0" [pageSizeOptions]="[1, 5, 10, 20, 50, 100, 200]">
    </mat-paginator>
  </div>
</div>`,
                styles: [`.mat-table-filter button{margin-right:8px;float:right}@media (max-width:576px){.hide_on_xs{display:none}}.mat-table-loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.mat-cell{padding-right:8px}`],
                providers: [
                    { provide: DateAdapter, useClass: AppDateAdapter },
                    {
                        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
                    }
                ]
            },] },
];
/** @nocollapse */
TgrMaterialTableComponent.ctorParameters = () => [
    { type: StewardClientService }
];
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
/**
 * Used to display more actions column and the end of the table
 */
class TgrMoreActions {
    /**
     * @param {?} actions
     * @param {?=} id
     * @param {?=} name
     */
    constructor(actions, id, name) {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TgrAutocompleteComponent$$1 {
    /**
     * Steward service client
     *
     * @param {?} client
     */
    constructor(client) {
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
    ngOnInit() {
        this.client.get(this.url).subscribe(response => {
            if (response.status == 200) {
                this.searchElement.next(response.data['content']);
            }
        });
    }
    /**
     * Display name of the selected user
     *
     * @param {?} val selected user
     * @return {?}
     */
    displayVal(val) {
        // if(this.displayWith){
        //   this.displayWith(val);
        // }
        return val == null ? '' : this.getFieldValue(val);
    }
    /**
     * Set assignee agent it
     *
     * @param {?} event
     * @return {?}
     */
    setFieldId(event) {
        // this.optionSelected(event);
        this.model[this.inputAttribute.fieldId] = event.option.value[this.inputAttribute.fieldId];
    }
    /**
     * Get field value
     *
     * @param {?} elem
     * @return {?}
     */
    getFieldValue(elem) {
        if (this.inputAttribute.callback) {
            return this.inputAttribute.callback(elem);
        }
        /** @type {?} */
        var k = this.inputAttribute.fieldName.split(".");
        /** @type {?} */
        var keys = new Queue(...k);
        return this.client.getObjectValue(elem, keys);
    }
}
TgrAutocompleteComponent$$1.decorators = [
    { type: Component, args: [{
                selector: 'tgr-autocomplete',
                template: `<mat-form-field class="full-width md-icon-left">
    <mat-icon *ngIf="icon" matPrefix class="material-icons text-esoko-till icon-margin-right">{{icon}}</mat-icon>
    <input required matInput [placeholder]="inputAttribute.placeholder" #textInput [formControl]="textControl"
      [matAutocomplete]="textInput" />
    <!-- <mat-hint class="text-danger"
      *ngIf="(agentInput.touched || agentInput.dirty) && agentInput.invalid && agentInput.errors.required"
      align="end">Current agent is required</mat-hint> -->
    <mat-autocomplete [autoActiveFirstOption]="true" #textInput="matAutocomplete" [displayWith]="displayVal"
      [disableRipple]="false" (optionSelected)="setFieldId($event)">
      <mat-option *ngFor="let elem of searchElement | async" [value]="elem">
        <div [innerHtml] = "getFieldValue(elem)"></div>
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
TgrAutocompleteComponent$$1.ctorParameters = () => [
    { type: StewardClientService }
];
TgrAutocompleteComponent$$1.propDecorators = {
    icon: [{ type: Input }],
    inputAttribute: [{ type: Input }],
    url: [{ type: Input }],
    httpHeaders: [{ type: Input }],
    displayWith: [{ type: Output }],
    optionSelected: [{ type: Output }]
};
class InputAttribute$$1 {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StewardClientModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: StewardClientModule,
            providers: [{ provide: StewardConfig, useValue: config }]
        };
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { StewardConfig, StewardClientService, StewardClientComponent, StewardClientModule, Page, Sort, ResponseWrapper, AppDateAdapter, APP_DATE_FORMATS, TgrMaterialTableComponent, TgrMoreActions, TgrDynamicControl, TgrInput, TgrTextarea, TgrSelect, TgrSelectOption, TgrAutocompleteComponent$$1 as TgrAutocompleteComponent, InputAttribute$$1 as InputAttribute };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy90Z3ItZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvdGdyLW1hdGVyaWFsLXRhYmxlL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi90Z3ItYXV0b2NvbXBsZXRlL3Rnci1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNwb25zZVdyYXBwZXI8VD4ge1xuICAgIC8qKlxuICAgICAqIEh0dHAgc3RhdHVzIGNvZGUgZS5nLiAyMDBcbiAgICAgKi9cbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTZXJ2ZXIgbWVzc2FnZVxuICAgICAqL1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBY3R1YWwgcmVzcG9uc2UgZGF0YVxuICAgICAqL1xuICAgIGRhdGE6IFQ7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XHJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENvbmZpZyB7XHJcbiAgICBiYXNlX3VybDogc3RyaW5nO1xyXG4gICAgYWNjZXNzX3Rva2VuPzogc3RyaW5nO1xyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50U2VydmljZTxULCBFPiB7XHJcblxyXG4gICAgcHJpdmF0ZSBoZWFkZXJzOiBIdHRwSGVhZGVycztcclxuICAgIHRva2VuOiBzdHJpbmc7XHJcbiAgICBiYXNlX3VybDogc3RyaW5nID0gXCIvXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuYmFzZV91cmwgPSBjb25maWcuYmFzZV91cmw7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL2FwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIFwiQmVhcmVyIFwiICsgY29uZmlnLmFjY2Vzc190b2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFVzZWQgdG8gdXBkYXRlIGF1dGhvcml6YXRpb24gdG9rZW4uIEN1cnJlbnRseSBzdXBwb3J0cyBiZWFyZXIgdG9rZW5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRva2VuIFxyXG4gICAgICovXHJcbiAgICBzZXRUb2tlbih0b2tlbjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFjY2Vzc190b2tlbikgey8vdXBkYXRlIHRva2VuIGhlYWRlclxyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKTtcclxuICAgICAgICB9IGVsc2Ugey8vYXBwZW5kIGFjY2VzcyB0b2tlbiBpZiB0aGUgZW52aXJvbm1lbnQgaGFzIGFjY2VzcyB0b2tlbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgXCJCZWFyZXIgXCIgKyB0b2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBwb3N0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGFkZEhlYWRlcnM/OiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHsgaGVhZGVyczogYWRkSGVhZGVycyA/IHRoaXMuYXBwZW5kSGVhZGVycyhhZGRIZWFkZXJzKSA6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHB1dChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBhZGRIZWFkZXJzPzogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiBhZGRIZWFkZXJzID8gdGhpcy5hcHBlbmRIZWFkZXJzKGFkZEhlYWRlcnMpIDogdGhpcy5oZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBkZWxldGUgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0gYWRkSGVhZGVycyBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZXhpc3RpbmcgaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBkZWxldGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdkZWxldGUnLCB0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCB7IGhlYWRlcnM6IGFkZEhlYWRlcnMgPyB0aGlzLmFwcGVuZEhlYWRlcnMoYWRkSGVhZGVycykgOiB0aGlzLmhlYWRlcnMsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgaHR0cCBnZXQgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgcmVxdWVzdCBwYXJhbXNcclxuICAgICAqIEBwYXJhbSBhZGRIZWFkZXJzIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCB0byBleGlzdGluZyBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPiwgYWRkSGVhZGVycz86IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogYWRkSGVhZGVycyA/IHRoaXMuYXBwZW5kSGVhZGVycyhhZGRIZWFkZXJzKSA6IHRoaXMuaGVhZGVycyxcclxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmljZVVSTChlbmRwb2ludCksIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoIGEgZmlsZVxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIGdldEZpbGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpICsgJz9hY2Nlc3NfdG9rZW49JyArIHRoaXMudG9rZW4sIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogaWZcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGhlYWRlcnMgXHJcbiAgICAgKi9cclxuICAgIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnMuZ2V0KFwiQXV0aG9yaXphdGlvblwiKSAmJiAoIWhlYWRlcnMpKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghaGVhZGVycykge1xyXG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZSBodHRwIGZvcm0gZGF0YSByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgZXhwZWN0cyBlaXRoZXIgYW4gZW5kcG9pbnQgb3IgdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSkgfSkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyBodHRwIHB1dCBmb3JtIGRhdGEgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIGVuZHBvaW50IGV4cGVjdHMgZWl0aGVyIGFuIGVuZHBvaW50IG9yIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGEgdmFsaWQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1dEZvcm1EYXRhTXVsdGlQYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5zZXJ2aWNlVVJMKGVuZHBvaW50KSwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgbWFwIHRvIEh0dHBQYXJhbXNcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xyXG4gICAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlV3JhcHBlcigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZW5kZXJNb3JlKGlkOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgZGF0YXRhYmxlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBleHBlY3RzIGVpdGhlciBhbiBlbmRwb2ludCBvciB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYSB2YWxpZCBtYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZpY2VVUkwoZW5kcG9pbnQpLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGlmIGEgc3RyaW5nIGlzIGEgdmFsaWQgVVJMXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1VSTCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBVUkwodXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoXykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlIHVybCBwYXJhbWV0ZXIgaXMgYW4gZW5kcG9pbnQgaXQgYXBwZW5kcyB0byB0aGUgYmFzZSB1cmxcclxuICAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAgKiBAc2VlIGJhc2VfdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJ2aWNlVVJMKHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaXNVUkwodXJsKSkgPyB1cmwgOiB0aGlzLmJhc2VfdXJsICsgdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxyXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XHJcbiAgICogQHBhcmFtIGtleXMgaS5lLiB1c2VyLmdlbmRlci50eXBlLnR5cGVcclxuICAgKi9cclxuICAgIHB1YmxpYyBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcclxuICAgICAgICBpZiAoKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHx8IChrZXlzLmxlbmd0aCA9PSAxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVtrZXlzLnRhaWxdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKGtleSA9PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGFba2V5XSwga2V5cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09IGtleXMudGFpbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gYXBwZW5kIGhlYWRlcnMgdGhlIGN1cnJlbnQgaHR0cEhlYWRlcnNcclxuICAgICAqIEByZXR1cm5zIG1lcmdlZCBoZWFkZXJzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhcHBlbmRIZWFkZXJzKGVudHJpZXM6IE1hcDxTdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IEh0dHBIZWFkZXJze1xyXG4gICAgICAgIGxldCBjdXN0b21IZWFkZXJzOiBIdHRwSGVhZGVycyA9IHRoaXMuaGVhZGVycztcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goKHZhbDogc3RyaW5nIHwgc3RyaW5nW10sIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGN1c3RvbUhlYWRlcnMgPSBjdXN0b21IZWFkZXJzLmFwcGVuZChrZXksIHZhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGN1c3RvbUhlYWRlcnM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LXN0ZXdhcmQtY2xpZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHA+XHJcbiAgICAgIHN0ZXdhcmQtY2xpZW50IHdvcmtzIVxyXG4gICAgPC9wPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyoqXG4gKiBEYXRhYmxlIHBhZ2UgdXNlZCB0byB3cmFwcGVyIHNlcnZlciBjb250ZW50IHJlc3BvbnNlXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlPFQ+IHtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2Ugc2FtZSBhcyBsaW1pdFxuICAgICAqL1xuICAgIHNpemU6IG51bWJlciA9IDEwO1xuICAgIC8qKlxuICAgICAqIFRvdGFsIGl0ZW1zIGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyXG4gICAgICovXG4gICAgdG90YWxFbGVtZW50czogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgcGFnZXMgcHJlc2VudFxuICAgICAqL1xuICAgIHRvdGFsUGFnZXM6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGlzIHRoZSBmaXJzdCBwYWdlXG4gICAgICovXG4gICAgZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBpdCBpcyB0aGUgbGFzdCBwYWdlXG4gICAgICovXG4gICAgbGFzdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFRoZSBhY3R1YWwgcGFnZSBjb250ZW50XG4gICAgICovXG4gICAgY29udGVudDogQXJyYXk8VD4gPSBbXTtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIG1hcCBzb3J0IHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBzb3J0ZWQ6IFNvcnQgPSBuZXcgU29ydCgpO1xuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgcGFnZSBudW1iZXJcbiAgICAgKi9cbiAgICBudW1iZXI6IG51bWJlciA9IDA7XG59XG4vKipcbiAqIHVzZWQgdG8gbWFwIHNvcnQgcmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgU29ydHtcbiAgICBzb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB1bnNvcnRlZDogYm9vbGVhbiA9IHRydWU7XG59XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgZHluYW1pYyBodG1sIGNvbnRyb2xzIChJbnB1dCwgVGV4dEFyZWEgYW5kIFNlbGVjdClcbiAqL1xuZXhwb3J0IGNsYXNzIFRnckR5bmFtaWNDb250cm9sPFQ+IHtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIGxhYmVsXG4gICAgICovXG4gICAgbGFiZWw6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJY29uIHRvIGJlIGFwcGVuZGVkIGJlZm9yZSB0aGUgY29udHJvbCAoc3VwcG9ydHMgY2xhc3MgZGVmaW5lZCBpY29ucylcbiAgICAgKi9cbiAgICBpY29uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgY29udHJvbCAocHJvdmlkZSB2YXJpYWJsZSB2YWxpZCBuYW1lcyBpZS4gbm8gc3BhY2VzIHByZWZhcmFibHkgYXBpIGNvcnJlc3BvbmRpbmcgbmFtZXMgZS5nLiB1c2VyTmFtZSlcbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdHVhbCBjb250cm9sIChUZ3JJbnB1dCwgVGdyVGV4dEFyZWEgJiBUZ3JTZWxlY3QpXG4gICAgICovXG4gICAgY29udHJvbFR5cGU6IFQ7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBmaWVsZCBpcyByZXF1aXJlZFxuICAgICAqL1xuICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ29udHJvbCBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjb250cm9sVHlwZTogVCwgaWNvbjogc3RyaW5nID0gXCJmYSBmYS1maWxlLXRleHQtb1wiLFxuICAgICAgICBpc1JlcXVpcmVkOiBib29sZWFuID0gZmFsc2UsIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IGNvbnRyb2xUeXBlO1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLmlzUmVxdWlyZWQgPSBpc1JlcXVpcmVkO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgPyBwbGFjZWhvbGRlciA6IGxhYmVsO1xuICAgIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIHJlcHJlc2VudCBodG1sIGlucHV0IHdpdGggb3B0aW9uczpcbiAqIHR5cGU6IGRlZmF1bHQgdG8gdGV4dCwgIG1heExlbmd0aCwgbWluTGVuZ3RoLCBtaW4sIG1heFxuICovXG5leHBvcnQgY2xhc3MgVGdySW5wdXR7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBpbnB1dCBlLmcuIHRleHQsIG51bWJlciwgZGF0ZVxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGxlbmd0aCBvZiB0aGUgaW5wdXRcbiAgICAgKi9cbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWluOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWF4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcgPSBcInRleHRcIikge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IHRoaXMubWluID0gMDtcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1heCA9IDEwMDAwMDAwMDA7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgaHRtbCB0ZXh0YXJlYSBpbnB1dFxuICovXG5leHBvcnQgY2xhc3MgVGdyVGV4dGFyZWF7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIHRleHRhcmVhIGNvbHVtbnNcbiAgICAgKi9cbiAgICBjb2xzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiB0ZXh0YXJlYSByb3dzXG4gICAgICovXG4gICAgcm93cz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBtYXhpbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xzOiBudW1iZXIgPSA1LCByb3dzOiBudW1iZXIgPSAxKXtcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IDBcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHNlbGVjdCBjb250cm9sXG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JTZWxlY3Qge1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCBvcHRpb25zXG4gICAgICovXG4gICAgb3B0aW9uczogQXJyYXk8VGdyU2VsZWN0T3B0aW9uPjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PFRnclNlbGVjdE9wdGlvbj4pe1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgVGdyU2VsZWN0T3B0aW9ue1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRleHQvbGFiZWxcbiAgICAgKi9cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgPSBudWxsKXtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0ID8gdGV4dCA6IHZhbHVlO1xuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcbmltcG9ydCB7IE1sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrVGV4dGFyZWEsIE1sa1NlbGVjdCB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZURhdGVBZGFwdGVyLCBQYWdlRXZlbnQsIE1hdFNvcnQsIFNvcnQgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IFRnckR5bmFtaWNDb250cm9sLCBUZ3JJbnB1dCwgVGdyU2VsZWN0LCBUZ3JUZXh0YXJlYSB9IGZyb20gJy4uL2VudGl0aWVzL3Rnci1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEZvcm1hdCBhbmd1bGFyIGRhdGUgdG8gZGQtbW0teXl5eVxuICovXG5leHBvcnQgY2xhc3MgQXBwRGF0ZUFkYXB0ZXIgZXh0ZW5kcyBOYXRpdmVEYXRlQWRhcHRlciB7XG5cbiAgLyoqXG4gICAqIFBhcnNlIGRhdGUgdG8gZGQtbW0teXl5eVxuICAgKiBAcGFyYW0gZGF0ZSAgZGF0ZSBpbnB1dFxuICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBleHBlY3RzIHRvIGJlIGlucHV0IHN0cmluZ1xuICAgKi9cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IE9iamVjdCk6IHN0cmluZyB7XG5cbiAgICBpZiAoZGlzcGxheUZvcm1hdCA9PT0gJ2lucHV0Jykge1xuXG4gICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGxldCBkYXlTdHJpbmc6IHN0cmluZztcbiAgICAgIGxldCBtb250aFN0cmluZzogc3RyaW5nO1xuXG4gICAgICBpZiAoZGF5IDwgMTApIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJzAnICsgZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJycgKyBkYXk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgIG1vbnRoU3RyaW5nID0gJzAnICsgbW9udGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb250aFN0cmluZyA9ICcnICsgbW9udGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRoU3RyaW5nfS0ke2RheVN0cmluZ31gO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpO1xuICB9XG59XG4vKipcbiAqIE1hdGVyaWFsIGRhdGUgZm9ybWF0c1xuICovXG5leHBvcnQgY29uc3QgQVBQX0RBVEVfRk9STUFUUyA9XG57XG4gIHBhcnNlOiB7XG4gICAgZGF0ZUlucHV0OiB7IG1vbnRoOiAnbnVtZXJpYycsIHllYXI6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgfSxcbiAgZGlzcGxheToge1xuICAgIGRhdGVJbnB1dDogJ2lucHV0JyxcbiAgICBtb250aFllYXJMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycgfSxcbiAgICBkYXRlQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgICBtb250aFllYXJBMTF5TGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnIH0sXG4gIH1cbn07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGdyLW1hdGVyaWFsLXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicm93XCIgICpuZ0lmPVwic2hvd0RlZmF1bHRGaWx0ZXJzIHx8IGZpbHRlckNvbXBvbmVudHMubGVuZ3RoID4gMFwiPlxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHQgbWF0LWVsZXZhdGlvbi16NFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC10YWJsZS1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHRpdGxlPVwiUmVmcmVzaFwiIChjbGljaykgPSBcInJlZnJlc2hUYWJsZSgpXCIgbWF0LWljb24tYnV0dG9uIGNvbG9yPVwiYmFzaWNcIiB0eXBlPVwicmVzZXRcIj48bWF0LWljb24+cmVmcmVzaDwvbWF0LWljb24+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxuICAgICAgICAgICAgICA8IS0tIEludGlhbGl6ZSBmb3JtIHNlbGVjdCBjb250cm9sIC0tPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIiAqbmdJZj1cImlzU2VsZWN0KGNvbnRyb2wuY29udHJvbFR5cGUpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG8gb2YgY29udHJvbC5jb250cm9sVHlwZS5vcHRpb25zXCIgW3ZhbHVlXT1cIm8udmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAge3tvLnRleHR9fVxuICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19XG4gICAgICAgICAgICAgICAgICBpcyByZXF1aXJlZDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgICAgICAgICAgIDwhLS0gSW50aWFsaXplIGZvcm0gdGV4dGFyZWEgY29udHJvbCAtLT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCIgKm5nSWY9XCJpc1RleHRBcmVhKGNvbnRyb2wuY29udHJvbFR5cGUpXCI+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wubGFiZWxcIiBbY29sc109XCJjb250cm9sLmNvbnRyb2xUeXBlLmNvbHNcIlxuICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiY29udHJvbC5jb250cm9sVHlwZS5yb3dzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19XG4gICAgICAgICAgICAgICAgICBpcyByZXF1aXJlZDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZlxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heExlbmd0aH19IGNoYXJhY3RlcnM8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgICAgICAgICAgICA8IS0tIEludGlhbGl6ZSBmb3JtIGlucHV0IGNvbnRyb2wgLS0+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiICpuZ0lmPVwiaXNJbnB1dChjb250cm9sLmNvbnRyb2xUeXBlKVwiPlxuICAgICAgICAgICAgICAgIDwhLS0gPG1hdC1pY29uIG1hdFByZWZpeCBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGljb24tbWFyZ2luLXJpZ2h0XCI+cGVybV9pZGVudGl0eTwvbWF0LWljb24+IC0tPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5sYWJlbFwiIFt0eXBlXT1cImNvbnRyb2wuY29udHJvbFR5cGUudHlwZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgLz5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19XG4gICAgICAgICAgICAgICAgICBpcyByZXF1aXJlZDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZlxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heExlbmd0aH19IGNoYXJhY3RlcnM8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWluJylcIj5TaG91bGQgYmUgZ3JlYXRlciB0aGFuXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWlufX08L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4fX08L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIiAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVyc1wiPlxuICAgICAgICAgICAgICA8IS0tIDxtYXQtaWNvbiBtYXRQcmVmaXggY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBjb2wtbWQtM1wiPmRhdGVfcmFuZ2U8L21hdC1pY29uPiAtLT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiRnJvbVwiIHR5cGU9XCJkYXRlXCIgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwiZnJvbVwiIC8+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiICpuZ0lmPVwic2hvd0RlZmF1bHRGaWx0ZXJzXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICAgIDwhLS0gPG1hdC1pY29uPmhvbWU8L21hdC1pY29uPiAtLT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJUb1wiIHR5cGU9XCJkYXRlXCIgW21hdERhdGVwaWNrZXJdPVwidG9QaWNrZXJcIiBmb3JtQ29udHJvbE5hbWU9XCJ0b1wiIC8+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJ0b1BpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjdG9QaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIiAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVyc1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgbWF4bGVuZ3RoPVwiMTAwXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIiB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cIm5lZWRsZVwiIC8+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAyMDAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0IG1hdC10YWJsZS1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiZmlsdGVyRm9ybS5pbnZhbGlkXCI+RmlsdGVyPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImJhc2ljXCIgdHlwZT1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwicm93XCI+XG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtdGFibGUtbG9hZGluZy1zaGFkZVwiICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPlxuICAgICAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+PC9tYXQtc3Bpbm5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwicGFnZS5jb250ZW50XCIgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXo4XCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiIG1hdFNvcnQgKG1hdFNvcnRDaGFuZ2UpPVwicHJvY2Vzc1NvcnRpbmcoJGV2ZW50KVwiPlxuXG4gICAgICA8IS0tLSBOb3RlIHRoYXQgdGhlc2UgY29sdW1ucyBjYW4gYmUgZGVmaW5lZCBpbiBhbnkgb3JkZXIuXG4gICAgICAgICAgVGhlIGFjdHVhbCByZW5kZXJlZCBjb2x1bW5zIGFyZSBzZXQgYXMgYSBwcm9wZXJ0eSBvbiB0aGUgcm93IGRlZmluaXRpb25cIiAtLT5cblxuICAgICAgPCEtLSBQb3NpdGlvbiBDb2x1bW4gLS0+XG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImNoZWNrYm94XCIgKm5nSWY9XCJlbmFibGVDaGVja2JveFwiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPlxuICAgICAgICAgIDxtYXQtY2hlY2tib3ggKGNoYW5nZSk9XCIkZXZlbnQgPyBtYXN0ZXJUb2dnbGUoKSA6IG51bGxcIiBbY2hlY2tlZF09XCJzZWxlY3Rpb24uaGFzVmFsdWUoKSAmJiBpc0FsbFNlbGVjdGVkKClcIlxuICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwic2VsZWN0aW9uLmhhc1ZhbHVlKCkgJiYgIWlzQWxsU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgICA8L3RoPlxuICAgICAgICA8IS0tIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCBlbGVtZW50XCI+IDxtYXQtY2hlY2tib3g+PC9tYXQtY2hlY2tib3g+IDwvdGQ+IC0tPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgPG1hdC1jaGVja2JveCAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGNoYW5nZSk9XCIkZXZlbnQgPyBzZWxlY3Rpb24udG9nZ2xlKHJvdykgOiBudWxsXCIgW2NoZWNrZWRdPVwic2VsZWN0aW9uLmlzU2VsZWN0ZWQocm93KVwiPlxuICAgICAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gTnVtYmVyIENvbHVtbiAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwibm9cIiAqbmdJZj1cInNob3dOdW1iZXJDb2x1bW5cIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXI+IE5vLiA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiID4gXG4gICAgICAgICAgIDxkaXY+e3tlbGVtZW50WydubyddfX08L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gRmllbGRzIENvbHVtbnMgLS0+XG4gICAgICA8bmctY29udGFpbmVyIFttYXRDb2x1bW5EZWZdPVwiYy5maWVsZE5hbWVcIiAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zXCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIFtjbGFzcy5oaWRlX29uX3hzXT1cImMuaGlkZU9uWHNcIj4ge3tjLmNvbHVtbk5hbWV9fSA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiIFtjbGFzcy5oaWRlX29uX3hzXT1cImMuaGlkZU9uWHNcIj4gXG4gICAgICAgICAgPCEtLSB7e2MuaXNEYXRlQ29sdW1uID9cbiAgICAgICAgICAoZ2V0RmllbGRWYWx1ZShlbGVtZW50LCBjKSB8IGRhdGU6J21lZGl1bScpIDpcbiAgICAgICAgICBnZXRGaWVsZFZhbHVlKGVsZW1lbnQsIGMpfX0gLS0+XG4gICAgICAgICAgIDxkaXYgW2lubmVySHRtbF0gPSBcImdldEZpZWxkVmFsdWUoZWxlbWVudCwgYylcIj48L2Rpdj48L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gT3RoZXIgQ29sdW1uIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJhY3Rpb25zXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPiB7e21vcmVBY3Rpb25zLm5hbWV9fSA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPlxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24+bGlzdDwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9yZUFjdGlvbnMuYWN0aW9uc1wiIChjbGljayk9XCJvbkFjdGlvbkNsaWNrKHtpZDogZWxlbWVudFttb3JlQWN0aW9ucy5pZEZpZWxkTmFtZV0sIGFjdGlvbk5hbWU6IGFjdGlvbi5hY3Rpb25OYW1lfSlcIj57e2FjdGlvbi5hY3Rpb25OYW1lfX08L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIj48L3RyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnM7XCI+PC90cj5cbiAgICA8L3RhYmxlPlxuICAgIDxtYXQtcGFnaW5hdG9yIChwYWdlKT1cInBhZ2VFdmVudCgkZXZlbnQpXCIgc2hvd0ZpcnN0TGFzdEJ1dHRvbnMgW2xlbmd0aF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIiBbcGFnZVNpemVdPVwiMFwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwiWzEsIDUsIDEwLCAyMCwgNTAsIDEwMCwgMjAwXVwiPlxuICAgIDwvbWF0LXBhZ2luYXRvcj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWJsZS1maWx0ZXIgYnV0dG9ue21hcmdpbi1yaWdodDo4cHg7ZmxvYXQ6cmlnaHR9QG1lZGlhIChtYXgtd2lkdGg6NTc2cHgpey5oaWRlX29uX3hze2Rpc3BsYXk6bm9uZX19Lm1hdC10YWJsZS1sb2FkaW5nLXNoYWRle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3R0b206NTZweDtyaWdodDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTUpO3otaW5kZXg6MTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lm1hdC1jZWxse3BhZGRpbmctcmlnaHQ6OHB4fWBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IERhdGVBZGFwdGVyLCB1c2VDbGFzczogQXBwRGF0ZUFkYXB0ZXIgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogQVBQX0RBVEVfRk9STUFUU1xuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZ3JNYXRlcmlhbFRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IFtdO1xuICBAT3V0cHV0KCkgc2VsZWN0aW9uOiBTZWxlY3Rpb25Nb2RlbDxhbnk+ID0gbmV3IFNlbGVjdGlvbk1vZGVsPGFueT4odHJ1ZSwgW10pO1xuICBAT3V0cHV0KCkgcm93U2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25Nb2RlbDxhbnk+PigpO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cblxuICBASW5wdXQoKSBjb2x1bW5zOiBBcnJheTxUZ3JNYXRUYWJsZUNvbHVtbj4gPSBbXTtcbiAgQElucHV0KCkgZW5hYmxlQ2hlY2tib3g6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBlbmRwb2ludDogc3RyaW5nO1xuICBASW5wdXQoKSBtb3JlQWN0aW9uczogVGdyTW9yZUFjdGlvbnM7XG4gIEBPdXRwdXQoKSBhY3Rpb25zRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFRnck1vcmVBY3Rpb25EYXRhPigpXG4gIEBJbnB1dCgpIGZpbHRlckNvbXBvbmVudHM6IEFycmF5PFRnckR5bmFtaWNDb250cm9sPGFueT4+ID0gW107XG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcbiAgQElucHV0KCkgc2hvd0RlZmF1bHRGaWx0ZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd051bWJlckNvbHVtbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogQWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIG9uIHRoZSByZXF1ZXN0IGhlYWRlcnNcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPjtcbiAgcGFnZTogUGFnZTxhbnk+O1xuICBzZWxlY3RlZCA9IFtdO1xuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGU6IERhdGF0YWJsZUNvbXBvbmVudDtcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcbiAgZmlsdGVyRm9ybTogRm9ybUdyb3VwO1xuICBwcml2YXRlIHNvcnRQYXJhbXM6IFNvcnQ7XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgc2VydmVyIHJlcXVlc3QgaGFzIGJlZW4gcHJvY2Vzc2VkXG4gICAqL1xuICBpc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gIC8qKlxuICAgKiBEYXRlIHBpcGVcbiAgICovXG4gIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGVyd2FyZFNlcnZpY2U6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxQYWdlPGFueT4+LCBhbnk+KSB7XG4gICAgdGhpcy5wYWdlID0gbmV3IFBhZ2UoKTtcbiAgICB0aGlzLnBhZ2UuY29udGVudCA9IFtdO1xuICAgIHRoaXMuZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoXCJlbi1VU1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgZnJvbSBmaWx0ZXJDb21wb25lbnRzIGFuZCBhbHNvIGFwcGVuZGluZyBkZWZhdWx0IGNvbnRyb2xzIGllLiBkYXRlIGZpbHRlciBhbmQgc2VhcmNoIGNvbnRyb2xzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvL2ludGlhbGl6aW5nIHRhYmxlIGNvbHVtbnNcbiAgICBpZih0aGlzLmVuYWJsZUNoZWNrYm94KXtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKFwiY2hlY2tib3hcIik7XG4gICAgfVxuICAgIGlmKHRoaXMuc2hvd051bWJlckNvbHVtbil7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChcIm5vXCIpO1xuICAgIH1cbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKGMuZmllbGROYW1lKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5tb3JlQWN0aW9ucykge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goXCJhY3Rpb25zXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwibW9yZUFjdGlvbnMgbm90IGluamVjdGVkIHNraXBwaW5nIHJlbmRlcmluZyAnTW9yZSBBY3Rpb25zJyBjb2x1bW5cIik7XG4gICAgfVxuICAgIGxldCBncm91cCA9IHt9O1xuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgbGV0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIFRncklucHV0IHx8IGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBUZ3JUZXh0YXJlYSkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgVGdySW5wdXQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KGNvbXAuY29udHJvbFR5cGUubWF4KSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xuICAgICAgfVxuICAgICAgZ3JvdXBbY29tcC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgdmFsaWRhdG9ycylcbiAgICB9KTtcbiAgICAvL2FkZCBkZWZhdWx0IGNvbnRyb2xzXG4gICAgZ3JvdXBbJ2Zyb20nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMTAwKSk7XG4gICAgZ3JvdXBbJ3RvJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW50aWFsaXphdGlvbiBmaXJlIHNlbGVjdGlvbiBldmVudFxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMucm93U2VsZWN0aW9uLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG51bWJlciBvZiBzZWxlY3RlZCBlbGVtZW50cyBtYXRjaGVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cy4gKi9cbiAgaXNBbGxTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBudW1TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICBjb25zdCBudW1Sb3dzID0gdGhpcy5wYWdlLmNvbnRlbnQubGVuZ3RoO1xuICAgIHJldHVybiBudW1TZWxlY3RlZCA9PSBudW1Sb3dzO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgYWxsIHJvd3MgaWYgdGhleSBhcmUgbm90IGFsbCBzZWxlY3RlZDsgb3RoZXJ3aXNlIGNsZWFyIHNlbGVjdGlvbi4gKi9cbiAgbWFzdGVyVG9nZ2xlKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCkgOlxuICAgICAgdGhpcy5wYWdlLmNvbnRlbnQuZm9yRWFjaChyb3cgPT4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0KHJvdykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IFRnck1vcmVBY3Rpb25EYXRhKSB7XG4gICAgdGhpcy5hY3Rpb25zRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKi9cbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmFtcykge1xuICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoa2V5ICE9IG51bGwgJiYga2V5ICE9IHVuZGVmaW5lZCkgeyAvL2lnbm9yZSBudWxsIHZhbHVlc1xuICAgICAgICAgIHJlcXVlc3Quc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxdWVzdC5zZXQoXCJwYWdlXCIsIHBhZ2VJbmZvLm9mZnNldCk7XG4gICAgcmVxdWVzdC5zZXQoXCJzaXplXCIsIHBhZ2VJbmZvLmxpbWl0KTtcbiAgICB0aGlzLnN0ZXJ3YXJkU2VydmljZS5nZXQodGhpcy5lbmRwb2ludCwgcmVxdWVzdCwgdGhpcy5oZWFkZXJzKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgaWYodGhpcy5zaG93TnVtYmVyQ29sdW1uKXtcbiAgICAgICAgICBsZXQgbm8gPSAxICsgKHJlc3BvbnNlLmRhdGEubnVtYmVyICogcmVzcG9uc2UuZGF0YS5zaXplKTtcbiAgICAgICAgICByZXNwb25zZS5kYXRhLmNvbnRlbnQuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICB2YWxbJ25vJ10gPSBubysrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICB9XG4gICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICB9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiU2VydmVyIHJlcXVlc3QgaGFzIGZhaWxlZFwiKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG9saXN0ZW4gdG8gcGFnaW5hdGlvbiBldmVudHMvYWN0aW9uc1xuICAgKiBAcGFyYW0gcGFnZSBcbiAgICovXG4gIHBhZ2VFdmVudChwYWdlOiBQYWdlRXZlbnQpIHtcbiAgICB0aGlzLmxvYWRQYWdlKHsgbGltaXQ6IHBhZ2UucGFnZVNpemUsIG9mZnNldDogcGFnZS5wYWdlSW5kZXggfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cblxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzaW5nIHRhYmxlIHNvcnRpbmdcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgcHJvY2Vzc1NvcnRpbmcoZXZlbnQ6IFNvcnQpIHtcbiAgICB0aGlzLnNvcnRQYXJhbXMgPSBldmVudDtcbiAgICB0aGlzLmxvYWRQYWdlKHsgbGltaXQ6IHRoaXMucGFnZS5zaXplLCBvZmZzZXQ6IDAgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZ2V0IGZpbHRlciBlbnRyaWVzIGZyb20gdGhlIGZpbHRlciBmb3JtLiBBbHNvIGFkZHMgc29ydCBwYXJhbWV0ZXJzIHRvIHJlcXVlc3RcbiAgICovXG4gIHByaXZhdGUgZ2V0RmlsdGVycygpIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICAvLyBsZXQgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKSk7XG4gICAgbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKCk7XG4gICAgT2JqZWN0LmtleXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKS5mb3JFYWNoKCh2YWwsIGtleSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcIktleSBpcyBcIiArIGtleSArIFwiIGFuZCB2YWx1ZSBcIiArIHZhbCk7XG4gICAgICBpZiAodGhpcy5maWx0ZXJGb3JtLnZhbHVlW3ZhbF0pIHtcbiAgICAgICAgaWYgKHZhbCA9PSAnZnJvbScgfHwgdmFsID09IFwidG9cIikge1xuICAgICAgICAgIGYuc2V0KHZhbCwgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0odGhpcy5maWx0ZXJGb3JtLnZhbHVlW3ZhbF0sICd5eXl5LU1NLWRkJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGYuc2V0KHZhbCwgdGhpcy5maWx0ZXJGb3JtLnZhbHVlW3ZhbF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAvL2FkZCBzb3J0aW5nIHBhcmFtZXRlcnNcbiAgICBpZiAodGhpcy5zb3J0UGFyYW1zKSB7XG4gICAgICBmLnNldChcInNvcnRcIiwgdGhpcy5zb3J0UGFyYW1zLmFjdGl2ZSArIFwiLFwiICsgdGhpcy5zb3J0UGFyYW1zLmRpcmVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBmO1xuICB9XG4gIC8qKlxuICAgKiBVc2VkIHRvIHByb2Nlc3MgdGFibGUgZmlsdGVyLiBJZiBkYXRlIGZpbHRlciBpcyBub3QgcHJvdmlkZSB0aGUgZnJvbSB2YWx1ZSBpcyBcbiAgICogc2V0IHRvIDIwMTgtMDEtMDEgYW5kIHRvIHZhbHVlIGlzIHNldCB0byAxIHllYXIgZnJvbSB0b2RheVxuICAgKiBAcGFyYW0gZm9ybSBcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIHByb2Nlc3NGaWx0ZXIoZm9ybSkge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCB0aGlzLmdldEZpbHRlcnMoKSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBpbnB1dFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNJbnB1dChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIFRncklucHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgc2VsZWN0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc1NlbGVjdChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIFRnclNlbGVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHRleHRhcmVhXG4gICAqL1xuICBpc1RleHRBcmVhKGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgVGdyVGV4dGFyZWE7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmb3JtYXQgZGF0ZSB0byBzdHJpbmcgeXl5eS1NTS1kZFxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKi9cbiAgZ2V0Rm9ybWF0dGVkRGF0ZShkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICB2YXIgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcbiAgICBtb250aCA9IG1vbnRoLmxlbmd0aCA+IDEgPyBtb250aCA6ICcwJyArIG1vbnRoO1xuXG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgZGF5ID0gZGF5Lmxlbmd0aCA+IDEgPyBkYXkgOiAnMCcgKyBkYXk7XG5cbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xuICB9XG5cbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGNvbHVtbjogVGdyTWF0VGFibGVDb2x1bW4pIHtcbiAgICBpZiAoY29sdW1uLmNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gY29sdW1uLmNhbGxiYWNrKGRhdGEpO1xuICAgIH1cbiAgICB2YXIgazogQXJyYXk8c3RyaW5nPiA9IGNvbHVtbi5maWVsZE5hbWUuc3BsaXQoXCIuXCIpO1xuICAgIHZhciBrZXlzID0gbmV3IFF1ZXVlPHN0cmluZz4oLi4uayk7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0T2JqZWN0VmFsdWUoZGF0YSwga2V5cyk7XG4gICAgcmV0dXJuIGNvbHVtbi5pc0RhdGVDb2x1bW4gPyB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgJ21lZGl1bScpIDogdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBkYXRhIHRhYmxlIHZhbHVlc1xuICAgKi9cbiAgcmVmcmVzaFRhYmxlKCkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJSZWZyZXNoZWQgZGF0YSB0YWJsZXNcIik7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG59XG4vKipcbiAqIFVzZWQgdG8gZGVmaW5lIGRhdGF0YWJsZSBjb2x1bW5zIHdpdGggYXR0cmlidXRlcyAoY29sdW1uTmFtZSwgZmllbGROYW1lLCB3aWR0aCwgc29ydGFibGUsIGNhbkF1dG9SZXNpemUsXG4gKiBkcmFnZ2FibGUsIHJlc2l6YWJsZSwgaXNEYXRlQ29sdW1uKVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRnck1hdFRhYmxlQ29sdW1uIHtcbiAgLyoqXG4gICAqIGNvbHVtbiB0aXRsZVxuICAgKi9cbiAgY29sdW1uTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEVuYWJsZSBzb3J0aW5nIGluIGEgY29sdW1uXG4gICAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIC8vIC8qKlxuICAvLyAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgLy8gICovXG4gIC8vIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcbiAgLy8gICovXG4gIC8vIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gIC8vIC8qKlxuICAvLyAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgLy8gICovXG4gIC8vIHJlc2l6ZWFibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxuICAgKi9cbiAgaXNEYXRlQ29sdW1uPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEhpZGUgb24gc21hbGwgZGV2aWNlIGxlc3MgdGhhbiA1NzZweFxuICAgKi9cbiAgaGlkZU9uWHM/OiBib29sZWFuO1xuICAvKipcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdXNlZCBmb3IgY2VsbCByZW5kZXJpbmcuXG4gICAqICBOb3RlOiBGdW5jdGlvbiByZXN1bHRzIGFyZSBub3Qgc2FuaXRpc2VkXG4gICAqL1xuICBjYWxsYmFjaz86IEZ1bmN0aW9uO1xufVxuXG4vKipcbiAqIFVzZWQgdG8gZGlzcGxheSBtb3JlIGFjdGlvbnMgY29sdW1uIGFuZCB0aGUgZW5kIG9mIHRoZSB0YWJsZVxuICovXG5leHBvcnQgY2xhc3MgVGdyTW9yZUFjdGlvbnMge1xuICAvKipcbiAgICogQWN0aW9uIENvbHVtbiBuYW1lIGUuZy4gTW9yZSBBY3Rpb25zXG4gICAqL1xuICBuYW1lOiBzdHJpbmcgPSBcIkFjdGlvbnNcIjtcbiAgLyoqXG4gICAqIEZpZWxkIG5hbWUgaWQgZnJvbSB0aGUgc2VydmVyIHJlc3BvbnNlIGUuZyB1c2VySWRcbiAgICovXG4gIGlkRmllbGROYW1lOiBzdHJpbmcgPSBcImlkXCI7XG4gIC8qKlxuICAgKiBBY3Rpb25zIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25zOiBBcnJheTxUZ3JNb3JlQWN0aW9uRGF0YT47XG5cbiAgY29uc3RydWN0b3IoYWN0aW9uczogQXJyYXk8VGdyTW9yZUFjdGlvbkRhdGE+LCBpZD86IHN0cmluZywgbmFtZT86IHN0cmluZykge1xuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkRmllbGROYW1lID0gaWQ7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRnck1vcmVBY3Rpb25EYXRhIHtcbiAgLyoqXG4gICAqIE5ldmVyIG1pbmQgdGhpcyBmaWVsZCBpdCB3aWxsIGJlIHVzZWQgYnkgdGhlIGxpYnJhcnlcbiAgICovXG4gIGlkPzogYW55O1xuICAvKipcbiAgICogQWN0aW9uIG5hbWUgZS5nLiBFZGl0LCBEZWxldGVcbiAgICovXG4gIGFjdGlvbk5hbWU6IGFueTtcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRTZXJ2aWNlLCBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXBpJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0Z3ItYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmdWxsLXdpZHRoIG1kLWljb24tbGVmdFwiPlxuICAgIDxtYXQtaWNvbiAqbmdJZj1cImljb25cIiBtYXRQcmVmaXggY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0ZXh0LWVzb2tvLXRpbGwgaWNvbi1tYXJnaW4tcmlnaHRcIj57e2ljb259fTwvbWF0LWljb24+XG4gICAgPGlucHV0IHJlcXVpcmVkIG1hdElucHV0IFtwbGFjZWhvbGRlcl09XCJpbnB1dEF0dHJpYnV0ZS5wbGFjZWhvbGRlclwiICN0ZXh0SW5wdXQgW2Zvcm1Db250cm9sXT1cInRleHRDb250cm9sXCJcbiAgICAgIFttYXRBdXRvY29tcGxldGVdPVwidGV4dElucHV0XCIgLz5cbiAgICA8IS0tIDxtYXQtaGludCBjbGFzcz1cInRleHQtZGFuZ2VyXCJcbiAgICAgICpuZ0lmPVwiKGFnZW50SW5wdXQudG91Y2hlZCB8fCBhZ2VudElucHV0LmRpcnR5KSAmJiBhZ2VudElucHV0LmludmFsaWQgJiYgYWdlbnRJbnB1dC5lcnJvcnMucmVxdWlyZWRcIlxuICAgICAgYWxpZ249XCJlbmRcIj5DdXJyZW50IGFnZW50IGlzIHJlcXVpcmVkPC9tYXQtaGludD4gLS0+XG4gICAgPG1hdC1hdXRvY29tcGxldGUgW2F1dG9BY3RpdmVGaXJzdE9wdGlvbl09XCJ0cnVlXCIgI3RleHRJbnB1dD1cIm1hdEF1dG9jb21wbGV0ZVwiIFtkaXNwbGF5V2l0aF09XCJkaXNwbGF5VmFsXCJcbiAgICAgIFtkaXNhYmxlUmlwcGxlXT1cImZhbHNlXCIgKG9wdGlvblNlbGVjdGVkKT1cInNldEZpZWxkSWQoJGV2ZW50KVwiPlxuICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGVsZW0gb2Ygc2VhcmNoRWxlbWVudCB8IGFzeW5jXCIgW3ZhbHVlXT1cImVsZW1cIj5cbiAgICAgICAgPGRpdiBbaW5uZXJIdG1sXSA9IFwiZ2V0RmllbGRWYWx1ZShlbGVtKVwiPjwvZGl2PlxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBUZ3JBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8qKlxuICAgKiBNb2RlbCBvYmplY3RcbiAgICovXG4gIG1vZGVsOiBPYmplY3QgPSB7fTtcbiAgLyoqXG4gICAqIFByb2dyZXNzIGluZGljYXRvclxuICAgKi9cbiAgaXNMb2FkaW5nOiBib29sZWFuO1xuICAvKipcbiAgICogVGV4dCBmaWVsZCBjb250cm9sXG4gICAqL1xuICB0ZXh0Q29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAvKipcbiAgICogUmV0YWlsZXIgUmp4IGhhbmRsZXJcbiAgICovXG4gIHNlYXJjaEVsZW1lbnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihbXSk7XG4gIC8qKlxuICAgKiBHb29nbGUgbWF0ZXJpYWwgaWNvblxuICAgKi9cbiAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAvKipcbiAgICogSWQgZmllbGRcbiAgICovXG4gIEBJbnB1dCgpIGlucHV0QXR0cmlidXRlOiBJbnB1dEF0dHJpYnV0ZTtcbiAgLyoqXG4gICAqIFJlcXVlc3QgdXJsXG4gICAqL1xuICBASW5wdXQoKSB1cmw6IHN0cmluZztcbiAgLyoqXG4gICAqIGN1c3RvbSBodHRwIGhlYWRlcnNcbiAgICovXG4gIEBJbnB1dCgpIGh0dHBIZWFkZXJzOiBIdHRwSGVhZGVycztcbiAgLyoqXG4gICAqIERpc3BsYXkgdmFsdWUgZnVuY3Rpb25cbiAgICovXG4gIEBPdXRwdXQoKSBkaXNwbGF5V2l0aDogRnVuY3Rpb247XG4gIC8qKlxuICAgKiBTZWxlY3Rpb24gZXZlbnQgZnVuY3Rpb25cbiAgICovXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIFN0ZXdhcmQgc2VydmljZSBjbGllbnQgXG4gICAqIFxuICAgKiBAcGFyYW0gc3RlcndhcmRTZXJ2aWNlIFxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnQ6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxhbnk+LCBhbnk+KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNsaWVudC5nZXQodGhpcy51cmwpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgdGhpcy5zZWFyY2hFbGVtZW50Lm5leHQocmVzcG9uc2UuZGF0YVsnY29udGVudCddKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXkgbmFtZSBvZiB0aGUgc2VsZWN0ZWQgdXNlclxuICAgKiBcbiAgICogQHBhcmFtIHZhbCBzZWxlY3RlZCB1c2VyXG4gICAqL1xuICBkaXNwbGF5VmFsKHZhbDogYW55KSB7XG4gICAgLy8gaWYodGhpcy5kaXNwbGF5V2l0aCl7XG4gICAgLy8gICB0aGlzLmRpc3BsYXlXaXRoKHZhbCk7XG4gICAgLy8gfVxuICAgIHJldHVybiB2YWwgPT0gbnVsbCA/ICcnIDogdGhpcy5nZXRGaWVsZFZhbHVlKHZhbCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFzc2lnbmVlIGFnZW50IGl0IFxuICAgKiBcbiAgICogQHBhcmFtIGV2ZW50IFxuICAgKi9cbiAgc2V0RmllbGRJZChldmVudDogTWF0QXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudCl7XG4gICAgLy8gdGhpcy5vcHRpb25TZWxlY3RlZChldmVudCk7XG4gICAgdGhpcy5tb2RlbFt0aGlzLmlucHV0QXR0cmlidXRlLmZpZWxkSWRdID0gZXZlbnQub3B0aW9uLnZhbHVlW3RoaXMuaW5wdXRBdHRyaWJ1dGUuZmllbGRJZF07XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZpZWxkIHZhbHVlXG4gICAqIFxuICAgKiBAcGFyYW0gZWxlbSBcbiAgICovXG4gIHB1YmxpYyBnZXRGaWVsZFZhbHVlKGVsZW06IGFueSl7XG4gICAgaWYgKHRoaXMuaW5wdXRBdHRyaWJ1dGUuY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0QXR0cmlidXRlLmNhbGxiYWNrKGVsZW0pO1xuICAgIH1cbiAgICB2YXIgazogQXJyYXk8c3RyaW5nPiA9IHRoaXMuaW5wdXRBdHRyaWJ1dGUuZmllbGROYW1lLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5nZXRPYmplY3RWYWx1ZShlbGVtLCBrZXlzKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dEF0dHJpYnV0ZXtcbiAgXG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lXG4gICAqL1xuICBmaWVsZE5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIEZpZWxkIGlkXG4gICAqL1xuICBmaWVsZElkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiB1c2VkIGZvciBlbGVtZW50cyByZW5kZXJpbmcuXG4gICAqICBOb3RlOiBGdW5jdGlvbiByZXN1bHRzIGFyZSBub3Qgc2FuaXRpc2VkXG4gICAqL1xuICBjYWxsYmFjaz86IEZ1bmN0aW9uO1xuICAvKipcbiAgICogcGxhY2Vob2xkZXJcbiAgICovXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ3hEYXRhdGFibGVNb2R1bGUgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTdGV3YXJkQ29uZmlnIH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGdyLW1hdGVyaWFsLXRhYmxlL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIE1hdElucHV0TW9kdWxlLCBcclxuICBNYXRUYWJsZU1vZHVsZSwgXHJcbiAgTWF0Q2hlY2tib3hNb2R1bGUsIFxyXG4gIE1hdEljb25Nb2R1bGUsIFxyXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsIFxyXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0U29ydE1vZHVsZSxcclxuICBNYXRNZW51TW9kdWxlLFxyXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcclxuICBNYXRBdXRvY29tcGxldGVNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFRnckF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vdGdyLWF1dG9jb21wbGV0ZS90Z3ItYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdFRhYmxlTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTb3J0TW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBcclxuICAgIFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQsXHJcbiAgICBUZ3JBdXRvY29tcGxldGVDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBUZ3JNYXRlcmlhbFRhYmxlQ29tcG9uZW50LCBUZ3JBdXRvY29tcGxldGVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBTdGV3YXJkQ2xpZW50TW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFsge3Byb3ZpZGU6IFN0ZXdhcmRDb25maWcsIHVzZVZhbHVlOiBjb25maWd9IF1cclxuICAgIH1cclxuICB9XHJcbiB9XHJcbiJdLCJuYW1lcyI6WyJUZ3JBdXRvY29tcGxldGVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Q0FhQzs7Ozs7O0FDaEJEO0NBV0M7Ozs7QUFHRDs7Ozs7SUFNSSxZQUFvQixJQUFnQixFQUFVLE1BQXFCO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO3dCQUZoRCxHQUFHO1FBR2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztTQUMzRjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDM0IsY0FBYyxFQUFFLGlDQUFpQzthQUNwRCxDQUFDLENBQUM7U0FDTjtRQUNELElB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