/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
/** *
 * Material date formats
  @type {?} */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3Rnci1tYXRlcmlhbC10YWJsZS90Z3ItbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFVLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQWEsT0FBTyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDaEYsT0FBTyxFQUFxQixRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUszQyxNQUFNLHFCQUFzQixTQUFRLGlCQUFpQjs7Ozs7OztJQU9uRCxNQUFNLENBQUMsSUFBVSxFQUFFLGFBQXFCO1FBRXRDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUU5QixJQUFJ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b0JBQ1QsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7b0JBQ2xEO3dCQUNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCO3FCQUN0RDtpQkFDRjthQUNGOzs7O1lBak9RLG9CQUFvQjs7O3dCQXFPMUIsTUFBTTsyQkFDTixNQUFNO21CQUNOLFNBQVMsU0FBQyxPQUFPO3NCQUdqQixLQUFLOzZCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLE1BQU07K0JBQ04sS0FBSztxQkFDTCxLQUFLO2lDQUNMLEtBQUs7K0JBQ0wsS0FBSztzQkFJTCxLQUFLO29CQUdMLFNBQVMsU0FBQyxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMlMvQixNQUFNOzs7Ozs7SUFjSixZQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWE7Ozs7b0JBVjFELFNBQVM7Ozs7MkJBSUYsSUFBSTtRQU94QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztLQUN2QjtDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0Zvcm0sIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcGFnZSc7XG5pbXBvcnQgeyBNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1RleHRhcmVhLCBNbGtTZWxlY3QgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sJztcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUywgTUFUX0RBVEVfTE9DQUxFIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVEYXRlQWRhcHRlciwgUGFnZUV2ZW50LCBNYXRTb3J0LCBTb3J0IH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBUZ3JEeW5hbWljQ29udHJvbCwgVGdySW5wdXQsIFRnclNlbGVjdCwgVGdyVGV4dGFyZWEgfSBmcm9tICcuLi9lbnRpdGllcy90Z3ItZHluYW1pYy1jb250cm9sJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBGb3JtYXQgYW5ndWxhciBkYXRlIHRvIGRkLW1tLXl5eXlcbiAqL1xuZXhwb3J0IGNsYXNzIEFwcERhdGVBZGFwdGVyIGV4dGVuZHMgTmF0aXZlRGF0ZUFkYXB0ZXIge1xuXG4gIC8qKlxuICAgKiBQYXJzZSBkYXRlIHRvIGRkLW1tLXl5eXlcbiAgICogQHBhcmFtIGRhdGUgIGRhdGUgaW5wdXRcbiAgICogQHBhcmFtIGRpc3BsYXlGb3JtYXQgZXhwZWN0cyB0byBiZSBpbnB1dCBzdHJpbmdcbiAgICovXG4gIGZvcm1hdChkYXRlOiBEYXRlLCBkaXNwbGF5Rm9ybWF0OiBPYmplY3QpOiBzdHJpbmcge1xuXG4gICAgaWYgKGRpc3BsYXlGb3JtYXQgPT09ICdpbnB1dCcpIHtcblxuICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBsZXQgZGF5U3RyaW5nOiBzdHJpbmc7XG4gICAgICBsZXQgbW9udGhTdHJpbmc6IHN0cmluZztcblxuICAgICAgaWYgKGRheSA8IDEwKSB7XG4gICAgICAgIGRheVN0cmluZyA9ICcwJyArIGRheTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRheVN0cmluZyA9ICcnICsgZGF5O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9udGggPCAxMCkge1xuICAgICAgICBtb250aFN0cmluZyA9ICcwJyArIG1vbnRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9udGhTdHJpbmcgPSAnJyArIG1vbnRoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7eWVhcn0tJHttb250aFN0cmluZ30tJHtkYXlTdHJpbmd9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgfVxufVxuLyoqXG4gKiBNYXRlcmlhbCBkYXRlIGZvcm1hdHNcbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9EQVRFX0ZPUk1BVFMgPVxue1xuICBwYXJzZToge1xuICAgIGRhdGVJbnB1dDogeyBtb250aDogJ251bWVyaWMnLCB5ZWFyOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0sXG4gIH0sXG4gIGRpc3BsYXk6IHtcbiAgICBkYXRlSW5wdXQ6ICdpbnB1dCcsXG4gICAgbW9udGhZZWFyTGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnIH0sXG4gICAgZGF0ZUExMXlMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0sXG4gICAgbW9udGhZZWFyQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJyB9LFxuICB9XG59O1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Rnci1tYXRlcmlhbC10YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInJvd1wiICAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVycyB8fCBmaWx0ZXJDb21wb25lbnRzLmxlbmd0aCA+IDBcIj5cbiAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtb3V0bGluZS1kZWZhdWx0IG1hdC1lbGV2YXRpb24tejRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXQtdGFibGUtZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0aXRsZT1cIlJlZnJlc2hcIiAoY2xpY2spID0gXCJyZWZyZXNoVGFibGUoKVwiIG1hdC1pY29uLWJ1dHRvbiBjb2xvcj1cImJhc2ljXCIgdHlwZT1cInJlc2V0XCI+PG1hdC1pY29uPnJlZnJlc2g8L21hdC1pY29uPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwicHJvY2Vzc0ZpbHRlcihmaWx0ZXJGb3JtKVwiIFtmb3JtR3JvdXBdPVwiZmlsdGVyRm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiICpuZ0Zvcj1cImxldCBjb250cm9sIG9mIGZpbHRlckNvbXBvbmVudHNcIj5cbiAgICAgICAgICAgICAgPCEtLSBJbnRpYWxpemUgZm9ybSBzZWxlY3QgY29udHJvbCAtLT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCIgKm5nSWY9XCJpc1NlbGVjdChjb250cm9sLmNvbnRyb2xUeXBlKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIGNvbnRyb2wuY29udHJvbFR5cGUub3B0aW9uc1wiIFt2YWx1ZV09XCJvLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7by50ZXh0fX1cbiAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fVxuICAgICAgICAgICAgICAgICAgaXMgcmVxdWlyZWQ8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgICAgICAgICAgICA8IS0tIEludGlhbGl6ZSBmb3JtIHRleHRhcmVhIGNvbnRyb2wgLS0+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLmxhYmVsXCIgW2NvbHNdPVwiY29udHJvbC5jb250cm9sVHlwZS5jb2xzXCJcbiAgICAgICAgICAgICAgICAgIFtyb3dzXT1cImNvbnRyb2wuY29udHJvbFR5cGUucm93c1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fVxuICAgICAgICAgICAgICAgICAgaXMgcmVxdWlyZWQ8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWluTGVuZ3RofX0gY2hhcmFjdGVyczwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXhMZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgICAgICAgICAgPCEtLSBJbnRpYWxpemUgZm9ybSBpbnB1dCBjb250cm9sIC0tPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIiAqbmdJZj1cImlzSW5wdXQoY29udHJvbC5jb250cm9sVHlwZSlcIj5cbiAgICAgICAgICAgICAgICA8IS0tIDxtYXQtaWNvbiBtYXRQcmVmaXggY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBpY29uLW1hcmdpbi1yaWdodFwiPnBlcm1faWRlbnRpdHk8L21hdC1pY29uPiAtLT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wubGFiZWxcIiBbdHlwZV09XCJjb250cm9sLmNvbnRyb2xUeXBlLnR5cGVcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiIC8+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fVxuICAgICAgICAgICAgICAgICAgaXMgcmVxdWlyZWQ8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mXG4gICAgICAgICAgICAgICAgICB7e2NvbnRyb2wuY29udHJvbFR5cGUubWluTGVuZ3RofX0gY2hhcmFjdGVyczwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2ZcbiAgICAgICAgICAgICAgICAgIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXhMZW5ndGh9fSBjaGFyYWN0ZXJzPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbicpXCI+U2hvdWxkIGJlIGdyZWF0ZXIgdGhhblxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heCcpXCI+U2hvdWxkIGJlIGxlc3MgdGhhblxuICAgICAgICAgICAgICAgICAge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heH19PC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCIgKm5nSWY9XCJzaG93RGVmYXVsdEZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgPCEtLSA8bWF0LWljb24gbWF0UHJlZml4IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgY29sLW1kLTNcIj5kYXRlX3JhbmdlPC9tYXQtaWNvbj4gLS0+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cIkZyb21cIiB0eXBlPVwiZGF0ZVwiIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiIGZvcm1Db250cm9sTmFtZT1cImZyb21cIiAvPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIiAqbmdJZj1cInNob3dEZWZhdWx0RmlsdGVyc1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICA8IS0tIDxtYXQtaWNvbj5ob21lPC9tYXQtaWNvbj4gLS0+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiVG9cIiB0eXBlPVwiZGF0ZVwiIFttYXREYXRlcGlja2VyXT1cInRvUGlja2VyXCIgZm9ybUNvbnRyb2xOYW1lPVwidG9cIiAvPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwidG9QaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3RvUGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCIgKm5nSWY9XCJzaG93RGVmYXVsdEZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IG1heGxlbmd0aD1cIjEwMFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCIgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJuZWVkbGVcIiAvPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMjAwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBtYXQtdGFibGUtZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cImZpbHRlckZvcm0uaW52YWxpZFwiPkZpbHRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJiYXNpY1wiIHR5cGU9XCJyZXNldFwiPlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LXRhYmxlLWxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHNcIj5cbiAgICAgICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8dGFibGUgbWF0LXRhYmxlIFtkYXRhU291cmNlXT1cInBhZ2UuY29udGVudFwiIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16OFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiBtYXRTb3J0IChtYXRTb3J0Q2hhbmdlKT1cInByb2Nlc3NTb3J0aW5nKCRldmVudClcIj5cblxuICAgICAgPCEtLS0gTm90ZSB0aGF0IHRoZXNlIGNvbHVtbnMgY2FuIGJlIGRlZmluZWQgaW4gYW55IG9yZGVyLlxuICAgICAgICAgIFRoZSBhY3R1YWwgcmVuZGVyZWQgY29sdW1ucyBhcmUgc2V0IGFzIGEgcHJvcGVydHkgb24gdGhlIHJvdyBkZWZpbml0aW9uXCIgLS0+XG5cbiAgICAgIDwhLS0gUG9zaXRpb24gQ29sdW1uIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJjaGVja2JveFwiICpuZ0lmPVwiZW5hYmxlQ2hlY2tib3hcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94IChjaGFuZ2UpPVwiJGV2ZW50ID8gbWFzdGVyVG9nZ2xlKCkgOiBudWxsXCIgW2NoZWNrZWRdPVwic2VsZWN0aW9uLmhhc1ZhbHVlKCkgJiYgaXNBbGxTZWxlY3RlZCgpXCJcbiAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cInNlbGVjdGlvbi5oYXNWYWx1ZSgpICYmICFpc0FsbFNlbGVjdGVkKClcIj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC90aD5cbiAgICAgICAgPCEtLSA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPiA8bWF0LWNoZWNrYm94PjwvbWF0LWNoZWNrYm94PiA8L3RkPiAtLT5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgIDxtYXQtY2hlY2tib3ggKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIChjaGFuZ2UpPVwiJGV2ZW50ID8gc2VsZWN0aW9uLnRvZ2dsZShyb3cpIDogbnVsbFwiIFtjaGVja2VkXT1cInNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdylcIj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIE51bWJlciBDb2x1bW4gLS0+XG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cIm5vXCIgKm5nSWY9XCJzaG93TnVtYmVyQ29sdW1uXCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyPiBOby4gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIiA+IFxuICAgICAgICAgICA8ZGl2Pnt7ZWxlbWVudFsnbm8nXX19PC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIEZpZWxkcyBDb2x1bW5zIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbWF0Q29sdW1uRGVmXT1cImMuZmllbGROYW1lXCIgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uc1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBbY2xhc3MuaGlkZV9vbl94c109XCJjLmhpZGVPblhzXCI+IHt7Yy5jb2x1bW5OYW1lfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIiBbY2xhc3MuaGlkZV9vbl94c109XCJjLmhpZGVPblhzXCI+IFxuICAgICAgICAgIDwhLS0ge3tjLmlzRGF0ZUNvbHVtbiA/XG4gICAgICAgICAgKGdldEZpZWxkVmFsdWUoZWxlbWVudCwgYykgfCBkYXRlOidtZWRpdW0nKSA6XG4gICAgICAgICAgZ2V0RmllbGRWYWx1ZShlbGVtZW50LCBjKX19IC0tPlxuICAgICAgICAgICA8ZGl2IFtpbm5lckh0bWxdID0gXCJnZXRGaWVsZFZhbHVlKGVsZW1lbnQsIGMpXCI+PC9kaXY+PC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8IS0tIE90aGVyIENvbHVtbiAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiYWN0aW9uc1wiICpuZ0lmPVwibW9yZUFjdGlvbnNcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj4ge3ttb3JlQWN0aW9ucy5uYW1lfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIj5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmxpc3Q8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG1vcmVBY3Rpb25zLmFjdGlvbnNcIiAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IGVsZW1lbnRbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZX0pXCI+e3thY3Rpb24uYWN0aW9uTmFtZX19PC9idXR0b24+XG4gICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC90cj5cbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO1wiPjwvdHI+XG4gICAgPC90YWJsZT5cbiAgICA8bWF0LXBhZ2luYXRvciAocGFnZSk9XCJwYWdlRXZlbnQoJGV2ZW50KVwiIHNob3dGaXJzdExhc3RCdXR0b25zIFtsZW5ndGhdPVwicGFnZS50b3RhbEVsZW1lbnRzXCIgW3BhZ2VTaXplXT1cIjBcIiBbcGFnZVNpemVPcHRpb25zXT1cIlsxLCA1LCAxMCwgMjAsIDUwLCAxMDAsIDIwMF1cIj5cbiAgICA8L21hdC1wYWdpbmF0b3I+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFibGUtZmlsdGVyIGJ1dHRvbnttYXJnaW4tcmlnaHQ6OHB4O2Zsb2F0OnJpZ2h0fUBtZWRpYSAobWF4LXdpZHRoOjU3NnB4KXsuaGlkZV9vbl94c3tkaXNwbGF5Om5vbmV9fS5tYXQtdGFibGUtbG9hZGluZy1zaGFkZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym90dG9tOjU2cHg7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjE1KTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5tYXQtY2VsbHtwYWRkaW5nLXJpZ2h0OjhweH1gXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IEFwcERhdGVBZGFwdGVyIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IEFQUF9EQVRFX0ZPUk1BVFNcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbXTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbjogU2VsZWN0aW9uTW9kZWw8YW55PiA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxhbnk+KHRydWUsIFtdKTtcbiAgQE91dHB1dCgpIHJvd1NlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uTW9kZWw8YW55Pj4oKTtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG5cbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8VGdyTWF0VGFibGVDb2x1bW4+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcbiAgQElucHV0KCkgbW9yZUFjdGlvbnM6IFRnck1vcmVBY3Rpb25zO1xuICBAT3V0cHV0KCkgYWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxUZ3JNb3JlQWN0aW9uRGF0YT4oKVxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxUZ3JEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xuICBASW5wdXQoKSBwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIEBJbnB1dCgpIHNob3dEZWZhdWx0RmlsdGVyczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dOdW1iZXJDb2x1bW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIEFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBhcHBlbmRlZCBvbiB0aGUgcmVxdWVzdCBoZWFkZXJzXG4gICAqL1xuICBASW5wdXQoKSBoZWFkZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT47XG4gIHBhZ2U6IFBhZ2U8YW55PjtcbiAgc2VsZWN0ZWQgPSBbXTtcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XG4gIGZpbHRlcjogT2JqZWN0ID0ge307XG4gIGZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgcHJpdmF0ZSBzb3J0UGFyYW1zOiBTb3J0O1xuICAvKipcbiAgICogQ2hlY2tzIGlmIHNlcnZlciByZXF1ZXN0IGhhcyBiZWVuIHByb2Nlc3NlZFxuICAgKi9cbiAgaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAvKipcbiAgICogRGF0ZSBwaXBlXG4gICAqL1xuICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55Pikge1xuICAgIHRoaXMucGFnZSA9IG5ldyBQYWdlKCk7XG4gICAgdGhpcy5wYWdlLmNvbnRlbnQgPSBbXTtcbiAgICB0aGlzLmRhdGVQaXBlID0gbmV3IERhdGVQaXBlKFwiZW4tVVNcIik7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgLy9pbnRpYWxpemluZyB0YWJsZSBjb2x1bW5zXG4gICAgaWYodGhpcy5lbmFibGVDaGVja2JveCl7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChcImNoZWNrYm94XCIpO1xuICAgIH1cbiAgICBpZih0aGlzLnNob3dOdW1iZXJDb2x1bW4pe1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnB1c2goXCJub1wiKTtcbiAgICB9XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goYyA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMucHVzaChjLmZpZWxkTmFtZSk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubW9yZUFjdGlvbnMpIHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5wdXNoKFwiYWN0aW9uc1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIm1vcmVBY3Rpb25zIG5vdCBpbmplY3RlZCBza2lwcGluZyByZW5kZXJpbmcgJ01vcmUgQWN0aW9ucycgY29sdW1uXCIpO1xuICAgIH1cbiAgICBsZXQgZ3JvdXAgPSB7fTtcbiAgICB0aGlzLmZpbHRlckNvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgIGxldCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBpZiAoY29tcC5pc1JlcXVpcmVkKSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBUZ3JJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgVGdyVGV4dGFyZWEpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1heExlbmd0aCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIFRncklucHV0KSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpXG4gICAgfSk7XG4gICAgLy9hZGQgZGVmYXVsdCBjb250cm9sc1xuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMDApKTtcbiAgICBncm91cFsnbmVlZGxlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwMCkpO1xuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IDAsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGludGlhbGl6YXRpb24gZmlyZSBzZWxlY3Rpb24gZXZlbnRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvd1NlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgZWxlbWVudHMgbWF0Y2hlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MuICovXG4gIGlzQWxsU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgbnVtUm93cyA9IHRoaXMucGFnZS5jb250ZW50Lmxlbmd0aDtcbiAgICByZXR1cm4gbnVtU2VsZWN0ZWQgPT0gbnVtUm93cztcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIGFsbCByb3dzIGlmIHRoZXkgYXJlIG5vdCBhbGwgc2VsZWN0ZWQ7IG90aGVyd2lzZSBjbGVhciBzZWxlY3Rpb24uICovXG4gIG1hc3RlclRvZ2dsZSgpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpIDpcbiAgICAgIHRoaXMucGFnZS5jb250ZW50LmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBUZ3JNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMuYWN0aW9uc0V2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxuICAgKiBAcGFyYW0gcGFnZUluZm9cbiAgICogQHBhcmFtIGZpbHRlcnNcbiAgICovXG4gIGxvYWRQYWdlKHBhZ2VJbmZvLCBmaWx0ZXJzKSB7XG4gICAgaWYgKCF0aGlzLmVuZHBvaW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbXMpIHtcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleSAhPSBudWxsICYmIGtleSAhPSB1bmRlZmluZWQpIHsgLy9pZ25vcmUgbnVsbCB2YWx1ZXNcbiAgICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVlc3Quc2V0KFwicGFnZVwiLCBwYWdlSW5mby5vZmZzZXQpO1xuICAgIHJlcXVlc3Quc2V0KFwic2l6ZVwiLCBwYWdlSW5mby5saW1pdCk7XG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QsIHRoaXMuaGVhZGVycykuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGlmKHRoaXMuc2hvd051bWJlckNvbHVtbil7XG4gICAgICAgICAgbGV0IG5vID0gMSArIChyZXNwb25zZS5kYXRhLm51bWJlciAqIHJlc3BvbnNlLmRhdGEuc2l6ZSk7XG4gICAgICAgICAgcmVzcG9uc2UuZGF0YS5jb250ZW50LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgdmFsWydubyddID0gbm8rKztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2UgPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gZmFsc2U7XG4gICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNlcnZlciByZXF1ZXN0IGhhcyBmYWlsZWRcIik7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvbGlzdGVuIHRvIHBhZ2luYXRpb24gZXZlbnRzL2FjdGlvbnNcbiAgICogQHBhcmFtIHBhZ2UgXG4gICAqL1xuICBwYWdlRXZlbnQocGFnZTogUGFnZUV2ZW50KSB7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiBwYWdlLnBhZ2VTaXplLCBvZmZzZXQ6IHBhZ2UucGFnZUluZGV4IH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2Vzc2luZyB0YWJsZSBzb3J0aW5nXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHByb2Nlc3NTb3J0aW5nKGV2ZW50OiBTb3J0KSB7XG4gICAgdGhpcy5zb3J0UGFyYW1zID0gZXZlbnQ7XG4gICAgdGhpcy5sb2FkUGFnZSh7IGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSwgb2Zmc2V0OiAwIH0sIHRoaXMuZ2V0RmlsdGVycygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGdldCBmaWx0ZXIgZW50cmllcyBmcm9tIHRoZSBmaWx0ZXIgZm9ybS4gQWxzbyBhZGRzIHNvcnQgcGFyYW1ldGVycyB0byByZXF1ZXN0XG4gICAqL1xuICBwcml2YXRlIGdldEZpbHRlcnMoKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgLy8gbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIGxldCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJLZXkgaXMgXCIgKyBrZXkgKyBcIiBhbmQgdmFsdWUgXCIgKyB2YWwpO1xuICAgICAgaWYgKHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdKSB7XG4gICAgICAgIGlmICh2YWwgPT0gJ2Zyb20nIHx8IHZhbCA9PSBcInRvXCIpIHtcbiAgICAgICAgICBmLnNldCh2YWwsIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdLCAneXl5eS1NTS1kZCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmLnNldCh2YWwsIHRoaXMuZmlsdGVyRm9ybS52YWx1ZVt2YWxdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLy9hZGQgc29ydGluZyBwYXJhbWV0ZXJzXG4gICAgaWYgKHRoaXMuc29ydFBhcmFtcykge1xuICAgICAgZi5zZXQoXCJzb3J0XCIsIHRoaXMuc29ydFBhcmFtcy5hY3RpdmUgKyBcIixcIiArIHRoaXMuc29ydFBhcmFtcy5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZjtcbiAgfVxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXMgXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcbiAgICogQHBhcmFtIGZvcm0gXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBwcm9jZXNzRmlsdGVyKGZvcm0pIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgdGhpcy5nZXRGaWx0ZXJzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgaW5wdXRcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzSW5wdXQoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBUZ3JTZWxlY3Q7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxuICAgKi9cbiAgaXNUZXh0QXJlYShjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIFRnclRleHRhcmVhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgdmFyIG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcblxuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xuXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBjb2x1bW46IFRnck1hdFRhYmxlQ29sdW1uKSB7XG4gICAgaWYgKGNvbHVtbi5jYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGNvbHVtbi5jYWxsYmFjayhkYXRhKTtcbiAgICB9XG4gICAgdmFyIGs6IEFycmF5PHN0cmluZz4gPSBjb2x1bW4uZmllbGROYW1lLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldE9iamVjdFZhbHVlKGRhdGEsIGtleXMpO1xuICAgIHJldHVybiBjb2x1bW4uaXNEYXRlQ29sdW1uID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsICdtZWRpdW0nKSA6IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggZGF0YSB0YWJsZSB2YWx1ZXNcbiAgICovXG4gIHJlZnJlc2hUYWJsZSgpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiUmVmcmVzaGVkIGRhdGEgdGFibGVzXCIpO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCB0aGlzLmdldEZpbHRlcnMoKSk7XG4gIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIGRlZmluZSBkYXRhdGFibGUgY29sdW1ucyB3aXRoIGF0dHJpYnV0ZXMgKGNvbHVtbk5hbWUsIGZpZWxkTmFtZSwgd2lkdGgsIHNvcnRhYmxlLCBjYW5BdXRvUmVzaXplLFxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbilcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZ3JNYXRUYWJsZUNvbHVtbiB7XG4gIC8qKlxuICAgKiBjb2x1bW4gdGl0bGVcbiAgICovXG4gIGNvbHVtbk5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFNlcnZlciBzaWRlIHJlc3BvbnNlIGZpZWxkIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNvbHVtbiBpLmUgZnVsbE5hbWUgbWF5IGNvcnJlc3BvbmQgdG8gTmFtZSBjb2x1bW5cbiAgICovXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGNvbHVtblxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmFibGUgc29ydGluZyBpbiBhIGNvbHVtblxuICAgKi9cbiAgc29ydGFibGU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gIC8vICAqL1xuICAvLyBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcbiAgLy8gLyoqXG4gIC8vICAqIEVuYWJsZXMgYSBjb2x1bW4gdG8gYmUgZHJhZ2dhYmxlXG4gIC8vICAqL1xuICAvLyBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAvLyAvKipcbiAgLy8gICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gIC8vICAqL1xuICAvLyByZXNpemVhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyB0aW1lc3RhbXAgdG8gc3RyaW5nIGRhdGVcbiAgICovXG4gIGlzRGF0ZUNvbHVtbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBIaWRlIG9uIHNtYWxsIGRldmljZSBsZXNzIHRoYW4gNTc2cHhcbiAgICovXG4gIGhpZGVPblhzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIHVzZWQgZm9yIGNlbGwgcmVuZGVyaW5nLlxuICAgKiAgTm90ZTogRnVuY3Rpb24gcmVzdWx0cyBhcmUgbm90IHNhbml0aXNlZFxuICAgKi9cbiAgY2FsbGJhY2s/OiBGdW5jdGlvbjtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIFRnck1vcmVBY3Rpb25zIHtcbiAgLyoqXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xuICAgKi9cbiAgbmFtZTogc3RyaW5nID0gXCJBY3Rpb25zXCI7XG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXG4gICAqL1xuICBpZEZpZWxkTmFtZTogc3RyaW5nID0gXCJpZFwiO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8VGdyTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PFRnck1vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZ3JNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG59Il19