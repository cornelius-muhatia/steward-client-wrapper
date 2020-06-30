import { Component, OnInit, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkDynamicControl, MlkInput, MlkTextarea, MlkSelect } from '../entities/wrappers/mlk-dynamic-control';
import { ResponseWrapper } from '../entities/wrappers/response-wrapper';
import { StewardClientService } from '../steward-client.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NativeDateAdapter, PageEvent, MatSort, Sort } from '@angular/material';
import { TgrDynamicControl, TgrInput, TgrSelect, TgrTextarea } from '../entities/tgr-dynamic-control';
import { DatePipe } from '@angular/common';

/**
 * Format angular date to dd-mm-yyyy
 */
export class AppDateAdapter extends NativeDateAdapter {

  /**
   * Parse date to dd-mm-yyyy
   * @param date  date input
   * @param displayFormat expects to be input string
   */
  format(date: Date, displayFormat: Object): string {

    if (displayFormat === 'input') {

      var day = date.getDate();
      var month = date.getMonth() + 1;
      const year = date.getFullYear();
      let dayString: string;
      let monthString: string;

      if (day < 10) {
        dayString = '0' + day;
      } else {
        dayString = '' + day;
      }

      if (month < 10) {
        monthString = '0' + month;
      } else {
        monthString = '' + month;
      }

      return `${year}-${monthString}-${dayString}`;
    }

    return date.toDateString();
  }
}
/**
 * Material date formats
 */
export const APP_DATE_FORMATS =
{
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


@Component({
  selector: 'tgr-material-table',
  templateUrl: './tgr-material-table.component.html',
  styleUrls: ['./tgr-material-table.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class TgrMaterialTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [];
  @Output() selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  @Output() rowSelection = new EventEmitter<SelectionModel<any>>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  @Input() columns: Array<TgrMatTableColumn> = [];
  @Input() enableCheckbox: boolean = true;
  @Input() endpoint: string;
  @Input() moreActions: TgrMoreActions;
  @Output() actionsEvent = new EventEmitter<TgrMoreActionData>()
  @Input() filterComponents: Array<TgrDynamicControl<any>> = [];
  @Input() params: Map<string, any>;
  @Input() showDefaultFilters: boolean = true;
  @Input() showNumberColumn: boolean = false;
  /**
   * Additional headers to be appended on the request headers
   */
  @Input() headers: Map<string, string | string[]>;
  page: Page<any>;
  selected = [];
  // @ViewChild(DatatableComponent) table: DatatableComponent;
  filter: Object = {};
  filterForm: FormGroup;
  private sortParams: Sort;
  /**
   * Checks if server request has been processed
   */
  isLoadingResults = false;
  /**
   * Date pipe
   */
  private datePipe: DatePipe

  constructor(private sterwardService: StewardClientService<ResponseWrapper<Page<any>>, any>) {
    this.page = new Page();
    this.page.content = [];
    this.datePipe = new DatePipe('en-US');
  }

  /**
   * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
   */
  ngOnInit() {
    //intializing table columns
    if (this.enableCheckbox) {
      this.displayedColumns.push('checkbox');
    }
    if (this.showNumberColumn) {
      this.displayedColumns.push('no');
    }
    this.columns.forEach(c => {
      this.displayedColumns.push(c.fieldName);
    });
    if (this.moreActions) {
      this.displayedColumns.push('actions');
    } else {
      console.debug('moreActions not injected skipping rendering \'More Actions\' column');
    }
    let group = {};
    this.filterComponents.forEach(comp => {
      let validators: Array<any> = [];
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
      group[comp.name] = new FormControl('', validators)
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
   */
  ngAfterViewInit(): void {
    this.rowSelection.emit(this.selection);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.page.content.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.page.content.forEach(row => this.selection.select(row));
  }

  /**
   * Used to emit click event of the actions
   * @param event Actions data
   */
  onActionClick(event: TgrMoreActionData) {
    this.actionsEvent.emit(event);
  }

  /**
   * Process server request of datable
   *
   * @param pageInfo Page variables
   * @param filters Filter variables
   */
  loadPage(pageInfo, filters) {
    if (!this.endpoint) {
      return;
    }
    this.isLoadingResults = true;
    let request: Map<string, any>;
    if (filters) {
      request = filters;
    } else {
      request = new Map();
    }
    if (this.params) {
      this.params.forEach((value, key) => {
        if (key != null && key !== undefined) { // ignore null values
          request.set(key, value);
        }
      });
    }
    request.set('page', pageInfo.offset);
    request.set('size', pageInfo.limit);
    this.sterwardService.get(this.endpoint, request, this.headers).subscribe(response => {
      if (response.status === 200) {
        if (this.showNumberColumn) {
          let no = 1 + (response.data.number * response.data.size);
          response.data.content.forEach((val) => {
            val.no = no++;
          });
        }
        this.page = response.data;
      }
      this.isLoadingResults = false;
    },
      error => {
        console.debug('Server request has failed');
        this.isLoadingResults = false;
      });

  }

  /**
   * Used tolisten to pagination events/actions
   * @param page page variables
   */
  pageEvent(page: PageEvent) {
    this.loadPage({ limit: page.pageSize, offset: page.pageIndex }, this.getFilters());
  }


  /**
   * Used to processing table sorting
   * @param event Sort variables
   */
  processSorting(event: Sort) {
    this.sortParams = event;
    this.loadPage({ limit: this.page.size, offset: 0 }, this.getFilters());
  }

  /**
   * Used to get filter entries from the filter form. Also adds sort parameters to request
   */
  private getFilters() {
    const f: Map<string, any> = new Map<string, any>();
    Object.keys(this.filterForm.value).forEach((val, key) => {
      // console.debug("Key is " + key + " and value " + val);
      if (this.filterForm.value[val]) {
        if (val === 'from' || val === 'to') {
          f.set(val, this.datePipe.transform(this.filterForm.value[val], 'yyyy-MM-dd'));
        } else {
          f.set(val, this.filterForm.value[val]);
        }
      }
    })
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
   */
  processFilter() {
    this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
  }

  /**
   * Used to check if additional control is input
   *
   * @param control additional control
   */
  isInput(control: any) {
    return control instanceof TgrInput;
  }

  /**
   * Used to check if miliki control is select
   *
   * @param control Select control
   */
  isSelect(control: any) {
    return control instanceof TgrSelect;
  }

  /**
   * Used to check if miliki control is textarea
   */
  isTextArea(control: any) {
    return control instanceof TgrTextarea;
  }

  /**
   * Used to format date to string yyyy-MM-dd
   * @param date Date variable
   */
  getFormattedDate(date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '-' + month + '-' + day;
  }

  getFieldValue(data: object, column: TgrMatTableColumn) {
    if (column.callback) {
      return column.callback(data);
    }
    const k: Array<string> = column.fieldName.split('.');
    const value = this.sterwardService.getObjectValue(data, k);
    return column.isDateColumn ? this.datePipe.transform(value, 'medium') : value;
  }

  /**
   * Refresh data table values
   */
  refreshTable() {
    console.debug('Refreshed data tables');
    this.loadPage({ offset: this.page.number, limit: this.page.size }, this.getFilters());
  }

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
  // /**
  //  * Makes a column resizable
  //  */
  // canAutoResize?: boolean;
  // /**
  //  * Enables a column to be draggable
  //  */
  // draggable?: boolean;
  // /**
  //  * Makes a column resizable
  //  */
  // resizeable?: boolean;
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
export class TgrMoreActions {
  /**
   * Action Column name e.g. More Actions
   */
  name = 'Actions';
  /**
   * Field name id from the server response e.g userId
   * @deprecated
   */
  idFieldName = 'id';
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
  constructor(actions: Array<TgrMoreActionData>, id?: string, name?: string, callback?: (data: any) => object) {
    this.actions = actions;
    this.name = name;
    this.idFieldName = id;
    this.callback = callback;
  }

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
