import { NgModule } from '@angular/core';
import { StewardClientComponent } from './steward-client.component';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StewardConfig } from './steward-client.service';
import { TgrMaterialTableComponent } from './tgr-material-table/tgr-material-table.component';
import {
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
} from '@angular/material';
import { TgrAutocompleteComponent } from './tgr-autocomplete/tgr-autocomplete.component';

@NgModule({
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
    TgrAutocompleteComponent
  ],
  exports: [StewardClientComponent, TgrMaterialTableComponent, TgrAutocompleteComponent]
})
export class StewardClientModule {
  static forRoot(config: StewardConfig) {
    return {
      ngModule: StewardClientModule,
      providers: [ {provide: StewardConfig, useValue: config} ]
    }
  }
 }
