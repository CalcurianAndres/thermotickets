import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MonitoreoComponent } from './monitoreo.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path:'monitoreo',
    canActivate:[AuthGuard],
    component:MonitoreoComponent,
    children:[
      {
        path:'',
        component:MainComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class MonitoreoRoutingModule { }
