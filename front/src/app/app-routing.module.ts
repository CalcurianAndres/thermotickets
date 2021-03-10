import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from './page404/page404.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path:'monitoreo',
    loadChildren: ()=> import('./monitoreo/monitoreo.module').then(m => m.MonitoreoModule),
    canLoad: [AuthGuard]
  },
  {
    path:'',
    redirectTo:'/dashboard',
    pathMatch: 'full'
  },
  {
    path:'**',
    component:Page404Component
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
