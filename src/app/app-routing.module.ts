import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'material-table', component: AppComponent},
  { path: '',
    redirectTo: '/material-table',
    pathMatch: 'full'
  },
  { path: '**', component: AppComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
