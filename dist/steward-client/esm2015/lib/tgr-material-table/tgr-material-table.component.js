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
import { NativeDateAdapter, MatSort } from '@angular/material';
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
export function TgrMoreActionData() { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3Rnci1tYXRlcmlhbC10YWJsZS90Z3ItbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBVSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQWEsT0FBTyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDaEYsT0FBTyxFQUFxQixRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUszQyxNQUFNLE9BQU8sY0FBZSxTQUFRLGlCQUFpQjs7Ozs7OztJQU9uRCxNQUFNLENBQUMsSUFBVSxFQUFFLGFBQXFCO1FBRXRDLElBQUksYUFBYSxLQUFLLE9BQU8sRUFBRTs7Z0JBRXpCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFOztnQkFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDOztrQkFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxX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OztJQUl6QixxREFBeUI7Ozs7OztJQUl6Qiw2Q0FBMEI7Ozs7O0lBRWQsb0RBQThFOzs7Ozs7O0FBOE81Rix1Q0EwQ0M7Ozs7OztJQXRDQyx1Q0FBbUI7Ozs7O0lBSW5CLHNDQUFrQjs7Ozs7SUFJbEIsa0NBQWU7Ozs7O0lBSWYscUNBQW1COzs7OztJQWdCbkIseUNBQXVCOzs7OztJQUl2QixxQ0FBbUI7Ozs7OztJQUtuQixxQ0FBaUM7Ozs7O0FBTW5DLE1BQU0sT0FBTyxjQUFjOzs7Ozs7O0lBeUJ6QixZQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWEsRUFBRSxRQUFnQzs7OztRQXJCM0csU0FBSSxHQUFHLFNBQVMsQ0FBQzs7Ozs7UUFLakIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFpQmpCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7Q0FFRjs7Ozs7O0lBNUJDLDhCQUFpQjs7Ozs7O0lBS2pCLHFDQUFtQjs7Ozs7SUFJbkIsaUNBQWtDOzs7OztJQUlsQyxrQ0FBaUM7Ozs7O0FBaUJuQyx1Q0FjQzs7Ozs7OztJQVRDLCtCQUFTOzs7OztJQUlULHVDQUFnQjs7Ozs7SUFJaEIsaUNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcbmltcG9ydCB7IE1sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrVGV4dGFyZWEsIE1sa1NlbGVjdCB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFMsIE1BVF9EQVRFX0xPQ0FMRSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlRGF0ZUFkYXB0ZXIsIFBhZ2VFdmVudCwgTWF0U29ydCwgU29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRnckR5bmFtaWNDb250cm9sLCBUZ3JJbnB1dCwgVGdyU2VsZWN0LCBUZ3JUZXh0YXJlYSB9IGZyb20gJy4uL2VudGl0aWVzL3Rnci1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEZvcm1hdCBhbmd1bGFyIGRhdGUgdG8gZGQtbW0teXl5eVxuICovXG5leHBvcnQgY2xhc3MgQXBwRGF0ZUFkYXB0ZXIgZXh0ZW5kcyBOYXRpdmVEYXRlQWRhcHRlciB7XG5cbiAgLyoqXG4gICAqIFBhcnNlIGRhdGUgdG8gZGQtbW0teXl5eVxuICAgKiBAcGFyYW0gZGF0ZSAgZGF0ZSBpbnB1dFxuICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBleHBlY3RzIHRvIGJlIGlucHV0IHN0cmluZ1xuICAgKi9cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IE9iamVjdCk6IHN0cmluZyB7XG5cbiAgICBpZiAoZGlzcGxheUZvcm1hdCA9PT0gJ2lucHV0Jykge1xuXG4gICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGxldCBkYXlTdHJpbmc6IHN0cmluZztcbiAgICAgIGxldCBtb250aFN0cmluZzogc3RyaW5nO1xuXG4gICAgICBpZiAoZGF5IDwgMTApIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJzAnICsgZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF5U3RyaW5nID0gJycgKyBkYXk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgIG1vbnRoU3RyaW5nID0gJzAnICsgbW9udGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb250aFN0cmluZyA9ICcnICsgbW9udGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRoU3RyaW5nfS0ke2RheVN0cmluZ31gO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpO1xuICB9XG59XG4vKipcbiAqIE1hdGVyaWFsIGRhdGUgZm9ybWF0c1xuICovXG5leHBvcnQgY29uc3QgQVBQX0RBVEVfRk9STUFUUyA9XG57XG4gIHBhcnNlOiB7XG4gICAgZGF0ZUlucHV0OiB7IG1vbnRoOiAnbnVtZXJpYycsIHllYXI6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgfSxcbiAgZGlzcGxheToge1xuICAgIGRhdGVJbnB1dDogJ2lucHV0JyxcbiAgICBtb250aFllYXJMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycgfSxcbiAgICBkYXRlQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgICBtb250aFllYXJBMTF5TGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnIH0sXG4gIH1cbn07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGdyLW1hdGVyaWFsLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBBcHBEYXRlQWRhcHRlciB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBBUFBfREFURV9GT1JNQVRTXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gW107XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0cnVlLCBbXSk7XG4gIEBPdXRwdXQoKSByb3dTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbk1vZGVsPGFueT4+KCk7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCwgeyBzdGF0aWM6IHRydWUgfSkgc29ydDogTWF0U29ydDtcblxuXG4gIEBJbnB1dCgpIGNvbHVtbnM6IEFycmF5PFRnck1hdFRhYmxlQ29sdW1uPiA9IFtdO1xuICBASW5wdXQoKSBlbmFibGVDaGVja2JveDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vcmVBY3Rpb25zOiBUZ3JNb3JlQWN0aW9ucztcbiAgQE91dHB1dCgpIGFjdGlvbnNFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8VGdyTW9yZUFjdGlvbkRhdGE+KClcbiAgQElucHV0KCkgZmlsdGVyQ29tcG9uZW50czogQXJyYXk8VGdyRHluYW1pY0NvbnRyb2w8YW55Pj4gPSBbXTtcbiAgQElucHV0KCkgcGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBASW5wdXQoKSBzaG93RGVmYXVsdEZpbHRlcnM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TnVtYmVyQ29sdW1uOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBBZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgb24gdGhlIHJlcXVlc3QgaGVhZGVyc1xuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+O1xuICBwYWdlOiBQYWdlPGFueT47XG4gIHNlbGVjdGVkID0gW107XG4gIC8vIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGF0YXRhYmxlQ29tcG9uZW50O1xuICBmaWx0ZXI6IE9iamVjdCA9IHt9O1xuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XG4gIHByaXZhdGUgc29ydFBhcmFtczogU29ydDtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiBzZXJ2ZXIgcmVxdWVzdCBoYXMgYmVlbiBwcm9jZXNzZWRcbiAgICovXG4gIGlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgLyoqXG4gICAqIERhdGUgcGlwZVxuICAgKi9cbiAgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGVcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0ZXJ3YXJkU2VydmljZTogU3Rld2FyZENsaWVudFNlcnZpY2U8UmVzcG9uc2VXcmFwcGVyPFBhZ2U8YW55Pj4sIGFueT4pIHtcbiAgICB0aGlzLnBhZ2UgPSBuZXcgUGFnZSgpO1xuICAgIHRoaXMucGFnZS5jb250ZW50ID0gW107XG4gICAgdGhpcy5kYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSgnZW4tVVMnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgZnJvbSBmaWx0ZXJDb21wb25lbnRzIGFuZCBhbHNvIGFwcGVuZGluZyBkZWZhdWx0IGNvbnRyb2xzIGllLiBkYXRlIGZpbHRlciBhbmQgc2VhcmNoIGNvbnRyb2xzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvL2ludGlhbGl6aW5nIHRhYmxlIGNvbHVtbnNcbiAgICBpZiAodGhpcy5lbmFibGVDaGVja2JveCkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goJ2NoZWNrYm94Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dOdW1iZXJDb2x1bW4pIHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKCdubycpO1xuICAgIH1cbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKGMuZmllbGROYW1lKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5tb3JlQWN0aW9ucykge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goJ2FjdGlvbnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5kZWJ1ZygnbW9yZUFjdGlvbnMgbm90IGluamVjdGVkIHNraXBwaW5nIHJlbmRlcmluZyBcXCdNb3JlIEFjdGlvbnNcXCcgY29sdW1uJyk7XG4gICAgfVxuICAgIGxldCBncm91cCA9IHt9O1xuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgbGV0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIFRncklucHV0IHx8IGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBUZ3JUZXh0YXJlYSkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgVGdySW5wdXQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KGNvbXAuY29udHJvbFR5cGUubWF4KSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xuICAgICAgfVxuICAgICAgZ3JvdXBbY29tcC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgdmFsaWRhdG9ycylcbiAgICB9KTtcbiAgICAvL2FkZCBkZWZhdWx0IGNvbnRyb2xzXG4gICAgZ3JvdXBbJ2Zyb20nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMTAwKSk7XG4gICAgZ3JvdXBbJ3RvJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW50aWFsaXphdGlvbiBmaXJlIHNlbGVjdGlvbiBldmVudFxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMucm93U2VsZWN0aW9uLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG51bWJlciBvZiBzZWxlY3RlZCBlbGVtZW50cyBtYXRjaGVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cy4gKi9cbiAgaXNBbGxTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBudW1TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICBjb25zdCBudW1Sb3dzID0gdGhpcy5wYWdlLmNvbnRlbnQubGVuZ3RoO1xuICAgIHJldHVybiBudW1TZWxlY3RlZCA9PSBudW1Sb3dzO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgYWxsIHJvd3MgaWYgdGhleSBhcmUgbm90IGFsbCBzZWxlY3RlZDsgb3RoZXJ3aXNlIGNsZWFyIHNlbGVjdGlvbi4gKi9cbiAgbWFzdGVyVG9nZ2xlKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCkgOlxuICAgICAgdGhpcy5wYWdlLmNvbnRlbnQuZm9yRWFjaChyb3cgPT4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0KHJvdykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xuICAgKiBAcGFyYW0gZXZlbnQgQWN0aW9ucyBkYXRhXG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBUZ3JNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMuYWN0aW9uc0V2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxuICAgKlxuICAgKiBAcGFyYW0gcGFnZUluZm8gUGFnZSB2YXJpYWJsZXNcbiAgICogQHBhcmFtIGZpbHRlcnMgRmlsdGVyIHZhcmlhYmxlc1xuICAgKi9cbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmFtcykge1xuICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoa2V5ICE9IG51bGwgJiYga2V5ICE9PSB1bmRlZmluZWQpIHsgLy8gaWdub3JlIG51bGwgdmFsdWVzXG4gICAgICAgICAgcmVxdWVzdC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXF1ZXN0LnNldCgncGFnZScsIHBhZ2VJbmZvLm9mZnNldCk7XG4gICAgcmVxdWVzdC5zZXQoJ3NpemUnLCBwYWdlSW5mby5saW1pdCk7XG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QsIHRoaXMuaGVhZGVycykuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICBpZiAodGhpcy5zaG93TnVtYmVyQ29sdW1uKSB7XG4gICAgICAgICAgbGV0IG5vID0gMSArIChyZXNwb25zZS5kYXRhLm51bWJlciAqIHJlc3BvbnNlLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgcmVzcG9uc2UuZGF0YS5jb250ZW50LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgdmFsLm5vID0gbm8rKztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2UgPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZygnU2VydmVyIHJlcXVlc3QgaGFzIGZhaWxlZCcpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0b2xpc3RlbiB0byBwYWdpbmF0aW9uIGV2ZW50cy9hY3Rpb25zXG4gICAqIEBwYXJhbSBwYWdlIHBhZ2UgdmFyaWFibGVzXG4gICAqL1xuICBwYWdlRXZlbnQocGFnZTogUGFnZUV2ZW50KSB7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiBwYWdlLnBhZ2VTaXplLCBvZmZzZXQ6IHBhZ2UucGFnZUluZGV4IH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2Vzc2luZyB0YWJsZSBzb3J0aW5nXG4gICAqIEBwYXJhbSBldmVudCBTb3J0IHZhcmlhYmxlc1xuICAgKi9cbiAgcHJvY2Vzc1NvcnRpbmcoZXZlbnQ6IFNvcnQpIHtcbiAgICB0aGlzLnNvcnRQYXJhbXMgPSBldmVudDtcbiAgICB0aGlzLmxvYWRQYWdlKHsgbGltaXQ6IHRoaXMucGFnZS5zaXplLCBvZmZzZXQ6IDAgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZ2V0IGZpbHRlciBlbnRyaWVzIGZyb20gdGhlIGZpbHRlciBmb3JtLiBBbHNvIGFkZHMgc29ydCBwYXJhbWV0ZXJzIHRvIHJlcXVlc3RcbiAgICovXG4gIHByaXZhdGUgZ2V0RmlsdGVycygpIHtcbiAgICBjb25zdCBmOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0udmFsdWUpLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmRlYnVnKFwiS2V5IGlzIFwiICsga2V5ICsgXCIgYW5kIHZhbHVlIFwiICsgdmFsKTtcbiAgICAgIGlmICh0aGlzLmZpbHRlckZvcm0udmFsdWVbdmFsXSkge1xuICAgICAgICBpZiAodmFsID09PSAnZnJvbScgfHwgdmFsID09PSAndG8nKSB7XG4gICAgICAgICAgZi5zZXQodmFsLCB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh0aGlzLmZpbHRlckZvcm0udmFsdWVbdmFsXSwgJ3l5eXktTU0tZGQnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZi5zZXQodmFsLCB0aGlzLmZpbHRlckZvcm0udmFsdWVbdmFsXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIGFkZCBzb3J0aW5nIHBhcmFtZXRlcnNcbiAgICBpZiAodGhpcy5zb3J0UGFyYW1zKSB7XG4gICAgICBmLnNldCgnc29ydCcsIHRoaXMuc29ydFBhcmFtcy5hY3RpdmUgKyAnLCcgKyB0aGlzLnNvcnRQYXJhbXMuZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGY7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXNcbiAgICogc2V0IHRvIDIwMTgtMDEtMDEgYW5kIHRvIHZhbHVlIGlzIHNldCB0byAxIHllYXIgZnJvbSB0b2RheVxuICAgKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgcHJvY2Vzc0ZpbHRlcigpIHtcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgYWRkaXRpb25hbCBjb250cm9sIGlzIGlucHV0XG4gICAqXG4gICAqIEBwYXJhbSBjb250cm9sIGFkZGl0aW9uYWwgY29udHJvbFxuICAgKi9cbiAgaXNJbnB1dChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIFRncklucHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgc2VsZWN0XG4gICAqXG4gICAqIEBwYXJhbSBjb250cm9sIFNlbGVjdCBjb250cm9sXG4gICAqL1xuICBpc1NlbGVjdChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIFRnclNlbGVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHRleHRhcmVhXG4gICAqL1xuICBpc1RleHRBcmVhKGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgVGdyVGV4dGFyZWE7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmb3JtYXQgZGF0ZSB0byBzdHJpbmcgeXl5eS1NTS1kZFxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlIHZhcmlhYmxlXG4gICAqL1xuICBnZXRGb3JtYXR0ZWREYXRlKGRhdGUpIHtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgbGV0IG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcblxuICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xuXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogb2JqZWN0LCBjb2x1bW46IFRnck1hdFRhYmxlQ29sdW1uKSB7XG4gICAgaWYgKGNvbHVtbi5jYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGNvbHVtbi5jYWxsYmFjayhkYXRhKTtcbiAgICB9XG4gICAgY29uc3QgazogQXJyYXk8c3RyaW5nPiA9IGNvbHVtbi5maWVsZE5hbWUuc3BsaXQoJy4nKTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldE9iamVjdFZhbHVlKGRhdGEsIGspO1xuICAgIHJldHVybiBjb2x1bW4uaXNEYXRlQ29sdW1uID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsICdtZWRpdW0nKSA6IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggZGF0YSB0YWJsZSB2YWx1ZXNcbiAgICovXG4gIHJlZnJlc2hUYWJsZSgpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdSZWZyZXNoZWQgZGF0YSB0YWJsZXMnKTtcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcbiAqIGRyYWdnYWJsZSwgcmVzaXphYmxlLCBpc0RhdGVDb2x1bW4pXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGdyTWF0VGFibGVDb2x1bW4ge1xuICAvKipcbiAgICogY29sdW1uIHRpdGxlXG4gICAqL1xuICBjb2x1bW5OYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTZXJ2ZXIgc2lkZSByZXNwb25zZSBmaWVsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBjb2x1bW4gaS5lIGZ1bGxOYW1lIG1heSBjb3JyZXNwb25kIHRvIE5hbWUgY29sdW1uXG4gICAqL1xuICBmaWVsZE5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlIHNvcnRpbmcgaW4gYSBjb2x1bW5cbiAgICovXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgLy8gLyoqXG4gIC8vICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAvLyAgKi9cbiAgLy8gY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XG4gIC8vIC8qKlxuICAvLyAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxuICAvLyAgKi9cbiAgLy8gZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgLy8gLyoqXG4gIC8vICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAvLyAgKi9cbiAgLy8gcmVzaXplYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgdGltZXN0YW1wIHRvIHN0cmluZyBkYXRlXG4gICAqL1xuICBpc0RhdGVDb2x1bW4/OiBib29sZWFuO1xuICAvKipcbiAgICogSGlkZSBvbiBzbWFsbCBkZXZpY2UgbGVzcyB0aGFuIDU3NnB4XG4gICAqL1xuICBoaWRlT25Ycz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiB1c2VkIGZvciBjZWxsIHJlbmRlcmluZy5cbiAgICogIE5vdGU6IEZ1bmN0aW9uIHJlc3VsdHMgYXJlIG5vdCBzYW5pdGlzZWRcbiAgICovXG4gIGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gb2JqZWN0O1xufVxuXG4vKipcbiAqIFVzZWQgdG8gZGlzcGxheSBtb3JlIGFjdGlvbnMgY29sdW1uIGFuZCB0aGUgZW5kIG9mIHRoZSB0YWJsZVxuICovXG5leHBvcnQgY2xhc3MgVGdyTW9yZUFjdGlvbnMge1xuICAvKipcbiAgICogQWN0aW9uIENvbHVtbiBuYW1lIGUuZy4gTW9yZSBBY3Rpb25zXG4gICAqL1xuICBuYW1lID0gJ0FjdGlvbnMnO1xuICAvKipcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgaWRGaWVsZE5hbWUgPSAnaWQnO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8VGdyTW9yZUFjdGlvbkRhdGE+O1xuICAvKipcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gb2JqZWN0O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gYWN0aW9ucyBSb3dzIGFjdGlvbiBkYXRhXG4gICAqIEBwYXJhbSBpZCBJZCBmaWVsZCBuYW1lIGN1cnJlbnRseSBkZXByZWNhdGVkXG4gICAqIEBwYXJhbSBuYW1lIEFjdGlvbnMgY29sdW1uIG5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrIFJvd3MgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGRhdGEgc2FuaXRpemF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBBcnJheTxUZ3JNb3JlQWN0aW9uRGF0YT4sIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nLCBjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IG9iamVjdCkge1xuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkRmllbGROYW1lID0gaWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZ3JNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG4gIC8qKlxuICAgKiBcbiAgICovXG4gIGRhdGE/OiBvYmplY3Q7XG59XG4iXX0=