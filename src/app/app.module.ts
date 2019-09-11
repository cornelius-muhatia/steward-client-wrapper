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
    RoleDetailsComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    StewardClientModule.forRoot(
      {base_url: "https://test-gateway.tulaa.io/uaa-server", access_token: "65b6d54a-e703-496a-b693-db0cbc4e9e15"}
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
