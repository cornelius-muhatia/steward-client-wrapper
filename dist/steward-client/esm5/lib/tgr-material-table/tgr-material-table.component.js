/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
import { SelectionModel } from '@angular/cdk/collections';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter, MatSort } from "@angular/material";
import { TgrInput, TgrSelect, TgrTextarea } from '../entities/tgr-dynamic-control';
import { DatePipe } from '@angular/common';
/**
 * Format angular date to dd-mm-yyyy
 */
var /**
 * Format angular date to dd-mm-yyyy
 */
AppDateAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(AppDateAdapter, _super);
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
/**
 * Format angular date to dd-mm-yyyy
 */
export { AppDateAdapter };
/** *
 * Material date formats
  @type {?} */
export var APP_DATE_FORMATS = {
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
        var keys = new (Queue.bind.apply(Queue, tslib_1.__spread([void 0], k)))();
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
export { TgrMaterialTableComponent };
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
    TgrMaterialTableComponent.prototype.table;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.filter;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.filterForm;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.sortParams;
    /**
     * Checks if server request has been processed
     * @type {?}
     */
    TgrMaterialTableComponent.prototype.isLoadingResults;
    /**
     * Date pipe
     * @type {?}
     */
    TgrMaterialTableComponent.prototype.datePipe;
    /** @type {?} */
    TgrMaterialTableComponent.prototype.sterwardService;
}
/**
 * Used to define datatable columns with attributes (columnName, fieldName, width, sortable, canAutoResize,
 * draggable, resizable, isDateColumn)
 * @record
 */
export function TgrMatTableColumn() { }
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
/**
 * Used to display more actions column and the end of the table
 */
var /**
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
 * Used to display more actions column and the end of the table
 */
export { TgrMoreActions };
if (false) {
    /**
     * Action Column name e.g. More Actions
     * @type {?}
     */
    TgrMoreActions.prototype.name;
    /**
     * Field name id from the server response e.g userId
     * @type {?}
     */
    TgrMoreActions.prototype.idFieldName;
    /**
     * Actions e.g. Edit, Delete
     * @type {?}
     */
    TgrMoreActions.prototype.actions;
}
/**
 * @record
 */
export function TgrMoreActionData() { }
/**
 * Never mind this field it will be used by the library
 * @type {?|undefined}
 */
TgrMoreActionData.prototype.id;
/**
 * Action name e.g. Edit, Delete
 * @type {?}
 */
TgrMoreActionData.prototype.actionName;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3Rnci1tYXRlcmlhbC10YWJsZS90Z3ItbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBVSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sd0JBQXdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLGlCQUFpQixFQUFhLE9BQU8sRUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hGLE9BQU8sRUFBcUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLM0M7OztBQUFBO0lBQW9DLDBDQUFpQjs7OztJQUVuRDs7OztPQUlHOzs7Ozs7O0lBQ0gsK0JBQU07Ozs7OztJQUFOLFVBQU8sSUFBVSxFQUFFLGFBQXFCO1FBRXRDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxPQUFPLENB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c0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0Zvcm0sIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcGFnZSc7XG5pbXBvcnQgeyBNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1RleHRhcmVhLCBNbGtTZWxlY3QgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sJztcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUywgTUFUX0RBVEVfTE9DQUxFIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVEYXRlQWRhcHRlciwgUGFnZUV2ZW50LCBNYXRTb3J0LCBTb3J0IH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBUZ3JEeW5hbWljQ29udHJvbCwgVGdySW5wdXQsIFRnclNlbGVjdCwgVGdyVGV4dGFyZWEgfSBmcm9tICcuLi9lbnRpdGllcy90Z3ItZHluYW1pYy1jb250cm9sJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBGb3JtYXQgYW5ndWxhciBkYXRlIHRvIGRkLW1tLXl5eXlcbiAqL1xuZXhwb3J0IGNsYXNzIEFwcERhdGVBZGFwdGVyIGV4dGVuZHMgTmF0aXZlRGF0ZUFkYXB0ZXIge1xuXG4gIC8qKlxuICAgKiBQYXJzZSBkYXRlIHRvIGRkLW1tLXl5eXlcbiAgICogQHBhcmFtIGRhdGUgIGRhdGUgaW5wdXRcbiAgICogQHBhcmFtIGRpc3BsYXlGb3JtYXQgZXhwZWN0cyB0byBiZSBpbnB1dCBzdHJpbmdcbiAgICovXG4gIGZvcm1hdChkYXRlOiBEYXRlLCBkaXNwbGF5Rm9ybWF0OiBPYmplY3QpOiBzdHJpbmcge1xuXG4gICAgaWYgKGRpc3BsYXlGb3JtYXQgPT09ICdpbnB1dCcpIHtcblxuICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBsZXQgZGF5U3RyaW5nOiBzdHJpbmc7XG4gICAgICBsZXQgbW9udGhTdHJpbmc6IHN0cmluZztcblxuICAgICAgaWYgKGRheSA8IDEwKSB7XG4gICAgICAgIGRheVN0cmluZyA9ICcwJyArIGRheTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRheVN0cmluZyA9ICcnICsgZGF5O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9udGggPCAxMCkge1xuICAgICAgICBtb250aFN0cmluZyA9ICcwJyArIG1vbnRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9udGhTdHJpbmcgPSAnJyArIG1vbnRoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7eWVhcn0tJHttb250aFN0cmluZ30tJHtkYXlTdHJpbmd9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgfVxufVxuLyoqXG4gKiBNYXRlcmlhbCBkYXRlIGZvcm1hdHNcbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9EQVRFX0ZPUk1BVFMgPVxue1xuICBwYXJzZToge1xuICAgIGRhdGVJbnB1dDogeyBtb250aDogJ251bWVyaWMnLCB5ZWFyOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0sXG4gIH0sXG4gIGRpc3BsYXk6IHtcbiAgICBkYXRlSW5wdXQ6ICdpbnB1dCcsXG4gICAgbW9udGhZZWFyTGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnIH0sXG4gICAgZGF0ZUExMXlMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0sXG4gICAgbW9udGhZZWFyQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJyB9LFxuICB9XG59O1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Rnci1tYXRlcmlhbC10YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInJvd1wiICAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVycyB8fCBmaWx0ZXJDb21wb25lbnRzLmxlbmd0aCA+IDBcIj5cbiAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtb3V0bGluZS1kZWZhdWx0IG1hdC1lbGV2YXRpb24tejRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXQtdGFibGUtZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0aXRsZT1cIlJlZnJlc2hcIiAoY2xpY2spID0gXCJyZWZyZXNoVGFibGUoKVwiIG1hdC1pY29uLWJ1dHRvbiBjb2xvcj1cImJhc2ljXCIgdHlwZT1cInJlc2V0XCI+PG1hdC1pY29uPnJlZnJlc2g8L21hdC1pY29uPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwicHJvY2Vzc0ZpbHRlcihmaWx0ZXJGb3JtKVwiIFtmb3JtR3JvdXBdPVwiZmlsdGVyRm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiICpuZ0Zvcj1cImxldCBjb250cm9sIG9mIGZpbHRlckNvbXBvbmVudHNcIj5cbiAgICAgICAgICAgICAgPCEtLSBJbnRpYWxpemUgZm9ybSBzZWxlY3QgY29udHJvbCAtLT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCIgKm5nSWY9XCJpc1NlbGVjdChjb250cm9sLmNvbnRyb2xUeXBlKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIGNvbnRyb2wuY29udHJvbFR5cGUub3B0aW9uc1wiIFt2YWx1ZV09XCJvLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7by50ZXh0fX1cbiAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fVxuICAgICAgICAgICAgICAgICAgaXMgcmVxdWlyZWQ8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgICAgICAgICAgICA8IS0tIEludGlhbGl6ZSBmb3JtIHRleHRhcmVhIGNvbnRyb2wgLS0+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLmxhYmVsXCIgW2NvbHNdPVwiY29udHJvbC5jb250cm9sVHlwZS5jb2xzXCJcbiAgICAgICAgICAgICAgICAgIFtyb3dzXT1cImNvbnRyb2wuY29udHJvbFR5cGUucm93c1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fVxuICAgICAgICAgICAgICAgICAgaXMgcmVxdWlyZWQ8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWluTGVuZ3RofX0gY2hhcmFjdGVyczwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXhMZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgICAgICAgICAgPCEtLSBJbnRpYWxpemUgZm9ybSBpbnB1dCBjb250cm9sIC0tPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIiAqbmdJZj1cImlzSW5wdXQoY29udHJvbC5jb250cm9sVHlwZSlcIj5cbiAgICAgICAgICAgICAgICA8IS0tIDxtYXQtaWNvbiBtYXRQcmVmaXggY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBpY29uLW1hcmdpbi1yaWdodFwiPnBlcm1faWRlbnRpdHk8L21hdC1pY29uPiAtLT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wubGFiZWxcIiBbdHlwZV09XCJjb250cm9sLmNvbnRyb2xUeXBlLnR5cGVcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiIC8+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fVxuICAgICAgICAgICAgICAgICAgaXMgcmVxdWlyZWQ8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWluTGVuZ3RofX0gY2hhcmFjdGVyczwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXhMZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbicpXCI+U2hvdWxkIGJlIGdyZWF0ZXIgdGhhblxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heCcpXCI+U2hvdWxkIGJlIGxlc3MgdGhhblxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heH19PC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCIgKm5nSWY9XCJzaG93RGVmYXVsdEZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgPCEtLSA8bWF0LWljb24gbWF0UHJlZml4IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgY29sLW1kLTNcIj5kYXRlX3JhbmdlPC9tYXQtaWNvbj4gLS0+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cIkZyb21cIiB0eXBlPVwiZGF0ZVwiIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiIGZvcm1Db250cm9sTmFtZT1cImZyb21cIiAvPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIiAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVyc1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICA8IS0tIDxtYXQtaWNvbj5ob21lPC9tYXQtaWNvbj4gLS0+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiVG9cIiB0eXBlPVwiZGF0ZVwiIFttYXREYXRlcGlja2VyXT1cInRvUGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidG9cIiAvPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwidG9QaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3RvUGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCIgKm5nSWY9XCJzaG93RGVmYXVsdEZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IG1heGxlbmd0aD1cIjEwMFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCIgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJuZWVkbGVcIiAvPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMjAwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBtYXQtdGFibGUtZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cImZpbHRlckZvcm0uaW52YWxpZFwiPkZpbHRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJiYXNpY1wiIHR5cGU9XCJyZXNldFwiPlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LXRhYmxlLWxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHNcIj5cbiAgICAgICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8dGFibGUgbWF0LXRhYmxlIFtkYXRhU291cmNlXT1cInBhZ2UuY29udGVudFwiIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16OFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiBtYXRTb3J0IChtYXRTb3J0Q2hhbmdlKT1cInByb2Nlc3NTb3J0aW5nKCRldmVudClcIj5cblxuICAgICAgPCEtLS0gTm90ZSB0aGF0IHRoZXNlIGNvbHVtbnMgY2FuIGJlIGRlZmluZWQgaW4gYW55IG9yZGVyLlxuICAgICAgICAgIFRoZSBhY3R1YWwgcmVuZGVyZWQgY29sdW1ucyBhcmUgc2V0IGFzIGEgcHJvcGVydHkgb24gdGhlIHJvdyBkZWZpbml0aW9uXCIgLS0+XG5cbiAgICAgIDwhLS0gUG9zaXRpb24gQ29sdW1uIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJjaGVja2JveFwiICpuZ0lmPVwiZW5hYmxlQ2hlY2tib3hcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94IChjaGFuZ2UpPVwiJGV2ZW50ID8gbWFzdGVyVG9nZ2xlKCkgOiBudWxsXCIgW2NoZWNrZWRdPVwic2VsZWN0aW9uLmhhc1ZhbHVlKCkgJiYgaXNBbGxTZWxlY3RlZCgpXCJcbiAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cInNlbGVjdGlvbi5oYXNWYWx1ZSgpICYmICFpc0FsbFNlbGVjdGVkKClcIj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC90aD5cbiAgICAgICAgPCEtLSA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPiA8bWF0LWNoZWNrYm94PjwvbWF0LWNoZWNrYm94PiA8L3RkPiAtLT5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgIDxtYXQtY2hlY2tib3ggKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIChjaGFuZ2UpPVwiJGV2ZW50ID8gc2VsZWN0aW9uLnRvZ2dsZShyb3cpIDogbnVsbFwiIFtjaGVja2VkXT1cInNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdylcIj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIE51bWJlciBDb2x1bW4gLS0+XG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cIm5vXCIgKm5nSWY9XCJzaG93TnVtYmVyQ29sdW1uXCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyPiBOby4gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIiA+IFxuICAgICAgICAgICA8ZGl2Pnt7ZWxlbWVudFsnbm8nXX19PC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIEZpZWxkcyBDb2x1bW5zIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbWF0Q29sdW1uRGVmXT1cImMuZmllbGROYW1lXCIgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uc1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBbY2xhc3MuaGlkZV9vbl94c109XCJjLmhpZGVPblhzXCI+IHt7Yy5jb2x1bW5OYW1lfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIiBbY2xhc3MuaGlkZV9vbl94c109XCJjLmhpZGVPblhzXCI+IFxuICAgICAgICAgIDwhLS0ge3tjLmlzRGF0ZUNvbHVtbiA/XG4gICAgICAgICAgKGdldEZpZWxkVmFsdWUoZWxlbWVudCwgYykgfCBkYXRlOidtZWRpdW0nKSA6XG4gICAgICAgICAgZ2V0RmllbGRWYWx1ZShlbGVtZW50LCBjKX19IC0tPlxuICAgICAgICAgICA8ZGl2IFtpbm5lckh0bWxdID0gXCJnZXRGaWVsZFZhbHVlKGVsZW1lbnQsIGMpXCI+PC9kaXY+PC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIE90aGVyIENvbHVtbiAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiYWN0aW9uc1wiICpuZ0lmPVwibW9yZUFjdGlvbnNcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3ttb3JlQWN0aW9ucy5uYW1lfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIj5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmxpc3Q8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG1vcmVBY3Rpb25zLmFjdGlvbnNcIiAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IGVsZW1lbnRbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZX0pXCI+e3thY3Rpb24uYWN0aW9uTmFtZX19PC9idXR0b24+XG4gICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC90cj5cbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO1wiPjwvdHI+XG4gICAgPC90YWJsZT5cbiAgICA8bWF0LXBhZ2luYXRvciAocGFnZSk9XCJwYWdlRXZlbnQoJGV2ZW50KVwiIHNob3dGaXJzdExhc3RCdXR0b25zIFtsZW5ndGhdPVwicGFnZS50b3RhbEVsZW1lbnRzXCIgW3BhZ2VTaXplXT1cIjIwXCIgW3BhZ2VTaXplT3B0aW9uc109XCJbMSwgNSwgMTAsIDIwLCA1MCwgMTAwLCAyMDBdXCI+XG4gICAgPC9tYXQtcGFnaW5hdG9yPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AubWF0LXRhYmxlLWZpbHRlciBidXR0b257bWFyZ2luLXJpZ2h0OjhweDtmbG9hdDpyaWdodH1AbWVkaWEgKG1heC13aWR0aDo1NzZweCl7LmhpZGVfb25feHN7ZGlzcGxheTpub25lfX0ubWF0LXRhYmxlLWxvYWRpbmctc2hhZGV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2JvdHRvbTo1NnB4O3JpZ2h0OjA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xNSk7ei1pbmRleDoxO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0ubWF0LWNlbGx7cGFkZGluZy1yaWdodDo4cHh9YF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBBcHBEYXRlQWRhcHRlciB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBBUFBfREFURV9GT1JNQVRTXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gW107XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0cnVlLCBbXSk7XG4gIEBPdXRwdXQoKSByb3dTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbk1vZGVsPGFueT4+KCk7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuXG4gIEBJbnB1dCgpIGNvbHVtbnM6IEFycmF5PFRnck1hdFRhYmxlQ29sdW1uPiA9IFtdO1xuICBASW5wdXQoKSBlbmFibGVDaGVja2JveDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vcmVBY3Rpb25zOiBUZ3JNb3JlQWN0aW9ucztcbiAgQE91dHB1dCgpIGFjdGlvbnNFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8VGdyTW9yZUFjdGlvbkRhdGE+KClcbiAgQElucHV0KCkgZmlsdGVyQ29tcG9uZW50czogQXJyYXk8VGdyRHluYW1pY0NvbnRyb2w8YW55Pj4gPSBbXTtcbiAgQElucHV0KCkgcGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBASW5wdXQoKSBzaG93RGVmYXVsdEZpbHRlcnM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TnVtYmVyQ29sdW1uOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBBZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgb24gdGhlIHJlcXVlc3QgaGVhZGVyc1xuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+O1xuICBwYWdlOiBQYWdlPGFueT47XG4gIHNlbGVjdGVkID0gW107XG4gIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGF0YXRhYmxlQ29tcG9uZW50O1xuICBmaWx0ZXI6IE9iamVjdCA9IHt9O1xuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XG4gIHByaXZhdGUgc29ydFBhcmFtczogU29ydDtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiBzZXJ2ZXIgcmVxdWVzdCBoYXMgYmVlbiBwcm9jZXNzZWRcbiAgICovXG4gIGlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgLyoqXG4gICAqIERhdGUgcGlwZVxuICAgKi9cbiAgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGVcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0ZXJ3YXJkU2VydmljZTogU3Rld2FyZENsaWVudFNlcnZpY2U8UmVzcG9uc2VXcmFwcGVyPFBhZ2U8YW55Pj4sIGFueT4pIHtcbiAgICB0aGlzLnBhZ2UgPSBuZXcgUGFnZSgpO1xuICAgIHRoaXMucGFnZS5jb250ZW50ID0gW107XG4gICAgdGhpcy5kYXRlUGlwZSA9IG5ldyBEYXRlUGlwZShcImVuLVVTXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGZvcm0gY29udHJvbCBmcm9tIGZpbHRlckNvbXBvbmVudHMgYW5kIGFsc28gYXBwZW5kaW5nIGRlZmF1bHQgY29udHJvbHMgaWUuIGRhdGUgZmlsdGVyIGFuZCBzZWFyY2ggY29udHJvbHNcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIC8vaW50aWFsaXppbmcgdGFibGUgY29sdW1uc1xuICAgIGlmKHRoaXMuZW5hYmxlQ2hlY2tib3gpe1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goXCJjaGVja2JveFwiKTtcbiAgICB9XG4gICAgaWYodGhpcy5zaG93TnVtYmVyQ29sdW1uKXtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKFwibm9cIik7XG4gICAgfVxuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGMgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goYy5maWVsZE5hbWUpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLm1vcmVBY3Rpb25zKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChcImFjdGlvbnNcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJtb3JlQWN0aW9ucyBub3QgaW5qZWN0ZWQgc2tpcHBpbmcgcmVuZGVyaW5nICdNb3JlIEFjdGlvbnMnIGNvbHVtblwiKTtcbiAgICB9XG4gICAgbGV0IGdyb3VwID0ge307XG4gICAgdGhpcy5maWx0ZXJDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICBsZXQgdmFsaWRhdG9yczogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgaWYgKGNvbXAuaXNSZXF1aXJlZCkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgVGdySW5wdXQgfHwgY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIFRnclRleHRhcmVhKSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbkxlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1pbkxlbmd0aCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgoY29tcC5jb250cm9sVHlwZS5tYXhMZW5ndGgpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBUZ3JJbnB1dCkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoY29tcC5jb250cm9sVHlwZS5tYXgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKGNvbXAuY29udHJvbFR5cGUubWluKSk7XG4gICAgICB9XG4gICAgICBncm91cFtjb21wLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKCcnLCB2YWxpZGF0b3JzKVxuICAgIH0pO1xuICAgIC8vYWRkIGRlZmF1bHQgY29udHJvbHNcbiAgICBncm91cFsnZnJvbSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMDApKTtcbiAgICBncm91cFsndG8nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMTAwKSk7XG4gICAgZ3JvdXBbJ25lZWRsZSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgyMDApKTtcbiAgICB0aGlzLmZpbHRlckZvcm0gPSBuZXcgRm9ybUdyb3VwKGdyb3VwKTtcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiAwLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbnRpYWxpemF0aW9uIGZpcmUgc2VsZWN0aW9uIGV2ZW50XG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3dTZWxlY3Rpb24uZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbnVtYmVyIG9mIHNlbGVjdGVkIGVsZW1lbnRzIG1hdGNoZXMgdGhlIHRvdGFsIG51bWJlciBvZiByb3dzLiAqL1xuICBpc0FsbFNlbGVjdGVkKCkge1xuICAgIGNvbnN0IG51bVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLnBhZ2UuY29udGVudC5sZW5ndGg7XG4gICAgcmV0dXJuIG51bVNlbGVjdGVkID09IG51bVJvd3M7XG4gIH1cblxuICAvKiogU2VsZWN0cyBhbGwgcm93cyBpZiB0aGV5IGFyZSBub3QgYWxsIHNlbGVjdGVkOyBvdGhlcndpc2UgY2xlYXIgc2VsZWN0aW9uLiAqL1xuICBtYXN0ZXJUb2dnbGUoKSB7XG4gICAgdGhpcy5pc0FsbFNlbGVjdGVkKCkgP1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKSA6XG4gICAgICB0aGlzLnBhZ2UuY29udGVudC5mb3JFYWNoKHJvdyA9PiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Qocm93KSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBlbWl0IGNsaWNrIGV2ZW50IG9mIHRoZSBhY3Rpb25zXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25BY3Rpb25DbGljayhldmVudDogVGdyTW9yZUFjdGlvbkRhdGEpIHtcbiAgICB0aGlzLmFjdGlvbnNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHNlcnZlciByZXF1ZXN0IG9mIGRhdGFibGVcbiAgICogQHBhcmFtIHBhZ2VJbmZvXG4gICAqIEBwYXJhbSBmaWx0ZXJzXG4gICAqL1xuICBsb2FkUGFnZShwYWdlSW5mbywgZmlsdGVycykge1xuICAgIGlmICghdGhpcy5lbmRwb2ludCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICAgIGxldCByZXF1ZXN0OiBNYXA8c3RyaW5nLCBhbnk+O1xuICAgIGlmIChmaWx0ZXJzKSB7XG4gICAgICByZXF1ZXN0ID0gZmlsdGVycztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFyYW1zKSB7XG4gICAgICB0aGlzLnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmIChrZXkgIT0gbnVsbCAmJiBrZXkgIT0gdW5kZWZpbmVkKSB7IC8vaWdub3JlIG51bGwgdmFsdWVzXG4gICAgICAgICAgcmVxdWVzdC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXF1ZXN0LnNldChcInBhZ2VcIiwgcGFnZUluZm8ub2Zmc2V0KTtcbiAgICByZXF1ZXN0LnNldChcInNpemVcIiwgcGFnZUluZm8ubGltaXQpO1xuICAgIHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldCh0aGlzLmVuZHBvaW50LCByZXF1ZXN0LCB0aGlzLmhlYWRlcnMpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBpZih0aGlzLnNob3dOdW1iZXJDb2x1bW4pe1xuICAgICAgICAgIGxldCBubyA9IDEgKyAocmVzcG9uc2UuZGF0YS5udW1iZXIgKiByZXNwb25zZS5kYXRhLnNpemUpO1xuICAgICAgICAgIHJlc3BvbnNlLmRhdGEuY29udGVudC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIHZhbFsnbm8nXSA9IG5vKys7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJTZXJ2ZXIgcmVxdWVzdCBoYXMgZmFpbGVkXCIpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0b2xpc3RlbiB0byBwYWdpbmF0aW9uIGV2ZW50cy9hY3Rpb25zXG4gICAqIEBwYXJhbSBwYWdlIFxuICAgKi9cbiAgcGFnZUV2ZW50KHBhZ2U6IFBhZ2VFdmVudCkge1xuICAgIHRoaXMubG9hZFBhZ2UoeyBsaW1pdDogcGFnZS5wYWdlU2l6ZSwgb2Zmc2V0OiBwYWdlLnBhZ2VJbmRleCB9LCB0aGlzLmdldEZpbHRlcnMoKSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHByb2Nlc3NpbmcgdGFibGUgc29ydGluZ1xuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqL1xuICBwcm9jZXNzU29ydGluZyhldmVudDogU29ydCkge1xuICAgIHRoaXMuc29ydFBhcmFtcyA9IGV2ZW50O1xuICAgIHRoaXMubG9hZFBhZ2UoeyBsaW1pdDogdGhpcy5wYWdlLnNpemUsIG9mZnNldDogMCB9LCB0aGlzLmdldEZpbHRlcnMoKSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBnZXQgZmlsdGVyIGVudHJpZXMgZnJvbSB0aGUgZmlsdGVyIGZvcm0uIEFsc28gYWRkcyBzb3J0IHBhcmFtZXRlcnMgdG8gcmVxdWVzdFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRGaWx0ZXJzKCkge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIC8vIGxldCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcChPYmplY3QuZW50cmllcyh0aGlzLmZpbHRlckZvcm0udmFsdWUpKTtcbiAgICBsZXQgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoKTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0udmFsdWUpLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmRlYnVnKFwiS2V5IGlzIFwiICsga2V5ICsgXCIgYW5kIHZhbHVlIFwiICsgdmFsKTtcbiAgICAgIGlmICh0aGlzLmZpbHRlckZvcm0udmFsdWVbdmFsXSkge1xuICAgICAgICBpZiAodmFsID09ICdmcm9tJyB8fCB2YWwgPT0gXCJ0b1wiKSB7XG4gICAgICAgICAgZi5zZXQodmFsLCB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh0aGlzLmZpbHRlckZvcm0udmFsdWVbdmFsXSwgJ3l5eXktTU0tZGQnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZi5zZXQodmFsLCB0aGlzLmZpbHRlckZvcm0udmFsdWVbdmFsXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC8vYWRkIHNvcnRpbmcgcGFyYW1ldGVyc1xuICAgIGlmICh0aGlzLnNvcnRQYXJhbXMpIHtcbiAgICAgIGYuc2V0KFwic29ydFwiLCB0aGlzLnNvcnRQYXJhbXMuYWN0aXZlICsgXCIsXCIgKyB0aGlzLnNvcnRQYXJhbXMuZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGY7XG4gIH1cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2VzcyB0YWJsZSBmaWx0ZXIuIElmIGRhdGUgZmlsdGVyIGlzIG5vdCBwcm92aWRlIHRoZSBmcm9tIHZhbHVlIGlzIFxuICAgKiBzZXQgdG8gMjAxOC0wMS0wMSBhbmQgdG8gdmFsdWUgaXMgc2V0IHRvIDEgeWVhciBmcm9tIHRvZGF5XG4gICAqIEBwYXJhbSBmb3JtIFxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIGlucHV0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc0lucHV0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgVGdySW5wdXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBzZWxlY3RcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzU2VsZWN0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgVGdyU2VsZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgdGV4dGFyZWFcbiAgICovXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JUZXh0YXJlYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZvcm1hdCBkYXRlIHRvIHN0cmluZyB5eXl5LU1NLWRkXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqL1xuICBnZXRGb3JtYXR0ZWREYXRlKGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgIHZhciBtb250aCA9ICgxICsgZGF0ZS5nZXRNb250aCgpKS50b1N0cmluZygpO1xuICAgIG1vbnRoID0gbW9udGgubGVuZ3RoID4gMSA/IG1vbnRoIDogJzAnICsgbW9udGg7XG5cbiAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcbiAgICBkYXkgPSBkYXkubGVuZ3RoID4gMSA/IGRheSA6ICcwJyArIGRheTtcblxuICAgIHJldHVybiB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XG4gIH1cblxuICBnZXRGaWVsZFZhbHVlKGRhdGE6IE9iamVjdCwgY29sdW1uOiBUZ3JNYXRUYWJsZUNvbHVtbikge1xuICAgIGlmIChjb2x1bW4uY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjb2x1bW4uY2FsbGJhY2soZGF0YSk7XG4gICAgfVxuICAgIHZhciBrOiBBcnJheTxzdHJpbmc+ID0gY29sdW1uLmZpZWxkTmFtZS5zcGxpdChcIi5cIik7XG4gICAgdmFyIGtleXMgPSBuZXcgUXVldWU8c3RyaW5nPiguLi5rKTtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnN0ZXJ3YXJkU2VydmljZS5nZXRPYmplY3RWYWx1ZShkYXRhLCBrZXlzKTtcbiAgICByZXR1cm4gY29sdW1uLmlzRGF0ZUNvbHVtbiA/IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCAnbWVkaXVtJykgOiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIGRhdGEgdGFibGUgdmFsdWVzXG4gICAqL1xuICByZWZyZXNoVGFibGUoKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIlJlZnJlc2hlZCBkYXRhIHRhYmxlc1wiKTtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcbiAqIGRyYWdnYWJsZSwgcmVzaXphYmxlLCBpc0RhdGVDb2x1bW4pXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGdyTWF0VGFibGVDb2x1bW4ge1xuICAvKipcbiAgICogY29sdW1uIHRpdGxlXG4gICAqL1xuICBjb2x1bW5OYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTZXJ2ZXIgc2lkZSByZXNwb25zZSBmaWVsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBjb2x1bW4gaS5lIGZ1bGxOYW1lIG1heSBjb3JyZXNwb25kIHRvIE5hbWUgY29sdW1uXG4gICAqL1xuICBmaWVsZE5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlIHNvcnRpbmcgaW4gYSBjb2x1bW5cbiAgICovXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgLy8gLyoqXG4gIC8vICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAvLyAgKi9cbiAgLy8gY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XG4gIC8vIC8qKlxuICAvLyAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxuICAvLyAgKi9cbiAgLy8gZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgLy8gLyoqXG4gIC8vICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAvLyAgKi9cbiAgLy8gcmVzaXplYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgdGltZXN0YW1wIHRvIHN0cmluZyBkYXRlXG4gICAqL1xuICBpc0RhdGVDb2x1bW4/OiBib29sZWFuO1xuICAvKipcbiAgICogSGlkZSBvbiBzbWFsbCBkZXZpY2UgbGVzcyB0aGFuIDU3NnB4XG4gICAqL1xuICBoaWRlT25Ycz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiB1c2VkIGZvciBjZWxsIHJlbmRlcmluZy5cbiAgICogIE5vdGU6IEZ1bmN0aW9uIHJlc3VsdHMgYXJlIG5vdCBzYW5pdGlzZWRcbiAgICovXG4gIGNhbGxiYWNrPzogRnVuY3Rpb247XG59XG5cbi8qKlxuICogVXNlZCB0byBkaXNwbGF5IG1vcmUgYWN0aW9ucyBjb2x1bW4gYW5kIHRoZSBlbmQgb2YgdGhlIHRhYmxlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JNb3JlQWN0aW9ucyB7XG4gIC8qKlxuICAgKiBBY3Rpb24gQ29sdW1uIG5hbWUgZS5nLiBNb3JlIEFjdGlvbnNcbiAgICovXG4gIG5hbWU6IHN0cmluZyA9IFwiQWN0aW9uc1wiO1xuICAvKipcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxuICAgKi9cbiAgaWRGaWVsZE5hbWU6IHN0cmluZyA9IFwiaWRcIjtcbiAgLyoqXG4gICAqIEFjdGlvbnMgZS5nLiBFZGl0LCBEZWxldGVcbiAgICovXG4gIGFjdGlvbnM6IEFycmF5PFRnck1vcmVBY3Rpb25EYXRhPjtcblxuICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBBcnJheTxUZ3JNb3JlQWN0aW9uRGF0YT4sIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKSB7XG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaWRGaWVsZE5hbWUgPSBpZDtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGdyTW9yZUFjdGlvbkRhdGEge1xuICAvKipcbiAgICogTmV2ZXIgbWluZCB0aGlzIGZpZWxkIGl0IHdpbGwgYmUgdXNlZCBieSB0aGUgbGlicmFyeVxuICAgKi9cbiAgaWQ/OiBhbnk7XG4gIC8qKlxuICAgKiBBY3Rpb24gbmFtZSBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uTmFtZTogYW55O1xufSJdfQ==