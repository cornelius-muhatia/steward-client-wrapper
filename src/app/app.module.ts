import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StewardClientService, StewardClientModule} from 'steward-client';
import { MaterialTableComponent } from './material-table/material-table.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleDetailsComponent } from './user-management/roles/role-details/role-details.component';

export const routes: Routes = [
  {path: 'material-table', component: MaterialTableComponent},
  {path: 'material-table', component: AppComponent},
  { path: '',
    redirectTo: '/material-table',
    pathMatch: 'full'
  },
  { path: '**', component: MaterialTableComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MaterialTableComponent,
    RoleDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    StewardClientModule.forRoot(
      {base_url: "http://localhost:8085", access_token: "4d255e17-2017-4c91-8ce1-8f46a8f69db2"}
    ),
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [StewardClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
