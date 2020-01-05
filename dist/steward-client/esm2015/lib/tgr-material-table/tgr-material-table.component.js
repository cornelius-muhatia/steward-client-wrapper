/**
 * @fileoverview added by tsickle
 * Generated from: lib/tgr-material-table/tgr-material-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { StewardClientService } from '../steward-client.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter, MatSort } from "@angular/material";
import { TgrInput, TgrSelect, TgrTextarea } from '../entities/tgr-dynamic-control';
import { DatePipe } from '@angular/common';
/**
 * Format angular date to dd-mm-yyyy
 */
export class AppDateAdapter extends NativeDateAdapter {
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
export const APP_DATE_FORMATS = {
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
export class TgrMaterialTableComponent {
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
        this.columns.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            this.displayedColumns.push(c.fieldName);
        }));
        if (this.moreActions) {
            this.displayedColumns.push("actions");
        }
        else {
            console.debug("moreActions not injected skipping rendering 'More Actions' column");
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
            this.params.forEach((/**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */
            (value, key) => {
                if (key != null && key != undefined) { //ignore null values
                    request.set(key, value);
                }
            }));
        }
        request.set("page", pageInfo.offset);
        request.set("size", pageInfo.limit);
        this.sterwardService.get(this.endpoint, request, this.headers).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            if (response.status == 200) {
                if (this.showNumberColumn) {
                    /** @type {?} */
                    let no = 1 + (response.data.number * response.data.size);
                    response.data.content.forEach((/**
                     * @param {?} val
                     * @return {?}
                     */
                    (val) => {
                        val['no'] = no++;
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
            console.debug("Server request has failed");
            this.isLoadingResults = false;
        }));
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
     * @private
     * @return {?}
     */
    getFilters() {
        //@ts-ignore
        // let f: Map<String, any> = new Map(Object.entries(this.filterForm.value));
        /** @type {?} */
        let f = new Map();
        Object.keys(this.filterForm.value).forEach((/**
         * @param {?} val
         * @param {?} key
         * @return {?}
         */
        (val, key) => {
            // console.debug("Key is " + key + " and value " + val);
            if (this.filterForm.value[val]) {
                if (val == 'from' || val == "to") {
                    f.set(val, this.datePipe.transform(this.filterForm.value[val], 'yyyy-MM-dd'));
                }
                else {
                    f.set(val, this.filterForm.value[val]);
                }
            }
        }));
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
        let k = column.fieldName.split(".");
        /** @type {?} */
        let value = this.sterwardService.getObjectValue(data, k);
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
                template: "<div class=\"row\"  *ngIf=\"showDefaultFilters || filterComponents.length > 0\">\n  <div class=\"col-md-12\">\n    <div class=\"card card-outline-default mat-elevation-z4\">\n      <div class=\"card-body\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"mat-table-filter\">\n                <button title=\"Refresh\" (click) = \"refreshTable()\" mat-icon-button color=\"basic\" type=\"reset\"><mat-icon>refresh</mat-icon></button>\n            </div>\n          </div>\n        </div>\n        <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n          <div class=\"row\">\n            <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n              <!-- Intialize form select control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isSelect(control.controlType)\">\n                <mat-select [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\">\n                  <mat-option *ngFor=\"let o of control.controlType.options\" [value]=\"o.value\">\n                    {{o.text}}\n                  </mat-option>\n                </mat-select>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form textarea control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isTextArea(control.controlType)\">\n                <textarea matInput [formControlName]=\"control.name\" [placeholder]=\"control.label\" [cols]=\"control.controlType.cols\"\n                  [rows]=\"control.controlType.rows\"></textarea>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n              </mat-form-field>\n\n              <!-- Intialize form input control -->\n              <mat-form-field class=\"col-md-12\" *ngIf=\"isInput(control.controlType)\">\n                <!-- <mat-icon matPrefix class=\"material-icons icon-margin-right\">perm_identity</mat-icon> -->\n                <input matInput [placeholder]=\"control.label\" [type]=\"control.controlType.type\" [formControlName]=\"control.name\" />\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}}\n                  is required</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of\n                  {{control.controlType.minLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of\n                  {{control.controlType.maxLength}} characters</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than\n                  {{control.controlType.min}}</mat-error>\n                <mat-error *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than\n                  {{control.controlType.max}}</mat-error>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <!-- <mat-icon matPrefix class=\"material-icons col-md-3\">date_range</mat-icon> -->\n              <mat-form-field class=\"col-md-12\">\n                <input matInput placeholder=\"From\" type=\"date\" [matDatepicker]=\"picker\" formControlName=\"from\" />\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <!-- <mat-icon>home</mat-icon> -->\n                <input matInput placeholder=\"To\" type=\"date\" [matDatepicker]=\"toPicker\" formControlName=\"to\" />\n                <mat-datepicker-toggle matSuffix [for]=\"toPicker\"></mat-datepicker-toggle>\n                <mat-datepicker #toPicker></mat-datepicker>\n              </mat-form-field>\n            </div>\n            <div class=\"col-md-3 mb-3\" *ngIf=\"showDefaultFilters\">\n              <mat-form-field class=\"col-md-12\">\n                <input matInput maxlength=\"100\" placeholder=\"Search\" type=\"text\" formControlName=\"needle\" />\n              </mat-form-field>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n            </span>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"pull-right mat-table-filter\">\n                <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"filterForm.invalid\">Filter</button>\n                <button mat-raised-button color=\"basic\" type=\"reset\">Reset</button>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <div class=\"mat-table-loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n    <table mat-table [dataSource]=\"page.content\" class=\"mat-elevation-z8\" style=\"width: 100%\" matSort (matSortChange)=\"processSorting($event)\">\n\n      <!--- Note that these columns can be defined in any order.\n          The actual rendered columns are set as a property on the row definition\" -->\n\n      <!-- Position Column -->\n      <ng-container matColumnDef=\"checkbox\" *ngIf=\"enableCheckbox\">\n        <th mat-header-cell *matHeaderCellDef>\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\" [checked]=\"selection.hasValue() && isAllSelected()\"\n            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n          </mat-checkbox>\n        </th>\n        <!-- <td mat-cell *matCellDef=\"let element\"> <mat-checkbox></mat-checkbox> </td> -->\n        <td mat-cell *matCellDef=\"let row\">\n          <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\" [checked]=\"selection.isSelected(row)\">\n          </mat-checkbox>\n        </td>\n      </ng-container>\n\n      <!-- Number Column -->\n      <ng-container matColumnDef=\"no\" *ngIf=\"showNumberColumn\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>\n        <td mat-cell *matCellDef=\"let element\" > \n           <div>{{element['no']}}</div>\n          </td>\n      </ng-container>\n\n      <!-- Fields Columns -->\n      <ng-container [matColumnDef]=\"c.fieldName\" *ngFor=\"let c of columns\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header [class.hide_on_xs]=\"c.hideOnXs\"> {{c.columnName}} </th>\n        <td mat-cell *matCellDef=\"let element\" [class.hide_on_xs]=\"c.hideOnXs\"> \n          <!-- {{c.isDateColumn ?\n          (getFieldValue(element, c) | date:'medium') :\n          getFieldValue(element, c)}} -->\n           <div [innerHtml] = \"getFieldValue(element, c)\"></div></td>\n      </ng-container>\n\n      <!-- Other Column -->\n      <ng-container matColumnDef=\"actions\" *ngIf=\"moreActions\">\n        <th mat-header-cell *matHeaderCellDef> {{moreActions.name}} </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n            <mat-icon>list</mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item *ngFor=\"let action of moreActions.actions\" (click)=\"onActionClick({id: element[moreActions.idFieldName], actionName: action.actionName})\">{{action.actionName}}</button>\n          </mat-menu>\n        </td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n    <mat-paginator (page)=\"pageEvent($event)\" showFirstLastButtons [length]=\"page.totalElements\" [pageSize]=\"20\" [pageSizeOptions]=\"[1, 5, 10, 20, 50, 100, 200]\">\n    </mat-paginator>\n  </div>\n</div>",
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
export function TgrMatTableColumn() { }
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
export class TgrMoreActions {
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
if (false) {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3Rnci1tYXRlcmlhbC10YWJsZS90Z3ItbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBVSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQWEsT0FBTyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDaEYsT0FBTyxFQUFxQixRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUszQyxNQUFNLE9BQU8sY0FBZSxTQUFRLGlCQUFpQjs7Ozs7OztJQU9uRCxNQUFNLENBQUMsSUFBVSxFQUFFLGFBQXFCO1FBRXRDLElBQUksYUFBYSxLQUFLLE9BQU8sRUFBRTs7Z0JBRXpCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFOztnQkFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDOztrQkFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxX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Qjs7SUFDcEIsK0NBQXNCOzs7OztJQUN0QiwrQ0FBeUI7Ozs7O0lBSXpCLHFEQUF5Qjs7Ozs7O0lBSXpCLDZDQUEwQjs7Ozs7SUFFZCxvREFBOEU7Ozs7Ozs7QUE4TzVGLHVDQTBDQzs7Ozs7O0lBdENDLHVDQUFtQjs7Ozs7SUFJbkIsc0NBQWtCOzs7OztJQUlsQixrQ0FBZTs7Ozs7SUFJZixxQ0FBbUI7Ozs7O0lBZ0JuQix5Q0FBdUI7Ozs7O0lBSXZCLHFDQUFtQjs7Ozs7O0lBS25CLHFDQUFvQjs7Ozs7QUFNdEIsTUFBTSxPQUFPLGNBQWM7Ozs7OztJQWN6QixZQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWE7Ozs7UUFWekUsU0FBSSxHQUFXLFNBQVMsQ0FBQzs7OztRQUl6QixnQkFBVyxHQUFXLElBQUksQ0FBQztRQU96QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBRUY7Ozs7OztJQWhCQyw4QkFBeUI7Ozs7O0lBSXpCLHFDQUEyQjs7Ozs7SUFJM0IsaUNBQWtDOzs7OztBQVVwQyx1Q0FTQzs7Ozs7O0lBTEMsK0JBQVM7Ozs7O0lBSVQsdUNBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0Zvcm0sIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcGFnZSc7XG5pbXBvcnQgeyBNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1RleHRhcmVhLCBNbGtTZWxlY3QgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sJztcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZURhdGVBZGFwdGVyLCBQYWdlRXZlbnQsIE1hdFNvcnQsIFNvcnQgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IFRnckR5bmFtaWNDb250cm9sLCBUZ3JJbnB1dCwgVGdyU2VsZWN0LCBUZ3JUZXh0YXJlYSB9IGZyb20gJy4uL2VudGl0aWVzL3Rnci1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEZvcm1hdCBhbmd1bGFyIGRhdGUgdG8gZGQtbW0teXl5eVxuICovXG5leHBvcnQgY2xhc3MgQXBwRGF0ZUFkYXB0ZXIgZXh0ZW5kcyBOYXRpdmVEYXRlQWRhcHRlciB7XG5cbiAgLyoqXG4gICAqIFBhcnNlIGRhdGUgdG8gZGQtbW0teXl5eVxuICAgKiBAcGFyYW0gZGF0ZSAgZGF0ZSBpbnB1dFxuICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBleHBlY3RzIHRvIGJlIGlucHV0IHN0cmluZ1xuICAgKi9cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IE9iamVjdCk6IHN0cmluZyB7XG5cbiAgICBpZiAoZGlzcGxheUZvcm1hdCA9PT0gJ2lucHV0Jykge1xuXG4gICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGxldCBkYXlTdHJpbmc6IHN0cmluZztcbiAgICAgIGxldCBtb250aFN0cmluZzogc3RyaW5nO1xuXG4gICAgICBpZiAoZGF5IDwgMTApIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJzAnICsgZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJycgKyBkYXk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgIG1vbnRoU3RyaW5nID0gJzAnICsgbW9udGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb250aFN0cmluZyA9ICcnICsgbW9udGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRoU3RyaW5nfS0ke2RheVN0cmluZ31gO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpO1xuICB9XG59XG4vKipcbiAqIE1hdGVyaWFsIGRhdGUgZm9ybWF0c1xuICovXG5leHBvcnQgY29uc3QgQVBQX0RBVEVfRk9STUFUUyA9XG57XG4gIHBhcnNlOiB7XG4gICAgZGF0ZUlucHV0OiB7IG1vbnRoOiAnbnVtZXJpYycsIHllYXI6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgfSxcbiAgZGlzcGxheToge1xuICAgIGRhdGVJbnB1dDogJ2lucHV0JyxcbiAgICBtb250aFllYXJMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycgfSxcbiAgICBkYXRlQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgICBtb250aFllYXJBMTF5TGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnIH0sXG4gIH1cbn07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGdyLW1hdGVyaWFsLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBBcHBEYXRlQWRhcHRlciB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBBUFBfREFURV9GT1JNQVRTXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gW107XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0cnVlLCBbXSk7XG4gIEBPdXRwdXQoKSByb3dTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbk1vZGVsPGFueT4+KCk7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCwge3N0YXRpYzogdHJ1ZX0pIHNvcnQ6IE1hdFNvcnQ7XG5cblxuICBASW5wdXQoKSBjb2x1bW5zOiBBcnJheTxUZ3JNYXRUYWJsZUNvbHVtbj4gPSBbXTtcbiAgQElucHV0KCkgZW5hYmxlQ2hlY2tib3g6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBlbmRwb2ludDogc3RyaW5nO1xuICBASW5wdXQoKSBtb3JlQWN0aW9uczogVGdyTW9yZUFjdGlvbnM7XG4gIEBPdXRwdXQoKSBhY3Rpb25zRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFRnck1vcmVBY3Rpb25EYXRhPigpXG4gIEBJbnB1dCgpIGZpbHRlckNvbXBvbmVudHM6IEFycmF5PFRnckR5bmFtaWNDb250cm9sPGFueT4+ID0gW107XG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcbiAgQElucHV0KCkgc2hvd0RlZmF1bHRGaWx0ZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd051bWJlckNvbHVtbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogQWRkaXRpb25hbCBoZWFkZXJzIHRvIGJlIGFwcGVuZGVkIG9uIHRoZSByZXF1ZXN0IGhlYWRlcnNcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPjtcbiAgcGFnZTogUGFnZTxhbnk+O1xuICBzZWxlY3RlZCA9IFtdO1xuICAvLyBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGU6IERhdGF0YWJsZUNvbXBvbmVudDtcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcbiAgZmlsdGVyRm9ybTogRm9ybUdyb3VwO1xuICBwcml2YXRlIHNvcnRQYXJhbXM6IFNvcnQ7XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgc2VydmVyIHJlcXVlc3QgaGFzIGJlZW4gcHJvY2Vzc2VkXG4gICAqL1xuICBpc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gIC8qKlxuICAgKiBEYXRlIHBpcGVcbiAgICovXG4gIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGVyd2FyZFNlcnZpY2U6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxQYWdlPGFueT4+LCBhbnk+KSB7XG4gICAgdGhpcy5wYWdlID0gbmV3IFBhZ2UoKTtcbiAgICB0aGlzLnBhZ2UuY29udGVudCA9IFtdO1xuICAgIHRoaXMuZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoXCJlbi1VU1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgZnJvbSBmaWx0ZXJDb21wb25lbnRzIGFuZCBhbHNvIGFwcGVuZGluZyBkZWZhdWx0IGNvbnRyb2xzIGllLiBkYXRlIGZpbHRlciBhbmQgc2VhcmNoIGNvbnRyb2xzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvL2ludGlhbGl6aW5nIHRhYmxlIGNvbHVtbnNcbiAgICBpZih0aGlzLmVuYWJsZUNoZWNrYm94KXtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKFwiY2hlY2tib3hcIik7XG4gICAgfVxuICAgIGlmKHRoaXMuc2hvd051bWJlckNvbHVtbil7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChcIm5vXCIpO1xuICAgIH1cbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKGMuZmllbGROYW1lKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5tb3JlQWN0aW9ucykge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goXCJhY3Rpb25zXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwibW9yZUFjdGlvbnMgbm90IGluamVjdGVkIHNraXBwaW5nIHJlbmRlcmluZyAnTW9yZSBBY3Rpb25zJyBjb2x1bW5cIik7XG4gICAgfVxuICAgIGxldCBncm91cCA9IHt9O1xuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgbGV0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIFRncklucHV0IHx8IGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBUZ3JUZXh0YXJlYSkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgVGdySW5wdXQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KGNvbXAuY29udHJvbFR5cGUubWF4KSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xuICAgICAgfVxuICAgICAgZ3JvdXBbY29tcC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgdmFsaWRhdG9ycylcbiAgICB9KTtcbiAgICAvL2FkZCBkZWZhdWx0IGNvbnRyb2xzXG4gICAgZ3JvdXBbJ2Zyb20nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMTAwKSk7XG4gICAgZ3JvdXBbJ3RvJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW50aWFsaXphdGlvbiBmaXJlIHNlbGVjdGlvbiBldmVudFxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMucm93U2VsZWN0aW9uLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG51bWJlciBvZiBzZWxlY3RlZCBlbGVtZW50cyBtYXRjaGVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cy4gKi9cbiAgaXNBbGxTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBudW1TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICBjb25zdCBudW1Sb3dzID0gdGhpcy5wYWdlLmNvbnRlbnQubGVuZ3RoO1xuICAgIHJldHVybiBudW1TZWxlY3RlZCA9PSBudW1Sb3dzO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgYWxsIHJvd3MgaWYgdGhleSBhcmUgbm90IGFsbCBzZWxlY3RlZDsgb3RoZXJ3aXNlIGNsZWFyIHNlbGVjdGlvbi4gKi9cbiAgbWFzdGVyVG9nZ2xlKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCkgOlxuICAgICAgdGhpcy5wYWdlLmNvbnRlbnQuZm9yRWFjaChyb3cgPT4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0KHJvdykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IFRnck1vcmVBY3Rpb25EYXRhKSB7XG4gICAgdGhpcy5hY3Rpb25zRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKi9cbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmFtcykge1xuICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoa2V5ICE9IG51bGwgJiYga2V5ICE9IHVuZGVmaW5lZCkgeyAvL2lnbm9yZSBudWxsIHZhbHVlc1xuICAgICAgICAgIHJlcXVlc3Quc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxdWVzdC5zZXQoXCJwYWdlXCIsIHBhZ2VJbmZvLm9mZnNldCk7XG4gICAgcmVxdWVzdC5zZXQoXCJzaXplXCIsIHBhZ2VJbmZvLmxpbWl0KTtcbiAgICB0aGlzLnN0ZXJ3YXJkU2VydmljZS5nZXQodGhpcy5lbmRwb2ludCwgcmVxdWVzdCwgdGhpcy5oZWFkZXJzKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgaWYodGhpcy5zaG93TnVtYmVyQ29sdW1uKXtcbiAgICAgICAgICBsZXQgbm8gPSAxICsgKHJlc3BvbnNlLmRhdGEubnVtYmVyICogcmVzcG9uc2UuZGF0YS5zaXplKTtcbiAgICAgICAgICByZXNwb25zZS5kYXRhLmNvbnRlbnQuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICB2YWxbJ25vJ10gPSBubysrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICB9XG4gICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICB9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiU2VydmVyIHJlcXVlc3QgaGFzIGZhaWxlZFwiKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG9saXN0ZW4gdG8gcGFnaW5hdGlvbiBldmVudHMvYWN0aW9uc1xuICAgKiBAcGFyYW0gcGFnZVxuICAgKi9cbiAgcGFnZUV2ZW50KHBhZ2U6IFBhZ2VFdmVudCkge1xuICAgIHRoaXMubG9hZFBhZ2UoeyBsaW1pdDogcGFnZS5wYWdlU2l6ZSwgb2Zmc2V0OiBwYWdlLnBhZ2VJbmRleCB9LCB0aGlzLmdldEZpbHRlcnMoKSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHByb2Nlc3NpbmcgdGFibGUgc29ydGluZ1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHByb2Nlc3NTb3J0aW5nKGV2ZW50OiBTb3J0KSB7XG4gICAgdGhpcy5zb3J0UGFyYW1zID0gZXZlbnQ7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSwgb2Zmc2V0OiAwIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGdldCBmaWx0ZXIgZW50cmllcyBmcm9tIHRoZSBmaWx0ZXIgZm9ybS4gQWxzbyBhZGRzIHNvcnQgcGFyYW1ldGVycyB0byByZXF1ZXN0XG4gICAqL1xuICBwcml2YXRlIGdldEZpbHRlcnMoKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgLy8gbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIGxldCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJLZXkgaXMgXCIgKyBrZXkgKyBcIiBhbmQgdmFsdWUgXCIgKyB2YWwpO1xuICAgICAgaWYgKHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdKSB7XG4gICAgICAgIGlmICh2YWwgPT0gJ2Zyb20nIHx8IHZhbCA9PSBcInRvXCIpIHtcbiAgICAgICAgICBmLnNldCh2YWwsIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdLCAneXl5eS1NTS1kZCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmLnNldCh2YWwsIHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLy9hZGQgc29ydGluZyBwYXJhbWV0ZXJzXG4gICAgaWYgKHRoaXMuc29ydFBhcmFtcykge1xuICAgICAgZi5zZXQoXCJzb3J0XCIsIHRoaXMuc29ydFBhcmFtcy5hY3RpdmUgKyBcIixcIiArIHRoaXMuc29ydFBhcmFtcy5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZjtcbiAgfVxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXNcbiAgICogc2V0IHRvIDIwMTgtMDEtMDEgYW5kIHRvIHZhbHVlIGlzIHNldCB0byAxIHllYXIgZnJvbSB0b2RheVxuICAgKiBAcGFyYW0gZm9ybVxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIGlucHV0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc0lucHV0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgVGdySW5wdXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBzZWxlY3RcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzU2VsZWN0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgVGdyU2VsZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgdGV4dGFyZWFcbiAgICovXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JUZXh0YXJlYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZvcm1hdCBkYXRlIHRvIHN0cmluZyB5eXl5LU1NLWRkXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqL1xuICBnZXRGb3JtYXR0ZWREYXRlKGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgIHZhciBtb250aCA9ICgxICsgZGF0ZS5nZXRNb250aCgpKS50b1N0cmluZygpO1xuICAgIG1vbnRoID0gbW9udGgubGVuZ3RoID4gMSA/IG1vbnRoIDogJzAnICsgbW9udGg7XG5cbiAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcbiAgICBkYXkgPSBkYXkubGVuZ3RoID4gMSA/IGRheSA6ICcwJyArIGRheTtcblxuICAgIHJldHVybiB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XG4gIH1cblxuICBnZXRGaWVsZFZhbHVlKGRhdGE6IE9iamVjdCwgY29sdW1uOiBUZ3JNYXRUYWJsZUNvbHVtbikge1xuICAgIGlmIChjb2x1bW4uY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjb2x1bW4uY2FsbGJhY2soZGF0YSk7XG4gICAgfVxuICAgIGxldCBrOiBBcnJheTxzdHJpbmc+ID0gY29sdW1uLmZpZWxkTmFtZS5zcGxpdChcIi5cIik7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0T2JqZWN0VmFsdWUoZGF0YSwgayk7XG4gICAgcmV0dXJuIGNvbHVtbi5pc0RhdGVDb2x1bW4gPyB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgJ21lZGl1bScpIDogdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBkYXRhIHRhYmxlIHZhbHVlc1xuICAgKi9cbiAgcmVmcmVzaFRhYmxlKCkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJSZWZyZXNoZWQgZGF0YSB0YWJsZXNcIik7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG59XG4vKipcbiAqIFVzZWQgdG8gZGVmaW5lIGRhdGF0YWJsZSBjb2x1bW5zIHdpdGggYXR0cmlidXRlcyAoY29sdW1uTmFtZSwgZmllbGROYW1lLCB3aWR0aCwgc29ydGFibGUsIGNhbkF1dG9SZXNpemUsXG4gKiBkcmFnZ2FibGUsIHJlc2l6YWJsZSwgaXNEYXRlQ29sdW1uKVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRnck1hdFRhYmxlQ29sdW1uIHtcbiAgLyoqXG4gICAqIGNvbHVtbiB0aXRsZVxuICAgKi9cbiAgY29sdW1uTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEVuYWJsZSBzb3J0aW5nIGluIGEgY29sdW1uXG4gICAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIC8vIC8qKlxuICAvLyAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgLy8gICovXG4gIC8vIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcbiAgLy8gICovXG4gIC8vIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gIC8vIC8qKlxuICAvLyAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgLy8gICovXG4gIC8vIHJlc2l6ZWFibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxuICAgKi9cbiAgaXNEYXRlQ29sdW1uPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEhpZGUgb24gc21hbGwgZGV2aWNlIGxlc3MgdGhhbiA1NzZweFxuICAgKi9cbiAgaGlkZU9uWHM/OiBib29sZWFuO1xuICAvKipcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdXNlZCBmb3IgY2VsbCByZW5kZXJpbmcuXG4gICAqICBOb3RlOiBGdW5jdGlvbiByZXN1bHRzIGFyZSBub3Qgc2FuaXRpc2VkXG4gICAqL1xuICBjYWxsYmFjaz86IEZ1bmN0aW9uO1xufVxuXG4vKipcbiAqIFVzZWQgdG8gZGlzcGxheSBtb3JlIGFjdGlvbnMgY29sdW1uIGFuZCB0aGUgZW5kIG9mIHRoZSB0YWJsZVxuICovXG5leHBvcnQgY2xhc3MgVGdyTW9yZUFjdGlvbnMge1xuICAvKipcbiAgICogQWN0aW9uIENvbHVtbiBuYW1lIGUuZy4gTW9yZSBBY3Rpb25zXG4gICAqL1xuICBuYW1lOiBzdHJpbmcgPSBcIkFjdGlvbnNcIjtcbiAgLyoqXG4gICAqIEZpZWxkIG5hbWUgaWQgZnJvbSB0aGUgc2VydmVyIHJlc3BvbnNlIGUuZyB1c2VySWRcbiAgICovXG4gIGlkRmllbGROYW1lOiBzdHJpbmcgPSBcImlkXCI7XG4gIC8qKlxuICAgKiBBY3Rpb25zIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25zOiBBcnJheTxUZ3JNb3JlQWN0aW9uRGF0YT47XG5cbiAgY29uc3RydWN0b3IoYWN0aW9uczogQXJyYXk8VGdyTW9yZUFjdGlvbkRhdGE+LCBpZD86IHN0cmluZywgbmFtZT86IHN0cmluZykge1xuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkRmllbGROYW1lID0gaWQ7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRnck1vcmVBY3Rpb25EYXRhIHtcbiAgLyoqXG4gICAqIE5ldmVyIG1pbmQgdGhpcyBmaWVsZCBpdCB3aWxsIGJlIHVzZWQgYnkgdGhlIGxpYnJhcnlcbiAgICovXG4gIGlkPzogYW55O1xuICAvKipcbiAgICogQWN0aW9uIG5hbWUgZS5nLiBFZGl0LCBEZWxldGVcbiAgICovXG4gIGFjdGlvbk5hbWU6IGFueTtcbn1cbiJdfQ==