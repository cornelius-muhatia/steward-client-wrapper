import { OnInit, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { ResponseWrapper } from '../entities/wrappers/response-wrapper';
import { StewardClientService } from '../steward-client.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NativeDateAdapter, PageEvent, MatSort, Sort } from '@angular/material';
import { TgrDynamicControl } from '../entities/tgr-dynamic-control';
/**
 * Format angular date to dd-mm-yyyy
 */
export declare class AppDateAdapter extends NativeDateAdapter {
    /**
     * Parse date to dd-mm-yyyy
     * @param date  date input
     * @param displayFormat expects to be input string
     */
    format(date: Date, displayFormat: Object): string;
}
/**
 * Material date formats
 */
export declare const APP_DATE_FORMATS: {
    parse: {
        dateInput: {
            month: string;
            year: string;
            day: string;
        };
    };
    display: {
        dateInput: string;
        monthYearLabel: {
            year: string;
            month: string;
        };
        dateA11yLabel: {
            year: string;
            month: string;
            day: string;
        };
        monthYearA11yLabel: {
            year: string;
            month: string;
        };
    };
};
export declare class TgrMaterialTableComponent implements OnInit, AfterViewInit {
    private sterwardService;
    displayedColumns: string[];
    selection: SelectionModel<any>;
    rowSelection: EventEmitter<SelectionModel<any>>;
    sort: MatSort;
    columns: Array<TgrMatTableColumn>;
    enableCheckbox: boolean;
    endpoint: string;
    moreActions: TgrMoreActions;
    actionsEvent: EventEmitter<TgrMoreActionData>;
    filterComponents: Array<TgrDynamicControl<any>>;
    params: Map<string, any>;
    showDefaultFilters: boolean;
    showNumberColumn: boolean;
    /**
     * Additional headers to be appended on the request headers
     */
    headers: Map<string, string | string[]>;
    page: Page<any>;
    selected: any[];
    filter: Object;
    filterForm: FormGroup;
    private sortParams;
    /**
     * Checks if server request has been processed
     */
    isLoadingResults: boolean;
    /**
     * Date pipe
     */
    private datePipe;
    constructor(sterwardService: StewardClientService<ResponseWrapper<Page<any>>, any>);
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     */
    ngOnInit(): void;
    /**
     * After view intialization fire selection event
     */
    ngAfterViewInit(): void;
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean;
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void;
    /**
     * Used to emit click event of the actions
     * @param event Actions data
     */
    onActionClick(event: TgrMoreActionData): void;
    /**
     * Process server request of datable
     *
     * @param pageInfo Page variables
     * @param filters Filter variables
     */
    loadPage(pageInfo: any, filters: any): void;
    /**
     * Used tolisten to pagination events/actions
     * @param page page variables
     */
    pageEvent(page: PageEvent): void;
    /**
     * Used to processing table sorting
     * @param event Sort variables
     */
    processSorting(event: Sort): void;
    /**
     * Used to get filter entries from the filter form. Also adds sort parameters to request
     */
    private getFilters;
    /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     *
     * @deprecated
     */
    processFilter(): void;
    /**
     * Used to check if additional control is input
     *
     * @param control additional control
     */
    isInput(control: any): boolean;
    /**
     * Used to check if miliki control is select
     *
     * @param control Select control
     */
    isSelect(control: any): boolean;
    /**
     * Used to check if miliki control is textarea
     */
    isTextArea(control: any): boolean;
    /**
     * Used to format date to string yyyy-MM-dd
     * @param date Date variable
     */
    getFormattedDate(date: any): string;
    getFieldValue(data: object, column: TgrMatTableColumn): any;
    /**
     * Refresh data table values
     */
    refreshTable(): void;
}
/**
 * Used to define datatable columns with attributes (columnName, fieldName, width, sortable, canAutoResize,
 * draggable, resizable, isDateColumn)
 */
export interface TgrMatTableColumn {
    /**
     * column title
     */
    columnName: string;
    /**
     * Server side response field corresponding to the column i.e fullName may correspond to Name column
     */
    fieldName: string;
    /**
     * Width of the column
     */
    width?: number;
    /**
     * Enable sorting in a column
     */
    sortable?: boolean;
    /**
     * Used to enable formating timestamp to string date
     */
    isDateColumn?: boolean;
    /**
     * Hide on small device less than 576px
     */
    hideOnXs?: boolean;
    /**
     * Callback function used for cell rendering.
     *  Note: Function results are not sanitised
     */
    callback?: (data: any) => object;
}
/**
 * Used to display more actions column and the end of the table
 */
export declare class TgrMoreActions {
    /**
     * Action Column name e.g. More Actions
     */
    name: string;
    /**
     * Field name id from the server response e.g userId
     * @deprecated
     */
    idFieldName: string;
    /**
     * Actions e.g. Edit, Delete
     */
    actions: Array<TgrMoreActionData>;
    /**
     * Callback function
     */
    callback?: (data: any) => object;
    /**
     * @param actions Rows action data
     * @param id Id field name currently deprecated
     * @param name Actions column name
     * @param callback Rows callback function for data sanitization
     */
    constructor(actions: Array<TgrMoreActionData>, id?: string, name?: string, callback?: (data: any) => object);
}
export interface TgrMoreActionData {
    /**
     * Never mind this field it will be used by the library
     * @deprecated
     */
    id?: any;
    /**
     * Action name e.g. Edit, Delete
     */
    actionName: any;
    /**
     *
     */
    data?: object;
}
