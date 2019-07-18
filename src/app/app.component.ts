import { Component, EventEmitter, ViewChild } from '@angular/core';
import { TgrMatTableColumn, TgrMoreActionData, TgrDynamicControl, TgrInput, TgrTextarea, TgrSelect, TgrMaterialTableComponent, TgrMoreActions } from 'steward-client'
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  matColumns: Array<TgrMatTableColumn> = [
    { columnName: "Role Name", fieldName: "name", callback: function(model){
      return "<a href='#'>" + model['name'] + '</a>';
    }},
    { columnName: "Description", fieldName: "description"},
    { columnName: "Date Created", isDateColumn: true, fieldName: "creationDate" }
  ];
  matMoreActions: TgrMoreActions;
  filterControls: Array<TgrDynamicControl<any>>;
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);
   /**
   * 
   */
  @ViewChild(TgrMaterialTableComponent) dataTable: TgrMaterialTableComponent;;

  constructor() {
    this.matMoreActions = new TgrMoreActions([
      { actionName: "View" }, { actionName: "Delete" }
    ], "id", "More Actions");

    let testControl: TgrInput = new TgrInput();
    testControl.type = 'number';
    testControl.max = 3;

    let testText: TgrTextarea = new TgrTextarea();
    testText.cols = 5;
    testText.rows = 2;
    testText.maxLength = 6;
    testText.minLength = 2;

    let selectControl: TgrSelect = new TgrSelect(
      [
        { value: 1, text: 'New' },
        { value: 2, text: 'Active'},
        { value: 3, text: 'Pending'}
      ])

    this.filterControls = [
      new TgrDynamicControl('Test', 'testControl', testControl),
      new TgrDynamicControl('Description', 'testText', testText),
      new TgrDynamicControl('Status', 'status', selectControl),
    ];

  }

  onActionsEvent(event: EventEmitter<TgrMoreActionData>) {
    this.dataTable.refreshTable();
    console.debug("Material table action", event);
  }

  approveRecords(event){
    console.debug("Approving records", this.selection);
  }
}
