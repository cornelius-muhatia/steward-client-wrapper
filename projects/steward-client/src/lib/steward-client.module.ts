import { NgModule } from '@angular/core';
import { StewardClientComponent } from './steward-client.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StewardConfig, ClientDetails } from './steward-client.service';
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

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
  ],
  exports: [StewardClientComponent, TgrMaterialTableComponent,]
})
export class StewardClientModule {
  static forRoot(config: StewardConfig, clientDetails?: ClientDetails) {
    return {
      ngModule: StewardClientModule,
      providers: [ {provide: StewardConfig, useValue: config}, {provide: ClientDetails, useValue: clientDetails} ]
    }
  }
}
